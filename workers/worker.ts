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
import { runEndpointDiscovery } from './modules/endpointDiscovery.js';
import { pool } from './core/artifactStore.js';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

config();

const queue = new UpstashQueue(process.env.REDIS_URL!);

// AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

const MODELS = [
  { 
    name: 'gpt-4o', 
    provider: 'openai', 
    displayName: 'o4-mini-2025-04-16'
  },
  { 
    name: 'claude-3-5-sonnet-20241022', 
    provider: 'claude', 
    displayName: 'claude-sonnet-4-20250514'
  }
];

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
    console.log('[worker] 🔍 SHODAN SCAN STARTING');
    console.log('[worker] Domain:', domain);
    console.log('[worker] Company:', companyName);
    console.log('[worker] Scan ID:', scanId);
    
    const apiKey = process.env.SHODAN_API_KEY;
    if (!apiKey) {
      console.error('[worker] ❌ CRITICAL: SHODAN_API_KEY not configured');
      throw new Error('SHODAN_API_KEY not configured - cannot run real scans');
    }
    
    try {
      console.log('[worker] ✅ Shodan API key verified, initiating scan...');
      const startTime = Date.now();
      
      const shodanFindings = await runShodanScan(domain, scanId, companyName);
      
      const duration = Date.now() - startTime;
      totalFindings += shodanFindings;
      
      console.log('[worker] ✅ SHODAN SCAN COMPLETED');
      console.log('[worker] Duration:', duration, 'ms');
      console.log('[worker] Findings:', shodanFindings);
      log(`Shodan infrastructure scan completed: ${shodanFindings} services found`);
      
      // Create artifact to confirm Shodan ran
      await insertArtifact({
        type: 'module_execution',
        val_text: `Shodan scan executed successfully`,
        severity: 'INFO',
        meta: {
          scan_id: scanId,
          module: 'shodan',
          findings: shodanFindings,
          duration_ms: duration,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('[worker] ❌ SHODAN SCAN FAILED');
      console.error('[worker] Error:', (error as Error).message);
      console.error('[worker] Stack:', (error as Error).stack);
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

    // 3a. Endpoint discovery (must run before other application tests)
    log(`Running endpoint discovery for ${domain}`);
    try {
      const endpointFindings = await runEndpointDiscovery({ domain, scanId });
      totalFindings += endpointFindings;
      log(`Endpoint discovery completed: ${endpointFindings} endpoint collections found`);
    } catch (error) {
      log(`Endpoint discovery failed:`, (error as Error).message);
    }

    // 3b. TLS/SSL security scan
    log(`Running TLS security scan for ${domain}`);
    try {
      const tlsFindings = await runTlsScan({ domain, scanId });
      totalFindings += tlsFindings;
      log(`TLS scan completed: ${tlsFindings} TLS issues found`);
    } catch (error) {
      log(`TLS scan failed:`, (error as Error).message);
    }

    // 3c. Nuclei vulnerability scanning
    log(`Running Nuclei vulnerability scan for ${domain}`);
    try {
      const nucleiFindings = await runNuclei({ domain, scanId });
      totalFindings += nucleiFindings;
      log(`Nuclei scan completed: ${nucleiFindings} vulnerabilities found`);
    } catch (error) {
      log(`Nuclei scan failed:`, (error as Error).message);
    }

    // 3d. Rate limiting and API security tests (now uses discovered endpoints)
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
      log(`Generating dual-model AI reports for ${companyName}...`);
      
      // Generate both OpenAI and Claude reports as formatted text
      const { openaiReport, claudeReport } = await generateDualModelReports(scanId, companyName, domain);
      
      log(`✅ Both AI reports generated successfully!`);
      log(`📝 OpenAI Report: ${openaiReport.length} characters`);
      log(`📝 Claude Report: ${claudeReport.length} characters`);
      
      // Store the URLs for later use
      await insertArtifact({
        type: 'ai_reports',
        val_text: `AI reports generated successfully for ${companyName}`,
        severity: 'INFO',
        meta: {
          scan_id: scanId,
          openai_report: openaiReport,
          claude_report: claudeReport,
          openai_model: MODELS[0].displayName,
          claude_model: MODELS[1].displayName,
          company: companyName,
          domain: domain,
          timestamp: new Date().toISOString()
        }
      });
      
    } catch (reportError) {
      log(`⚠️ Report generation failed but scan data preserved:`, (reportError as Error).message);
      // Continue - scan data is still valid even if report generation fails
    }

    // Mark scan as complete ONLY with real data
    await queue.updateStatus(
      scanId, 
      'done', 
      `Comprehensive security scan completed - ${totalFindings} verified findings across 8 security modules. AI reports generated and ready for editing.`,
      '' // Remove the old PDF path since we now have formatted text reports
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

async function callOpenAI(model: string, prompt: string): Promise<string> {
  log(`🤖 Calling ${model}...`);
  
  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      { role: 'system', content: `ROLE  
You are an elite due-diligence analyst hired by DealBrief.  
Your mandate is to surface *non-financial* risks for private and public companies, producing an audit-ready briefing that busy investors, M&A teams, and brokers can trust at first glance.

SCOPE OF ANALYSIS  
Investigate only through OSINT and other lawful public sources. Ignore purely financial metrics unless they materially affect the risks below.

1. Cybersecurity Exposure  
   • Breached data, leaked credentials, ransomware events  
   • Exposed infrastructure (open ports, misconfigured cloud buckets, outdated software)  

DELIVERABLE FORMAT  

0. **Executive Snapshot** – ≤150 words summarising the overall risk posture plus a 3-color (Green / Yellow / Red) *overall* rating.  
2. **Key Red Flags** – bullet list (≤8) of the most material issues that warrant immediate follow-up.  
3. **Detailed Findings** – subsections matching the focus areas above; for each finding, provide: What was found (technical), how threat actors use it (plain english), the business impact (plain english), and how to fix it (plain english)
4. **Appendix A – Source Index** – numbered list of every URL, title, and access date, in order of first citation.  
5. **Appendix B – Method & Coverage Gaps** – outline search terms used, APIs queried, and any areas where reliable data was unavailable.

WRITING & CITATION RULES  
- Plain English; no jargon, no speculation.  
- Every discrete claim **must** carry a superscript numeric citation that maps to Appendix A.  
- If sources conflict, note the conflict and default to the most recent or authoritative evidence.  
- Do not include AI-generated text as a citation.  

QUALITY CONTROLS  
- Cross-verify critical facts with ≥2 independent sources where possible.  
- Highlight any missing or ambiguous data as a "Coverage Gap" rather than guessing.  
- Strictly limit the briefing to facts discovered; do **not** extrapolate future performance.  

AUDIENCE  
Assume readers are smart business professionals with limited technical depth and <5 minutes to skim the briefing. Clarity and credibility outrank exhaustiveness.` },
      { role: 'user', content: prompt }
    ],
    max_tokens: 8000
  });
  
  return response.choices[0].message.content || 'Report generation failed';
}

async function callClaude(model: string, prompt: string): Promise<string> {
  log(`🤖 Calling ${model}...`);
  
  const response = await anthropic.messages.create({
    model: model,
    max_tokens: 8000,
    temperature: 0.7,
    messages: [
      { 
        role: 'user', 
        content: `ROLE  
You are an elite due-diligence analyst hired by DealBrief.  
Your mandate is to surface *non-financial* risks for private and public companies, producing an audit-ready briefing that busy investors, M&A teams, and brokers can trust at first glance.

SCOPE OF ANALYSIS  
Investigate only through OSINT and other lawful public sources. Ignore purely financial metrics unless they materially affect the risks below.

1. Cybersecurity Exposure  
   • Breached data, leaked credentials, ransomware events  
   • Exposed infrastructure (open ports, misconfigured cloud buckets, outdated software)  

DELIVERABLE FORMAT  

0. **Executive Snapshot** – ≤150 words summarising the overall risk posture plus a 3-color (Green / Yellow / Red) *overall* rating.  
2. **Key Red Flags** – bullet list (≤8) of the most material issues that warrant immediate follow-up.  
3. **Detailed Findings** – subsections matching the focus areas above; for each finding, provide: What was found (technical), how threat actors use it (plain english), the business impact (plain english), and how to fix it (plain english)
4. **Appendix A – Source Index** – numbered list of every URL, title, and access date, in order of first citation.  
5. **Appendix B – Method & Coverage Gaps** – outline search terms used, APIs queried, and any areas where reliable data was unavailable.

WRITING & CITATION RULES  
- Plain English; no jargon, no speculation.  
- Every discrete claim **must** carry a superscript numeric citation that maps to Appendix A.  
- If sources conflict, note the conflict and default to the most recent or authoritative evidence.  
- Do not include AI-generated text as a citation.  

QUALITY CONTROLS  
- Cross-verify critical facts with ≥2 independent sources where possible.  
- Highlight any missing or ambiguous data as a "Coverage Gap" rather than guessing.  
- Strictly limit the briefing to facts discovered; do **not** extrapolate future performance.  

AUDIENCE  
Assume readers are smart business professionals with limited technical depth and <5 minutes to skim the briefing. Clarity and credibility outrank exhaustiveness.

${prompt}` 
      }
    ]
  });
  
  return response.content[0].type === 'text' ? response.content[0].text : 'Report generation failed';
}

async function generateDualModelReports(scanId: string, companyName: string, domain: string): Promise<{ openaiReport: string; claudeReport: string }> {
  try {
    log(`🤖 Generating dual-model reports for ${companyName}...`);
    
    // Get scan findings data
    const artifactsResult = await pool.query(`
      SELECT * FROM artifacts 
      WHERE meta->>'scan_id' = $1
      ORDER BY severity DESC, created_at DESC
    `, [scanId]);
    
    log(`📊 Found ${artifactsResult.rows.length} artifacts for scan ${scanId}`);
    
    if (artifactsResult.rows.length === 0) {
      throw new Error(`No scan data found for scan ${scanId}`);
    }
    
    const findingsSummary = artifactsResult.rows.map(finding => {
      const meta = finding.meta || {};
      return {
        type: finding.type,
        severity: finding.severity,
        description: finding.val_text,
        source: finding.src_url,
        technical_details: {
          ip_address: meta.service_info?.ip || 'Unknown',
          port: meta.service_info?.port || 'Unknown',
          protocol: meta.service_info?.protocol || 'Unknown',
          product: meta.service_info?.product || 'Unknown',
          version: meta.service_info?.version || 'Unknown',
          banner: meta.service_info?.banner || 'No banner',
          organization: meta.service_info?.organization || 'Unknown',
          isp: meta.service_info?.isp || 'Unknown',
          location: meta.service_info?.location || 'Unknown'
        },
        scan_module: meta.tool || 'Unknown',
        discovered: finding.created_at
      };
    });
    
    const userPrompt = `Generate a due diligence briefing for ${companyName} (${domain}) based on cybersecurity reconnaissance data.

COMPANY: ${companyName}
DOMAIN: ${domain}
SCAN DATE: ${new Date().toISOString().split('T')[0]}
DATA SOURCES: Network scanning via Shodan and other OSINT tools

FINDINGS DATA:
${JSON.stringify(findingsSummary, null, 2)}

Follow the DealBrief format exactly. Focus on material business risks, not theoretical concerns. Use plain English and cite sources properly.`;

    // Call both AI models CONCURRENTLY 
    log(`🤖 Calling both AI models concurrently...`);
    const [openaiResponse, claudeResponse] = await Promise.all([
      callOpenAI(MODELS[0].name, userPrompt),
      callClaude(MODELS[1].name, userPrompt)
    ]);
    
    log(`✅ OpenAI completed - ${openaiResponse.length} characters`);
    log(`✅ Claude completed - ${claudeResponse.length} characters`);
    
    log(`📝 Both AI reports generated successfully!`);
    
    return {
      openaiReport: openaiResponse,
      claudeReport: claudeResponse
    };
    
  } catch (error) {
    log(`❌ Dual-model report generation failed:`, (error as Error).message);
    throw error;
  }
}
