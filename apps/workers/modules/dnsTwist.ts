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

// -----------------------------------------------------------------------------
// Promisified helpers
// -----------------------------------------------------------------------------
const exec = promisify(execFile);

// -----------------------------------------------------------------------------
// Tuning constants
// -----------------------------------------------------------------------------
const MAX_CONCURRENT_CHECKS = 5; // parallel DNS / HTTP checks per batch
const DELAY_BETWEEN_BATCHES_MS = 1_000; // pause between batches (ms)

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

  try {
    const { stdout } = await exec('dnstwist', ['-r', job.domain, '--format', 'json'], { timeout: 120_000 });
    const permutations = JSON.parse(stdout) as Array<{ domain: string; dns_a?: string[]; dns_aaaa?: string[] }>;

    // Pre‑filter: exclude canonical & non‑resolving entries
    const candidates = permutations
      .filter((p) => canonical(p.domain) !== baseDom)
      .filter((p) => (p.dns_a && p.dns_a.length) || (p.dns_aaaa && p.dns_aaaa.length));

    // Batch processing for rate‑control
    for (let i = 0; i < candidates.length; i += MAX_CONCURRENT_CHECKS) {
      const batch = candidates.slice(i, i + MAX_CONCURRENT_CHECKS);
      log(`[dnstwist] Batch ${i / MAX_CONCURRENT_CHECKS + 1}/${Math.ceil(candidates.length / MAX_CONCURRENT_CHECKS)}`);

      await Promise.all(
        batch.map(async (entry) => {
          totalFindings += 1;

          // ---------------- Enrichment calls ----------------
          const { mx: mxRecords, ns: nsRecords } = await getDnsRecords(entry.domain);
          const ctCerts = await checkCTLogs(entry.domain);
          const wildcard = await checkForWildcard(entry.domain);
          const phishing = await analyzeWebPageForPhishing(entry.domain, job.domain);
          const redirects = await redirectsToOrigin(entry.domain, job.domain);

          // ---------------- Severity calculation -------------
          let score = 10;
          if (mxRecords.length) score += 20;
          if (ctCerts.length) score += 15;
          if (wildcard) score += 30;
          score += phishing.score;

          let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
          if (redirects && mxRecords.length === 0) {
            severity = 'MEDIUM'; // verify ownership case
          } else if (score >= 70) {
            severity = 'CRITICAL';
          } else if (score >= 50) {
            severity = 'HIGH';
          } else if (score >= 25) {
            severity = 'MEDIUM';
          } else {
            severity = 'LOW';
          }

          // ---------------- Artifact creation ---------------
          const artifactId = await insertArtifact({
            type: 'typo_domain',
            val_text: `Potentially malicious typosquatted domain detected: ${entry.domain}`,
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
            },
          });

          // ---------------- Finding creation ----------------
          if (severity !== 'LOW') {
            const description = redirects
              ? `Domain 3xx redirects to ${job.domain}; verify ownership. MX present: ${mxRecords.length > 0}`
              : `Domain shows signs of malicious activity (Phishing Score: ${phishing.score}, Wildcard: ${wildcard}, MX Active: ${mxRecords.length > 0})`;

            await insertFinding(
              artifactId,
              'PHISHING_SETUP',
              `Investigate and initiate takedown procedures for the suspected malicious or impersonating domain ${entry.domain}.`,
              description,
            );
          }
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
