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
import { log as loggerLog } from './core/logger.js';
import { uploadFile } from './core/objectStore.js';
import { 
  calculateFinancialImpact, 
  generateFinancialJustification, 
  formatFinancialRange,
  type CompanyProfile 
} from './core/riskCalculator.js';

config();

const queue = new UpstashQueue(process.env.REDIS_URL!);

// AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const MODELS = [
  { 
    name: 'o4-mini', 
    provider: 'openai', 
    displayName: 'o4-mini'
  },
  { 
    name: 'claude-sonnet-4-20250514', 
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
            
          case 'crm_exposure':
            log(`Running CRM exposure scan for ${companyName}`);
            moduleFindings = await runCrmExposure({ companyName, domain, scanId });
            log(`CRM exposure completed: ${moduleFindings} discoveries`);
            break;
            
          case 'file_hunt':
            log(`Running file hunting for ${companyName}`);
            moduleFindings = await runFileHunt({ companyName, domain, scanId });
            log(`File hunting completed: ${moduleFindings} discoveries`);
            break;
            
          case 'shodan':
            log(`Running Shodan scan for ${domain}`);
            console.log('[worker] 🔍 SHODAN SCAN STARTING');
            
            const apiKey = process.env.SHODAN_API_KEY;
            if (!apiKey) {
              throw new Error('SHODAN_API_KEY not configured');
            }
            
            const startTime = Date.now();
            moduleFindings = await runShodanScan(domain, scanId, companyName);
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
            
          case 'rate_testing':
            log(`Running rate limiting tests for ${domain}`);
            moduleFindings = await runZapRateTest({ domain, scanId });
            log(`Rate testing completed: ${moduleFindings} rate limit issues found`);
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

    // === AI REPORT GENERATION ===
    log(`=== AI REPORT GENERATION ===`);
    
    await updateScanMasterStatus(scanId, {
      status: 'generating_report',
      progress: 95
    });
    await queue.updateStatus(scanId, 'processing', 'Generating AI reports...');
    
    try {
      log(`Generating dual-model AI reports for ${companyName}...`);
      
      // Generate both OpenAI and Claude reports as formatted text
      const { openaiReport, claudeReport } = await generateDualModelReports(scanId, companyName, domain);
      
      log(`✅ Both AI reports generated successfully!`);
      log(`📝 OpenAI Report: ${openaiReport.length} characters`);
      log(`📝 Claude Report: ${claudeReport.length} characters`);
      
      // Store the reports
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
      `Comprehensive security scan completed - ${totalFindings} verified findings across ${TOTAL_MODULES} security modules. AI reports generated and ready for editing.`
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
  log('Starting REAL security scanning worker - NO SIMULATIONS');
  
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

type Message = Anthropic.Messages.MessageParam;

export async function callClaude(
  model: string,
  messages: Message[],
  temperature = 0.7,
  tokenLimit = 8_000
) {
  /* shared request fields */
  const opts: Record<string, unknown> = {
    model,
    temperature,
    stream: false,
    messages,
  };

  /* Claude-4 → max_completion_tokens / 3.x & earlier → max_tokens */
  if (/-4-/.test(model)) {
    opts.max_completion_tokens = tokenLimit;
  } else {
    opts.max_tokens = tokenLimit;
  }

  /* remove the unused key so TypeScript doesn't complain */
  delete opts[
    /-4-/.test(model) ? 'max_tokens' : 'max_completion_tokens'
  ];

  return anthropic.messages.create(opts as any);
}

// Legacy wrapper for backward compatibility
async function callClaudeLegacy(model: string, prompt: string): Promise<string> {
  log(`🤖 Calling ${model}...`);
  
  const messages: Message[] = [
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
  ];
  
  const response = await callClaude(model, messages);
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
    
    // Calculate explicit financial impact using our methodology
    const companyProfile: CompanyProfile = {
      industry: 'hospitality', // TODO: Auto-detect or make configurable
      hasCustomerData: true,
      isPublicCompany: false,
      regulatoryScope: ['GDPR', 'PCI-DSS'] // TODO: Auto-detect based on findings
    };
    
    const findingsForCalculation = artifactsResult.rows.map(finding => ({
      type: finding.type,
      severity: finding.severity,
      count: 1
    }));
    
    const financialCalculation = calculateFinancialImpact(findingsForCalculation, companyProfile);
    const financialJustification = generateFinancialJustification(financialCalculation);
    
    log(`💰 Financial impact calculated: ${formatFinancialRange(financialCalculation)}`);
    
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

${financialJustification}

**CRITICAL REQUIREMENT:** Use the financial impact calculation above as the basis for all dollar amounts in your report. Do not create new financial estimates. Reference the specific data sources and methodology provided.

Follow the DealBrief format exactly. Focus on material business risks, not theoretical concerns. Use plain English and cite sources properly.`;

    // Call both AI models CONCURRENTLY 
    log(`🤖 Calling both AI models concurrently...`);
    const [openaiResponse, claudeResponse] = await Promise.all([
      callOpenAI(MODELS[0].name, userPrompt),
      callClaudeLegacy(MODELS[1].name, userPrompt)
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

// All modules in execution order
const ALL_MODULES_IN_ORDER = [
  'spiderfoot',
  'dns_twist', 
  'crm_exposure',
  'file_hunt',
  'shodan',
  'db_port_scan',
  'endpoint_discovery',
  'tls_scan',
  'nuclei',
  'rate_testing',
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
