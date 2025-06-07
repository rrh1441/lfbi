import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import axios from 'axios';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

// Check various DNS records
async function getDnsRecords(domain: string): Promise<{ mx: string[], ns: string[] }> {
    const records: { mx: string[], ns: string[] } = { mx: [], ns: [] };
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

// Check Certificate Transparency logs
async function checkCTLogs(domain: string): Promise<Array<{ issuer_name: string, not_before: string, not_after: string }>> {
    try {
        const url = `https://crt.sh/?q=%.${domain}&output=json`;
        const { data } = await axios.get(url, { timeout: 10000 });
        if (Array.isArray(data)) {
            return data.map(({ issuer_name, not_before, not_after }) => ({
                issuer_name,
                not_before,
                not_after
            })).slice(0, 5); // Return up to 5 recent certs
        }
    } catch (error) {
        log(`[dnstwist] CT log check failed for ${domain}:`, (error as Error).message);
    }
    return [];
}

// Optional: Check for phishing indicators on high-confidence domains
async function checkPhishingIndicators(domain: string, scanId?: string): Promise<void> {
    try {
        const { data: httpContent } = await axios.get(`http://${domain}`, { timeout: 5000 });
        if (typeof httpContent === 'string' && /<input[^>]+type=["']?password["']?|<form[^>]+login/i.test(httpContent)) {
            await insertArtifact({
                type: 'typo_phishing_suspected',
                val_text: `Suspected phishing page on typosquatted domain: ${domain}`,
                severity: 'CRITICAL',
                src_url: `http://${domain}`,
                meta: { scan_id: scanId, scan_module: 'dnstwist', evidence: 'Contains password or login form' }
            });
            await insertFinding(
                (await insertArtifact({ type: 'scan_info', val_text: 'Phishing Check', severity: 'INFO', meta: {} })).id,
                'PHISHING_SETUP',
                `Investigate and initiate takedown procedures for the suspected phishing domain ${domain}.`,
                `The domain ${domain} hosts a page with a login or password form.`
            );
        }
    } catch (error) {
        // Ignore HTTP errors, it's just a best-effort check
    }
}


export async function runDnsTwist(job: { domain: string; scanId?: string }): Promise<number> {
  log('[dnstwist] Starting enhanced typo-squatting scan for', job.domain);
  
  try {
    const { stdout } = await exec('dnstwist', ['-r', job.domain, '--format', 'json'], { timeout: 120000 }); // Increased timeout
    const list = JSON.parse(stdout) as Array<{ domain: string; dns_a?: string[]; dns_aaaa?: string[] }>;
    let findingsCount = 0;
    
    for (const entry of list) {
        const hasARecords = (entry.dns_a && entry.dns_a.length > 0) || (entry.dns_aaaa && entry.dns_aaaa.length > 0);
        const { mx: mxRecords, ns: nsRecords } = await getDnsRecords(entry.domain);
        const hasMxOrNs = mxRecords.length > 0 || nsRecords.length > 0;
        
        if (hasARecords || hasMxOrNs) {
            const ctCerts = await checkCTLogs(entry.domain);
            let severity: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

            if (hasMxOrNs && !hasARecords) severity = 'MEDIUM'; // Email setup without website
            if (hasARecords) severity = 'MEDIUM';
            if (ctCerts.length > 0) severity = severity === 'LOW' ? 'MEDIUM' : 'HIGH'; // Elevate if certs exist
            if (mxRecords.length > 0) severity = 'HIGH'; // Actively configured for email

            await insertArtifact({
              type: 'typo_domain',
              val_text: `Typosquatted domain detected: ${entry.domain}`,
              severity,
              meta: { 
                ips: [...(entry.dns_a || []), ...(entry.dns_aaaa || [])],
                mx_records: mxRecords,
                ns_records: nsRecords,
                ct_log_certs: ctCerts,
                potential_phishing_setup: mxRecords.length > 0,
                scan_id: job.scanId,
                scan_module: 'dnstwist'
              }
            });
            findingsCount++;

            // Optional: High-confidence phishing check
            if ((hasARecords && ctCerts.length > 0) || (hasARecords && mxRecords.length > 0)) {
                await checkPhishingIndicators(entry.domain, job.scanId);
            }
        }
    }
    
    log('[dnstwist] Completed typo-squatting scan, found', findingsCount, 'potentially active domains');
    return findingsCount;
    
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