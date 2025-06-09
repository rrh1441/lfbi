import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import luhn from 'luhn';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { uploadFile } from '../core/objectStore.js';
import { log } from '../core/logger.js';

const SERPER_URL = 'https://google.serper.dev/search';

// Set the workerSrc for pdfjs-dist globally once
// In a production environment, this should ideally point to a hosted worker,
// but for a bundled/docker environment, we can point to the local worker file.
// We need to ensure this is only set once per process.
GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.mjs';

// Read dorks from the external file
async function getDorks(companyName: string, domain: string): Promise<string[]> {
  try {
    const dorksTemplate = await fs.readFile(
      path.resolve(process.cwd(), 'apps/workers/templates/dorks-optimized.txt'),
      'utf-8'
    );
    return dorksTemplate
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line =>
        line
          .replace(/COMPANY_NAME/g, `"${companyName}"`)
          .replace(/DOMAIN/g, domain)
      );
  } catch (error) {
    log('[crmExposure] Error reading dork file, using fallback dorks:', (error as Error).message);
    // Fallback dorks in case file reading fails
    return [`site:*.hubspot.com "${companyName}"`, `site:*.salesforce.com "${companyName}"`];
  }
}

// Extended platform detection
function getPlatform(url: string): string {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('hubspot')) return 'HubSpot';
  if (lowerUrl.includes('salesforce') || lowerUrl.includes('force.com')) return 'Salesforce';
  if (lowerUrl.includes('drive.google.com') || lowerUrl.includes('docs.google.com')) return 'Google Drive';
  if (lowerUrl.includes('sharepoint.com')) return 'SharePoint';
  if (lowerUrl.includes('onedrive.live.com')) return 'OneDrive';
  if (lowerUrl.includes('app.box.com')) return 'Box';
  if (lowerUrl.includes('dropbox.com')) return 'Dropbox';
  return 'Unknown Cloud Storage';
}

// Verify MIME type using magic numbers
async function verifyMimeType(buffer: Buffer, reportedMime: string): Promise<{ reported: string; verified: string }> {
  try {
    const fileType = await fileTypeFromBuffer(buffer);
    return {
      reported: reportedMime,
      verified: fileType?.mime ?? 'unknown'
    };
  } catch (error) {
    log('[crmExposure] MIME type verification failed:', (error as Error).message);
    return {
      reported: reportedMime,
      verified: 'verification_failed'
    };
  }
}

async function downloadAndAnalyze(url: string, companyName: string, scanId?: string): Promise<{
  sha256: string;
  mimeInfo: { reported: string; verified: string };
  localPath: string;
  sensitivity: number;
  findings: string[];
  fileMetadata?: Record<string, any>;
} | null> {
  try {
    // HEAD request to check file size first
    const headRes = await axios.head(url, { timeout: 10000 }).catch(() => null);
    if (headRes && headRes.headers['content-length'] && parseInt(headRes.headers['content-length'], 10) > 15 * 1024 * 1024) {
      log('[crmExposure] File size > 15MB, skipping download. URL:', url);
      await insertArtifact({
        type: 'exposed_large_file',
        val_text: `Large file found: ${path.basename(url)}, content analysis skipped due to size.`,
        severity: 'INFO',
        src_url: url,
        meta: {
          scan_id: scanId,
          scan_module: 'crmExposure',
          reported_size: headRes.headers['content-length']
        }
      });
      return null;
    }

    const res = await axios.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
      maxContentLength: 15 * 1024 * 1024
    });

    const buf = Buffer.from(res.data);
    const sha = crypto.createHash('sha256').update(buf).digest('hex');
    const ext = path.extname(url).split('?')[0].replace(/[^a-z0-9.]/gi, '');
    const tmp = `/tmp/crm_${sha}${ext}`;
    await fs.writeFile(tmp, buf);

    const reportedMime = res.headers['content-type'] ?? 'application/octet-stream';
    const mimeInfo = await verifyMimeType(buf, reportedMime);

    let fileMetadata: Record<string, any> | undefined;
    let textContentForAnalysis = '';

    // Extract content and metadata based on MIME type
    if (mimeInfo.verified === 'application/pdf') {
      // Convert Buffer to Uint8Array for pdfjs-dist
      const uint8Array = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
      const loadingTask = getDocument(uint8Array);
      const pdfDocument = await loadingTask.promise;

      let fullText = '';
      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
      }
      fileMetadata = pdfDocument.info;
      textContentForAnalysis = fullText;
    } else {
      // Basic text extraction for other file types
      textContentForAnalysis = buf.toString('utf8', 0, Math.min(buf.length, 100000)); // First 100KB
      // TODO: Add support for DOCX/XLSX metadata extraction if a lightweight library is available
      if (mimeInfo.verified.includes('officedocument')) {
         log('[crmExposure] Office file detected, metadata extraction not yet implemented.');
      }
    }

    const { sensitivity, findings } = analyzeSensitivity(textContentForAnalysis, companyName, fileMetadata);

    return { sha256: sha, mimeInfo, localPath: tmp, sensitivity, findings, fileMetadata };

  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
        log('[crmExposure] File not found (404):', url);
    } else {
        log('[crmExposure] Download error:', url, (err as Error).message);
    }
    return null;
  }
}

// Enhanced sensitivity analysis
function analyzeSensitivity(content: string, companyName: string, metadata?: Record<string, any>): { sensitivity: number; findings: string[] } {
  const findings: string[] = [];
  let score = 0;
  const lowerContent = content.toLowerCase();

  // Regexes for PII
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRegex = /(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g;
  
  // Credit Card Luhn check
  const potentialCCs = content.match(/\b(?:\d[ -]*?){13,16}\b/g) || [];
  let validLuhn = 0;
  for (const cc of potentialCCs) {
    if (luhn.validate(cc.replace(/\D/g, ''))) {
      validLuhn++;
    }
  }
  if (validLuhn > 0) {
    score += validLuhn * 25;
    findings.push(`Potential credit card number(s) found: ${validLuhn}`);
  }

  const emails = content.match(emailRegex) || [];
  if (emails.length > 0) {
    score += Math.min(emails.length, 10) * 5; // Cap contribution
    findings.push(`Email addresses found: ${emails.length}`);
  }

  const phones = content.match(phoneRegex) || [];
  if (phones.length > 0) {
    score += Math.min(phones.length, 10) * 5; // Cap contribution
    findings.push(`US phone numbers found: ${phones.length}`);
  }

  // Keywords from original function...
  const piiKeywords = ['social security', 'ssn', 'passport', 'driver.?license'];
  piiKeywords.forEach(k => {
    if (lowerContent.includes(k)) {
      score += 15;
      findings.push(`High-risk PII keyword: ${k}`);
    }
  });

  const confidentialKeywords = ['confidential', 'proprietary', 'internal use only', 'restricted'];
  confidentialKeywords.forEach(k => {
    if (lowerContent.includes(k)) {
      score += 10;
      findings.push(`Confidential marking: ${k}`);
    }
  });

  // Check metadata for keywords
  if (metadata) {
    const metaString = JSON.stringify(metadata).toLowerCase();
    confidentialKeywords.forEach(k => {
        if (metaString.includes(k)) {
            score += 10;
            findings.push(`Confidential keyword in metadata: ${k}`);
        }
    });
  }

  // Other existing checks...
  const highEntropyRegex = /[A-Za-z0-9+/]{40,}[=]{0,2}/g;
  const entropyMatches = content.match(highEntropyRegex) || [];
  if (entropyMatches.length > 0) {
    score += entropyMatches.length * 15;
    findings.push(`Potential API keys/tokens: ${entropyMatches.length} found`);
  }

  const dbRegex = /(postgresql|mysql|mongodb):\/\/[^\s"'<>]+/gi;
  const dbMatches = content.match(dbRegex) || [];
  if (dbMatches.length > 0) {
    score += dbMatches.length * 25;
    findings.push(`Database URLs: ${dbMatches.length} found`);
  }

  return { sensitivity: Math.max(0, Math.round(score)), findings };
}

// Determine severity based on sensitivity score
function getSeverity(score: number): 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  if (score >= 50) return 'CRITICAL';
  if (score >= 30) return 'HIGH';
  if (score >= 15) return 'MEDIUM';
  if (score >= 5) return 'LOW';
  return 'INFO';
}

export async function runCrmExposure(job: { companyName: string; domain: string; scanId?: string }): Promise<number> {
  const { companyName, domain, scanId } = job;
  log('[crmExposure] Starting CRM & Cloud Storage exposure scan for', companyName);

  if (!process.env.SERPER_KEY) {
    log('[crmExposure] SERPER_KEY not found in environment, skipping scan.');
    await insertArtifact({
        type: 'scan_error',
        val_text: 'Module crmExposure skipped: SERPER_KEY is not configured.',
        severity: 'INFO',
        meta: { scan_id: scanId, scan_module: 'crmExposure' }
    });
    return 0;
  }

  const headers = { 'X-API-KEY': process.env.SERPER_KEY };
  const seen = new Set<string>();
  const dorks = await getDorks(companyName, domain);
  let findingsCount = 0;

  for (const query of dorks) {
    try {
      log('[crmExposure] Searching:', query);
      const { data } = await axios.post(SERPER_URL, { q: query, num: 20 }, { headers });

      for (const hit of data.organic ?? []) {
        const url: string = hit.link;
        if (seen.has(url)) continue;
        seen.add(url);

        const platform = getPlatform(url);
        log('[crmExposure] Processing', platform, 'file:', url);

        const analysisResult = await downloadAndAnalyze(url, companyName, scanId);
        if (!analysisResult) continue;

        const { sha256, mimeInfo, localPath, sensitivity, findings, fileMetadata } = analysisResult;
        const severity = getSeverity(sensitivity);
        
        const key = `crm/${platform.toLowerCase()}/${sha256}${path.extname(url).split('?')[0]}`;
        const storageUrl = await uploadFile(localPath, key, mimeInfo.verified);

        let val_text = `${platform} exposed file: ${path.basename(url)}`;
        if (severity === 'HIGH' || severity === 'CRITICAL') {
            val_text = `Highly sensitive document exposed via ${platform}: ${path.basename(url)}`;
        }

        const artifactId = await insertArtifact({
          type: 'crm_exposure',
          val_text,
          severity,
          src_url: url,
          sha256,
          mime: mimeInfo.verified,
          meta: {
            scan_id: scanId,
            scan_module: 'crmExposure',
            platform,
            sensitivity_score: sensitivity,
            storage_url: storageUrl,
            file_size: (await fs.stat(localPath)).size,
            reported_mime: mimeInfo.reported,
            verified_mime: mimeInfo.verified,
            file_metadata: fileMetadata,
            content_analysis_summary: findings.slice(0, 5) // Top 5 findings
          }
        });

        if (sensitivity >= 15) {
          await insertFinding(
            artifactId,
            'DATA_EXPOSURE',
            `Secure the ${platform} service by reviewing file permissions and public access controls.`,
            `Sensitive document exposed on ${platform} with sensitivity score ${sensitivity}. Top findings: ${findings.slice(0,3).join(', ')}`
          );
        }

        await fs.unlink(localPath);
        findingsCount++;
        log(`[crmExposure] Processed ${platform} file with sensitivity score: ${sensitivity}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1500)); // Rate limiting
    } catch (err) {
      log('[crmExposure] Search error for query:', query, (err as Error).message);
    }
  }

  log('[crmExposure] CRM & Cloud Storage scan completed, found', findingsCount, 'exposed files');
  
  // Add completion tracking
  await insertArtifact({
    type: 'scan_summary',
    val_text: `CRM exposure scan completed: ${findingsCount} exposed files found`,
    severity: 'INFO',
    meta: {
      scan_id: scanId,
      scan_module: 'crmExposure',
      total_findings: findingsCount,
      queries_executed: dorks.length,
      timestamp: new Date().toISOString()
    }
  });
  
  return findingsCount;
} 