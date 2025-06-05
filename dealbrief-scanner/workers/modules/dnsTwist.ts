import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

export async function runDnsTwist(job: { domain: string }) {
  log('[dnstwist]', job.domain);
  const { stdout } = await exec('dnstwist', ['-r', job.domain, '--format', 'json']);
  const list = JSON.parse(stdout) as Array<{ domain: string; dns_a: string[] }>;
  for (const entry of list) {
    if (entry.dns_a && entry.dns_a.length) {
      await insertArtifact({
        type: 'typo_domain',
        val_text: entry.domain,
        severity: 'MEDIUM',
        meta: { ips: entry.dns_a }
      });
    }
  }
}
