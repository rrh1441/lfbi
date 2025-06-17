import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
})

export async function POST(request: NextRequest) {
  try {
    const { scanId, findings, companyName, domain } = await request.json()

    if (!scanId || !findings || !companyName || !domain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare findings data for AI
    const findingsSummary = findings.map((f: {
      type: string;
      severity: string;
      description: string;
      recommendation: string;
      attack_type_code: string;
      eal_low: number;
      eal_ml: number;
      eal_high: number;
    }) => ({
      type: f.type,
      severity: f.severity,
      description: f.description,
      recommendation: f.recommendation,
      attack_type: f.attack_type_code,
      estimated_loss: {
        low: f.eal_low,
        medium: f.eal_ml,
        high: f.eal_high
      }
    }))

    // Generate report using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a cybersecurity expert generating executive security reports. 
                   Create a comprehensive, professional security assessment report based on the verified findings.
                   Include executive summary, risk analysis, prioritized recommendations, and financial impact estimates.
                   Format the response in markdown for easy rendering.`
        },
        {
          role: 'user',
          content: `Generate a security assessment report for ${companyName} (${domain}).

Verified Security Findings:
${JSON.stringify(findingsSummary, null, 2)}

Please structure the report with:
1. Executive Summary
2. Risk Assessment Matrix
3. Critical Findings Analysis
4. Financial Impact Estimates
5. Prioritized Remediation Roadmap
6. Compliance & Regulatory Considerations
7. Appendix: Technical Details

Keep the report professional, actionable, and focused on business impact.`
        }
      ],
      temperature: 0.3,
      max_tokens: 4000
    })

    const reportContent = completion.choices[0].message.content

    if (!reportContent) {
      return NextResponse.json(
        { error: 'Failed to generate report content' },
        { status: 500 }
      )
    }

    // Save report to database
    const { data, error } = await supabase
      .from('reports')
      .insert({
        scan_id: scanId,
        company_name: companyName,
        domain,
        content: reportContent,
        findings_count: findings.length,
        status: 'completed'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save report' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      reportId: data.id,
      content: reportContent 
    })

  } catch (error) {
    console.error('Failed to generate report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}