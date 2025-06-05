import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { uploadFile } from '../core/objectStore.js';
import { log } from '../core/logger.js';
const SERPER_URL = 'https://google.serper.dev/search';
// Load dork templates
const DORKS = await fs.readFile(new URL('../templates/dorks.txt', import.meta.url), 'utf8')
    .then((t) => t
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean))
    .catch(() => [
    // Fallback dorks if file not found
    'site:DOMAIN filetype:pdf',
    'site:DOMAIN filetype:xlsx',
    'site:DOMAIN filetype:csv',
    'COMPANY_NAME filetype:pdf',
    'COMPANY_NAME "confidential" filetype:pdf',
    'COMPANY_NAME "internal" filetype:pdf',
    'COMPANY_NAME filetype:sql',
    'COMPANY_NAME filetype:log'
]);
/** Download URL to tmp file; returns [sha256, mime, localPath] */
async function download(url) {
    try {
        const res = await axios.get(url, {
            responseType: 'arraybuffer',
            timeout: 15000,
            maxContentLength: 10 * 1024 * 1024, // 10MB limit
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; DealBrief-Scanner/1.0)'
            }
        });
        const buf = Buffer.from(res.data);
        if (buf.length === 0)
            return null;
        const sha = crypto.createHash('sha256').update(buf).digest('hex');
        const ext = path.extname(url).split('?')[0].replace(/[^a-z0-9.]/gi, '');
        const tmp = `/tmp/file_${sha}${ext}`;
        await fs.writeFile(tmp, buf);
        return [sha, res.headers['content-type'] ?? 'application/octet-stream', tmp];
    }
    catch (error) {
        log('[fileHunt] Download failed:', url, error.message);
        return null;
    }
}
function assessSensitivity(filename, url) {
    const findings = [];
    let severity = 'INFO';
    const lowerFilename = filename.toLowerCase();
    const lowerUrl = url.toLowerCase();
    // High-sensitivity keywords
    const criticalKeywords = ['password', 'credential', 'secret', 'private', 'confidential'];
    const highKeywords = ['internal', 'financial', 'budget', 'salary', 'contract', 'agreement'];
    const mediumKeywords = ['employee', 'staff', 'org-chart', 'organization'];
    for (const keyword of criticalKeywords) {
        if (lowerFilename.includes(keyword) || lowerUrl.includes(keyword)) {
            findings.push(`Critical keyword: ${keyword}`);
            severity = 'CRITICAL';
        }
    }
    if (severity !== 'CRITICAL') {
        for (const keyword of highKeywords) {
            if (lowerFilename.includes(keyword) || lowerUrl.includes(keyword)) {
                findings.push(`High-risk keyword: ${keyword}`);
                severity = 'HIGH';
            }
        }
    }
    if (severity !== 'CRITICAL' && severity !== 'HIGH') {
        for (const keyword of mediumKeywords) {
            if (lowerFilename.includes(keyword) || lowerUrl.includes(keyword)) {
                findings.push(`Medium-risk keyword: ${keyword}`);
                severity = 'MEDIUM';
            }
        }
    }
    // File type assessment
    const highRiskExts = ['.sql', '.log', '.env', '.config'];
    const mediumRiskExts = ['.pdf', '.xlsx', '.csv', '.docx'];
    const ext = path.extname(lowerFilename);
    if (highRiskExts.includes(ext)) {
        findings.push(`High-risk file type: ${ext}`);
        severity = severity === 'INFO' ? 'HIGH' : severity;
    }
    else if (mediumRiskExts.includes(ext)) {
        findings.push(`Medium-risk file type: ${ext}`);
        severity = severity === 'INFO' ? 'MEDIUM' : severity;
    }
    return { severity: severity === 'INFO' ? 'MEDIUM' : severity, findings };
}
export async function runFileHunt(job) {
    const { companyName, domain, scanId } = job;
    log('[fileHunt] Starting file hunting for', companyName);
    const headers = { 'X-API-KEY': process.env.SERPER_KEY };
    const seen = new Set();
    let findingsCount = 0;
    for (const q of DORKS) {
        const query = q
            .replace(/COMPANY_NAME/g, `"${companyName}"`)
            .replace(/DOMAIN/g, `"${domain}"`);
        try {
            log('[fileHunt] Searching:', query);
            const { data } = await axios.post(SERPER_URL, { q: query, num: 10, gl: 'us', hl: 'en' }, { headers });
            for (const hit of data.organic ?? []) {
                const url = hit.link;
                if (seen.has(url))
                    continue;
                seen.add(url);
                const isBinary = /\.(pdf|docx?|xlsx?|csv|zip|tgz|sql|log|txt|env|config)$/i.test(url);
                if (!isBinary)
                    continue;
                const downloadResult = await download(url);
                if (!downloadResult)
                    continue;
                const [sha, mime, tmp] = downloadResult;
                const filename = path.basename(url);
                const { severity, findings } = assessSensitivity(filename, url);
                try {
                    // Upload to storage
                    const key = `files/${sha}${path.extname(url).split('?')[0]}`;
                    const storageUrl = await uploadFile(tmp, key, mime);
                    // Create artifact
                    const artifactId = await insertArtifact({
                        type: 'file',
                        val_text: `Exposed file: ${filename}`,
                        severity,
                        src_url: url,
                        sha256: sha,
                        mime,
                        meta: {
                            scan_id: scanId,
                            scan_module: 'fileHunt',
                            filename,
                            file_size: (await fs.stat(tmp)).size,
                            storage_url: storageUrl,
                            sensitivity_findings: findings,
                            search_query: query
                        }
                    });
                    // Create finding for sensitive files
                    if (severity === 'HIGH' || severity === 'CRITICAL') {
                        await insertFinding(artifactId, 'DATA_EXPOSURE', 'Remove or secure exposed files. Implement proper access controls and review file permissions. Consider using authentication for sensitive documents.', `Sensitive file exposed: ${filename}. Found: ${findings.join(', ')}`);
                    }
                    findingsCount++;
                    log('[fileHunt] Found exposed file:', filename, `(${severity})`);
                }
                catch (uploadError) {
                    log('[fileHunt] Upload failed for', url, uploadError.message);
                }
                finally {
                    // Cleanup
                    await fs.unlink(tmp).catch(() => { });
                }
            }
            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        catch (searchError) {
            log('[fileHunt] Search error for query:', query, searchError.message);
        }
    }
    log('[fileHunt] File hunting completed for', companyName, '- found', findingsCount, 'exposed files');
    return findingsCount;
}
//# sourceMappingURL=fileHunt.js.map