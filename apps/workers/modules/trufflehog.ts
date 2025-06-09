/* ──────────────────────────────────────────────────────────────────────────
   apps/workers/modules/trufflehog.ts
   --------------------------------------------------------------------------
   Runs TruffleHog against websites, Git repos, and downloaded artefacts.
   The website scan now downloads content first and uses the `filesystem`
   subcommand (CLI v3).                                           2025-06-07
   ------------------------------------------------------------------------ */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import axios from 'axios';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);
const GITHUB_RE = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)(\.git)?$/i;

/* ── Git repository scan ──────────────────────────────────────────────── */
async function scanGit(url: string, scanId?: string): Promise<number> {
  try {
    log('[trufflehog] Git scan:', url);
    const { stdout } = await exec(
      'trufflehog',
      ['git', url, '--json', '--no-verification', '--max-depth=10'],
      { maxBuffer: 20 * 1024 * 1024 }
    );

    const lines = stdout.trim().split('\n').filter(Boolean);
    let findings = 0;

    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        await insertArtifact({
          type: 'secret',
          val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}…`,
          severity: obj.Verified ? 'CRITICAL' : 'HIGH',
          src_url: url,
          meta: {
            detector: obj.DetectorName,
            verified: obj.Verified,
            source_type: 'git',
            file: obj.SourceMetadata?.Data?.Filesystem?.file ?? 'unknown',
            line: obj.SourceMetadata?.Data?.Filesystem?.line ?? 0
          }
        });
        findings++;
      } catch {
        log('[trufflehog] JSON parse failure (git line)');
      }
    }
    return findings;
  } catch (err) {
    log('[trufflehog] Git scan error:', (err as Error).message);
    return 0;
  }
}

/* ── Website scan (fixed) ─────────────────────────────────────────────── */
async function scanWebsite(domain: string, scanId?: string): Promise<number> {
  try {
    log('[trufflehog] Website scan:', domain);

    /* 1. download page */
    const url = `https://${domain}`;
    const resp = await axios.get<ArrayBuffer>(url, { 
      responseType: 'arraybuffer', 
      timeout: 15_000,
      httpsAgent: new (await import('https')).Agent({ rejectUnauthorized: false })
    });
    const tmpPath = `/tmp/trufflehog_${domain.replace(/[^\w.-]/g, '_')}.html`;
    await fs.writeFile(tmpPath, Buffer.from(resp.data));

    /* 2. run filesystem scan */
    const { stdout } = await exec(
      'trufflehog',
      ['filesystem', tmpPath, '--json', '--no-verification'],
      { maxBuffer: 20 * 1024 * 1024 }
    );

    const lines = stdout.trim().split('\n').filter(Boolean);
    let findings = 0;

    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        await insertArtifact({
          type: 'secret',
          val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}…`,
          severity: obj.Verified ? 'CRITICAL' : 'HIGH',
          src_url: url,
          meta: {
            detector: obj.DetectorName,
            verified: obj.Verified,
            source_type: 'http',
            file: tmpPath
          }
        });
        findings++;
      } catch {
        log('[trufflehog] JSON parse failure (web line)');
      }
    }
    return findings;
  } catch (err) {
    log('[trufflehog] Website scan error:', (err as Error).message);
    return 0;
  }
}

/* ── Local-file scan ──────────────────────────────────────────────────── */
async function scanFiles(domain: string): Promise<number> {
  const patterns = [
    `/tmp/spiderfoot-${domain}-*.json`,
    `/tmp/crm_*`,
    `/tmp/file_*`
  ];
  let findings = 0;

  for (const pattern of patterns) {
    try {
      const { stdout } = await exec('sh', ['-c', `ls -1 ${pattern}`]);
      const files = stdout.trim().split('\n').filter(Boolean);

      for (const file of files) {
        try {
          const { stdout: scanOut } = await exec(
            'trufflehog',
            ['filesystem', file, '--json', '--no-verification'],
            { maxBuffer: 20 * 1024 * 1024 }
          );

          const lines = scanOut.trim().split('\n').filter(Boolean);
          for (const line of lines) {
            try {
              const obj = JSON.parse(line);
              await insertArtifact({
                type: 'secret',
                val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 50)}…`,
                severity: obj.Verified ? 'CRITICAL' : 'HIGH',
                src_url: file,
                meta: {
                  detector: obj.DetectorName,
                  verified: obj.Verified,
                  source_type: 'file',
                  file
                }
              });
              findings++;
            } catch { /* ignore parse errors */ }
          }
        } catch { /* ignore scan errors */ }
      }
    } catch { /* no matching files */ }
  }
  return findings;
}

/* ── Entry point ──────────────────────────────────────────────────────── */
export async function runTrufflehog(job: { domain: string; scanId?: string }): Promise<number> {
  log('[trufflehog] Start secret scan:', job.domain);
  let total = 0;

  /* 1. main website */
  total += await scanWebsite(job.domain, job.scanId);

  /* 2. Git repos from SpiderFoot */
  try {
    const links = JSON.parse(await fs.readFile('/tmp/spiderfoot-links.json', 'utf8')) as string[];
    const gitRepos = links.filter(l => GITHUB_RE.test(l)).slice(0, 5);
    log('[trufflehog] GitHub targets:', gitRepos.length);

    for (const repo of gitRepos) {
      total += await scanGit(repo, job.scanId);
    }
  } catch {
    log('[trufflehog] No SpiderFoot links or unable to parse');
  }

  /* 3. previously downloaded files */
  total += await scanFiles(job.domain);

  log('[trufflehog] Finished:', job.domain, 'secrets found:', total);
  
  // Add completion tracking
  await insertArtifact({
    type: 'scan_summary',
    val_text: `TruffleHog scan completed: ${total} secrets found`,
    severity: 'INFO',
    meta: {
      scan_id: job.scanId,
      scan_module: 'trufflehog',
      total_findings: total,
      timestamp: new Date().toISOString()
    }
  });
  
  return total;
} 