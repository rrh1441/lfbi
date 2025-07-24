# Enhanced Report Generation Route

## Goal
Refactor the report generation system to:
1. **Batch generate remediation** for multiple findings in a single API call (instead of individual calls)
2. **Write remediation back to Supabase** findings table rows
3. **Generate reports** using the enhanced data from the database

This solves the `max_tokens` errors from individual finding processing and creates a more efficient workflow.

## Architecture Changes

### Before (Problem)
- Individual API calls for each finding remediation → token limit errors
- No persistence of remediation back to database
- Reports generated from stale data

### After (Solution)
- Single batch API call for up to 15 findings needing remediation
- Write enhanced remediation directly to `findings` table in Supabase
- Fetch fresh data from database for report generation
- Reports include enhanced remediation data

## Implementation

```typescript
export async function POST(request: NextRequest) {
  try {
    const { scanId, findings, companyName, domain, reportTypes = ['threat_snapshot'] } = await request.json()

    if (!scanId || !findings || !companyName || !domain) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // STEP 1: Batch generate and update remediation for findings in Supabase
    console.log('Generating batch remediation for findings...')
    
    // Filter findings that need remediation (missing or generic recommendations)
    const findingsNeedingRemediation = findings.filter((f: any) => 
      ['CRITICAL', 'HIGH', 'MEDIUM'].includes(f.severity) && 
      (!f.recommendation || f.recommendation.length < 50)
    ).slice(0, 15) // Limit for cost control

    if (findingsNeedingRemediation.length > 0) {
      const batchRemediationPrompt = `Generate specific remediation steps for these security findings:

${findingsNeedingRemediation.map((f: any, idx: number) => `
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
        const remediationCompletion = await openai.chat.completions.create({
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
            console.log(`Generated remediation for ${remediationData.length} findings`)

            // Update findings in Supabase database with new remediation
            for (const remediation of remediationData) {
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
                  console.error('Failed to update finding', { findingId: remediation.finding_id, error: updateError })
                } else {
                  console.log(`Updated remediation for finding ${remediation.finding_id}`)
                }
              } catch (error) {
                console.error('Error updating finding remediation', { findingId: remediation.finding_id, error })
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to generate batch remediation', error)
      }
    }

    // STEP 2: Fetch updated findings from database for report generation
    const { data: updatedFindings, error: findingsError } = await supabase
      .from('findings')
      .select('*')
      .eq('scan_id', scanId)
      .order('severity', { ascending: false })

    const findingsForReport = updatedFindings || findings

    // STEP 3: Create CSV data from updated findings for report templates
    const csvHeader = 'id,created_at,description,scan_id,type,recommendation,severity,attack_type_code,state,eal_low,eal_ml,eal_high,eal_daily'
    const updatedCsvRows = findingsForReport.map((f: any) => {
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
      const config = REPORT_TYPES.find(rt => rt.type === reportType)
      if (!config) {
        console.warn(`Unknown report type: ${reportType}`)
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
        const completion = await openai.chat.completions.create({
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
          console.error(`Failed to generate ${reportType} report content`)
          continue
        }

        // Save report to database
        const reportId = `${scanId}-${reportType}`
        const { data, error } = await supabase
          .from('reports')
          .insert({
            id: reportId,
            scan_id: scanId,
            company_name: companyName,
            domain,
            content: reportContent,
            report_type: reportType,
            findings_count: findingsForReport.length,
            status: 'completed'
          })

        if (error) {
          console.error(`Failed to save ${reportType} report:`, error)
        } else {
          console.log(`Successfully saved ${reportType} report`)
          generatedReports.push({
            type: reportType,
            id: reportId,
            content: reportContent
          })
        }

      } catch (error) {
        console.error(`Failed to generate ${reportType} report:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      scanId,
      generatedReports: generatedReports.length,
      enhancedFindings: findingsNeedingRemediation.length,
      reports: generatedReports
    })

  } catch (error) {
    console.error('Report generation failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate reports', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
```

## Key Benefits

1. **Efficiency**: Single batch API call instead of 10+ individual calls
2. **Cost Control**: Limits to 15 findings for remediation enhancement
3. **Persistence**: Remediation written to database for future use
4. **Fresh Data**: Reports use updated findings from database
5. **Error Handling**: Graceful fallbacks if remediation generation fails
6. **Token Management**: Uses appropriate limits (6000 tokens for batch, config.max_tokens for reports)

## Integration Notes

- Requires `createServerClient()` function from your Supabase setup
- Uses existing `REPORT_TYPES` configuration
- Maintains compatibility with existing report templates
- Falls back to original findings if database fetch fails
- Only processes CRITICAL/HIGH/MEDIUM findings for cost control

## Testing Considerations

- Test with scans that have findings without recommendations
- Verify remediation is written to correct finding rows
- Check that reports include enhanced remediation data
- Test fallback behavior when OpenAI calls fail