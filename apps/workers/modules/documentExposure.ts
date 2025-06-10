/*
 * =============================================================================
 * MODULE: documentExposure.ts (Security-Hardened Refactor v3)
 * =============================================================================
 * This module replaces crmExposure.ts and fileHunt.ts.
 *
 * CRITICAL SECURITY NOTICE:
 * This module downloads and processes untrusted files from the internet. While
 * this version includes timeout, zip bomb checks, magic byte validation, and
 * basic memory monitoring, it DOES NOT sandbox the file parsing process.
 * A vulnerability in a dependency (pdfjs-dist, mammoth, xlsx) could still lead
 * to Remote Code Execution (RCE) in the worker's context.
 *
 * PRODUCTION DEPLOYMENT RECOMMENDATIONS:
 * 1.  **SANDBOXING (MANDATORY):** The `processFileBuffer` function must be
 * executed in a sandboxed environment (e.g., a separate, short-lived
 * container with no network access, a worker thread with resource limits,
 * or a service like AWS Lambda).
 * 2.  **DEPENDENCY SCANNING:** Regularly scan all dependencies (npm audit, Snyk)
 * for known vulnerabilities. The parsers are the primary attack surface.
 * 3.  **VIRUS SCANNING:** Before processing, scan all downloaded files with an
 * antivirus scanner like ClamAV.
 * =============================================================================
 */

import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import luhn from 'luhn';
import mammoth from 'mammoth';
import xlsx from 'xlsx';
import yauzl from 'yauzl';
// import { detect as detectLanguage } from 'langdetect';

import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { uploadFile } from '../core/objectStore.js';
import { log } from '../core/logger.js';

// --- Configuration & Initialization ---

const SERPER_URL = 'https://google.serper.dev/search';
const require = createRequire(import.meta.url);

// REFACTOR: Added more constants for security and performance tuning.
const FILE_PROCESSING_TIMEOUT_MS = 30000;
const MAX_UNCOMPRESSED_ZIP_SIZE_MB = 50;
const MAX_CONTENT_ANALYSIS_BYTES = 250000;
const MAX_WORKER_MEMORY_MB = 512; // Max RSS memory before aborting a task.

try {
    const pdfWorkerPath = require.resolve('pdfjs-dist/build/pdf.worker.mjs');
    GlobalWorkerOptions.workerSrc = pdfWorkerPath;
    log('[docExposure] pdfjs-dist workerSrc successfully set to:', pdfWorkerPath);
} catch (error) {
    log('[docExposure] [CRITICAL ERROR] Could not resolve pdf.worker.mjs. PDF processing will likely fail.', error);
}

// --- Dork & Platform Management ---
async function getDorks(companyName: string, domain: string): Promise<Map<string, string[]>> {
  const dorksByCat = new Map<string, string[]>();
  try {
    const dorksTemplate = await fs.readFile(
      path.resolve(process.cwd(), 'apps/workers/templates/dorks-optimized.txt'),
      'utf-8'
    );
    let currentCategory = 'default';
    for (const line of dorksTemplate.split('\n')) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('# ---')) {
            currentCategory = trimmedLine.replace('# ---', '').trim().toLowerCase();
        } else if (trimmedLine && !trimmedLine.startsWith('#')) {
            const processedDork = trimmedLine.replace(/COMPANY_NAME/g, `"${companyName}"`).replace(/DOMAIN/g, domain);
            if (!dorksByCat.has(currentCategory)) dorksByCat.set(currentCategory, []);
            dorksByCat.get(currentCategory)!.push(processedDork);
        }
    }
    return dorksByCat;
  } catch (error) {
    log('[docExposure] Error reading dork file, using fallback dorks:', (error as Error).message);
    const fallbackDorks = new Map<string, string[]>();
    fallbackDorks.set('fallback', [ `site:*.hubspot.com "${companyName}"`, `"${companyName}" filetype:pdf` ]);
    return fallbackDorks;
  }
}

function getPlatform(url: string): string {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('hubspot')) return 'HubSpot';
  if (lowerUrl.includes('salesforce') || lowerUrl.includes('force.com')) return 'Salesforce';
  if (lowerUrl.includes('drive.google.com') || lowerUrl.includes('docs.google.com')) return 'Google Drive';
  if (lowerUrl.includes('sharepoint.com')) return 'SharePoint';
  return 'Unknown Cloud Storage';
}

async function verifyMimeType(buffer: Buffer, reportedMime: string): Promise<{ reported: string; verified: string }> {
  try {
    const fileType = await fileTypeFromBuffer(buffer);
    return { reported: reportedMime, verified: fileType?.mime ?? 'unknown' };
  } catch (error) {
    return { reported: reportedMime, verified: 'verification_failed' };
  }
}

// --- Security-Hardened File Processing ---

// REFACTOR: Added Magic Byte validation map.
const MAGIC_BYTES: { [mime: string]: Buffer } = {
    'application/pdf': Buffer.from([0x25, 0x50, 0x44, 0x46]), // %PDF
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': Buffer.from([0x50, 0x4B, 0x03, 0x04]), // PK..
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': Buffer.from([0x50, 0x4B, 0x03, 0x04]), // PK..
};

/**
 * REFACTOR: Quick Win - Validates file headers against known magic bytes
 * to prevent parsers from processing mismatched file types.
 */
function validateFileHeader(buffer: Buffer, verifiedMime: string): boolean {
    const expectedMagicBytes = MAGIC_BYTES[verifiedMime];
    if (!expectedMagicBytes) return true; // No validation for this MIME type
    const actualMagicBytes = buffer.slice(0, expectedMagicBytes.length);
    return actualMagicBytes.equals(expectedMagicBytes);
}

/**
 * REFACTOR: Quick Win - Checks current memory usage to prevent resource exhaustion
 * before starting a heavy parsing operation.
 */
function checkMemoryUsage(): void {
    const memoryUsage = process.memoryUsage().rss; // Resident Set Size
    if (memoryUsage > MAX_WORKER_MEMORY_MB * 1024 * 1024) {
        throw new Error(`Memory limit exceeded (${Math.round(memoryUsage / 1024 / 1024)}MB)`);
    }
}

async function validateZipBomb(buffer: Buffer): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let totalUncompressedSize = 0;
        yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, zipfile) => {
            if (err || !zipfile) return reject(err || new Error('Invalid zip file'));
            zipfile.readEntry();
            zipfile.on('entry', (entry) => {
                // Treat negative size as exceeding limit to avoid bypass
                if (entry.uncompressedSize < 0 || entry.uncompressedSize > MAX_UNCOMPRESSED_ZIP_SIZE_MB * 1024 * 1024) {
                    zipfile.close();
                    return resolve(false); // Exceeds limit or unknown size
                }
                totalUncompressedSize += entry.uncompressedSize;
                if (totalUncompressedSize > MAX_UNCOMPRESSED_ZIP_SIZE_MB * 1024 * 1024) {
                    zipfile.close();
                    return resolve(false); // Exceeds limit
                }
                zipfile.readEntry();
            });
            zipfile.on('end', () => resolve(true)); // Within limit
            zipfile.on('error', (e) => reject(e));
        });
    });
}

async function processFileBuffer(buffer: Buffer, mime: string): Promise<{
    textContent: string;
    metadata?: Record<string, any>;
}> {
    let textContent = '';
    let metadata: Record<string, any> | undefined;

    switch (mime) {
        case 'application/pdf':
            const uint8Array = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
            const pdfDocument = await getDocument(uint8Array).promise;
            metadata = (await pdfDocument.getMetadata()).info;
            let fullText = '';
            for (let i = 1; i <= pdfDocument.numPages; i++) {
                const page = await pdfDocument.getPage(i);
                const content = await page.getTextContent();
                fullText += content.items.map((item: any) => item.str).join(' ') + '\n';
            }
            textContent = fullText;
            break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            if (!(await validateZipBomb(buffer))) throw new Error('Zip Bomb detected in DOCX');
            const docxResult = await mammoth.extractRawText({ buffer });
            textContent = docxResult.value;
            break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            if (!(await validateZipBomb(buffer))) throw new Error('Zip Bomb detected in XLSX');
            const workbook = xlsx.read(buffer, { type: 'buffer' });
            textContent = workbook.SheetNames.map((sheetName: string) =>
                xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName])
            ).join('\n');
            break;
        default:
            textContent = buffer.toString('utf8', 0, MAX_CONTENT_ANALYSIS_BYTES);
            break;
    }
    return { textContent, metadata };
}

async function downloadAndAnalyze(url: string, companyName: string, scanId?: string): Promise<{
  sha256: string;
  mimeInfo: { reported: string; verified: string };
  localPath: string;
  sensitivity: number;
  findings: string[];
  fileMetadata?: Record<string, any>;
  language: string;
} | null> {
  let tmpPath: string | null = null;
  try {
    const headRes = await axios.head(url, { timeout: 10000 }).catch(() => null);
    if (headRes?.headers['content-length'] && parseInt(headRes.headers['content-length'], 10) > 15 * 1024 * 1024) {
      log('[docExposure] File size > 15MB, skipping. URL:', url);
      return null;
    }

    const res = await axios.get<ArrayBuffer>(url, { responseType: 'arraybuffer', timeout: 30000 });
    const buf = Buffer.from(res.data);
    
    // --- Pre-processing Security Checks ---
    const mimeInfo = await verifyMimeType(buf, res.headers['content-type'] ?? 'application/octet-stream');
    if (!validateFileHeader(buf, mimeInfo.verified)) {
        throw new Error(`Magic byte validation failed for ${mimeInfo.verified}`);
    }
    checkMemoryUsage(); // Check memory before heavy lifting

    // --- Secure Processing Stage ---
    const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
    const ext = path.extname(url).split('?')[0].replace(/[^a-z0-9.]/gi, '') || '.tmp';
    tmpPath = `/tmp/doc_${sha256}${ext}`;
    await fs.writeFile(tmpPath, buf);

    const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`File processing timed out after ${FILE_PROCESSING_TIMEOUT_MS}ms`)), FILE_PROCESSING_TIMEOUT_MS)
    );

    const { textContent, metadata } = await Promise.race([
        processFileBuffer(buf, mimeInfo.verified),
        timeoutPromise
    ]);

    const { sensitivity, findings } = analyzeSensitivity(textContent, companyName, metadata);
    // const langResult = detectLanguage(textContent.substring(0, 10000));
    // const language = (langResult?.length > 0) ? langResult[0].lang : 'unknown';
    const language = 'unknown'; // Language detection temporarily disabled

    return { sha256, mimeInfo, localPath: tmpPath, sensitivity, findings, fileMetadata: metadata, language };

  } catch (err) {
    log(`[docExposure] [ERROR] Failed to process ${url}:`, (err as Error).message);
    if ((err as Error).message.includes('Zip Bomb')) {
        await insertArtifact({
            type: 'scan_artefact_error',
            val_text: `Potential Zip Bomb detected and blocked: ${url}`,
            severity: 'MEDIUM',
            meta: { scan_id: scanId, scan_module: 'documentExposure', error: 'Zip Bomb' }
        });
    }
    return null;
  } finally {
      if (tmpPath) await fs.unlink(tmpPath).catch(e => log(`[docExposure] Failed to clean up temp file ${tmpPath}`, e));
  }
}

// --- Sensitivity Scoring (More specific regex) ---
function analyzeSensitivity(content: string, companyName: string, metadata?: Record<string, any>): { sensitivity: number; findings: string[] } {
    const findings: string[] = [];
    let score = 0;
    const lowerContent = content.toLowerCase();

    // Regexes for PII
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g;

    // Fix credit card validation - iterate over each candidate individually
    const creditCardCandidates = content.match(/\b(?:\d[ -]*?){13,16}\b/g) || [];
    let validCreditCardFound = false;
    for (const candidate of creditCardCandidates) {
        const cleanedNumber = candidate.replace(/\D/g, '');
        if (cleanedNumber.length >= 13 && cleanedNumber.length <= 19 && luhn.validate(cleanedNumber)) {
            validCreditCardFound = true;
            break;
        }
    }
    if (validCreditCardFound) {
        score += 25;
        findings.push('Potential credit card number(s) found');
    }

    if ((content.match(emailRegex) || []).length > 5) {
        score += 10; findings.push('Multiple email addresses found');
    }
    if ((content.match(phoneRegex) || []).length > 0) {
        score += 5; findings.push('Phone number(s) found');
    }

    const confidentialKeywords = ['confidential', 'proprietary', 'internal use only', 'restricted'];
    if (confidentialKeywords.some(k => lowerContent.includes(k))) {
        score += 10; findings.push('Confidential markings found');
    }

    const highEntropyRegex = /[A-Za-z0-9+/]{40,}[=]{0,2}/g;
    if (highEntropyRegex.test(content)) {
        score += 15; findings.push('Potential API keys/tokens found');
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

// --- Main Execution Logic ---
export async function runDocumentExposure(job: { companyName: string; domain: string; scanId?: string }): Promise<number> {
  const { companyName, domain, scanId } = job;
  log('[docExposure] Starting Document & CRM exposure scan for', companyName);

  if (!process.env.SERPER_KEY) {
    log('[docExposure] SERPER_KEY not found, skipping.');
    return 0;
  }

  const headers = { 'X-API-KEY': process.env.SERPER_KEY };
  const seen = new Set<string>();
  const dorksByCat = await getDorks(companyName, domain);
  let findingsCount = 0;
  let queriesExecuted = 0;

  for (const [category, dorks] of dorksByCat.entries()) {
    log(`[docExposure] Searching category: ${category}`);
    for (const query of dorks) {
      queriesExecuted++;
      try {
        log('[docExposure] Searching:', query);
        const { data } = await axios.post(SERPER_URL, { q: query, num: 20 }, { headers });

        for (const hit of data.organic ?? []) {
          const url: string = hit.link;
          if (seen.has(url)) continue;
          seen.add(url);

          const lowerTitle = (hit.title || '').toLowerCase();
          const lowerSnippet = (hit.snippet || '').toLowerCase();
          if (!lowerTitle.includes(companyName.toLowerCase()) && !lowerSnippet.includes(companyName.toLowerCase()) && !url.includes(domain)) {
              log(`[docExposure] Skipping irrelevant result: ${url}`);
              continue;
          }

          const platform = getPlatform(url);
          const analysisResult = await downloadAndAnalyze(url, companyName, scanId);

          if (analysisResult) {
            const { sha256, mimeInfo, localPath, sensitivity, findings, fileMetadata, language } = analysisResult;
            const severity = getSeverity(sensitivity);
            const key = `exposed_docs/${platform.toLowerCase()}/${sha256}${path.extname(url).split('?')[0]}`;
            const storageUrl = await uploadFile(localPath, key, mimeInfo.verified);

            const artifactId = await insertArtifact({
              type: 'exposed_document',
              val_text: `${platform} exposed file: ${path.basename(url)}`,
              severity,
              src_url: url,
              sha256,
              mime: mimeInfo.verified,
              meta: {
                scan_id: scanId,
                scan_module: 'documentExposure',
                platform,
                sensitivity_score: sensitivity,
                storage_url: storageUrl,
                file_size: (await fs.stat(localPath).catch(() => ({size:0}))).size,
                language,
                dork_category: category,
                content_analysis_summary: findings.slice(0, 5)
              }
            });

            if (sensitivity >= 15) {
                await insertFinding(artifactId, 'DATA_EXPOSURE', `Secure the ${platform} service by reviewing file permissions.`, `Sensitive document found on ${platform}. Score: ${sensitivity}.`);
            }
            findingsCount++;
          }
        }
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (err) {
        log('[docExposure] Search loop error:', (err as Error).message);
      }
    }
  }

  log(`[docExposure] Scan complete. Found ${findingsCount} files.`);
  await insertArtifact({
    type: 'scan_summary',
    val_text: `Document exposure scan completed: ${findingsCount} exposed files found`,
    severity: 'INFO',
    meta: { scan_id: scanId, scan_module: 'documentExposure', total_findings: findingsCount, queries_executed: queriesExecuted, timestamp: new Date().toISOString() }
  });
  return findingsCount;
}
