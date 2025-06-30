/**
 * OWASP ZAP Web Application Security Scanner Integration
 * 
 * Provides comprehensive web application security testing using OWASP ZAP baseline scanner.
 * Integrates with asset classification system for smart targeting.
 * Designed for dedicated ZAP worker architecture with pay-per-second economics.
 */

import { spawn } from 'node:child_process';
import { readFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { insertArtifact, insertFinding, pool } from '../core/artifactStore.js';
import { log as rootLog } from '../core/logger.js';
import { classifyTargetAssetType } from '../util/nucleiWrapper.js';

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
const ZAP_BASELINE_SCRIPT = '/usr/local/bin/zap-baseline.py';
const ZAP_TIMEOUT_MS = 180_000; // 3 minutes per target
const MAX_ZAP_TARGETS = 5;      // Limit targets for performance
const ZAP_JAVA_OPTS = '-Xmx2g -XX:+UseG1GC'; // Optimize for 4GB container

/**
 * Main ZAP scanning function
 */
export async function runZAPScan(job: { 
  domain: string; 
  scanId: string 
}): Promise<number> {
  const { domain, scanId } = job;
  log(`Starting OWASP ZAP web application security scan for ${domain}`);

  // Check if ZAP baseline script is available
  if (!isZAPAvailable()) {
    log(`ZAP baseline script not found at ${ZAP_BASELINE_SCRIPT} - skipping web application scan`);
    
    await insertArtifact({
      type: 'scan_warning',
      val_text: `ZAP baseline script not available - web application security testing skipped`,
      severity: 'LOW',
      meta: {
        scan_id: scanId,
        scan_module: 'zapScan',
        reason: 'zap_baseline_unavailable'
      }
    });
    
    return 0;
  }

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
 * Check if ZAP baseline script is available
 */
function isZAPAvailable(): boolean {
  return existsSync(ZAP_BASELINE_SCRIPT);
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
    
    // Classify and filter for web applications
    const targets = urls
      .map(url => ({
        url,
        assetType: classifyTargetAssetType(url)
      }))
      .filter(target => {
        // Only scan HTML assets, skip non-HTML (APIs, static files, etc.)
        return target.assetType === 'html';
      })
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
 * Execute ZAP baseline scan using the zap-baseline.py script
 */
async function executeZAPBaseline(target: string, assetType: string, scanId: string): Promise<number> {
  const sessionId = randomBytes(8).toString('hex');
  const outputFile = `/tmp/zap_report_${sessionId}.json`;
  
  try {
    log(`Running ZAP baseline scan for ${target} (${assetType})`);
    
    // Build ZAP baseline command arguments
    const zapArgs = [
      '-t', target,           // Target URL
      '-J', outputFile,       // JSON output file
      '-I',                   // Ignore warnings
      '-d'                    // Debug mode for better error reporting
    ];
    
    // Set environment for optimal performance
    const env = {
      ...process.env,
      JAVA_OPTS: ZAP_JAVA_OPTS,
      ZAP_PORT: '0'           // Use random port to avoid conflicts
    };
    
    // Execute ZAP baseline scan using spawn for better control
    await new Promise<void>((resolve, reject) => {
      const zapProcess = spawn('python3', [ZAP_BASELINE_SCRIPT, ...zapArgs], {
        stdio: ['ignore', 'pipe', 'pipe'],
        env,
        timeout: ZAP_TIMEOUT_MS
      });
      
      let stdout = '';
      let stderr = '';
      
      zapProcess.stdout?.on('data', (data) => {
        stdout += data.toString();
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
          reject(new Error(`ZAP baseline scan failed with exit code ${code}`));
        }
      });
      
      zapProcess.on('error', (error) => {
        reject(new Error(`ZAP process error: ${error.message}`));
      });
    });
    
    // Parse results and create findings
    const findings = await parseZAPResults(outputFile, target, assetType, scanId);
    
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

