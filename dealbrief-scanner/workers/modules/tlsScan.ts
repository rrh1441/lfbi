import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

export async function runTlsScan(job: { domain: string }) {
  log('[TLS]', job.domain);
  const { stdout } = await exec('testssl.sh', [
    '--quiet',
    '--warnings',
    job.domain
  ]);
  if (/TLSv1[01]/.test(stdout) || /RC4|3DES/.test(stdout)) {
    await insertArtifact({
      type: 'tls_weak',
      val_text: job.domain,
      severity: 'MEDIUM',
      meta: { finding: 'legacy ciphers or protocols' }
    });
  }
  if (/Certificate valid until:.*\b(2[0-2]\d{2})\b/.test(stdout)) {
    const year = Number(RegExp.$1);
    if (year <= new Date().getFullYear()) {
      await insertArtifact({
        type: 'tls_expires_soon',
        val_text: job.domain,
        severity: 'LOW'
      });
    }
  }
}
