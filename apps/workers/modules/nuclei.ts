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
 * 1.  **Template Updates:** Handled by dedicated updater process in fly.toml
 * 2.  **Technology-aware Scanning:** Uses technology-specific Nuclei tags
 * 3.  **Workflow Execution:** Runs advanced multi-step workflows for detected tech
 * 4.  **Concurrency & Structure:** Parallel scans with tag-based and workflow phases
 * 5.  **General Vulnerability Focus:** Misconfigurations, exposures, default logins
 * =============================================================================
 */

import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import { 
  runNuclei as runNucleiWrapper, 
  runTwoPassScan
} from '../util/nucleiWrapper.js';
const MAX_CONCURRENT_SCANS = 4;

// Note: Technology mapping is now handled by the enhanced nucleiWrapper
// using the TECH_TAG_MAPPING constant for consistent technology detection

// REFACTOR: Workflow base path is now configurable.
const WORKFLOW_BASE_PATH = process.env.NUCLEI_WORKFLOWS_PATH || './workflows';
const TECH_TO_WORKFLOW_MAP: Record<string, string> = {
    'wordpress': 'wordpress-workflow.yaml', // Store only the filename
    'jira': 'jira-workflow.yaml'
};

// Template updates now handled by dedicated updater process in fly.toml

async function validateDependencies(): Promise<boolean> {
    try {
        // A simple version check is the most reliable way to validate.
        // It exits with 0 on success and doesn't require a target.
        const result = await runNucleiWrapper({ version: true });
        if (result.success) {
            log('[nuclei] Nuclei binary validated successfully.');
            return true;
        }
        log(`[nuclei] [CRITICAL] Nuclei validation failed with exit code ${result.exitCode}.`);
        return false;
    } catch (error) {
        log('[nuclei] [CRITICAL] Nuclei validation threw an error.', (error as Error).message);
        return false;
    }
}

// Template updates removed - now handled by dedicated updater process


async function processNucleiResults(results: any[], scanId: string, scanType: 'baseline' | 'common+tech-specific' | 'workflow', workflowFile?: string) {
    for (const vuln of results) {
        try {
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
            log(`[nuclei] Failed to process result:`, vuln);
        }
    }
    return results.length;
}


async function runNucleiTagScan(target: { url: string; tech?: string[] }, scanId?: string): Promise<number> {
    log(`[nuclei] [Enhanced Two-Pass Scan] Running on ${target.url}`);

    try {
        // Use the new two-pass scanning approach
        const result = await runTwoPassScan(target.url, {
            timeout: 180, // 3 minutes for headless Chrome operations
            retries: 2,
            concurrency: 6,
            scanId: scanId // Pass scanId for artifact persistence
        });

        // Return persisted count if scanId was provided, otherwise fall back to processing results manually
        if (scanId && result.totalPersistedCount !== undefined) {
            if (result.totalPersistedCount === 0) {
                log(`[nuclei] [Two-Pass Scan] No findings for ${target.url}`);
                return 0;
            }
            
            log(`[nuclei] [Two-Pass Scan] Completed for ${target.url}: ${result.totalPersistedCount} findings persisted as artifacts`);
            log(`[nuclei] [Two-Pass Scan] Detected technologies: ${result.detectedTechnologies.join(', ') || 'none'}`);
            
            return result.totalPersistedCount;
        } else {
            // Fall back to manual processing for backward compatibility
            if (result.totalFindings === 0) {
                log(`[nuclei] [Two-Pass Scan] No findings for ${target.url}`);
                return 0;
            }

            log(`[nuclei] [Two-Pass Scan] Completed for ${target.url}: ${result.totalFindings} findings (baseline: ${result.baselineResults.length}, common+tech: ${result.techSpecificResults.length})`);
            log(`[nuclei] [Two-Pass Scan] Detected technologies: ${result.detectedTechnologies.join(', ') || 'none'}`);

            // Process baseline results manually
            let totalProcessed = 0;
            totalProcessed += await processNucleiResults(result.baselineResults, scanId!, 'baseline');
            
            // Process common vulnerability + tech-specific results manually
            totalProcessed += await processNucleiResults(result.techSpecificResults, scanId!, 'common+tech-specific');
            
            return totalProcessed;
        }
    } catch (error) {
        log(`[nuclei] [Two-Pass Scan] Exception for ${target.url}:`, (error as Error).message);
        return 0;
    }
}


async function runNucleiWorkflow(target: { url: string }, workflowFileName: string, scanId?: string): Promise<number> {
    // Construct full path from base path and filename.
    const workflowPath = path.join(WORKFLOW_BASE_PATH, workflowFileName);
    
    log(`[nuclei] [Workflow Scan] Running workflow '${workflowPath}' on ${target.url}`);
    
    try {
        await fs.access(workflowPath);
    } catch {
        log(`[nuclei] [Workflow Scan] SKIPPING: Workflow file not found at ${workflowPath}`);
        return 0;
    }

    try {
        const result = await runNucleiWrapper({
            url: target.url,
            templates: [workflowPath],
            timeout: 180, // 3 minutes for headless operations
            scanId: scanId // Pass scanId for artifact persistence
        });

        if (!result.success) {
            log(`[nuclei] [Workflow Scan] Failed for ${target.url}: exit code ${result.exitCode}`);
            return 0;
        }

        if (result.stderr) {
            log(`[nuclei] [Workflow Scan] stderr for ${target.url}:`, result.stderr);
        }

        // Use persistedCount if available, otherwise fall back to manual processing
        if (scanId && result.persistedCount !== undefined) {
            log(`[nuclei] [Workflow Scan] Completed for ${target.url}: ${result.persistedCount} findings persisted as artifacts`);
            return result.persistedCount;
        } else {
            return await processNucleiResults(result.results, scanId!, 'workflow', workflowPath);
        }
    } catch (error) {
        log(`[nuclei] [Workflow Scan] Exception for ${target.url} with workflow ${workflowPath}:`, (error as Error).message);
        return 0;
    }
}

export async function runNuclei(job: { domain: string; scanId?: string; targets?: { url: string; tech?: string[] }[] }): Promise<number> {
    log('[nuclei] Starting enhanced vulnerability scan for', job.domain);
    
    if (!(await validateDependencies())) {
        await insertArtifact({type: 'scan_error', val_text: 'Nuclei binary not found, scan aborted.', severity: 'HIGH', meta: { scan_id: job.scanId, scan_module: 'nuclei' }});
        return 0;
    }
    // Template updates handled by dedicated updater process in fly.toml

    const targets = job.targets?.length ? job.targets : [{ url: `https://${job.domain}` }];

    let totalFindings = 0;
    
    log(`[nuclei] --- Starting Enhanced Two-Pass Scans on ${targets.length} targets ---`);
    for (let i = 0; i < targets.length; i += MAX_CONCURRENT_SCANS) {
        const chunk = targets.slice(i, i + MAX_CONCURRENT_SCANS);
        const results = await Promise.all(chunk.map(target => {
            return runNucleiTagScan(target, job.scanId);
        }));
        totalFindings += results.reduce((a, b) => a + b, 0);
    }

    log(`[nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---`);
    // Note: Two-pass scanning already covers technology-specific templates
    // Workflows provide additional deep-dive analysis for specific technologies
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
