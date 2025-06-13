/* =============================================================================
 * MODULE: techStackScan.ts (Integrated Intelligence – Enhanced v2)
 * =============================================================================
 * Performs technology fingerprinting with live security-intelligence correlation.
 * Set TS_SCAN_VERBOSE=1 to enable per-target debug logs.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import axios from 'axios';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

const exec = promisify(execFile);

// ───────────────── Tunables ───────────────────────────────────────────────
const MAX_CONCURRENCY          = 4;          // parallel Wappalyzer processes
const WAPP_TIMEOUT_MS          = 10_000;
const API_TIMEOUT_MS           = 15_000;
const NVD_MIN_INTERVAL_MS      = 6_500;      // NVD rate-limit (1 req / 6 s)
const MIN_VERSION_CONFIDENCE   = 70;         // warn below this confidence
const VERBOSE                  = process.env.TS_SCAN_VERBOSE === '1';

// ───────────────── Types ──────────────────────────────────────────────────
interface WappTech {
  name: string;
  slug: string;
  version?: string;
  confidence: number;
  cpe?: string;
  categories: { id: number; name: string; slug: string }[];
}

interface SecAnalysis {
  eol: boolean;
  vulns: { id: string; source: 'NVD' | 'OSV' }[];
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  advice: string[];
  versionConfidenceWarning?: boolean;
}

// ───────────────── Utility helpers ────────────────────────────────────────
const log = (...m: unknown[]) => rootLog('[techStackScan]', ...m);

/* Resolve Wappalyzer binary */
async function resolveWappalyzer(): Promise<string | null> {
  const cands: Array<{ bin: string; args: string[] }> = [
    { bin: 'wappalyzer', args: ['--version'] },
    { bin: 'npx',        args: ['-y', 'wappalyzer', '--version'] },
  ];
  for (const c of cands) {
    try { await exec(c.bin, c.args, { timeout: 5_000 }); return c.bin; } catch {/* next */ }
  }
  return null;
}

/* Build targets from endpointDiscovery */
async function buildTargets(scanId: string, domain: string): Promise<string[]> {
  const set = new Set<string>([`https://${domain}`]);
  try {
    const { rows } = await pool.query(
      `SELECT jsonb_path_query_array(meta, '$.endpoints[*].url') AS urls
       FROM artifacts
       WHERE type='discovered_endpoints'
         AND meta->>'scan_id'=$1
       LIMIT 1`,
      [scanId],
    );
    rows[0]?.urls?.slice(0, 100).forEach((u: string) => set.add(u));
  } catch {/* ignore */ }
  return [...set];
}

/* Ecosystem detection for OSV */
function detectEcosystem(t: WappTech): string | null {
  const cats = t.categories.map((c) => c.slug.toLowerCase());

  if (cats.some((c) => /javascript|node\.?js|npm/.test(c))) return 'npm';
  if (cats.some((c) => /python|django|flask/.test(c)))       return 'PyPI';
  if (cats.some((c) => /php|laravel|symfony|wordpress|drupal/.test(c))) return 'Packagist';
  if (cats.some((c) => /ruby|rails/.test(c)))                return 'RubyGems';
  if (cats.some((c) => /java|maven/.test(c)))                return 'Maven';
  if (cats.some((c) => /\.net|nuget/.test(c)))               return 'NuGet';
  if (cats.some((c) => /go|golang/.test(c)))                 return 'Go';
  if (cats.some((c) => /rust|cargo/.test(c)))                return 'crates.io';

  const n = t.name.toLowerCase();
  if (/react|vue|angular|express|lodash/.test(n))            return 'npm';
  if (/django|flask|requests|numpy/.test(n))                 return 'PyPI';
  if (/laravel|symfony|composer/.test(n))                    return 'Packagist';

  return null;
}

// ───────────────── External-intel helpers ────────────────────────────────
const eolCache = new Map<string, boolean>();
async function isEol(slug: string, version?: string): Promise<boolean> {
  if (!version) return false;
  const major = version.split('.')[0];
  const key   = `${slug}:${major}`;
  if (eolCache.has(key)) return eolCache.get(key)!;

  try {
    const { data } = await axios.get(`https://endoflife.date/api/${slug}.json`, { timeout: API_TIMEOUT_MS });
    const cycle = (data as any[]).find((c) => c.cycle === major);
    const eol   = !!cycle && new Date(cycle.eol) < new Date();
    eolCache.set(key, eol);
    return eol;
  } catch {
    eolCache.set(key, false);
    return false;
  }
}

const osvCache = new Map<string, { id: string; source: 'OSV' }[]>();
async function osvVulns(t: WappTech) {
  if (!t.version) return [];
  const eco = detectEcosystem(t);
  if (!eco) return [];

  const key = `${eco}:${t.slug}:${t.version}`;
  if (osvCache.has(key)) return osvCache.get(key)!;

  try {
    const { data } = await axios.post('https://api.osv.dev/v1/query', {
      version: t.version,
      package: { name: t.slug, ecosystem: eco },
    }, { timeout: API_TIMEOUT_MS });

    const vulns = data.vulns?.map((v: any) => ({ id: v.id, source: 'OSV' })) ?? [];
    osvCache.set(key, vulns);
    return vulns;
  } catch {
    osvCache.set(key, []);
    return [];
  }
}

const nvdCache = new Map<string, { id: string; source: 'NVD' }[]>();
let lastNvdCall = 0;
async function nvdVulns(cpe?: string) {
  if (!cpe) return [];
  if (nvdCache.has(cpe)) return nvdCache.get(cpe)!;

  const apiKey = process.env.NVD_API_KEY;
  if (!apiKey) return [];

  const wait = NVD_MIN_INTERVAL_MS - (Date.now() - lastNvdCall);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastNvdCall = Date.now();

  try {
    const { data } = await axios.get(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=${encodeURIComponent(cpe)}`,
      { timeout: API_TIMEOUT_MS, headers: { apiKey } },
    );
    const vulns = data.vulnerabilities?.map((v: any) => ({ id: v.cve.id, source: 'NVD' })) ?? [];
    nvdCache.set(cpe, vulns);
    return vulns;
  } catch (e) {
    log('NVD error', (e as Error).message);
    nvdCache.set(cpe, []);
    return [];
  }
}

/* Security analysis for one technology */
async function analyseSecurity(t: WappTech): Promise<SecAnalysis> {
  const [eol, osv, nvd] = await Promise.all([
    isEol(t.slug, t.version),
    osvVulns(t),
    nvdVulns(t.cpe),
  ]);

  const vulns = [...osv, ...nvd];
  let risk: SecAnalysis['risk'] = 'LOW';
  const advice: string[] = [];
  let versionWarn = false;

  if (eol) {
    risk = 'HIGH';
    advice.push(`Upgrade – version ${t.version} is EOL.`);
  }

  if (vulns.length) {
    risk = risk === 'HIGH' ? 'CRITICAL' : 'HIGH';
    advice.push(`Patch – ${vulns.length} CVEs (e.g. ${vulns.slice(0, 3).map((v) => v.id).join(', ')}).`);
  }

  if (t.confidence < MIN_VERSION_CONFIDENCE && t.version) {
    versionWarn = true;
    advice.push(`Version detection confidence low (${t.confidence}%) – verify manually.`);
  }

  if (risk === 'HIGH' || risk === 'CRITICAL') {
    const n = t.name.toLowerCase();
    if (/wordpress|drupal/.test(n)) advice.push('Review plugins/modules for additional vulnerabilities.');
    if (/apache|nginx/.test(n))     advice.push('Ensure secure server configuration and latest patches.');
    if (/spring|struts/.test(n))    advice.push('Check framework-specific security settings.');
  }

  return {
    eol,
    vulns,
    risk,
    advice,
    versionConfidenceWarning: versionWarn,
  };
}

// ───────────────── Main export ─────────────────────────────────────────────
export async function runTechStackScan(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  log('start', domain);

  const bin = await resolveWappalyzer();
  if (!bin) {
    await insertArtifact({
      type: 'scan_error',
      val_text: 'Wappalyzer binary not found',
      severity: 'HIGH',
      meta: { scan_id: scanId, scan_module: 'techStackScan' },
    });
    return 0;
  }
  if (VERBOSE) log('using binary', bin);

  if (!process.env.NVD_API_KEY) {
    await insertArtifact({
      type: 'scan_warning',
      val_text: 'NVD_API_KEY not set – CVE coverage partial',
      severity: 'MEDIUM',
      meta: { scan_id: scanId, scan_module: 'techStackScan' },
    });
  }

  const targets = await buildTargets(scanId, domain);
  log(`fingerprinting ${targets.length} targets`);
  const techMap = new Map<string, WappTech>();

  // ───── Fingerprinting loop ──────────────────────────────────────────────
  for (let i = 0; i < targets.length; i += MAX_CONCURRENCY) {
    const chunk = targets.slice(i, i + MAX_CONCURRENCY);

    const results = await Promise.allSettled(chunk.map(async (url) => {
      if (VERBOSE) log('Wappalyzer >>>', url);
      try {
        const args = bin === 'npx'
          ? ['-y', 'wappalyzer', url, '--quiet', '--json']
          : [url, '--quiet', '--json'];
        const { stdout } = await exec(bin, args, { timeout: WAPP_TIMEOUT_MS });
        const techs = (JSON.parse(stdout).technologies || []) as WappTech[];
        if (VERBOSE) log('Wappalyzer <<<', url, techs.length, 'techs');
        return techs;
      } catch (e) {
        if (VERBOSE) log('Wappalyzer error', url, (e as Error).message);
        return [];
      }
    }));

    results.forEach((res) => {
      if (res.status === 'fulfilled') res.value.forEach((t) => techMap.set(t.slug, t));
    });
  }

  // progress artifact
  await insertArtifact({
    type: 'progress',
    val_text: `Fingerprint phase completed – ${techMap.size} unique technologies`,
    severity: 'INFO',
    meta: { scan_id: scanId, scan_module: 'techStackScan' },
  });

  log(`analysing ${techMap.size} unique techs`);
  let artifacts     = 0;
  let confidenceWarn = 0;

  for (const tech of techMap.values()) {
    const sec = await analyseSecurity(tech);
    const sev: 'INFO' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = sec.risk === 'LOW' ? 'INFO' : sec.risk;

    if (sec.versionConfidenceWarning) confidenceWarn++;

    const artId = await insertArtifact({
      type: 'technology',
      val_text: `${tech.name}${tech.version ? ' v' + tech.version : ''}${sec.versionConfidenceWarning ? ' (low confidence)' : ''}`,
      severity: sev,
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        technology: tech,
        security: sec,
        ecosystem: detectEcosystem(tech),
      },
    });
    artifacts++;

    if (sec.advice.length) {
      await insertFinding(
        artId,
        'TECHNOLOGY_RISK',
        sec.advice.join(' '),
        `Security analysis for ${tech.name}${tech.version ? ' v' + tech.version : ''}.`,
      );
    }
  }

  // ───── Nuclei tags artifact ────────────────────────────────────────────
  if (techMap.size) {
    const ecoStats = new Map<string, number>();
    techMap.forEach((t) => {
      const eco = detectEcosystem(t);
      if (eco) ecoStats.set(eco, (ecoStats.get(eco) || 0) + 1);
    });

    await insertArtifact({
      type: 'tech_tags_for_nuclei',
      val_text: `Detected tech: ${[...techMap.keys()].join(',')}`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        tags: [...techMap.keys()],
        ecosystem_breakdown: Object.fromEntries(ecoStats),
        confidence_warnings: confidenceWarn,
      },
    });
  }

  // summary
  await insertArtifact({
    type: 'scan_summary',
    val_text: `Tech-stack scan: ${artifacts} artifacts, ${techMap.size} unique techs, ${confidenceWarn} confidence warnings`,
    severity: 'INFO',
    meta: {
      scan_id: scanId,
      scan_module: 'techStackScan',
      total_findings: artifacts,
      confidence_warnings: confidenceWarn,
    },
  });

  log(`done – ${artifacts} artifacts, ${confidenceWarn} confidence warnings`);
  return artifacts;
}

export default runTechStackScan;
