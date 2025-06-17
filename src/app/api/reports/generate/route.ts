import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import OpenAI from 'openai'
import * as fs from 'fs'
import * as path from 'path'

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

    // Read the prompt from prompt.md
    const promptPath = path.join(process.cwd(), 'prompt.md')
    const promptContent = fs.readFileSync(promptPath, 'utf-8')

    // Prepare findings data in CSV format as specified in prompt.md
    const csvHeader = 'id,created_at,description,scan_id,type,recommendation,severity,attack_type_code,state,eal_low,eal_ml,eal_high'
    const csvRows = findings.map((f: {
      id: string;
      created_at?: string;
      description: string;
      type: string;
      recommendation: string;
      severity: string;
      attack_type_code?: string;
      state: string;
      eal_low?: number;
      eal_ml?: number;
      eal_high?: number;
    }) => {
      const escapeCsv = (field: string) => field ? `"${field.replace(/"/g, '""')}"` : '""'
      return [
        f.id,
        f.created_at || new Date().toISOString(),
        escapeCsv(f.description),
        scanId,
        f.type,
        escapeCsv(f.recommendation),
        f.severity,
        f.attack_type_code || 'UNKNOWN',
        f.state,
        f.eal_low || 0,
        f.eal_ml || 0,
        f.eal_high || 0
      ].join(',')
    })
    const csvData = [csvHeader, ...csvRows].join('\n')

    // Generate report using OpenAI with the prompt.md content
    const completion = await openai.chat.completions.create({
      model: 'o3-2025-04-16',
      messages: [
        {
          role: 'system',
          content: promptContent
        },
        {
          role: 'user',
          content: `Generate a due diligence report for ${companyName} (${domain}, scan_id: ${scanId}).

CSV data with verified findings:
${csvData}`
        }
      ],
      max_completion_tokens: 50000
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
        id: scanId, // Use scan_id as the primary key
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