import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

export async function runNuclei(job: { domain: string; scanId?: string }): Promise<number> {
  log('[nuclei] Starting vulnerability scan for', job.domain);
  
  try {
    const { stdout } = await exec('nuclei', [
      '-u', `https://${job.domain}`,
      '-u', `http://${job.domain}`,
      '-t', '/root/nuclei-templates/', // Default nuclei templates
      '-t', './workers/templates/nuclei-custom.yaml', // Custom templates
      '-severity', 'medium,high,critical',
      '-json',
      '-silent'
    ], {
      timeout: 180000 // 3 minute timeout
    });

    const findings = stdout
      .trim()
      .split('\n')
      .filter(Boolean);
      
    let findingsCount = 0;
    
    for (const line of findings) {
      try {
        const vuln = JSON.parse(line);
        
        // Map nuclei severity to our severity levels
        const severityMap: Record<string, 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'> = {
          'info': 'INFO',
          'low': 'LOW', 
          'medium': 'MEDIUM',
          'high': 'HIGH',
          'critical': 'CRITICAL'
        };
        
        const severity = severityMap[vuln.info.severity.toLowerCase()] || 'MEDIUM';
        
        const artifactId = await insertArtifact({
          type: 'vuln',
          val_text: `${vuln.info.name} - ${job.domain}`,
          severity,
          src_url: vuln.host || `https://${job.domain}`,
          meta: {
            scan_id: job.scanId,
            scan_module: 'nuclei',
            template_id: vuln['template-id'],
            template_path: vuln['template-path'],
            matcher_name: vuln['matcher-name'],
            vulnerability: vuln.info,
            matched_at: vuln['matched-at'],
            extracted_results: vuln['extracted-results']
          }
        });
        
        // Create detailed finding
        await insertFinding(
          artifactId,
          'VULNERABILITY',
          getRecommendation(vuln.info.name, vuln['template-id']),
          `${vuln.info.description || vuln.info.name} detected on ${job.domain}`
        );
        
        findingsCount++;
        
      } catch (parseError) {
        log('[nuclei] Failed to parse result:', line);
      }
    }
    
    log('[nuclei] Completed vulnerability scan, found', findingsCount, 'vulnerabilities');
    return findingsCount;
    
  } catch (error) {
    log('[nuclei] Error during scan:', (error as Error).message);
    return 0;
  }
}

function getRecommendation(vulnName: string, templateId: string): string {
  const recommendations: Record<string, string> = {
    'exposed-admin': 'Implement proper authentication and restrict admin panel access to authorized IPs only.',
    'subdomain-takeover': 'Remove or properly configure dangling DNS records. Verify all subdomains point to active services.',
    'cors-misconfiguration': 'Configure CORS properly - avoid wildcard origins in production and validate allowed origins.',
    'exposed-env-files': 'Remove .env files from web-accessible directories and implement proper access controls.',
    'sql-injection': 'Use parameterized queries and input validation. Implement proper SQL injection protection.',
    'xss': 'Implement proper input sanitization and output encoding. Use Content Security Policy headers.',
    'directory-traversal': 'Validate and sanitize file paths. Implement proper access controls for file operations.',
    'open-redirect': 'Validate redirect URLs against a whitelist. Avoid user-controlled redirects.'
  };
  
  const key = Object.keys(recommendations).find(k => 
    vulnName.toLowerCase().includes(k) || templateId.includes(k)
  );
  
  return key ? recommendations[key] : 
    'Review and patch the identified vulnerability. Follow security best practices for the affected component.';
} 