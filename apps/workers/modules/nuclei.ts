/*
 * =============================================================================
 * MODULE: nuclei.ts (Refactored v2)
 * =============================================================================
 * This module runs the Nuclei vulnerability scanner against a set of targets.
 *
 * Key Improvements from previous version:
 * 1.  **Optimized Template Updates:** Checks the last update time and only updates
 * templates if they are older than 24 hours, improving efficiency.
 * 2.  **Configurable Workflow Paths:** The base path for Nuclei workflows is now
 * configurable via an environment variable for deployment flexibility.
 * 3.  **Dependency & Template Management:** Validates that the 'nuclei' binary
 * is installed and ensures templates are kept up-to-date.
 * 4.  **Workflow Execution:** Implements the ability to run advanced, multi-step
 * Nuclei workflows for specific technologies.
 * 5.  **Concurrency & Better Structure:** Scans are run in parallel and logically
 * separated into broad and deep-dive scan phases.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { promises as fs } from 'node:fs';
import * as path from 'node:path'; // REFACTOR: Added for path joining.
import * as https from 'node:https';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import { verifyCVEs } from './cveVerifier.js';

const exec = promisify(execFile);
const MAX_CONCURRENT_SCANS = 4;

const TECH_TO_NUCLEI_TAG_MAP: Record<string, string[]> = {
  "wordpress": ["wordpress", "wp-plugin", "wp-theme"],
  "joomla": ["joomla"],
  "drupal": ["drupal"],
  "nginx": ["nginx"],
  "apache": ["apache", "httpd"],
  "iis": ["iis"],
  "php": ["php"],
  "java": ["java", "tomcat", "spring", "log4j"],
  "python": ["python", "django", "flask"],
  "nodejs": ["nodejs", "express"],
  "graphql": ["graphql"],
  "elasticsearch": ["elasticsearch"],
};

// REFACTOR: Workflow base path is now configurable.
const WORKFLOW_BASE_PATH = process.env.NUCLEI_WORKFLOWS_PATH || './workflows';
const TECH_TO_WORKFLOW_MAP: Record<string, string> = {
    'wordpress': 'wordpress-workflow.yaml', // Store only the filename
    'jira': 'jira-workflow.yaml'
};

// REFACTOR: Location for tracking the last template update time.
const LAST_UPDATE_TIMESTAMP_PATH = '/tmp/nuclei_last_update.txt';

async function validateDependencies(): Promise<boolean> {
    try {
        const result = await exec('nuclei', ['-version']);
        log('[nuclei] Nuclei binary found.');
        if (result.stderr) {
            log('[nuclei] Version check stderr:', result.stderr);
        }
        return true;
    } catch (error) {
        log('[nuclei] [CRITICAL] Nuclei binary not found. Scans will be skipped.');
        log('[nuclei] [CRITICAL] Error details:', (error as Error).message);
        return false;
    }
}

/**
 * REFACTOR: Template update is now optimized. It only runs if the last update
 * was more than 24 hours ago.
 */
async function updateTemplatesIfNeeded(): Promise<void> {
    try {
        let lastUpdateTime = 0;
        try {
            const content = await fs.readFile(LAST_UPDATE_TIMESTAMP_PATH, 'utf8');
            lastUpdateTime = parseInt(content.trim()) || 0;
        } catch {
            // File doesn't exist or can't be read, treat as never updated
            lastUpdateTime = 0;
        }
        
        const oneDay = 24 * 60 * 60 * 1000;

        if (Date.now() - lastUpdateTime > oneDay) {
            log('[nuclei] Templates are outdated (> 24 hours). Updating...');
            const result = await exec('nuclei', ['-update-templates'], { timeout: 300000 }); // 5 min timeout
            if (result.stderr) {
                log('[nuclei] Template update stderr:', result.stderr);
            }
            if (result.stdout) {
                log('[nuclei] Template update stdout:', result.stdout.substring(0, 500));
            }
            await fs.writeFile(LAST_UPDATE_TIMESTAMP_PATH, Date.now().toString());
            log('[nuclei] Template update complete.');
        } else {
            log('[nuclei] Templates are up-to-date. Skipping update.');
        }
    } catch (error) {
        log('[nuclei] [WARNING] Failed to update nuclei templates. Scans will proceed with local version.', (error as Error).message);
    }
}


async function processNucleiOutput(stdout: string, scanId: string, scanType: 'tags' | 'workflow', workflowFile?: string) {
    const findings = stdout.trim().split('\n').filter(Boolean);
    for (const line of findings) {
        try {
            const vuln = JSON.parse(line);
            const severity = (vuln.info.severity.toUpperCase() as any) || 'INFO';

            const artifactId = await insertArtifact({
                type: 'vuln',
                val_text: `${vuln.info.name} on ${vuln.host}`,
                severity,
                src_url: vuln.host,
                meta: {
                    scan_id: scanId,
                    scan_module: 'nuclei',
                    scan_type: scanType,
                    template_id: vuln['template-id'],
                    workflow_file: workflowFile,
                    vulnerability: vuln.info,
                    'curl-command': vuln['curl-command'],
                    'matcher-status': vuln['matcher-status'],
                    'extracted-results': vuln['extracted-results'],
                }
            });
            await insertFinding(artifactId, 'VULNERABILITY', 'See artifact details and Nuclei template for remediation guidance.', vuln.info.description);
        } catch (e) {
            log(`[nuclei] Failed to parse result line:`, line);
        }
    }
    return findings.length;
}


async function runNucleiTagScan(target: { url: string; tech?: string[] }, scanId?: string, verifiedCVEs?: string[]): Promise<number> {
    const baseTags = new Set(['cve', 'misconfiguration', 'default-logins', 'exposed-panels', 'exposure', 'tech']);
    if (target.tech) {
        for (const tech of target.tech) {
            const tags = TECH_TO_NUCLEI_TAG_MAP[tech.toLowerCase()];
            if (tags) tags.forEach(tag => baseTags.add(tag));
        }
    }
    const tags = Array.from(baseTags).join(',');

    // Build command arguments with optional CVE filtering
    const nucleiArgs = [
        '-u', target.url,
        '-tags', tags,
        '-json',
        '-silent',
        '-timeout', '10',
        '-retries', '2',
        '-headless'
    ];
    
    // Add -insecure flag if TLS bypass is enabled
    if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
        nucleiArgs.push('-insecure');
    }
    
    // Add verified CVE filtering if available
    if (verifiedCVEs && verifiedCVEs.length > 0) {
        nucleiArgs.push('-include-ids', verifiedCVEs.join(','));
        log(`[nuclei] [Tag Scan] Running on ${target.url} with ${verifiedCVEs.length} verified CVEs: ${verifiedCVEs.join(',')}`);
    } else {
        log(`[nuclei] [Tag Scan] Running on ${target.url} with tags: ${tags}`);
    }

    try {
        const { stdout, stderr } = await exec('nuclei', nucleiArgs, { timeout: 600000 });

        if (stderr) {
            log(`[nuclei] [Tag Scan] stderr for ${target.url}:`, stderr);
        }

        return await processNucleiOutput(stdout, scanId!, 'tags');
    } catch (error) {
        log(`[nuclei] [Tag Scan] Failed for ${target.url}:`, (error as Error).message);
        if ((error as any).stderr) {
            log(`[nuclei] [Tag Scan] Full stderr for ${target.url}:`, (error as any).stderr);
        }
        return 0;
    }
}


async function runNucleiWorkflow(target: { url: string }, workflowFileName: string, scanId?: string): Promise<number> {
    // REFACTOR: Construct full path from base path and filename.
    const workflowPath = path.join(WORKFLOW_BASE_PATH, workflowFileName);
    
    log(`[nuclei] [Workflow Scan] Running workflow '${workflowPath}' on ${target.url}`);
    
    try {
        await fs.access(workflowPath);
    } catch {
        log(`[nuclei] [Workflow Scan] SKIPPING: Workflow file not found at ${workflowPath}`);
        return 0;
    }

    try {
        const nucleiWorkflowArgs = [
            '-u', target.url,
            '-w', workflowPath,
            '-json',
            '-silent',
            '-timeout', '15'
        ];
        
        // Add -insecure flag if TLS bypass is enabled
        if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
            nucleiWorkflowArgs.push('-insecure');
        }
        
        const { stdout, stderr } = await exec('nuclei', nucleiWorkflowArgs, { timeout: 900000 });

        if (stderr) {
            log(`[nuclei] [Workflow Scan] stderr for ${target.url}:`, stderr);
        }

        return await processNucleiOutput(stdout, scanId!, 'workflow', workflowPath);
    } catch (error) {
        log(`[nuclei] [Workflow Scan] Failed for ${target.url} with workflow ${workflowPath}:`, (error as Error).message);
        if ((error as any).stderr) {
            log(`[nuclei] [Workflow Scan] Full stderr for ${target.url}:`, (error as any).stderr);
        }
        return 0;
    }
}

export async function runNuclei(job: { domain: string; scanId?: string; targets?: { url: string; tech?: string[] }[] }): Promise<number> {
    log('[nuclei] Starting enhanced vulnerability scan for', job.domain);
    
    if (!(await validateDependencies())) {
        await insertArtifact({type: 'scan_error', val_text: 'Nuclei binary not found, scan aborted.', severity: 'HIGH', meta: { scan_id: job.scanId, scan_module: 'nuclei' }});
        return 0;
    }
    // REFACTOR: Call the optimized update function.
    await updateTemplatesIfNeeded();

    /* ---------------- CVE PRE-FILTER ------------------------------------ */
    const targets = job.targets?.length ? job.targets : [{ url: `https://${job.domain}` }];
    
    // 1. Pull banner info once (HEAD request) – cheap.
    const bannerMap = new Map<string, string>();   // host -> banner string
    await Promise.all(targets.map(async t => {
        try {
            const fetchOptions: RequestInit = { 
                method: 'HEAD', 
                redirect: 'manual', 
                cache: 'no-store',
                signal: AbortSignal.timeout(5000), // 5s timeout
                headers: {
                    'User-Agent': 'DealBrief-Scanner/1.0'
                }
            };
            
            // Add TLS bypass if environment variable is set
            if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
                (fetchOptions as any).agent = new https.Agent({
                    rejectUnauthorized: false
                });
            }
            
            const response = await fetch(t.url, fetchOptions);
            const server = response.headers.get('server');          // e.g. "Apache/2.4.62 (Ubuntu)"
            if (server) {
                bannerMap.set(t.url, server);
                log(`[nuclei] [prefilter] Banner detected for ${t.url}: ${server}`);
            }
        } catch (error) {
            log(`[nuclei] [prefilter] Failed to get banner for ${t.url}: ${(error as Error).message}`);
        }
    }));

    // 2. Derive CVE list from banner version (Apache/Nginx example).
    const prefilter: Record<string, string[]> = {};        // url -> [cve…]
    bannerMap.forEach((banner, url) => {
        // Apache CVE detection
        const apacheMatch = banner.match(/Apache\/(\d+\.\d+\.\d+)/i);
        if (apacheMatch) {
            const version = apacheMatch[1];
            log(`[nuclei] [prefilter] Apache ${version} detected at ${url}`);
            // Common Apache CVEs that might be tested
            prefilter[url] = [
                'CVE-2021-40438', // Apache HTTP Server 2.4.48 and earlier SSRF
                'CVE-2021-41773', // Apache HTTP Server 2.4.49 Path Traversal  
                'CVE-2021-42013', // Apache HTTP Server 2.4.50 Path Traversal
                'CVE-2020-11993', // Apache HTTP Server 2.4.43 and earlier
                'CVE-2019-0190',  // Apache HTTP Server 2.4.17 to 2.4.38
                'CVE-2020-11023'  // jQuery (if mod_proxy_html enabled)
            ];
        }
        
        // Nginx CVE detection
        const nginxMatch = banner.match(/nginx\/(\d+\.\d+\.\d+)/i);
        if (nginxMatch) {
            const version = nginxMatch[1];
            log(`[nuclei] [prefilter] Nginx ${version} detected at ${url}`);
            prefilter[url] = [
                'CVE-2021-23017', // Nginx resolver off-by-one
                'CVE-2019-20372', // Nginx HTTP/2 implementation 
                'CVE-2017-7529'   // Nginx range filter integer overflow
            ];
        }
    });

    // 3. Verify / suppress CVEs using the verification system.
    const verifiedCVEs = new Map<string, string[]>(); // url -> confirmed CVE list
    
    for (const [url, cves] of Object.entries(prefilter)) {
        if (cves.length === 0) continue;
        
        try {
            log(`[nuclei] [prefilter] Verifying ${cves.length} CVEs for ${url}`);
            const checks = await verifyCVEs({
                host: url,
                serverBanner: bannerMap.get(url)!,
                cves
            });
            
            const confirmedCVEs: string[] = [];
            checks.forEach(check => {
                if (check.suppressed) {
                    log(`[nuclei] [prefilter] ${check.id} SUPPRESSED – fixed in ${check.fixedIn}`);
                } else if (check.verified) {
                    log(`[nuclei] [prefilter] ${check.id} VERIFIED – exploit confirmed`);
                    confirmedCVEs.push(check.id);
                } else if (!check.error) {
                    // Not suppressed and not verified (no template available) - keep for regular scan
                    log(`[nuclei] [prefilter] ${check.id} UNVERIFIED – keeping for tag scan`);
                    confirmedCVEs.push(check.id);
                } else {
                    log(`[nuclei] [prefilter] ${check.id} ERROR – ${check.error}`);
                }
            });
            
            if (confirmedCVEs.length > 0) {
                verifiedCVEs.set(url, confirmedCVEs);
                log(`[nuclei] [prefilter] ${url}: ${confirmedCVEs.length}/${cves.length} CVEs remain after verification`);
            } else {
                log(`[nuclei] [prefilter] ${url}: All CVEs suppressed by verification`);
            }
        } catch (error) {
            log(`[nuclei] [prefilter] Verification failed for ${url}: ${(error as Error).message}`);
            // Fall back to regular scan on verification failure
            verifiedCVEs.set(url, cves);
        }
    }
    /* -------------------------------------------------------------------- */

    let totalFindings = 0;
    
    log(`[nuclei] --- Starting Phase 1: Tag-based scans on ${targets.length} targets ---`);
    for (let i = 0; i < targets.length; i += MAX_CONCURRENT_SCANS) {
        const chunk = targets.slice(i, i + MAX_CONCURRENT_SCANS);
        const results = await Promise.all(chunk.map(target => {
            const targetVerifiedCVEs = verifiedCVEs.get(target.url);
            return runNucleiTagScan(target, job.scanId, targetVerifiedCVEs);
        }));
        totalFindings += results.reduce((a, b) => a + b, 0);
    }

    log(`[nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---`);
    for (const target of targets) {
        const detectedTech = new Set(target.tech?.map(t => t.toLowerCase()) || []);
        for (const tech in TECH_TO_WORKFLOW_MAP) {
            if (detectedTech.has(tech)) {
                // REFACTOR: Pass the workflow filename, not the full path.
                totalFindings += await runNucleiWorkflow(target, TECH_TO_WORKFLOW_MAP[tech], job.scanId);
            }
        }
    }

    // Generate CVE verification summary
    const totalCVEsDetected = Object.values(prefilter).reduce((sum, cves) => sum + cves.length, 0);
    const totalCVEsVerified = Array.from(verifiedCVEs.values()).reduce((sum, cves) => sum + cves.length, 0);
    const suppressedCount = totalCVEsDetected - totalCVEsVerified;
    
    if (totalCVEsDetected > 0) {
        await insertArtifact({
            type: 'cve_verification_summary',
            val_text: `CVE verification: ${suppressedCount}/${totalCVEsDetected} banner-based CVEs suppressed through automated verification`,
            severity: suppressedCount > 0 ? 'INFO' : 'LOW',
            meta: {
                scan_id: job.scanId,
                scan_module: 'nuclei',
                total_cves_detected: totalCVEsDetected,
                total_cves_verified: totalCVEsVerified,
                cves_suppressed: suppressedCount,
                suppression_rate: totalCVEsDetected > 0 ? (suppressedCount / totalCVEsDetected * 100).toFixed(1) + '%' : '0%',
                verification_method: 'Two-layer: distribution version mapping + active exploit probes'
            }
        });
    }

    log(`[nuclei] Completed vulnerability scan. Total findings: ${totalFindings}`);
    log(`[nuclei] CVE verification: ${suppressedCount}/${totalCVEsDetected} false positives suppressed`);
    
    await insertArtifact({
        type: 'scan_summary',
        val_text: `Nuclei scan completed: ${totalFindings} vulnerabilities found`,
        severity: 'INFO',
        meta: {
            scan_id: job.scanId,
            scan_module: 'nuclei',
            total_findings: totalFindings,
            targets_scanned: targets.length,
            cve_verification: {
                total_detected: totalCVEsDetected,
                suppressed: suppressedCount,
                verified: totalCVEsVerified
            },
            timestamp: new Date().toISOString()
        }
    });
    
    return totalFindings;
}
