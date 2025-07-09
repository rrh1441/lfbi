import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'node:fs/promises';
import axios from 'axios';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import { ggshieldScan } from '../utils/ggshieldRunner.js';
import { scanGitRepos } from './scanGitRepos.js';

const exec = promisify(execFile);
const EXPECTED_TRUFFLEHOG_VER = '3.83.7';
const GITHUB_RE = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)(\.git)?$/i;
const MAX_GIT_REPOS = 10;

type SourceType = 'web_asset' | 'git' | 'file' | 'http';

/** Ensure TruffleHog binary exists & is the pinned version */
async function guardTrufflehog() {
  try {
    const { stdout } = await exec('trufflehog', ['--version']);
    if (!stdout.includes(EXPECTED_TRUFFLEHOG_VER)) {
      throw new Error(`wrong trufflehog version → ${stdout.trim()}`);
    }
    log(`[trufflehog] ✅ binary ${stdout.trim()}`);
  } catch (e) {
    log('[trufflehog] ❌ binary check failed', (e as Error).message);
    throw e;
  }
}

/** Convert ggshield JSON → TruffleHog JSON‑lines so we reuse one parser */
function ggToThJsonLines(ggJson: string) {
  const g = JSON.parse(ggJson) as any[];
  return g
    .map(o =>
      JSON.stringify({
        DetectorName: o.policy_break.policy,
        Raw: o.policy_break.matches[0].match,
        Verified: false,
        SourceMetadata: { Data: { Filesystem: { file: 'stdin', line: 0 } } }
      })
    )
    .join('\n');
}

async function emitFindings(out: string, src: SourceType, url: string) {
  let count = 0;
  for (const line of out.split(/\r?\n/).filter(Boolean)) {
    count++;
    const obj = JSON.parse(line);
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

async function scanWebAssets(scanId: string) {
  const r = await pool.query(
    `SELECT meta FROM artifacts WHERE type='discovered_web_assets' AND meta->>'scan_id'=$1 ORDER BY created_at DESC LIMIT 1`,
    [scanId]
  );
  if (!r.rowCount) return 0;
  let total = 0;
  for (const a of (r.rows[0].meta.assets as { url: string; content: string }[]).filter(
    a => a.content && a.content !== '[binary content]'
  )) {
    const ggRaw = await ggshieldScan(Buffer.from(a.content, 'utf8'));
    total += await emitFindings(ggToThJsonLines(ggRaw), 'web_asset', a.url);
  }
  return total;
}

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
  findings += await scanWebAssets(job.scanId);

  const repos = await getGitRepos(job.scanId);
  if (repos.length)
    findings += await scanGitRepos(repos, job.scanId, emitFindings);

  await insertArtifact({
    type: 'scan_summary',
    val_text: `TruffleHog finished – ${findings} secret(s)`,
    severity: 'INFO',
    meta: { scan_id: job.scanId, total_findings: findings }
  });
  log(`[trufflehog] finished – findings=${findings}`);
  return findings;
}