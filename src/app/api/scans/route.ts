import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { companyName, domain, tags, autoGenerateReports, reportTypes } = await request.json()

    if (!companyName || !domain) {
      return NextResponse.json(
        { error: 'Company name and domain are required' },
        { status: 400 }
      )
    }

    // Call the external scanner API (keep working scan functionality)
    const response = await fetch('https://dealbrief-scanner.fly.dev/scans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://lfbi.vercel.app'
      },
      body: JSON.stringify({
        companyName,
        domain,
        tags: tags || []
      })
    })

    if (!response.ok) {
      throw new Error(`Scanner API error: ${response.statusText}`)
    }

    const result = await response.json()
    const scanId = result.scanId || result.id

    // If auto-generate reports is enabled, store the preference
    if (autoGenerateReports && scanId) {
      // Store the auto-generation preference (could be in a separate table or as metadata)
      // For now, we'll trigger report generation after scan completion
      // This would ideally be handled by a webhook or polling mechanism
      
      // Set up a background task to check for scan completion
      // In a production environment, this would be handled by a queue or webhook
      setTimeout(async () => {
        try {
          // Check if scan is completed
          const { data: scan } = await supabase
            .from('scan_status')
            .select('status')
            .eq('scan_id', scanId)
            .single()

          if (scan?.status === 'completed') {
            // Get verified findings
            const { data: findings } = await supabase
              .from('findings')
              .select('*')
              .eq('scan_id', scanId)
              .eq('state', 'VERIFIED')

            if (findings && findings.length > 0) {
              // Generate reports for each selected type
              const selectedReportTypes = reportTypes || ['threat_snapshot', 'executive_summary', 'technical_remediation']
              
              for (const reportType of selectedReportTypes) {
                try {
                  await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reports/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      scanId,
                      reportType,
                      findings,
                      companyName,
                      domain
                    })
                  })
                } catch (error) {
                  console.error(`Failed to generate ${reportType} report:`, error)
                }
              }
            }
          }
        } catch (error) {
          console.error('Failed to check scan status:', error)
        }
      }, 60000) // Check after 1 minute (in production, use proper job queue)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to start scan:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('scan_status')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch scans' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch scans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}