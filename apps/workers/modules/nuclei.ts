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
import fs from 'node:fs/promises';
import path from 'node:path'; // REFACTOR: Added for path joining.
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
    const baseTags = new Set(['cve', 'misconfiguration', 'default-logins', 'exposed-panels', 'exposure', 'tech']);
    if (target.tech) {
        for (const tech of target.tech) {
            const tags = TECH_TO_NUCLEI_TAG_MAP[tech.toLowerCase()];
            if (tags) tags.forEach(tag => baseTags.add(tag));
        }
    }
    const tags = Array.from(baseTags).join(',');

    log(`[nuclei] [Tag Scan] Running on ${target.url} with tags: ${tags}`);
    try {
        const { stdout, stderr } = await exec('nuclei', [
            '-u', target.url,
            '-tags', tags,
            '-json',
            '-silent',
            '-timeout', '10',
            '-retries', '2',
            '-headless'
        ], { timeout: 600000 });

        if (stderr) {
            log(`[nuclei] [Tag Scan] stderr for ${target.url}:`, stderr);
        }

        return await processNucleiOutput(stdout, scanId!, 'tags');
    } catch (error) {
        log(`[nuclei] [Tag Scan] Failed for ${target.url}:`, (error as Error).message);
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
        const { stdout, stderr } = await exec('nuclei', [
            '-u', target.url,
            '-w', workflowPath,
            '-json',
            '-silent',
            '-timeout', '15'
        ], { timeout: 900000 });

        if (stderr) {
            log(`[nuclei] [Workflow Scan] stderr for ${target.url}:`, stderr);
        }

        return await processNucleiOutput(stdout, scanId!, 'workflow', workflowPath);
    } catch (error) {
        log(`[nuclei] [Workflow Scan] Failed for ${target.url} with workflow ${workflowPath}:`, (error as Error).message);
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

    let totalFindings = 0;
    const targets = job.targets?.length ? job.targets : [{ url: `https://${job.domain}` }];
    
    log(`[nuclei] --- Starting Phase 1: Tag-based scans on ${targets.length} targets ---`);
    for (let i = 0; i < targets.length; i += MAX_CONCURRENT_SCANS) {
        const chunk = targets.slice(i, i + MAX_CONCURRENT_SCANS);
        const results = await Promise.all(chunk.map(target => runNucleiTagScan(target, job.scanId)));
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
