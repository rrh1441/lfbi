import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { createLogger } from '@/lib/logger'
import OpenAI from 'openai'

const logger = createLogger('report-generation')

const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required')
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

// HTML template for reports
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
        padding: 3rem; 
        border-radius: 8px; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
      }
      h2 { color: #1f2937; margin: 2rem 0 1rem; font-size: 1.875rem; }
      h3 { color: #374151; margin: 1.5rem 0 0.75rem; font-size: 1.5rem; }
      p { margin-bottom: 1rem; }
      ul, ol { margin-bottom: 1rem; padding-left: 2rem; }
      li { margin-bottom: 0.5rem; }
      code { 
        background: #f3f4f6; 
        padding: 0.125rem 0.375rem; 
        border-radius: 0.25rem; 
        font-size: 0.875rem; 
      }
      pre { 
        background: #1f2937; 
        color: #f9fafb; 
        padding: 1rem; 
        border-radius: 0.5rem; 
        overflow-x: auto; 
        margin-bottom: 1rem; 
      }
      .severity-critical { color: #dc2626; font-weight: 600; }
      .severity-high { color: #ea580c; font-weight: 600; }
      .severity-medium { color: #f59e0b; font-weight: 600; }
      .severity-low { color: #3b82f6; font-weight: 600; }
      .severity-info { color: #6b7280; font-weight: 600; }
      table { 
        width: 100%; 
        border-collapse: collapse; 
        margin-bottom: 1rem; 
      }
      th, td { 
        padding: 0.75rem; 
        text-align: left; 
        border-bottom: 1px solid #e5e7eb; 
      }
      th { 
        background: #f9fafb; 
        font-weight: 600; 
        color: #374151; 
      }
    </style>
  `

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.reportTitle || 'Security Report'} - ${data.company_name}</title>
      ${baseStyles}
    </head>
    <body>
      <div class="header">
        <div class="container">
          <h1>${data.reportTitle || 'Security Report'}</h1>
          <div class="meta">
            <span><strong>Company:</strong> ${data.company_name}</span>
            <span><strong>Domain:</strong> ${data.domain}</span>
            <span><strong>Generated:</strong> ${new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="content">
          ${data.content}
        </div>
      </div>
    </body>
    </html>
  `
}

const getReportTitle = (reportType: string): string => {
  switch (reportType) {
    case 'threat_snapshot':
      return 'Threat Snapshot Report'
    case 'executive_summary':
      return 'Executive Summary'
    case 'technical_remediation':
      return 'Technical Remediation Report'
    default:
      return 'Security Report'
  }
}

export async function POST(request: NextRequest) {
  try {
    const { scanId, reportType = 'threat_snapshot' } = await request.json()
    
    logger.info('Starting report generation', { scanId, reportType })

    if (!scanId) {
      return NextResponse.json(
        { error: 'scanId is required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Get scan data
    const { data: scanData, error: scanError } = await supabase
      .from('scan_status')
      .select('*')
      .eq('scan_id', scanId)
      .single()

    if (scanError || !scanData) {
      logger.error('Scan not found', scanError)
      return NextResponse.json(
        { error: 'Scan not found' },
        { status: 404 }
      )
    }

    const companyName = scanData.company_name
    const domain = scanData.domain

    // Get findings for the scan
    const { data: scanFindings, error: findingsError } = await supabase
      .from('findings')
      .select('*')
      .eq('scan_id', scanId)
      .order('severity', { ascending: false })

    if (findingsError) {
      logger.error('Failed to fetch findings', findingsError)
      return NextResponse.json(
        { error: 'Failed to fetch findings' },
        { status: 500 }
      )
    }

    logger.info(`Found ${scanFindings?.length || 0} findings for scan`)

    // Prepare findings data
    const findingsData = scanFindings || []
    const severityCounts = {
      critical: findingsData.filter(f => f.severity === 'CRITICAL').length,
      high: findingsData.filter(f => f.severity === 'HIGH').length,
      medium: findingsData.filter(f => f.severity === 'MEDIUM').length,
      low: findingsData.filter(f => f.severity === 'LOW').length,
      info: findingsData.filter(f => f.severity === 'INFO').length
    }

    // Step 1: Enhance findings with remediation (simplified without temperature)
    logger.info('Enhancing findings with remediation...')
    const enhancedFindings = await Promise.all(
      findingsData.slice(0, 10).map(async (finding) => { // Limit to 10 for cost
        try {
          const remediationCompletion = await getOpenAI().chat.completions.create({
            model: 'o4-mini-2025-04-16',
            messages: [
              {
                role: 'system',
                content: 'You are a cybersecurity expert. Generate brief, actionable remediation steps.'
              },
              {
                role: 'user',
                content: `Finding: ${finding.description}\nType: ${finding.type}\nSeverity: ${finding.severity}\n\nProvide remediation steps.`
              }
            ],
            max_tokens: 500
          })

          return {
            ...finding,
            enhanced_remediation: remediationCompletion.choices[0].message.content
          }
        } catch (error) {
          logger.error('Failed to enhance finding', { findingId: finding.id, error })
          return finding
        }
      })
    )

    // Step 2: Generate report
    logger.info('Generating report content...')
    const reportPrompt = `Generate a ${reportType} security report for ${companyName} (${domain}).

Summary of findings:
- Critical: ${severityCounts.critical}
- High: ${severityCounts.high}
- Medium: ${severityCounts.medium}
- Low: ${severityCounts.low}
- Info: ${severityCounts.info}

Top findings with remediation:
${enhancedFindings.map(f => `
${f.severity}: ${f.description}
Type: ${f.type}
Remediation: ${f.enhanced_remediation || f.recommendation || 'No specific remediation available'}
`).join('\n---\n')}

Generate a professional security report with:
1. Executive Summary
2. Key Findings
3. Risk Assessment
4. Remediation Priorities
5. Next Steps

Use HTML formatting with proper headings, lists, and emphasis.`

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity expert creating professional security reports. Output clean HTML content.'
        },
        {
          role: 'user',
          content: reportPrompt
        }
      ],
      max_tokens: 4000
    })

    const reportContent = completion.choices[0].message.content

    if (!reportContent) {
      throw new Error('Failed to generate report content')
    }

    // Wrap in HTML template
    const htmlReport = generateHTMLTemplate(reportType, {
      company_name: companyName,
      domain,
      content: reportContent,
      reportTitle: getReportTitle(reportType),
      ...severityCounts
    })

    // Save report to reports table
    const reportData = {
      scan_id: scanId,
      report_type: reportType,
      status: 'completed',
      content: {
        html: htmlReport,
        markdown: reportContent,
        metadata: {
          generated_at: new Date().toISOString(),
          findings_count: findingsData.length,
          severity_counts: severityCounts,
          enhanced_findings_count: enhancedFindings.length
        }
      }
    }

    const { data: report, error: reportError } = await supabase
      .from('reports')
      .upsert(reportData)
      .select()
      .single()

    if (reportError) {
      logger.error('Failed to save report', reportError)
      return NextResponse.json(
        { error: 'Failed to save report', details: reportError.message },
        { status: 500 }
      )
    }

    logger.info('Report generated successfully', { reportId: report.scan_id })

    return NextResponse.json({ 
      scanId,
      reportType,
      htmlContent: htmlReport,
      status: 'completed'
    })

  } catch (error) {
    logger.error('Failed to generate report', error)
    return NextResponse.json(
      { error: 'Failed to generate report', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}