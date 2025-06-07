import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);
const GITHUB_RE = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)(\.git)?$/i;

async function scanGit(url: string, scanId?: string) {
  try {
    log('[trufflehog] Scanning Git repository:', url);
    const { stdout } = await exec('trufflehog', [
      'git', 
      url, 
      '--json',
      '--no-verification', // Skip verification for speed
      '--max-depth=10'     // Limit depth to avoid timeouts
    ]);
    
    const lines = stdout.trim().split('\n').filter(Boolean);
    let findingsCount = 0;
    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        if (obj.Verified) {
          await insertArtifact({
            type: 'secret',
            val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}...`,
            severity: 'CRITICAL',
            src_url: url,
            meta: { 
              detector: obj.DetectorName,
              verified: obj.Verified,
              source_type: 'git',
              file: obj.SourceMetadata?.Data?.Filesystem?.file || 'unknown',
              line: obj.SourceMetadata?.Data?.Filesystem?.line || 0
            }
          });
          findingsCount++;
        } else {
          await insertArtifact({
            type: 'secret',
            val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}...`,
            severity: 'HIGH',
            src_url: url,
            meta: { 
              detector: obj.DetectorName,
              verified: obj.Verified,
              source_type: 'git',
              file: obj.SourceMetadata?.Data?.Filesystem?.file || 'unknown',
              line: obj.SourceMetadata?.Data?.Filesystem?.line || 0
            }
          });
          findingsCount++;
        }
      } catch (parseErr) {
        log('[trufflehog] Failed to parse JSON line:', line);
      }
    }
    return findingsCount;
  } catch (err) {
    log('[trufflehog] Git scan error for', url, ':', (err as Error).message);
    return 0;
  }
}

async function scanWebsite(domain: string, scanId?: string) {
  try {
    log('[trufflehog] Scanning website:', domain);
    const { stdout } = await exec('trufflehog', [
      'http',
      '--url', `https://${domain}`,
      '--json',
      '--no-verification',
      '--max-depth=3' // Limit crawl depth
    ]);
    
    const lines = stdout.trim().split('\n').filter(Boolean);
    let findingsCount = 0;
    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        if (obj.Verified) {
          await insertArtifact({
            type: 'secret',
            val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}...`,
            severity: 'CRITICAL',
            src_url: `https://${domain}`,
            meta: { 
              detector: obj.DetectorName,
              verified: obj.Verified,
              source_type: 'http',
              url: obj.SourceMetadata?.Data?.Http?.url || `https://${domain}`
            }
          });
          findingsCount++;
        } else {
          await insertArtifact({
            type: 'secret',
            val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}...`,
            severity: 'HIGH',
            src_url: `https://${domain}`,
            meta: { 
              detector: obj.DetectorName,
              verified: obj.Verified,
              source_type: 'http',
              url: obj.SourceMetadata?.Data?.Http?.url || `https://${domain}`
            }
          });
          findingsCount++;
        }
      } catch (parseErr) {
        log('[trufflehog] Failed to parse JSON line:', line);
      }
    }
    return findingsCount;
  } catch (err) {
    log('[trufflehog] Website scan error for', domain, ':', (err as Error).message);
    return 0;
  }
}

async function scanFiles(domain: string, scanId?: string) {
  // Scan previously downloaded files from other modules
  const tmpFiles = [
    `/tmp/spiderfoot-${domain}-*.json`,
    `/tmp/crm_*`,
    `/tmp/file_*`
  ];
  
  let findingsCount = 0;
  
  for (const pattern of tmpFiles) {
    try {
      const { stdout } = await exec('ls', [pattern]);
      const files = stdout.trim().split('\n').filter(Boolean);
      
      for (const file of files) {
        try {
          const { stdout: scanOut } = await exec('trufflehog', [
            'filesystem',
            file,
            '--json',
            '--no-verification'
          ]);
          
          const lines = scanOut.trim().split('\n').filter(Boolean);
          for (const line of lines) {
            try {
              const obj = JSON.parse(line);
              await insertArtifact({
                type: 'secret',
                val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}...`,
                severity: obj.Verified ? 'CRITICAL' : 'HIGH',
                src_url: file,
                meta: { 
                  detector: obj.DetectorName,
                  verified: obj.Verified,
                  source_type: 'file',
                  file: file
                }
              });
              findingsCount++;
            } catch (parseErr) {
              // Ignore parse errors
            }
          }
        } catch (scanErr) {
          // Ignore scan errors for individual files
        }
      }
    } catch (lsErr) {
      // No files matching pattern
    }
  }
  return findingsCount;
}

export async function runTrufflehog(job: { domain: string; scanId?: string }): Promise<number> {
  log('[trufflehog] Starting secret scan for', job.domain);
  
  let findingsCount = 0;
  
  try {
    // Scan the main website
    const websiteFindings = await scanWebsite(job.domain, job.scanId);
    findingsCount += websiteFindings;
    
    // Parse links.json from SpiderFoot if available
    try {
      const linksData = await fs.readFile('/tmp/spiderfoot-links.json', 'utf8');
      const links = JSON.parse(linksData) as string[];
      
      const gitRepos = links.filter(l => GITHUB_RE.test(l));
      log('[trufflehog] Found', gitRepos.length, 'GitHub repositories to scan');
      
      for (const repo of gitRepos.slice(0, 5)) { // Limit to first 5 repos
        const repoFindings = await scanGit(repo, job.scanId);
        findingsCount += repoFindings;
      }
    } catch (linkErr) {
      log('[trufflehog] No SpiderFoot links file found or invalid format');
    }
    
    // Scan downloaded files
    const fileFindings = await scanFiles(job.domain, job.scanId);
    findingsCount += fileFindings;
    
    log('[trufflehog] Secret scan completed for', job.domain, '- found', findingsCount, 'secrets');
    return findingsCount;
    
  } catch (err) {
    log('[trufflehog] Error during secret scan:', (err as Error).message);
    await insertArtifact({
      type: 'secret',
      val_text: `TruffleHog scan failed for ${job.domain}`,
      severity: 'INFO',
      meta: { 
        error: (err as Error).message,
        scan_id: job.scanId,
        scan_module: 'trufflehog'
      }
    });
    return 0;
  }
} 