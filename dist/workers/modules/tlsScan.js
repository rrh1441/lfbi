import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
const exec = promisify(execFile);
export async function runTlsScan(job) {
    log('[tlsScan] Starting TLS/SSL security scan for', job.domain);
    try {
        const { stdout } = await exec('testssl.sh', [
            '--quiet',
            '--warnings',
            '--jsonfile-pretty', '/tmp/testssl.json',
            job.domain
        ], {
            timeout: 120000 // 2 minute timeout
        });
        let findingsCount = 0;
        // Check for weak protocols
        if (/TLSv1[01]/.test(stdout) || /RC4|3DES/.test(stdout)) {
            const artifactId = await insertArtifact({
                type: 'tls_weak',
                val_text: `${job.domain} - Weak TLS configuration detected`,
                severity: 'MEDIUM',
                meta: {
                    finding: 'legacy ciphers or protocols',
                    scan_id: job.scanId,
                    scan_module: 'tlsScan'
                }
            });
            await insertFinding(artifactId, 'TLS_SECURITY', 'Upgrade to TLS 1.2+ and disable weak ciphers (RC4, 3DES). Update server configuration to only allow secure cipher suites.', 'Legacy TLS protocols or weak ciphers detected');
            findingsCount++;
        }
        // Check for certificate expiration
        const certMatch = stdout.match(/Certificate valid until:.*\b(2[0-2]\d{2})\b/);
        if (certMatch) {
            const year = Number(certMatch[1]);
            const currentYear = new Date().getFullYear();
            if (year <= currentYear) {
                const artifactId = await insertArtifact({
                    type: 'tls_expires_soon',
                    val_text: `${job.domain} - SSL certificate expires in ${year}`,
                    severity: year < currentYear ? 'HIGH' : 'LOW',
                    meta: {
                        expiry_year: year,
                        scan_id: job.scanId,
                        scan_module: 'tlsScan'
                    }
                });
                await insertFinding(artifactId, 'CERTIFICATE_EXPIRY', 'Renew SSL certificate before expiration to avoid service interruption. Set up automatic renewal if possible.', `SSL certificate expires in ${year}`);
                findingsCount++;
            }
        }
        // Check for additional vulnerabilities
        if (/VULNERABLE/.test(stdout)) {
            const artifactId = await insertArtifact({
                type: 'tls_vulnerability',
                val_text: `${job.domain} - TLS vulnerability detected`,
                severity: 'HIGH',
                meta: {
                    scan_id: job.scanId,
                    scan_module: 'tlsScan'
                }
            });
            await insertFinding(artifactId, 'TLS_VULNERABILITY', 'Review and patch TLS implementation. Update server software and configuration.', 'TLS vulnerability detected by testssl.sh');
            findingsCount++;
        }
        log('[tlsScan] Completed TLS scan, found', findingsCount, 'issues');
        return findingsCount;
    }
    catch (error) {
        log('[tlsScan] Error during scan:', error.message);
        return 0;
    }
}
//# sourceMappingURL=tlsScan.js.map