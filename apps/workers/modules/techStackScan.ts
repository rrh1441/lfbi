/* =============================================================================
 * MODULE: techStackScan.ts (Enhanced v4 – Modern Intelligence Pipeline)
 * =============================================================================
 * Technology fingerprinting with modern vulnerability intelligence, SBOM generation,
 * and supply‑chain risk scoring. Incorporates: timeline validation, EPSS batching,
 * CISA‑KEV global cache, age‑weighted supply‑chain formula, explicit severity map,
 * stronger heuristics, and full TypeScript strict‑mode compliance.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import axios from 'axios';
import pLimit from 'p-limit';
import puppeteer, { Browser } from 'puppeteer';
import semver from 'semver';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

const exec = promisify(execFile);

// ───────────────── Configuration ────────────────────────────────────────────
const CONFIG = {
  MAX_CONCURRENCY: 6,
  NUCLEI_TIMEOUT_MS: 10_000,
  API_TIMEOUT_MS: 15_000,
  MIN_VERSION_CONFIDENCE: 0.6,
  TECH_CIRCUIT_BREAKER: 20,
  PAGE_TIMEOUT_MS: 25_000,
  MAX_THIRD_PARTY_REQUESTS: 200,
  CACHE_TTL_MS: 24 * 60 * 60 * 1000,
  GITHUB_BATCH_SIZE: 25,
  GITHUB_BATCH_DELAY: 1_000,
  SUPPLY_CHAIN_THRESHOLD: 7.0,
  EPSS_BATCH: 100
} as const;

type Severity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
const RISK_TO_SEVERITY: Record<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', Severity> = {
  LOW: 'INFO',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

// ───────────────── Types ────────────────────────────────────────────────────
interface WappTech {
  name: string;
  slug: string;
  version?: string;
  confidence: number;
  cpe?: string;
  categories: { id: number; name: string; slug: string }[];
}

interface VulnRecord {
  id: string;
  source: 'OSV' | 'GITHUB';
  cvss?: number;
  epss?: number;
  cisaKev?: boolean;
  summary?: string;
  publishedDate?: Date;
  affectedVersionRange?: string;
}

interface EnhancedSecAnalysis {
  eol: boolean;
  vulns: VulnRecord[];
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  advice: string[];
  versionAccuracy?: number;
  supplyChainScore: number;
  packageIntelligence?: PackageIntelligence;
}

interface PackageIntelligence {
  popularity?: number;
  maintenance?: string;
  license?: string;
  licenseRisk?: 'LOW' | 'MEDIUM' | 'HIGH';
  openSSFScore?: number;
  dependents?: number;
}

interface CycloneDXComponent {
  type: 'library' | 'framework' | 'application';
  'bom-ref': string;
  name: string;
  version?: string;
  scope?: string;
  licenses?: Array<{ license: { name: string } }>;
  purl?: string;
  vulnerabilities?: Array<{
    id: string;
    source: { name: string; url: string };
    ratings: Array<{ score: number; severity: string; method: string }>;
  }>;
}

interface ScanMetrics {
  totalTargets: number;
  thirdPartyOrigins: number;
  uniqueTechs: number;
  supplyFindings: number;
  runMs: number;
  circuitBreakerTripped: boolean;
  cacheHitRate: number;
}

// ───────────────── Intelligent Cache ───────────────────────────────────────
class IntelligentCache<T> {
  private cache = new Map<string, { data: T; ts: number; hits: number }>();
  private req = 0;
  private hits = 0;
  constructor(private ttlMs = CONFIG.CACHE_TTL_MS) {}
  get(key: string): T | null {
    this.req++;
    const e = this.cache.get(key);
    if (!e) return null;
    if (Date.now() - e.ts > this.ttlMs) return null;
    this.hits++;
    e.hits++;
    return e.data;
  }
  set(key: string, data: T): void {
    this.cache.set(key, { data, ts: Date.now(), hits: 0 });
  }
  stats() {
    return { size: this.cache.size, hitRate: this.req ? this.hits / this.req : 0, req: this.req, hits: this.hits };
  }
}

const eolCache = new IntelligentCache<boolean>();
const osvCache = new IntelligentCache<VulnRecord[]>();
const githubCache = new IntelligentCache<VulnRecord[]>();
const depsDevCache = new IntelligentCache<PackageIntelligence | undefined>();
const epssCache = new IntelligentCache<number | undefined>(6 * 60 * 60 * 1000); // 6h

// KEV list cached for full run
let kevList: Set<string> | null = null;
async function getKEVList(): Promise<Set<string>> {
  if (kevList) return kevList;
  try {
    const { data } = await axios.get(
      'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json',
      { timeout: CONFIG.API_TIMEOUT_MS }
    );
    kevList = new Set<string>(data.vulnerabilities?.map((v: any) => v.cveID) ?? []);
  } catch {
    kevList = new Set();
  }
  return kevList;
}

// ───────────────── Circuit Breaker ─────────────────────────────────────────
class TechnologyScanCircuitBreaker {
  private to = 0;
  private tripped = false;
  recordTimeout() {
    if (this.tripped) return;
    if (++this.to >= CONFIG.TECH_CIRCUIT_BREAKER) {
      this.tripped = true;
      log('circuitBreaker=tripped');
    }
  }
  isTripped() { return this.tripped; }
}

const log = (...m: unknown[]) => rootLog('[techStackScan]', ...m);

// ───────────────── Utility helpers ─────────────────────────────────────────
const capitalizeFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* Convert Nuclei technology detection output to WappTech format */
function convertNucleiToWappTech(nucleiLines: string[]): WappTech[] {
  const technologies: WappTech[] = [];
  
  for (const line of nucleiLines) {
    try {
      const result = JSON.parse(line.trim());
      
      // Extract technology information from Nuclei result
      const name = result.info?.name || result['template-id'] || 'Unknown';
      const version = result['extracted-results']?.[0] || result.info?.version || undefined;
      const tags = result.info?.tags || ['unknown'];
      
      // Convert to WappTech format
      technologies.push({
        name: name,
        slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        version: version,
        confidence: 100, // Nuclei matchers fire only on confirmed hits
        categories: tags.map((tag: string) => ({
          id: 0,
          name: capitalizeFirst(tag),
          slug: tag.toLowerCase()
        }))
      });
    } catch (error) {
      // Skip malformed JSON lines
      continue;
    }
  }
  
  return technologies;
}

/* Enhanced ecosystem detection */
function detectEcosystem(t: WappTech): string | null {
  const cats = t.categories.map((c) => c.slug.toLowerCase());
  const name = t.name.toLowerCase();

  // Enhanced patterns for better ecosystem detection
  if (cats.some((c) => /javascript|node\.?js|npm|react|vue|angular/.test(c)) || 
      /react|vue|angular|express|lodash|webpack|babel/.test(name)) return 'npm';
  
  if (cats.some((c) => /python|django|flask|pyramid/.test(c)) || 
      /django|flask|requests|numpy|pandas|fastapi/.test(name)) return 'PyPI';
  
  if (cats.some((c) => /php|laravel|symfony|wordpress|drupal|composer/.test(c)) || 
      /laravel|symfony|composer|codeigniter/.test(name)) return 'Packagist';
  
  if (cats.some((c) => /ruby|rails|gem/.test(c)) || 
      /rails|sinatra|jekyll/.test(name)) return 'RubyGems';
  
  if (cats.some((c) => /java|maven|gradle|spring/.test(c)) || 
      /spring|hibernate|struts|maven/.test(name)) return 'Maven';
  
  if (cats.some((c) => /\.net|nuget|csharp/.test(c)) || 
      /entityframework|mvc|blazor/.test(name)) return 'NuGet';
  
  if (cats.some((c) => /go|golang/.test(c)) || 
      /gin|echo|fiber|gorm/.test(name)) return 'Go';
  
  if (cats.some((c) => /rust|cargo/.test(c)) || 
      /actix|rocket|tokio/.test(name)) return 'crates.io';

  return null;
}

/* Calculate version accuracy from multiple detections */
function calculateVersionAccuracy(detections: WappTech[]): number {
  if (detections.length <= 1) return 1.0;
  
  const versions = detections
    .filter(d => d.version)
    .map(d => d.version!)
    .map(v => v.split('.').map(Number).filter(n => !isNaN(n)));
  
  if (versions.length <= 1) return 1.0;
  
  // Calculate standard deviation of version numbers
  const majorVersions = versions.map(v => v[0] || 0);
  const mean = majorVersions.reduce((a, b) => a + b, 0) / majorVersions.length;
  const variance = majorVersions.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / majorVersions.length;
  const stddev = Math.sqrt(variance);
  
  return Math.max(0, 1 - (stddev / 10));
}

/* Resolve Nuclei binary for technology detection */
async function resolveNuclei(): Promise<string | null> {
  try {
    await exec('nuclei', ['--version'], { timeout: 5_000 });
    log(`techstack=nuclei binary confirmed`);
    return 'nuclei';
  } catch {
    log(`techstack=nuclei binary not found`);
    return null;
  }
}

/* Build enhanced target list */
async function buildTargets(scanId: string, domain: string): Promise<string[]> {
  const targets = new Set<string>([`https://${domain}`, `https://www.${domain}`]);
  
  try {
    const { rows } = await pool.query(
      `SELECT jsonb_path_query_array(meta, '$.endpoints[*].url') AS urls
       FROM artifacts
       WHERE type='discovered_endpoints' AND meta->>'scan_id'=$1
       LIMIT 1`,
      [scanId]
    );
    
    // Add discovered endpoints (limit to 100 for performance)
    rows[0]?.urls?.slice(0, 100).forEach((url: string) => {
      if (url.startsWith('http')) targets.add(url);
    });
  } catch (error) {
    log(`buildTargets error: ${(error as Error).message}`);
  }
  
  return Array.from(targets);
}

/* Third-party sub-resource discovery using Puppeteer */
async function discoverThirdPartyOrigins(domain: string): Promise<string[]> {
  let browser: Browser | undefined;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    const origins = new Set<string>();
    
    // Track network requests
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      try {
        const urlObj = new URL(url);
        const origin = urlObj.origin;
        
        // Filter to third-party origins (different eTLD+1)
        if (!origin.includes(domain) && 
            !origin.includes('localhost') && 
            !origin.includes('127.0.0.1')) {
          origins.add(origin);
        }
      } catch {
        // Invalid URL, ignore
      }
      
      // Continue the request
      request.continue();
    });
    
    // Navigate and wait for resources
    await page.goto(`https://${domain}`, { 
      timeout: CONFIG.PAGE_TIMEOUT_MS,
      waitUntil: 'networkidle2' 
    });
    
    // Limit results to prevent excessive discovery
    const limitedOrigins = Array.from(origins).slice(0, CONFIG.MAX_THIRD_PARTY_REQUESTS);
    log(`thirdParty=discovered domain=${domain} origins=${limitedOrigins.length}`);
    
    return limitedOrigins;
    
  } catch (error) {
    log(`thirdParty=error domain=${domain} error="${(error as Error).message}"`);
    return [];
  } finally {
    await browser?.close();
  }
}

// ───────────────── Batched EPSS lookup ─────────────────────────────────────
async function getEPSSScores(cveIds: string[]): Promise<Map<string, number>> {
  const uncached = cveIds.filter(id => epssCache.get(`e:${id}`) === null);
  const batched: Map<string, number> = new Map();
  // Already cached results
  cveIds.forEach(id => {
    const v = epssCache.get(`e:${id}`);
    if (v !== null) batched.set(id, v ?? 0);
  });
  // Batch query first.org 100‑ids per request
  for (let i = 0; i < uncached.length; i += CONFIG.EPSS_BATCH) {
    const chunk = uncached.slice(i, i + CONFIG.EPSS_BATCH);
    try {
      const { data } = await axios.get(`https://api.first.org/data/v1/epss?cve=${chunk.join(',')}`, { timeout: CONFIG.API_TIMEOUT_MS });
      (data.data as any[]).forEach((d: any) => {
        const score = Number(d.epss) || 0;
        epssCache.set(`e:${d.cve}`, score);
        batched.set(d.cve, score);
      });
    } catch {
      chunk.forEach(id => { epssCache.set(`e:${id}`, 0); batched.set(id, 0); });
    }
  }
  return batched;
}

// ───────────────── Supply‑chain score (age‑weighted) ─────────────────────
function supplyChainScore(vulns: VulnRecord[]): number {
  let max = 0;
  const now = Date.now();
  for (const v of vulns) {
    const ageY = v.publishedDate ? (now - v.publishedDate.getTime()) / 31_557_600_000 : 0; // ms per year
    const temporal = Math.exp(-0.3 * ageY);           // 30 % yearly decay
    const cvss = (v.cvss ?? 0) * temporal;
    const epss = (v.epss ?? 0) * 10;                  // scale 0‑10
    const kev = v.cisaKev ? 10 : 0;
    max = Math.max(max, 0.4 * cvss + 0.4 * epss + 0.2 * kev);
  }
  return Number(max.toFixed(1));
}

// ───────────────── Enhanced Intelligence Sources ──────────────────────────

/* EOL detection with caching */
async function isEol(slug: string, version?: string): Promise<boolean> {
  if (!version) return false;
  
  const major = version.split('.')[0];
  const key = `eol:${slug}:${major}`;
  
  const cached = eolCache.get(key);
  if (cached !== null) return cached;

  try {
    const { data } = await axios.get(`https://endoflife.date/api/${slug}.json`, { 
      timeout: CONFIG.API_TIMEOUT_MS 
    });
    
    const cycle = (data as any[]).find((c) => c.cycle === major);
    const eol = !!cycle && new Date(cycle.eol) < new Date();
    
    eolCache.set(key, eol);
    return eol;
  } catch {
    eolCache.set(key, false);
    return false;
  }
}

// Version validation helpers
function isVersionInRange(version: string, range: string): boolean {
  try {
    // Clean and normalize version strings
    const cleanVersion = semver.coerce(version);
    if (!cleanVersion) {
      log(`version=invalid version="${version}"`);
      return false;
    }

    // Handle common range patterns
    if (range.includes('*') || range === '*') {
      return true; // Wildcard matches all
    }

    // Convert common patterns to semver ranges
    let semverRange = range;
    
    // Handle "< x.y.z" patterns
    if (range.match(/^<\s*[0-9]/)) {
      semverRange = range;
    }
    // Handle ">= x.y.z" patterns  
    else if (range.match(/^>=\s*[0-9]/)) {
      semverRange = range;
    }
    // Handle "x.y.z - a.b.c" range patterns
    else if (range.includes(' - ')) {
      semverRange = range;
    }
    // Handle comma-separated ranges like ">=2.4.0, <2.4.50"
    else if (range.includes(',')) {
      const parts = range.split(',').map(p => p.trim());
      return parts.every(part => semver.satisfies(cleanVersion, part));
    }
    // Handle specific version lists
    else if (range.includes(version)) {
      return true;
    }
    // Default: try as semver range
    else {
      // If it doesn't look like a range, assume exact match
      if (!range.match(/[<>=~^]/) && !range.includes(' ')) {
        return semver.eq(cleanVersion, semver.coerce(range) || range);
      }
    }

    return semver.satisfies(cleanVersion, semverRange);
  } catch (error) {
    log(`version=error version="${version}" range="${range}" error="${(error as Error).message}"`);
    // Fallback to simple string matching for malformed ranges
    return range.includes(version);
  }
}

// Add CVE timeline validation function
function validateCVETimeline(cveId: string, publishedDate?: Date, softwareVersion?: string): boolean {
  if (!publishedDate || !softwareVersion) {
    return true; // Can't validate without dates, allow through
  }

  // Extract year from CVE ID (format: CVE-YYYY-NNNNN)
  const cveMatch = cveId.match(/CVE-(\d{4})-/);
  if (!cveMatch) {
    return true; // Not a standard CVE format
  }

  const cveYear = parseInt(cveMatch[1]);
  
  // Get software release year from version (approximate)
  const versionReleaseYear = estimateVersionReleaseYear(softwareVersion);
  
  // CVE can't affect software released after the CVE was published
  if (versionReleaseYear && versionReleaseYear > cveYear + 1) { // +1 year buffer for late disclosures
    log(`cve=timeline_invalid cve="${cveId}" cveYear=${cveYear} versionYear=${versionReleaseYear}`);
    return false;
  }

  return true;
}

// Estimate release year of software version (basic heuristic)
function estimateVersionReleaseYear(version: string): number | null {
  // For Apache versions, we know some patterns:
  // 2.4.x series started in 2012
  // 2.4.50+ are from 2021+
  // 2.4.60+ are from 2024+
  
  const versionMatch = version.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!versionMatch) return null;
  
  const [, major, minor, patch] = versionMatch.map(Number);
  
  // Apache-specific heuristics (can be expanded for other software)
  if (major === 2 && minor === 4) {
    if (patch >= 60) return 2024;
    if (patch >= 50) return 2021;
    if (patch >= 40) return 2019;
    if (patch >= 30) return 2017;
    if (patch >= 20) return 2015;
    if (patch >= 10) return 2013;
    return 2012;
  }
  
  // Generic heuristic: newer versions are more recent
  // This is rough but better than nothing
  if (major >= 3) return 2020;
  if (major === 2 && minor >= 5) return 2020;
  
  return null; // Can't estimate
}

/* OSV.dev vulnerability lookup */
async function getOSVVulns(t: WappTech): Promise<VulnRecord[]> {
  if (!t.version) return [];
  
  const ecosystem = detectEcosystem(t);
  if (!ecosystem) return [];

  const key = `osv:${ecosystem}:${t.slug}:${t.version}`;
  const cached = osvCache.get(key);
  if (cached !== null) return cached;

  try {
    const { data } = await axios.post('https://api.osv.dev/v1/query', {
      version: t.version,
      package: { name: t.slug, ecosystem }
    }, { timeout: CONFIG.API_TIMEOUT_MS });

    const vulns: VulnRecord[] = (data.vulns || [])
      .filter((v: any) => {
        // Validate CVE timeline for CVE-based vulnerabilities
        if (v.id.startsWith('CVE-')) {
          const publishedDate = v.published ? new Date(v.published) : undefined;
          return validateCVETimeline(v.id, publishedDate, t.version);
        }
        return true;
      })
      .map((v: any) => ({
        id: v.id,
        source: 'OSV' as const,
        cvss: v.database_specific?.cvss_score || extractCVSSFromSeverity(v.severity),
        summary: v.summary,
        publishedDate: v.published ? new Date(v.published) : undefined
      }));

    osvCache.set(key, vulns);
    return vulns;
  } catch {
    osvCache.set(key, []);
    return [];
  }
}

/* GitHub Security Advisory lookup via GraphQL */
async function getGitHubVulns(t: WappTech): Promise<VulnRecord[]> {
  const ecosystem = detectEcosystem(t);
  if (!ecosystem || !t.version) return [];
  
  const key = `github:${ecosystem}:${t.slug}:${t.version}`;
  const cached = githubCache.get(key);
  if (cached !== null) return cached;

  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  try {
    const query = `
      query($ecosystem: SecurityAdvisoryEcosystem!, $package: String!) {
        securityVulnerabilities(first: 20, ecosystem: $ecosystem, package: $package) {
          nodes {
            advisory {
              ghsaId
              summary
              severity
              cvss {
                score
              }
            }
            vulnerableVersionRange
          }
        }
      }
    `;

    const { data } = await axios.post('https://api.github.com/graphql', {
      query,
      variables: {
        ecosystem: mapEcosystemToGitHub(ecosystem),
        package: t.slug
      }
    }, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: CONFIG.API_TIMEOUT_MS
    });

    const vulns: VulnRecord[] = (data.data?.securityVulnerabilities?.nodes || [])
      .filter((node: any) => {
        // First check if version is in vulnerable range
        if (!isVersionInRange(t.version!, node.vulnerableVersionRange)) {
          return false;
        }
        
        // Then validate CVE timeline for CVE-based advisories
        const cveMatch = node.advisory.ghsaId.match(/CVE-\d{4}-\d+/);
        if (cveMatch) {
          return validateCVETimeline(cveMatch[0], undefined, t.version);
        }
        
        return true;
      })
      .map((node: any) => ({
        id: node.advisory.ghsaId,
        source: 'GITHUB' as const,
        cvss: node.advisory.cvss?.score,
        summary: node.advisory.summary,
        affectedVersionRange: node.vulnerableVersionRange
      }));

    githubCache.set(key, vulns);
    return vulns;
  } catch {
    githubCache.set(key, []);
    return [];
  }
}

// ───────────────── Helper Functions ───────────────────────────────────────

function extractCVSSFromSeverity(severity?: string): number | undefined {
  if (!severity) return undefined;
  
  const sev = severity.toLowerCase();
  if (sev.includes('critical')) return 9.0;
  if (sev.includes('high')) return 7.5;
  if (sev.includes('medium') || sev.includes('moderate')) return 5.0;
  if (sev.includes('low')) return 2.5;
  return undefined;
}

function mapEcosystemToGitHub(ecosystem: string): string {
  const mapping: Record<string, string> = {
    'npm': 'NPM',
    'PyPI': 'PIP',
    'Packagist': 'COMPOSER',
    'RubyGems': 'RUBYGEMS',
    'Maven': 'MAVEN',
    'NuGet': 'NUGET',
    'Go': 'GO',
    'crates.io': 'RUST'
  };
  return mapping[ecosystem] || ecosystem;
}

function assessLicenseRisk(license?: string): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (!license) return 'MEDIUM';
  
  const high = ['GPL-3.0', 'GPL-2.0', 'AGPL-3.0', 'LGPL-3.0'];
  const medium = ['LGPL-2.1', 'MPL-2.0', 'EPL-2.0'];
  
  if (high.some(l => license.includes(l))) return 'HIGH';
  if (medium.some(l => license.includes(l))) return 'MEDIUM';
  return 'LOW';
}

/* Package intelligence from deps.dev */
async function getPackageIntelligence(ecosystem: string, name: string): Promise<PackageIntelligence | undefined> {
  const key = `deps:${ecosystem}:${name}`;
  const cached = depsDevCache.get(key);
  if (cached !== null) return cached;

  try {
    const { data } = await axios.get(`https://api.deps.dev/v3alpha/systems/${ecosystem}/packages/${name}`, {
      timeout: CONFIG.API_TIMEOUT_MS
    });

    const intelligence: PackageIntelligence = {
      popularity: data.scorecard?.popularity,
      maintenance: data.scorecard?.maintenance,
      license: data.defaultVersion?.licenses?.[0],
      licenseRisk: assessLicenseRisk(data.defaultVersion?.licenses?.[0]),
      dependents: data.scorecard?.dependents
    };

    depsDevCache.set(key, intelligence);
    return intelligence;
  } catch {
    depsDevCache.set(key, undefined);
    return undefined;
  }
}

// ───────────────── Enhanced security analysis  ────────────────────────────
async function analyzeSecurityEnhanced(t: WappTech, detections: WappTech[]): Promise<EnhancedSecAnalysis> {
  const limit = pLimit(3);
  const [eol, osv, gh] = await Promise.all([
    limit(() => isEol(t.slug, t.version)),
    limit(() => getOSVVulns(t)),
    limit(() => getGitHubVulns(t))
  ]);
  const vulns = [...osv, ...gh];
  // Enrich with EPSS + KEV
  const cveIds = vulns.filter(v => v.id.startsWith('CVE-')).map(v => v.id);
  const epssMap = await getEPSSScores(cveIds);
  const kevSet = await getKEVList();
  const enriched = vulns.map(v => ({ ...v, epss: epssMap.get(v.id), cisaKev: kevSet.has(v.id) }));
  const scScore = supplyChainScore(enriched);
  // Risk decision
  let risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  const advice: string[] = [];
  if (eol) { risk = 'HIGH'; advice.push(`Upgrade – version ${t.version} is EOL.`); }
  if (enriched.length) {
    const hasHigh = enriched.some(v => (v.cvss ?? 0) >= 9 || (v.epss ?? 0) >= 0.7 || v.cisaKev);
    risk = hasHigh ? 'HIGH' : risk === 'LOW' ? 'MEDIUM' : risk;
    advice.push(`Patch – ${enriched.length} vulnerabilities found.`);
    if (enriched.some(v => v.cisaKev)) advice.push('CISA Known‑Exploited vuln present.');
  }
  if (scScore >= CONFIG.SUPPLY_CHAIN_THRESHOLD) {
    risk = risk === 'LOW' ? 'MEDIUM' : risk;
    advice.push(`Supply‑chain score ${scScore}/10.`);
  }
  const vAcc = calculateVersionAccuracy(detections);
  if (vAcc < CONFIG.MIN_VERSION_CONFIDENCE && t.version)
    advice.push(`Version detection confidence ${(vAcc * 100).toFixed(1)} %. Verify manually.`);

  return { eol, vulns: enriched, risk, advice, versionAccuracy: vAcc, supplyChainScore: scScore, packageIntelligence: undefined };
}

/* Generate CycloneDX 1.5 SBOM */
function generateSBOM(
  technologies: Map<string, WappTech>, 
  analyses: Map<string, EnhancedSecAnalysis>,
  domain: string
): any {
  const components: CycloneDXComponent[] = [];
  
  for (const [slug, tech] of technologies.entries()) {
    const analysis = analyses.get(slug);
    const ecosystem = detectEcosystem(tech);
    
    const component: CycloneDXComponent = {
      type: 'library',
      'bom-ref': `${ecosystem}/${tech.slug}@${tech.version || 'unknown'}`,
      name: tech.name,
      version: tech.version,
      scope: 'runtime'
    };

    // Add PURL if ecosystem detected
    if (ecosystem && tech.version) {
      component.purl = `pkg:${ecosystem.toLowerCase()}/${tech.slug}@${tech.version}`;
    }

    // Add license information
    if (analysis?.packageIntelligence?.license) {
      component.licenses = [{
        license: { name: analysis.packageIntelligence.license }
      }];
    }

    // Add vulnerabilities
    if (analysis?.vulns.length) {
      component.vulnerabilities = analysis.vulns.map(vuln => ({
        id: vuln.id,
        source: {
          name: vuln.source,
          url: vuln.source === 'OSV' ? 'https://osv.dev' : 'https://github.com/advisories'
        },
        ratings: vuln.cvss ? [{
          score: vuln.cvss,
          severity: vuln.cvss >= 9 ? 'critical' : vuln.cvss >= 7 ? 'high' : vuln.cvss >= 4 ? 'medium' : 'low',
          method: 'CVSSv3'
        }] : []
      }));
    }

    components.push(component);
  }

  return {
    bomFormat: 'CycloneDX',
    specVersion: '1.5',
    version: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      tools: [{
        vendor: 'DealBrief',
        name: 'techStackScan',
        version: '4.0'
      }],
      component: {
        type: 'application',
        name: domain,
        version: '1.0.0'
      }
    },
    components
  };
}

// ───────────────── Main export (enhanced with new helpers & severities) ─
export async function runTechStackScan(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  const start = Date.now();
  log(`techstack=start domain=${domain}`);
  const nucleiBinary = await resolveNuclei();
  if (!nucleiBinary) {
    await insertArtifact({ type: 'scan_error', val_text: 'Nuclei not found', severity: 'HIGH', meta: { scan_id: scanId } });
    return 0;
  }
  const cb = new TechnologyScanCircuitBreaker();
  const limit = pLimit(CONFIG.MAX_CONCURRENCY);
  try {
    const [primary, thirdParty] = await Promise.all([
      buildTargets(scanId, domain),
      discoverThirdPartyOrigins(domain)
    ]);
    const allTargets = [...primary, ...thirdParty];
    const techMap = new Map<string, WappTech>();
    const detectMap = new Map<string, WappTech[]>();
    // fingerprint
    await Promise.all(allTargets.map(url => limit(async () => {
      if (cb.isTripped()) return;
      try {
        const { stdout } = await exec(nucleiBinary, ['-u', url, '-silent', '-json', '-tags', 'tech', '-no-color'], { timeout: CONFIG.NUCLEI_TIMEOUT_MS });
        const techs = convertNucleiToWappTech(stdout.trim().split('\n').filter(Boolean));
        techs.forEach(t => {
          techMap.set(t.slug, t);
          if (!detectMap.has(t.slug)) detectMap.set(t.slug, []);
          detectMap.get(t.slug)!.push(t);
        });
      } catch (e) { if ((e as Error).message.includes('timeout')) cb.recordTimeout(); }
    })));
    // analysis
    const analysisMap = new Map<string, EnhancedSecAnalysis>();
    await Promise.all(Array.from(techMap.entries()).map(([slug, tech]) => limit(async () => {
      const a = await analyzeSecurityEnhanced(tech, detectMap.get(slug) ?? [tech]);
      analysisMap.set(slug, a);
    })));
    // artefacts
    let artCount = 0, supplyFindings = 0;
    for (const [slug, tech] of techMap) {
      const a = analysisMap.get(slug)!;
      const artId = await insertArtifact({
        type: 'technology',
        val_text: `${tech.name}${tech.version ? ' v'+tech.version : ''}`,
        severity: RISK_TO_SEVERITY[a.risk],
        meta: { 
          scan_id: scanId, 
          scan_module: 'techStackScan',
          technology: tech, 
          security: a,
          ecosystem: detectEcosystem(tech),
          supply_chain_score: a.supplyChainScore,
          version_accuracy: a.versionAccuracy
        }
      });
      artCount++;
      if (a.advice.length) {
        await insertFinding(artId, 'TECHNOLOGY_RISK', a.advice.join(' '), `Analysis for ${tech.name}${tech.version ? ' v'+tech.version : ''}. Supply chain score: ${a.supplyChainScore.toFixed(1)}/10.`);
      }
      if (a.supplyChainScore >= CONFIG.SUPPLY_CHAIN_THRESHOLD) supplyFindings++;
    }
    
    // Generate SBOM
    const sbom = generateSBOM(techMap, analysisMap, domain);
    await insertArtifact({
      type: 'sbom_cyclonedx',
      val_text: `Software Bill of Materials (CycloneDX 1.5) - ${techMap.size} components`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        sbom: sbom,
        format: 'CycloneDX',
        version: '1.5'
      }
    });

    // Metrics and summary
    const metrics: ScanMetrics = {
      totalTargets: allTargets.length,
      thirdPartyOrigins: thirdParty.length,
      uniqueTechs: techMap.size,
      supplyFindings,
      runMs: Date.now() - start,
      circuitBreakerTripped: cb.isTripped(),
      cacheHitRate: eolCache.stats().hitRate
    };

    await insertArtifact({
      type: 'techscan_metrics',
      val_text: `Technology scan metrics: ${metrics.uniqueTechs} technologies, ${metrics.supplyFindings} supply chain risks`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        metrics,
        cache_stats: {
          eol: eolCache.stats(),
          osv: osvCache.stats(),
          github: githubCache.stats(),
          epss: epssCache.stats(),
          depsDev: depsDevCache.stats()
        }
      }
    });

    log(`techstack=complete arts=${artCount} time=${Date.now()-start}ms`);
    return artCount;
  } catch (err) {
    await insertArtifact({ 
      type: 'scan_error', 
      val_text: `Technology stack scan failed: ${(err as Error).message}`, 
      severity: 'HIGH', 
      meta: { 
        scan_id: scanId, 
        scan_module: 'techStackScan',
        error: true,
        scan_duration_ms: Date.now() - start
      } 
    });
    return 0;
  }
}

export default runTechStackScan;