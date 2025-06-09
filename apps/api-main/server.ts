import { config } from 'dotenv';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { UpstashQueue } from '../workers/core/queue.js';
import { nanoid } from 'nanoid';
import { generateSecurityReport, generateExecutiveSummary } from './services/reportGenerator.js';
import { pool } from '../workers/core/artifactStore.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });
const queue = new UpstashQueue(process.env.REDIS_URL!);

function log(...args: any[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]`, ...args);
}

// Register static file serving for the public directory
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
  prefix: '/', // serve files from root
});

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Create a new scan
fastify.post('/scan', async (request, reply) => {
  const { companyName, domain } = request.body as { companyName: string; domain: string };
  
  if (!companyName || !domain) {
    reply.status(400);
    return { error: 'Company name and domain are required' };
  }

  const scanId = nanoid(11);
  const job = {
    id: scanId,
    companyName,
    domain,
    createdAt: new Date().toISOString()
  };

  await queue.addJob(scanId, job);
  log('[api] Created scan job', scanId, 'for', companyName);

  return {
    scanId,
    status: 'queued',
    companyName,
    domain,
    message: 'Scan started successfully'
  };
});

// Get scan status
fastify.get('/scan/:scanId/status', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  const status = await queue.getStatus(scanId);
  
  if (!status) {
    reply.status(404);
    return { error: 'Scan not found' };
  }

  return {
    scanId,
    ...status
  };
});

// Generate AI-powered security report
fastify.get('/scan/:scanId/report', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  try {
    // Get scan status first
    const status = await queue.getStatus(scanId);
    if (!status) {
      reply.status(404);
      return { error: 'Scan not found' };
    }

    if (status.state !== 'done') {
      reply.status(400);
      return { error: 'Scan not completed yet', status: status.state };
    }

    // Get company info from the original scan job or artifacts
    const artifactQuery = await pool.query(
      `SELECT meta->>'company' as company_name, meta->>'domain' as domain 
       FROM artifacts 
       WHERE meta->>'scan_id' = $1 
       AND meta->>'company' IS NOT NULL
       LIMIT 1`,
      [scanId]
    );
    
    const companyName = artifactQuery.rows[0]?.company_name || 'Unknown Company';
    const domain = artifactQuery.rows[0]?.domain || 'unknown.com';

    log('[api] Generating security report for scan', scanId);
    const report = await generateSecurityReport(scanId, companyName, domain);

    return {
      scanId,
      report,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    log('[api] Report generation error:', (error as Error).message);
    reply.status(500);
    return { error: 'Failed to generate report', details: (error as Error).message };
  }
});

// Generate executive summary
fastify.get('/scan/:scanId/summary', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  try {
    const status = await queue.getStatus(scanId);
    if (!status) {
      reply.status(404);
      return { error: 'Scan not found' };
    }

    if (status.state !== 'done') {
      reply.status(400);
      return { error: 'Scan not completed yet', status: status.state };
    }

    // Get company info from artifacts
    const artifactQuery = await pool.query(
      `SELECT meta->>'company' as company_name 
       FROM artifacts 
       WHERE meta->>'scan_id' = $1 
       AND meta->>'company' IS NOT NULL
       LIMIT 1`,
      [scanId]
    );
    
    const companyName = artifactQuery.rows[0]?.company_name || 'Unknown Company';
    
    log('[api] Generating executive summary for scan', scanId);
    const summary = await generateExecutiveSummary(scanId, companyName);

    return {
      scanId,
      summary,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    log('[api] Summary generation error:', (error as Error).message);
    reply.status(500);
    return { error: 'Failed to generate summary', details: (error as Error).message };
  }
});

// Get raw artifacts from scan
fastify.get('/scan/:scanId/artifacts', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  try {
    // This would query the database for artifacts
    // For now, return a placeholder
    return {
      scanId,
      artifacts: [],
      message: 'Artifact retrieval endpoint ready - database query to be implemented'
    };
  } catch (error) {
    reply.status(500);
    return { error: 'Failed to retrieve artifacts' };
  }
});

// Webhook callback endpoint (for future use)
fastify.post('/scan/:id/callback', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    log('[api] Received callback for scan', id);
    return { received: true };
  } catch (error) {
    log('[api] Error handling callback:', (error as Error).message);
    return reply.status(500).send({ error: 'Callback failed' });
  }
});

// Regenerate report with o4-mini and higher token limit
fastify.post('/scan/:scanId/regenerate-report', async (request, reply) => {
  const { scanId } = request.params as { scanId: string };
  
  try {
    log('[api] Regenerating report with o4-mini for scan', scanId);
    
    // Get scan status first
    const status = await queue.getStatus(scanId);
    if (!status) {
      reply.status(404);
      return { error: 'Scan not found' };
    }

    if (status.state !== 'done') {
      reply.status(400);
      return { error: 'Scan not completed yet', status: status.state };
    }

    // Get scan findings data
    const artifactsResult = await pool.query(`
      SELECT * FROM artifacts 
      WHERE meta->>'scan_id' = $1
      ORDER BY severity DESC, created_at DESC
    `, [scanId]);
    
    log(`[api] Found ${artifactsResult.rows.length} artifacts for scan ${scanId}`);
    
    if (artifactsResult.rows.length === 0) {
      reply.status(404);
      return { error: 'No scan data found' };
    }

    // Get company info from artifacts
    const artifactQuery = await pool.query(
      `SELECT meta->>'company' as company_name, meta->>'domain' as domain 
       FROM artifacts 
       WHERE meta->>'scan_id' = $1 
       AND meta->>'company' IS NOT NULL
       LIMIT 1`,
      [scanId]
    );
    
    const companyName = artifactQuery.rows[0]?.company_name || 'Unknown Company';
    const domain = artifactQuery.rows[0]?.domain || 'unknown.com';

    // Import the financial calculation functions
    const { calculateFinancialImpact, generateFinancialJustification, formatFinancialRange } = await import('../workers/core/riskCalculator.js');
    
    // Calculate financial impact
    const companyProfile = {
      industry: 'hospitality',
      hasCustomerData: true,
      isPublicCompany: false,
      regulatoryScope: ['GDPR', 'PCI-DSS']
    };
    
    const findingsForCalculation = artifactsResult.rows.map(finding => ({
      type: finding.type,
      severity: finding.severity,
      count: 1
    }));
    
    const financialCalculation = calculateFinancialImpact(findingsForCalculation, companyProfile);
    const financialJustification = generateFinancialJustification(financialCalculation);
    
    log(`[api] Financial impact calculated: ${formatFinancialRange(financialCalculation)}`);

    // Prepare findings summary (truncate if too large for token limits)
    const findingsSummary = artifactsResult.rows.slice(0, 25).map(finding => {
      const meta = finding.meta || {};
      return {
        type: finding.type,
        severity: finding.severity,
        description: finding.val_text?.substring(0, 150) + (finding.val_text?.length > 150 ? '...' : ''),
        source: finding.src_url,
        technical_details: {
          ip_address: meta.service_info?.ip || 'Unknown',
          port: meta.service_info?.port || 'Unknown',
          protocol: meta.service_info?.protocol || 'Unknown',
          product: meta.service_info?.product || 'Unknown'
        },
        scan_module: meta.tool || 'Unknown'
      };
    });

    const userPrompt = `Generate a due diligence briefing for ${companyName} (${domain}) based on cybersecurity reconnaissance data.

COMPANY: ${companyName}
DOMAIN: ${domain}
SCAN DATE: ${new Date().toISOString().split('T')[0]}
DATA SOURCES: Network scanning via Shodan and other OSINT tools
TOTAL FINDINGS: ${artifactsResult.rows.length} (showing top 25 most critical)

FINDINGS DATA:
${JSON.stringify(findingsSummary, null, 2)}

${financialJustification}

**CRITICAL REQUIREMENT:** Use the financial impact calculation above as the basis for all dollar amounts in your report. Do not create new financial estimates. Reference the specific data sources and methodology provided.

Follow the DealBrief format exactly. Focus on material business risks, not theoretical concerns. Use plain English and cite sources properly.`;

    // Import OpenAI and generate report with higher token limit
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    log(`[api] Generating report with o4-mini (16K tokens)...`);
    const response = await openai.chat.completions.create({
      model: 'o4-mini',
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
        { role: 'user', content: userPrompt }
      ],
      max_completion_tokens: 16000
    });
    
    const report = response.choices[0].message.content || 'Report generation failed';
    log(`[api] Report generated successfully - ${report.length} characters`);
    
    // Save the regenerated report
    const { insertArtifact } = await import('../workers/core/artifactStore.js');
    await insertArtifact({
      type: 'ai_reports_regenerated',
      val_text: `AI report regenerated successfully for ${companyName} using o4-mini`,
      severity: 'INFO',
      meta: {
        scan_id: scanId,
        openai_report: report,
        model_used: 'o4-mini',
        token_limit: 16000,
        company: companyName,
        domain: domain,
        timestamp: new Date().toISOString(),
        findings_count: artifactsResult.rows.length
      }
    });

    return {
      scanId,
      report,
      model: 'o4-mini',
      tokenLimit: 16000,
      findingsCount: artifactsResult.rows.length,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    log('[api] Report regeneration error:', (error as Error).message);
    reply.status(500);
    return { error: 'Failed to regenerate report', details: (error as Error).message };
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    log('[api] Server listening on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
