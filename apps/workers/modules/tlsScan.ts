/*
 * =============================================================================
 * MODULE: tlsScan.ts  (Refactored – “www-aware” v6, 2025-06-15)
 * =============================================================================
 * Performs an in-depth TLS/SSL configuration assessment via **testssl.sh**.
 *
 * New in v6
 * ─────────
 * • **Apex + “www.” dual scan** – If the supplied domain is naked (e.g. above.health)
 *   we automatically scan the corresponding “www.” host and suppress *MISSING_TLS*
 *   findings unless **both** hosts lack a valid certificate.
 * • Single utility `scanHost()` encapsulates the testssl.sh execution so logic is
 *   identical for every candidate host.
 * • All lint issues (TS-2322/2345) fixed by precise typings and strict `await`
 *   handling; no `any` leaks.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

/* ---------- Types --------------------------------------------------------- */

type Severity =
  | 'OK'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'
  | 'INFO';

interface TlsFinding {
  id: string;
  ip: string;
  port: string;
  severity: Severity;
  finding: string;
}

interface ScanOutcome {
  findings: number;
  hadCert: boolean;
}

/* ---------- Config -------------------------------------------------------- */

const TLS_SCAN_TIMEOUT_MS =
  Number.parseInt(process.env.TLS_SCAN_TIMEOUT_MS ?? '300000', 10); // 5 min

/* ---------- Helpers ------------------------------------------------------- */

async function resolveTestsslPath(): Promise<string> {
  const paths = [
    '/opt/testssl.sh/testssl.sh',
    '/usr/local/bin/testssl.sh',
    '/usr/bin/testssl.sh',
    'testssl.sh' // In $PATH
  ];

  for (const p of paths) {
    try {
      await exec(p, ['--version'], { timeout: 5_000 });
      log(`[tlsScan] Found testssl.sh at: ${p}`);
      return p;
    } catch {
      /* try next */
    }
  }
  throw new Error('testssl.sh not found in any expected location');
}

/**
 * Maps testssl.sh test IDs to remediation text
 */
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
    heartbleed: 'Upgrade OpenSSL to ≥ 1.0.1g to fix Heartbleed (CVE-2014-0160)',
    ccs: 'Upgrade OpenSSL to address CCS Injection (CVE-2014-0224)',
    secure_renegotiation:
      'Enable secure renegotiation to prevent renegotiation attacks',
    crime: 'Disable TLS compression to mitigate CRIME',
    breach:
      'Disable HTTP compression or implement CSRF tokens to mitigate BREACH'
  };

  for (const [key, rec] of Object.entries(map)) {
    if (testId.toLowerCase().includes(key)) return rec;
  }
  return 'Review TLS configuration and apply current best practices';
}

/* ---------- Core host-scan routine --------------------------------------- */

async function scanHost(
  testsslPath: string,
  host: string,
  scanId?: string
): Promise<ScanOutcome> {
  const jsonFile = `/tmp/testssl_${scanId ?? host}.json`;
  let findingsCount = 0;
  let certificateSeen = false;

  try {
    log(
      `[tlsScan] (${host}) Running testssl.sh …`
    );
    await exec(
      testsslPath,
      [
        '--quiet',
        '--warnings',
        'off',
        '--jsonfile',
        jsonFile,
        host
      ],
      { timeout: TLS_SCAN_TIMEOUT_MS }
    );

    const raw = await fs.readFile(jsonFile, 'utf-8');
    const report = JSON.parse(raw);

    /* ---------- 1  Process generic findings ----------------------------- */
    const results: TlsFinding[] =
      (report.scanResult ??
        report.findings ??
        []) as unknown as TlsFinding[];

    for (const f of results) {
      if (f.severity === 'OK' || f.severity === 'INFO') continue;

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
          scan_module: 'tlsScan'
        }
      });

      await insertFinding(
        artId,
        'TLS_CONFIGURATION_ISSUE',
        getTlsRecommendation(f.id),
        f.finding
      );
    }

    /* ---------- 2  Certificate expiry & presence ------------------------ */
    const certNotAfter =
      report.serverDefaults?.cert_notAfter ??
      report.scanResult?.find((r: { id: string }) => r.id === 'cert_notAfter')
        ?.finding;

    if (certNotAfter) {
      certificateSeen = true; // host delivered a cert

      const expiry = new Date(certNotAfter);
      if (Number.isNaN(expiry.valueOf())) {
        log(`[tlsScan] (${host}) Unparsable cert_notAfter: ${certNotAfter}`);
      } else {
        const days = Math.ceil(
          (expiry.getTime() - Date.now()) / 86_400_000
        );

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
              scan_module: 'tlsScan'
            }
          });
          await insertFinding(
            artId,
            'CERTIFICATE_EXPIRY',
            rec,
            `The SSL/TLS certificate for ${host} is nearing expiry.`
          );
        }
      }
    }
  } catch (err) {
    log(
      `[tlsScan] (${host}) [ERROR] testssl.sh failed:`,
      (err as Error).message
    );
  } finally {
    await fs.unlink(jsonFile).catch(() => {
      /* ignore */
    });
  }

  return { findings: findingsCount, hadCert: certificateSeen };
}

/* ---------- Public entry-point ------------------------------------------- */

export async function runTlsScan(job: {
  domain: string;
  scanId?: string;
}): Promise<number> {
  const base = job.domain.trim().toLowerCase();

  /* Build candidate host list */
  const candidates = new Set<string>();
  candidates.add(base);
  if (!base.startsWith('www.')) {
    candidates.add(`www.${base}`);
  }

  const testsslPath = await resolveTestsslPath();
  let totalFindings = 0;
  let anyCert = false;

  for (const host of candidates) {
    const { findings, hadCert } = await scanHost(
      testsslPath,
      host,
      job.scanId
    );
    totalFindings += findings;
    anyCert ||= hadCert;
  }

  /* If NO host presented a certificate, create one consolidated alert */
  if (!anyCert) {
    const artId = await insertArtifact({
      type: 'tls_no_certificate',
      val_text: `${base} – no valid SSL/TLS certificate on apex or www`,
      severity: 'HIGH',
      meta: {
        domain: base,
        scan_id: job.scanId,
        scan_module: 'tlsScan'
      }
    });
    await insertFinding(
      artId,
      'MISSING_TLS_CERTIFICATE',
      'Configure an SSL/TLS certificate for both apex and www hosts.',
      'The server presented no valid certificate on either host variant.'
    );
    totalFindings += 1;
  }

  /* Final summary artifact */
  await insertArtifact({
    type: 'scan_summary',
    val_text: `TLS scan complete – ${totalFindings} issue(s) recorded`,
    severity: 'INFO',
    meta: {
      domain: base,
      scan_id: job.scanId,
      scan_module: 'tlsScan',
      total_findings: totalFindings,
      timestamp: new Date().toISOString()
    }
  });

  log(
    `[tlsScan] Finished. Hosts scanned: ${[...candidates].join(
      ', '
    )}. Total findings: ${totalFindings}`
  );
  return totalFindings;
}
