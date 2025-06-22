/*
 * =============================================================================
 * MODULE: nuclei.ts (Streamlined v3)
 * =============================================================================
 * This module runs the Nuclei vulnerability scanner against a set of targets
 * for general vulnerability detection (misconfigurations, exposures, etc.).
 *
 * NOTE: CVE-specific testing has been moved to techStackScan.ts for better
 * integration with vulnerability intelligence and timeline validation.
 *
 * Key Features:
 * 1.  **Optimized Template Updates:** Only updates templates if older than 24 hours
 * 2.  **Technology-aware Scanning:** Uses technology-specific Nuclei tags
 * 3.  **Workflow Execution:** Runs advanced multi-step workflows for detected tech
 * 4.  **Concurrency & Structure:** Parallel scans with tag-based and workflow phases
 * 5.  **General Vulnerability Focus:** Misconfigurations, exposures, default logins
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { promises as fs } from 'node:fs';
import * as path from 'node:path'; // REFACTOR: Added for path joining.
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

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


async function runNucleiTagScan(target: { url: string; tech?: string[] }, scanId?: string): Promise<number> {
    const baseTags = new Set(['misconfiguration', 'default-logins', 'exposed-panels', 'exposure', 'tech']);
    if (target.tech) {
        for (const tech of target.tech) {
            const tags = TECH_TO_NUCLEI_TAG_MAP[tech.toLowerCase()];
            if (tags) tags.forEach(tag => baseTags.add(tag));
        }
    }
    const tags = Array.from(baseTags).join(',');

    // Build command arguments
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
    
    log(`[nuclei] [Tag Scan] Running on ${target.url} with tags: ${tags}`);

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

    const targets = job.targets?.length ? job.targets : [{ url: `https://${job.domain}` }];

    let totalFindings = 0;
    
    log(`[nuclei] --- Starting Phase 1: Tag-based scans on ${targets.length} targets ---`);
    for (let i = 0; i < targets.length; i += MAX_CONCURRENT_SCANS) {
        const chunk = targets.slice(i, i + MAX_CONCURRENT_SCANS);
        const results = await Promise.all(chunk.map(target => {
            return runNucleiTagScan(target, job.scanId);
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

    log(`[nuclei] Completed vulnerability scan. Total findings: ${totalFindings}`);
    
    await insertArtifact({
        type: 'scan_summary',
        val_text: `Nuclei scan completed: ${totalFindings} vulnerabilities found`,
        severity: 'INFO',
        meta: {
            scan_id: job.scanId,
            scan_module: 'nuclei',
            total_findings: totalFindings,
            targets_scanned: targets.length,
            timestamp: new Date().toISOString()
        }
    });
    
    return totalFindings;
}
