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
import { pool } from './core/artifactStore.js';

config();

const queue = new UpstashQueue(process.env.REDIS_URL!);

function log(...args: any[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [worker]`, ...args);
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
  'nuclei',
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
  `);
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
    
    let totalFindings = 0;
    let modulesCompleted = 0;
    
    // === MODULE EXECUTION ===
    // Phase 1: Fast independent discovery modules (can run in parallel)
    const phase1Modules = ['spiderfoot', 'shodan', 'breach_directory_probe']; // Moved dns_twist to Phase 2
    const phase1Results = await Promise.allSettled(
      phase1Modules.map(async (moduleName) => {
        await updateScanMasterStatus(scanId, {
          status: 'processing',
          current_module: `${moduleName}_parallel`,
          progress: 10
        });
        
        log(`=== Running module (Phase 1): ${moduleName} ===`);
        
        switch (moduleName) {
          case 'spiderfoot':
            log(`[${scanId}] STARTING SpiderFoot discovery for ${domain}`);
            const sfFindings = await runSpiderFoot({ domain, scanId });
            log(`[${scanId}] COMPLETED SpiderFoot discovery: ${sfFindings} targets found`);
            return sfFindings;
          case 'shodan':
            log(`[${scanId}] STARTING Shodan scan for ${domain}`);
            const shodanFindings = await runShodanScan({ domain, scanId, companyName });
            log(`[${scanId}] COMPLETED Shodan infrastructure scan: ${shodanFindings} services found`);
            return shodanFindings;
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
    let phase1TotalFindings = 0;
    phase1Results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        phase1TotalFindings += result.value;
      } else {
        log(`Phase 1 module ${phase1Modules[index]} failed:`, result.reason);
      }
    });
    
    totalFindings += phase1TotalFindings;
    modulesCompleted += phase1Modules.length;
    
    // Phase 2: Sequential modules that depend on Phase 1 or need browser resources
    const phase2Modules = ALL_MODULES_IN_ORDER.filter(m => !phase1Modules.includes(m));
    
    for (const moduleName of phase2Modules) {
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
        
        totalFindings += moduleFindings;
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

    // If no real findings, the scan failed
    if (totalFindings === 0) {
      throw new Error(`No real security findings discovered for ${domain}. Comprehensive scan failed to produce actionable results.`);
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
      `Comprehensive security scan completed - ${totalFindings} verified findings across ${TOTAL_MODULES} security modules. Findings ready for processing.`
    );
    
    log(`✅ COMPREHENSIVE SCAN COMPLETED for ${companyName}: ${totalFindings} verified findings, ${totalArtifactsCount} artifacts across ${TOTAL_MODULES} security modules`);

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
  log('Starting security scanning worker');
  
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
  } catch (error) {
    log('Database initialization failed:', (error as Error).message);
    process.exit(1);
  }

  // Main processing loop
  while (true) {
    try {
      const job = await queue.getNextJob();
      
      if (job) {
        log('Processing scan job:', job.id);
        await processScan(job);
      } else {
        // No jobs available, wait
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
    } catch (error) {
      log('Worker error:', (error as Error).message);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('Received SIGINT, shutting down...');
  process.exit(0);
});

startWorker().catch(error => {
  log('CRITICAL: Failed to start worker:', (error as Error).message);
  process.exit(1);
});
