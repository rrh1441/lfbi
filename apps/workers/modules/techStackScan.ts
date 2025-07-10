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
import semver from 'semver';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';
import { withPage } from '../util/dynamicBrowser.js';
import { runNuclei as runNucleiWrapper, scanUrl, scanUrlEnhanced, runTwoPassScan, BASELINE_TAGS, COMMON_VULN_TAGS, filterWebVulnUrls, isNonHtmlAsset } from '../util/nucleiWrapper.js';
import { 
  createTechDetection, 
  DEFAULT_TECH_CONFIG, 
  type WappTech,
  detectEcosystem,
  calculateVersionAccuracy,
  classifyTargetAssetType
} from './techDetection/index.js';
import { normalizeTechnology, batchNormalizeTechnologies, deduplicateComponents, type NormalizedComponent } from '../util/cpeNormalization.js';
import { findVulnerabilitiesForComponent, batchVulnerabilityAnalysis, type ComponentVulnerabilityReport } from '../util/versionMatcher.js';
import { batchFindOSVVulnerabilities, mergeVulnerabilityResults } from '../util/osvIntegration.js';
import { createSBOMGenerator } from './sbomGenerator/index.js';
import { batchDetectFavicons } from '../util/faviconDetection.js';
import { UnifiedCache } from './techCache/index.js';
import { createTechStackConfig } from './techStackConfig.js';
import type { CacheKey } from './techCache/index.js';

const exec = promisify(execFile);

// ───────────────── Configuration ────────────────────────────────────────────
const CONFIG = {
  MAX_CONCURRENCY: 6,
  NUCLEI_TIMEOUT_MS: 30_000,  // Increased from 10s to 30s for tech detection
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
// Enhanced target with asset type classification for performance optimization
interface ClassifiedTarget {
  url: string;
  assetType: 'html' | 'nonHtml';
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

// CycloneDXComponent interface moved to sbomGenerator module

interface ScanMetrics {
  totalTargets: number;
  thirdPartyOrigins: number;
  uniqueTechs: number;
  supplyFindings: number;
  runMs: number;
  circuitBreakerTripped: boolean;
  cacheHitRate: number;
  dynamic_browser_skipped?: boolean;
}

// ───────────────── Unified Cache System ────────────────────────────────────
// Initialize configuration and unified cache
const techConfig = createTechStackConfig();
const unifiedCache = new UnifiedCache({
  maxEntries: 10_000,
  maxMemoryMB: techConfig.cacheMaxMemoryMB,
  defaultTtlMs: techConfig.cacheTtlMs,
});

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

// Circuit breaker now handled by techDetection module

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

/* Filter out problematic domains that cause nuclei issues */
function isProblematicDomain(hostname: string): boolean {
  const problematicDomains = [
    // CDNs and large platforms that nuclei struggles with
    'google.com', 'www.google.com', 'gstatic.com', 'www.gstatic.com',
    'googleapis.com', 'fonts.googleapis.com', 'fonts.gstatic.com',
    'facebook.com', 'amazon.com', 'microsoft.com', 'apple.com',
    'cloudflare.com', 'amazonaws.com', 'azure.com',
    // Content delivery networks
    'cdn.', 'cdnjs.', 'jsdelivr.', 'unpkg.com',
    'contentful.com', 'ctfassets.net'
  ];
  
  return problematicDomains.some(domain => 
    hostname === domain || hostname.endsWith('.' + domain) || hostname.startsWith(domain)
  );
}

/* Convert Nuclei technology detection output to WappTech format */
function convertNucleiToWappTech(nucleiResults: any[]): WappTech[] {
  const technologies: WappTech[] = [];
  
  for (const result of nucleiResults) {
    try {
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
      // Skip malformed results
      continue;
    }
  }
  
  return technologies;
}



// Technology detection functions moved to techDetection module

/* Build enhanced target list with asset type classification */
async function buildTargets(scanId: string, domain: string): Promise<ClassifiedTarget[]> {
  const baseTargets = [`https://${domain}`, `https://www.${domain}`];
  const targets = new Map<string, ClassifiedTarget>();
  
  // Add base domain targets (always HTML)
  baseTargets.forEach(url => {
    targets.set(url, { url, assetType: 'html' });
  });
  
  try {
    const { rows } = await pool.query(
      `SELECT jsonb_path_query_array(meta, '$.endpoints[*].url') AS urls
       FROM artifacts
       WHERE type='discovered_endpoints' AND meta->>'scan_id'=$1
       LIMIT 1`,
      [scanId]
    );
    
    // Add discovered endpoints with classification (limit to 100 for performance)
    const discoveredCount = rows[0]?.urls?.length || 0;
    rows[0]?.urls?.slice(0, 100).forEach((url: string) => {
      if (url && typeof url === 'string' && url !== 'null' && url.startsWith('http')) {
        // Additional validation to prevent problematic URLs
        try {
          const urlObj = new URL(url);
          // Skip if URL is valid and not problematic
          if (urlObj.hostname && !isProblematicDomain(urlObj.hostname)) {
            const assetType = classifyTargetAssetType(url);
            targets.set(url, { url, assetType });
          }
        } catch {
          // Skip invalid URLs
        }
      }
    });
    
    const htmlCount = Array.from(targets.values()).filter(t => t.assetType === 'html').length;
    const nonHtmlCount = Array.from(targets.values()).filter(t => t.assetType === 'nonHtml').length;
    log(`buildTargets discovered=${discoveredCount} total=${targets.size} (html=${htmlCount}, nonHtml=${nonHtmlCount})`);
  } catch (error) {
    log(`buildTargets error: ${(error as Error).message}`);
  }
  
  // If no endpoints discovered, add common paths for better coverage (all HTML)
  if (targets.size <= 2) {
    const commonPaths = ['/admin', '/api', '/app', '/login', '/dashboard', '/home', '/about'];
    commonPaths.forEach(path => {
      targets.set(`https://${domain}${path}`, { url: `https://${domain}${path}`, assetType: 'html' });
      targets.set(`https://www.${domain}${path}`, { url: `https://www.${domain}${path}`, assetType: 'html' });
    });
    log(`buildTargets fallback added common paths, total=${targets.size}`);
  }
  
  return Array.from(targets.values());
}

/* Third-party sub-resource discovery using shared Puppeteer */
async function discoverThirdPartyOrigins(domain: string): Promise<ClassifiedTarget[]> {
  // Check if Puppeteer is enabled
  if (process.env.ENABLE_PUPPETEER === '0') {
    log(`thirdParty=skipped domain=${domain} reason="puppeteer_disabled"`);
    return [];
  }
  
  try {
    return await withPage(async (page) => {
      const origins = new Set<string>();
      
      // Track network requests
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const url = request.url();
        try {
          const urlObj = new URL(url);
          const origin = urlObj.origin;
          
          // Filter to third-party origins (different eTLD+1) and exclude problematic domains
          if (!origin.includes(domain) && 
              !origin.includes('localhost') && 
              !origin.includes('127.0.0.1') &&
              !isProblematicDomain(urlObj.hostname)) {
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
      
      // Limit results to prevent excessive discovery and classify each one
      const limitedOrigins = Array.from(origins).slice(0, CONFIG.MAX_THIRD_PARTY_REQUESTS);
      const classifiedTargets = limitedOrigins.map(url => ({
        url,
        assetType: classifyTargetAssetType(url) as 'html' | 'nonHtml'
      }));
      
      const htmlCount = classifiedTargets.filter(t => t.assetType === 'html').length;
      const nonHtmlCount = classifiedTargets.filter(t => t.assetType === 'nonHtml').length;
      log(`thirdParty=discovered domain=${domain} total=${limitedOrigins.length} (html=${htmlCount}, nonHtml=${nonHtmlCount})`);
      
      return classifiedTargets;
    });
    
  } catch (error) {
    log(`thirdParty=error domain=${domain} error="${(error as Error).message}"`);
    return [];
  }
}

// ───────────────── Batched EPSS lookup ─────────────────────────────────────
async function getEPSSScores(cveIds: string[]): Promise<Map<string, number>> {
  const uncached: string[] = [];
  const batched: Map<string, number> = new Map();
  
  // Check cache for already cached results
  for (const id of cveIds) {
    const cacheKey: CacheKey = { type: 'epss', cveId: id };
    const cached = await unifiedCache.get<number>(cacheKey);
    if (cached !== null) {
      batched.set(id, cached);
    } else {
      uncached.push(id);
    }
  }
  
  // Batch query first.org 100‑ids per request
  for (let i = 0; i < uncached.length; i += CONFIG.EPSS_BATCH) {
    const chunk = uncached.slice(i, i + CONFIG.EPSS_BATCH);
    try {
      const { data } = await axios.get(`https://api.first.org/data/v1/epss?cve=${chunk.join(',')}`, { timeout: CONFIG.API_TIMEOUT_MS });
      (data.data as any[]).forEach(async (d: any) => {
        const score = Number(d.epss) || 0;
        const cacheKey: CacheKey = { type: 'epss', cveId: d.cve };
        await unifiedCache.set(cacheKey, score, 6 * 60 * 60 * 1000); // 6h TTL
        batched.set(d.cve, score);
      });
    } catch {
      for (const id of chunk) {
        const cacheKey: CacheKey = { type: 'epss', cveId: id };
        await unifiedCache.set(cacheKey, 0, 6 * 60 * 60 * 1000); // 6h TTL
        batched.set(id, 0);
      }
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
  const cacheKey: CacheKey = { type: 'eol', slug, major };
  
  const cached = await unifiedCache.get<boolean>(cacheKey);
  if (cached !== null) return cached;

  try {
    const { data } = await axios.get(`https://endoflife.date/api/${slug}.json`, { 
      timeout: CONFIG.API_TIMEOUT_MS 
    });
    
    const cycle = (data as any[]).find((c) => c.cycle === major);
    const eol = !!cycle && new Date(cycle.eol) < new Date();
    
    await unifiedCache.set(cacheKey, eol);
    return eol;
  } catch {
    await unifiedCache.set(cacheKey, false);
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

  const cacheKey: CacheKey = { type: 'osv', ecosystem, package: t.slug, version: t.version };
  const cached = await unifiedCache.get<VulnRecord[]>(cacheKey);
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

    await unifiedCache.set(cacheKey, vulns);
    return vulns;
  } catch (error) {
    log(`osv=error tech="${t.slug}" error="${(error as Error).message}"`);
    await unifiedCache.set(cacheKey, []);
    return [];
  }
}

/* GitHub Security Advisory lookup via GraphQL */
async function getGitHubVulns(t: WappTech): Promise<VulnRecord[]> {
  const ecosystem = detectEcosystem(t);
  if (!ecosystem || !t.version) return [];
  
  const cacheKey: CacheKey = { type: 'github', ecosystem, package: t.slug, version: t.version };
  const cached = await unifiedCache.get<VulnRecord[]>(cacheKey);
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

    await unifiedCache.set(cacheKey, vulns);
    return vulns;
  } catch {
    await unifiedCache.set(cacheKey, []);
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
    // Check if nuclei wrapper is available
    const testResult = await runNucleiWrapper({ version: true });
    if (!testResult.success) {
      log('nuclei wrapper not available, skipping active CVE verification');
      return results;
    }
  } catch {
    log('nuclei wrapper not found, skipping active CVE verification');
    return results;
  }
  
  try {
    log(`nucleiCVE=testing target="${target}" cves="${cveIds.slice(0, 5).join(',')}" total=${cveIds.length}`);
    
    // Use the new nuclei wrapper
    const result = await runNucleiWrapper({
      url: target,
      templates: ['-id', cveIds.join(',')], // Target specific CVE IDs
      timeout: 20,
      retries: 1,
      headless: true // Enable headless for CVE verification
    });
    
    if (!result.success && result.exitCode !== 2) {
      log(`nucleiCVE=failed target="${target}" exit_code=${result.exitCode}`);
      return results;
    }
    
    if (result.stderr) {
      log(`nucleiCVE=stderr`, result.stderr);
    }
    
    // Parse nuclei results from the wrapper
    for (const vuln of result.results) {
      try {
        const cveMatch = vuln['template-id']?.match(/CVE-\d{4}-\d+/);
        
        if (cveMatch) {
          results.set(cveMatch[0], {
            cveId: cveMatch[0],
            templateId: vuln['template-id'],
            verified: true,
            exploitable: true,
            details: vuln
          });
          log(`nucleiCVE=confirmed cve="${cveMatch[0]}" exploitable=true`);
        }
      } catch (e) {
        log(`nucleiCVE=parse_error result="${JSON.stringify(vuln)}"`);
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
// generateSBOM function moved to sbomGenerator module

// ───────────────── Main export (enhanced with new helpers & severities) ─
export async function runTechStackScan(job: { 
  domain: string; 
  scanId: string;
  targets?: string[]; // Add optional targets array
}): Promise<number> {
  const { domain, scanId, targets: providedTargets } = job;
  const start = Date.now();
  log(`techstack=start domain=${domain}`);
  
  // Check for nuclei wrapper (required for tech detection)
  let nucleiAvailable = false;
  try {
    const testResult = await runNucleiWrapper({ version: true });
    nucleiAvailable = testResult.success;
    log(`techstack=nuclei wrapper confirmed available`);
  } catch (error) {
    log(`techstack=nuclei wrapper not available: ${(error as Error).message}`);
    nucleiAvailable = false;
  }
  
  // Note: CVE active testing with Nuclei is optional and happens in analyzeSecurityEnhanced
  const limit = pLimit(CONFIG.MAX_CONCURRENCY);
  try {
    // Build classified targets or use provided targets
    let classifiedTargets: ClassifiedTarget[];
    let primaryCount = 0, thirdPartyCount = 0;
    
    if (providedTargets) {
      // Convert provided targets to classified format (assume HTML for compatibility)
      classifiedTargets = providedTargets.map(url => ({ url, assetType: 'html' as const }));
      primaryCount = providedTargets.length;
    } else {
      const [primary, thirdParty] = await Promise.all([
        buildTargets(scanId, domain),
        discoverThirdPartyOrigins(domain)
      ]);
      classifiedTargets = [...primary, ...thirdParty];
      primaryCount = primary.length;
      thirdPartyCount = thirdParty.length;
    }
    
    // Separate HTML and non-HTML targets for different treatment
    const htmlTargets = classifiedTargets.filter(t => t.assetType === 'html').map(t => t.url);
    const nonHtmlTargets = classifiedTargets.filter(t => t.assetType === 'nonHtml');
    
    // Apply additional filtering to HTML targets only (keep the existing filterWebVulnUrls for compatibility)
    const { webUrls: allTargets, skippedCount } = filterWebVulnUrls(htmlTargets);
    
    log(`techstack=targets primary=${primaryCount} thirdParty=${thirdPartyCount} total=${classifiedTargets.length} html=${htmlTargets.length} finalHtml=${allTargets.length} nonHtml=${nonHtmlTargets.length} skipped=${skippedCount}`);
    
    // Log the expensive non-HTML targets being bypassed for transparency
    if (nonHtmlTargets.length > 0) {
      const bypassedUrls = nonHtmlTargets.map(t => t.url).slice(0, 5).join(', ');
      log(`techstack=bypass_nuclei targets=[${bypassedUrls}${nonHtmlTargets.length > 5 ? '...' : ''}] (~2min time savings by skipping expensive non-HTML assets)`);
    }
    
    // Use new unified technology detection module
    const techDetection = createTechDetection({
      ...DEFAULT_TECH_CONFIG,
      maxConcurrency: CONFIG.MAX_CONCURRENCY,
      timeout: CONFIG.PAGE_TIMEOUT_MS,
      maxTargets: 5 // Limit for performance
    });

    log(`techstack=tech_detection starting unified detection for ${allTargets.length} targets`);
    const detectionResult = await techDetection.detectTechnologies(allTargets, {
      maxConcurrency: CONFIG.MAX_CONCURRENCY,
      timeout: CONFIG.PAGE_TIMEOUT_MS,
      circuitBreakerLimit: CONFIG.TECH_CIRCUIT_BREAKER,
      enableFavicons: true,
      enableNuclei: false,
      maxTargets: 5
    });
    
    // Build tech maps from detection results
    const techMap = new Map<string, WappTech>();
    const detectMap = new Map<string, WappTech[]>();
    
    for (const tech of detectionResult.technologies) {
      techMap.set(tech.slug, tech);
      
      if (!detectMap.has(tech.slug)) {
        detectMap.set(tech.slug, []);
      }
      detectMap.get(tech.slug)!.push(tech);
    }
    
    log(`techstack=tech_detection_complete techs=${detectionResult.technologies.length} duration=${detectionResult.totalDuration}ms methods=[${detectionResult.detectionMethods.join(',')}] circuit_breaker=${detectionResult.circuitBreakerTripped}`);
    
    // Store tech count for Nuclei optimization
    const detectedTechList = detectionResult.technologies.map(t => t.name.toLowerCase());
    // analysis
    const analysisMap = new Map<string, EnhancedSecAnalysis>();
    await Promise.all(Array.from(techMap.entries()).map(([slug, tech]) => limit(async () => {
      const a = await analyzeSecurityEnhanced(tech, detectMap.get(slug) ?? [tech], allTargets);
      analysisMap.set(slug, a);
    })));

    // Enhanced vulnerability analysis with NVD + OSV.dev
    log(`techstack=vuln_analysis starting enhanced vulnerability analysis for ${Array.from(techMap.values()).length} technologies`);
    const normalizedComponents = Array.from(techMap.values()).map(tech => 
      normalizeTechnology(tech.name, tech.version, tech.confidence, 'fast-detection')
    );
    
    // Batch vulnerability analysis with NVD + OSV.dev
    const vulnerabilityReports = await batchVulnerabilityAnalysis(normalizedComponents);
    
    // Enhance with OSV.dev data for open source packages
    log(`techstack=osv_enhancement starting OSV.dev integration for ${normalizedComponents.length} components`);
    const osvVulnerabilities = await batchFindOSVVulnerabilities(normalizedComponents);
    
    // Merge NVD and OSV results
    for (let i = 0; i < vulnerabilityReports.length; i++) {
      const report = vulnerabilityReports[i];
      const osvVulns = osvVulnerabilities[i] || [];
      
      if (osvVulns.length > 0) {
        report.vulnerabilities = mergeVulnerabilityResults(report.vulnerabilities, osvVulns);
        log(`techstack=osv_merged component="${report.component.name}" nvd=${report.vulnerabilities.length - osvVulns.length} osv=${osvVulns.length} total=${report.vulnerabilities.length}`);
      }
    }
    
    // Generate SBOM using new module
    const sbomGenerator = createSBOMGenerator();
    const sbomResult = sbomGenerator.generate({
      vulnerabilityReports,
      targetName: domain,
      targetVersion: undefined,
      targetDescription: `Security scan of ${domain}`,
      scanId: scanId!,
      domain: domain
    });
    
    log(`techstack=sbom_generated components=${sbomResult.stats.componentCount} vulnerabilities=${sbomResult.stats.vulnerabilityCount} critical=${sbomResult.stats.criticalCount}`);
    
    // Store SBOM as artifact
    await insertArtifact({
      type: 'sbom',
      val_text: `SBOM generated: ${sbomResult.stats.componentCount} components, ${sbomResult.stats.vulnerabilityCount} vulnerabilities`,
      severity: sbomResult.stats.criticalCount > 0 ? 'CRITICAL' : sbomResult.stats.highCount > 0 ? 'HIGH' : 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        sbom_format: sbomResult.format,
        sbom_data: sbomGenerator.export(sbomResult.sbom, 'json'),
        stats: sbomResult.stats
      }
    });
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
    
    // Generate legacy SBOM using new module
    const legacySbomResult = sbomGenerator.generate({
      technologies: techMap,
      analyses: analysisMap,
      targetName: domain,
      domain: domain
    });
    
    await insertArtifact({
      type: 'sbom_cyclonedx',
      val_text: `Software Bill of Materials (${legacySbomResult.format}) - ${legacySbomResult.stats.componentCount} components`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'techStackScan',
        sbom: legacySbomResult.sbom,
        format: 'CycloneDX',
        version: '1.5',
        stats: legacySbomResult.stats
      }
    });

    // Metrics and summary
    const cacheStats = unifiedCache.stats();
    const metrics: ScanMetrics = {
      totalTargets: allTargets.length,
      thirdPartyOrigins: thirdPartyCount,
      uniqueTechs: techMap.size,
      supplyFindings,
      runMs: Date.now() - start,
      circuitBreakerTripped: detectionResult.circuitBreakerTripped,
      cacheHitRate: cacheStats.hitRate,
      dynamic_browser_skipped: process.env.ENABLE_PUPPETEER === '0'
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
          unified: cacheStats
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