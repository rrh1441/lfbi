/**
 * OWASP ZAP Web Application Security Scanner Integration
 * 
 * Provides comprehensive web application security testing using OWASP ZAP.
 * Focuses on web-specific vulnerabilities that complement Nuclei's broader scanning.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, readFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { randomBytes } from 'crypto';
import { insertArtifact, insertFinding } from '../core/artifactStore.js';

const execAsync = promisify(exec);

interface ZAPVulnerability {
  alert: string;
  name: string;
  riskdesc: string;
  confidence: string;
  riskcode: string;
  desc: string;
  instances: ZAPInstance[];
  solution: string;
  reference: string;
  cweid: string;
  wascid: string;
  sourceid: string;
}

interface ZAPInstance {
  uri: string;
  method: string;
  param: string;
  attack: string;
  evidence: string;
}

interface ZAPScanResult {
  site: ZAPSite[];
}

interface ZAPSite {
  name: string;
  host: string;
  port: string;
  ssl: boolean;
  alerts: ZAPVulnerability[];
}

function log(...args: any[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [zap]`, ...args);
}

/**
 * Main ZAP scanning function
 */
export async function runZAPScan(job: { 
  domain: string; 
  scanId: string 
}): Promise<number> {
  const { domain, scanId } = job;
  log(`Starting OWASP ZAP web application security scan for ${domain}`);

  // Check if ZAP is available
  if (!await isZAPAvailable()) {
    log(`OWASP ZAP not available - skipping web application security scan`);
    
    await insertArtifact({
      type: 'scan_warning',
      val_text: `OWASP ZAP web application scanner not available - web-specific vulnerability testing skipped`,
      severity: 'LOW',
      meta: {
        scan_id: scanId,
        scan_module: 'zapScan',
        reason: 'scanner_unavailable'
      }
    });
    
    return 0;
  }

  try {
    // Discover web targets from previous scans
    const targets = await discoverWebTargets(domain, scanId);
    if (targets.length === 0) {
      log(`No web targets discovered for ZAP scan`);
      return 0;
    }

    log(`Discovered ${targets.length} web targets for security testing`);

    // Execute ZAP baseline scan for each target
    let totalFindings = 0;
    
    for (const target of targets.slice(0, 5)) { // Limit to 5 targets for performance
      try {
        const findings = await executeZAPBaseline(target, scanId);
        totalFindings += findings;
      } catch (error) {
        log(`ZAP scan failed for ${target}: ${(error as Error).message}`);
      }
    }
    
    // Create summary artifact
    await insertArtifact({
      type: 'scan_summary',
      val_text: `OWASP ZAP scan completed: ${totalFindings} web application vulnerabilities found across ${targets.length} targets`,
      severity: totalFindings > 5 ? 'HIGH' : totalFindings > 0 ? 'MEDIUM' : 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'zapScan',
        total_vulnerabilities: totalFindings,
        targets_scanned: targets.length
      }
    });

    log(`ZAP scan completed: ${totalFindings} web application vulnerabilities found`);
    return totalFindings;

  } catch (error) {
    log(`ZAP scan failed: ${(error as Error).message}`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `OWASP ZAP web application scan failed: ${(error as Error).message}`,
      severity: 'MEDIUM',
      meta: {
        scan_id: scanId,
        scan_module: 'zapScan',
        error: true,
        error_message: (error as Error).message
      }
    });
    
    return 0;
  }
}

/**
 * Check if OWASP ZAP is available
 */
async function isZAPAvailable(): Promise<boolean> {
  try {
    const { stdout } = await execAsync('which zap', { timeout: 5000 });
    return stdout.trim().length > 0;
  } catch (error) {
    // Try alternative ZAP command locations
    try {
      const { stdout } = await execAsync('which zap.sh', { timeout: 5000 });
      return stdout.trim().length > 0;
    } catch {
      try {
        await execAsync('/opt/zaproxy/zap.sh -version', { timeout: 10000 });
        return true;
      } catch {
        return false;
      }
    }
  }
}

/**
 * Discover web targets for ZAP scanning
 */
async function discoverWebTargets(domain: string, scanId: string): Promise<string[]> {
  const targets = new Set<string>();
  
  // Primary targets
  targets.add(`https://${domain}`);
  targets.add(`http://${domain}`);
  targets.add(`https://www.${domain}`);
  targets.add(`http://www.${domain}`);
  
  // Common web application paths
  const commonPaths = [
    '/login',
    '/admin',
    '/api',
    '/app',
    '/portal',
    '/dashboard',
    '/console'
  ];
  
  // Add common paths to primary domain
  for (const path of commonPaths) {
    targets.add(`https://${domain}${path}`);
    targets.add(`https://www.${domain}${path}`);
  }
  
  // TODO: In future, query artifact store for discovered endpoints
  // from endpointDiscovery module
  
  return Array.from(targets).slice(0, 10); // Limit for performance
}

/**
 * Execute ZAP baseline scan
 */
async function executeZAPBaseline(target: string, scanId: string): Promise<number> {
  const sessionId = randomBytes(8).toString('hex');
  const outputFile = `/tmp/zap_report_${sessionId}.json`;
  
  try {
    log(`Running ZAP baseline scan for ${target}`);
    
    // Determine ZAP command
    let zapCommand = 'zap';
    if (!await isCommandAvailable('zap')) {
      if (await isCommandAvailable('zap.sh')) {
        zapCommand = 'zap.sh';
      } else if (existsSync('/opt/zaproxy/zap.sh')) {
        zapCommand = '/opt/zaproxy/zap.sh';
      } else {
        throw new Error('ZAP executable not found');
      }
    }
    
    // Build ZAP baseline command
    const zapArgs = [
      '-cmd',
      '-quickurl', target,
      '-quickprogress',
      '-quickout', outputFile
    ];
    
    // Add optional configurations
    if (process.env.ZAP_TIMEOUT) {
      zapArgs.push('-config', 'spider.maxDuration=' + process.env.ZAP_TIMEOUT);
    }
    
    // Execute ZAP scan
    const command = `${zapCommand} ${zapArgs.join(' ')}`;
    log(`Executing ZAP command: ${command}`);
    
    const { stdout, stderr } = await execAsync(command, {
      timeout: 300000, // 5 minutes timeout
      maxBuffer: 50 * 1024 * 1024 // 50MB buffer
    });
    
    log(`ZAP scan completed for ${target}`);
    
    // Parse results and create findings
    const findings = await parseZAPResults(outputFile, target, scanId);
    
    return findings;
    
  } catch (error) {
    log(`ZAP baseline scan failed for ${target}: ${(error as Error).message}`);
    throw error;
    
  } finally {
    // Cleanup temporary files
    try {
      if (existsSync(outputFile)) {
        await unlink(outputFile);
      }
    } catch (cleanupError) {
      log(`Failed to cleanup ZAP output file: ${cleanupError}`);
    }
  }
}

/**
 * Parse ZAP JSON results and create artifacts/findings
 */
async function parseZAPResults(outputFile: string, target: string, scanId: string): Promise<number> {
  try {
    if (!existsSync(outputFile)) {
      log(`ZAP output file not found: ${outputFile}`);
      return 0;
    }
    
    const reportData = await readFile(outputFile, 'utf-8');
    const zapResult: ZAPScanResult = JSON.parse(reportData);
    
    let findingsCount = 0;
    
    // Process each site in the result
    for (const site of zapResult.site || []) {
      // Process each alert/vulnerability
      for (const alert of site.alerts || []) {
        // Skip informational alerts with very low risk
        if (alert.riskcode === '0') continue;
        
        const artifactId = await insertArtifact({
          type: 'zap_vulnerability',
          val_text: `${alert.name} (Risk: ${alert.riskdesc})`,
          severity: mapZAPRiskToSeverity(alert.riskcode),
          src_url: target,
          meta: {
            scan_id: scanId,
            scan_module: 'zapScan',
            alert_id: alert.alert,
            confidence: alert.confidence,
            risk_code: alert.riskcode,
            risk_desc: alert.riskdesc,
            cwe_id: alert.cweid,
            wasc_id: alert.wascid,
            instances_count: alert.instances?.length || 0,
            zap_data: alert
          }
        });
        
        // Create finding with detailed description
        const instancesText = alert.instances?.length > 0 
          ? ` Found in ${alert.instances.length} location(s): ${alert.instances[0].uri}`
          : '';
          
        await insertFinding(
          artifactId,
          'ZAP_VULNERABILITY',
          alert.desc.slice(0, 250) + (alert.desc.length > 250 ? '...' : ''),
          `Risk: ${alert.riskdesc} | Confidence: ${alert.confidence} | Solution: ${alert.solution.slice(0, 200)}${instancesText}`
        );
        
        findingsCount++;
      }
    }
    
    log(`Parsed ${findingsCount} vulnerabilities from ZAP report for ${target}`);
    return findingsCount;
    
  } catch (error) {
    log(`Failed to parse ZAP results: ${(error as Error).message}`);
    return 0;
  }
}

/**
 * Map ZAP risk codes to severity levels
 */
function mapZAPRiskToSeverity(riskCode: string): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' {
  switch (riskCode) {
    case '3': return 'HIGH';     // High risk
    case '2': return 'MEDIUM';   // Medium risk
    case '1': return 'LOW';      // Low risk
    case '0': return 'INFO';     // Informational
    default: return 'LOW';
  }
}

/**
 * Check if a command is available
 */
async function isCommandAvailable(command: string): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`which ${command}`, { timeout: 5000 });
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}