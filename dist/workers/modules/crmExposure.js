import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { uploadFile } from '../core/objectStore.js';
import { log } from '../core/logger.js';
const SERPER_URL = 'https://google.serper.dev/search';
// HubSpot and Salesforce CDN patterns
const HUBSPOT_PATTERNS = [
    '*.hubspotusercontent-na1.net',
    '*.hubspotusercontent-eu1.net',
    '*.hubspotusercontent-ap1.net',
    '*.hs-sites.com',
    'f.hubspotusercontent*.net'
];
const SALESFORCE_PATTERNS = [
    '*.content.force.com',
    '*.my.salesforce.com',
    '*.visualforce.com',
    '*.lightning.force.com'
];
// Generate CRM-specific dork queries
function generateCrmDorks(companyName, domain) {
    const targetName = `"${companyName}"`;
    const targetDomain = `"${domain}"`;
    const target = `(${targetName} OR ${targetDomain})`;
    const extensions = '(ext:pdf OR ext:xlsx OR ext:csv OR ext:docx OR ext:ppt OR ext:zip)';
    const dorks = [];
    // HubSpot dorks
    for (const pattern of HUBSPOT_PATTERNS) {
        if (pattern.includes('hs-sites.com')) {
            dorks.push(`site:${pattern} ${target} ${extensions}`);
        }
        else {
            dorks.push(`site:${pattern} inurl:/hubfs ${target} ${extensions}`);
        }
    }
    // Salesforce dorks
    dorks.push(`site:*.my.salesforce.com inurl:"/servlet/servlet.FileDownload?file=" ${target}`);
    dorks.push(`site:*.content.force.com inurl:"/sfc/servlet.shepherd/document" ${target}`);
    dorks.push(`site:*.visualforce.com ${target} ${extensions}`);
    dorks.push(`site:*.lightning.force.com ${target} ${extensions}`);
    return dorks;
}
// Download and analyze file
async function downloadAndAnalyze(url, companyName) {
    try {
        const res = await axios.get(url, {
            responseType: 'arraybuffer',
            timeout: 30000,
            maxContentLength: 15 * 1024 * 1024, // 15MB limit
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; DealBrief-Scanner/1.0)'
            }
        });
        const buf = Buffer.from(res.data);
        // Skip if too large
        if (buf.length > 15 * 1024 * 1024) {
            log('[crmExposure] File too large, skipping:', url);
            return null;
        }
        const sha = crypto.createHash('sha256').update(buf).digest('hex');
        const ext = path.extname(url).split('?')[0].replace(/[^a-z0-9.]/gi, '');
        const tmp = `/tmp/crm_${sha}${ext}`;
        await fs.writeFile(tmp, buf);
        const mime = res.headers['content-type'] ?? 'application/octet-stream';
        // Analyze content for sensitivity
        const textContent = buf.toString('utf8', 0, Math.min(buf.length, 50000)); // First 50KB for analysis
        const { sensitivity, findings } = analyzeSensitivity(textContent, companyName);
        return {
            sha256: sha,
            mime,
            localPath: tmp,
            sensitivity,
            findings
        };
    }
    catch (err) {
        log('[crmExposure] Download error:', url, err.message);
        return null;
    }
}
// Analyze content sensitivity
function analyzeSensitivity(content, companyName) {
    const findings = [];
    let score = 0;
    const lowerContent = content.toLowerCase();
    // High-entropy strings (potential keys/tokens)
    const highEntropyRegex = /[A-Za-z0-9+/]{40,}[=]{0,2}/g;
    const entropyMatches = content.match(highEntropyRegex) || [];
    if (entropyMatches.length > 0) {
        score += entropyMatches.length * 15;
        findings.push(`Potential API keys/tokens: ${entropyMatches.length} found`);
    }
    // JWT tokens
    const jwtRegex = /eyJ[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]+/g;
    const jwtMatches = content.match(jwtRegex) || [];
    if (jwtMatches.length > 0) {
        score += jwtMatches.length * 20;
        findings.push(`JWT tokens: ${jwtMatches.length} found`);
    }
    // Database connection strings
    const dbRegex = /(postgresql|mysql|mongodb):\/\/[^\s"'<>]+/gi;
    const dbMatches = content.match(dbRegex) || [];
    if (dbMatches.length > 0) {
        score += dbMatches.length * 25;
        findings.push(`Database URLs: ${dbMatches.length} found`);
    }
    // PII keywords
    const piiKeywords = [
        'social security', 'ssn', 'passport', 'driver.?license', 'birth.?date', 'dob',
        'credit.?card', 'bank.?account', 'routing.?number', 'tax.?id', 'ein'
    ];
    for (const keyword of piiKeywords) {
        const regex = new RegExp(keyword.replace(/\?/g, '\\s*'), 'gi');
        if (regex.test(lowerContent)) {
            score += 10;
            findings.push(`PII keyword: ${keyword.replace(/\.\?\s*/g, ' ')}`);
        }
    }
    // Confidential markings
    const confidentialKeywords = [
        'confidential', 'proprietary', 'internal.?use.?only', 'nda', 'non.?disclosure',
        'classified', 'restricted', 'private', 'sensitive', 'do.?not.?distribute'
    ];
    for (const keyword of confidentialKeywords) {
        const regex = new RegExp(keyword.replace(/\?/g, '\\s*'), 'gi');
        if (regex.test(lowerContent)) {
            score += 8;
            findings.push(`Confidential marking: ${keyword.replace(/\.\?\s*/g, ' ')}`);
        }
    }
    // Financial data indicators
    const financialKeywords = [
        'revenue', 'profit', 'loss', 'budget', 'financial.?statement', 'balance.?sheet',
        'cash.?flow', 'quarterly.?report', 'annual.?report', 'investor'
    ];
    for (const keyword of financialKeywords) {
        const regex = new RegExp(keyword.replace(/\?/g, '\\s*'), 'gi');
        if (regex.test(lowerContent)) {
            score += 5;
            findings.push(`Financial data: ${keyword.replace(/\.\?\s*/g, ' ')}`);
        }
    }
    // Target company mentions (positive indicator)
    const companyRegex = new RegExp(companyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const companyMatches = content.match(companyRegex) || [];
    if (companyMatches.length > 0) {
        score += companyMatches.length * 3;
        findings.push(`Company mentions: ${companyMatches.length}`);
    }
    // Reduce score for marketing boilerplate
    const marketingKeywords = [
        'marketing', 'newsletter', 'subscribe', 'unsubscribe', 'webinar', 'download',
        'whitepaper', 'case.?study', 'brochure', 'datasheet'
    ];
    let marketingScore = 0;
    for (const keyword of marketingKeywords) {
        const regex = new RegExp(keyword.replace(/\?/g, '\\s*'), 'gi');
        if (regex.test(lowerContent)) {
            marketingScore += 2;
        }
    }
    if (marketingScore > 10) {
        score -= Math.min(score * 0.3, 20); // Reduce by up to 30% or 20 points
        findings.push('Marketing content detected (reduced sensitivity)');
    }
    return {
        sensitivity: Math.max(0, Math.round(score)),
        findings
    };
}
// Determine platform from URL
function getPlatform(url) {
    if (url.includes('hubspot'))
        return 'HubSpot';
    if (url.includes('salesforce') || url.includes('force.com'))
        return 'Salesforce';
    return 'Unknown CRM';
}
// Determine severity based on sensitivity score
function getSeverity(score) {
    if (score >= 50)
        return 'CRITICAL';
    if (score >= 30)
        return 'HIGH';
    if (score >= 15)
        return 'MEDIUM';
    if (score >= 5)
        return 'LOW';
    return 'INFO';
}
export async function runCrmExposure(job) {
    const { companyName, domain, scanId } = job;
    log('[crmExposure] Starting CRM exposure scan for', companyName);
    const headers = { 'X-API-KEY': process.env.SERPER_KEY };
    const seen = new Set();
    const dorks = generateCrmDorks(companyName, domain);
    let findingsCount = 0;
    for (const query of dorks) {
        try {
            log('[crmExposure] Searching:', query);
            const { data } = await axios.post(SERPER_URL, { q: query, num: 25, gl: 'us', hl: 'en' }, { headers });
            for (const hit of data.organic ?? []) {
                const url = hit.link;
                if (seen.has(url))
                    continue;
                seen.add(url);
                const platform = getPlatform(url);
                log('[crmExposure] Processing', platform, 'file:', url);
                // Handle Salesforce token refresh for 403s
                let analysisResult = await downloadAndAnalyze(url, companyName);
                if (!analysisResult && platform === 'Salesforce' && url.includes('/sfc/')) {
                    log('[crmExposure] Retrying Salesforce URL for token refresh');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    analysisResult = await downloadAndAnalyze(url, companyName);
                }
                if (!analysisResult)
                    continue;
                const { sha256, mime, localPath, sensitivity, findings } = analysisResult;
                // Upload to storage
                const key = `crm/${platform.toLowerCase()}/${sha256}${path.extname(url).split('?')[0]}`;
                const storageUrl = await uploadFile(localPath, key, mime);
                // Create artifact
                const artifactId = await insertArtifact({
                    type: 'crm_exposure',
                    val_text: `${platform} exposed file: ${path.basename(url)}`,
                    severity: getSeverity(sensitivity),
                    src_url: url,
                    sha256,
                    mime,
                    meta: {
                        scan_id: scanId,
                        platform,
                        sensitivity_score: sensitivity,
                        company_mentions: findings.filter(f => f.includes('Company mentions')).length > 0,
                        storage_url: storageUrl,
                        file_size: (await fs.stat(localPath)).size,
                        findings: findings.slice(0, 10), // Limit findings in meta
                        preview: (await fs.readFile(localPath, 'utf8')).slice(0, 120) + '...'
                    }
                });
                // Create findings for high-sensitivity content
                if (sensitivity >= 15) {
                    await insertFinding(artifactId, 'DATA_EXPOSURE', `Secure the ${platform} CDN by reviewing file permissions and access controls. Consider implementing authentication for sensitive documents.`, `Sensitive document exposed on ${platform} CDN with sensitivity score ${sensitivity}. Found: ${findings.join(', ')}`);
                }
                // Cleanup
                await fs.unlink(localPath);
                findingsCount++;
                log('[crmExposure] Processed', platform, 'file with sensitivity score:', sensitivity);
            }
            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        catch (err) {
            log('[crmExposure] Search error for query:', query, err.message);
        }
    }
    log('[crmExposure] CRM exposure scan completed for', companyName, '- found', findingsCount, 'exposed files');
    return findingsCount;
}
//# sourceMappingURL=crmExposure.js.map