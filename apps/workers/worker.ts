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
import { pool } from './core/artifactStore.js';
import { supabase } from './core/supabaseClient.js';

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
  'db_port_scan',
  'endpoint_discovery',
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
}

// Helper function to update scans_master table
async function updateScanMasterStatus(scanId: string, updates: ScanMasterUpdate): Promise<void> {
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');
  
  const values = [scanId, ...Object.values(updates)];
  
  await pool.query(
    `UPDATE scans_master SET ${setClause}, updated_at = NOW() WHERE scan_id = $1`,
    values
  );
  
  // Mirror to Supabase
  await supabase.from('scan_status').upsert({
    scan_id:         scanId,
    status:          updates.status        ?? undefined,
    progress:        updates.progress      ?? undefined,
    current_module:  updates.current_module?? undefined,
    error_message:   updates.error_message ?? undefined,
    max_severity:    updates.max_severity  ?? undefined,
    updated_at:      new Date().toISOString(),
  }, { onConflict: 'scan_id' }).throwOnError();
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
      completed_at TIMESTAMP WITH TIME ZONE
    );
    
    CREATE INDEX IF NOT EXISTS idx_scans_master_updated_at ON scans_master(updated_at);
    CREATE INDEX IF NOT EXISTS idx_scans_master_status ON scans_master(status);
  `);
}

async function processScan(job: ScanJob): Promise<void> {
  const { id: scanId, companyName, domain } = job;
  
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
    for (const moduleName of ALL_MODULES_IN_ORDER) {
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
          case 'spiderfoot':
            log(`Running SpiderFoot discovery for ${domain}`);
            moduleFindings = await runSpiderFoot({ domain, scanId });
            log(`SpiderFoot discovery completed: ${moduleFindings} targets found`);
            break;
            
          case 'dns_twist':
            log(`Running DNS Twist scan for ${domain}`);
            moduleFindings = await runDnsTwist({ domain, scanId });
            log(`DNS Twist completed: ${moduleFindings} typo-domains found`);
            break;
            
          case 'document_exposure':
            log(`Running document exposure scan for ${companyName}`);
            moduleFindings = await runDocumentExposure({ companyName, domain, scanId });
            log(`Document exposure completed: ${moduleFindings} discoveries`);
            break;
            
          case 'shodan':
            log(`Running Shodan scan for ${domain}`);
            console.log('[worker] 🔍 SHODAN SCAN STARTING');
            
            const apiKey = process.env.SHODAN_API_KEY;
            if (!apiKey) {
              throw new Error('SHODAN_API_KEY not configured');
            }
            
            const startTime = Date.now();
            moduleFindings = await runShodanScan({ domain, scanId, companyName });
            const duration = Date.now() - startTime;
            
            console.log('[worker] ✅ SHODAN SCAN COMPLETED');
            console.log('[worker] Duration:', duration, 'ms');
            console.log('[worker] Findings:', moduleFindings);
            log(`Shodan infrastructure scan completed: ${moduleFindings} services found`);
            break;
            
          case 'db_port_scan':
            log(`Running database port scan for ${domain}`);
            moduleFindings = await runDbPortScan({ domain, scanId });
            log(`Database scan completed: ${moduleFindings} database issues found`);
            break;
            
          case 'endpoint_discovery':
            log(`Running endpoint discovery for ${domain}`);
            moduleFindings = await runEndpointDiscovery({ domain, scanId });
            log(`Endpoint discovery completed: ${moduleFindings} endpoint collections found`);
            break;
            
          case 'tls_scan':
            log(`Running TLS security scan for ${domain}`);
            moduleFindings = await runTlsScan({ domain, scanId });
            log(`TLS scan completed: ${moduleFindings} TLS issues found`);
            break;
            
          case 'nuclei':
            log(`Running Nuclei vulnerability scan for ${domain}`);
            moduleFindings = await runNuclei({ domain, scanId });
            log(`Nuclei scan completed: ${moduleFindings} vulnerabilities found`);
            break;
            
          case 'rate_limit_scan':
            log(`Running rate-limit tests for ${domain}`);
            moduleFindings = await runRateLimitScan({ domain, scanId });
            log(`Rate limiting tests completed: ${moduleFindings} rate limit issues found`);
            break;
            
          case 'spf_dmarc':
            log(`Running SPF/DMARC email security scan for ${domain}`);
            moduleFindings = await runSpfDmarc({ domain, scanId });
            log(`Email security scan completed: ${moduleFindings} email issues found`);
            break;
            
          case 'trufflehog':
            log(`Running TruffleHog secret detection for ${domain}`);
            moduleFindings = await runTrufflehog({ domain, scanId });
            log(`Secret detection completed: ${moduleFindings} secrets found`);
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
    // Calculate findings stats
    const findingsStats = await pool.query(
        `SELECT 
            COUNT(*) as total_findings,
            MAX(CASE 
                WHEN severity = 'CRITICAL' THEN 5
                WHEN severity = 'HIGH' THEN 4
                WHEN severity = 'MEDIUM' THEN 3
                WHEN severity = 'LOW' THEN 2
                WHEN severity = 'INFO' THEN 1
                ELSE 0 
            END) as max_severity_score
         FROM findings WHERE scan_id = $1`,
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
      max_severity: maxSeverity
    });

    await queue.updateStatus(
      scanId, 
      'done', 
      `Comprehensive security scan completed - ${totalFindings} verified findings across ${TOTAL_MODULES} security modules. Findings ready for processing.`
    );
    
    log(`✅ COMPREHENSIVE SCAN COMPLETED for ${companyName}: ${totalFindings} verified findings across ${TOTAL_MODULES} security modules`);

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
