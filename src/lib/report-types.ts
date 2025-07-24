export interface ReportTypeConfig {
  type: string
  title: string
  description: string
  system_prompt: string
  user_prompt_template: string
  max_tokens: number
}

export const REPORT_TYPES: ReportTypeConfig[] = [
  {
    type: 'threat_snapshot',
    title: 'Threat Snapshot Report',
    description: 'Executive dashboard with financial impact analysis',
    system_prompt: `You are a cybersecurity expert creating an executive-level threat snapshot report. 
Focus on business impact, financial risk, and strategic recommendations. 
Use clear, non-technical language suitable for C-suite executives.
Format your response in clean HTML with proper headings and structure.`,
    user_prompt_template: `Generate a Threat Snapshot Report for {company_name} ({domain}).

Scan Date: {scan_date}
Company: {company_name}
Domain: {domain}

Findings Data:
{scan_data}

Create an executive threat snapshot that includes:
1. Executive Summary (2-3 sentences on overall security posture)
2. Risk Overview (visual representation using HTML)
3. Financial Impact Assessment
4. Top 5 Critical Findings
5. Immediate Action Items
6. Strategic Recommendations

Keep the report concise (under 650 words) and focused on business impact.`,
    max_tokens: 3000
  },
  {
    type: 'executive_summary',
    title: 'Executive Summary',
    description: 'Strategic overview and business recommendations',
    system_prompt: `You are a cybersecurity strategist creating a comprehensive executive summary. 
Balance technical accuracy with business clarity.
Focus on strategic implications and long-term security posture.
Format your response in clean HTML with proper headings and structure.`,
    user_prompt_template: `Generate an Executive Summary Report for {company_name} ({domain}).

Scan Date: {scan_date}
Company Profile: {company_profile}

Findings Data:
{scan_data}

Risk Totals:
{risk_totals}

Create a strategic executive summary that includes:
1. Executive Overview
2. Current Security Posture Assessment
3. Risk Analysis by Category
4. Business Impact Analysis
5. Compliance and Regulatory Considerations
6. Strategic Recommendations
7. Roadmap for Security Improvements
8. Investment Priorities

Target length: 2,000-2,500 words. Focus on strategic business decisions.`,
    max_tokens: 5000
  },
  {
    type: 'technical_remediation',
    title: 'Technical Remediation Report',
    description: 'Detailed technical fixes and implementation steps',
    system_prompt: `You are a senior security engineer creating a detailed technical remediation guide.
Provide specific, actionable technical steps.
Include code examples, configuration changes, and implementation details.
Format your response in clean HTML with proper headings, code blocks, and structure.`,
    user_prompt_template: `Generate a Technical Remediation Report for {company_name} ({domain}).

Scan Date: {scan_date}
Technical Environment: {domain}

Detailed Findings:
{detailed_findings}

Risk Calculations:
{risk_calculations}

Create a comprehensive technical remediation guide that includes:
1. Technical Summary
2. Priority Matrix (based on severity and ease of implementation)
3. Detailed Remediation Steps for Each Finding:
   - Specific technical steps
   - Code/configuration examples
   - Testing procedures
   - Verification methods
4. Security Hardening Recommendations
5. Implementation Timeline
6. Technical Resources and References
7. Monitoring and Maintenance Plan

Target length: 4,000-4,500 words. Be highly technical and specific.`,
    max_tokens: 8000
  }
]

export function getReportTypeConfig(reportType: string): ReportTypeConfig | undefined {
  return REPORT_TYPES.find(rt => rt.type === reportType)
}