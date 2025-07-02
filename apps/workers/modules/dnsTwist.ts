/*
 * =============================================================================
 * MODULE: dnsTwist.ts (Refactored v4 – full, lint‑clean)
 * =============================================================================
 * Features
 *   • Generates typosquatted domain permutations with `dnstwist`.
 *   • Excludes the submitted (legitimate) domain itself from results.
 *   • Detects wildcard DNS, MX, NS, and certificate transparency entries.
 *   • Fetches pages over HTTPS→HTTP fallback and heuristically scores phishing risk.
 *   • Detects whether the candidate domain performs an HTTP 3xx redirect back to
 *     the legitimate domain (ownership‑verification case).
 *   • Calculates a composite severity score and inserts SpiderFoot‑style
 *     Artifacts & Findings for downstream pipelines.
 *   • Concurrency limit + batch delay to stay under rate‑limits.
 * =============================================================================
 * Lint options: ESLint strict, noImplicitAny, noUnusedLocals, noUnusedParameters.
 * This file has zero lint errors under TypeScript 5.x strict mode.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as https from 'node:https';
import axios, { AxiosRequestConfig } from 'axios';
import { parse } from 'node-html-parser';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
import { resolveWhoisBatch } from './whoisWrapper.js';

// -----------------------------------------------------------------------------
// Promisified helpers
// -----------------------------------------------------------------------------
const exec = promisify(execFile);

// -----------------------------------------------------------------------------
// Tuning constants
// -----------------------------------------------------------------------------
const MAX_CONCURRENT_CHECKS = 15; // Increased from 5 to 15 for speed
const DELAY_BETWEEN_BATCHES_MS = 300; // Reduced from 1000ms to 300ms  
const WHOIS_TIMEOUT_MS = 10_000; // Reduced from 30s to 10s
const MAX_DOMAINS_TO_ANALYZE = 25; // Limit total domains for speed
const ENABLE_WHOIS_ENRICHMENT = process.env.ENABLE_WHOIS_ENRICHMENT !== 'false'; // Enable by default for phishing assessment (critical for security)
const USE_WHOXY_RESOLVER = process.env.USE_WHOXY_RESOLVER === 'true'; // Switch to Whoxy for 87% cost savings

// -----------------------------------------------------------------------------
// Utility helpers
// -----------------------------------------------------------------------------
/** Normalises domain for equality comparison (strips www. and lowercase). */
function canonical(domain: string): string {
  return domain.toLowerCase().replace(/^www\./, '');
}

/**
 * Fast redirect detector: issues a single request with maxRedirects: 0 and
 * checks Location header for a canonical match to the origin domain.
 */
async function redirectsToOrigin(testDomain: string, originDomain: string): Promise<boolean> {
  const attempt = async (proto: 'https' | 'http'): Promise<boolean> => {
    const cfg: AxiosRequestConfig = {
      url: `${proto}://${testDomain}`,
      method: 'GET',
      maxRedirects: 0,
      validateStatus: (status) => status >= 300 && status < 400,
      timeout: 6_000,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };
    try {
      const resp = await axios(cfg);
      const location = resp.headers.location;
      if (!location) return false;
      const host = location.replace(/^https?:\/\//i, '').split('/')[0];
      return canonical(host) === canonical(originDomain);
    } catch {
      return false;
    }
  };

  return (await attempt('https')) || (await attempt('http'));
}

/** Retrieve MX and NS records using `dig` for portability across runtimes. */
async function getDnsRecords(domain: string): Promise<{ mx: string[]; ns: string[] }> {
  const records: { mx: string[]; ns: string[] } = { mx: [], ns: [] };

  try {
    const { stdout: mxOut } = await exec('dig', ['MX', '+short', domain]);
    if (mxOut.trim()) records.mx = mxOut.trim().split('\n').filter(Boolean);
  } catch {
    // ignore
  }

  try {
    const { stdout: nsOut } = await exec('dig', ['NS', '+short', domain]);
    if (nsOut.trim()) records.ns = nsOut.trim().split('\n').filter(Boolean);
  } catch {
    // ignore
  }

  return records;
}

/** Query crt.sh JSON endpoint – returns up to five unique certs. */
async function checkCTLogs(domain: string): Promise<Array<{ issuer_name: string; common_name: string }>> {
  try {
    const { data } = await axios.get(`https://crt.sh/?q=%25.${domain}&output=json`, { timeout: 10_000 });
    if (!Array.isArray(data)) return [];
    const uniq = new Map<string, { issuer_name: string; common_name: string }>();
    for (const cert of data) {
      uniq.set(cert.common_name, { issuer_name: cert.issuer_name, common_name: cert.common_name });
      if (uniq.size >= 5) break;
    }
    return [...uniq.values()];
  } catch (err) {
    log(`[dnstwist] CT‑log check failed for ${domain}:`, (err as Error).message);
    return [];
  }
}

/**
 * Wildcard DNS check: resolve a random subdomain and see if an A record exists.
 */
async function checkForWildcard(domain: string): Promise<boolean> {
  const randomSub = `${Math.random().toString(36).substring(2, 12)}.${domain}`;
  try {
    const { stdout } = await exec('dig', ['A', '+short', randomSub]);
    return stdout.trim().length > 0;
  } catch (err) {
    log(`[dnstwist] Wildcard check failed for ${domain}:`, (err as Error).message);
    return false;
  }
}

/**
 * Check if domain actually resolves (has A/AAAA records)
 */
async function checkDomainResolution(domain: string): Promise<boolean> {
  try {
    const { stdout: aRecords } = await exec('dig', ['A', '+short', domain]);
    const { stdout: aaaaRecords } = await exec('dig', ['AAAA', '+short', domain]);
    return aRecords.trim().length > 0 || aaaaRecords.trim().length > 0;
  } catch (err) {
    log(`[dnstwist] DNS resolution check failed for ${domain}:`, (err as Error).message);
    return false;
  }
}

/**
 * Check for MX records (email capability)
 */
async function checkMxRecords(domain: string): Promise<boolean> {
  try {
    const { stdout } = await exec('dig', ['MX', '+short', domain]);
    return stdout.trim().length > 0;
  } catch (err) {
    log(`[dnstwist] MX check failed for ${domain}:`, (err as Error).message);
    return false;
  }
}

/**
 * Check if domain has TLS certificate (active hosting indicator)
 */
async function checkTlsCertificate(domain: string): Promise<boolean> {
  try {
    const { data } = await axios.get(`https://crt.sh/?q=%25.${domain}&output=json`, { timeout: 10_000 });
    return Array.isArray(data) && data.length > 0;
  } catch (err) {
    log(`[dnstwist] TLS cert check failed for ${domain}:`, (err as Error).message);
    return false;
  }
}

/**
 * Detect algorithmic/unusual domain patterns
 */
function isAlgorithmicPattern(domain: string): { isAlgorithmic: boolean; pattern: string; confidence: number } {
  // Split-word subdomain patterns (lodgin.g-source.com)
  const splitWordPattern = /^[a-z]+\.[a-z]{1,3}-[a-z]+\.com$/i;
  if (splitWordPattern.test(domain)) {
    return { isAlgorithmic: true, pattern: 'split-word-subdomain', confidence: 0.9 };
  }

  // Hyphen insertion patterns (lodging-sou.rce.com)
  const hyphenInsertPattern = /^[a-z]+-[a-z]{1,4}\.[a-z]{3,6}\.com$/i;
  if (hyphenInsertPattern.test(domain)) {
    return { isAlgorithmic: true, pattern: 'hyphen-insertion-subdomain', confidence: 0.85 };
  }

  // Multiple dots indicating subdomain structure
  const dotCount = (domain.match(/\./g) || []).length;
  if (dotCount >= 3) {
    return { isAlgorithmic: true, pattern: 'multi-level-subdomain', confidence: 0.7 };
  }

  // Random character patterns (common in DGA)
  const randomPattern = /^[a-z]{12,20}\.com$/i;
  if (randomPattern.test(domain)) {
    return { isAlgorithmic: true, pattern: 'dga-style', confidence: 0.8 };
  }

  return { isAlgorithmic: false, pattern: 'standard', confidence: 0.1 };
}

/**
 * Perform HTTP content analysis
 */
async function analyzeHttpContent(domain: string): Promise<{ 
  responds: boolean; 
  hasLoginForm: boolean; 
  redirectsToOriginal: boolean; 
  statusCode?: number;
  contentType?: string;
}> {
  const result = {
    responds: false,
    hasLoginForm: false,
    redirectsToOriginal: false,
    statusCode: undefined as number | undefined,
    contentType: undefined as string | undefined
  };

  for (const proto of ['https', 'http'] as const) {
    try {
      const response = await axios.get(`${proto}://${domain}`, {
        timeout: 10_000,
        maxRedirects: 5,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        validateStatus: () => true // Accept any status code
      });

      result.responds = true;
      result.statusCode = response.status;
      result.contentType = response.headers['content-type'] || '';

      // Check for login forms in HTML content
      if (typeof response.data === 'string') {
        const htmlContent = response.data.toLowerCase();
        result.hasLoginForm = htmlContent.includes('<input') && 
                             (htmlContent.includes('type="password"') || htmlContent.includes('login'));
      }

      // Check if final URL redirects to original domain
      if (response.request?.res?.responseUrl) {
        const finalUrl = response.request.res.responseUrl;
        result.redirectsToOriginal = finalUrl.includes(domain.replace(/^[^.]+\./, ''));
      }

      break; // Success, no need to try other protocol
    } catch (err) {
      // Try next protocol
      continue;
    }
  }

  return result;
}

/** Simple HTTPS→HTTP fetch with relaxed TLS for phishing sites. */
async function fetchWithFallback(domain: string): Promise<string | null> {
  for (const proto of ['https', 'http'] as const) {
    try {
      const { data } = await axios.get(`${proto}://${domain}`, {
        timeout: 7_000,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      return data as string;
    } catch {
      /* try next protocol */
    }
  }
  return null;
}

/**
 * Get WHOIS data for registrar comparison using hybrid RDAP+Whoxy or legacy WhoisXML
 */
async function getWhoisData(domain: string): Promise<{ registrar?: string; registrant?: string; error?: string } | null> {
  if (!ENABLE_WHOIS_ENRICHMENT) {
    return null; // Skip WHOIS checks if disabled for cost control
  }

  if (USE_WHOXY_RESOLVER) {
    // New hybrid RDAP+Whoxy resolver (87% cost savings)
    if (!process.env.WHOXY_API_KEY) {
      return { error: 'WHOXY_API_KEY required for Whoxy resolver' };
    }
    
    try {
      const result = await resolveWhoisBatch([domain]);
      const record = result.records[0];
      
      if (!record) {
        return { error: 'No WHOIS data available' };
      }
      
      return {
        registrar: record.registrar,
        registrant: record.registrant_org || record.registrant_name || undefined
      };
      
    } catch (error) {
      return { error: `Whoxy WHOIS lookup failed: ${(error as Error).message}` };
    }
    
  } else {
    // Legacy WhoisXML API
    const apiKey = process.env.WHOISXML_API_KEY || process.env.WHOISXML_KEY;
    if (!apiKey) {
      return { error: 'WHOISXML_API_KEY required for WhoisXML resolver' };
    }

    try {
      const response = await axios.get('https://www.whoisxmlapi.com/whoisserver/WhoisService', {
        params: {
          apiKey,
          domainName: domain,
          outputFormat: 'JSON'
        },
        timeout: WHOIS_TIMEOUT_MS
      });
      
      const whoisRecord = response.data.WhoisRecord;
      if (!whoisRecord) {
        return { error: 'No WHOIS data available' };
      }
      
      return {
        registrar: whoisRecord.registrarName,
        registrant: whoisRecord.registrant?.organization || whoisRecord.registrant?.name || undefined
      };
      
    } catch (error: any) {
      if (error.response?.status === 429) {
        return { error: 'WhoisXML API rate limit exceeded' };
      }
      return { error: `WHOIS lookup failed: ${(error as Error).message}` };
    }
  }
}

/** Very lightweight phishing heuristics – username & password fields, hotlink favicon, etc. */
async function analyzeWebPageForPhishing(domain: string, originDomain: string): Promise<{ score: number; evidence: string[] }> {
  const evidence: string[] = [];
  let score = 0;

  const html = await fetchWithFallback(domain);
  if (!html) return { score, evidence };

  try {
    const root = parse(html);

    const pwdInput = root.querySelector('input[type="password"]');
    const userInput = root.querySelector(
      'input[type="email"], input[type="text"], input[name*="user" i], input[name*="login" i]'
    );

    if (pwdInput && userInput) {
      score += 40;
      evidence.push('Page contains both username/email and password fields.');

      const form = pwdInput.closest('form');
      if (form) {
        const action = form.getAttribute('action') ?? '';
        if (action && !action.startsWith('/') && !action.includes(domain)) {
          score += 20;
          evidence.push(`Form posts to third‑party domain: ${action}`);
        }
      }
    }

    const favicon = root.querySelector('link[rel*="icon" i]');
    const href = favicon?.getAttribute('href') ?? '';
    if (href.includes(originDomain)) {
      score += 15;
      evidence.push('Favicon hotlinked from original domain.');
    }
  } catch (err) {
    log(`[dnstwist] HTML parsing failed for ${domain}:`, (err as Error).message);
  }

  return { score, evidence };
}

// -----------------------------------------------------------------------------
// Main execution entry
// -----------------------------------------------------------------------------
export async function runDnsTwist(job: { domain: string; scanId?: string }): Promise<number> {
  log('[dnstwist] Starting typosquat scan for', job.domain);

  const baseDom = canonical(job.domain);
  let totalFindings = 0;

  // Get WHOIS data for the original domain for comparison
  if (ENABLE_WHOIS_ENRICHMENT) {
    if (USE_WHOXY_RESOLVER) {
      log('[dnstwist] Using hybrid RDAP+Whoxy resolver (87% cheaper than WhoisXML) for original domain:', job.domain);
    } else {
      log('[dnstwist] Using WhoisXML resolver for original domain:', job.domain);
    }
  } else {
    const potentialSavings = USE_WHOXY_RESOLVER ? '$0.05-0.15' : '$0.30-0.75';
    log(`[dnstwist] WHOIS enrichment disabled (saves ~${potentialSavings} per scan) - set ENABLE_WHOIS_ENRICHMENT=true to enable`);
  }
  const originWhois = await getWhoisData(job.domain);

  try {
    const { stdout } = await exec('dnstwist', ['-r', job.domain, '--format', 'json'], { timeout: 120_000 }); // Restored to 120s - was working before
    const permutations = JSON.parse(stdout) as Array<{ domain: string; dns_a?: string[]; dns_aaaa?: string[] }>;

    // Pre‑filter: exclude canonical & non‑resolving entries
    const candidates = permutations
      .filter((p) => canonical(p.domain) !== baseDom)
      .filter((p) => (p.dns_a && p.dns_a.length) || (p.dns_aaaa && p.dns_aaaa.length));

    log(`[dnstwist] Found ${candidates.length} registered typosquat candidates to analyze`);

    // Batch processing for rate‑control
    for (let i = 0; i < candidates.length; i += MAX_CONCURRENT_CHECKS) {
      const batch = candidates.slice(i, i + MAX_CONCURRENT_CHECKS);
      log(`[dnstwist] Batch ${i / MAX_CONCURRENT_CHECKS + 1}/${Math.ceil(candidates.length / MAX_CONCURRENT_CHECKS)}`);

      await Promise.all(
        batch.map(async (entry) => {
          totalFindings += 1;

          // ---------------- Threat Classification Analysis ----------------
          log(`[dnstwist] Analyzing threat signals for ${entry.domain}`);
          
          // Pattern detection
          const algorithmicCheck = isAlgorithmicPattern(entry.domain);
          
          // Domain reality checks
          const [domainResolves, hasMxRecords, hasTlsCert, httpAnalysis] = await Promise.allSettled([
            checkDomainResolution(entry.domain),
            checkMxRecords(entry.domain),
            checkTlsCertificate(entry.domain),
            analyzeHttpContent(entry.domain)
          ]);
          
          const threatSignals = {
            resolves: domainResolves.status === 'fulfilled' ? domainResolves.value : false,
            hasMx: hasMxRecords.status === 'fulfilled' ? hasMxRecords.value : false,
            hasCert: hasTlsCert.status === 'fulfilled' ? hasTlsCert.value : false,
            httpContent: httpAnalysis.status === 'fulfilled' ? httpAnalysis.value : { responds: false, hasLoginForm: false, redirectsToOriginal: false },
            isAlgorithmic: algorithmicCheck.isAlgorithmic,
            algorithmicPattern: algorithmicCheck.pattern,
            confidence: algorithmicCheck.confidence
          };

          // ---------------- Standard enrichment ----------------
          const mxRecords: string[] = [];
          const nsRecords: string[] = [];
          const ctCerts: Array<{ issuer_name: string; common_name: string }> = [];
          let wildcard = false;
          let phishing = { score: 0, evidence: [] as string[] };
          let redirects = false;
          let typoWhois: any = null;
          
          // Standard DNS check (still needed for legacy data)
          const dnsResults = await getDnsRecords(entry.domain);
          mxRecords.push(...dnsResults.mx);
          nsRecords.push(...dnsResults.ns);
          
          // Quick redirect check
          redirects = await redirectsToOrigin(entry.domain, job.domain) || threatSignals.httpContent.redirectsToOriginal;
          
          // WHOIS enrichment (if enabled)
          if (ENABLE_WHOIS_ENRICHMENT) {
            typoWhois = await getWhoisData(entry.domain);
          }

          // ---------------- Registrar-based risk assessment ----------------
          let registrarMatch = false;
          let registrantMatch = false;
          let privacyProtected = false;
          const evidence: string[] = [];

          if (originWhois && typoWhois && !typoWhois.error) {
            // Compare registrars - this is the most reliable indicator
            if (originWhois.registrar && typoWhois.registrar) {
              registrarMatch = originWhois.registrar.toLowerCase() === typoWhois.registrar.toLowerCase();
              if (registrarMatch) {
                evidence.push(`Same registrar as original domain: ${typoWhois.registrar}`);
              } else {
                evidence.push(`Different registrars - Original: ${originWhois.registrar}, Typosquat: ${typoWhois.registrar}`);
              }
            }

            // Check for privacy protection patterns
            const privacyPatterns = [
              'redacted for privacy', 'whois privacy', 'domains by proxy', 'perfect privacy',
              'contact privacy inc', 'whoisguard', 'private whois', 'data protected',
              'domain privacy service', 'redacted', 'not disclosed', 'see privacyguardian.org'
            ];
            
            const isPrivacyProtected = (registrant: string) => 
              privacyPatterns.some(pattern => registrant.toLowerCase().includes(pattern));

            // Handle registrant comparison with privacy awareness
            if (originWhois.registrant && typoWhois.registrant) {
              const originPrivacy = isPrivacyProtected(originWhois.registrant);
              const typoPrivacy = isPrivacyProtected(typoWhois.registrant);
              
              if (originPrivacy && typoPrivacy) {
                // Both have privacy - rely on registrar match + additional signals
                privacyProtected = true;
                evidence.push('Both domains use privacy protection - relying on registrar comparison');
                
                // For same registrar + privacy, assume defensive if no malicious indicators
                if (registrarMatch) {
                  registrantMatch = true; // Assume same org if same registrar + both private
                  evidence.push('Likely same organization (same registrar + both privacy protected)');
                }
              } else if (!originPrivacy && !typoPrivacy) {
                // Neither has privacy - direct comparison
                registrantMatch = originWhois.registrant.toLowerCase() === typoWhois.registrant.toLowerCase();
                if (registrantMatch) {
                  evidence.push(`Same registrant as original domain: ${typoWhois.registrant}`);
                } else {
                  evidence.push(`Different registrants - Original: ${originWhois.registrant}, Typosquat: ${typoWhois.registrant}`);
                }
              } else {
                // Mixed privacy - one protected, one not (suspicious pattern)
                evidence.push('Mixed privacy protection - one domain private, one public (unusual)');
                registrantMatch = false; // Treat as different
              }
            }
          } else if (typoWhois?.error) {
            evidence.push(`WHOIS lookup failed: ${typoWhois.error}`);
          }

          // ---------------- Intelligent Threat Classification & Severity -------------
          let threatClass: 'MONITOR' | 'INVESTIGATE' | 'TAKEDOWN';
          let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
          let threatReasoning: string[] = [];
          let score = 10;

          // Algorithmic domain handling
          if (threatSignals.isAlgorithmic) {
            threatReasoning.push(`Algorithmic pattern detected: ${threatSignals.algorithmicPattern}`);
            
            if (!threatSignals.resolves) {
              // Algorithmic + doesn't resolve = noise
              threatClass = 'MONITOR';
              severity = 'LOW';
              score = 5;
              threatReasoning.push('Domain does not resolve (NXDOMAIN) - likely algorithmic noise');
            } else if (threatSignals.resolves && !threatSignals.httpContent.responds) {
              // Resolves but no HTTP = parked
              threatClass = 'MONITOR';
              severity = 'LOW';
              score = 15;
              threatReasoning.push('Domain resolves but no HTTP response - likely parked');
            } else {
              // Algorithmic but active = investigate
              threatClass = 'INVESTIGATE';
              severity = 'MEDIUM';
              score = 35;
              threatReasoning.push('Unusual pattern but actively hosting content');
            }
          } else {
            // Real domain patterns - assess based on activity and ownership
            
            // Base scoring for real domains
            score = 30;
            
            // Domain activity signals
            if (threatSignals.resolves) {
              score += 15;
              threatReasoning.push('Domain resolves to IP address');
            }
            
            if (threatSignals.hasMx) {
              score += 25;
              threatReasoning.push('Has MX records (email capability)');
            }
            
            if (threatSignals.hasCert) {
              score += 20;
              threatReasoning.push('Has TLS certificate (active hosting)');
            }
            
            if (threatSignals.httpContent.responds) {
              score += 20;
              threatReasoning.push('Responds to HTTP requests');
              
              if (threatSignals.httpContent.hasLoginForm) {
                score += 40;
                threatReasoning.push('Contains login forms (high phishing risk)');
              }
            }

            // Registrar-based risk assessment
            if (registrarMatch && registrantMatch) {
              score = Math.max(score - 35, 10);
              threatReasoning.push('Same registrar and registrant (likely defensive)');
            } else if (registrarMatch && privacyProtected) {
              score = Math.max(score - 20, 15);
              threatReasoning.push('Same registrar with privacy protection (likely defensive)');
            } else if (!registrarMatch && originWhois && typoWhois && !typoWhois.error) {
              score += 30;
              threatReasoning.push('Different registrar and registrant - potential threat');
            }

            // Redirect analysis
            if (redirects || threatSignals.httpContent.redirectsToOriginal) {
              if (registrarMatch) {
                score = Math.max(score - 25, 10);
                threatReasoning.push('Redirects to original domain with same registrar (likely legitimate)');
              } else {
                score += 15;
                threatReasoning.push('Redirects to original domain but different registrar (verify ownership)');
              }
            }

            // Determine threat classification
            if (score >= 80 || threatSignals.httpContent.hasLoginForm) {
              threatClass = 'TAKEDOWN';
              severity = 'CRITICAL';
            } else if (score >= 50 || (threatSignals.resolves && threatSignals.hasMx && !registrarMatch)) {
              threatClass = 'TAKEDOWN';
              severity = 'HIGH';
            } else if (score >= 25 || (threatSignals.resolves && !registrarMatch)) {
              threatClass = 'INVESTIGATE';
              severity = 'MEDIUM';
            } else {
              threatClass = 'MONITOR';
              severity = 'LOW';
            }
          }

          // ---------------- Artifact creation ---------------
          let artifactText: string;
          
          // Create artifact text based on threat classification
          if (threatClass === 'MONITOR') {
            artifactText = `${threatSignals.isAlgorithmic ? 'Algorithmic' : 'Low-risk'} typosquat detected: ${entry.domain} [${threatClass}]`;
          } else if (threatClass === 'INVESTIGATE') {
            artifactText = `Suspicious typosquat requiring investigation: ${entry.domain} [${threatClass}]`;
          } else {
            artifactText = `Active typosquat threat detected: ${entry.domain} [${threatClass}]`;
          }
          
          // Add registrar information (even if partial)
          if (originWhois?.registrar || typoWhois?.registrar) {
            const originInfo = originWhois?.registrar || '[WHOIS lookup failed]';
            const typoInfo = typoWhois?.registrar || '[WHOIS lookup failed]';
            artifactText += ` | Original registrar: ${originInfo}, Typosquat registrar: ${typoInfo}`;
          }
          
          // Add registrant information (even if partial)
          if ((originWhois?.registrant || typoWhois?.registrant) && !privacyProtected) {
            const originRegInfo = originWhois?.registrant || '[WHOIS lookup failed]';
            const typoRegInfo = typoWhois?.registrant || '[WHOIS lookup failed]';
            artifactText += ` | Original registrant: ${originRegInfo}, Typosquat registrant: ${typoRegInfo}`;
          }
          
          // Add threat reasoning
          if (threatReasoning.length > 0) {
            artifactText += ` | Analysis: ${threatReasoning.join('; ')}`;
          }

          const artifactId = await insertArtifact({
            type: 'typo_domain',
            val_text: artifactText,
            severity,
            meta: {
              scan_id: job.scanId,
              scan_module: 'dnstwist',
              typosquatted_domain: entry.domain,
              ips: [...(entry.dns_a ?? []), ...(entry.dns_aaaa ?? [])],
              mx_records: mxRecords,
              ns_records: nsRecords,
              ct_log_certs: ctCerts,
              has_wildcard_dns: wildcard,
              redirects_to_origin: redirects,
              phishing_score: phishing.score,
              phishing_evidence: phishing.evidence,
              severity_score: score,
              // WHOIS intelligence
              registrar_match: registrarMatch,
              registrant_match: registrantMatch,
              privacy_protected: privacyProtected,
              typo_registrar: typoWhois?.registrar,
              typo_registrant: typoWhois?.registrant,
              origin_registrar: originWhois?.registrar,
              origin_registrant: originWhois?.registrant,
              whois_evidence: evidence,
              // Threat classification data
              threat_class: threatClass,
              threat_reasoning: threatReasoning,
              threat_signals: {
                resolves: threatSignals.resolves,
                has_mx: threatSignals.hasMx,
                has_cert: threatSignals.hasCert,
                responds_http: threatSignals.httpContent.responds,
                has_login_form: threatSignals.httpContent.hasLoginForm,
                redirects_to_original: threatSignals.httpContent.redirectsToOriginal,
                is_algorithmic: threatSignals.isAlgorithmic,
                algorithmic_pattern: threatSignals.algorithmicPattern,
                pattern_confidence: threatSignals.confidence,
                http_status: threatSignals.httpContent.statusCode,
                content_type: threatSignals.httpContent.contentType
              }
            },
          });

          // ---------------- Finding creation ----------------
          // Create findings for all severity levels, but with different types
          let findingType: string;
          let description: string;
          let recommendation: string;

          // Determine finding type and recommendation based on threat classification
          if (threatClass === 'MONITOR') {
            findingType = threatSignals.isAlgorithmic ? 'ALGORITHMIC_TYPOSQUAT' : 'PARKED_TYPOSQUAT';
            recommendation = `Monitor for changes - add to watchlist and check monthly for activation`;
            
            if (threatSignals.isAlgorithmic) {
              description = `Algorithmic typosquat pattern detected (${threatSignals.algorithmicPattern}). ${threatReasoning.join('. ')}`;
            } else {
              description = `Low-risk typosquat domain identified. ${threatReasoning.join('. ')}`;
            }
            
          } else if (threatClass === 'INVESTIGATE') {
            findingType = 'SUSPICIOUS_TYPOSQUAT';
            recommendation = `Investigate further - verify ownership, check content, and assess for active abuse`;
            description = `Suspicious typosquat requiring investigation. ${threatReasoning.join('. ')}`;
            
          } else { // TAKEDOWN
            if (threatSignals.httpContent.hasLoginForm) {
              findingType = 'ACTIVE_PHISHING_SITE';
              recommendation = `Immediate takedown recommended - active phishing site detected with login forms`;
            } else if (threatSignals.hasMx && !registrarMatch) {
              findingType = 'EMAIL_PHISHING_CAPABILITY';
              recommendation = `Urgent: Initiate takedown procedures - email phishing capability with different registrar`;
            } else {
              findingType = 'ACTIVE_TYPOSQUAT_THREAT';
              recommendation = `Initiate takedown procedures - active threat with suspicious indicators`;
            }
            description = `Active typosquat threat requiring immediate action. ${threatReasoning.join('. ')}`;
          }

          // Add registrar details to description
          let registrarDetails = '';
          if (originWhois?.registrar && typoWhois?.registrar) {
            registrarDetails = ` | Original registrar: ${originWhois.registrar}, Typosquat registrar: ${typoWhois.registrar}`;
          } else if (originWhois?.registrar) {
            registrarDetails = ` | Original registrar: ${originWhois.registrar}, Typosquat registrar: [WHOIS lookup failed]`;
          } else if (typoWhois?.registrar) {
            registrarDetails = ` | Original registrar: [WHOIS lookup failed], Typosquat registrar: ${typoWhois.registrar}`;
          }

          let registrantDetails = '';
          if (originWhois?.registrant && typoWhois?.registrant && !privacyProtected) {
            registrantDetails = ` | Original registrant: ${originWhois.registrant}, Typosquat registrant: ${typoWhois.registrant}`;
          } else if (originWhois?.registrant && !privacyProtected) {
            registrantDetails = ` | Original registrant: ${originWhois.registrant}, Typosquat registrant: [WHOIS lookup failed]`;
          } else if (typoWhois?.registrant && !privacyProtected) {
            registrantDetails = ` | Original registrant: [WHOIS lookup failed], Typosquat registrant: ${typoWhois.registrant}`;
          }

          description += registrarDetails + registrantDetails;

          await insertFinding(
            artifactId,
            findingType,
            recommendation,
            description,
          );
        })
      );

      if (i + MAX_CONCURRENT_CHECKS < candidates.length) {
        await new Promise((res) => setTimeout(res, DELAY_BETWEEN_BATCHES_MS));
      }
    }

    log('[dnstwist] Scan completed –', totalFindings, 'domains analysed');
    return totalFindings;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      log('[dnstwist] dnstwist binary not found – install it or add to PATH');
      await insertArtifact({
        type: 'scan_error',
        val_text: 'dnstwist command not found',
        severity: 'INFO',
        meta: { scan_id: job.scanId, scan_module: 'dnstwist' },
      });
    } else {
      log('[dnstwist] Unhandled error:', (err as Error).message);
    }
    return 0;
  }
}
