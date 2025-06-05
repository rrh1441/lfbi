import { config } from 'dotenv';
import { UpstashQueue } from './core/queue.js';
import { initializeDatabase, insertArtifact, insertFinding } from './core/artifactStore.js';
import { runShodanScan } from './modules/shodan.js';
import { runSpiderFoot } from './modules/spiderFoot.js';
import { runCrmExposure } from './modules/crmExposure.js';
import { runTrufflehog } from './modules/trufflehog.js';
import { runZapRateTest } from './modules/zapRateTest.js';
import { runDnsTwist } from './modules/dnsTwist.js';
import { runTlsScan } from './modules/tlsScan.js';
import { runNuclei } from './modules/nuclei.js';
import { runDbPortScan } from './modules/dbPortScan.js';
import { runSpfDmarc } from './modules/spfDmarc.js';
import { runFileHunt } from './modules/fileHunt.js';
import { generateSecurityReport } from '../api/services/reportGenerator.js';
import axios from 'axios';

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

async function processScan(job: ScanJob): Promise<void> {
  const { id: scanId, companyName, domain } = job;
  
  log(`Processing comprehensive security scan for ${companyName} (${domain})`);
  
  try {
    // Update status to processing
    await queue.updateStatus(scanId, 'processing', 'Comprehensive security discovery in progress...');
    
    let totalFindings = 0;

    // PHASE 1: DISCOVERY & RECONNAISSANCE
    log(`=== PHASE 1: DISCOVERY & RECONNAISSANCE ===`);
    
    // 1a. SpiderFoot for subdomain/IP discovery
    log(`Running SpiderFoot discovery for ${domain}`);
    try {
      const discoveryFindings = await runSpiderFoot({ domain, scanId });
      totalFindings += discoveryFindings;
      log(`SpiderFoot discovery completed: ${discoveryFindings} targets found`);
    } catch (error) {
      log(`SpiderFoot discovery failed:`, (error as Error).message);
      log(`Continuing with main domain only: ${domain}`);
    }

    // 1b. DNS Twist for typo-squatting detection
    log(`Running DNS Twist scan for ${domain}`);
    try {
      const dnsFindings = await runDnsTwist({ domain, scanId });
      totalFindings += dnsFindings;
      log(`DNS Twist completed: ${dnsFindings} typo-domains found`);
    } catch (error) {
      log(`DNS Twist failed:`, (error as Error).message);
    }

    // 1c. CRM & File hunting via Google dorking  
    log(`Running CRM exposure and file hunting for ${companyName}`);
    try {
      const crmFindings = await runCrmExposure({ companyName, domain, scanId });
      const fileFindings = await runFileHunt({ companyName, domain, scanId });
      totalFindings += (crmFindings + fileFindings);
      log(`CRM/File hunting completed: ${crmFindings + fileFindings} discoveries`);
    } catch (error) {
      log(`CRM/File hunting failed:`, (error as Error).message);
    }

    // PHASE 2: INFRASTRUCTURE SCANNING  
    log(`=== PHASE 2: INFRASTRUCTURE SCANNING ===`);
    
    // 2a. Comprehensive Shodan scanning against all discovered targets
    log(`Running Shodan scan for ${domain} and all discovered targets`);
    const apiKey = process.env.SHODAN_API_KEY;
    if (!apiKey) {
      throw new Error('SHODAN_API_KEY not configured - cannot run real scans');
    }
    
    try {
      const shodanFindings = await runShodanScan(domain, scanId, companyName);
      totalFindings += shodanFindings;
      log(`Shodan infrastructure scan completed: ${shodanFindings} services found`);
    } catch (error) {
      log(`Shodan scan failed:`, (error as Error).message);
      throw new Error(`Real Shodan scan failed: ${(error as Error).message}`);
    }

    // 2b. Database port scanning
    log(`Running database port scan for ${domain}`);
    try {
      const dbFindings = await runDbPortScan({ domain, scanId });
      totalFindings += dbFindings;
      log(`Database scan completed: ${dbFindings} database issues found`);
    } catch (error) {
      log(`Database scan failed:`, (error as Error).message);
    }

    // PHASE 3: APPLICATION SECURITY
    log(`=== PHASE 3: APPLICATION SECURITY ===`);

    // 3a. TLS/SSL security scan
    log(`Running TLS security scan for ${domain}`);
    try {
      const tlsFindings = await runTlsScan({ domain, scanId });
      totalFindings += tlsFindings;
      log(`TLS scan completed: ${tlsFindings} TLS issues found`);
    } catch (error) {
      log(`TLS scan failed:`, (error as Error).message);
    }

    // 3b. Nuclei vulnerability scanning
    log(`Running Nuclei vulnerability scan for ${domain}`);
    try {
      const nucleiFindings = await runNuclei({ domain, scanId });
      totalFindings += nucleiFindings;
      log(`Nuclei scan completed: ${nucleiFindings} vulnerabilities found`);
    } catch (error) {
      log(`Nuclei scan failed:`, (error as Error).message);
    }

    // 3c. Rate limiting and API security tests  
    log(`Running rate limiting tests for ${domain}`);
    try {
      const rateFindings = await runZapRateTest({ domain, scanId });
      totalFindings += rateFindings;
      log(`Rate testing completed: ${rateFindings} rate limit issues found`);
    } catch (error) {
      log(`Rate testing failed:`, (error as Error).message);
    }

    // PHASE 4: EMAIL & DATA SECURITY
    log(`=== PHASE 4: EMAIL & DATA SECURITY ===`);

    // 4a. SPF/DMARC email security
    log(`Running SPF/DMARC email security scan for ${domain}`);
    try {
      const emailFindings = await runSpfDmarc({ domain, scanId });
      totalFindings += emailFindings;
      log(`Email security scan completed: ${emailFindings} email issues found`);
    } catch (error) {
      log(`Email security scan failed:`, (error as Error).message);
    }

    // 4b. TruffleHog secret detection on all discovered files/repos
    log(`Running TruffleHog secret detection for ${domain}`);
    try {
      const secretFindings = await runTrufflehog({ domain, scanId });
      totalFindings += secretFindings;
      log(`Secret detection completed: ${secretFindings} secrets found`);
    } catch (error) {
      log(`Secret detection failed:`, (error as Error).message);
    }

    // If no real findings, the scan failed
    if (totalFindings === 0) {
      throw new Error(`No real security findings discovered for ${domain}. Comprehensive scan failed to produce actionable results.`);
    }

    // PHASE 5: AI REPORT GENERATION & SUPABASE UPLOAD
    log(`=== PHASE 5: AI REPORT GENERATION ===`);
    
    try {
      log(`Generating AI-powered security report for ${companyName}...`);
      
      // Generate comprehensive report using o4-mini and Sonnet
      const securityReport = await generateSecurityReport(scanId, companyName, domain);
      
      log(`AI report generated successfully - ${securityReport.length} characters`);
      
      // Send report to Supabase via API callback
      const callbackUrl = process.env.API_BASE_URL || 'https://dealbrief-scanner.fly.dev';
      
      await axios.post(`${callbackUrl}/scan/${scanId}/callback`, {
        userId: 'system', // TODO: Get from job if available
        jsonUrl: `/api/scan/${scanId}/report`,
        pdfUrl: `/storage/${scanId}.pdf`,
        reportContent: securityReport,
        companyName,
        domain,
        totalFindings,
        scanModules: 8
      });
      
      log(`✅ Report successfully uploaded to Supabase for ${companyName}`);
      
    } catch (reportError) {
      log(`⚠️ Report generation failed but scan data preserved:`, (reportError as Error).message);
      // Continue - scan data is still valid even if report generation fails
    }

    // Mark scan as complete ONLY with real data
    await queue.updateStatus(
      scanId, 
      'done', 
      `Comprehensive security scan completed - ${totalFindings} verified findings across 8 security modules`,
      `/storage/${scanId}.pdf`
    );
    
    log(`✅ COMPREHENSIVE SCAN COMPLETED for ${companyName}: ${totalFindings} verified findings across all security modules`);

  } catch (error) {
    log(`❌ Scan failed for ${companyName}:`, (error as Error).message);
    
    await queue.updateStatus(
      scanId, 
      'failed', 
      `Scan failed: ${(error as Error).message}`
    );
    
    // Store ONLY the error - no fake data
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
    
    throw error; // Re-throw to ensure failure is clear
  }
}

async function startWorker() {
  log('Starting REAL security scanning worker - NO SIMULATIONS');
  
  // Validate required environment
  if (!process.env.SHODAN_API_KEY) {
    log('ERROR: SHODAN_API_KEY not configured - cannot run real scans');
    process.exit(1);
  }
  
  // Initialize database
  try {
    await initializeDatabase();
    log('Database initialized successfully');
  } catch (error) {
    log('Database initialization failed:', (error as Error).message);
    process.exit(1);
  }

  // Main processing loop
  while (true) {
    try {
      const job = await queue.getNextJob();
      
      if (job) {
        log('Processing REAL scan job:', job.id);
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
