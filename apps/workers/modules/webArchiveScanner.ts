/*
 * =============================================================================
 * MODULE: webArchiveScanner.ts
 * =============================================================================
 * Web archive discovery using Wayback Machine and other archive services.
 * Discovers historical URLs that might have exposed secrets or sensitive files.
 * =============================================================================
 */

import axios from 'axios';
import * as https from 'node:https';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

// Configuration - Tier-based scanning
const TIER1_MAX_ARCHIVE_URLS = 20;      // Quick scan: 20 URLs
const TIER2_MAX_ARCHIVE_URLS = 200;     // Deep dive: 200 URLs
const TIER1_MAX_YEARS_BACK = 1;         // Quick scan: 1 year
const TIER2_MAX_YEARS_BACK = 3;         // Deep dive: 3 years
const MAX_CONCURRENT_FETCHES = 12;      // Increased for speed
const ARCHIVE_TIMEOUT = 8000;           // Reduced timeout
const WAYBACK_API_URL = 'https://web.archive.org/cdx/search/cdx';

interface ArchiveUrl {
    url: string;
    timestamp: string;
    statusCode: string;
    mimeType: string;
    digest: string;
    originalUrl: string;
    confidence: 'high' | 'medium' | 'low';
    reason: string;
}

interface ArchiveResult {
    url: string;
    content: string;
    size: number;
    accessible: boolean;
    archiveTimestamp: string;
}

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15'
];

/**
 * Get historical URLs from Wayback Machine
 */
async function getWaybackUrls(domain: string, tier: 'tier1' | 'tier2' = 'tier1'): Promise<ArchiveUrl[]> {
    const archiveUrls: ArchiveUrl[] = [];
    
    try {
        const currentYear = new Date().getFullYear();
        const maxYearsBack = tier === 'tier1' ? TIER1_MAX_YEARS_BACK : TIER2_MAX_YEARS_BACK;
        const maxUrls = tier === 'tier1' ? TIER1_MAX_ARCHIVE_URLS : TIER2_MAX_ARCHIVE_URLS;
        const startYear = currentYear - maxYearsBack;
        
        log(`[webArchiveScanner] ${tier.toUpperCase()} scan: Querying Wayback Machine for ${domain} (${startYear}-${currentYear})`);
        
        // Query Wayback Machine CDX API
        const response = await axios.get(WAYBACK_API_URL, {
            params: {
                url: `*.${domain}/*`,
                output: 'json',
                collapse: 'digest',
                from: startYear.toString(),
                to: currentYear.toString(),
                limit: maxUrls * 2, // Get more to filter down
                filter: 'statuscode:200'
            },
            timeout: ARCHIVE_TIMEOUT
        });
        
        if (!Array.isArray(response.data) || response.data.length < 2) {
            log('[webArchiveScanner] No archive data found');
            return archiveUrls;
        }
        
        // Skip header row and process results
        const results = response.data.slice(1);
        log(`[webArchiveScanner] Found ${results.length} archived URLs`);
        
        for (const row of results) {
            if (archiveUrls.length >= maxUrls) break;
            
            const [urlkey, timestamp, originalUrl, mimeType, statusCode, digest] = row;
            
            if (!originalUrl || !timestamp) continue;
            
            // Filter for interesting URLs
            const confidence = categorizeUrl(originalUrl);
            if (confidence === 'low') continue;
            
            archiveUrls.push({
                url: `https://web.archive.org/web/${timestamp}/${originalUrl}`,
                timestamp,
                statusCode,
                mimeType: mimeType || 'unknown',
                digest,
                originalUrl,
                confidence,
                reason: getUrlReason(originalUrl)
            });
        }
        
        // Sort by confidence and recency
        archiveUrls.sort((a, b) => {
            const confidenceScore = { high: 3, medium: 2, low: 1 };
            const aScore = confidenceScore[a.confidence];
            const bScore = confidenceScore[b.confidence];
            
            if (aScore !== bScore) return bScore - aScore;
            return b.timestamp.localeCompare(a.timestamp);
        });
        
        log(`[webArchiveScanner] Filtered to ${archiveUrls.length} high-interest archived URLs`);
        
    } catch (error) {
        log('[webArchiveScanner] Error querying Wayback Machine:', (error as Error).message);
    }
    
    return archiveUrls.slice(0, maxUrls);
}

/**
 * Categorize URLs by likelihood of containing secrets
 */
function categorizeUrl(url: string): 'high' | 'medium' | 'low' {
    const urlLower = url.toLowerCase();
    
    // High-value patterns
    const highPatterns = [
        /\.env/i,
        /config\.(json|js|php|yaml|yml)/i,
        /settings\.(json|js|php|yaml|yml)/i,
        /\.git\//i,
        /\.svn\//i,
        /backup/i,
        /\.sql$/i,
        /\.zip$/i,
        /\.tar\.gz$/i,
        /admin/i,
        /debug/i,
        /test/i,
        /staging/i,
        /dev/i,
        /api.*config/i,
        /swagger\.(json|yaml|yml)/i,
        /openapi\.(json|yaml|yml)/i,
        /\.map$/i, // Source maps
        /package\.json$/i,
        /composer\.json$/i,
        /requirements\.txt$/i,
        /Gemfile/i,
        /pom\.xml$/i,
        /web\.config$/i,
        /\.htaccess$/i,
        /wp-config\.php$/i,
        /database\.(php|json|yml|yaml)/i
    ];
    
    // Medium-value patterns
    const mediumPatterns = [
        /\.(js|css)$/i,
        /\/api\//i,
        /\/docs?\//i,
        /\/help/i,
        /\/info/i,
        /\.(php|asp|aspx|jsp)$/i,
        /robots\.txt$/i,
        /sitemap\.xml$/i,
        /\.well-known\//i
    ];
    
    for (const pattern of highPatterns) {
        if (pattern.test(urlLower)) return 'high';
    }
    
    for (const pattern of mediumPatterns) {
        if (pattern.test(urlLower)) return 'medium';
    }
    
    return 'low';
}

/**
 * Get reason why URL is interesting
 */
function getUrlReason(url: string): string {
    const urlLower = url.toLowerCase();
    
    if (/\.env/i.test(url)) return 'Environment configuration file';
    if (/config\./i.test(url)) return 'Configuration file';
    if (/settings\./i.test(url)) return 'Settings file';
    if (/\.git\//i.test(url)) return 'Git repository exposure';
    if (/backup/i.test(url)) return 'Backup file';
    if (/admin/i.test(url)) return 'Admin interface';
    if (/debug/i.test(url)) return 'Debug endpoint';
    if (/swagger|openapi/i.test(url)) return 'API documentation';
    if (/\.map$/i.test(url)) return 'Source map file';
    if (/package\.json$/i.test(url)) return 'Package manifest';
    if (/wp-config\.php$/i.test(url)) return 'WordPress configuration';
    if (/database\./i.test(url)) return 'Database configuration';
    if (/api/i.test(url)) return 'API endpoint';
    
    return 'Potentially sensitive file';
}

/**
 * Fetch archived content that might contain secrets
 */
async function fetchArchivedContent(archiveUrls: ArchiveUrl[]): Promise<ArchiveResult[]> {
    const results: ArchiveResult[] = [];
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    
    // Process URLs in chunks to control concurrency
    for (let i = 0; i < archiveUrls.length; i += MAX_CONCURRENT_FETCHES) {
        const chunk = archiveUrls.slice(i, i + MAX_CONCURRENT_FETCHES);
        
        const chunkResults = await Promise.allSettled(\n            chunk.map(async (archiveUrl) => {\n                try {\n                    log(`[webArchiveScanner] Fetching archived content: ${archiveUrl.originalUrl}`);\n                    \n                    const response = await axios.get(archiveUrl.url, {\n                        timeout: ARCHIVE_TIMEOUT,\n                        maxContentLength: 5 * 1024 * 1024, // 5MB max\n                        httpsAgent,\n                        headers: {\n                            'User-Agent': USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]\n                        },\n                        validateStatus: () => true\n                    });\n                    \n                    if (response.status === 200 && response.data) {\n                        const content = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);\n                        \n                        return {\n                            url: archiveUrl.originalUrl,\n                            content: content.length > 100000 ? content.substring(0, 100000) + '...[truncated]' : content,\n                            size: content.length,\n                            accessible: true,\n                            archiveTimestamp: archiveUrl.timestamp,\n                            archiveUrl: archiveUrl.url,\n                            confidence: archiveUrl.confidence,\n                            reason: archiveUrl.reason\n                        };\n                    }\n                    \n                } catch (error) {\n                    log(`[webArchiveScanner] Failed to fetch ${archiveUrl.originalUrl}:`, (error as Error).message);\n                }\n                \n                return null;\n            })\n        );\n        \n        // Process chunk results\n        for (const result of chunkResults) {\n            if (result.status === 'fulfilled' && result.value) {\n                results.push(result.value);\n                log(`[webArchiveScanner] Successfully fetched archived content: ${result.value.url}`);\n            }\n        }\n        \n        // Rate limiting delay\n        if (i + MAX_CONCURRENT_FETCHES < archiveUrls.length) {\n            await new Promise(resolve => setTimeout(resolve, 1000));\n        }\n    }\n    \n    return results;\n}\n\n/**\n * Check if gau tool is available for alternative archive discovery\n */\nasync function checkGauAvailability(): Promise<boolean> {\n    try {\n        const { execFile } = await import('node:child_process');\n        const { promisify } = await import('node:util');\n        const exec = promisify(execFile);\n        \n        await exec('gau', ['--version']);\n        return true;\n    } catch (error) {\n        return false;\n    }\n}\n\n/**\n * Use gau tool for additional archive discovery\n */\nasync function getGauUrls(domain: string): Promise<string[]> {\n    try {\n        log('[webArchiveScanner] Using gau for additional archive discovery');\n        \n        const { execFile } = await import('node:child_process');\n        const { promisify } = await import('node:util');\n        const exec = promisify(execFile);\n        \n        const { stdout } = await exec('gau', [\n            domain,\n            '--threads', '5',\n            '--timeout', '30',\n            '--retries', '2'\n        ], { timeout: 60000 });\n        \n        const urls = stdout.trim().split('\\n').filter(Boolean);\n        log(`[webArchiveScanner] gau discovered ${urls.length} URLs`);\n        \n        // Filter for interesting URLs\n        return urls.filter(url => categorizeUrl(url) !== 'low').slice(0, 100);\n        \n    } catch (error) {\n        log('[webArchiveScanner] Error using gau:', (error as Error).message);\n        return [];\n    }\n}\n\n/**\n * Main Web Archive Scanner function\n */\nexport async function runWebArchiveScanner(job: { domain: string; scanId?: string }): Promise<number> {\n    log(`[webArchiveScanner] Starting web archive discovery for ${job.domain}`);\n    \n    if (!job.scanId) {\n        log('[webArchiveScanner] No scanId provided - skipping archive scanning');\n        return 0;\n    }\n    \n    try {\n        let totalFindings = 0;\n        \n        // 1. Get historical URLs from Wayback Machine\n        const waybackUrls = await getWaybackUrls(job.domain);\n        \n        // 2. Try gau tool if available\n        const gauAvailable = await checkGauAvailability();\n        let gauUrls: string[] = [];\n        if (gauAvailable) {\n            gauUrls = await getGauUrls(job.domain);\n        } else {\n            log('[webArchiveScanner] gau tool not available - using Wayback Machine only');\n        }\n        \n        // 3. Fetch archived content for high-value URLs\n        const archivedContent = await fetchArchivedContent(waybackUrls);\n        \n        // 4. Save archived content as web assets for secret scanning\n        if (archivedContent.length > 0) {\n            await insertArtifact({\n                type: 'discovered_web_assets',\n                val_text: `Discovered ${archivedContent.length} archived web assets for secret scanning on ${job.domain}`,\n                severity: 'INFO',\n                meta: {\n                    scan_id: job.scanId,\n                    scan_module: 'webArchiveScanner',\n                    assets: archivedContent.map(content => ({\n                        url: content.url,\n                        type: 'html',\n                        size: content.size,\n                        confidence: content.confidence,\n                        source: 'web_archive',\n                        content: content.content,\n                        mimeType: 'text/html',\n                        archive_timestamp: content.archiveTimestamp,\n                        archive_url: content.archiveUrl,\n                        reason: content.reason\n                    }))\n                }\n            });\n            \n            totalFindings += archivedContent.length;\n        }\n        \n        // 5. Save historical URL list for reference\n        if (waybackUrls.length > 0 || gauUrls.length > 0) {\n            await insertArtifact({\n                type: 'historical_urls',\n                val_text: `Discovered ${waybackUrls.length + gauUrls.length} historical URLs for ${job.domain}`,\n                severity: 'INFO',\n                meta: {\n                    scan_id: job.scanId,\n                    scan_module: 'webArchiveScanner',\n                    wayback_urls: waybackUrls,\n                    gau_urls: gauUrls,\n                    years_scanned: MAX_YEARS_BACK,\n                    total_historical_urls: waybackUrls.length + gauUrls.length\n                }\n            });\n        }\n        \n        log(`[webArchiveScanner] Completed web archive discovery: ${totalFindings} assets found from ${waybackUrls.length + gauUrls.length} historical URLs`);\n        return totalFindings;\n        \n    } catch (error) {\n        log('[webArchiveScanner] Error in web archive discovery:', (error as Error).message);\n        return 0;\n    }\n}