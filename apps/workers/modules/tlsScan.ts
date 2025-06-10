/*
 * =============================================================================
 * MODULE: tlsScan.ts (Refactored)
 * =============================================================================
 * This module performs a deep TLS/SSL security configuration analysis using the
 * 'testssl.sh' script.
 *
 * Key Improvements from previous version:
 * 1.  **Reliable JSON Parsing:** The module now uses the JSON output from
 * testssl.sh instead of fragile stdout text parsing. This ensures all
 * findings are accurately captured.
 * 2.  **Precise Certificate Expiry:** The certificate check is no longer based on
 * a simple year match. It now calculates the exact days remaining until
 * expiration and creates tiered-severity findings based on urgency.
 * 3.  **Comprehensive Vulnerability Mapping:** It iterates through all findings
 * in the JSON report, creating detailed artifacts for each issue based on
 * its ID and severity, covering everything from weak protocols to specific
 * CVEs like Heartbleed.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);

// Represents a single finding from the testssl.sh JSON output.
interface TlsFinding {
    id: string;
    ip: string;
    port: string;
    severity: 'OK' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'INFO';
    finding: string;
}

const TLS_SCAN_TIMEOUT_MS = parseInt(process.env.TLS_SCAN_TIMEOUT_MS || '300000'); // 5 minutes default

/**
 * Resolves the testssl.sh binary path, similar to SpiderFoot resolver
 */
async function resolveTestsslPath(): Promise<string> {
    const possiblePaths = [
        '/opt/testssl.sh/testssl.sh',
        '/usr/local/bin/testssl.sh',
        '/usr/bin/testssl.sh',
        'testssl.sh' // In PATH
    ];

    for (const path of possiblePaths) {
        try {
            await exec(path, ['--version'], { timeout: 5000 });
            log(`[tlsScan] Found testssl.sh at: ${path}`);
            return path;
        } catch {
            // Continue to next path
        }
    }
    
    throw new Error('testssl.sh not found in any expected location');
}

export async function runTlsScan(job: { domain: string; scanId?: string }): Promise<number> {
    log('[tlsScan] Starting TLS/SSL security scan for', job.domain);
    const jsonOutputFile = `/tmp/testssl_${job.scanId || job.domain}.json`;
    let findingsCount = 0;

    try {
        const testsslPath = await resolveTestsslPath();
        
        log(`[tlsScan] Executing testssl.sh: ${testsslPath} --quiet --warnings off --jsonfile ${jsonOutputFile} ${job.domain}`);
        
        const result = await exec(testsslPath, [
            '--quiet',
            '--warnings', 'off',
            '--jsonfile', jsonOutputFile,
            job.domain
        ], {
            timeout: TLS_SCAN_TIMEOUT_MS
        });
        
        if (result.stderr) {
            log(`[tlsScan] testssl.sh stderr output:`, result.stderr);
        }
        if (result.stdout) {
            log(`[tlsScan] testssl.sh stdout (first 500 chars):`, result.stdout.substring(0, 500));
        }

        const reportData = await fs.readFile(jsonOutputFile, 'utf-8');
        const report = JSON.parse(reportData);
        
        // --- 1. Process all findings from the report with proper structure handling ---
        // testssl.sh JSON structure: scanResult is array of test objects with .id, .severity, .finding
        const findings: TlsFinding[] = (report.scanResult ?? report.findings ?? []) as TlsFinding[];
        
        log(`[tlsScan] Processing ${findings.length} findings from testssl.sh report`);
        
        for (const finding of findings) {
            // We only care about actionable findings, not "OK" or "INFO" statuses.
            // Note: "LOW" severity findings are intentionally included as they may be actionable
            if (finding.severity === 'OK' || finding.severity === 'INFO') {
                continue;
            }

            findingsCount++;
            const artifactId = await insertArtifact({
                type: 'tls_weakness',
                val_text: `${job.domain} - ${finding.id}: ${finding.finding}`,
                severity: finding.severity,
                meta: {
                    finding_id: finding.id,
                    details: finding.finding,
                    scan_id: job.scanId,
                    scan_module: 'tlsScan'
                }
            });
            
            await insertFinding(
                artifactId,
                'TLS_CONFIGURATION_ISSUE',
                getTlsRecommendation(finding.id),
                finding.finding
            );
        }
        
        // --- 2. Perform precise certificate expiration check ---
        // Check both serverDefaults and scanResult for certificate info
        let certInfo = report.serverDefaults?.cert_notAfter || 
                      report.scanResult?.find((r: any) => r.id === 'cert_notAfter')?.finding;
        
        if (certInfo) {
            try {
                const expiryDate = new Date(certInfo);
                const today = new Date();
                const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                
                let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | null = null;
                let recommendation = '';

                if (daysUntilExpiry <= 0) {
                    severity = 'CRITICAL';
                    recommendation = `Certificate expired ${Math.abs(daysUntilExpiry)} days ago. Renew immediately to prevent service disruption and security warnings.`;
                } else if (daysUntilExpiry <= 14) {
                    severity = 'HIGH';
                    recommendation = `Certificate expires in ${daysUntilExpiry} days. Renew immediately.`;
                } else if (daysUntilExpiry <= 30) {
                    severity = 'MEDIUM';
                    recommendation = `Certificate expires in ${daysUntilExpiry} days. Plan renewal soon.`;
                } else if (daysUntilExpiry <= 90) {
                    severity = 'LOW';
                    recommendation = `Certificate expires in ${daysUntilExpiry} days. No immediate action needed, but be aware of the upcoming renewal.`;
                }

                if (severity) {
                    findingsCount++;
                    const artifactId = await insertArtifact({
                        type: 'tls_certificate_expiry',
                        val_text: `${job.domain} - SSL certificate expires in ${daysUntilExpiry} days`,
                        severity: severity,
                        meta: {
                            expiry_date: expiryDate.toISOString(),
                            days_remaining: daysUntilExpiry,
                            scan_id: job.scanId,
                            scan_module: 'tlsScan'
                        }
                    });
                    await insertFinding(artifactId, 'CERTIFICATE_EXPIRY', recommendation, `The SSL/TLS certificate for ${job.domain} is nearing its expiration date.`);
                }
            } catch (dateError) {
                log(`[tlsScan] Warning: Could not parse certificate expiry date: ${certInfo}`);
            }
        } else {
            // No certificate found - create explicit artifact
            log(`[tlsScan] No certificate information found for ${job.domain}`);
            findingsCount++;
            const artifactId = await insertArtifact({
                type: 'tls_no_certificate',
                val_text: `${job.domain} - No SSL/TLS certificate found`,
                severity: 'HIGH',
                meta: {
                    scan_id: job.scanId,
                    scan_module: 'tlsScan',
                    reason: 'No certificate presented by server'
                }
            });
            await insertFinding(
                artifactId, 
                'MISSING_TLS_CERTIFICATE', 
                'Configure SSL/TLS certificate for this domain to enable encrypted connections',
                'The server did not present any SSL/TLS certificate'
            );
        }

        log(`[tlsScan] Completed TLS scan, found ${findingsCount} issues`);

    } catch (error) {
        log('[tlsScan] [ERROR] Error during scan:', (error as Error).message);
        await insertArtifact({
            type: 'scan_error',
            val_text: 'TLS scan failed to execute.',
            severity: 'HIGH',
            meta: {
                scan_id: job.scanId,
                scan_module: 'tlsScan',
                error: (error as Error).message
            }
        });
    } finally {
        // Ensure the temporary JSON file is cleaned up.
        await fs.unlink(jsonOutputFile).catch(err => {
            log(`[tlsScan] [WARNING] Failed to delete temp file: ${jsonOutputFile}`, err.message);
        });
    }
    
    // Add completion tracking artifact regardless of success or failure.
    await insertArtifact({
        type: 'scan_summary',
        val_text: `TLS scan completed: ${findingsCount} issues found`,
        severity: 'INFO',
        meta: {
            scan_id: job.scanId,
            scan_module: 'tlsScan',
            total_findings: findingsCount,
            timestamp: new Date().toISOString()
        }
    });

    return findingsCount;
}

/**
 * Maps testssl.sh test IDs to specific recommendations
 */
function getTlsRecommendation(testId: string): string {
    const recommendations: Record<string, string> = {
        'cert_chain': 'Fix certificate chain by ensuring proper intermediate certificates are included',
        'cert_commonName': 'Ensure certificate Common Name or SAN matches the requested domain',
        'protocols': 'Disable weak protocols (SSL 2.0, SSL 3.0, TLS 1.0, TLS 1.1) and use TLS 1.2+',
        'ciphers': 'Disable weak ciphers and cipher suites, use strong AEAD ciphers',
        'pfs': 'Enable Perfect Forward Secrecy by configuring ECDHE cipher suites',
        'rc4': 'Disable RC4 cipher completely due to known weaknesses',
        'heartbleed': 'Update OpenSSL to version 1.0.1g or later to fix Heartbleed vulnerability',
        'ccs': 'Update OpenSSL to fix CCS Injection vulnerability (CVE-2014-0224)',
        'secure_renegotiation': 'Enable secure renegotiation to prevent renegotiation attacks',
        'crime': 'Disable TLS compression to prevent CRIME attacks',
        'breach': 'Disable HTTP compression or implement proper CSRF protection for BREACH mitigation'
    };

    // Find matching recommendation
    for (const [key, recommendation] of Object.entries(recommendations)) {
        if (testId.toLowerCase().includes(key.toLowerCase())) {
            return recommendation;
        }
    }

    return 'Review TLS configuration and apply security best practices according to current standards';
}
