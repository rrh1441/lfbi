import { config } from 'dotenv';
import { UpstashQueue } from './core/queue.js';
import { initializeDatabase, insertArtifact } from './core/artifactStore.js';
import { runShodanScan } from './modules/shodan.js';
import { runSpiderFoot } from './modules/spiderFoot.js';
import { runDocumentExposure } from './modules/documentExposure.js';
import { runTrufflehog } from './modules/trufflehog.js';
import { runRateLimitScan } from './modules/rateLimitScan.js';
import { runDnsTwist } from './modules/dnsTwist.js';
import { runTlsScan } from './modules/tlsScan.js';
import { runNuclei } from './modules/nuclei.js';
import { runDbPortScan } from './modules/dbPortScan.js';
import { runSpfDmarc } from './modules/spfDmarc.js';
import { runEndpointDiscovery } from './modules/endpointDiscovery.js';
import { runTechStackScan } from './modules/techStackScan.js';                 // ← ADDED
import { runAbuseIntelScan } from './modules/abuseIntelScan.js';
import { runAdversarialMediaScan } from './modules/adversarialMediaScan.js';
import { runAccessibilityScan } from './modules/accessibilityScan.js';
import { runDenialWalletScan } from './modules/denialWalletScan.js';
import { runBreachDirectoryProbe } from './modules/breachDirectoryProbe.js';
import { runRdpVpnTemplates } from './modules/rdpVpnTemplates.js';
import { runEmailBruteforceSurface } from './modules/emailBruteforceSurface.js';
import { runCensysScan } from './modules/censysPlatformScan.js';
// import { runOpenVASScan } from './modules/openvasScan.js';  // Available but disabled until needed
// import { runZAPScan } from './modules/zapScan.js';  // Available but disabled due to build issues
import { pool } from './core/artifactStore.js';

config();

const queue = new UpstashQueue(process.env.REDIS_URL!);

function log(...args: any[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [worker]`, ...args);
}

// Trigger sync worker to sync scan results to Supabase
async function triggerSyncWorker(scanId: string) {
  try {
    log(`Triggering sync worker for scan ${scanId}`);
    
    // Start the existing sync_worker machine (ID: 148e212fe19238)
    const syncWorkerMachineId = '148e212fe19238';
    const response = await fetch(`https://api.machines.dev/v1/apps/dealbrief-scanner/machines/${syncWorkerMachineId}/start`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FLY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      log(`✅ Sync worker triggered successfully for scan ${scanId}`);
    } else {
      const errorText = await response.text();
      log(`⚠️ Failed to trigger sync worker: ${response.status} ${response.statusText} - ${errorText}`);
    }
  } catch (error) {
    log(`⚠️ Error triggering sync worker:`, (error as Error).message);
    // Don't fail the scan if sync trigger fails
  }
}

interface ScanJob {
  id: string;
  companyName: string;
  domain: string;
  createdAt: string;
}

// All modules in execution order
const ALL_MODULES_IN_ORDER = [
  'spiderfoot',
  'dns_twist',
  'document_exposure',
  'shodan',
  'censys',
  'breach_directory_probe',
  'rdp_vpn_templates',
  'email_bruteforce_surface',
  'typosquat_scorer',
  'db_port_scan',
  'endpoint_discovery',
  'tech_stack_scan',                                                      // ← ADDED
  'abuse_intel_scan',
  // 'adversarial_media_scan',  // COMMENTED OUT - too noisy
  'accessibility_scan',
  'denial_wallet_scan',
  'tls_scan',
  // 'zap_scan',    // Web application security testing (disabled due to build issues)
  'nuclei',      // Primary vulnerability scanner (upgraded to v3.4.5)
  // 'openvas_scan',  // Available but disabled until needed for deeper vulnerability assessment
  'rate_limit_scan',
  'spf_dmarc',
  'trufflehog'
];

interface ScanMasterUpdate {
  status?: string;
  progress?: number;
  current_module?: string;
  total_modules?: number;
  error_message?: string;
  total_findings_count?: number;
  max_severity?: string;
  completed_at?: Date;
  total_artifacts_count?: number;
}

// Helper function to update scans_master table
async function updateScanMasterStatus(scanId: string, updates: ScanMasterUpdate): Promise<void> {
  try {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [scanId, ...Object.values(updates)];
    
    // Only update updated_at for meaningful changes:
    // - Status changes (including completion)
    // - Error messages
    // - Final completion with findings/artifacts counts
    const shouldUpdateTimestamp = updates.status || updates.error_message || updates.completed_at || updates.total_findings_count !== undefined;
    
    const timestampClause = shouldUpdateTimestamp ? ', updated_at = NOW()' : '';
    
    const result = await pool.query(
      `UPDATE scans_master SET ${setClause}${timestampClause} WHERE scan_id = $1`,
      values
    );
    
    log(`[updateScanMasterStatus] Updated scan ${scanId} with:`, Object.keys(updates).join(', '));
    
    if (result.rowCount === 0) {
      log(`[updateScanMasterStatus] WARNING: No rows updated for scan ${scanId}, may not exist in scans_master table`);
    }
  } catch (error) {
    log(`[updateScanMasterStatus] ERROR: Failed to update scan ${scanId}:`, (error as Error).message);
    // Don't throw the error to avoid breaking the scan process
  }
}

// Initialize scans_master table
async function initializeScansMasterTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS scans_master (
      scan_id VARCHAR(255) PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      domain VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'queued',
      progress INTEGER DEFAULT 0,
      current_module VARCHAR(100),
      total_modules INTEGER DEFAULT 0,
      error_message TEXT,
      total_findings_count INTEGER DEFAULT 0,
      max_severity VARCHAR(20),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      completed_at TIMESTAMP WITH TIME ZONE,
      total_artifacts_count INTEGER DEFAULT 0
    );
    
    CREATE INDEX IF NOT EXISTS idx_scans_master_updated_at ON scans_master(updated_at);
    CREATE INDEX IF NOT EXISTS idx_scans_master_status ON scans_master(status);

    CREATE TABLE IF NOT EXISTS worker_instances (
      instance_id VARCHAR(255) PRIMARY KEY,
      started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      last_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_worker_instances_heartbeat ON worker_instances(last_heartbeat);
  `);
}

// Clean up incomplete scans from previous worker instances
async function cleanupIncompleteScans(): Promise<void> {
  try {
    const result = await pool.query(`
      UPDATE scans_master 
      SET 
        status = 'failed',
        error_message = 'Worker restart - scan interrupted',
        completed_at = NOW(),
        updated_at = NOW()
      WHERE status IN ('queued', 'processing', 'module_failed')
      AND updated_at < NOW() - INTERVAL '5 minutes'
      RETURNING scan_id, company_name, status
    `);
    
    if (result.rows.length > 0) {
      log(`Cleaned up ${result.rows.length} incomplete scans from previous worker sessions:`, 
          result.rows.map(r => `${r.company_name} (${r.scan_id})`));
      
      // Also update the queue status for these jobs
      for (const scan of result.rows) {
        try {
          await queue.updateStatus(scan.scan_id, 'failed', 'Worker restart - scan interrupted');
        } catch (queueError) {
          log(`Warning: Could not update queue status for ${scan.scan_id}:`, (queueError as Error).message);
        }
      }
    } else {
      log('No incomplete scans found to clean up');
    }
  } catch (error) {
    log('Warning: Failed to cleanup incomplete scans:', (error as Error).message);
    // Don't fail startup if cleanup fails
  }
}

async function processScan(job: ScanJob): Promise<void> {
  const { id: scanId, companyName, domain } = job;
  
  log(`✅ JOB PICKED UP: Processing scan job ${scanId} for ${companyName} (${domain})`);
  log(`Processing comprehensive security scan for ${companyName} (${domain})`);
  
  try {
    // === SCAN INITIALIZATION ===
    const TOTAL_MODULES = ALL_MODULES_IN_ORDER.length;
    
    // Insert or update scan record
    await pool.query(
      `INSERT INTO scans_master (scan_id, company_name, domain, status, progress, total_modules, created_at, updated_at)
       VALUES ($1, $2, $3, 'queued', 0, $4, NOW(), NOW())
       ON CONFLICT (scan_id) DO UPDATE SET 
         status = 'queued', 
         progress = 0,
         current_module = NULL,
         total_modules = $4,
         company_name = EXCLUDED.company_name,
         domain = EXCLUDED.domain,
         updated_at = NOW(),
         completed_at = NULL,
         error_message = NULL`,
      [scanId, companyName, domain, TOTAL_MODULES]
    );
    
    await queue.updateStatus(scanId, 'processing', 'Comprehensive security discovery in progress...');
    
    let totalModuleResults = 0; // Count of module results (mix of artifacts/findings)
    let modulesCompleted = 0;
    
    // === MODULE EXECUTION ===
    // Phase 1: Fast discovery modules (parallel)
    const phase1Modules = ['spiderfoot', 'breach_directory_probe'];
    const phase1Results = await Promise.allSettled(
      phase1Modules.map(async (moduleName) => {
        await updateScanMasterStatus(scanId, {
          status: 'processing',
          current_module: `${moduleName}_phase1`,
          progress: 5
        });
        
        log(`=== Running module (Phase 1): ${moduleName} ===`);
        
        switch (moduleName) {
          case 'spiderfoot':
            log(`[${scanId}] STARTING SpiderFoot discovery for ${domain}`);
            const sfFindings = await runSpiderFoot({ domain, scanId });
            log(`[${scanId}] COMPLETED SpiderFoot discovery: ${sfFindings} targets found`);
            return sfFindings;
          case 'breach_directory_probe':
            log(`[${scanId}] STARTING Breach Directory intelligence probe for ${domain}`);
            const breachFindings = await runBreachDirectoryProbe({ domain, scanId });
            log(`[${scanId}] COMPLETED Breach Directory probe: ${breachFindings} breach findings`);
            return breachFindings;
          default:
            return 0;
        }
      })
    );
    
    // Collect Phase 1 results
    let phase1TotalResults = 0;
    phase1Results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        phase1TotalResults += result.value;
      } else {
        log(`Phase 1 module ${phase1Modules[index]} failed:`, result.reason);
      }
    });
    
    totalModuleResults += phase1TotalResults;
    modulesCompleted += phase1Modules.length;

    // Phase 2A: Independent analysis modules (parallel - no dependencies)
    const phase2aModules = ['shodan', 'censys', 'document_exposure', 'dns_twist', 'tls_scan', 'spf_dmarc'];
    const phase2aResults = await Promise.allSettled(
      phase2aModules.map(async (moduleName) => {
        await updateScanMasterStatus(scanId, {
          status: 'processing',
          current_module: `${moduleName}_phase2a`,
          progress: 20
        });
        
        log(`=== Running module (Phase 2A): ${moduleName} ===`);
        
        switch (moduleName) {
          case 'shodan':
            log(`[${scanId}] STARTING Shodan scan for ${domain}`);
            const shodanFindings = await runShodanScan({ domain, scanId, companyName });
            log(`[${scanId}] COMPLETED Shodan infrastructure scan: ${shodanFindings} services found`);
            return shodanFindings;
          case 'censys':
            log(`[${scanId}] STARTING Censys platform scan for ${domain}`);
            const censysFindings = await runCensysScan({ domain, scanId });
            log(`[${scanId}] COMPLETED Censys platform scan: ${censysFindings} services found`);
            return censysFindings;
          case 'document_exposure':
            log(`[${scanId}] STARTING document exposure scan for ${companyName}`);
            const docFindings = await runDocumentExposure({ companyName, domain, scanId });
            log(`[${scanId}] COMPLETED document exposure: ${docFindings} discoveries`);
            return docFindings;
          case 'dns_twist':
            log(`[${scanId}] STARTING DNS Twist scan for ${domain}`);
            const dnsFindings = await runDnsTwist({ domain, scanId });
            log(`[${scanId}] COMPLETED DNS Twist: ${dnsFindings} typo-domains found`);
            return dnsFindings;
          case 'tls_scan':
            log(`[${scanId}] STARTING TLS security scan for ${domain}`);
            const tlsFindings = await runTlsScan({ domain, scanId });
            log(`[${scanId}] COMPLETED TLS scan: ${tlsFindings} TLS issues found`);
            return tlsFindings;
          case 'spf_dmarc':
            log(`[${scanId}] STARTING SPF/DMARC email security scan for ${domain}`);
            const emailFindings = await runSpfDmarc({ domain, scanId });
            log(`[${scanId}] COMPLETED email security scan: ${emailFindings} email issues found`);
            return emailFindings;
          default:
            return 0;
        }
      })
    );
    
    // Collect Phase 2A results
    let phase2aTotalResults = 0;
    phase2aResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        phase2aTotalResults += result.value;
      } else {
        log(`Phase 2A module ${phase2aModules[index]} failed:`, result.reason);
      }
    });
    
    totalModuleResults += phase2aTotalResults;
    modulesCompleted += phase2aModules.length;

    // Phase 2B: Endpoint discovery (must run before endpoint-dependent modules)
    log(`=== Running endpoint discovery ===`);
    await updateScanMasterStatus(scanId, {
      status: 'processing',
      current_module: 'endpoint_discovery',
      progress: 50
    });
    
    log(`[${scanId}] STARTING endpoint discovery for ${domain}`);
    const endpointResults = await runEndpointDiscovery({ domain, scanId });
    log(`[${scanId}] COMPLETED endpoint discovery: ${endpointResults} endpoint collections found`);
    totalModuleResults += endpointResults;
    modulesCompleted += 1;

    // Phase 2C: Endpoint-dependent modules (parallel)
    const phase2cModules = ['tech_stack_scan', 'abuse_intel_scan', 'accessibility_scan', 'denial_wallet_scan'];
    const phase2cResults = await Promise.allSettled(
      phase2cModules.map(async (moduleName) => {
        await updateScanMasterStatus(scanId, {
          status: 'processing',
          current_module: `${moduleName}_phase2c`,
          progress: 70
        });
        
        log(`=== Running module (Phase 2C): ${moduleName} ===`);
        
        switch (moduleName) {
          case 'tech_stack_scan':
            log(`[${scanId}] STARTING tech stack scan for ${domain}`);
            const techFindings = await runTechStackScan({ domain, scanId });
            log(`[${scanId}] COMPLETED tech stack scan: ${techFindings} technologies detected`);
            return techFindings;
          case 'abuse_intel_scan':
            log(`[${scanId}] STARTING AbuseIPDB intelligence scan for IPs`);
            const abuseFindings = await runAbuseIntelScan({ scanId });
            log(`[${scanId}] COMPLETED AbuseIPDB scan: ${abuseFindings} malicious/suspicious IPs found`);
            return abuseFindings;
          case 'accessibility_scan':
            log(`[${scanId}] STARTING accessibility compliance scan for ${domain}`);
            const accessFindings = await runAccessibilityScan({ domain, scanId });
            log(`[${scanId}] COMPLETED accessibility scan: ${accessFindings} WCAG violations found`);
            return accessFindings;
          case 'denial_wallet_scan':
            log(`[${scanId}] STARTING denial-of-wallet vulnerability scan for ${domain}`);
            const dowFindings = await runDenialWalletScan({ domain, scanId });
            log(`[${scanId}] COMPLETED denial-of-wallet scan: ${dowFindings} cost amplification vulnerabilities found`);
            return dowFindings;
          default:
            return 0;
        }
      })
    );
    
    // Collect Phase 2C results
    let phase2cTotalResults = 0;
    phase2cResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        phase2cTotalResults += result.value;
      } else {
        log(`Phase 2C module ${phase2cModules[index]} failed:`, result.reason);
      }
    });
    
    totalModuleResults += phase2cTotalResults;
    modulesCompleted += phase2cModules.length;

    // Phase 3: Final sequential modules  
    const phase3Modules = ALL_MODULES_IN_ORDER.filter(m => 
      !phase1Modules.includes(m) && 
      !phase2aModules.includes(m) && 
      !phase2cModules.includes(m) && 
      m !== 'endpoint_discovery'
    );
    
    for (const moduleName of phase3Modules) {
      const progress = Math.floor((modulesCompleted / TOTAL_MODULES) * 100);
      
      // Update status before running module
      await updateScanMasterStatus(scanId, {
        status: 'processing',
        current_module: moduleName,
        progress: progress
      });
      
      log(`=== Running module: ${moduleName} (${modulesCompleted + 1}/${TOTAL_MODULES}) ===`);
      
      try {
        let moduleFindings = 0;
        
        switch (moduleName) {
          case 'document_exposure':
            log(`[${scanId}] STARTING document exposure scan for ${companyName}`);
            moduleFindings = await runDocumentExposure({ companyName, domain, scanId });
            log(`[${scanId}] COMPLETED document exposure: ${moduleFindings} discoveries`);
            break;

          case 'rdp_vpn_templates':
            log(`[${scanId}] STARTING RDP/VPN vulnerability templates for ${domain}`);
            moduleFindings = await runRdpVpnTemplates({ domain, scanId });
            log(`[${scanId}] COMPLETED RDP/VPN templates scan: ${moduleFindings} remote access vulnerabilities found`);
            break;

          case 'email_bruteforce_surface':
            log(`[${scanId}] STARTING email bruteforce surface scan for ${domain}`);
            moduleFindings = await runEmailBruteforceSurface({ domain, scanId });
            log(`[${scanId}] COMPLETED email bruteforce surface scan: ${moduleFindings} email attack vectors found`);
            break;

          case 'typosquat_scorer':
            log(`[${scanId}] STARTING typosquat analysis for ${domain}`);
            // Typosquat scanning now handled by dnsTwist module with WHOIS intelligence
            log(`Skipping removed typosquatScorer module - functionality merged into dnsTwist`);
            moduleFindings = 0;
            log(`[${scanId}] COMPLETED typosquat analysis: ${moduleFindings} active typosquats detected`);
            break;
            
          case 'db_port_scan':
            log(`[${scanId}] STARTING database port scan for ${domain}`);
            moduleFindings = await runDbPortScan({ domain, scanId });
            log(`[${scanId}] COMPLETED database scan: ${moduleFindings} database issues found`);
            break;
            
          case 'endpoint_discovery':
            log(`[${scanId}] STARTING endpoint discovery for ${domain}`);
            moduleFindings = await runEndpointDiscovery({ domain, scanId });
            log(`[${scanId}] COMPLETED endpoint discovery: ${moduleFindings} endpoint collections found`);
            break;

          case 'tech_stack_scan':                                              // ← ADDED
            log(`[${scanId}] STARTING tech stack scan for ${domain}`);         // ← ADDED
            moduleFindings = await runTechStackScan({ domain, scanId });       // ← ADDED
            log(`[${scanId}] COMPLETED tech stack scan: ${moduleFindings} technologies detected`); // ← ADDED
            break;                                                             // ← ADDED

          case 'abuse_intel_scan':
            log(`[${scanId}] STARTING AbuseIPDB intelligence scan for IPs`);
            moduleFindings = await runAbuseIntelScan({ scanId });
            log(`[${scanId}] COMPLETED AbuseIPDB scan: ${moduleFindings} malicious/suspicious IPs found`);
            break;


          // case 'adversarial_media_scan':  // COMMENTED OUT - too noisy
          //   log(`[${scanId}] STARTING adversarial media scan for ${companyName}`);
          //   moduleFindings = await runAdversarialMediaScan({ company: companyName, domain, scanId });
          //   log(`[${scanId}] COMPLETED adversarial media scan: ${moduleFindings} adverse media findings`);
          //   break;

          case 'accessibility_scan':
            log(`[${scanId}] STARTING accessibility compliance scan for ${domain}`);
            moduleFindings = await runAccessibilityScan({ domain, scanId });
            log(`[${scanId}] COMPLETED accessibility scan: ${moduleFindings} WCAG violations found`);
            break;

          case 'denial_wallet_scan':
            log(`[${scanId}] STARTING denial-of-wallet vulnerability scan for ${domain}`);
            moduleFindings = await runDenialWalletScan({ domain, scanId });
            log(`[${scanId}] COMPLETED denial-of-wallet scan: ${moduleFindings} cost amplification vulnerabilities found`);
            break;
          
          case 'tls_scan':
            log(`[${scanId}] STARTING TLS security scan for ${domain}`);
            moduleFindings = await runTlsScan({ domain, scanId });
            log(`[${scanId}] COMPLETED TLS scan: ${moduleFindings} TLS issues found`);
            break;
            
          // case 'zap_scan':  // Disabled due to build issues
          //   log(`[${scanId}] STARTING OWASP ZAP web application security scan for ${domain}`);
          //   moduleFindings = await runZAPScan({ domain, scanId });
          //   log(`[${scanId}] COMPLETED ZAP scan: ${moduleFindings} web application vulnerabilities found`);
          //   break;
            
          // case 'openvas_scan':  // Available but disabled
          //   log(`[${scanId}] STARTING OpenVAS enterprise vulnerability scan for ${domain}`);
          //   moduleFindings = await runOpenVASScan({ domain, scanId });
          //   log(`[${scanId}] COMPLETED OpenVAS scan: ${moduleFindings} vulnerabilities found`);
          //   break;
            
          case 'nuclei':
            log(`[${scanId}] STARTING Nuclei vulnerability scan for ${domain}`);
            moduleFindings = await runNuclei({ domain, scanId });
            log(`[${scanId}] COMPLETED Nuclei scan: ${moduleFindings} vulnerabilities found`);
            break;
            
          case 'rate_limit_scan':
            log(`[${scanId}] STARTING rate-limit tests for ${domain}`);
            moduleFindings = await runRateLimitScan({ domain, scanId });
            log(`[${scanId}] COMPLETED rate limiting tests: ${moduleFindings} rate limit issues found`);
            break;
            
          case 'spf_dmarc':
            log(`[${scanId}] STARTING SPF/DMARC email security scan for ${domain}`);
            moduleFindings = await runSpfDmarc({ domain, scanId });
            log(`[${scanId}] COMPLETED email security scan: ${moduleFindings} email issues found`);
            break;
            
          case 'trufflehog':
            log(`[${scanId}] STARTING TruffleHog secret detection for ${domain}`);
            moduleFindings = await runTrufflehog({ domain, scanId });
            log(`[${scanId}] COMPLETED secret detection: ${moduleFindings} secrets found`);
            break;
            
          default:
            log(`Unknown module: ${moduleName}, skipping`);
            break;
        }
        
        totalModuleResults += moduleFindings;
        modulesCompleted++;
        
        // Update progress after successful module completion
        const newProgress = Math.floor((modulesCompleted / TOTAL_MODULES) * 100);
        await updateScanMasterStatus(scanId, {
          progress: newProgress
        });
        
      } catch (moduleError) {
        log(`Module ${moduleName} failed:`, (moduleError as Error).message);
        
        // Update status to indicate module failure but continue
        await updateScanMasterStatus(scanId, {
          status: 'module_failed',
          error_message: `Module ${moduleName} failed: ${(moduleError as Error).message}`
        });
        
        // For critical modules, fail the entire scan
        if (moduleName === 'shodan' || moduleName === 'spiderfoot') {
          throw new Error(`Critical module ${moduleName} failed: ${(moduleError as Error).message}`);
        }
        
        // For non-critical modules, continue
        modulesCompleted++;
        const newProgress = Math.floor((modulesCompleted / TOTAL_MODULES) * 100);
        await updateScanMasterStatus(scanId, {
          status: 'processing', // Reset to processing after module failure
          progress: newProgress
        });
      }
    }

    // If no real module results, the scan failed
    if (totalModuleResults === 0) {
      throw new Error(`No security results discovered for ${domain}. Comprehensive scan failed to produce actionable results.`);
    }

    // === SCAN COMPLETION ===
    // Calculate artifacts count
    const artifactsStats = await pool.query(
      `SELECT COUNT(*) as total_artifacts 
       FROM artifacts 
       WHERE meta->>'scan_id' = $1 
       AND type <> 'scan_summary' 
       AND type <> 'scan_error'`,
      [scanId]
    );
    
    const totalArtifactsCount = parseInt(artifactsStats.rows[0]?.total_artifacts || '0');
    log(`[processScan] Counted ${totalArtifactsCount} artifacts for scan ${scanId}`);
    
    // Calculate findings stats
    const findingsStats = await pool.query(
        `SELECT 
            COUNT(*) as total_findings,
            MAX(CASE 
                WHEN a.severity = 'CRITICAL' THEN 5
                WHEN a.severity = 'HIGH' THEN 4
                WHEN a.severity = 'MEDIUM' THEN 3
                WHEN a.severity = 'LOW' THEN 2
                WHEN a.severity = 'INFO' THEN 1
                ELSE 0 
            END) as max_severity_score
         FROM findings f
         JOIN artifacts a ON f.artifact_id = a.id
         WHERE a.meta->>'scan_id' = $1`,
        [scanId]
    );

    const totalFindingsCount = parseInt(findingsStats.rows[0]?.total_findings || '0');
    const maxSeverityScore = parseInt(findingsStats.rows[0]?.max_severity_score || '0');
    let maxSeverity = 'INFO';
    if (maxSeverityScore === 5) maxSeverity = 'CRITICAL';
    else if (maxSeverityScore === 4) maxSeverity = 'HIGH';
    else if (maxSeverityScore === 3) maxSeverity = 'MEDIUM';
    else if (maxSeverityScore === 2) maxSeverity = 'LOW';

    await updateScanMasterStatus(scanId, {
      status: 'done',
      progress: 100,
      completed_at: new Date(),
      total_findings_count: totalFindingsCount,
      max_severity: maxSeverity,
      total_artifacts_count: totalArtifactsCount
    });

    await queue.updateStatus(
      scanId, 
      'done', 
      `Comprehensive security scan completed - ${totalFindingsCount} verified findings across ${TOTAL_MODULES} security modules. Findings ready for processing.`
    );
    
    log(`✅ COMPREHENSIVE SCAN COMPLETED for ${companyName}: ${totalFindingsCount} verified findings, ${totalArtifactsCount} artifacts across ${TOTAL_MODULES} security modules`);

    // Trigger sync worker to sync results to Supabase
    await triggerSyncWorker(scanId);

  } catch (error) {
    log(`❌ Scan failed for ${companyName}:`, (error as Error).message);
    
    // === SCAN FAILURE ===
    await updateScanMasterStatus(scanId, {
      status: 'failed',
      completed_at: new Date(),
      error_message: (error as Error).message
    });
    
    await queue.updateStatus(
      scanId, 
      'failed', 
      `Scan failed: ${(error as Error).message}`
    );
    
    // Store error artifact
    await insertArtifact({
      type: 'scan_error',
      val_text: `Comprehensive scan failed: ${(error as Error).message}`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        company: companyName,
        error: true,
        timestamp: new Date().toISOString()
      }
    });
    
    throw error;
  }
}

async function startWorker() {
  // Log worker startup with instance identifier
  const workerInstanceId = process.env.FLY_MACHINE_ID || `worker-${Date.now()}`;
  log(`Starting security scanning worker [${workerInstanceId}]`);
  
  // Validate required environment
  if (!process.env.SHODAN_API_KEY) {
    log('ERROR: SHODAN_API_KEY not configured - cannot run real scans');
    process.exit(1);
  }
  
  // Initialize database
  try {
    await initializeDatabase();
    await initializeScansMasterTable();
    log('Database and scans_master table initialized successfully');
    
    // Clean up any incomplete scans from previous worker instances
    await cleanupIncompleteScans();
    
    // Mark this worker instance as active
    await pool.query(`
      INSERT INTO worker_instances (instance_id, started_at, last_heartbeat) 
      VALUES ($1, NOW(), NOW())
      ON CONFLICT (instance_id) DO UPDATE SET 
        started_at = NOW(), 
        last_heartbeat = NOW()
    `, [workerInstanceId]);
    
  } catch (error) {
    log('Database initialization failed:', (error as Error).message);
    process.exit(1);
  }

  // Main processing loop
  while (!isShuttingDown) {
    try {
      const job = await queue.getNextJob();
      
      if (job && !isShuttingDown) {
        log('Processing scan job:', job.id);
        await processScan(job);
      } else {
        // No jobs available, wait (but check for shutdown)
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
    } catch (error) {
      if (!isShuttingDown) {
        log('Worker error:', (error as Error).message);
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }
  
  log('Worker loop exited due to shutdown signal');
}

// Graceful shutdown
let isShuttingDown = false;

async function gracefulShutdown(signal: string) {
  if (isShuttingDown) {
    log(`Already shutting down, ignoring ${signal}`);
    return;
  }
  
  isShuttingDown = true;
  log(`Received ${signal}, initiating graceful shutdown...`);
  
  try {
    // Mark any currently processing scans as interrupted
    const workerInstanceId = process.env.FLY_MACHINE_ID || `worker-${Date.now()}`;
    
    const interruptedScans = await pool.query(`
      UPDATE scans_master 
      SET 
        status = 'failed',
        error_message = 'Worker shutdown - scan interrupted',
        completed_at = NOW(),
        updated_at = NOW()
      WHERE status IN ('processing', 'queued')
      RETURNING scan_id, company_name
    `);
    
    if (interruptedScans.rows.length > 0) {
      log(`Marked ${interruptedScans.rows.length} scans as interrupted due to shutdown`);
      
      // Update queue status for interrupted scans
      for (const scan of interruptedScans.rows) {
        try {
          await queue.updateStatus(scan.scan_id, 'failed', 'Worker shutdown - scan interrupted');
        } catch (queueError) {
          log(`Warning: Could not update queue status for ${scan.scan_id}:`, (queueError as Error).message);
        }
      }
    }
    
    // Remove worker instance record
    await pool.query('DELETE FROM worker_instances WHERE instance_id = $1', [workerInstanceId]);
    
    // Close database connections
    await pool.end();
    
    log('Graceful shutdown completed');
    process.exit(0);
    
  } catch (error) {
    log('Error during graceful shutdown:', (error as Error).message);
    process.exit(1);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startWorker().catch(error => {
  log('CRITICAL: Failed to start worker:', (error as Error).message);
  process.exit(1);
});
