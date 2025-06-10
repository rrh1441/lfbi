/*
 * =============================================================================
 * MODULE: dnsTwist.ts (Refactored v2)
 * =============================================================================
 * This module uses dnstwist to find typosquatted domains and then performs
 * deeper analysis to identify potentially malicious ones.
 *
 * Key Improvements from previous version:
 * 1.  **Wildcard DNS Detection:** Actively checks for wildcard DNS records.
 * 2.  **Sophisticated Phishing Analysis:** Parses HTML to analyze login forms,
 * form actions, and favicons for reliable phishing detection.
 * 3.  **Dynamic Severity Scoring:** Calculates severity based on a combination
 * of factors for accurate prioritization.
 * 4.  **Dual Protocol Support:** Checks both HTTPS and HTTP for live websites.
 * 5.  **Concurrency & Rate Limiting:** Processes multiple domains in parallel
 * with delays to improve performance and avoid being blocked.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import axios from 'axios';
import { parse } from 'node-html-parser';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

// REFACTOR: Added concurrency and rate-limiting controls.
const MAX_CONCURRENT_CHECKS = 5;
const DELAY_BETWEEN_BATCHES_MS = 1000;

// --- Supporting Analysis Functions ---

async function getDnsRecords(domain: string): Promise<{ mx: string[], ns: string[] }> {
    const records: { mx: string[], ns:string[] } = { mx: [], ns: [] };
    try {
        const { stdout: mxOut } = await exec('dig', ['MX', '+short', domain]);
        if (mxOut.trim()) records.mx = mxOut.trim().split('\n');
    } catch (e) { /* No MX records */ }

    try {
        const { stdout: nsOut } = await exec('dig', ['NS', '+short', domain]);
        if (nsOut.trim()) records.ns = nsOut.trim().split('\n');
    } catch (e) { /* No NS records */ }

    return records;
}

async function checkCTLogs(domain: string): Promise<Array<{ issuer_name: string, common_name: string }>> {
    try {
        const { data } = await axios.get(`https://crt.sh/?q=%.${domain}&output=json`, { timeout: 10000 });
        if (Array.isArray(data)) {
            const certs = new Map<string, { issuer_name: string, common_name: string }>();
            data.forEach(cert => certs.set(cert.common_name, { issuer_name: cert.issuer_name, common_name: cert.common_name }));
            return Array.from(certs.values()).slice(0, 5);
        }
    } catch (error) {
        log(`[dnstwist] CT log check failed for ${domain}:`, (error as Error).message);
    }
    return [];
}

async function checkForWildcard(domain: string): Promise<boolean> {
    try {
        const randomSubdomain = `${Math.random().toString(36).substring(2, 12)}.${domain}`;
        const { stdout } = await exec('dig', ['A', '+short', randomSubdomain]);
        return stdout.trim().length > 0;
    } catch (e) {
        // REFACTOR: Enhanced error logging.
        log(`[dnstwist] Wildcard check failed for ${domain}:`, (e as Error).message);
        return false;
    }
}

/**
 * REFACTOR: Quick Win - Implements dual protocol support to find HTTPS-first sites.
 */
async function fetchWithFallback(domain: string): Promise<string | null> {
    for (const protocol of ['https', 'http']) {
        try {
            const { data } = await axios.get(`${protocol}://${domain}`, { 
                timeout: 7000,
                // Important for self-signed certs on phishing sites
                httpsAgent: new (await import('https')).Agent({ rejectUnauthorized: false })
            });
            return data;
        } catch (error) {
            continue; // Try next protocol
        }
    }
    return null;
}

async function analyzeWebPageForPhishing(domain: string, originalDomain: string): Promise<{ score: number; evidence: string[] }> {
    const evidence: string[] = [];
    let score = 0;
    
    const html = await fetchWithFallback(domain);
    if (!html) return { score, evidence };

    try {
        const root = parse(html);
        const passwordInput = root.querySelector('input[type="password"]');
        const emailOrUserInput = root.querySelector('input[type="email"], input[type="text"], input[name*="user"], input[name*="login"]');
        
        if (passwordInput && emailOrUserInput) {
            score += 40;
            evidence.push('Page contains both username/email and password fields.');

            const form = passwordInput.closest('form');
            if (form) {
                const action = form.getAttribute('action');
                if (action && !action.startsWith('/') && !action.includes(domain)) {
                    score += 20;
                    evidence.push(`Form submits credentials to a third-party domain: ${action}`);
                }
            }
        }
        
        const favicon = root.querySelector('link[rel*="icon"]');
        if (favicon?.getAttribute('href')?.includes(originalDomain)) {
            score += 15;
            evidence.push(`Favicon is hotlinked from the original domain to appear legitimate.`);
        }
    } catch (error) {
        log(`[dnstwist] HTML parsing failed for ${domain}:`, (error as Error).message);
    }
    
    return { score, evidence };
}

// --- Main Execution Logic ---

export async function runDnsTwist(job: { domain: string; scanId?: string }): Promise<number> {
  log('[dnstwist] Starting enhanced typosquatting scan for', job.domain);
  
  try {
    const { stdout } = await exec('dnstwist', ['-r', job.domain, '--format', 'json'], { timeout: 120000 });
    const list = (JSON.parse(stdout) as Array<{ domain: string; dns_a?: string[]; dns_aaaa?: string[] }>)
        .filter(entry => (entry.dns_a && entry.dns_a.length > 0) || (entry.dns_aaaa && entry.dns_aaaa.length > 0));

    let totalFindings = 0;

    // REFACTOR: Process entries in concurrent batches with delays.
    for (let i = 0; i < list.length; i += MAX_CONCURRENT_CHECKS) {
        const batch = list.slice(i, i + MAX_CONCURRENT_CHECKS);
        log(`[dnstwist] Processing batch ${i / MAX_CONCURRENT_CHECKS + 1} of ${Math.ceil(list.length / MAX_CONCURRENT_CHECKS)}...`);
        
        await Promise.all(batch.map(async (entry) => {
            totalFindings++;
            const { mx: mxRecords, ns: nsRecords } = await getDnsRecords(entry.domain);
            const ctCerts = await checkCTLogs(entry.domain);
            const hasWildcard = await checkForWildcard(entry.domain);
            const phishingAnalysis = await analyzeWebPageForPhishing(entry.domain, job.domain);

            let score = 10;
            if (mxRecords.length > 0) score += 20;
            if (ctCerts.length > 0) score += 15;
            if (hasWildcard) score += 30;
            score += phishingAnalysis.score;
            
            let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
            if (score >= 70) severity = 'CRITICAL';
            else if (score >= 50) severity = 'HIGH';
            else if (score >= 25) severity = 'MEDIUM';

            const artifactId = await insertArtifact({
              type: 'typo_domain',
              val_text: `Potentially malicious typosquatted domain detected: ${entry.domain}`,
              severity,
              meta: { 
                scan_id: job.scanId,
                scan_module: 'dnstwist',
                typosquatted_domain: entry.domain,
                ips: [...(entry.dns_a || []), ...(entry.dns_aaaa || [])],
                mx_records: mxRecords,
                ns_records: nsRecords,
                ct_log_certs: ctCerts,
                has_wildcard_dns: hasWildcard,
                phishing_score: phishingAnalysis.score,
                phishing_evidence: phishingAnalysis.evidence,
                severity_score: score,
              }
            });

            if (severity === 'HIGH' || severity === 'CRITICAL') {
                await insertFinding(
                  artifactId,
                  'PHISHING_SETUP',
                  `Investigate and initiate takedown procedures for the suspected malicious domain ${entry.domain}.`,
                  `Domain shows signs of malicious activity (Phishing Score: ${phishingAnalysis.score}, Wildcard: ${hasWildcard}, MX Active: ${mxRecords.length > 0})`
                );
            }
        }));

        if (i + MAX_CONCURRENT_CHECKS < list.length) {
            await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
        }
    }
    
    log('[dnstwist] Completed scan, found', totalFindings, 'potentially active domains');
    return totalFindings;
    
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      log('[dnstwist] dnstwist command not found. Please ensure it is installed and in the PATH.');
      await insertArtifact({ type: 'scan_error', val_text: 'dnstwist command not found', severity: 'INFO', meta: { scan_id: job.scanId, scan_module: 'dnstwist' } });
    } else {
      log('[dnstwist] Error during scan:', (error as Error).message);
    }
    return 0;
  }
}
