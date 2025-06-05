import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

export async function runDnsTwist(job: { domain: string; scanId?: string }): Promise<number> {
  log('[dnstwist] Starting typo-squatting scan for', job.domain);
  
  try {
    const { stdout } = await exec('dnstwist', ['-r', job.domain, '--format', 'json'], {
      timeout: 60000 // 60 second timeout
    });
    
    const list = JSON.parse(stdout) as Array<{ domain: string; dns_a: string[] }>;
    let findingsCount = 0;
    
    for (const entry of list) {
      if (entry.dns_a && entry.dns_a.length) {
        await insertArtifact({
          type: 'typo_domain',
          val_text: entry.domain,
          severity: 'MEDIUM',
          meta: { 
            ips: entry.dns_a,
            scan_id: job.scanId,
            scan_module: 'dnstwist'
          }
        });
        findingsCount++;
      }
    }
    
    log('[dnstwist] Completed typo-squatting scan, found', findingsCount, 'domains');
    return findingsCount;
    
  } catch (error) {
    log('[dnstwist] Error during scan:', (error as Error).message);
    return 0;
  }
} 