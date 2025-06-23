/* =============================================================================
 * MODULE: tlsScan.ts (Rewritten with sslscan v8, 2025-06-22)
 * =============================================================================
 * Performs TLS/SSL configuration assessment using **sslscan** instead of testssl.sh.
 * sslscan is much more reliable, faster, and easier to integrate.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

/* ---------- Types --------------------------------------------------------- */

type Severity = 'OK' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'INFO';

interface SSLScanResult {
  host: string;
  port: number;
  certificate?: {
    subject: string;
    issuer: string;
    notBefore: string;
    notAfter: string;
    expired: boolean;
    selfSigned: boolean;
  };
  protocols: Array<{
    name: string;
    version: string;
    enabled: boolean;
  }>;
  ciphers: Array<{
    cipher: string;
    protocols: string[];
    keyExchange: string;
    authentication: string;
    encryption: string;
    bits: number;
    status: string;
  }>;
  vulnerabilities: string[];
}

interface ScanOutcome {
  findings: number;
  hadCert: boolean;
}

/* ---------- Config -------------------------------------------------------- */

const TLS_SCAN_TIMEOUT_MS = Number.parseInt(process.env.TLS_SCAN_TIMEOUT_MS ?? '120000', 10); // 2 min
const TLS_DERIVATION_PREFIXES = ['www']; // extend with 'app', 'login', etc. if needed

/* ---------- Helpers ------------------------------------------------------- */

/** Validate sslscan is available */
async function validateSSLScan(): Promise<boolean> {
  try {
    const result = await exec('sslscan', ['--version']);
    log(`[tlsScan] sslscan found: ${result.stdout?.trim() || 'version check ok'}`);
    return true;
  } catch (error) {
    log(`[tlsScan] [CRITICAL] sslscan binary not found: ${(error as Error).message}`);
    return false;
  }
}

/** Parse sslscan XML output */
function parseSSLScanOutput(xmlOutput: string, host: string): SSLScanResult | null {
  try {
    // For now, do basic text parsing. Could use xml2js later if needed.
    const result: SSLScanResult = {
      host,
      port: 443,
      protocols: [],
      ciphers: [],
      vulnerabilities: []
    };

    const lines = xmlOutput.split('\n');
    
    // Extract certificate info
    let certMatch = xmlOutput.match(/Subject:\s+(.+)/);
    if (certMatch) {
      const issuerMatch = xmlOutput.match(/Issuer:\s+(.+)/);
      const notBeforeMatch = xmlOutput.match(/Not valid before:\s+(.+)/);
      const notAfterMatch = xmlOutput.match(/Not valid after:\s+(.+)/);
      
      result.certificate = {
        subject: certMatch[1]?.trim() || '',
        issuer: issuerMatch?.[1]?.trim() || '',
        notBefore: notBeforeMatch?.[1]?.trim() || '',
        notAfter: notAfterMatch?.[1]?.trim() || '',
        expired: false, // Will calculate below
        selfSigned: xmlOutput.includes('self signed')
      };

      // Check if certificate is expired
      if (result.certificate.notAfter) {
        const expiryDate = new Date(result.certificate.notAfter);
        result.certificate.expired = expiryDate < new Date();
      }
    }

    // Extract protocol support
    if (xmlOutput.includes('SSLv2') && xmlOutput.match(/SSLv2\s+enabled/)) {
      result.vulnerabilities.push('SSLv2 enabled (deprecated)');
    }
    if (xmlOutput.includes('SSLv3') && xmlOutput.match(/SSLv3\s+enabled/)) {
      result.vulnerabilities.push('SSLv3 enabled (deprecated)');
    }
    if (xmlOutput.includes('TLSv1.0') && xmlOutput.match(/TLSv1\.0\s+enabled/)) {
      result.vulnerabilities.push('TLSv1.0 enabled (deprecated)');
    }

    // Extract weak ciphers
    if (xmlOutput.includes('RC4')) {
      result.vulnerabilities.push('RC4 cipher support detected');
    }
    if (xmlOutput.includes('DES') || xmlOutput.includes('3DES')) {
      result.vulnerabilities.push('Weak DES/3DES cipher support detected');
    }
    if (xmlOutput.includes('NULL')) {
      result.vulnerabilities.push('NULL cipher support detected');
    }

    // Check for missing certificate
    if (!result.certificate && !xmlOutput.includes('Certificate information')) {
      result.vulnerabilities.push('No SSL certificate presented');
    }

    return result;
    
  } catch (error) {
    log(`[tlsScan] Failed to parse sslscan output: ${(error as Error).message}`);
    return null;
  }
}

/** Get remediation advice for TLS issues */
function getTlsRecommendation(vulnerability: string): string {
  const recommendations: Record<string, string> = {
    'SSLv2 enabled': 'Disable SSLv2 completely - it has known security vulnerabilities',
    'SSLv3 enabled': 'Disable SSLv3 completely - vulnerable to POODLE attack',
    'TLSv1.0 enabled': 'Disable TLSv1.0 - use TLS 1.2 or higher only',
    'RC4 cipher': 'Disable RC4 ciphers - they are cryptographically weak',
    'DES/3DES cipher': 'Disable DES and 3DES ciphers - use AES instead',
    'NULL cipher': 'Disable NULL ciphers - they provide no encryption',
    'No SSL certificate': 'Install a valid SSL/TLS certificate from a trusted CA',
    'expired': 'Renew the SSL certificate immediately',
    'self signed': 'Replace self-signed certificate with one from a trusted CA'
  };

  for (const [key, recommendation] of Object.entries(recommendations)) {
    if (vulnerability.toLowerCase().includes(key.toLowerCase())) {
      return recommendation;
    }
  }
  
  return 'Review and update TLS configuration according to current security best practices';
}

/* ---------- Core host-scan routine ---------------------------------------- */

async function scanHost(host: string, scanId?: string): Promise<ScanOutcome> {
  let findingsCount = 0;
  let certificateSeen = false;

  try {
    log(`[tlsScan] Scanning ${host} with sslscan...`);
    
    const { stdout, stderr } = await exec('sslscan', [
      '--xml=-',  // Output XML to stdout
      '--no-colour',
      '--timeout=30',
      host
    ], { timeout: TLS_SCAN_TIMEOUT_MS });

    if (stderr) {
      log(`[tlsScan] sslscan stderr for ${host}: ${stderr}`);
    }

    const result = parseSSLScanOutput(stdout, host);
    if (!result) {
      log(`[tlsScan] Failed to parse results for ${host}`);
      return { findings: 0, hadCert: false };
    }

    certificateSeen = !!result.certificate;

    // Check certificate expiry
    if (result.certificate) {
      const cert = result.certificate;
      
      if (cert.expired) {
        findingsCount++;
        const artId = await insertArtifact({
          type: 'tls_certificate_expired',
          val_text: `${host} - SSL certificate expired`,
          severity: 'CRITICAL',
          meta: {
            host,
            certificate: cert,
            scan_id: scanId,
            scan_module: 'tlsScan'
          }
        });
        await insertFinding(
          artId,
          'CERTIFICATE_EXPIRY',
          'SSL certificate has expired - renew immediately',
          `Certificate for ${host} expired on ${cert.notAfter}`
        );
      } else if (cert.notAfter) {
        // Check if expiring soon
        const expiryDate = new Date(cert.notAfter);
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        
        let severity: Severity | null = null;
        if (daysUntilExpiry <= 14) {
          severity = 'HIGH';
        } else if (daysUntilExpiry <= 30) {
          severity = 'MEDIUM';
        } else if (daysUntilExpiry <= 90) {
          severity = 'LOW';
        }

        if (severity) {
          findingsCount++;
          const artId = await insertArtifact({
            type: 'tls_certificate_expiry',
            val_text: `${host} - SSL certificate expires in ${daysUntilExpiry} days`,
            severity,
            meta: {
              host,
              certificate: cert,
              days_remaining: daysUntilExpiry,
              scan_id: scanId,
              scan_module: 'tlsScan'
            }
          });
          await insertFinding(
            artId,
            'CERTIFICATE_EXPIRY',
            `Certificate expires in ${daysUntilExpiry} days - plan renewal`,
            `Certificate for ${host} expires on ${cert.notAfter}`
          );
        }
      }

      // Check for self-signed certificate
      if (cert.selfSigned) {
        findingsCount++;
        const artId = await insertArtifact({
          type: 'tls_self_signed',
          val_text: `${host} - Self-signed SSL certificate detected`,
          severity: 'MEDIUM',
          meta: {
            host,
            certificate: cert,
            scan_id: scanId,
            scan_module: 'tlsScan'
          }
        });
        await insertFinding(
          artId,
          'SELF_SIGNED_CERTIFICATE',
          'Replace self-signed certificate with one from a trusted CA',
          `Self-signed certificate detected for ${host}`
        );
      }
    }

    // Process vulnerabilities
    for (const vulnerability of result.vulnerabilities) {
      findingsCount++;
      
      let severity: Severity = 'MEDIUM';
      if (vulnerability.includes('SSLv2') || vulnerability.includes('SSLv3') || vulnerability.includes('No SSL certificate')) {
        severity = 'HIGH';
      } else if (vulnerability.includes('NULL') || vulnerability.includes('RC4')) {
        severity = 'HIGH';
      } else if (vulnerability.includes('TLSv1.0') || vulnerability.includes('DES')) {
        severity = 'MEDIUM';
      }

      const artId = await insertArtifact({
        type: 'tls_weakness',
        val_text: `${host} - ${vulnerability}`,
        severity,
        meta: {
          host,
          vulnerability,
          scan_id: scanId,
          scan_module: 'tlsScan'
        }
      });

      await insertFinding(
        artId,
        'TLS_CONFIGURATION_ISSUE',
        getTlsRecommendation(vulnerability),
        vulnerability
      );
    }

  } catch (error) {
    log(`[tlsScan] Scan failed for ${host}: ${(error as Error).message}`);
  }

  return { findings: findingsCount, hadCert: certificateSeen };
}

/* ---------- Public entry-point ------------------------------------------- */

export async function runTlsScan(job: { domain: string; scanId?: string }): Promise<number> {
  const input = job.domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*/, '');

  // Validate sslscan is available
  if (!(await validateSSLScan())) {
    await insertArtifact({
      type: 'scan_error',
      val_text: 'sslscan binary not found, TLS scan aborted',
      severity: 'HIGH',
      meta: { scan_id: job.scanId, scan_module: 'tlsScan' }
    });
    return 0;
  }

  // Derive base domain & host list
  const isWww = input.startsWith('www.');
  const baseDomain = isWww ? input.slice(4) : input;

  const candidates = new Set<string>();
  
  // Always scan the original host
  candidates.add(input);

  // Forward derivations (apex → prefixes)
  if (!isWww) {
    TLS_DERIVATION_PREFIXES.forEach((prefix) => candidates.add(`${prefix}.${baseDomain}`));
  }

  // Reverse derivation (www → apex)
  if (isWww) {
    candidates.add(baseDomain);
  }

  let totalFindings = 0;
  let anyCert = false;

  for (const host of candidates) {
    const { findings, hadCert } = await scanHost(host, job.scanId);
    totalFindings += findings;
    anyCert ||= hadCert;
  }

  /* Consolidated "no TLS at all" finding (only if *all* hosts lack cert) */
  if (!anyCert) {
    const artId = await insertArtifact({
      type: 'tls_no_certificate',
      val_text: `${baseDomain} - no valid SSL/TLS certificate on any host`,
      severity: 'HIGH',
      meta: {
        domain: baseDomain,
        scan_id: job.scanId,
        scan_module: 'tlsScan'
      }
    });
    await insertFinding(
      artId,
      'MISSING_TLS_CERTIFICATE',
      'Configure SSL/TLS certificates for all public hosts',
      'No valid SSL/TLS certificate found on any tested host variant'
    );
    totalFindings += 1;
  }

  /* Final summary artifact */
  await insertArtifact({
    type: 'scan_summary',
    val_text: `TLS scan complete - ${totalFindings} issue(s) found`,
    severity: 'INFO',
    meta: {
      domain: baseDomain,
      scan_id: job.scanId,
      scan_module: 'tlsScan',
      total_findings: totalFindings,
      hosts_scanned: Array.from(candidates),
      timestamp: new Date().toISOString()
    }
  });

  log(`[tlsScan] Scan complete. Hosts: ${[...candidates].join(', ')}. Findings: ${totalFindings}`);
  return totalFindings;
}