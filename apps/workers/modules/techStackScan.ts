/* =============================================================================
 * MODULE: techStackScan.ts (Enhanced v3 - Modern Intelligence Pipeline)
 * =============================================================================
 * Technology fingerprinting with modern vulnerability intelligence, SBOM generation,
 * and supply-chain risk scoring. Enhanced performance and reliability.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import axios from 'axios';
import pLimit from 'p-limit';
import puppeteer, { Browser } from 'puppeteer';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';

const exec = promisify(execFile);

// ───────────────── Enhanced Configuration ─────────────────────────────────
const CONFIG = {
  MAX_CONCURRENCY: 6,              // Enhanced concurrency with p-limit
  WAPP_TIMEOUT_MS: 10_000,
  API_TIMEOUT_MS: 15_000,
  MIN_VERSION_CONFIDENCE: 0.6,     // Dynamic threshold (60%)
  WAPP_CIRCUIT_BREAKER: 20,        // Stop after 20 timeouts
  THIRD_PARTY_TIMEOUT: 25_000,     // 25s crawl timeout
  MAX_THIRD_PARTY_REQUESTS: 200,   // Throttle sub-resource discovery
  CACHE_TTL_MS: 24 * 60 * 60 * 1000, // 24h cache TTL
  GITHUB_BATCH_SIZE: 25,           // Max packages per GraphQL query
  GITHUB_BATCH_DELAY: 1000,        // 1s between batches
  SUPPLY_CHAIN_THRESHOLD: 7.0      // Flag components with score ≥ 7
};

// Removed VERBOSE constant - debug logging handled by structured log format

// ───────────────── Enhanced Types ─────────────────────────────────────────
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

// ───────────────── Enhanced Caching Layer ─────────────────────────────────
class IntelligentCache {
  private cache = new Map<string, { data: any; timestamp: number; hits: number }>();
  private totalRequests = 0;
  private cacheHits = 0;

  get(key: string): any | null {
    this.totalRequests++;
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check TTL
    if (Date.now() - entry.timestamp > CONFIG.CACHE_TTL_MS) {
      this.cache.delete(key);
      return null;
    }
    
    entry.hits++;
    this.cacheHits++;
    return entry.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 0
    });
  }

  getHitRate(): number {
    return this.totalRequests > 0 ? this.cacheHits / this.totalRequests : 0;
  }

  getStats() {
    return {
      size: this.cache.size,
      hitRate: this.getHitRate(),
      totalRequests: this.totalRequests,
      cacheHits: this.cacheHits
    };
  }
}

// Global cache instances
const eolCache = new IntelligentCache();
const osvCache = new IntelligentCache();
const githubCache = new IntelligentCache();
const epssCache = new IntelligentCache();
const cisaKevCache = new IntelligentCache();
const depsDevCache = new IntelligentCache();

// ───────────────── Circuit Breaker for Wappalyzer ────────────────────────
class WappalyzerCircuitBreaker {
  private timeouts = 0;
  private tripped = false;

  recordTimeout(): void {
    this.timeouts++;
    if (this.timeouts >= CONFIG.WAPP_CIRCUIT_BREAKER && !this.tripped) {
      this.tripped = true;
      log(`circuitBreaker=tripped timeouts=${this.timeouts}`);
    }
  }

  isTripped(): boolean {
    return this.tripped;
  }

  getTimeouts(): number {
    return this.timeouts;
  }
}

// ───────────────── Utility Functions ──────────────────────────────────────
const log = (...m: unknown[]) => rootLog('[techStackScan]', ...m);

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

/* Resolve Wappalyzer binary */
async function resolveWappalyzer(): Promise<string | null> {
  const candidates = [
    { bin: 'wappalyzer', args: ['--version'] },
    { bin: 'npx', args: ['@wappalyzer/cli', '--version'] },
    { bin: 'npx', args: ['-y', '@wappalyzer/cli', '--version'] },
    { bin: 'npx', args: ['-y', 'wappalyzer', '--version'] }
  ];
  
  for (const candidate of candidates) {
    try {
      await exec(candidate.bin, candidate.args, { timeout: 5_000 });
      return candidate.bin;
    } catch {
      // Try next candidate
    }
  }
  return null;
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
      timeout: CONFIG.THIRD_PARTY_TIMEOUT,
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

    const vulns: VulnRecord[] = (data.vulns || []).map((v: any) => ({
      id: v.id,
      source: 'OSV' as const,
      cvss: v.database_specific?.cvss_score || extractCVSSFromSeverity(v.severity),
      summary: v.summary
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
      .filter((node: any) => isVersionInRange(t.version!, node.vulnerableVersionRange))
      .map((node: any) => ({
        id: node.advisory.ghsaId,
        source: 'GITHUB' as const,
        cvss: node.advisory.cvss?.score,
        summary: node.advisory.summary
      }));

    githubCache.set(key, vulns);
    return vulns;
  } catch {
    githubCache.set(key, []);
    return [];
  }
}

/* EPSS score lookup */
async function getEPSSScore(cveId: string): Promise<number | undefined> {
  const key = `epss:${cveId}`;
  const cached = epssCache.get(key);
  if (cached !== null) return cached;

  try {
    const { data } = await axios.get(`https://api.first.org/data/v1/epss?cve=${cveId}`, {
      timeout: CONFIG.API_TIMEOUT_MS
    });

    const score = data.data?.[0]?.epss;
    epssCache.set(key, score);
    return score;
  } catch {
    epssCache.set(key, undefined);
    return undefined;
  }
}

/* CISA KEV lookup */
async function isCISAKnownExploited(cveId: string): Promise<boolean> {
  const key = `cisa:${cveId}`;
  const cached = cisaKevCache.get(key);
  if (cached !== null) return cached;

  try {
    const { data } = await axios.get(
      'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json',
      { timeout: CONFIG.API_TIMEOUT_MS }
    );

    const isKEV = data.vulnerabilities?.some((vuln: any) => vuln.cveID === cveId) || false;
    cisaKevCache.set(key, isKEV);
    return isKEV;
  } catch {
    cisaKevCache.set(key, false);
    return false;
  }
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

function isVersionInRange(version: string, range: string): boolean {
  // Simplified version range checking - in production, use semver library
  return range.includes(version) || range.includes('*') || range.includes('<');
}

function assessLicenseRisk(license?: string): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (!license) return 'MEDIUM';
  
  const high = ['GPL-3.0', 'GPL-2.0', 'AGPL-3.0', 'LGPL-3.0'];
  const medium = ['LGPL-2.1', 'MPL-2.0', 'EPL-2.0'];
  
  if (high.some(l => license.includes(l))) return 'HIGH';
  if (medium.some(l => license.includes(l))) return 'MEDIUM';
  return 'LOW';
}

/* Enhanced security analysis with supply chain scoring */
async function analyzeSecurityEnhanced(t: WappTech, detections: WappTech[]): Promise<EnhancedSecAnalysis> {
  const limit = pLimit(3); // Limit concurrent API calls
  
  const [eol, osvVulns, githubVulns] = await Promise.all([
    limit(() => isEol(t.slug, t.version)),
    limit(() => getOSVVulns(t)),
    limit(() => getGitHubVulns(t))
  ]);

  // Combine vulnerabilities and enhance with EPSS/KEV data
  const allVulns = [...osvVulns, ...githubVulns];
  const enhancedVulns = await Promise.all(
    allVulns.map(async (vuln) => {
      const [epss, cisaKev] = await Promise.all([
        vuln.id.startsWith('CVE-') ? getEPSSScore(vuln.id) : Promise.resolve(undefined),
        vuln.id.startsWith('CVE-') ? isCISAKnownExploited(vuln.id) : Promise.resolve(false)
      ]);
      
      return { ...vuln, epss, cisaKev };
    })
  );

  // Calculate supply chain score
  const maxCVSS = Math.max(...enhancedVulns.map(v => v.cvss || 0), 0);
  const maxEPSS = Math.max(...enhancedVulns.map(v => v.epss || 0), 0);
  const hasKEV = enhancedVulns.some(v => v.cisaKev);
  
  const supplyChainScore = 0.4 * maxCVSS + 0.4 * (maxEPSS * 10) + 0.2 * (hasKEV ? 10 : 0);

  // Risk assessment
  let risk: EnhancedSecAnalysis['risk'] = 'LOW';
  const advice: string[] = [];

  if (eol) {
    risk = 'HIGH';
    advice.push(`Upgrade – version ${t.version} is EOL.`);
  }

  if (enhancedVulns.length > 0) {
    risk = risk === 'HIGH' ? 'CRITICAL' : 'HIGH';
    advice.push(`Patch – ${enhancedVulns.length} vulnerabilities found.`);
    
    if (hasKEV) {
      advice.push('CRITICAL: CISA Known Exploited Vulnerability detected.');
    }
  }

  if (supplyChainScore >= CONFIG.SUPPLY_CHAIN_THRESHOLD) {
    risk = risk === 'LOW' ? 'MEDIUM' : risk;
    advice.push(`Supply chain risk score: ${supplyChainScore.toFixed(1)}/10.`);
  }

  // Version accuracy warning
  const versionAccuracy = calculateVersionAccuracy(detections);
  if (versionAccuracy < CONFIG.MIN_VERSION_CONFIDENCE && t.version) {
    advice.push(`Version detection confidence low (${(versionAccuracy * 100).toFixed(1)}%) – verify manually.`);
  }

  // Get package intelligence
  const ecosystem = detectEcosystem(t);
  const packageIntelligence = ecosystem ? await getPackageIntelligence(ecosystem, t.slug) : undefined;

  return {
    eol,
    vulns: enhancedVulns,
    risk,
    advice,
    versionAccuracy,
    supplyChainScore,
    packageIntelligence
  };
}

/* Generate CycloneDX 1.5 SBOM */
function generateSBOM(
  technologies: Map<string, WappTech>, 
  analyses: Map<string, EnhancedSecAnalysis>,
  domain: string
): any {
  const components: CycloneDXComponent[] = [];
  
  for (const [slug, tech] of technologies) {
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
        version: '3.0'
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

// ───────────────── Main Export Function ───────────────────────────────────
export async function runTechStackScan(job: { domain: string; scanId: string }): Promise<number> {
  const { domain, scanId } = job;
  const startTime = Date.now();
  
  log(`techstack=start domain="${domain}"`);

  // Check Wappalyzer binary
  const wappBinary = await resolveWappalyzer();
  if (!wappBinary) {
    await insertArtifact({
      type: 'scan_error',
      val_text: 'Wappalyzer binary not found',
      severity: 'HIGH',
      meta: { scan_id: scanId, scan_module: 'techStackScan' }
    });
    return 0;
  }

  const circuitBreaker = new WappalyzerCircuitBreaker();
  const limit = pLimit(CONFIG.MAX_CONCURRENCY);
  
  try {
    // Build targets including third-party discovery
    const [primaryTargets, thirdPartyOrigins] = await Promise.all([
      buildTargets(scanId, domain),
      discoverThirdPartyOrigins(domain)
    ]);
    
    const allTargets = [...primaryTargets, ...thirdPartyOrigins];
    log(`techstack=targets primary=${primaryTargets.length} thirdParty=${thirdPartyOrigins.length} total=${allTargets.length}`);

    // Technology fingerprinting with enhanced concurrency control
    const techMap = new Map<string, WappTech>();
    const detectionMap = new Map<string, WappTech[]>(); // Track multiple detections per tech
    
    const fingerprintPromises = allTargets.map(url => 
      limit(async () => {
        if (circuitBreaker.isTripped()) {
          log(`techstack=skipped url="${url}" reason="circuit_breaker"`);
          return [];
        }

        try {
          let args: string[];
          if (wappBinary === 'npx') {
            // Try to determine which npx command worked during resolution
            args = ['-y', '@wappalyzer/cli', url, '--json'];
          } else {
            args = [url, '--quiet', '--json'];
          }
          
          const { stdout } = await exec(wappBinary, args, { timeout: CONFIG.WAPP_TIMEOUT_MS });
          const technologies = (JSON.parse(stdout).technologies || []) as WappTech[];
          
          log(`techstack=fingerprint url="${url}" technologies=${technologies.length}`);
          return technologies;
        } catch (error) {
          if ((error as Error).message.includes('timeout')) {
            circuitBreaker.recordTimeout();
          }
          log(`techstack=error url="${url}" error="${(error as Error).message}"`);
          return [];
        }
      })
    );

    const results = await Promise.allSettled(fingerprintPromises);
    
    // Process fingerprinting results
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        result.value.forEach(tech => {
          techMap.set(tech.slug, tech);
          
          // Track multiple detections for accuracy calculation
          if (!detectionMap.has(tech.slug)) {
            detectionMap.set(tech.slug, []);
          }
          detectionMap.get(tech.slug)!.push(tech);
        });
      }
    });

    log(`techstack=analysis technologies=${techMap.size} circuitBreaker=${circuitBreaker.isTripped()}`);

    // Enhanced security analysis with parallelization
    const analysisMap = new Map<string, EnhancedSecAnalysis>();
    const analysisPromises = Array.from(techMap.entries()).map(([slug, tech]) =>
      limit(async () => {
        const detections = detectionMap.get(slug) || [tech];
        const analysis = await analyzeSecurityEnhanced(tech, detections);
        analysisMap.set(slug, analysis);
        return { slug, tech, analysis };
      })
    );

    const analysisResults = await Promise.allSettled(analysisPromises);
    
    // Create artifacts and findings
    let artifactCount = 0;
    let supplyFindings = 0;
    
    for (const result of analysisResults) {
      if (result.status === 'fulfilled') {
        const { tech, analysis } = result.value;
        
        const severity = analysis.risk === 'LOW' ? 'INFO' : analysis.risk;
        const versionText = tech.version ? ` v${tech.version}` : '';
        const confidenceText = analysis.versionAccuracy && analysis.versionAccuracy < CONFIG.MIN_VERSION_CONFIDENCE 
          ? ' (low confidence)' : '';

        const artifactId = await insertArtifact({
          type: 'technology',
          val_text: `${tech.name}${versionText}${confidenceText}`,
          severity,
          meta: {
            scan_id: scanId,
            scan_module: 'techStackScan',
            technology: tech,
            security: analysis,
            ecosystem: detectEcosystem(tech),
            supply_chain_score: analysis.supplyChainScore,
            version_accuracy: analysis.versionAccuracy
          }
        });
        
        artifactCount++;

        // Create findings for significant issues
        if (analysis.advice.length > 0) {
          await insertFinding(
            artifactId,
            'TECHNOLOGY_RISK',
            analysis.advice.join(' '),
            `Security analysis for ${tech.name}${versionText}. Supply chain score: ${analysis.supplyChainScore.toFixed(1)}/10.`
          );
        }

        // Flag high supply chain risk
        if (analysis.supplyChainScore >= CONFIG.SUPPLY_CHAIN_THRESHOLD) {
          supplyFindings++;
        }
      }
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
      thirdPartyOrigins: thirdPartyOrigins.length,
      uniqueTechs: techMap.size,
      supplyFindings,
      runMs: Date.now() - startTime,
      circuitBreakerTripped: circuitBreaker.isTripped(),
      cacheHitRate: eolCache.getHitRate()
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
          eol: eolCache.getStats(),
          osv: osvCache.getStats(),
          github: githubCache.getStats(),
          epss: epssCache.getStats(),
          cisaKev: cisaKevCache.getStats(),
          depsDev: depsDevCache.getStats()
        }
      }
    });

    // Nuclei tags for downstream scanning
    if (techMap.size > 0) {
      const ecosystemStats = new Map<string, number>();
      techMap.forEach((tech: WappTech) => {
        const ecosystem = detectEcosystem(tech);
        if (ecosystem) {
          ecosystemStats.set(ecosystem, (ecosystemStats.get(ecosystem) || 0) + 1);
        }
      });

      await insertArtifact({
        type: 'tech_tags_for_nuclei',
        val_text: `Detected technologies: ${Array.from(techMap.keys()).join(', ')}`,
        severity: 'INFO',
        meta: {
          scan_id: scanId,
          tags: Array.from(techMap.keys()),
          ecosystem_breakdown: Object.fromEntries(ecosystemStats),
          supply_chain_risks: supplyFindings
        }
      });
    }

    log(`techstack=complete artifacts=${artifactCount} supplyFindings=${supplyFindings} duration=${metrics.runMs}ms cacheHitRate=${(metrics.cacheHitRate * 100).toFixed(1)}%`);
    return artifactCount;

  } catch (error) {
    const errorMsg = (error as Error).message;
    log(`techstack=error error="${errorMsg}"`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `Technology stack scan failed: ${errorMsg}`,
      severity: 'HIGH',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        error: true,
        scan_duration_ms: Date.now() - startTime
      }
    });
    
    return 0;
  }
}

export default runTechStackScan;