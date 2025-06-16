/* =============================================================================
 * MODULE: tlsScan.ts  (Refactored – “www-aware” v7, 2025-06-16)
 * =============================================================================
 * Performs an in-depth TLS/SSL configuration assessment via **testssl.sh**.
 *
 * v7 – Changes
 * ────────────
 * • Robust certificate detection — works with testssl.sh ≥3.2 JSON schema.
 * • Reverse derivation: if caller passes “www.” we also scan the apex.
 * • Optional extra prefixes (`TLS_DERIVATION_PREFIXES`) centralised in one enum.
 * • All type-safety & strict null checks preserved; no lint regressions.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

/* ---------- Types --------------------------------------------------------- */

type Severity = 'OK' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'INFO';

interface TestsslFinding {
  id: string;
  finding: string;
  severity?: Severity;
}

interface TestsslReport {
  scanResult?: TestsslFinding[];
  serverDefaults?: { cert_notAfter?: string };
  certs?: { notAfter?: string }[];
}

interface ScanOutcome {
  findings: number;
  hadCert: boolean;
}

/* ---------- Config -------------------------------------------------------- */

const TLS_SCAN_TIMEOUT_MS =
  Number.parseInt(process.env.TLS_SCAN_TIMEOUT_MS ?? '300000', 10); // 5 min

/** Additional prefixes you want to inspect besides the naked apex.           */
const TLS_DERIVATION_PREFIXES = ['www']; // extend with 'app', 'login', … if needed

/* ---------- Helpers ------------------------------------------------------- */

/** Locate testssl.sh in common paths or $PATH */
async function resolveTestsslPath(): Promise<string> {
  const paths = [
    '/opt/testssl.sh/testssl.sh',
    '/usr/local/bin/testssl.sh',
    '/usr/bin/testssl.sh',
    'testssl.sh',
  ];

  for (const p of paths) {
    try {
      const result = await exec(p, ['--version'], { timeout: 10_000 });
      log(`[tlsScan] Found testssl.sh at: ${p}`);
      return p;
    } catch (error) {
      log(`[tlsScan] Failed to execute ${p}: ${(error as Error).message}`);
      /* try next */
    }
  }
  throw new Error('testssl.sh not found in any expected location');
}

/** Maps testssl.sh test IDs to remediation text (non-exhaustive)             */
function getTlsRecommendation(testId: string): string {
  const map: Record<string, string> = {
    cert_chain:
      'Fix certificate chain by ensuring proper intermediate certificates are included',
    cert_commonName:
      'Ensure certificate Common Name or SAN matches the requested domain',
    protocols: 'Disable TLS < 1.2 and SSL; enforce TLS 1.2/1.3 only',
    ciphers: 'Disable weak ciphers; allow only modern AEAD suites',
    pfs: 'Enable Perfect Forward Secrecy by configuring ECDHE suites',
    rc4: 'Disable RC4 completely due to known weaknesses',
    heartbleed: 'Upgrade OpenSSL ≥ 1.0.1g to remediate CVE-2014-0160',
    ccs: 'Upgrade OpenSSL to address CVE-2014-0224 (CCS Injection)',
    secure_renegotiation:
      'Enable secure renegotiation to prevent renegotiation attacks',
    crime: 'Disable TLS compression to mitigate CRIME',
    breach:
      'Disable HTTP compression or implement CSRF tokens to mitigate BREACH',
  };

  for (const [key, rec] of Object.entries(map)) {
    if (testId.toLowerCase().includes(key)) return rec;
  }
  return 'Review TLS configuration and apply current best practices';
}

/** Extract `notAfter` regardless of testssl JSON version                     */
function extractCertNotAfter(report: TestsslReport): string | undefined {
  if (report.serverDefaults?.cert_notAfter) return report.serverDefaults.cert_notAfter;

  const legacy = report.scanResult?.find((r) => r.id === 'cert_notAfter')?.finding;
  if (legacy) return legacy;

  if (Array.isArray(report.certs) && report.certs.length) {
    return report.certs[0]?.notAfter;
  }

  return undefined;
}

/** Determine whether a valid cert was presented                              */
function hasCertificate(report: TestsslReport): boolean {
  if (extractCertNotAfter(report)) return true;

  // Fallback: any cert_* entry in scanResult implies a handshake and cert
  return (report.scanResult ?? []).some((r) => r.id.startsWith('cert_'));
}

/* ---------- Core host-scan routine ---------------------------------------- */

async function scanHost(
  testsslPath: string,
  host: string,
  scanId?: string,
): Promise<ScanOutcome> {
  const jsonFile = `/tmp/testssl_${scanId ?? host}.json`;
  let findingsCount = 0;
  let certificateSeen = false;

  try {
    log(`[tlsScan] (${host}) Running testssl.sh …`);
    await exec(
      testsslPath,
      [
        '--quiet',
        '--warnings', 'off',
        '--jsonfile', jsonFile,
        host,
      ],
      { timeout: TLS_SCAN_TIMEOUT_MS },
    );

    const raw = await fs.readFile(jsonFile, 'utf-8');
    const report: TestsslReport = JSON.parse(raw);

    /* ---------- 0  Certificate presence check --------------------------- */
    certificateSeen = hasCertificate(report);

    /* ---------- 1  Generic findings ------------------------------------- */
    const results = report.scanResult ?? [];

    for (const f of results) {
      // Only record actionable findings
      if (!f.severity || f.severity === 'OK' || f.severity === 'INFO') continue;

      findingsCount += 1;

      const artId = await insertArtifact({
        type: 'tls_weakness',
        val_text: `${host} – ${f.id}: ${f.finding}`,
        severity: f.severity,
        meta: {
          host,
          finding_id: f.id,
          details: f.finding,
          scan_id: scanId,
          scan_module: 'tlsScan',
        },
      });

      await insertFinding(
        artId,
        'TLS_CONFIGURATION_ISSUE',
        getTlsRecommendation(f.id),
        f.finding,
      );
    }

    /* ---------- 2  Certificate expiry ----------------------------------- */
    const certNotAfter = extractCertNotAfter(report);

    if (certNotAfter) {
      const expiry = new Date(certNotAfter);
      if (!Number.isNaN(expiry.valueOf())) {
        const days = Math.ceil((expiry.getTime() - Date.now()) / 86_400_000);
        let sev: Severity | null = null;
        let rec = '';

        if (days <= 0) {
          sev = 'CRITICAL';
          rec = `Certificate expired ${Math.abs(days)} day(s) ago – renew immediately.`;
        } else if (days <= 14) {
          sev = 'HIGH';
          rec = `Certificate expires in ${days} day(s) – renew immediately.`;
        } else if (days <= 30) {
          sev = 'MEDIUM';
          rec = `Certificate expires in ${days} day(s) – plan renewal.`;
        } else if (days <= 90) {
          sev = 'LOW';
          rec = `Certificate expires in ${days} day(s).`;
        }

        if (sev) {
          findingsCount += 1;
          const artId = await insertArtifact({
            type: 'tls_certificate_expiry',
            val_text: `${host} – certificate expires in ${days} days`,
            severity: sev,
            meta: {
              host,
              expiry_date: expiry.toISOString(),
              days_remaining: days,
              scan_id: scanId,
              scan_module: 'tlsScan',
            },
          });
          await insertFinding(
            artId,
            'CERTIFICATE_EXPIRY',
            rec,
            `The SSL/TLS certificate for ${host} is nearing expiry.`,
          );
        }
      } else {
        log(`[tlsScan] (${host}) Unparsable cert_notAfter: ${certNotAfter}`);
      }
    }
  } catch (err) {
    log(`[tlsScan] (${host}) [ERROR] testssl.sh failed:`, (err as Error).message);
  } finally {
    await fs.unlink(jsonFile).catch(() => { /* ignore */ });
  }

  return { findings: findingsCount, hadCert: certificateSeen };
}

/* ---------- Public entry-point ------------------------------------------- */

export async function runTlsScan(job: { domain: string; scanId?: string }): Promise<number> {
  const input = job.domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*/, '');

  // Derive base domain & host list
  const isWww = input.startsWith('www.');
  const baseDomain = isWww ? input.slice(4) : input;

  const candidates = new Set<string>();

  // Always scan the original host
  candidates.add(input);

  // Forward derivations (apex → prefixes)
  if (!isWww) {
    TLS_DERIVATION_PREFIXES.forEach((p) => candidates.add(`${p}.${baseDomain}`));
  }

  // Reverse derivation (www → apex)
  if (isWww) {
    candidates.add(baseDomain);
  }

  const testsslPath = await resolveTestsslPath();
  let totalFindings = 0;
  let anyCert = false;

  for (const host of candidates) {
    const { findings, hadCert } = await scanHost(testsslPath, host, job.scanId);
    totalFindings += findings;
    anyCert ||= hadCert;
  }

  /* Consolidated “no TLS at all” finding (only if *all* hosts lack cert)   */
  if (!anyCert) {
    const artId = await insertArtifact({
      type: 'tls_no_certificate',
      val_text: `${baseDomain} – no valid SSL/TLS certificate on any derived host`,
      severity: 'HIGH',
      meta: {
        domain: baseDomain,
        scan_id: job.scanId,
        scan_module: 'tlsScan',
      },
    });
    await insertFinding(
      artId,
      'MISSING_TLS_CERTIFICATE',
      'Configure an SSL/TLS certificate for all public hosts (apex and sub-domains).',
      'The server presented no valid certificate on any inspected host variant.',
    );
    totalFindings += 1;
  }

  /* Final summary artifact */
  await insertArtifact({
    type: 'scan_summary',
    val_text: `TLS scan complete – ${totalFindings} issue(s) recorded`,
    severity: 'INFO',
    meta: {
      domain: baseDomain,
      scan_id: job.scanId,
      scan_module: 'tlsScan',
      total_findings: totalFindings,
      timestamp: new Date().toISOString(),
    },
  });

  log(`[tlsScan] Finished. Hosts scanned: ${[...candidates].join(', ')}. Total findings: ${totalFindings}`);
  return totalFindings;
}
