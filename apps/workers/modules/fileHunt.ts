import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import axios from 'axios';
import * as pdf from 'pdf-parse/lib/pdf-parse.js';
import { detect as detectLanguage } from 'langdetect';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { uploadFile } from '../core/objectStore.js';
import { log } from '../core/logger.js';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Set the workerSrc for pdfjs-dist globally once (should be consistent with crmExposure.ts)
GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.mjs';

const SERPER_URL = 'https://google.serper.dev/search';
const KNOWN_BREACHED_HASHES = {
  "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f": "Example Breach 1 (SHA256)",
};

async function getDorks(): Promise<Map<string, string[]>> {
    const dorks = new Map<string, string[]>();
    try {
        const dorksTemplate = await fs.readFile(new URL('../templates/dorks-optimized.txt', import.meta.url), 'utf8');
        let currentCategory = 'default';
        for (const line of dorksTemplate.split('\n')) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('# ---')) {
                currentCategory = trimmedLine.replace('# ---', '').trim();
            } else if (trimmedLine && !trimmedLine.startsWith('#')) {
                if (!dorks.has(currentCategory)) dorks.set(currentCategory, []);
                dorks.get(currentCategory)!.push(trimmedLine);
            }
        }
    } catch (e) {
        log('[fileHunt] Failed to load dorks from file, using fallback.', (e as Error).message);
        dorks.set('fallback', ['COMPANY_NAME filetype:pdf']);
    }
    return dorks;
}

async function download(url: string): Promise<{ buffer: Buffer; mime: string } | null> {
    try {
        const res = await axios.get<ArrayBuffer>(url, { responseType: 'arraybuffer', timeout: 15000, maxContentLength: 10 * 1024 * 1024 });
        return { buffer: Buffer.from(res.data), mime: res.headers['content-type'] ?? 'application/octet-stream' };
    } catch (error) {
        log('[fileHunt] Download failed:', url, (error as Error).message);
        return null;
    }
}

async function assessSensitivity(content: string, filename: string): Promise<{ severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; findings: string[]; snippet: string | null }> {
    const findings: string[] = [];
    let score = 0;
    
    const keywordWeights = { "API_KEY_SECRET": 30, "password": 25, "confidential": 15, "internal": 10, "budget": 10 };
    Object.entries(keywordWeights).forEach(([keyword, weight]) => {
        if (content.toLowerCase().includes(keyword.toLowerCase())) {
            score += weight;
            findings.push(`Found keyword: ${keyword}`);
        }
    });

    const isFinancialDoc = /Q\d\sFinancials|FY\d{2}\sBudget|Investor\sDeck/i.test(content);
    if (isFinancialDoc) {
        score += 20;
        findings.push("Potential financial report terms found.");
    }
    
    let snippet: string | null = null;
    if (score > 20) {
        const match = content.match(new RegExp(`.{0,50}(${Object.keys(keywordWeights).join('|')}).{0,50}`, "i"));
        snippet = match ? match[0] : null;
    }

    const severity = score > 40 ? 'CRITICAL' : score > 25 ? 'HIGH' : score > 10 ? 'MEDIUM' : 'LOW';
    return { severity: findings.length === 0 ? 'INFO' : severity, findings, snippet };
}

export async function runFileHunt(job: { companyName: string; domain: string; scanId?: string }): Promise<number> {
    const { companyName, domain, scanId } = job;
    log('[fileHunt] Starting file hunting for', companyName);
    const headers = { 'X-API-KEY': process.env.SERPER_KEY! };
    const dorksByCat = await getDorks();
    let findingsCount = 0;

    for (const [category, dorks] of dorksByCat.entries()) {
        log(`[fileHunt] Running dork category: ${category}`);
        for (const q of dorks) {
            // Use exact organization name matching and domain restriction to avoid false positives
            const query = q.replace(/COMPANY_NAME/g, `"${companyName}"`).replace(/DOMAIN/g, `site:${domain}`);
            try {
                const { data } = await axios.post(SERPER_URL, { q: query }, { headers });
                for (const hit of data.organic ?? []) {
                    // Additional validation: ensure the result is actually related to the organization
                    const isRelevant = hit.link.includes(domain) || 
                                     hit.title?.toLowerCase().includes(companyName.toLowerCase()) ||
                                     hit.snippet?.toLowerCase().includes(companyName.toLowerCase());
                    
                    if (!isRelevant) {
                        log(`[fileHunt] Skipping irrelevant result: ${hit.link}`);
                        continue;
                    }
                    const downloadResult = await download(hit.link);
                    if (!downloadResult) continue;

                    const { buffer, mime } = downloadResult;
                    const hashes = {
                        md5: crypto.createHash('md5').update(buffer).digest('hex'),
                        sha1: crypto.createHash('sha1').update(buffer).digest('hex'),
                        sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
                    };
                    
                    let fileContent = '';
                    let fileMetadata: any = {};
                    if (mime.includes('pdf')) {
                        const loadingTask = getDocument(buffer);
                        const pdfDocument = await loadingTask.promise;

                        let fullText = '';
                        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
                            const page = await pdfDocument.getPage(pageNum);
                            const textContent = await page.getTextContent();
                            fullText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
                        }
                        fileContent = fullText;
                        fileMetadata = pdfDocument.info;
                    } else {
                        fileContent = buffer.toString('utf-8');
                    }
                    
                    const langDetection = detectLanguage(fileContent.substring(0, 1000));
                    const { severity, findings, snippet } = await assessSensitivity(fileContent, hit.link);
                    const isKnownBreach = !!KNOWN_BREACHED_HASHES[hashes.sha256 as keyof typeof KNOWN_BREACHED_HASHES];

                    const artifactId = await insertArtifact({
                        type: 'file',
                        val_text: `Exposed file: ${path.basename(hit.link)}`,
                        severity: isKnownBreach ? 'CRITICAL' : severity,
                        src_url: hit.link,
                        meta: {
                            scan_id: scanId,
                            scan_module: 'fileHunt',
                            hashes,
                            file_metadata: fileMetadata,
                            language: langDetection.length > 0 ? langDetection[0].lang : 'unknown',
                            is_known_breach: isKnownBreach,
                            breach_source: KNOWN_BREACHED_HASHES[hashes.sha256 as keyof typeof KNOWN_BREACHED_HASHES] || null,
                            sensitive_content_snippet: snippet,
                            search_query: query
                        }
                    });

                    if (isKnownBreach || severity === 'HIGH' || severity === 'CRITICAL') {
                         await insertFinding(artifactId, 'DATA_EXPOSURE', 'Remediate exposure and investigate if data was accessed.', `Sensitive file exposed: ${hit.link}`);
                    }
                    findingsCount++;
                }
            } catch (searchError) {
                log('[fileHunt] Search error:', (searchError as Error).message);
            }
            await new Promise(r => setTimeout(r, 1500)); // Rate limit
        }
    }
    
    log('[fileHunt] File hunting completed for', companyName, '- found', findingsCount, 'exposed files');
    return findingsCount;
}
