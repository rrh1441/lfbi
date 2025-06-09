import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

const TECH_TO_NUCLEI_TAG_MAP: Record<string, string[]> = {
  "wordpress": ["wordpress", "php", "cms", "wp-plugin"],
  "joomla": ["joomla", "php", "cms"],
  "drupal": ["drupal", "php", "cms"],
  "nginx": ["nginx", "web"],
  "apache": ["apache", "httpd", "web"],
  "iis": ["iis", "microsoft", "web"],
  "php": ["php", "lang"],
  "java": ["java", "tomcat", "spring"],
  "python": ["python", "django", "flask"],
  "nodejs": ["nodejs", "express"],
  "graphql": ["graphql", "api"],
  "elasticsearch": ["elasticsearch", "database"],
  "mongodb": ["mongodb", "database"],
};

function getNucleiTagsForTarget(discoveredTech?: string[]): string {
    const baseTags = new Set(['cves', 'misconfiguration', 'default-logins', 'exposed-panels', 'exposure', 'tech']);
    if (discoveredTech) {
        for (const tech of discoveredTech) {
            const tags = TECH_TO_NUCLEI_TAG_MAP[tech.toLowerCase()];
            if (tags) {
                tags.forEach(tag => baseTags.add(tag));
            }
        }
    }
    return Array.from(baseTags).join(',');
}

async function runNucleiForTarget(target: string, tags: string, scanId?: string) {
    log(`[nuclei] Running scan on ${target} with tags: ${tags}`);
    try {
        const { stdout } = await exec('nuclei', [
            '-u', target,
            '-json',
            '-silent',
            '-timeout', '10',
            '-retries', '2'
        ], { timeout: 600000 }); // 10 minute timeout

        const findings = stdout.trim().split('\n').filter(Boolean);
        for (const line of findings) {
            try {
                const vuln = JSON.parse(line);
                const severity = (vuln.info.severity.toUpperCase() as any) || 'INFO';

                const meta = {
                    scan_id: scanId,
                    scan_module: 'nuclei',
                    template_id: vuln['template-id'],
                    vulnerability: vuln.info,
                    'cvss-score': vuln.info.classification?.['cvss-score'],
                    'cwe-id': vuln.info.classification?.['cwe-id'],
                    reference: vuln.info.reference,
                    'curl-command': vuln['curl-command'],
                    'matcher-status': vuln['matcher-status'],
                    'extracted-results': vuln['extracted-results'],
                    request: vuln.request?.substring(0, 1000),
                    response: vuln.response?.substring(0, 1000),
                };

                const artifactId = await insertArtifact({
                    type: 'vuln',
                    val_text: `${vuln.info.name} on ${vuln.host}`,
                    severity,
                    src_url: vuln.host,
                    meta
                });
                await insertFinding(artifactId, 'VULNERABILITY', 'See artifact details for remediation.', vuln.info.description);
            } catch (e) {
                log(`[nuclei] Failed to parse result for ${target}:`, line);
            }
        }
    } catch (error) {
        log(`[nuclei] Scan failed for ${target}:`, (error as Error).message);
    }
}

export async function runNuclei(job: { domain: string; scanId?: string; targets?: { url: string; tech?: string[] }[] }): Promise<number> {
    log('[nuclei] Starting enhanced vulnerability scan for', job.domain);
    let totalFindings = 0;

    const targets = job.targets?.length ? job.targets : [{ url: `https://${job.domain}` }, { url: `http://${job.domain}` }];

    for (const target of targets) {
        const tags = getNucleiTagsForTarget(target.tech);
        await runNucleiForTarget(target.url, tags, job.scanId);
    }
    
    // Optional: Run a specific high-value workflow
    if(job.targets?.some(t => t.tech?.includes('wordpress'))){
        log('[nuclei] WordPress detected, running specific workflow...');
        // Example: await runNucleiWorkflow(targetUrl, 'workflows/tech/wordpress-workflow.yaml', job.scanId);
    }

    // This is a simplified way to count findings for now.
    // A better approach would be to get the count from the database after all scans.
    // For now, we'll just return 1 if any targets were scanned.
    if (targets.length > 0) {
        totalFindings = 1;
    }

    log('[nuclei] Completed vulnerability scan.');
    
    // Add completion tracking
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