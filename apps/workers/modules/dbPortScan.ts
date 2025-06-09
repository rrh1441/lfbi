import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { XMLParser } from 'fast-xml-parser';
import semver from 'semver';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';
import { log } from '../core/logger.js';

const exec = promisify(execFile);
const xmlParser = new XMLParser();

// Hardcoded CVE lookup table (expandable)
const CVE_DATABASE = {
  "MySQL": [
    { range: "<=5.7.20", cve: "CVE-2016-6662", summary: "Remote Code Execution via my.cnf", severity: "CRITICAL" },
    { range: ">=8.0.0 <=8.0.18", cve: "CVE-2019-2900", summary: "Denial of Service", severity: "HIGH" }
  ],
  "PostgreSQL": [
    { range: "<=9.6.10", cve: "CVE-2018-1058", summary: "Authentication Bypass", severity: "CRITICAL" }
  ],
  "Redis": [
    { range: "<=5.0.5", cve: "CVE-2019-10192", summary: "Lua Sandbox Escape", severity: "CRITICAL" }
  ],
  "MongoDB": [
    { range: "<3.6.13", cve: "CVE-2019-2386", summary: "Authentication Bypass", severity: "HIGH" }
  ]
};

interface Target {
  host: string;
  port: string;
  type?: string;
}

interface JobData {
  domain: string;
  scanId?: string;
  targets?: Target[];
}

function getCloudProvider(host: string): string | null {
  if (host.endsWith('.rds.amazonaws.com')) return 'AWS RDS';
  if (host.endsWith('.postgres.database.azure.com')) return 'Azure SQL';
  if (host.endsWith('.neon.tech')) return 'Neon';
  if (host.endsWith('.db.ondigitalocean.com')) return 'DigitalOcean';
  return null;
}

async function lookupKnownVulnerabilities(serviceName: string, version: string, scanId?: string, host?: string, port?: string) {
  const serviceCVEs = CVE_DATABASE[serviceName as keyof typeof CVE_DATABASE];
  if (!serviceCVEs || !semver.valid(version)) return;

  log(`[dbPortScan] Checking for known CVEs for ${serviceName} version ${version}`);
  for (const vuln of serviceCVEs) {
    if (semver.satisfies(version, vuln.range)) {
      log(`[dbPortScan] Found known vulnerability ${vuln.cve} for version ${version}`);
      const artifactId = await insertArtifact({
        type: 'db_known_vuln',
        val_text: `Known vulnerability ${vuln.cve} found for ${serviceName} ${version}`,
        severity: vuln.severity as any,
        src_url: `https://nvd.nist.gov/vuln/detail/${vuln.cve}`,
        meta: {
          scan_id: scanId,
          scan_module: 'dbPortScan',
          host,
          port,
          cve: vuln.cve,
          summary: vuln.summary,
          version,
        }
      });
      await insertFinding(artifactId, 'KNOWN_VULNERABILITY', `Upgrade ${serviceName} to a patched version to mitigate ${vuln.cve}.`, vuln.summary);
    }
  }
}

async function runNmapScripts(host: string, port: string, type: string, scanId?: string): Promise<void> {
    const scripts: Record<string, string[]> = {
        'MySQL': ['mysql-info', 'mysql-empty-password', 'mysql-vuln-cve2012-2122'],
        'PostgreSQL': ['pgsql-info', 'pgsql-empty-password'],
        'MongoDB': ['mongodb-info', 'mongodb-databases'],
        'Redis': ['redis-info', 'redis-server-status']
    };

    const relevantScripts = scripts[type];
    if (!relevantScripts) return;

    log(`[dbPortScan] Running Nmap scripts (${relevantScripts.join(',')}) on ${host}:${port}`);

    try {
        const { stdout } = await exec('nmap', ['-Pn', '-p', port, '--script', relevantScripts.join(','), '-oX', '-', host], { timeout: 60000 });
        const result = xmlParser.parse(stdout);
        const portInfo = result?.nmaprun?.host?.ports?.port;
        const scriptOutputs = portInfo?.script;
        
        if (scriptOutputs) {
            for (const script of Array.isArray(scriptOutputs) ? scriptOutputs : [scriptOutputs]) {
                const scriptId = script.id;
                const scriptOutput = script.output;

                if (scriptId === 'mysql-empty-password' && scriptOutput.includes("root account has empty password")) {
                    const artifactId = await insertArtifact({ type: 'db_auth_weakness', val_text: `MySQL root has empty password on ${host}:${port}`, severity: 'CRITICAL', meta: { scan_id: scanId, scan_module: 'dbPortScan', host, port, script: scriptId } });
                    await insertFinding(artifactId, 'WEAK_CREDENTIALS', 'Set a strong password for the root user immediately.', 'Empty root password');
                }
                
                if (scriptId === 'mongodb-databases' && script.elem?.some((e: any) => e.key === 'databases')) {
                    const artifactId = await insertArtifact({ type: 'db_misconfiguration', val_text: `MongoDB databases are listable on ${host}:${port}`, severity: 'HIGH', meta: { scan_id: scanId, scan_module: 'dbPortScan', host, port, script: scriptId, output: scriptOutput } });
                    await insertFinding(artifactId, 'DATABASE_EXPOSURE', 'Configure MongoDB to require authentication to list databases.', 'Database enumeration');
                }

                const versionMatch = scriptOutput.match(/version:\s*([\d.]+)/i);
                if (versionMatch?.[1]) {
                    await lookupKnownVulnerabilities(type, versionMatch[1], scanId, host, port);
                }
            }
        }

    } catch (error) {
        log(`[dbPortScan] Nmap script scan failed for ${host}:${port}:`, (error as Error).message);
    }
}


export async function runDbPortScan(job: JobData): Promise<number> {
  log('[dbPortScan] Starting enhanced database security scan for', job.domain);
  let findingsCount = 0;

  const defaultTargets = [
    { host: job.domain, port: '5432', type: 'PostgreSQL' },
    { host: job.domain, port: '3306', type: 'MySQL' },
    { host: job.domain, port: '27017', type: 'MongoDB' },
    { host: job.domain, port: '6379', type: 'Redis' },
  ];

  const targets = job.targets?.length ? job.targets : defaultTargets;

  for (const target of targets) {
    const { host, port } = target;
    let { type } = target;

    try {
      await exec('nc', ['-z', '-w', '3', host, port]);
      log(`[dbPortScan] Port ${port} is open on ${host}`);

      let banner = '';
      try {
        const { stdout } = await exec('ncat', ['-w', '2', host, port]);
        banner = stdout.trim();
      } catch (e) {
        // ncat failed, try openssl for SSL services
        if (['5432', '1433'].includes(port)) {
            try {
                const { stdout } = await exec('openssl', ['s_client', '-connect', `${host}:${port}`], { timeout: 3000 });
                banner = stdout;
            } catch (sslErr) {
                log('[dbPortScan] Banner grabbing failed for', `${host}:${port}`);
            }
        }
      }

      // Infer type from banner if not provided
      if (!type) {
        if (banner.toLowerCase().includes('mysql')) type = 'MySQL';
        else if (banner.toLowerCase().includes('postgresql')) type = 'PostgreSQL';
        else if (banner.toLowerCase().includes('redis')) type = 'Redis';
        else if (banner.toLowerCase().includes('mongodb')) type = 'MongoDB';
        else type = 'Unknown DB';
      }

      const cloudProvider = getCloudProvider(host);

      const artifactId = await insertArtifact({
        type: 'db_service',
        val_text: `${type} service exposed on ${host}:${port}`,
        severity: 'HIGH',
        meta: { host, port, service_type: type, banner, cloud_provider: cloudProvider, scan_id: job.scanId, scan_module: 'dbPortScan' }
      });
      
      let recommendation = `Secure ${type} by restricting network access. Use a firewall, VPN, or IP allow-listing.`;
      if (cloudProvider) {
          recommendation = `Secure ${type} on ${cloudProvider} by reviewing security group/firewall rules and checking IAM policies.`
      }
      await insertFinding(artifactId, 'DATABASE_EXPOSURE', recommendation, `${type} service exposed`);
      findingsCount++;

      // Version detection and CVE lookup from banner
      const versionMatch = banner.match(/(?:(\d+\.\d+\.\d+)|(\d+\.\d+))/);
      if (versionMatch?.[0]) {
        await lookupKnownVulnerabilities(type, versionMatch[0], job.scanId, host, port);
      }
      
      // Run expanded Nmap scripts
      await runNmapScripts(host, port, type, job.scanId);

    } catch (error) {
      // Port is closed or filtered
      if ((error as any).code === 1) {
         log(`[dbPortScan] Port ${port} is closed on ${host}`);
      } else {
         log(`[dbPortScan] Error scanning ${host}:${port}:`, (error as Error).message);
      }
    }
  }

  log('[dbPortScan] Completed database scan, found', findingsCount, 'issues');
  
  // Add completion tracking
  await insertArtifact({
    type: 'scan_summary',
    val_text: `Database port scan completed: ${findingsCount} issues found`,
    severity: 'INFO',
    meta: {
      scan_id: job.scanId,
      scan_module: 'dbPortScan',
      total_findings: findingsCount,
      targets_scanned: targets.length,
      timestamp: new Date().toISOString()
    }
  });
  
  return findingsCount;
} 