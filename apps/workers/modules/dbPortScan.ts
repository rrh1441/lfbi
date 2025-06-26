/*
 * =============================================================================
 * MODULE: dbPortScan.ts (Refactored v2)
 * =============================================================================
 * This module scans for exposed database services, identifies their versions,
 * and checks for known vulnerabilities and common misconfigurations.
 *
 * Key Improvements from previous version:
 * 1.  **Dependency Validation:** Checks for `nmap` and `nuclei` before running.
 * 2.  **Concurrency Control:** Scans multiple targets in parallel for performance.
 * 3.  **Dynamic Vulnerability Scanning:** Leverages `nuclei` for up-to-date
 * vulnerability and misconfiguration scanning.
 * 4.  **Enhanced Service Detection:** Uses `nmap -sV` for accurate results.
 * 5.  **Expanded Configuration Checks:** The list of nmap scripts has been expanded.
 * 6.  **Progress Tracking:** Logs scan progress for long-running jobs.
 * =============================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { XMLParser } from 'fast-xml-parser';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);
const xmlParser = new XMLParser({ ignoreAttributes: false });

// REFACTOR: Concurrency control for scanning multiple targets.
const MAX_CONCURRENT_SCANS = 4;

interface Target {
  host: string;
  port: string;
}

interface JobData {
  domain: string;
  scanId?: string;
  targets?: Target[];
}

const PORT_TO_TECH_MAP: Record<string, string> = {
    '5432': 'PostgreSQL',
    '3306': 'MySQL',
    '1433': 'MSSQL',
    '27017': 'MongoDB',
    '6379': 'Redis',
    '8086': 'InfluxDB',
    '9200': 'Elasticsearch',
    '11211': 'Memcached'
};

/**
 * REFACTOR: Validates that required external tools (nmap, nuclei) are installed.
 */
async function validateDependencies(): Promise<{ nmap: boolean; nuclei: boolean }> {
    log('[dbPortScan] Validating dependencies...');
    const checks = await Promise.allSettled([
        exec('nmap', ['--version']),
        exec('nuclei', ['-version'])
    ]);
    const nmapOk = checks[0].status === 'fulfilled';
    const nucleiOk = checks[1].status === 'fulfilled';

    if (!nmapOk) log('[dbPortScan] [CRITICAL] nmap binary not found. Scans will be severely limited.');
    if (!nucleiOk) log('[dbPortScan] [CRITICAL] nuclei binary not found. Dynamic vulnerability scanning is disabled.');

    return { nmap: nmapOk, nuclei: nucleiOk };
}

function getCloudProvider(host: string): string | null {
  if (host.endsWith('.rds.amazonaws.com')) return 'AWS RDS';
  if (host.endsWith('.postgres.database.azure.com')) return 'Azure SQL';
  if (host.endsWith('.sql.azuresynapse.net')) return 'Azure Synapse';
  if (host.endsWith('.db.ondigitalocean.com')) return 'DigitalOcean Managed DB';
  if (host.endsWith('.cloud.timescale.com')) return 'Timescale Cloud';
  if (host.includes('.gcp.datagrid.g.aivencloud.com')) return 'Aiven (GCP)';
  if (host.endsWith('.neon.tech')) return 'Neon';
  return null;
}

async function runNmapScripts(host: string, port: string, type: string, scanId?: string): Promise<void> {
    const scripts: Record<string, string[]> = {
        'MySQL': ['mysql-info', 'mysql-enum', 'mysql-empty-password', 'mysql-vuln-cve2012-2122'],
        'PostgreSQL': ['pgsql-info', 'pgsql-empty-password'],
        'MongoDB': ['mongodb-info', 'mongodb-databases'],
        'Redis': ['redis-info'],
        'MSSQL': ['ms-sql-info', 'ms-sql-empty-password', 'ms-sql-config'],
        'InfluxDB': ['http-enum', 'http-methods'],
        'Elasticsearch': ['http-enum', 'http-methods'],
        'Memcached': ['memcached-info']
    };
    const relevantScripts = scripts[type] || ['banner', 'version']; // Default handler for unknown types

    log(`[dbPortScan] Running Nmap scripts (${relevantScripts.join(',')}) on ${host}:${port}`);
    try {
        const { stdout } = await exec('nmap', ['-Pn', '-p', port, '--script', relevantScripts.join(','), '-oX', '-', host], { timeout: 120000 });
        const result = xmlParser.parse(stdout);
        const scriptOutputs = result?.nmaprun?.host?.ports?.port?.script;
        
        if (!scriptOutputs) return;
        
        for (const script of Array.isArray(scriptOutputs) ? scriptOutputs : [scriptOutputs]) {
            if (script['@_id'] === 'mysql-empty-password' && script['@_output'].includes("root account has empty password")) {
                const artifactId = await insertArtifact({ type: 'db_auth_weakness', val_text: `MySQL root has empty password on ${host}:${port}`, severity: 'CRITICAL', meta: { scan_id: scanId, scan_module: 'dbPortScan', host, port, script: script['@_id'] } });
                await insertFinding(artifactId, 'WEAK_CREDENTIALS', 'Set a strong password for the MySQL root user immediately.', 'Empty root password on an exposed database instance.');
            }
            if (script['@_id'] === 'mongodb-databases') {
                // Handle both elem array and direct output cases
                const hasDatabaseInfo = script.elem?.some((e: any) => e.key === 'databases') || 
                                       script['@_output']?.includes('databases');
                if (hasDatabaseInfo) {
                    const artifactId = await insertArtifact({ type: 'db_misconfiguration', val_text: `MongoDB databases are listable without authentication on ${host}:${port}`, severity: 'HIGH', meta: { scan_id: scanId, scan_module: 'dbPortScan', host, port, script: script['@_id'], output: script['@_output'] } });
                    await insertFinding(artifactId, 'DATABASE_EXPOSURE', 'Configure MongoDB to require authentication to list databases and perform other operations.', 'Database enumeration possible due to missing authentication.');
                }
            }
            if (script['@_id'] === 'memcached-info' && script['@_output']?.includes('version')) {
                const artifactId = await insertArtifact({ type: 'db_service', val_text: `Memcached service exposed on ${host}:${port}`, severity: 'MEDIUM', meta: { scan_id: scanId, scan_module: 'dbPortScan', host, port, script: script['@_id'], output: script['@_output'] } });
                await insertFinding(artifactId, 'DATABASE_EXPOSURE', 'Secure Memcached by binding to localhost only and configuring SASL authentication.', 'Memcached service exposed without authentication.');
            }
        }
    } catch (error) {
        log(`[dbPortScan] Nmap script scan failed for ${host}:${port}:`, (error as Error).message);
    }
}

async function runNucleiForDb(host: string, port: string, type: string, scanId?: string): Promise<void> {
    const techTag = type.toLowerCase();
    log(`[dbPortScan] Running Nuclei scan on ${host}:${port} for technology: ${techTag}`);

    try {
        // REFACTOR: Using tags is more resilient than specific template paths.
        const { stdout } = await exec('nuclei', [
            '-u', `${host}:${port}`,
            '-json',
            '-silent',
            '-t', '/opt/nuclei-templates',
            '-timeout', '5',
            '-retries', '1',
            '-tags', `cve,misconfiguration,default-credentials,${techTag}`
        ], { timeout: 300000 });

        const findings = stdout.trim().split('\n').filter(Boolean);
        for (const line of findings) {
            const vuln = JSON.parse(line);
            const severity = (vuln.info.severity.toUpperCase() as any) || 'INFO';
            const cve = (vuln.info.classification?.['cve-id']?.[0] || '').toUpperCase();

            const artifactId = await insertArtifact({
                type: 'vuln',
                val_text: `${vuln.info.name} on ${host}:${port}`,
                severity,
                src_url: cve ? `https://nvd.nist.gov/vuln/detail/${cve}` : vuln.info.reference?.[0],
                meta: {
                    scan_id: scanId,
                    scan_module: 'dbPortScan:nuclei',
                    template_id: vuln['template-id'],
                    vulnerability: vuln.info,
                    host,
                    port
                }
            });
            await insertFinding(artifactId, 'KNOWN_VULNERABILITY', `Remediate based on Nuclei finding details for ${vuln['template-id']}.`, vuln.info.description);
        }
    } catch (error) {
        if ((error as any).stderr && !(error as any).stderr.includes('no templates were loaded')) {
           log(`[dbPortScan] Nuclei scan failed for ${host}:${port}:`, (error as Error).message);
        }
    }
}

/**
 * REFACTOR: Logic for scanning a single target, designed to be run concurrently.
 */
async function scanTarget(target: Target, totalTargets: number, scanId?: string, findingsCount?: { count: number }): Promise<void> {
    const { host, port } = target;
    if (!findingsCount) {
        log(`[dbPortScan] Warning: findingsCount not provided for ${host}:${port}`);
        return;
    }
    
    log(`[dbPortScan] [${findingsCount.count + 1}/${totalTargets}] Scanning ${host}:${port}...`);

    try {
        const { stdout } = await exec('nmap', ['-sV', '-Pn', '-p', port, host, '-oX', '-'], { timeout: 60000 });
        const result = xmlParser.parse(stdout);
        
        const portInfo = result?.nmaprun?.host?.ports?.port;
        if (portInfo?.state?.['@_state'] !== 'open') {
            return; // Port is closed, no finding.
        }

        const service = portInfo.service;
        const serviceProduct = service?.['@_product'] || PORT_TO_TECH_MAP[port] || 'Unknown';
        const serviceVersion = service?.['@_version'] || 'unknown';
        
        log(`[dbPortScan] [OPEN] ${host}:${port} is running ${serviceProduct} ${serviceVersion}`);
        findingsCount.count++; // Increment directly without alias
        
        const cloudProvider = getCloudProvider(host);
        const artifactId = await insertArtifact({
            type: 'db_service',
            val_text: `${serviceProduct} service exposed on ${host}:${port}`,
            severity: 'HIGH',
            meta: { host, port, service_type: serviceProduct, version: serviceVersion, cloud_provider: cloudProvider, scan_id: scanId, scan_module: 'dbPortScan' }
        });
        
        let recommendation = `Secure ${serviceProduct} by restricting network access. Use a firewall, VPN, or IP allow-listing.`;
        if (cloudProvider) {
            recommendation = `Secure ${serviceProduct} on ${cloudProvider} by reviewing security group/firewall rules and checking IAM policies.`;
        }
        await insertFinding(artifactId, 'DATABASE_EXPOSURE', recommendation, `${serviceProduct} service exposed to the internet.`);
        
        await runNmapScripts(host, port, serviceProduct, scanId);
        await runNucleiForDb(host, port, serviceProduct, scanId);

    } catch (error) {
       log(`[dbPortScan] Error scanning ${host}:${port}:`, (error as Error).message);
    }
}


export async function runDbPortScan(job: JobData): Promise<number> {
  log('[dbPortScan] Starting enhanced database security scan for', job.domain);
  
  const { nmap } = await validateDependencies();
  if (!nmap) {
      log('[dbPortScan] CRITICAL: nmap is not available. Aborting scan.');
      return 0;
  }

  const defaultPorts = Object.keys(PORT_TO_TECH_MAP);
  const targets: Target[] = job.targets?.length ? job.targets : defaultPorts.map(port => ({ host: job.domain, port }));
  
  const findingsCounter = { count: 0 };

  // REFACTOR: Process targets in concurrent chunks for performance.
  for (let i = 0; i < targets.length; i += MAX_CONCURRENT_SCANS) {
      const chunk = targets.slice(i, i + MAX_CONCURRENT_SCANS);
      await Promise.all(
          chunk.map(target => scanTarget(target, targets.length, job.scanId, findingsCounter))
      );
  }

  log('[dbPortScan] Completed database scan, found', findingsCounter.count, 'exposed services');
  await insertArtifact({
    type: 'scan_summary',
    val_text: `Database port scan completed: ${findingsCounter.count} exposed services found`,
    severity: 'INFO',
    meta: {
      scan_id: job.scanId,
      scan_module: 'dbPortScan',
      total_findings: findingsCounter.count,
      targets_scanned: targets.length,
      timestamp: new Date().toISOString()
    }
  });
  
  return findingsCounter.count;
}
