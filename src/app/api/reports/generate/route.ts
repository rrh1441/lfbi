import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// HTML template based on reportdesign.md
const generateHTMLTemplate = (reportType: string, data: {
  company_name: string
  domain: string
  content: string
  reportTitle?: string
  [key: string]: string | number | undefined
}) => {
  const baseStyles = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        line-height: 1.6; 
        color: #374151; 
        background: #f9fafb;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
      .header { 
        background: white; 
        border-bottom: 1px solid #e5e7eb; 
        padding: 2rem 0; 
        margin-bottom: 2rem; 
      }
      .header h1 { 
        font-size: 2.5rem; 
        font-weight: 300; 
        color: #1f2937; 
        margin-bottom: 1rem; 
      }
      .header .meta { 
        color: #6b7280; 
        display: flex; 
        gap: 1rem; 
        align-items: center; 
      }
      .content { 
        background: white; 
        border-radius: 0.75rem; 
        padding: 2rem; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
        margin-bottom: 2rem; 
      }
      .gradient-text { 
        background: linear-gradient(135deg, #ef4444, #dc2626); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color: transparent; 
        background-clip: text;
      }
      .risk-score { 
        text-align: center; 
        padding: 3rem; 
        background: linear-gradient(135deg, #f9fafb, #ffffff); 
        border-radius: 1rem; 
        border: 1px solid #e5e7eb; 
      }
      .risk-score .score { 
        font-size: 5rem; 
        font-weight: 100; 
        margin: 1rem 0; 
      }
      .financial-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
        gap: 1.5rem; 
        margin: 2rem 0; 
      }
      .financial-card { 
        background: white; 
        border: 1px solid #e5e7eb; 
        border-radius: 1rem; 
        padding: 1.5rem; 
        position: relative; 
        overflow: hidden; 
      }
      .financial-card.emphasis { 
        border-color: #fed7aa; 
        background: linear-gradient(135deg, #fef3c7, #fbbf24); 
      }
      .financial-card h3 { 
        font-size: 0.875rem; 
        font-weight: 600; 
        color: #6b7280; 
        text-transform: uppercase; 
        letter-spacing: 0.05em; 
        margin-bottom: 0.5rem; 
      }
      .financial-card .value { 
        font-size: 2.5rem; 
        font-weight: 300; 
        color: #1f2937; 
      }
      .financial-card.emphasis .value { 
        color: #92400e; 
      }
      .findings-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        gap: 1.5rem; 
        margin: 2rem 0; 
      }
      .finding-card { 
        background: white; 
        border: 1px solid #e5e7eb; 
        border-radius: 0.5rem; 
        padding: 1.5rem; 
      }
      .badge { 
        display: inline-block; 
        padding: 0.25rem 0.75rem; 
        border-radius: 9999px; 
        font-size: 0.75rem; 
        font-weight: 600; 
        text-transform: uppercase; 
      }
      .badge.critical { background: #fef2f2; color: #dc2626; }
      .badge.high { background: #fff7ed; color: #ea580c; }
      .badge.medium { background: #fefce8; color: #ca8a04; }
      .badge.low { background: #f0f9ff; color: #0284c7; }
      table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
      th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
      th { font-weight: 600; color: #374151; }
      h2 { font-size: 1.875rem; font-weight: 300; color: #1f2937; margin: 2rem 0 1rem; }
      h3 { font-size: 1.5rem; font-weight: 400; color: #1f2937; margin: 1.5rem 0 0.75rem; }
      pre { 
        background: #f3f4f6; 
        padding: 1rem; 
        border-radius: 0.5rem; 
        overflow-x: auto; 
        font-size: 0.875rem; 
        white-space: pre-wrap; 
      }
      @media print {
        body { background: white; }
        .container { padding: 1rem; }
        .content { box-shadow: none; border: 1px solid #e5e7eb; }
      }
    </style>
  `

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${data.reportTitle || 'Security Report'} - ${data.company_name}</title>
  ${baseStyles}
</head>
<body>
  ${data.content}
</body>
</html>`
}

export async function POST(request: NextRequest) {
  let scanId: string | undefined
  let reportType: string = 'threat_snapshot'
  
  try {
    const body = await request.json()
    scanId = body.scanId
    reportType = body.reportType || 'threat_snapshot'
    const { findings, companyName, domain } = body

    if (!scanId || !companyName || !domain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get scan data from scan_status
    const { data: scanData, error: scanError } = await supabase
      .from('scan_status')
      .select('*')
      .eq('scan_id', scanId)
      .single()

    if (scanError || !scanData) {
      return NextResponse.json(
        { error: 'Scan not found' },
        { status: 404 }
      )
    }

    // Update status to generating
    const statusField = `${reportType}_status`
    await supabase
      .from('scan_status')
      .update({ [statusField]: 'generating' })
      .eq('scan_id', scanId)

    // Get verified findings if not provided
    let verifiedFindings = findings
    if (!findings) {
      const { data: findingsData, error: findingsError } = await supabase
        .from('findings')
        .select('*')
        .eq('scan_id', scanId)
        .eq('state', 'VERIFIED')

      if (findingsError) {
        throw new Error('Failed to fetch findings')
      }
      verifiedFindings = findingsData || []
    }

    // Get report template from database
    const { data: template, error: templateError } = await supabase
      .from('report_templates')
      .select('*')
      .eq('report_type', reportType)
      .single()

    if (templateError || !template) {
      console.error('Template error:', templateError)
      // Fall back to default prompts if template not found
    }

    // Step 1: Enhance remediation suggestions using o4-mini
    if (verifiedFindings.length > 0) {
      console.log('Enhancing remediation suggestions with o4-mini...')
      
      const enhancedFindings = await Promise.all(
        verifiedFindings.map(async (finding: {
          id: string
          description: string
          type: string
          severity: string
          recommendation?: string
          remediation?: string
          enhanced_remediation?: string
          [key: string]: string | number | undefined
        }) => {
          try {
            const remediationCompletion = await openai.chat.completions.create({
              model: 'o4-mini-2025-04-16',
              messages: [
                {
                  role: 'system',
                  content: 'You are a cybersecurity expert. Generate detailed, actionable remediation steps for security findings. Be specific and technical but also include business context.'
                },
                {
                  role: 'user',
                  content: `Finding: ${finding.description}
Type: ${finding.type}
Severity: ${finding.severity}
Current Recommendation: ${finding.recommendation}

Generate enhanced remediation steps that include:
1. Immediate actions (within 24 hours)
2. Short-term fixes (within 1 week)
3. Long-term solutions
4. Specific tools or commands to use
5. How to verify the fix is working`
                }
              ],
              temperature: 0.3,
              max_tokens: 1000
            })

            const enhancedRemediation = remediationCompletion.choices[0].message.content
            return {
              ...finding,
              enhanced_remediation: enhancedRemediation,
              remediation: finding.remediation || finding.recommendation
            }
          } catch (error) {
            console.error('Failed to enhance remediation for finding:', finding.id, error)
            return finding
          }
        })
      )
      verifiedFindings = enhancedFindings
    }

    // Prepare findings data
    const csvHeader = 'id,created_at,description,scan_id,type,recommendation,severity,attack_type_code,state,eal_low,eal_ml,eal_high,eal_daily'
    const csvRows = verifiedFindings.map((f: {
      id: string
      created_at?: string
      description: string
      type: string
      enhanced_remediation?: string
      recommendation?: string
      severity: string
      attack_type_code?: string
      state: string
      eal_low?: number
      eal_ml?: number
      eal_high?: number
      eal_daily?: number
    }) => {
      const escapeCsv = (field: string) => field ? `"${field.replace(/"/g, '""')}"` : '""'
      return [
        f.id,
        f.created_at || new Date().toISOString(),
        escapeCsv(f.description),
        scanId,
        f.type,
        escapeCsv(f.enhanced_remediation || f.recommendation || ''),
        f.severity,
        f.attack_type_code || 'UNKNOWN',
        f.state,
        f.eal_low || '0',
        f.eal_ml || '0',
        f.eal_high || '0',
        f.eal_daily || '0'
      ].join(',')
    })
    const csvData = [csvHeader, ...csvRows].join('\n')

    // Calculate financial totals
    const financialTotals = verifiedFindings.reduce((acc: {
      eal_low_total: number
      eal_ml_total: number
      eal_high_total: number
      eal_daily_total: number
    }, f: {
      eal_low?: number
      eal_ml?: number
      eal_high?: number
      eal_daily?: number
    }) => ({
      eal_low_total: acc.eal_low_total + (f.eal_low || 0),
      eal_ml_total: acc.eal_ml_total + (f.eal_ml || 0),
      eal_high_total: acc.eal_high_total + (f.eal_high || 0),
      eal_daily_total: acc.eal_daily_total + (f.eal_daily || 0)
    }), { eal_low_total: 0, eal_ml_total: 0, eal_high_total: 0, eal_daily_total: 0 })

    // Calculate severity counts
    const severityCounts = verifiedFindings.reduce((acc: Record<string, number>, f: { severity?: string }) => {
      const sev = f.severity?.toLowerCase() || 'info'
      acc[`${sev}_count`] = (acc[`${sev}_count`] || 0) + 1
      return acc
    }, {})

    // Generate report content based on type
    let systemPrompt = template?.system_prompt || getDefaultSystemPrompt(reportType)
    let userPrompt = template?.user_prompt_template || getDefaultUserPrompt(reportType)

    // For HTML output, modify the system prompt
    systemPrompt = systemPrompt + '\n\nIMPORTANT: Generate the report content as HTML, not Markdown. Use proper HTML tags like <h1>, <h2>, <p>, <table>, <ul>, <li>, etc. Include inline CSS classes that match the provided styling guidelines. The output should be the inner HTML content that will be wrapped in a container div.'

    // Replace template variables
    userPrompt = userPrompt
      .replace('{scan_data}', csvData)
      .replace('{company_name}', companyName)
      .replace('{domain}', domain)
      .replace('{scan_date}', new Date().toISOString().split('T')[0])
      .replace('{risk_totals}', JSON.stringify(financialTotals))
      .replace('{risk_calculations}', JSON.stringify(financialTotals))
      .replace('{company_profile}', JSON.stringify({ company_name: companyName, domain }))
      .replace('{detailed_findings}', JSON.stringify(verifiedFindings))
      .replace('{remediation_data}', JSON.stringify(verifiedFindings))
      .replace('{scan_artifacts}', JSON.stringify({ severity_counts: severityCounts }))

    // Step 2: Generate full report using o3
    console.log('Generating report with o3-2025-04-16...')
    const completion = await openai.chat.completions.create({
      model: 'o3-2025-04-16',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: template?.max_output_tokens || 8000
    })

    const reportContent = completion.choices[0].message.content

    if (!reportContent) {
      throw new Error('Failed to generate report content')
    }

    // Wrap in full HTML template
    const htmlReport = generateHTMLTemplate(reportType, {
      company_name: companyName,
      domain,
      content: reportContent,
      reportTitle: getReportTitle(reportType),
      ...financialTotals,
      ...severityCounts
    })

    // Update scan_status with report data
    const updateData: Record<string, string | number | Record<string, unknown>> = {
      [`${reportType}_html`]: htmlReport,
      [`${reportType}_markdown`]: reportContent,
      [`${reportType}_generated_at`]: new Date().toISOString(),
      [`${reportType}_status`]: 'completed',
      verified_findings_count: verifiedFindings.length
    }

    // Add metadata
    const metadata = {
      tokens_input: csvData.length / 4, // Rough estimate
      tokens_output: reportContent.length / 4,
      cost_usd: template?.estimated_cost_usd || 0.02,
      generated_by: 'o3-2025-04-16',
      remediation_by: 'o4-mini-2025-04-16'
    }

    const existingMetadata = scanData.report_generation_metadata as Record<string, unknown> || {}
    updateData.report_generation_metadata = {
      ...existingMetadata,
      [reportType]: metadata
    }

    const { error: updateError } = await supabase
      .from('scan_status')
      .update(updateData)
      .eq('scan_id', scanId)

    if (updateError) {
      console.error('Database error:', updateError)
      throw new Error('Failed to save report')
    }

    return NextResponse.json({ 
      scanId,
      reportType,
      htmlContent: htmlReport,
      status: 'completed'
    })

  } catch (error) {
    console.error('Failed to generate report:', error)
    
    // Update status to failed if scanId is available
    if (scanId) {
      const statusField = `${reportType}_status`
      await supabase
        .from('scan_status')
        .update({ [statusField]: 'failed' })
        .eq('scan_id', scanId)
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

function getDefaultSystemPrompt(reportType: string): string {
  switch (reportType) {
    case 'threat_snapshot':
      return `You are DealBrief-AI, a senior cybersecurity analyst.
Generate an executive dashboard focused on financial impact.
Use clear visualizations and emphasize business risks.`
    
    case 'executive_summary':
      return `You are DealBrief-AI, a principal cybersecurity consultant.
Create a strategic overview for leadership with actionable insights.`
    
    case 'technical_remediation':
      return `You are DealBrief-AI, a senior penetration tester.
Provide detailed technical implementation guidance with specific commands and code examples.`
    
    default:
      return 'You are DealBrief-AI, a cybersecurity expert.'
  }
}

function getDefaultUserPrompt(reportType: string): string {
  return `Generate a ${reportType.replace('_', ' ')} report for {company_name} ({domain}).
Scan date: {scan_date}

Findings data:
{scan_data}

Financial totals:
{risk_totals}

Create a comprehensive report following best practices for ${reportType} reports.`
}

function getReportTitle(reportType: string): string {
  const titles: Record<string, string> = {
    threat_snapshot: 'Security Risk Assessment - Threat Snapshot',
    executive_summary: 'Executive Security Briefing',
    technical_remediation: 'Technical Remediation Guide'
  }
  return titles[reportType] || 'Security Assessment Report'
}