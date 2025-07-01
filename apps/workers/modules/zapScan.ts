/**
 * OWASP ZAP Web Application Security Scanner Integration
 * 
 * Provides comprehensive web application security testing using OWASP ZAP baseline scanner.
 * Integrates with asset classification system for smart targeting.
 * Designed for dedicated ZAP worker architecture with pay-per-second economics.
 */

import { spawn } from 'node:child_process';
import { readFile, unlink, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';
import { isNonHtmlAsset } from '../util/nucleiWrapper.js';

// Enhanced logging
const log = (...args: unknown[]) => rootLog('[zapScan]', ...args);

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

// Configuration
const ZAP_DOCKER_IMAGE = 'zaproxy/zap-stable';
const ZAP_TIMEOUT_MS = 180_000; // 3 minutes per target
const MAX_ZAP_TARGETS = 5;      // Limit targets for performance
const ARTIFACTS_DIR = './artifacts'; // Directory for ZAP outputs

/**
 * Main ZAP scanning function
 */
export async function runZAPScan(job: { 
  domain: string; 
  scanId: string 
}): Promise<number> {
  const { domain, scanId } = job;
  log(`Starting OWASP ZAP web application security scan for ${domain}`);

  // Check if Docker is available for ZAP
  if (!await isDockerAvailable()) {
    log(`Docker not available for ZAP scanning - skipping web application scan`);
    
    await insertArtifact({
      type: 'scan_warning',
      val_text: `Docker not available - ZAP web application security testing skipped`,
      severity: 'LOW',
      meta: {
        scan_id: scanId,
        scan_module: 'zapScan',
        reason: 'docker_unavailable'
      }
    });
    
    return 0;
  }

  // Ensure ZAP Docker image is available
  await ensureZAPImage();

  try {
    // Get high-value web application targets
    const targets = await getZAPTargets(scanId, domain);
    if (targets.length === 0) {
      log(`No suitable web targets found for ZAP scanning`);
      return 0;
    }

    log(`Found ${targets.length} high-value web targets for ZAP scanning`);

    // Execute ZAP baseline scan for each target
    let totalFindings = 0;
    
    for (const target of targets) {
      try {
        const findings = await executeZAPBaseline(target.url, target.assetType, scanId);
        totalFindings += findings;
      } catch (error) {
        log(`ZAP scan failed for ${target.url}: ${(error as Error).message}`);
        
        // Create error artifact for failed ZAP scan
        await insertArtifact({
          type: 'scan_error',
          val_text: `ZAP scan failed for ${target.url}: ${(error as Error).message}`,
          severity: 'MEDIUM',
          meta: {
            scan_id: scanId,
            scan_module: 'zapScan',
            target_url: target.url,
            asset_type: target.assetType,
            error_message: (error as Error).message
          }
        });
      }
    }
    
    // Create summary artifact
    await insertArtifact({
      type: 'zap_scan_summary',
      val_text: `ZAP scan completed: ${totalFindings} web application vulnerabilities found across ${targets.length} targets`,
      severity: totalFindings > 5 ? 'HIGH' : totalFindings > 0 ? 'MEDIUM' : 'INFO',
      meta: {
        scan_id: scanId,
        scan_module: 'zapScan',
        domain,
        total_vulnerabilities: totalFindings,
        targets_scanned: targets.length,
        targets: targets.map(t => ({ url: t.url, asset_type: t.assetType }))
      }
    });

    log(`ZAP scan completed: ${totalFindings} web application vulnerabilities found`);
    return totalFindings;

  } catch (error) {
    log(`ZAP scan failed: ${(error as Error).message}`);
    
    await insertArtifact({
      type: 'scan_error',
      val_text: `ZAP web application scan failed: ${(error as Error).message}`,
      severity: 'MEDIUM',
      meta: {
        scan_id: scanId,
        scan_module: 'zapScan',
        domain,
        error_message: (error as Error).message
      }
    });
    
    return 0;
  }
}

/**
 * Check if Docker is available
 */
async function isDockerAvailable(): Promise<boolean> {
  try {
    const result = await new Promise<boolean>((resolve) => {
      const dockerProcess = spawn('docker', ['--version'], { stdio: 'pipe' });
      dockerProcess.on('exit', (code) => {
        resolve(code === 0);
      });
      dockerProcess.on('error', () => {
        resolve(false);
      });
    });
    return result;
  } catch {
    return false;
  }
}

/**
 * Ensure ZAP Docker image is available
 */
async function ensureZAPImage(): Promise<void> {
  try {
    log(`Ensuring ZAP Docker image ${ZAP_DOCKER_IMAGE} is available`);
    
    await new Promise<void>((resolve, reject) => {
      // Try to pull the image, but don't fail if it already exists
      const pullProcess = spawn('docker', ['pull', ZAP_DOCKER_IMAGE], { 
        stdio: ['ignore', 'pipe', 'pipe'] 
      });
      
      pullProcess.on('exit', (code) => {
        if (code === 0) {
          log(`ZAP Docker image pulled successfully`);
          resolve();
        } else {
          // Image might already exist, try to verify
          const inspectProcess = spawn('docker', ['image', 'inspect', ZAP_DOCKER_IMAGE], {
            stdio: 'pipe'
          });
          
          inspectProcess.on('exit', (inspectCode) => {
            if (inspectCode === 0) {
              log(`ZAP Docker image already available`);
              resolve();
            } else {
              reject(new Error(`Failed to pull or find ZAP Docker image`));
            }
          });
        }
      });
      
      pullProcess.on('error', reject);
    });
  } catch (error) {
    log(`Warning: Could not ensure ZAP Docker image: ${(error as Error).message}`);
    // Don't fail completely, image might still work
  }
}

/**
 * Get high-value web application targets using existing asset classification
 */
async function getZAPTargets(scanId: string, domain: string): Promise<Array<{url: string, assetType: string}>> {
  try {
    // Get discovered endpoints from endpointDiscovery
    const { rows } = await pool.query(
      `SELECT DISTINCT src_url 
       FROM artifacts 
       WHERE meta->>'scan_id' = $1 
         AND type IN ('discovered_endpoint', 'http_probe')
         AND src_url ILIKE $2
         AND src_url ~ '^https?://'`,
      [scanId, `%${domain}%`]
    );
    
    const discoveredUrls = rows.map(r => r.src_url);
    
    // If no discovered endpoints, use high-value defaults
    const urls = discoveredUrls.length > 0 ? discoveredUrls : [
      `https://${domain}`,
      `https://www.${domain}`,
      `https://app.${domain}`,
      `https://admin.${domain}`,
      `https://portal.${domain}`,
      `https://api.${domain}/docs`, // API documentation often has web interfaces
      `https://${domain}/admin`,
      `https://${domain}/login`,
      `https://${domain}/dashboard`
    ];
    
    // Filter for web applications (HTML assets only)
    const targets = urls
      .filter(url => !isNonHtmlAsset(url))
      .map(url => ({
        url,
        assetType: 'html' // All remaining URLs after filtering are HTML assets
      }))
      .slice(0, MAX_ZAP_TARGETS);
    
    log(`Identified ${targets.length} ZAP targets from ${urls.length} discovered URLs`);
    
    return targets;
  } catch (error) {
    log(`Error discovering ZAP targets: ${(error as Error).message}`);
    // Fallback to basic targets
    return [
      { url: `https://${domain}`, assetType: 'html' },
      { url: `https://www.${domain}`, assetType: 'html' }
    ];
  }
}

/**
 * Execute ZAP baseline scan using Docker
 */
async function executeZAPBaseline(target: string, assetType: string, scanId: string): Promise<number> {
  const sessionId = randomBytes(8).toString('hex');
  const outputFile = `zap_report_${sessionId}.json`;
  
  try {
    log(`Running ZAP baseline scan for ${target} (${assetType})`);
    
    // Ensure artifacts directory exists
    await mkdir(ARTIFACTS_DIR, { recursive: true });
    
    // Build Docker command arguments
    const dockerArgs = [
      'run', '--rm',
      '-v', `${process.cwd()}/${ARTIFACTS_DIR}:/zap/wrk:rw`,
      ZAP_DOCKER_IMAGE,
      'zap-baseline.py',
      '-t', target,           // Target URL
      '-J', outputFile,       // JSON output file
      '-I'                    // Ignore warnings
    ];
    
    // Execute ZAP baseline scan using Docker
    await new Promise<void>((resolve, reject) => {
      const zapProcess = spawn('docker', dockerArgs, {
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: ZAP_TIMEOUT_MS
      });
      
      let stdout = '';
      let stderr = '';
      
      zapProcess.stdout?.on('data', (data) => {
        const output = data.toString();
        stdout += output;
        // Log ZAP progress
        if (output.includes('PASS:') || output.includes('WARN:') || output.includes('FAIL:')) {
          log(`ZAP: ${output.trim()}`);
        }
      });
      
      zapProcess.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
      
      zapProcess.on('exit', (code) => {
        if (code === 0 || code === 2) {
          // Exit code 0 = success, 2 = warnings found (normal for ZAP)
          log(`ZAP scan completed for ${target} (exit code: ${code})`);
          resolve();
        } else {
          log(`ZAP scan failed for ${target} (exit code: ${code})`);
          if (stderr) log(`ZAP stderr: ${stderr}`);
          if (stdout) log(`ZAP stdout summary: ${stdout.slice(-500)}`); // Last 500 chars
          reject(new Error(`ZAP baseline scan failed with exit code ${code}: ${stderr}`));
        }
      });
      
      zapProcess.on('error', (error) => {
        reject(new Error(`ZAP Docker process error: ${error.message}`));
      });
    });
    
    // Parse results and create findings
    const outputPath = `${ARTIFACTS_DIR}/${outputFile}`;
    const findings = await parseZAPResults(outputPath, target, assetType, scanId);
    
    return findings;
    
  } catch (error) {
    log(`ZAP baseline scan failed for ${target}: ${(error as Error).message}`);
    throw error;
    
  } finally {
    // Cleanup temporary files
    try {
      const outputPath = `${ARTIFACTS_DIR}/${outputFile}`;
      if (existsSync(outputPath)) {
        await unlink(outputPath);
      }
    } catch (cleanupError) {
      log(`Failed to cleanup ZAP output file: ${cleanupError}`);
    }
  }
}

/**
 * Parse ZAP JSON results and create artifacts/findings with asset-aware severity escalation
 */
async function parseZAPResults(outputFile: string, target: string, assetType: string, scanId: string): Promise<number> {
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
        
        // Apply asset-aware severity escalation
        const baseSeverity = mapZAPRiskToSeverity(alert.riskcode);
        const escalatedSeverity = escalateSeverityForAsset(baseSeverity, assetType);
        
        const artifactId = await insertArtifact({
          type: 'zap_vulnerability',
          val_text: `${alert.name} on ${assetType}`,
          severity: escalatedSeverity,
          src_url: target,
          meta: {
            scan_id: scanId,
            scan_module: 'zapScan',
            target_url: target,
            asset_type: assetType,
            alert_id: alert.alert,
            confidence: alert.confidence,
            risk_code: alert.riskcode,
            risk_desc: alert.riskdesc,
            base_severity: baseSeverity,
            escalated_severity: escalatedSeverity,
            cwe_id: alert.cweid,
            wasc_id: alert.wascid,
            instances_count: alert.instances?.length || 0
          }
        });
        
        // Create finding with detailed description
        const instancesText = alert.instances?.length > 0 
          ? ` Found in ${alert.instances.length} location(s): ${alert.instances[0].uri}`
          : '';
          
        await insertFinding(
          artifactId,
          'ZAP_WEB_VULNERABILITY',
          alert.desc.slice(0, 250) + (alert.desc.length > 250 ? '...' : ''),
          `Risk: ${alert.riskdesc} | Confidence: ${alert.confidence} | Asset: ${assetType} | Solution: ${alert.solution.slice(0, 150)}${instancesText}`
        );
        
        log(`Created ZAP finding: ${alert.name} (${escalatedSeverity}) for ${target}`);
        
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
    case '3': return 'HIGH';     // ZAP High -> Our High
    case '2': return 'MEDIUM';   // ZAP Medium -> Our Medium
    case '1': return 'LOW';      // ZAP Low -> Our Low
    case '0': return 'INFO';     // ZAP Info -> Our Info
    default: return 'LOW';
  }
}

/**
 * Escalate severity for critical asset types (admin panels, customer portals, etc.)
 */
function escalateSeverityForAsset(
  baseSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO',
  assetType: string
): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' {
  // Critical assets get severity escalation
  const criticalAssetPatterns = [
    'admin', 'portal', 'customer', 'management', 
    'backend', 'control', 'dashboard'
  ];
  
  const isCriticalAsset = criticalAssetPatterns.some(pattern => 
    assetType.toLowerCase().includes(pattern)
  );
  
  if (!isCriticalAsset) {
    return baseSeverity;
  }
  
  // Escalate for critical assets
  switch (baseSeverity) {
    case 'HIGH': return 'CRITICAL';
    case 'MEDIUM': return 'HIGH';
    case 'LOW': return 'MEDIUM';
    default: return baseSeverity; // Keep INFO and CRITICAL as-is
  }
}

