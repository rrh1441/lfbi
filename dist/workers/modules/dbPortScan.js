import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
const exec = promisify(execFile);
export async function runDbPortScan(job) {
    log('[dbPortScan] Starting database security scan for', job.domain);
    let findingsCount = 0;
    const targets = [
        { host: job.domain, port: '5432', type: 'PostgreSQL' },
        { host: job.domain, port: '3306', type: 'MySQL' },
        { host: job.domain, port: '1433', type: 'SQL Server' },
        { host: job.domain, port: '1521', type: 'Oracle' },
        { host: job.domain, port: '27017', type: 'MongoDB' },
        { host: job.domain, port: '6379', type: 'Redis' }
    ];
    for (const { host, port, type } of targets) {
        try {
            // Check if port is open first
            log(`[dbPortScan] Checking ${type} on ${host}:${port}`);
            // Quick port check
            try {
                await exec('timeout', ['3', 'bash', '-c', `echo | nc -w 1 ${host} ${port}`]);
                log(`[dbPortScan] Port ${port} is open on ${host}`);
                // Port is open, create artifact
                const artifactId = await insertArtifact({
                    type: 'db_service',
                    val_text: `${type} service exposed on ${host}:${port}`,
                    severity: 'HIGH',
                    meta: {
                        host,
                        port,
                        service_type: type,
                        scan_id: job.scanId,
                        scan_module: 'dbPortScan'
                    }
                });
                await insertFinding(artifactId, 'DATABASE_EXPOSURE', `Secure ${type} by restricting network access, implementing VPN, or using authentication. Database services should not be exposed to the internet.`, `${type} database service exposed on port ${port}`);
                findingsCount++;
                // Try banner grabbing for specific services
                if (port === '5432' || port === '3306') {
                    try {
                        const { stdout } = await exec('timeout', [
                            '5',
                            'bash',
                            '-c',
                            `echo | openssl s_client -connect ${host}:${port} 2>/dev/null`
                        ]);
                        if (stdout.includes('Neon') || stdout.includes('PostgreSQL')) {
                            await insertArtifact({
                                type: 'db_banner',
                                val_text: `${host} - Managed database service detected`,
                                severity: 'INFO',
                                meta: {
                                    provider: stdout.includes('Neon') ? 'neon' : 'postgresql',
                                    scan_id: job.scanId,
                                    scan_module: 'dbPortScan'
                                }
                            });
                        }
                    }
                    catch (bannerError) {
                        // Banner grab failed, continue
                    }
                }
                // Try credential brute force (limited attempts)
                if (port === '5432' || port === '3306') {
                    try {
                        const script = port === '5432' ? 'pgsql-brute' : 'mysql-brute';
                        const { stdout } = await exec('nmap', [
                            '-Pn',
                            '-p', port,
                            '--script', script,
                            '--script-args', 'brute.threads=2,brute.delay=2s',
                            host
                        ], {
                            timeout: 30000 // 30 second timeout
                        });
                        if (/Accounts:.+Valid:\s+[1-9]/i.test(stdout)) {
                            const credArtifactId = await insertArtifact({
                                type: 'vuln',
                                val_text: `Default/weak ${type} credentials found on ${host}:${port}`,
                                severity: 'CRITICAL',
                                src_url: `${host}:${port}`,
                                meta: {
                                    nmap_output: stdout,
                                    scan_id: job.scanId,
                                    scan_module: 'dbPortScan'
                                }
                            });
                            await insertFinding(credArtifactId, 'WEAK_CREDENTIALS', 'Change default database credentials immediately. Use strong, unique passwords and enable proper authentication.', `Default or weak ${type} credentials detected`);
                            findingsCount++;
                        }
                    }
                    catch (bruteError) {
                        log(`[dbPortScan] Brute force failed for ${host}:${port}:`, bruteError.message);
                    }
                }
            }
            catch (portError) {
                // Port is closed or filtered, which is good
            }
        }
        catch (error) {
            log(`[dbPortScan] Error scanning ${host}:${port}:`, error.message);
        }
    }
    log('[dbPortScan] Completed database scan, found', findingsCount, 'issues');
    return findingsCount;
}
//# sourceMappingURL=dbPortScan.js.map