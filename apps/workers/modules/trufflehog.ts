/*
 * =============================================================================
 * MODULE: trufflehog.ts (Refactored)
 * =============================================================================
 * This module runs TruffleHog to find secrets in Git repositories, websites,
 * and local files from other scan modules.
 *
 * Key Improvements from previous version:
 * 1.  **Hardened Website Crawler:** The crawler now includes resource limits
 * (file size, total files, total size) and secure filename sanitization to
 * prevent resource exhaustion and path traversal attacks.
 * 2.  **Expanded Git Repo Scanning:** The limit on the number of GitHub repos
 * scanned has been increased for better coverage.
 * 3.  **Targeted File Scanning:** Overly broad filesystem globs have been replaced
 * with more specific patterns that target the known output files from other
 * modules like spiderFoot and documentExposure.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as https from 'node:https';
import axios from 'axios';
import { parse } from 'node-html-parser';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import { ggshieldScanAndConvert } from '../utils/ggshieldRunner.js';
import { GG_MAX_WORKERS } from '../core/env.js';
import { scanGitRepos } from './scanGitRepos.js';

const exec = promisify(execFile);
const GITHUB_RE = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)(\.git)?$/i;
const MAX_CRAWL_DEPTH = 2; // Keep depth for admin/api paths
const MAX_GIT_REPOS_TO_SCAN = 10; // Reduced from 20 to 10

// BALANCED: Moderate limits for better secret detection
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3MB - catches most modern SPAs
const MAX_FILES_PER_CRAWL = 35; // 35 files - good coverage without excess
const MAX_TOTAL_CRAWL_SIZE_BYTES = 30 * 1024 * 1024; // 30MB total

/**
 * Generate recommendations based on the secret detector type
 */
function getRecommendationForSecret(detectorName: string, verified: boolean): string {
    const baseRecommendations: { [key: string]: string } = {
        'Supabase': 'Remove Supabase service keys from client-side code immediately. Use environment variables on server-side only.',
        'AWS': 'Rotate AWS credentials immediately. Use IAM roles and temporary credentials instead of hardcoded keys.',
        'Google': 'Rotate Google API keys immediately. Use Google Cloud IAM service accounts with proper scoping.',
        'GitHub': 'Revoke GitHub personal access tokens immediately. Use short-lived tokens with minimal scopes.',
        'Slack': 'Revoke Slack API tokens immediately. Use OAuth 2.0 with proper token rotation.',
        'Discord': 'Revoke Discord bot tokens immediately. Regenerate tokens and use proper secret management.',
        'Stripe': 'Revoke Stripe API keys immediately. Use webhook endpoints with proper validation.',
        'Twilio': 'Revoke Twilio credentials immediately. Use SID/Auth Token pairs with proper rotation.',
        'SendGrid': 'Revoke SendGrid API keys immediately. Use minimal scope keys and rotate regularly.',
        'JWT': 'Invalidate JWT tokens immediately. Use shorter expiration times and proper secret rotation.',
        'Database': 'Change database passwords immediately. Use connection pooling and environment variables.',
        'Redis': 'Change Redis passwords immediately. Use AUTH command with strong passwords.',
        'MongoDB': 'Change MongoDB connection strings immediately. Use proper authentication and authorization.',
        'PostgreSQL': 'Change PostgreSQL credentials immediately. Use connection pooling and SSL connections.',
        'MySQL': 'Change MySQL credentials immediately. Use SSL connections and proper user privileges.',
    };

    // Find matching detector
    const detectorKey = Object.keys(baseRecommendations).find(key => 
        detectorName.toLowerCase().includes(key.toLowerCase())
    );
    
    const baseRecommendation = detectorKey ? baseRecommendations[detectorKey] : 
        'Immediately revoke and rotate these credentials. Remove from code and use secure secret management.';
    
    if (verified) {
        return `CRITICAL: ${baseRecommendation} This secret has been verified as active and working.`;
    } else {
        return `HIGH PRIORITY: ${baseRecommendation} While not verified, assume this secret is active.`;
    }
}
const MAX_PAGES = 75; // 75 pages - covers main site + admin sections

/**
 * Processes the JSON line-by-line output from a TruffleHog scan.
 */
/**
 * Parse database connection strings and create actionable targets
 */
async function parseSecretIntoTargets(secret: any, scanId: string): Promise<void> {
    const rawSecret = secret.Raw;
    const detector = secret.DetectorName.toLowerCase();
    
    // Database connection string patterns
    const dbPatterns = [
        // PostgreSQL: postgresql://user:pass@host:port/db
        /postgresql:\/\/([^:]+):([^@]+)@([^:\/]+):?(\d+)?(?:\/([^?]+))?/i,
        // MySQL: mysql://user:pass@host:port/db
        /mysql:\/\/([^:]+):([^@]+)@([^:\/]+):?(\d+)?(?:\/([^?]+))?/i,
        // MongoDB: mongodb://user:pass@host:port/db
        /mongodb:\/\/([^:]+):([^@]+)@([^:\/]+):?(\d+)?(?:\/([^?]+))?/i,
        // Generic database URLs
        /(?:postgres|mysql|mongodb|redis):\/\/([^:]+):([^@]+)@([^:\/]+):?(\d+)?/i
    ];

    // Check if this is a database connection string
    for (const pattern of dbPatterns) {
        const match = rawSecret.match(pattern);
        if (match) {
            const [, username, password, host, port, database] = match;
            const defaultPorts: Record<string, string> = {
                'postgresql': '5432',
                'mysql': '3306', 
                'mongodb': '27017',
                'redis': '6379'
            };
            
            const dbType = rawSecret.toLowerCase().includes('postgres') ? 'postgresql' :
                          rawSecret.toLowerCase().includes('mysql') ? 'mysql' :
                          rawSecret.toLowerCase().includes('mongodb') ? 'mongodb' :
                          rawSecret.toLowerCase().includes('redis') ? 'redis' : 'unknown';
            
            const finalPort = port || defaultPorts[dbType] || '5432';
            
            // Create database service target
            await insertArtifact({
                type: 'db_service_target',
                val_text: `Database service discovered from secrets: ${host}:${finalPort}`,
                severity: 'HIGH',
                src_url: `${dbType}://${host}:${finalPort}`,
                meta: {
                    scan_id: scanId,
                    scan_module: 'trufflehog:parser',
                    host,
                    port: finalPort,
                    service_type: dbType,
                    database: database || 'unknown',
                    source_secret: secret.DetectorName,
                    discovered_from: 'secret_analysis'
                }
            });
            
            // Create credential target
            await insertArtifact({
                type: 'credential_target',
                val_text: `Database credentials extracted: ${username}@${host}`,
                severity: 'CRITICAL',
                src_url: `${dbType}://${host}:${finalPort}`,
                meta: {
                    scan_id: scanId,
                    scan_module: 'trufflehog:parser',
                    username,
                    password,
                    host,
                    port: finalPort,
                    service_type: dbType,
                    database: database || 'unknown',
                    source_secret: secret.DetectorName
                }
            });
            
            log(`[trufflehog] [Parser] Extracted database target: ${host}:${finalPort} (${dbType})`);
            return;
        }
    }
    
    // API endpoint patterns (for future endpoint testing)
    const apiPatterns = [
        // Supabase URLs
        /https:\/\/([a-z0-9]+)\.supabase\.co/i,
        // Firebase URLs  
        /https:\/\/([a-z0-9-]+)\.firebaseio\.com/i,
        // AWS RDS hostnames
        /([a-z0-9-]+)\.([a-z0-9-]+)\.rds\.amazonaws\.com/i
    ];
    
    for (const pattern of apiPatterns) {
        const match = rawSecret.match(pattern);
        if (match) {
            await insertArtifact({
                type: 'api_endpoint_target',
                val_text: `API endpoint discovered from secrets: ${match[0]}`,
                severity: 'MEDIUM',
                src_url: match[0],
                meta: {
                    scan_id: scanId,
                    scan_module: 'trufflehog:parser',
                    endpoint: match[0],
                    service_hint: rawSecret.toLowerCase().includes('supabase') ? 'supabase' :
                                 rawSecret.toLowerCase().includes('firebase') ? 'firebase' :
                                 rawSecret.toLowerCase().includes('rds') ? 'aws_rds' : 'unknown',
                    source_secret: secret.DetectorName
                }
            });
            log(`[trufflehog] [Parser] Extracted API endpoint: ${match[0]}`);
            return;
        }
    }
}

async function processTrufflehogOutput(stdout: string, source_type: 'git' | 'http' | 'file' | 'web_asset', src_url: string, scanId?: string): Promise<number> {
    const lines = stdout.trim().split('\n').filter(Boolean);
    let findings = 0;

    for (const line of lines) {
        try {
            const obj = JSON.parse(line);
            findings++;
            
            // Create the basic secret artifact
            const artifactId = await insertArtifact({
                type: 'secret',
                val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}…`,
                severity: obj.Verified ? 'CRITICAL' : 'HIGH',
                src_url: src_url,
                meta: {
                    detector: obj.DetectorName,
                    verified: obj.Verified,
                    source_type: source_type,
                    extraction_method: source_type === 'web_asset' ? 'endpoint_discovery' : 'direct_probe',
                    file: obj.SourceMetadata?.Data?.Filesystem?.file ?? 'N/A',
                    line: obj.SourceMetadata?.Data?.Filesystem?.line ?? 0,
                    scan_id: scanId
                }
            });

            // Create finding for the secret
            await insertFinding(
                artifactId,
                obj.Verified ? 'VERIFIED_SECRET' : 'POTENTIAL_SECRET',
                getRecommendationForSecret(obj.DetectorName, obj.Verified),
                `${obj.DetectorName} secret detected in ${source_type}: ${obj.Raw.slice(0, 100)}...`
            );
            
            // NEW: Parse secret into actionable targets for other modules
            if (scanId) {
                await parseSecretIntoTargets(obj, scanId);
            }
            
        } catch (e) {
            log('[trufflehog] [ERROR] Failed to parse JSON output line:', (e as Error).message);
        }
    }
    return findings;
}



/**
 * REFACTOR: Hardened the crawler with resource limits and secure filename sanitization.
 * Now includes protection against deep link farms.
 * NOTE: Currently unused in favor of ggshield-based scanning
 */
async function scanWebsite(domain: string, scanId: string): Promise<number> {
    log('[trufflehog] [Website Scan] Starting crawl and scan for:', domain);
    const baseUrl = `https://${domain}`;
    const scanDir = `/tmp/trufflehog_crawl_${scanId}`;
    const visited = new Set<string>();
    let filesWritten = 0;
    let totalDownloadedSize = 0;
    let pagesVisited = 0; // Track total pages to prevent link farm attacks

    try {
        await fs.mkdir(scanDir, { recursive: true });

        const crawl = async (url: string, depth: number) => {
            // Check resource limits before proceeding - now includes page count limit
            if (depth > MAX_CRAWL_DEPTH || 
                visited.has(url) || 
                filesWritten >= MAX_FILES_PER_CRAWL || 
                totalDownloadedSize >= MAX_TOTAL_CRAWL_SIZE_BYTES ||
                pagesVisited >= MAX_PAGES) {
                return;
            }
            visited.add(url);
            pagesVisited++;

            try {
                log(`[trufflehog] [Website Scan] Attempting to fetch URL: ${url}`);
                const response = await axios.get(url, {
                    timeout: 10000,
                    maxContentLength: MAX_FILE_SIZE_BYTES,
                    maxBodyLength: MAX_FILE_SIZE_BYTES,
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0"
                    })
                });
                log(`[trufflehog] [Website Scan] Successfully fetched ${url}, content length: ${response.data.length}`);
                
                totalDownloadedSize += response.data.length;
                filesWritten++;

                // REFACTOR: Implemented secure filename sanitization.
                const safeName = (path.basename(new URL(url).pathname) || 'index.html').replace(/[^a-zA-Z0-9.-]/g, '_');
                const filePath = path.join(scanDir, safeName);

                await fs.writeFile(filePath, response.data);
                
                const contentType = response.headers['content-type'] || '';
                if (contentType.includes('text/html')) {
                    const root = parse(response.data);
                    const links = root.querySelectorAll('a[href], script[src]');
                    for (const link of links) {
                        const href = link.getAttribute('href') || link.getAttribute('src');
                        if (href) {
                            try {
                                const absoluteUrl = new URL(href, baseUrl).toString();
                                if (absoluteUrl.startsWith(baseUrl)) {
                                    await crawl(absoluteUrl, depth + 1);
                                }
                            } catch { /* Ignore malformed URLs */ }
                        }
                    }
                }
            } catch (crawlError) {
                log(`[trufflehog] [Website Scan] Failed to crawl or download ${url}:`, (crawlError as Error).message);
            }
        };

        await crawl(baseUrl, 1);

        if (filesWritten > 0) {
            log(`[trufflehog] [Website Scan] Crawl complete. Scanned ${pagesVisited} pages, downloaded ${filesWritten} files.`);
            const { stdout } = await exec('trufflehog', ['filesystem', scanDir, '--json', '--no-verification'], { maxBuffer: 20 * 1024 * 1024 });
            return await processTrufflehogOutput(stdout, 'http', baseUrl, scanId);
        }
        return 0;

    } catch (err) {
        log('[trufflehog] [Website Scan] An unexpected error occurred:', (err as Error).message);
        return 0;
    } finally {
        await fs.rm(scanDir, { recursive: true, force: true }).catch(() => {});
    }
}


/**
 * NEW: Scan discovered web assets from endpointDiscovery instead of hardcoded paths
 * FIXED: Uses correct TruffleHog v3+ syntax with --path flag and enhanced detection
 */
async function scanDiscoveredWebAssets(scanId: string): Promise<number> {
    log('[trufflehog] [Web Asset Scan] Scanning discovered assets...');
    
    try {
        const assetsResult = await pool.query(`
            SELECT meta FROM artifacts 
            WHERE meta->>'scan_id' = $1 AND type = 'discovered_web_assets'
            ORDER BY created_at DESC LIMIT 1
        `, [scanId]);

        if (assetsResult.rows.length === 0 || !assetsResult.rows[0].meta?.assets) {
            log('[trufflehog] [Web Asset Scan] No discoverable web assets found.');
            return 0;
        }

        const assets = assetsResult.rows[0].meta.assets as { url: string; content: string; type: string }[];
        log(`[trufflehog] [Web Asset Scan] Found ${assets.length} assets to scan.`);

        let totalFindings = 0;

        // ONE-OFF DIAGNOSTIC: Verify binary version and location at runtime
        try {
            const { stdout: v, stderr } = await exec('trufflehog', ['--version']);
            log(`[trufflehog] RUNTIME binary path: ${await exec('which', ['trufflehog']).then(r => r.stdout.trim())}`);
            log(`[trufflehog] RUNTIME version: ${v.trim()}`);
            if (stderr) log(`[trufflehog] version stderr: ${stderr.trim()}`);
        } catch (e) {
            log('[trufflehog] FATAL: trufflehog not on PATH', (e as Error).message);
            throw e;
        }

        // MEMORY OPTIMIZATION: Use ggshield for lightweight web asset scanning
        const filteredAssets = assets.filter(asset => asset.content && asset.content !== '[binary content]');
        log(`[trufflehog] Processing ${filteredAssets.length} assets with ggshield (max ${GG_MAX_WORKERS} concurrent)`);

        // Process assets in controlled batches to respect memory limits
        const BATCH_SIZE = Math.min(GG_MAX_WORKERS, 4); // Respect GG_MAX_WORKERS environment variable
        const scanPromises: Promise<number>[] = [];
        
        for (let i = 0; i < filteredAssets.length; i += BATCH_SIZE) {
            const batch = filteredAssets.slice(i, i + BATCH_SIZE);
            
            const batchPromise = Promise.all(batch.map(async (asset) => {
                let findingsForAsset = 0;

                try {
                    // DIAGNOSTIC: Show what we're scanning
                    const sample = asset.content.slice(0, 120);
                    log(`[ggshield] Scanning ${asset.content.length} bytes from ${asset.url}. Preview: ${sample.replace(/\n/g,' ')}`);

                    // Use ggshield for lightweight scanning
                    const buf = Buffer.from(asset.content, 'utf8');
                    const stdout = await ggshieldScanAndConvert(buf);
                    
                    if (stdout) {
                        findingsForAsset = await processTrufflehogOutput(stdout, 'web_asset', asset.url, scanId);
                        if (findingsForAsset > 0) {
                            log(`[ggshield] [SUCCESS] Found ${findingsForAsset} secrets in ${asset.url}`);
                        }
                    }

                } catch (err) {
                    log(`[ggshield] [ERROR] Unhandled failure scanning asset ${asset.url}: ${(err as Error).message}`);
                }
                
                return findingsForAsset;
            })).then(results => results.reduce((sum, count) => sum + count, 0));
            
            scanPromises.push(batchPromise);
            
            // Add small delay between batches to prevent resource contention
            if (i + BATCH_SIZE < filteredAssets.length) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        const results = await Promise.all(scanPromises);
        totalFindings = results.reduce((sum, count) => sum + count, 0);

        log(`[trufflehog] [Web Asset Scan] Completed. Total new findings: ${totalFindings}`);
        return totalFindings;

    } catch (error) {
        log(`[trufflehog] [FATAL] Could not execute web asset scan: ${(error as Error).message}`);
        return 0;
    }
}

/**
 * Legacy: Scan local files (kept for SpiderFoot integration)
 */
async function scanLocalFiles(scanId: string): Promise<number> {
    log('[trufflehog] [File Scan] Scanning local artifacts...');
    const filePathsToScan = [
        `/tmp/spiderfoot-links-${scanId}.json`, // SpiderFoot link list
    ];
    let findings = 0;

    for (const filePath of filePathsToScan) {
        try {
            log(`[trufflehog] [File Scan] Checking file existence: ${filePath}`);
            await fs.access(filePath);
            log(`[trufflehog] [File Scan] File exists, proceeding with scan: ${filePath}`);
            const { stdout } = await exec('trufflehog', ['filesystem', filePath, '--json', '--no-verification'], { maxBuffer: 10 * 1024 * 1024 });
            const fileFindings = await processTrufflehogOutput(stdout, 'file', `local:${filePath}`, scanId);
            findings += fileFindings;
            log(`[trufflehog] [File Scan] Completed scan of ${filePath}, found ${fileFindings} findings`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            log(`[trufflehog] [File Scan] Unable to scan file ${filePath}: ${errorMessage}`);
        }
    }
    return findings;
}

/**
 * Scan high-value targets likely to contain secrets based on common patterns
 */
async function scanHighValueTargets(domain: string, scanId: string): Promise<number> {
    let findings = 0;
    
    // High-probability secret locations
    const highValuePaths = [
        '/.env',
        '/config.json', 
        '/app.config.json',
        '/.aws/credentials',
        '/api-keys.txt',
        '/secrets.json',
        '/.htaccess',
        '/web.config',
        '/config.php',
        '/app.js',
        '/bundle.js',
        '/main.js'
    ];
    
    log(`[trufflehog] [Targeted Scan] Testing ${highValuePaths.length} high-value paths for secrets`);
    
    for (const path of highValuePaths) {
        try {
            const url = `https://${domain}${path}`;
            const response = await axios.get(url, { 
                timeout: 5000,
                maxContentLength: 1024 * 1024, // 1MB max
                validateStatus: (status) => status === 200
            });
            
            if (response.data && typeof response.data === 'string') {
                log(`[trufflehog] [Targeted Scan] Found accessible file: ${url}`);
                
                // Save content to temp file and scan with TruffleHog
                const tempFile = `/tmp/trufflehog-target-${scanId}-${path.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
                await fs.writeFile(tempFile, response.data);
                
                const { stdout } = await exec('trufflehog', ['filesystem', tempFile, '--json']);
                findings += await processTrufflehogOutput(stdout, 'http', url, scanId);
                
                // Clean up temp file
                await fs.unlink(tempFile).catch(() => {});
            }
        } catch (error) {
            // Expected for most paths - don't log as errors
        }
    }
    
    log(`[trufflehog] [Targeted Scan] Completed high-value path scanning: ${findings} secrets found`);
    return findings;
}


export async function runTrufflehog(job: { domain: string; scanId?: string }): Promise<number> {
  log('[trufflehog] Starting comprehensive secret scan for domain:', job.domain);
  if (!job.scanId) {
      log('[trufflehog] [ERROR] scanId is required for TruffleHog module.');
      return 0;
  }
  
  // Version check to prevent silent failures from v3.84.0+ regression
  try {
    const { stdout: ver } = await exec('trufflehog', ['--version']);
    if (!ver.includes('3.83.')) {
      log('[trufflehog] ⚠ Running un-pinned version:', ver.trim());
      log('[trufflehog] Expected 3.83.7 but continuing with caution');
    } else {
      log('[trufflehog] Using supported TruffleHog version:', ver.trim());
    }
  } catch (error) {
    log('[trufflehog] Failed to check TruffleHog version:', (error as Error).message);
    return 0;
  }
  
  let totalFindings = 0;

  // Phase 1: Scan discovered web assets from endpointDiscovery module (using ggshield)
  log('[trufflehog] Phase 1: Scanning discovered web assets with ggshield...');
  totalFindings += await scanDiscoveredWebAssets(job.scanId);
  
  // Phase 2: Scan specific high-value targets (for domains that don't use modern frameworks)
  log('[trufflehog] Phase 2: Scanning high-value targets...');
  totalFindings += await scanHighValueTargets(job.domain, job.scanId);

  // Phase 3: Scan Git repositories (using TruffleHog)
  log('[trufflehog] Phase 3: Scanning Git repositories with TruffleHog...');
  try {
    const linksPath = `/tmp/spiderfoot-links-${job.scanId}.json`;
    log(`[trufflehog] Checking for SpiderFoot links file at: ${linksPath}`);
    
    // Check if file exists before attempting to read
    try {
      await fs.access(linksPath);
      log(`[trufflehog] SpiderFoot links file exists, attempting to read...`);
    } catch (accessError) {
      log(`[trufflehog] SpiderFoot links file does not exist: ${(accessError as Error).message}`);
      throw new Error('File does not exist');
    }
    
    const linksFile = await fs.readFile(linksPath, 'utf8');
    log(`[trufflehog] Successfully read SpiderFoot links file, content length: ${linksFile.length}`);
    
    let links: string[];
    try {
      links = JSON.parse(linksFile) as string[];
      log(`[trufflehog] Successfully parsed JSON, found ${links.length} total links`);
    } catch (parseError) {
      log(`[trufflehog] [ERROR] Failed to parse SpiderFoot links JSON: ${(parseError as Error).message}`);
      throw parseError;
    }
    
    const gitRepos = links.filter(l => GITHUB_RE.test(l));
    log(`[trufflehog] Found ${gitRepos.length} GitHub repositories to scan from ${links.length} total links.`);
    
    // Use the new scanGitRepos function for better memory management
    totalFindings += await scanGitRepos(gitRepos, job.scanId, processTrufflehogOutput, MAX_GIT_REPOS_TO_SCAN);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log(`[trufflehog] Unable to process SpiderFoot links file: ${errorMessage}. Skipping Git repo scan.`);
  }

  // Phase 4: Scan local files
  log('[trufflehog] Phase 4: Scanning local files...');
  totalFindings += await scanLocalFiles(job.scanId);

  log('[trufflehog] Finished comprehensive secret scan for', job.domain, 'Total secrets found:', totalFindings);
  
  await insertArtifact({
    type: 'scan_summary',
    val_text: `TruffleHog scan completed: ${totalFindings} potential secrets found`,
    severity: 'INFO',
    meta: {
      scan_id: job.scanId,
      scan_module: 'trufflehog',
      total_findings: totalFindings,
      timestamp: new Date().toISOString()
    }
  });
  
  return totalFindings;
}
