import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    const reportType = searchParams.get('reportType')
    
    if (!scanId) {
      return NextResponse.json(
        { error: 'scanId is required' },
        { status: 400 }
      )
    }
    
    const { data: scan, error } = await supabase
      .from('scan_status')
      .select('*')
      .eq('scan_id', scanId)
      .single()
    
    if (error || !scan) {
      return NextResponse.json(
        { error: 'Scan not found' },
        { status: 404 }
      )
    }
    
    // If specific report type requested
    if (reportType) {
      const statusField = `${reportType}_status`
      const generatedAtField = `${reportType}_generated_at`
      
      return NextResponse.json({
        scanId,
        reportType,
        status: scan[statusField] || 'pending',
        generatedAt: scan[generatedAtField],
        findingsCount: scan.verified_findings_count || 0
      })
    }
    
    // Return all report statuses
    return NextResponse.json({
      scanId,
      companyName: scan.company_name,
      domain: scan.domain,
      reports: {
        threat_snapshot: {
          status: scan.threat_snapshot_status || 'pending',
          generatedAt: scan.threat_snapshot_generated_at,
          hasHtml: !!scan.threat_snapshot_html,
          hasMarkdown: !!scan.threat_snapshot_markdown
        },
        executive_summary: {
          status: scan.executive_summary_status || 'pending',
          generatedAt: scan.executive_summary_generated_at,
          hasHtml: !!scan.executive_summary_html,
          hasMarkdown: !!scan.executive_summary_markdown
        },
        technical_remediation: {
          status: scan.technical_remediation_status || 'pending',
          generatedAt: scan.technical_remediation_generated_at,
          hasHtml: !!scan.technical_remediation_html,
          hasMarkdown: !!scan.technical_remediation_markdown
        }
      },
      findingsCount: scan.verified_findings_count || 0,
      autoGenerateReports: scan.auto_generate_reports || false
    })
  } catch (error) {
    console.error('Failed to fetch report status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}