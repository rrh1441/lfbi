/* =============================================================================
 * MODULE: techStackScan.ts (Integrated Intelligence – Enhanced)
 * =============================================================================
 * Performs technology fingerprinting with live security intelligence correlation.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import axios from 'axios';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

// ----- Tunables -------------------------------------------------------------
const MAX_CONCURRENCY = 4;               // parallel Wappalyzer processes
const WAPP_TIMEOUT_MS = 10_000;
const API_TIMEOUT_MS  = 15_000;
const NVD_MIN_INTERVAL_MS = 6_500;      // NVD rate‑limit (1 req / 6 s)
const MIN_VERSION_CONFIDENCE = 70;       // Threshold for version confidence warnings

// ----- Types ----------------------------------------------------------------
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

// ----- Utility: resolve Wappalyzer binary ----------------------------------
async function resolveWappalyzer(): Promise<string | null> {
  const cands: Array<{ bin: string; args: string[] }> = [
    { bin: 'wappalyzer', args: ['--version'] },
    { bin: 'npx',        args: ['-y', 'wappalyzer', '--version'] },
  ];
  for (const c of cands) {
    try { await exec(c.bin, c.args, { timeout: 5_000 }); return c.bin; } catch {}
  }
  return null;
}

// ----- Build target list from endpointDiscovery -----------------------------
async function buildTargets(scanId: string, domain: string): Promise<string[]> {
  const s = new Set<string>([`https://${domain}`]);
  try {
    const { rows } = await pool.query(
      `SELECT jsonb_path_query_array(meta, '$.endpoints[*].url') AS urls
       FROM artifacts WHERE type='discovered_endpoints'
       AND meta->>'scan_id'=$1 LIMIT 1`, [scanId]);
    rows[0]?.urls?.slice(0, 100).forEach((u: string) => s.add(u));
  } catch {}
  return [...s];
}

// ----- Enhanced ecosystem detection for OSV --------------------------------
function detectEcosystem(tech: WappTech): string | null {
  const categories = tech.categories.map(c => c.slug.toLowerCase());
  
  // Enhanced ecosystem mapping
  if (categories.some(c => /javascript|node\.?js|npm/.test(c))) return 'npm';
  if (categories.some(c => /python|django|flask/.test(c))) return 'PyPI';
  if (categories.some(c => /php|laravel|symfony|wordpress|drupal/.test(c))) return 'Packagist';
  if (categories.some(c => /ruby|rails/.test(c))) return 'RubyGems';
  if (categories.some(c => /java|maven/.test(c))) return 'Maven';
  if (categories.some(c => /\.net|nuget/.test(c))) return 'NuGet';
  if (categories.some(c => /go|golang/.test(c))) return 'Go';
  if (categories.some(c => /rust|cargo/.test(c))) return 'crates.io';
  
  // Additional detection based on technology name
  const name = tech.name.toLowerCase();
  if (/react|vue|angular|express|lodash/.test(name)) return 'npm';
  if (/django|flask|requests|numpy/.test(name)) return 'PyPI';
  if (/laravel|symfony|composer/.test(name)) return 'Packagist';
  
  return null;
}

// ----- External‑intel helpers ----------------------------------------------
const eolCache = new Map<string, boolean>();
async function isEol(slug: string, version?: string): Promise<boolean> {
  if (!version) return false;
  const major = version.split('.')[0];
  const key = `${slug}:${major}`;
  if (eolCache.has(key)) return eolCache.get(key)!;
  try {
    const { data } = await axios.get(`https://endoflife.date/api/${slug}.json`, { timeout: API_TIMEOUT_MS });
    const cycle = (data as any[]).find(c => c.cycle === major);
    const eol = !!cycle && new Date(cycle.eol) < new Date();
    eolCache.set(key, eol); return eol;
  } catch { eolCache.set(key,false); return false; }
}

const osvCache = new Map<string, { id: string; source: 'OSV' }[]>();
async function osvVulns(t: WappTech): Promise<{ id: string; source: 'OSV' }[]> {
  if (!t.version) return [];
  
  const eco = detectEcosystem(t);
  if (!eco) return [];
  
  const key = `${eco}:${t.slug}:${t.version}`;
  if (osvCache.has(key)) return osvCache.get(key)!;
  
  try {
    const { data } = await axios.post('https://api.osv.dev/v1/query', {
      version: t.version,
      package: { name: t.slug, ecosystem: eco }
    }, { timeout: API_TIMEOUT_MS });
    const vulns = data.vulns?.map((v: any) => ({ id: v.id, source: 'OSV' })) || [];
    osvCache.set(key, vulns); 
    return vulns;
  } catch { 
    osvCache.set(key, []); 
    return []; 
  }
}

const nvdCache = new Map<string, { id: string; source: 'NVD' }[]>();
let lastNvdCall = 0;
async function nvdVulns(cpe?: string): Promise<{ id: string; source: 'NVD' }[]> {
  if (!cpe) return [];
  if (nvdCache.has(cpe)) return nvdCache.get(cpe)!;
  const apiKey = process.env.NVD_API_KEY;
  if (!apiKey) return [];
  
  // naive rate‑limit
  const delta = Date.now() - lastNvdCall;
  if (delta < NVD_MIN_INTERVAL_MS) await new Promise(r => setTimeout(r, NVD_MIN_INTERVAL_MS - delta));
  lastNvdCall = Date.now();
  
  try {
    const { data } = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=${encodeURIComponent(cpe)}`, {
      timeout: API_TIMEOUT_MS,
      headers: { apiKey }
    });
    const vulns = data.vulnerabilities?.map((v: any) => ({ id: v.cve.id, source: 'NVD' })) || [];
    nvdCache.set(cpe, vulns); 
    return vulns;
  } catch (e) { 
    log('[techStackScan] NVD error', (e as Error).message); 
    nvdCache.set(cpe, []); 
    return []; 
  }
}

async function analyseSecurity(t: WappTech): Promise<SecAnalysis> {
  const [eol, osv, nvd] = await Promise.all([isEol(t.slug, t.version), osvVulns(t), nvdVulns(t.cpe)]);
  const vulns = [...osv, ...nvd];
  let risk: SecAnalysis['risk'] = 'LOW';
  const advice: string[] = [];
  let versionConfidenceWarning = false;

  // EOL check
  if (eol) { 
    risk = 'HIGH'; 
    advice.push(`Upgrade – version ${t.version} is EOL.`); 
  }
  
  // Vulnerability check
  if (vulns.length) {
    risk = risk === 'HIGH' ? 'CRITICAL' : 'HIGH';
    advice.push(`Patch – ${vulns.length} CVEs (e.g. ${vulns.slice(0,3).map(v=>v.id).join(', ')}).`);
  }
  
  // Version confidence check
  if (t.confidence < MIN_VERSION_CONFIDENCE && t.version) {
    versionConfidenceWarning = true;
    advice.push(`Version detection confidence low (${t.confidence}%) - verify manually.`);
    // Don't downgrade risk, but note the uncertainty
  }
  
  // General security advice for high-risk technologies
  if (risk === 'HIGH' || risk === 'CRITICAL') {
    const name = t.name.toLowerCase();
    if (/wordpress|drupal/.test(name)) {
      advice.push('Review plugins/modules for additional vulnerabilities.');
    }
    if (/apache|nginx/.test(name)) {
      advice.push('Ensure secure server configuration and latest security patches.');
    }
    if (/spring|struts/.test(name)) {
      advice.push('Check for framework-specific security configurations.');
    }
  }

  return { 
    eol, 
    vulns, 
    risk, 
    advice,
    versionConfidenceWarning
  };
}

// ----- Main -----------------------------------------------------------------
export async function runTechStackScan(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  log('[techStackScan] start', domain);

  const bin = await resolveWappalyzer();
  if (!bin) {
    await insertArtifact({ 
      type: 'scan_error', 
      val_text: 'Wappalyzer missing', 
      severity: 'HIGH', 
      meta: { scan_id: scanId, scan_module: 'techStackScan' } 
    });
    return 0;
  }

  if (!process.env.NVD_API_KEY) {
    await insertArtifact({ 
      type: 'scan_warning', 
      val_text: 'NVD_API_KEY not set – CVE coverage partial', 
      severity: 'MEDIUM', 
      meta: { scan_id: scanId, scan_module: 'techStackScan' } 
    });
  }

  const targets = await buildTargets(scanId, domain);
  log(`[techStackScan] fingerprinting ${targets.length} targets`);
  const techMap = new Map<string, WappTech>();

  // --- run Wappalyzer -------------------------------------------------------
  for (let i = 0; i < targets.length; i += MAX_CONCURRENCY) {
    const chunk = targets.slice(i, i + MAX_CONCURRENCY);
    const res = await Promise.all(chunk.map(async (url) => {
      try {
        const args = bin === 'npx' ? ['-y', 'wappalyzer', url, '--quiet', '--json'] : [url, '--quiet', '--json'];
        const { stdout } = await exec(bin, args, { timeout: WAPP_TIMEOUT_MS });
        return JSON.parse(stdout).technologies as WappTech[];
      } catch { return []; }
    }));
    res.flat().forEach(t => techMap.set(t.slug, t));
  }

  log(`[techStackScan] analysing ${techMap.size} unique techs`);
  let artefacts = 0;
  let confidenceWarnings = 0;

  for (const tech of techMap.values()) {
    const sec = await analyseSecurity(tech);
    const sev: 'INFO' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = sec.risk === 'LOW' ? 'INFO' : sec.risk;

    if (sec.versionConfidenceWarning) {
      confidenceWarnings++;
    }

    const artId = await insertArtifact({
      type: 'technology',
      val_text: `${tech.name}${tech.version ? ' v'+tech.version : ''}${sec.versionConfidenceWarning ? ' (low confidence)' : ''}`,
      severity: sev,
      meta: { 
        scan_id: scanId, 
        scan_module: 'techStackScan', 
        technology: tech, 
        security: sec,
        ecosystem: detectEcosystem(tech)
      }
    });
    artefacts += 1;

    if (sec.advice.length) {
      await insertFinding(
        artId, 
        'TECHNOLOGY_RISK', 
        sec.advice.join(' '), 
        `Security analysis for ${tech.name}${tech.version ? ' v'+tech.version : ''}.`
      );
    }
  }

  // ---- Enhanced Nuclei tag artifact ----------------------------------------
  if (techMap.size) {
    const ecosystemStats = new Map<string, number>();
    Array.from(techMap.values()).forEach(tech => {
      const eco = detectEcosystem(tech);
      if (eco) {
        ecosystemStats.set(eco, (ecosystemStats.get(eco) || 0) + 1);
      }
    });

    await insertArtifact({
      type: 'tech_tags_for_nuclei',
      val_text: `Detected tech: ${[...techMap.keys()].join(',')}`,
      severity: 'INFO',
      meta: { 
        scan_id: scanId, 
        tags: [...techMap.keys()],
        ecosystem_breakdown: Object.fromEntries(ecosystemStats),
        confidence_warnings: confidenceWarnings
      }
    });
  }

  await insertArtifact({
    type: 'scan_summary',
    val_text: `Tech‑stack scan: ${artefacts} technologies, ${techMap.size} unique, ${confidenceWarnings} confidence warnings`,
    severity: 'INFO',
    meta: { 
      scan_id: scanId, 
      scan_module: 'techStackScan', 
      total_findings: artefacts,
      confidence_warnings: confidenceWarnings
    }
  });
  
  log(`[techStackScan] done - ${artefacts} technologies, ${confidenceWarnings} confidence warnings`);
  return artefacts;
}