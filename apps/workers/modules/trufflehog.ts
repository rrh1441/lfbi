import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'node:fs/promises';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import { scanGitRepos } from './scanGitRepos.js';

const exec = promisify(execFile);
const EXPECTED_TRUFFLEHOG_VER = '3.83.7';
const GITHUB_RE = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)(\.git)?$/i;
const MAX_GIT_REPOS = 10;

type SourceType = 'git' | 'file' | 'http';

/** Ensure TruffleHog binary exists & is the pinned version */
async function guardTrufflehog() {
  try {
    const { stdout } = await exec('trufflehog', ['--version']);
    if (!stdout.includes(EXPECTED_TRUFFLEHOG_VER)) {
      log(`[trufflehog] ⚠️ wrong trufflehog version → ${stdout.trim()}, continuing anyway`);
    } else {
      log(`[trufflehog] ✅ binary ${stdout.trim()}`);
    }
  } catch (e) {
    log('[trufflehog] ❌ binary check failed', (e as Error).message);
    throw e; // Still throw if binary doesn't exist at all
  }
}

/** Process TruffleHog JSON-lines output and emit findings */
function processTruffleHogOutput(output: string): { DetectorName: string; Raw: string; Verified: boolean; SourceMetadata: any }[] {
  if (!output || !output.trim()) {
    log('[trufflehog] TruffleHog returned empty output');
    return [];
  }
  
  const results: { DetectorName: string; Raw: string; Verified: boolean; SourceMetadata: any }[] = [];
  
  for (const line of output.split(/\r?\n/).filter(Boolean)) {
    try {
      const obj = JSON.parse(line);
      if (obj.DetectorName && obj.Raw) {
        results.push(obj);
      }
    } catch (e) {
      log('[trufflehog] Failed to parse TruffleHog JSON line:', (e as Error).message);
      log('[trufflehog] Raw line:', line.slice(0, 200));
    }
  }
  
  return results;
}

async function emitFindings(results: { DetectorName: string; Raw: string; Verified: boolean; SourceMetadata: any }[], src: SourceType, url: string) {
  let count = 0;
  for (const obj of results) {
    count++;
    const aid = await insertArtifact({
      type: 'secret',
      val_text: `${obj.DetectorName}: ${obj.Raw.slice(0, 40)}…`,
      severity: obj.Verified ? 'CRITICAL' : 'HIGH',
      src_url: url,
      meta: { detector: obj.DetectorName, source_type: src }
    });
    await insertFinding(
      aid,
      obj.Verified ? 'VERIFIED_SECRET' : 'POTENTIAL_SECRET',
      'Rotate/ revoke immediately.',
      obj.Raw
    );
  }
  return count;
}

// Web asset scanning has been moved to clientSecretScanner.ts
// This module now only handles Git repository scanning

async function getGitRepos(scanId: string) {
  try {
    const links = JSON.parse(
      await fs.readFile(`/tmp/spiderfoot-links-${scanId}.json`, 'utf8')
    ) as string[];
    return links.filter(l => GITHUB_RE.test(l)).slice(0, MAX_GIT_REPOS);
  } catch {
    return [];
  }
}

export async function runTrufflehog(job: { domain: string; scanId: string }) {
  await guardTrufflehog();

  let findings = 0;
  
  // Only scan Git repositories - web assets are now handled by clientSecretScanner
  const repos = await getGitRepos(job.scanId);
  if (repos.length) {
    log(`[trufflehog] Scanning ${repos.length} Git repositories for secrets`);
    findings += await scanGitRepos(repos, job.scanId, async (output: string, src: SourceType, url: string) => {
      const secrets = processTruffleHogOutput(output);
      return await emitFindings(secrets, src, url);
    });
  } else {
    log('[trufflehog] No Git repositories found to scan');
  }

  await insertArtifact({
    type: 'scan_summary',
    val_text: `TruffleHog Git scan finished – ${findings} secret(s)`,
    severity: 'INFO',
    meta: { scan_id: job.scanId, total_findings: findings, scope: 'git_only' }
  });
  log(`[trufflehog] finished Git scan – findings=${findings}`);
  return findings;
}