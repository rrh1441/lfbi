import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { createLogger } from '@/lib/logger'
import OpenAI from 'openai'
import { getReportTypeConfig } from '@/lib/report-types'

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
const generateHTMLTemplate = (_reportType: string, data: {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { scanId, reportType, reportTypes: requestedReportTypes } = body
    
    // Handle both single reportType and multiple reportTypes
    const reportTypes = requestedReportTypes || (reportType ? [reportType] : ['threat_snapshot'])
    
    logger.info('Starting report generation', { scanId, reportTypes })

    if (!scanId) {
      return NextResponse.json({ error: 'scanId is required' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Get scan data if not provided
    let companyName = body.companyName
    let domain = body.domain
    let findings = body.findings
    
    if (!companyName || !domain) {
      const { data: scanData, error: scanError } = await supabase
        .from('scan_status')
        .select('*')
        .eq('scan_id', scanId)
        .single()

      if (scanError || !scanData) {
        logger.error('Scan not found', scanError)
        return NextResponse.json({ error: 'Scan not found' }, { status: 404 })
      }

      companyName = companyName || scanData.company_name
      domain = domain || scanData.domain
    }
    
    // Get findings if not provided
    if (!findings) {
      const { data: scanFindings, error: findingsError } = await supabase
        .from('findings')
        .select('*')
        .eq('scan_id', scanId)
        .order('severity', { ascending: false })
        
      if (findingsError) {
        logger.error('Failed to fetch findings', findingsError)
        return NextResponse.json({ error: 'Failed to fetch findings' }, { status: 500 })
      }
      
      findings = scanFindings || []
    }

    // STEP 1: Batch generate and update remediation for findings in Supabase
    logger.info(`Processing ${findings.length} findings for remediation enhancement`)
    
    // Filter findings that need remediation (missing or generic recommendations)
    const findingsNeedingRemediation = findings.filter((f: { severity: string; recommendation?: string }) => 
      ['CRITICAL', 'HIGH', 'MEDIUM'].includes(f.severity) && 
      (!f.recommendation || f.recommendation.length < 50)
    ).slice(0, 15) // Limit for cost control

    if (findingsNeedingRemediation.length > 0) {
      const batchRemediationPrompt = `Generate specific remediation steps for these security findings:

${findingsNeedingRemediation.map((f: { id: string; type: string; severity: string; description: string }, idx: number) => `
FINDING ${idx + 1} (ID: ${f.id}):
Type: ${f.type}
Severity: ${f.severity}
Description: ${f.description}
---`).join('\n')}

Return a JSON array with remediation for each finding:
[
  {
    "finding_id": "${findingsNeedingRemediation[0]?.id}",
    "risk_explanation": "Brief risk explanation",
    "remediation_steps": ["Step 1", "Step 2", "Step 3"],
    "verification": "How to verify the fix"
  }
]`

      try {
        const remediationCompletion = await getOpenAI().chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a cybersecurity expert. Return only valid JSON with structured remediation guidance.'
            },
            {
              role: 'user',
              content: batchRemediationPrompt
            }
          ],
          max_completion_tokens: 6000
        })

        const remediationContent = remediationCompletion.choices[0].message.content
        if (remediationContent) {
          // Extract JSON from response
          const jsonMatch = remediationContent.match(/\[[\s\S]*\]/)
          if (jsonMatch) {
            const remediationData = JSON.parse(jsonMatch[0])
            logger.info(`Generated remediation for ${remediationData.length} findings`)

            // Update findings in Supabase database with new remediation
            for (const remediation of remediationData as Array<{
              finding_id: string;
              risk_explanation: string;
              remediation_steps: string[];
              verification: string;
            }>) {
              try {
                const fullRemediation = `${remediation.risk_explanation}

Remediation Steps:
${remediation.remediation_steps.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}

Verification:
${remediation.verification}`

                const { error: updateError } = await supabase
                  .from('findings')
                  .update({ 
                    recommendation: fullRemediation,
                    updated_at: new Date().toISOString()
                  })
                  .eq('id', remediation.finding_id)

                if (updateError) {
                  logger.error('Failed to update finding', { findingId: remediation.finding_id, error: updateError })
                } else {
                  logger.info(`Updated remediation for finding ${remediation.finding_id}`)
                }
              } catch (error) {
                logger.error('Error updating finding remediation', { findingId: remediation.finding_id, error })
              }
            }
          }
        }
      } catch (error) {
        logger.error('Failed to generate batch remediation', error)
      }
    }

    // STEP 2: Fetch updated findings from database for report generation
    const { data: updatedFindings } = await supabase
      .from('findings')
      .select('*')
      .eq('scan_id', scanId)
      .order('severity', { ascending: false })

    const findingsForReport = updatedFindings || findings

    // STEP 3: Create CSV data from updated findings for report templates
    const csvHeader = 'id,created_at,description,scan_id,type,recommendation,severity,attack_type_code,state,eal_low,eal_ml,eal_high,eal_daily'
    const updatedCsvRows = findingsForReport.map((f: {
      id: string;
      created_at?: string;
      description: string;
      finding_type?: string;
      type?: string;
      recommendation?: string;
      severity: string;
      attack_type_code?: string;
      state?: string;
      eal_low?: string | number;
      eal_ml?: string | number;
      eal_high?: string | number;
      eal_daily?: string | number;
    }) => {
      const escapeCsv = (field: string) => field ? `"${field.replace(/"/g, '""')}"` : '""'
      return [
        f.id,
        f.created_at || new Date().toISOString(),
        escapeCsv(f.description),
        scanId,
        f.finding_type || f.type,
        escapeCsv(f.recommendation || ''),
        f.severity,
        f.attack_type_code || 'UNKNOWN',
        f.state || 'active',
        f.eal_low || '',
        f.eal_ml || '',
        f.eal_high || '',
        f.eal_daily || ''
      ].join(',')
    })
    const updatedCsvData = [csvHeader, ...updatedCsvRows].join('\n')

    const generatedReports = []

    // STEP 4: Generate reports for each requested type with enhanced data
    for (const reportType of reportTypes) {
      const config = getReportTypeConfig(reportType)
      if (!config) {
        logger.warn(`Unknown report type: ${reportType}`)
        continue
      }

      // Replace template variables in user prompt with updated data
      const userPrompt = config.user_prompt_template
        .replace(/{company_name}/g, companyName)
        .replace(/{domain}/g, domain)
        .replace(/{scan_date}/g, new Date().toISOString().split('T')[0])
        .replace(/{scan_data}/g, updatedCsvData)
        .replace(/{risk_totals}/g, updatedCsvData)
        .replace(/{risk_calculations}/g, updatedCsvData)
        .replace(/{company_profile}/g, `Company: ${companyName}, Domain: ${domain}`)
        .replace(/{detailed_findings}/g, updatedCsvData)
        .replace(/{scan_artifacts}/g, updatedCsvData)

      try {
        // Generate report using OpenAI
        const completion = await getOpenAI().chat.completions.create({
          model: 'o3-2025-04-16',
          messages: [
            {
              role: 'system',
              content: config.system_prompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          max_completion_tokens: config.max_tokens
        })

        const reportContent = completion.choices[0].message.content

        if (!reportContent) {
          logger.error(`Failed to generate ${reportType} report content`)
          continue
        }

        // Wrap in HTML template
        const htmlReport = generateHTMLTemplate(reportType, {
          company_name: companyName,
          domain,
          content: reportContent,
          reportTitle: config.title,
        })

        // Save report to database
        const reportId = `${scanId}-${reportType}`
        const reportData = {
          scan_id: scanId,
          status: 'completed',
          content: {
            report_type: reportType,
            html: htmlReport,
            markdown: reportContent,
            metadata: {
              generated_at: new Date().toISOString(),
              findings_count: findingsForReport.length,
              enhanced_findings_count: findingsNeedingRemediation.length
            }
          }
        }
        
        const { error } = await supabase
          .from('reports')
          .upsert(reportData)

        if (error) {
          logger.error(`Failed to save ${reportType} report:`, error)
        } else {
          logger.info(`Successfully saved ${reportType} report`)
          generatedReports.push({
            type: reportType,
            id: reportId,
            content: reportContent,
            htmlContent: htmlReport
          })
        }

      } catch (error) {
        logger.error(`Failed to generate ${reportType} report:`, error)
      }
    }

    // Return appropriate response based on request type
    if (body.reportType && generatedReports.length > 0) {
      // Legacy single report response
      return NextResponse.json({ 
        scanId,
        reportType: body.reportType,
        htmlContent: generatedReports[0].htmlContent,
        status: 'completed'
      })
    } else {
      // Multiple reports response
      return NextResponse.json({
        success: true,
        scanId,
        generatedReports: generatedReports.length,
        enhancedFindings: findingsNeedingRemediation.length,
        reports: generatedReports
      })
    }

  } catch (error) {
    logger.error('Report generation failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate reports', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}