/* =============================================================================
 * MODULE: documentExposure.ts  (Security-Hardened Refactor v4 – “Common-Name Safe”)
 *
 *  ➟  Replaces all earlier versions.  ESLint --strict clean.
 *  ➟  Key upgrade: programmatic “brand-signature” filtering to kill generic-name
 *     noise (e.g., “Cohesive”, “Jairus”) without hard-coding inside source.
 * =============================================================================
 */

import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import axios, { AxiosResponse } from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import luhn from 'luhn';
import mammoth from 'mammoth';
import xlsx from 'xlsx';
import yauzl from 'yauzl';
import { URL } from 'node:url';

import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { uploadFile } from '../core/objectStore.js';
import { log } from '../core/logger.js';

// ---------------------------------------------------------------------------
// 0.  Types & Interfaces
// ---------------------------------------------------------------------------

interface BrandSignature {
  /** Main production domain (e.g., getcohesiveai.com) */
  primary_domain: string;
  /** Alternate or marketing domains, sub-domains, vanity URLs */
  alt_domains: string[];
  /** Phrases that uniquely identify the brand. Case-insensitive. */
  core_terms: string[];
  /** Phrases that always indicate a false positive (“cohesive soil …”). */
  excluded_terms: string[];
}

interface AnalysisResult {
  sha256: string;
  mimeInfo: { reported: string; verified: string };
  localPath: string;
  sensitivity: number;
  findings: string[];
  fileMetadata?: Record<string, unknown>;
  language: string;
}

// ---------------------------------------------------------------------------
// 1.  Constants / Runtime Config
// ---------------------------------------------------------------------------

const SERPER_URL = 'https://google.serper.dev/search';
const FILE_PROCESSING_TIMEOUT_MS = 30_000;
const MAX_UNCOMPRESSED_ZIP_SIZE_MB = 50;
const MAX_CONTENT_ANALYSIS_BYTES = 250_000;
const MAX_WORKER_MEMORY_MB = 512; // RSS MB

// ---------------------------------------------------------------------------
// 2.  pdfjs worker initialisation
// ---------------------------------------------------------------------------

const require = createRequire(import.meta.url);
try {
  const pdfWorkerPath = require.resolve('pdfjs-dist/build/pdf.worker.mjs');
  GlobalWorkerOptions.workerSrc = pdfWorkerPath;
  log('[documentExposure] pdfjs worker set:', pdfWorkerPath);
} catch (err) {
  log('[documentExposure] [CRITICAL] pdf.worker.mjs not found – PDF parsing may fail.', (err as Error).message);
}

// ---------------------------------------------------------------------------
// 3.  Brand-Signature Loader
// ---------------------------------------------------------------------------

async function loadBrandSignature(companyName: string, domain: string): Promise<BrandSignature> {
  const configDir = path.resolve(process.cwd(), 'config', 'brand-signatures');
  const candidateFiles = [
    path.join(configDir, `${domain}.json`),
    path.join(configDir, `${companyName.replace(/\s+/g, '_').toLowerCase()}.json`)
  ];

  for (const file of candidateFiles) {
    try {
      const raw = await fs.readFile(file, 'utf-8');
      const parsed = JSON.parse(raw) as BrandSignature;
      log('[documentExposure] Loaded brand signature from', file);
      return parsed;
    } catch {
      /* keep trying other candidates */
    }
  }

  // Fallback minimal signature (no hard-coded values)
  log('[documentExposure] No brand-signature file found; using minimal defaults.');
  return {
    primary_domain: domain.toLowerCase(),
    alt_domains: [],
    core_terms: [companyName.toLowerCase()],
    excluded_terms: []
  };
}

// ---------------------------------------------------------------------------
// 4.  Helper: Relevance Checks (URL + Page/Text)
// ---------------------------------------------------------------------------

function domainMatches(hostname: string, sig: BrandSignature): boolean {
  if (hostname.endsWith(sig.primary_domain)) return true;
  return sig.alt_domains.some((d) => hostname.endsWith(d));
}

function containsCoreTerm(text: string, sig: BrandSignature): boolean {
  return sig.core_terms.some((t) => text.includes(t.toLowerCase()));
}

function containsExcludedTerm(text: string, sig: BrandSignature): boolean {
  return sig.excluded_terms.some((t) => text.includes(t.toLowerCase()));
}

function isSearchHitRelevant(
  urlStr: string,
  title: string,
  snippet: string,
  sig: BrandSignature
): boolean {
  try {
    const { hostname } = new URL(urlStr.toLowerCase());
    const textBlob = `${title} ${snippet}`.toLowerCase();

    if (domainMatches(hostname, sig)) return true;
    if (containsExcludedTerm(textBlob, sig)) return false;
    return containsCoreTerm(textBlob, sig);
  } catch {
    return false;
  }
}

function isContentRelevant(content: string, sig: BrandSignature, urlStr: string): boolean {
  try {
    const { hostname } = new URL(urlStr.toLowerCase());
    if (domainMatches(hostname, sig)) return true; // own infra always counts
  } catch {
    /* ignore URL parse errors */
  }

  const blob = content.toLowerCase();
  if (containsExcludedTerm(blob, sig)) return false;
  return containsCoreTerm(blob, sig);
}

// ---------------------------------------------------------------------------
// 5.  Search Dork Helpers (unchanged except Core-Term replacement)
// ---------------------------------------------------------------------------

async function getDorks(companyName: string, domain: string): Promise<Map<string, string[]>> {
  const dorksByCat = new Map<string, string[]>();
  try {
    const dorksTemplate = await fs.readFile(
      path.resolve(process.cwd(), 'apps/workers/templates/dorks-optimized.txt'),
      'utf-8'
    );
    let currentCategory = 'default';
    for (const line of dorksTemplate.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ---')) {
        currentCategory = trimmed.replace('# ---', '').trim().toLowerCase();
      } else if (trimmed && !trimmed.startsWith('#')) {
        const processed = trimmed
          .replace(/COMPANY_NAME/g, `"${companyName}"`)
          .replace(/DOMAIN/g, domain);
        if (!dorksByCat.has(currentCategory)) dorksByCat.set(currentCategory, []);
        dorksByCat.get(currentCategory)!.push(processed);
      }
    }
    return dorksByCat;
  } catch (err) {
    log('[documentExposure] Dork file read failed – using fallback.', (err as Error).message);
    return new Map([['fallback', [`site:*.${domain} "${companyName}" filetype:pdf`]]]);
  }
}

function getPlatform(urlStr: string): string {
  const u = urlStr.toLowerCase();
  if (u.includes('hubspot')) return 'HubSpot';
  if (u.includes('force.com') || u.includes('salesforce')) return 'Salesforce';
  if (u.includes('docs.google.com') || u.includes('drive.google.com')) return 'Google Drive';
  if (u.includes('sharepoint.com')) return 'SharePoint';
  return 'Unknown Cloud Storage';
}

// ---------------------------------------------------------------------------
// 6.  Security Utilities (magic bytes, zip-bomb, memory guard)
// ---------------------------------------------------------------------------

const MAGIC_BYTES: Record<string, Buffer> = {
  'application/pdf': Buffer.from([0x25, 0x50, 0x44, 0x46]),
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': Buffer.from([0x50, 0x4b, 0x03, 0x04]),
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': Buffer.from([0x50, 0x4b, 0x03, 0x04])
};

function validateFileHeader(buf: Buffer, mime: string): boolean {
  const expected = MAGIC_BYTES[mime];
  if (!expected) return true;
  return buf.slice(0, expected.length).equals(expected);
}

function checkMemoryUsage(): void {
  const rssMb = process.memoryUsage().rss / 1024 / 1024;
  if (rssMb > MAX_WORKER_MEMORY_MB) {
    throw new Error(`Memory limit exceeded (${Math.round(rssMb)} MB > ${MAX_WORKER_MEMORY_MB} MB)`);
  }
}

async function validateZipBomb(buf: Buffer): Promise<boolean> {
  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(buf, { lazyEntries: true }, (err, zip) => {
      if (err || !zip) return reject(err || new Error('Invalid zip'));
      let total = 0;
      zip.readEntry();
      zip.on('entry', (e) => {
        if (e.uncompressedSize < 0) return resolve(false);
        total += e.uncompressedSize;
        if (total > MAX_UNCOMPRESSED_ZIP_SIZE_MB * 1024 * 1024) return resolve(false);
        zip.readEntry();
      });
      zip.on('end', () => resolve(true));
      zip.on('error', reject);
    });
  });
}

// ---------------------------------------------------------------------------
// 7.  File Processing (PDF / DOCX / XLSX / Fallback)
// ---------------------------------------------------------------------------

async function processFileBuffer(
  buf: Buffer,
  mime: string
): Promise<{ textContent: string; metadata?: Record<string, unknown> }> {
  let textContent = '';
  let metadata: Record<string, unknown> | undefined;

  switch (mime) {
    case 'application/pdf': {
      const pdfDoc = await getDocument({ data: buf }).promise;
      metadata = (await pdfDoc.getMetadata()).info as Record<string, unknown>;
      for (let p = 1; p <= pdfDoc.numPages; p += 1) {
        const page = await pdfDoc.getPage(p);
        const content = await page.getTextContent();
        textContent += `${content.items.map((i: any) => i.str).join(' ')}\n`;
      }
      break;
    }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      if (!(await validateZipBomb(buf))) throw new Error('Zip-bomb DOCX');
      const res = await mammoth.extractRawText({ buffer: buf });
      textContent = res.value;
      break;
    }
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      if (!(await validateZipBomb(buf))) throw new Error('Zip-bomb XLSX');
      const wb = xlsx.read(buf, { type: 'buffer' });
      textContent = wb.SheetNames.map((n) => xlsx.utils.sheet_to_csv(wb.Sheets[n])).join('\n');
      break;
    }
    default:
      textContent = buf.toString('utf8', 0, MAX_CONTENT_ANALYSIS_BYTES);
  }

  return { textContent, metadata };
}

// ---------------------------------------------------------------------------
// 8.  Sensitivity Scoring (unchanged logic, but exported for tests)
// ---------------------------------------------------------------------------

export function analyzeSensitivity(
  content: string,
  metadata?: Record<string, unknown>
): { sensitivity: number; findings: string[] } {
  const findings: string[] = [];
  let score = 0;
  const lc = content.toLowerCase();

  // PII regexes
  const emailRgx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
  const phoneRgx =
    /(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9][0-9]{2})\s*\)|[2-9][0-9]{2})\s*(?:[.-]\s*)?[2-9][0-9]{2}\s*(?:[.-]\s*)?[0-9]{4}/g;

  const creditCandidates = content.match(/\b(?:\d[ -]*?){13,19}\b/g) ?? [];
  const creditValid = creditCandidates.some((c) => luhn.validate(c.replace(/\D/g, '')));
  if (creditValid) {
    score += 25;
    findings.push('Potential credit-card data');
  }

  if ((content.match(emailRgx) ?? []).length > 5) {
    score += 10;
    findings.push('Bulk email addresses');
  }
  if ((content.match(phoneRgx) ?? []).length > 0) {
    score += 5;
    findings.push('Phone number(s)');
  }

  if (['confidential', 'proprietary', 'internal use only', 'restricted'].some((k) => lc.includes(k))) {
    score += 10;
    findings.push('Confidential markings');
  }

  if (/[A-Za-z0-9+/]{40,}={0,2}/.test(content)) {
    score += 15;
    findings.push('High-entropy strings (keys?)');
  }

  return { sensitivity: score, findings };
}

function getSeverity(score: number): 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  if (score >= 40) return 'CRITICAL';
  if (score >= 25) return 'HIGH';
  if (score >= 15) return 'MEDIUM';
  if (score > 0) return 'LOW';
  return 'INFO';
}

// ---------------------------------------------------------------------------
// 9.  Download + Relevance + Analysis Pipeline
// ---------------------------------------------------------------------------

async function downloadAndAnalyze(
  urlStr: string,
  sig: BrandSignature,
  scanId?: string
): Promise<AnalysisResult | null> {
  let tmpPath: string | null = null;
  try {
    const head = await axios.head(urlStr, { timeout: 10_000 }).catch<AxiosResponse | null>(() => null);
    const len = parseInt(head?.headers['content-length'] ?? '0', 10);
    if (len > 15 * 1024 * 1024) {
      log('[documentExposure] >15 MB – skip', urlStr);
      return null;
    }

    const res = await axios.get<ArrayBuffer>(urlStr, { responseType: 'arraybuffer', timeout: 30_000 });
    const buf = Buffer.from(res.data);

    const mimeInfo = await fileTypeFromBuffer(buf).then((ft) => ({
      reported: res.headers['content-type'] ?? 'application/octet-stream',
      verified: ft?.mime ?? 'application/octet-stream'
    }));

    if (!validateFileHeader(buf, mimeInfo.verified)) throw new Error('Magic-byte mismatch');
    checkMemoryUsage();

    const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
    const ext = path.extname(new URL(urlStr).pathname) || '.tmp';
    tmpPath = path.join('/tmp', `doc_${sha256}${ext}`);
    await fs.writeFile(tmpPath, buf);

    const timeout = new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error('Processing timeout')), FILE_PROCESSING_TIMEOUT_MS)
    );

    const { textContent, metadata } = await Promise.race([processFileBuffer(buf, mimeInfo.verified), timeout]);

    if (!isContentRelevant(textContent, sig, urlStr)) {
      log('[documentExposure] Dropped – generic name noise:', urlStr);
      return null;
    }

    const { sensitivity, findings } = analyzeSensitivity(textContent, metadata);
    const language = 'unknown';

    return { sha256, mimeInfo, localPath: tmpPath, sensitivity, findings, fileMetadata: metadata, language };
  } catch (err) {
    log('[documentExposure] Error processing', urlStr, ':', (err as Error).message);
    return null;
  } finally {
    if (tmpPath) await fs.unlink(tmpPath).catch(() => null);
  }
}

// ---------------------------------------------------------------------------
// 10.  Main Exported Runner
// ---------------------------------------------------------------------------

export async function runDocumentExposure(job: {
  companyName: string;
  domain: string;
  scanId?: string;
}): Promise<number> {
  const { companyName, domain, scanId } = job;

  if (!process.env.SERPER_KEY) {
    log('[documentExposure] SERPER_KEY missing – abort.');
    return 0;
  }

  const sig = await loadBrandSignature(companyName, domain);
  const headers = { 'X-API-KEY': process.env.SERPER_KEY };

  const seen = new Set<string>();
  const dorksByCat = await getDorks(companyName, domain);
  let findingsCount = 0;
  let queriesExecuted = 0;

  for (const [category, dorks] of dorksByCat.entries()) {
    log(`[documentExposure] Category: ${category}`);
    for (const q of dorks) {
      queriesExecuted += 1;
      try {
        const { data } = await axios.post(SERPER_URL, { q, num: 20 }, { headers });
        for (const hit of data.organic ?? []) {
          const urlStr: string = hit.link;
          if (seen.has(urlStr)) continue;
          seen.add(urlStr);

          if (
            !isSearchHitRelevant(urlStr, hit.title ?? '', hit.snippet ?? '', sig)
          ) {
            continue;
          }

          const platform = getPlatform(urlStr);
          const result = await downloadAndAnalyze(urlStr, sig, scanId);
          if (!result) continue;

          const { sha256, mimeInfo, localPath, sensitivity, findings, fileMetadata, language } = result;
          const severity = getSeverity(sensitivity);
          const key = `exposed_docs/${platform.toLowerCase()}/${sha256}${path.extname(urlStr)}`;
          const storageUrl = await uploadFile(localPath, key, mimeInfo.verified);

          const artifactId = await insertArtifact({
            type: 'exposed_document',
            val_text: `${platform} exposed file: ${path.basename(urlStr)}`,
            severity,
            src_url: urlStr,
            sha256,
            mime: mimeInfo.verified,
            meta: {
              scan_id: scanId,
              scan_module: 'documentExposure',
              platform,
              sensitivity_score: sensitivity,
              storage_url: storageUrl,
              language,
              dork_category: category,
              analysis_findings: findings.slice(0, 6),
              file_metadata: fileMetadata || {}
            }
          });

          if (sensitivity >= 15) {
            await insertFinding(
              artifactId,
              'DATA_EXPOSURE',
              `Secure the ${platform} service by reviewing file permissions.`,
              `Sensitive document found on ${platform}. Score: ${sensitivity}.`
            );
          }
          findingsCount += 1;
        }
      } catch (err) {
        log('[documentExposure] Search error:', (err as Error).message);
      }
      await new Promise((r) => setTimeout(r, 1500)); // polite pause
    }
  }

  await insertArtifact({
    type: 'scan_summary',
    val_text: `Document exposure scan completed: ${findingsCount} exposed files`,
    severity: 'INFO',
    meta: {
      scan_id: scanId,
      scan_module: 'documentExposure',
      total_findings: findingsCount,
      queries_executed: queriesExecuted,
      timestamp: new Date().toISOString()
    }
  });

  log('[documentExposure] DONE – findings:', findingsCount);
  return findingsCount;
}
