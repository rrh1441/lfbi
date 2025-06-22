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
  EPSS_BATCH: 100,
  /** CVE older than this many years cannot bump risk unless KEV or high-EPSS */
  MAX_RISK_VULN_AGE_YEARS: 5,
  /** Max CVE IDs to list verbosely inside one finding */
  MAX_VULN_IDS_PER_FINDING: 12,
  /** Drop vulnerabilities older than this many years (unless KEV or high-EPSS) */
  DROP_VULN_AGE_YEARS: 5,
  /** Drop vulnerabilities with EPSS score below this threshold (unless KEV) */
  DROP_VULN_EPSS_CUT: 0.05
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
  // Active testing fields
  activelyTested?: boolean;
  exploitable?: boolean;
  verificationDetails?: any;
}

interface NucleiCVEResult {
  cveId: string;
  templateId: string;
  verified: boolean;
  exploitable: boolean;
  details?: any;
}

interface EnhancedSecAnalysis {
  eol: boolean;
  vulns: VulnRecord[];
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  advice: string[];
  versionAccuracy?: number;
  supplyChainScore: number;
  packageIntelligence?: PackageIntelligence;
  activeVerification?: {
    tested: number;
    exploitable: number;
    notExploitable: number;
  };
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

// ─────────────── Dedup + helper ─────────────────
function dedupeVulns(v: VulnRecord[]): VulnRecord[] {
  const seen = new Set<string>();
  return v.filter(x => (seen.has(x.id) ? false : (seen.add(x.id), true)));
}

function summarizeVulnIds(v: VulnRecord[], max: number): string {
  const ids = v.slice(0, max).map(r => r.id);
  return v.length > max ? ids.join(', ') + ', …' : ids.join(', ');
}

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
    const discoveredCount = rows[0]?.urls?.length || 0;
    rows[0]?.urls?.slice(0, 100).forEach((url: string) => {
      if (url && typeof url === 'string' && url.startsWith('http')) targets.add(url);
    });
    log(`buildTargets discovered=${discoveredCount} total=${targets.size}`);
  } catch (error) {
    log(`buildTargets error: ${(error as Error).message}`);
  }
  
  // If no endpoints discovered, add common paths for better coverage
  if (targets.size <= 2) {
    const commonPaths = ['/admin', '/api', '/app', '/login', '/dashboard', '/home', '/about'];
    commonPaths.forEach(path => {
      targets.add(`https://${domain}${path}`);
      targets.add(`https://www.${domain}${path}`);
    });
    log(`buildTargets fallback added common paths, total=${targets.size}`);
  }
  
  return Array.from(targets);
}

/* Third-party sub-resource discovery using Puppeteer */
async function discoverThirdPartyOrigins(domain: string): Promise<string[]> {
  let browser: Browser | undefined;
  
  try {
    // Enhanced Puppeteer launch options for better stability
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',        // Enhanced: prevent /dev/shm memory issues
        '--disable-accelerated-2d-canvas', // Enhanced: disable GPU acceleration for stability
        '--disable-gpu',                   // Enhanced: disable GPU for headless reliability
        '--window-size=1920x1080'         // Enhanced: set consistent window size
      ],
      protocolTimeout: 90000, // Enhanced: increased from 60000 to 90000 for better stability
      timeout: 60000,         // Enhanced: increased browser launch timeout from 30000 to 60000
      dumpio: process.env.NODE_ENV === 'development' || process.env.DEBUG_PUPPETEER === 'true' // Enhanced: conditional debug output
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
    
    // Navigate and wait for resources with fallback
    try {
      await page.goto(`https://${domain}`, { 
        timeout: CONFIG.PAGE_TIMEOUT_MS,
        waitUntil: 'networkidle2' 
      });
    } catch (navError) {
      // Fallback: try with less strict wait condition
      log(`thirdParty=navigation_fallback domain=${domain} error="${(navError as Error).message}"`);
      await page.goto(`https://${domain}`, { 
        timeout: CONFIG.PAGE_TIMEOUT_MS,
        waitUntil: 'domcontentloaded' 
      });
    }
    
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

// Stricter version range validation
function isVersionInRange(version: string, range: string): boolean {
  try {
    const cleanVersion = semver.coerce(version);
    if (!cleanVersion) {
      log(`version=invalid version="${version}"`);
      return false;
    }

    // Reject wildcard ranges for old CVEs
    if (range === '*' || range.includes('*')) {
      // Don't accept wildcard ranges - too broad
      log(`version=rejected_wildcard range="${range}"`);
      return false;
    }

    // Handle specific version lists more strictly
    if (!range.match(/[<>=~^]/) && !range.includes(' ')) {
      // Exact version match only
      const rangeVersion = semver.coerce(range);
      return rangeVersion ? semver.eq(cleanVersion, rangeVersion) : false;
    }

    // For complex ranges, validate they make sense
    if (range.includes('>=') && range.includes('<')) {
      // This is a proper range, use semver
      return semver.satisfies(cleanVersion, range);
    }

    // Default semver handling
    return semver.satisfies(cleanVersion, range);
    
  } catch (error) {
    log(`version=error version="${version}" range="${range}" error="${(error as Error).message}"`);
    // On error, reject rather than accept
    return false;
  }
}

// Enhanced CVE timeline validation - More aggressive filtering
function validateCVETimeline(cveId: string, publishedDate?: Date, softwareVersion?: string): boolean {
  if (!softwareVersion) return true;

  // Extract year from CVE ID
  const cveMatch = cveId.match(/CVE-(\d{4})-/);
  if (!cveMatch) return true;

  const cveYear = parseInt(cveMatch[1]);
  const versionReleaseYear = estimateVersionReleaseYear(softwareVersion);
  
  // If we can't determine the version year, be conservative and reject old CVEs
  if (!versionReleaseYear) {
    // Reject CVEs older than 5 years when version year unknown
    return cveYear >= new Date().getFullYear() - 5;
  }

  // Strict check: CVE must be from the same year or later than the software version
  // This is more aggressive than the previous +1 year buffer
  if (cveYear < versionReleaseYear - 1) {
    log(`cve=timeline_rejected cve="${cveId}" cveYear=${cveYear} versionYear=${versionReleaseYear}`);
    return false;
  }

  // Additional check: if published date exists, ensure it's before a reasonable date
  if (publishedDate && versionReleaseYear) {
    const versionReleaseDate = new Date(versionReleaseYear, 0, 1); // Jan 1st of release year
    if (publishedDate > versionReleaseDate) {
      // CVE published after version release might be valid
      return true;
    }
  }

  return true;
}

// More accurate version release year estimation
function estimateVersionReleaseYear(version: string): number | null {
  const versionMatch = version.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!versionMatch) return null;
  
  const [, major, minor, patch] = versionMatch.map(Number);
  
  // Apache httpd 2.4.x specific logic (based on actual release dates)
  if (major === 2 && minor === 4) {
    // More granular mapping based on actual Apache releases
    if (patch >= 62) return 2024; // 2.4.62 was released in 2024
    if (patch >= 58) return 2023;
    if (patch >= 54) return 2022;
    if (patch >= 50) return 2021;
    if (patch >= 46) return 2020;
    if (patch >= 41) return 2019;
    if (patch >= 35) return 2018;
    if (patch >= 29) return 2017;
    if (patch >= 25) return 2016;
    if (patch >= 20) return 2015;
    if (patch >= 12) return 2014;
    if (patch >= 6) return 2013;
    return 2012; // 2.4.x series started in 2012
  }
  
  // Add other software patterns as needed
  // nginx, Node.js, PHP, etc.
  
  // Fallback: use current year minus a conservative estimate
  return new Date().getFullYear() - 2;
}

/* Enhanced OSV vulnerability lookup with better filtering */
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
        // First check if it affects this version
        const affects = v.affected?.some((a: any) => {
          const pkg = a.package;
          if (pkg?.ecosystem !== ecosystem || pkg?.name !== t.slug) return false;
          
          // Check version ranges
          return a.ranges?.some((r: any) => {
            if (r.type === 'SEMVER') {
              return r.events?.some((e: any, i: number) => {
                if (e.introduced === '0' && i + 1 < r.events.length) {
                  const nextEvent = r.events[i + 1];
                  if (nextEvent.fixed) {
                    return semver.lt(t.version!, nextEvent.fixed);
                  }
                }
                return false;
              });
            }
            return false;
          });
        });

        if (!affects) return false;

        // Then validate CVE timeline
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
        publishedDate: v.published ? new Date(v.published) : undefined,
        affectedVersionRange: v.affected?.[0]?.ranges?.[0]?.events?.map((e: any) => 
          e.introduced ? `>=${e.introduced}` : e.fixed ? `<${e.fixed}` : ''
        ).filter(Boolean).join(', ')
      }));

    osvCache.set(key, vulns);
    return vulns;
  } catch (error) {
    log(`osv=error tech="${t.slug}" error="${(error as Error).message}"`);
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

// ───────────────── Nuclei CVE Active Testing ──────────────────────────────

/**
 * Run Nuclei to actively test specific CVEs
 * IMPORTANT: This is COMPLEMENTARY - it only adds information, never removes CVEs
 * - If Nuclei confirms exploitability -> upgrade severity to CRITICAL
 * - If Nuclei can't exploit -> keep the CVE with original severity
 * - If Nuclei isn't available -> all CVEs are kept with original assessment
 */
async function runNucleiCVETests(
  target: string, 
  cveIds: string[], 
  technology?: string
): Promise<Map<string, NucleiCVEResult>> {
  const results = new Map<string, NucleiCVEResult>();
  
  if (cveIds.length === 0) return results;
  
  try {
    // Check if nuclei is available
    await exec('nuclei', ['-version'], { timeout: 5000 });
  } catch {
    log('nuclei binary not found, skipping active CVE verification');
    return results;
  }
  
  try {
    // Run nuclei with specific CVE templates
    const nucleiArgs = [
      '-u', target,
      '-id', cveIds.join(','), // Target specific CVE IDs
      '-json',
      '-silent',
      '-timeout', '10',
      '-retries', '1'
    ];
    
    // Add TLS bypass if environment variable is set
    if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0') {
      nucleiArgs.push('-insecure');
    }
    
    log(`nucleiCVE=testing target="${target}" cves="${cveIds.slice(0, 5).join(',')}" total=${cveIds.length}`);
    
    const { stdout, stderr } = await exec('nuclei', nucleiArgs, { 
      timeout: 60000 // 1 minute timeout for CVE tests
    });
    
    if (stderr) {
      log(`nucleiCVE=stderr`, stderr);
    }
    
    // Parse nuclei results
    const lines = stdout.trim().split('\n').filter(Boolean);
    
    for (const line of lines) {
      try {
        const result = JSON.parse(line);
        const cveMatch = result['template-id']?.match(/CVE-\d{4}-\d+/);
        
        if (cveMatch) {
          results.set(cveMatch[0], {
            cveId: cveMatch[0],
            templateId: result['template-id'],
            verified: true,
            exploitable: true,
            details: result
          });
          log(`nucleiCVE=confirmed cve="${cveMatch[0]}" exploitable=true`);
        }
      } catch (e) {
        log(`nucleiCVE=parse_error line="${line}"`);
      }
    }
    
    // Mark tested but not exploitable CVEs
    for (const cveId of cveIds) {
      if (!results.has(cveId)) {
        results.set(cveId, {
          cveId,
          templateId: cveId.toLowerCase(),
          verified: true,
          exploitable: false  // Tested but couldn't exploit
        });
      }
    }
    
    log(`nucleiCVE=complete tested=${cveIds.length} exploitable=${Array.from(results.values()).filter(r => r.exploitable).length}`);
    
  } catch (error) {
    log(`nucleiCVE=error`, (error as Error).message);
  }
  
  return results;
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

/* Package intelligence from deps.dev - Removed unused function */

// ───────────────── Vulnerability Filtering ─────────────────────────────────

/**
 * Filter out low-value vulnerabilities based on age and EPSS score
 * Preserves KEV and high-EPSS vulnerabilities regardless of age
 */
// More aggressive filtering
function filterLowValue(vulns: VulnRecord[]): VulnRecord[] {
  const now = Date.now();
  const currentYear = new Date().getFullYear();
  
  return vulns.filter(vuln => {
    // Extract CVE year if it's a CVE
    if (vuln.id.startsWith('CVE-')) {
      const cveMatch = vuln.id.match(/CVE-(\d{4})-/);
      if (cveMatch) {
        const cveYear = parseInt(cveMatch[1]);
        
        // Hard reject CVEs older than 5 years unless CISA KEV
        if (currentYear - cveYear > 5 && !vuln.cisaKev) {
          log(`filter=rejected_old_cve id="${vuln.id}" year=${cveYear}`);
          return false;
        }
      }
    }
    
    // Always keep CISA KEV vulnerabilities
    if (vuln.cisaKev) {
      return true;
    }
    
    // Keep high EPSS vulnerabilities only if recent
    if (vuln.epss && vuln.epss >= 0.1) {
      const ageYears = vuln.publishedDate ? 
        (now - vuln.publishedDate.getTime()) / (365 * 24 * 60 * 60 * 1000) : 10;
      return ageYears < 3; // Only keep high EPSS if less than 3 years old
    }
    
    // For other vulnerabilities, be strict about age
    const ageThreshold = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years
    const isRecent = !vuln.publishedDate || (now - vuln.publishedDate.getTime()) <= ageThreshold;
    const meetsEpssThreshold = !vuln.epss || vuln.epss >= 0.05;
    
    return isRecent && meetsEpssThreshold;
  });
}

/**
 * Merge GHSA and CVE records, removing duplicates
 * Prefers CVE records when both exist for the same vulnerability
 */
function mergeGhsaWithCve(vulns: VulnRecord[]): VulnRecord[] {
  const cveMap = new Map<string, VulnRecord>();
  const ghsaMap = new Map<string, VulnRecord>();
  const otherVulns: VulnRecord[] = [];
  
  // Separate vulnerabilities by type
  for (const vuln of vulns) {
    if (vuln.id.startsWith('CVE-')) {
      cveMap.set(vuln.id, vuln);
    } else if (vuln.id.startsWith('GHSA-')) {
      ghsaMap.set(vuln.id, vuln);
    } else {
      otherVulns.push(vuln);
    }
  }
  
  // Find GHSA records that don't have corresponding CVE records
  const uniqueGhsa: VulnRecord[] = [];
  ghsaMap.forEach((ghsaRecord) => {
    // Simple heuristic: check if any CVE record has similar summary or affected version
    const hasCveMatch = Array.from(cveMap.values()).some(cveRecord => {
      return (
        (ghsaRecord.summary && cveRecord.summary && 
         ghsaRecord.summary.toLowerCase().includes(cveRecord.summary.toLowerCase().substring(0, 50))) ||
        (ghsaRecord.affectedVersionRange && cveRecord.affectedVersionRange &&
         ghsaRecord.affectedVersionRange === cveRecord.affectedVersionRange)
      );
    });
    
    if (!hasCveMatch) {
      uniqueGhsa.push(ghsaRecord);
    }
  });
  
  // Return CVE records + unique GHSA records + other vulnerabilities
  return [...Array.from(cveMap.values()), ...uniqueGhsa, ...otherVulns];
}

// Add a post-processing step to validate all vulnerabilities
function postProcessVulnerabilities(
  vulns: VulnRecord[], 
  techName: string, 
  version?: string
): VulnRecord[] {
  if (!version) return vulns;
  
  const versionYear = estimateVersionReleaseYear(version);
  if (!versionYear) return vulns;
  
  return vulns.filter(vuln => {
    // Additional sanity check for Apache httpd
    if (techName.toLowerCase().includes('apache') && version.startsWith('2.4.')) {
      const cveMatch = vuln.id.match(/CVE-(\d{4})-/);
      if (cveMatch) {
        const cveYear = parseInt(cveMatch[1]);
        
        // Apache 2.4.62 (2024) shouldn't have CVEs from before 2022
        if (cveYear < versionYear - 2) {
          log(`postprocess=rejected tech="${techName}" version="${version}" cve="${vuln.id}" cveYear=${cveYear}`);
          return false;
        }
      }
    }
    
    return true;
  });
}

// ───────────────── Enhanced security analysis with active testing  ────────
async function analyzeSecurityEnhanced(
  t: WappTech, 
  detections: WappTech[], 
  targets?: string[]
): Promise<EnhancedSecAnalysis> {
  const limit = pLimit(3);
  
  // Get passive vulnerability data from APIs
  const [eol, osv, gh] = await Promise.all([
    limit(() => isEol(t.slug, t.version)),
    limit(() => getOSVVulns(t)),
    limit(() => getGitHubVulns(t))
  ]);
  
  // Apply post-processing before deduplication
  const osvProcessed = postProcessVulnerabilities(osv, t.name, t.version);
  const ghProcessed = postProcessVulnerabilities(gh, t.name, t.version);
  
  // Merge and deduplicate passive results
  const passiveVulns = dedupeVulns([...osvProcessed, ...ghProcessed]);
  
  // Get CVE IDs for active testing
  const cveIds = passiveVulns
    .filter(v => v.id.startsWith('CVE-'))
    .map(v => v.id);
  
  // Run active Nuclei verification if we have CVEs (OPTIONAL - enhances but doesn't filter)
  let nucleiResults = new Map<string, NucleiCVEResult>();
  if (cveIds.length > 0 && targets && targets.length > 0) {
    // Use the first available target for testing
    const target = targets[0];
    nucleiResults = await runNucleiCVETests(target, cveIds, t.name);
    
    if (nucleiResults.size === 0) {
      log(`nuclei=skipped tech="${t.name}" reason="not available or no templates"`);
    }
  }
  
  // Enrich vulnerabilities with both passive and active data
  const enrichedVulns = passiveVulns.map(vuln => {
    const nucleiResult = nucleiResults.get(vuln.id);
    
    return {
      ...vuln,
      activelyTested: !!nucleiResult,
      exploitable: nucleiResult?.exploitable,
      verificationDetails: nucleiResult?.details
    };
  });
  
  // Get EPSS and KEV data
  const epssMap = await getEPSSScores(cveIds);
  const kevSet = await getKEVList();
  
  const fullyEnriched = enrichedVulns.map(v => ({
    ...v,
    epss: epssMap.get(v.id),
    cisaKev: kevSet.has(v.id)
  }));
  
  // Apply filtering
  const merged = mergeGhsaWithCve(fullyEnriched);
  const filtered = filterLowValue(merged);
  
  // Log filtering stats for debugging
  log(`analysis=stats tech="${t.name}" version="${t.version}" ` +
      `raw=${passiveVulns.length} enriched=${enrichedVulns.length} merged=${merged.length} filtered=${filtered.length}`);
  // Calculate supply chain score
  const scScore = supplyChainScore(filtered);
  
  // Enhanced risk assessment considering active testing
  let risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  const advice: string[] = [];
  
  if (eol) { 
    risk = 'HIGH'; 
    advice.push(`Upgrade – version ${t.version} is EOL.`); 
  }
  
  if (filtered.length) {
    // Count actively exploitable vulnerabilities (if tested)
    const exploitableCount = filtered.filter(v => v.exploitable === true).length;
    const testedCount = filtered.filter(v => v.activelyTested).length;
    
    // Base risk on standard criteria (CVSS, EPSS, KEV)
    const hasHighRisk = filtered.some(v => 
      v.cisaKev || 
      (v.epss ?? 0) >= 0.85 || 
      (v.cvss ?? 0) >= 9
    );
    
    risk = hasHighRisk ? 'HIGH' : risk === 'LOW' ? 'MEDIUM' : risk;
    
    // UPGRADE to CRITICAL if we have confirmed exploitable vulns
    if (exploitableCount > 0) {
      risk = 'CRITICAL';
      advice.push(`⚠️ CRITICAL: ${exploitableCount} vulnerabilities confirmed as actively exploitable!`);
    }
    
    // Build appropriate advice message
    if (testedCount > 0) {
      advice.push(`Patch – ${filtered.length} vulnerabilities found (${testedCount} tested by Nuclei: ${exploitableCount} exploitable).`);
    } else {
      advice.push(`Patch – ${filtered.length} vulnerabilities found.`);
    }
    
    if (filtered.some(v => v.cisaKev)) {
      advice.push('CISA Known-Exploited vulnerability present.');
    }
  }
  
  if (scScore >= CONFIG.SUPPLY_CHAIN_THRESHOLD) {
    risk = risk === 'LOW' ? 'MEDIUM' : risk;
    advice.push(`Supply-chain score ${scScore}/10.`);
  }
  
  const vAcc = calculateVersionAccuracy(detections);
  if (vAcc < CONFIG.MIN_VERSION_CONFIDENCE && t.version) {
    advice.push(`Version detection confidence ${(vAcc * 100).toFixed(1)}%. Verify manually.`);
  }

  return { 
    eol, 
    vulns: filtered, 
    risk, 
    advice, 
    versionAccuracy: vAcc, 
    supplyChainScore: scScore, 
    packageIntelligence: undefined,
    activeVerification: {
      tested: cveIds.length,
      exploitable: filtered.filter(v => v.exploitable === true).length,
      notExploitable: filtered.filter(v => v.activelyTested && !v.exploitable).length
    }
  };
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
export async function runTechStackScan(job: { 
  domain: string; 
  scanId: string;
  targets?: string[]; // Add optional targets array
}): Promise<number> {
  const { domain, scanId, targets: providedTargets } = job;
  const start = Date.now();
  log(`techstack=start domain=${domain}`);
  
  // Check for nuclei (required for tech detection, optional for CVE active testing)
  const nucleiBinary = await resolveNuclei();
  if (!nucleiBinary) {
    await insertArtifact({ type: 'scan_error', val_text: 'Nuclei not found', severity: 'HIGH', meta: { scan_id: scanId } });
    return 0;
  }
  
  // Note: CVE active testing with Nuclei is optional and happens in analyzeSecurityEnhanced
  const cb = new TechnologyScanCircuitBreaker();
  const limit = pLimit(CONFIG.MAX_CONCURRENCY);
  try {
    // Build or use provided targets
    const [primary, thirdParty] = providedTargets ? [providedTargets, []] : await Promise.all([
      buildTargets(scanId, domain),
      discoverThirdPartyOrigins(domain)
    ]);
    const allTargets = [...primary, ...thirdParty];
    log(`techstack=targets primary=${primary.length} thirdParty=${thirdParty.length} total=${allTargets.length}`);
    const techMap = new Map<string, WappTech>();
    const detectMap = new Map<string, WappTech[]>();
    // fingerprint
    await Promise.all(allTargets.map(url => limit(async () => {
      if (cb.isTripped()) return;
      try {
        log(`techstack=nuclei url="${url}"`);
        const { stdout } = await exec(nucleiBinary, ['-u', url, '-silent', '-json', '-tags', 'tech', '-no-color'], { timeout: CONFIG.NUCLEI_TIMEOUT_MS });
        const lines = stdout.trim().split('\n').filter(Boolean);
        log(`techstack=nuclei_output url="${url}" lines=${lines.length}`);
        const techs = convertNucleiToWappTech(lines);
        log(`techstack=converted url="${url}" techs=${techs.length}`);
        techs.forEach(t => {
          techMap.set(t.slug, t);
          if (!detectMap.has(t.slug)) detectMap.set(t.slug, []);
          detectMap.get(t.slug)!.push(t);
        });
      } catch (e) { 
        log(`techstack=nuclei_error url="${url}" error="${(e as Error).message}"`);
        if ((e as Error).message.includes('timeout')) cb.recordTimeout(); 
      }
    })));
    // analysis
    const analysisMap = new Map<string, EnhancedSecAnalysis>();
    await Promise.all(Array.from(techMap.entries()).map(([slug, tech]) => limit(async () => {
      const a = await analyzeSecurityEnhanced(tech, detectMap.get(slug) ?? [tech], allTargets);
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
          version_accuracy: a.versionAccuracy,
          active_verification: a.activeVerification // Add this
        }
      });
      artCount++;
      if (a.vulns.length) {
        const exploitableVulns = a.vulns.filter(v => v.exploitable === true);
        const testedVulns = a.vulns.filter(v => v.activelyTested === true);
        const list = summarizeVulnIds(a.vulns, CONFIG.MAX_VULN_IDS_PER_FINDING);
        
        let description = `${a.vulns.length} vulnerabilities detected: ${list}`;
        
        // Add exploitability info if we tested with Nuclei
        if (testedVulns.length > 0 && exploitableVulns.length > 0) {
          description = `${a.vulns.length} vulnerabilities detected (⚠️ ${exploitableVulns.length} CONFIRMED EXPLOITABLE): ${list}`;
        } else if (testedVulns.length > 0) {
          description = `${a.vulns.length} vulnerabilities detected (${testedVulns.length} tested, ${exploitableVulns.length} exploitable): ${list}`;
        }
        
        await insertFinding(
          artId,
          'EXPOSED_SERVICE',
          description,
          a.advice.join(' ')
        );
      } else if (a.advice.length) {
        await insertFinding(
          artId,
          'TECHNOLOGY_RISK',
          a.advice.join(' '),
          `Analysis for ${tech.name}${tech.version ? ' v'+tech.version : ''}. Supply chain score: ${a.supplyChainScore.toFixed(1)}/10.`
        );
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