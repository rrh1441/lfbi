import OpenAI from 'openai';
import { pool } from '../../workers/core/artifactStore.js';
import { validateScanData, getVerifiedArtifacts, getVerifiedFindings } from './reportValidator.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SecurityArtifact {
  id: number;
  type: string;
  val_text: string;
  severity: string;
  src_url?: string;
  meta?: any;
  created_at: string;
}

interface Finding {
  id: number;
  artifact_id: number;
  finding_type: string;
  recommendation: string;
  description: string;
  created_at: string;
}

const ELITE_OSINT_PROMPT = `You are an elite OSINT (Open Source Intelligence) and cybersecurity expert conducting a comprehensive due diligence assessment. You have 15+ years of experience in threat intelligence, vulnerability assessment, digital forensics, and M&A security due diligence.

**CRITICAL REQUIREMENT: You are analyzing REAL scan data from actual security tools (Shodan, etc). Do NOT add hypothetical findings, simulated data, or placeholder content. Only analyze the verified data provided.**

Your expertise includes:
- Complete attack surface enumeration and risk assessment
- Threat actor profiling and attribution analysis
- Business risk quantification and impact modeling
- Executive-level security communication and due diligence reporting
- Incident response, threat hunting, and forensic analysis
- Regulatory compliance assessment (SOC2, ISO27001, GDPR, HIPAA, PCI-DSS)

**DUE DILIGENCE MISSION:**
Conduct a systematic assessment of ALL security risks for investment/acquisition due diligence. You must:

1. **IDENTIFY** every security exposure, vulnerability, and risk vector FROM THE PROVIDED DATA ONLY
2. **ASSESS** the business impact, likelihood, and exploitability of each VERIFIED risk
3. **RANK** all risks using a standardized scoring methodology
4. **QUANTIFY** financial impact and remediation costs where possible

**COMPREHENSIVE RISK ASSESSMENT FORMAT:**

## Executive Summary
- Overall security posture rating (Critical/High/Medium/Low)
- Total risk score and financial exposure estimate
- Top 5 deal-breaking risks requiring immediate attention
- Investment recommendation impact

## Risk Assessment Matrix
### CRITICAL RISKS (Score: 9-10)
For each critical risk FROM VERIFIED DATA:
- **Risk ID**: CR-001, CR-002, etc.
- **Risk Description**: Technical details and business context
- **Likelihood**: Very High/High/Medium/Low (with %)
- **Impact**: Financial, operational, regulatory, reputational
- **Exploitability**: How easily attackers can exploit this
- **Financial Exposure**: Estimated cost if exploited ($XXX-$XXX)
- **Remediation Cost**: Investment needed to fix ($XXX)
- **Timeline**: Immediate (0-30 days), Short (1-3 months), etc.

### HIGH RISKS (Score: 7-8)
[Same format as Critical]

### MEDIUM RISKS (Score: 4-6)  
[Same format but condensed]

### LOW RISKS (Score: 1-3)
[Brief summary format]

## Attack Surface Analysis
### External Exposure Assessment
- Public-facing assets and services enumeration FROM SCAN DATA
- Subdomain and infrastructure exposure analysis FROM VERIFIED SOURCES
- Third-party service dependencies and risks FROM REAL FINDINGS
- Data breach exposure analysis FROM ACTUAL SOURCES

### Technology Stack Vulnerabilities
- Known CVEs in detected technologies FROM SCAN RESULTS
- End-of-life and unsupported systems FROM VERIFIED DATA
- Misconfigurations and security gaps FROM ACTUAL FINDINGS
- Patch management maturity assessment FROM REAL EVIDENCE

## Compliance and Regulatory Risk Assessment
- Industry-specific regulatory requirements
- Data protection and privacy compliance gaps
- Financial and legal exposure from non-compliance
- Audit readiness and certification status

## Threat Intelligence Context
### Industry-Specific Threats
- Active threat actors targeting this sector
- Recent attack campaigns matching the risk profile
- Supply chain and third-party risks
- Geopolitical and nation-state threats

### Breach Likelihood Analysis
- Probability of successful attack (%)
- Time to detection and response capabilities
- Data exfiltration and business disruption scenarios
- Insurance coverage gaps and financial exposure

## Due Diligence Findings Summary
### Investment Impact Assessment
- **Deal Breakers**: Risks that could kill the deal
- **Price Adjustments**: Risks requiring valuation discounts
- **Post-Acquisition Priorities**: Critical 90-day security roadmap
- **Integration Risks**: Security challenges in combining organizations

### Financial Risk Quantification
- **Immediate Security Investment Required**: $XXX,XXX
- **Annual Security Budget Increase Needed**: $XXX,XXX  
- **Potential Breach Cost**: $XXX,XXX - $XXX,XXX
- **Business Disruption Risk**: $XXX,XXX per day
- **Regulatory Fine Exposure**: Up to $XXX,XXX

## Strategic Security Roadmap
### Immediate Actions (0-30 days)
- Critical vulnerabilities requiring emergency patching
- Account security and access control hardening
- Incident response capability establishment

### Short-term Priorities (1-3 months)
- Security architecture improvements
- Monitoring and detection implementation
- Staff security training and awareness

### Long-term Strategic Initiatives (3-12 months)
- Comprehensive security program maturation
- Advanced threat detection and response
- Security culture transformation

**RISK SCORING METHODOLOGY:**
- **Likelihood**: Very High (90-100%), High (70-89%), Medium (40-69%), Low (10-39%), Very Low (0-9%)
- **Impact**: Critical ($1M+), High ($100K-$1M), Medium ($10K-$100K), Low (<$10K)
- **Exploitability**: Trivial (automated tools), Easy (script kiddie), Moderate (skilled attacker), Hard (APT-level)
- **Risk Score**: (Likelihood % × Impact Score × Exploitability Factor) / 100

**CRITICAL ANALYSIS REQUIREMENTS:**
- Every finding must be categorized and scored
- Include both technical and business risks
- Consider cascade effects and systemic risks
- Provide actionable remediation with cost estimates
- Think like both an attacker and an investor
- **ONLY USE THE PROVIDED SCAN DATA - NO HYPOTHETICAL CONTENT**

Please provide a comprehensive due diligence security assessment of the following VERIFIED scan data:`;

export async function generateSecurityReport(scanId: string, companyName: string, domain: string): Promise<string> {
  try {
    // STRICT VALIDATION - NO FAKE DATA ALLOWED
    const validation = await validateScanData(scanId);
    
    if (!validation.isValid) {
      throw new Error(`SCAN VALIDATION FAILED: ${validation.errorMessage}`);
    }
    
    console.log(`[reportGenerator] Validation passed: ${validation.realFindings} verified findings`);
    
    // Fetch ONLY verified artifacts and findings
    const artifacts = await getVerifiedArtifacts(scanId);
    const findings = await getVerifiedFindings(scanId);
    
    // Double-check we have real data
    if (artifacts.length === 0) {
      throw new Error(`CRITICAL: No verified artifacts found for scan ${scanId}`);
    }
    
    // Build analysis context with ONLY real data
    const analysisData = {
      validation_status: {
        scan_id: scanId,
        verified_findings: validation.realFindings,
        real_sources_verified: true,
        data_integrity: 'VERIFIED_REAL_SCAN_DATA'
      },
      target: {
        company: companyName,
        domain: domain,
        scan_id: scanId
      },
      summary: {
        total_artifacts: artifacts.length,
        total_findings: findings.length,
        severity_breakdown: artifacts.reduce((acc, artifact) => {
          acc[artifact.severity] = (acc[artifact.severity] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        artifact_types: artifacts.reduce((acc, artifact) => {
          acc[artifact.type] = (acc[artifact.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      },
      verified_artifacts: artifacts.map(a => ({
        type: a.type,
        finding: a.val_text,
        severity: a.severity,
        source: a.src_url,
        metadata: a.meta,
        timestamp: a.created_at
      })),
      verified_findings: findings.map(f => ({
        type: f.finding_type,
        description: f.description,
        recommendation: f.recommendation,
        related_artifact: f.artifact_text,
        timestamp: f.created_at
      }))
    };

    // Generate OpenAI analysis with verified data
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: ELITE_OSINT_PROMPT
        },
        {
          role: "user", 
          content: `Company: ${companyName}\nDomain: ${domain}\n\nVERIFIED Security Scan Data:\n${JSON.stringify(analysisData, null, 2)}`
        }
      ],
      temperature: 0.3, // Lower temperature for more factual output
      max_tokens: 4000
    });

    const report = completion.choices[0].message.content || 'Report generation failed';
    
    console.log(`[reportGenerator] Generated VERIFIED security report for ${companyName} (${scanId}) - ${artifacts.length} real findings`);
    return report;

  } catch (error) {
    console.error('[reportGenerator] Error generating report:', error);
    throw new Error(`REPORT GENERATION FAILED: ${(error as Error).message}`);
  }
}

export async function generateExecutiveSummary(scanId: string, companyName: string): Promise<string> {
  try {
    // STRICT VALIDATION
    const validation = await validateScanData(scanId);
    
    if (!validation.isValid) {
      return `SCAN FAILED: ${validation.errorMessage}`;
    }
    
    const artifactsResult = await pool.query(
      'SELECT severity, COUNT(*) as count FROM artifacts WHERE meta->>\'scan_id\' = $1 AND meta->>\'error\' IS NULL GROUP BY severity',
      [scanId]
    );

    const severityCounts = artifactsResult.rows.reduce((acc, row) => {
      acc[row.severity] = parseInt(row.count);
      return acc;
    }, {} as Record<string, number>);

    const totalFindings = (Object.values(severityCounts) as number[]).reduce((sum: number, count: number) => sum + count, 0);
    const criticalHigh = (severityCounts.CRITICAL || 0) + (severityCounts.HIGH || 0);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a cybersecurity executive briefing a C-suite audience. Provide a 2-3 sentence executive summary focusing on business impact and key actions needed. ONLY use the verified scan data provided - no hypothetical content."
        },
        {
          role: "user",
          content: `VERIFIED security scan for ${companyName}: ${totalFindings} total verified findings, ${criticalHigh} critical/high severity issues. Severity breakdown: ${JSON.stringify(severityCounts)}`
        }
      ],
      temperature: 0.2,
      max_tokens: 200
    });

    return completion.choices[0].message.content || 'Executive summary generation failed';

  } catch (error) {
    console.error('[reportGenerator] Error generating executive summary:', error);
    return `SUMMARY GENERATION FAILED: ${(error as Error).message}`;
  }
} 