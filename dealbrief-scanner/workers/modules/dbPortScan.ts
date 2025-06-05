import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

export async function runDbPortScan(job: { domain: string }) {
  log('[db-scan]', job.domain);

  const targets = [
    `${job.domain}:5432`,
    `${job.domain}:3306`
    // you can add discovered IP:port pairs here
  ];

  for (const t of targets) {
    const [host, port] = t.split(':');
    // banner grab
    try {
      const { stdout } = await exec('timeout', [
        '3',
        'bash',
        '-c',
        `echo | openssl s_client -connect ${host}:${port}`
      ]);
      if (stdout.includes('Neon')) {
        await insertArtifact({
          type: 'db_banner',
          val_text: host,
          severity: 'INFO',
          meta: { provider: 'neon' }
        });
      }
    } catch {}

    // nmap brute
    const { stdout } = await exec('nmap', [
      '-Pn',
      '-p',
      port,
      '--script',
      port === '5432' ? 'pgsql-brute' : 'mysql-brute',
      host
    ]);
    if (/Accounts:.+Valid:\s+1/i.test(stdout)) {
      await insertArtifact({
        type: 'vuln',
        val_text: 'DEFAULT_DB_CREDS',
        severity: 'CRITICAL',
        src_url: `${host}:${port}`,
        meta: { nmap: stdout }
      });
    }
  }
}
