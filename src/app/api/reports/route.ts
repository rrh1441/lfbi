import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    
    // Query scan_status table for reports
    let query = supabase
      .from('scan_status')
      .select('*')
    
    if (scanId) {
      query = query.eq('scan_id', scanId)
    } else {
      // Get all scans that have at least one report
      query = query.or('threat_snapshot_status.eq.completed,executive_summary_status.eq.completed,technical_remediation_status.eq.completed')
    }
    
    const { data: scans, error: scansError } = await query.order('created_at', { ascending: false })

    if (scansError) {
      console.error('Database error:', scansError)
      
      // Fallback to old reports table
      let fallbackQuery = supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (scanId) {
        fallbackQuery = fallbackQuery.eq('scan_id', scanId)
      }
      
      const { data: reports, error } = await fallbackQuery
      
      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch reports' },
          { status: 500 }
        )
      }
      
      // Transform old reports to match new structure
      const transformedReports = reports?.map((r: any) => ({
        id: r.id,
        scan_id: r.scan_id,
        report_type: 'threat_snapshot', // Default type for old reports
        status: r.status || 'completed',
        company_name: r.company_name,
        domain: r.domain,
        content: r.content,
        html_content: null,
        markdown_content: r.content,
        created_at: r.created_at,
        completed_at: r.created_at,
        findings_count: r.findings_count
      }))
      
      return NextResponse.json(transformedReports || [])
    }
    
    // Transform scan_status data to report format
    const transformedReports: any[] = []
    
    scans?.forEach((scan: any) => {
      // Check each report type
      if (scan.threat_snapshot_status === 'completed') {
        transformedReports.push({
          id: `${scan.scan_id}_threat_snapshot`,
          scan_id: scan.scan_id,
          report_type: 'threat_snapshot',
          status: 'completed',
          company_name: scan.company_name,
          domain: scan.domain,
          content: scan.threat_snapshot_html || scan.threat_snapshot_markdown,
          html_content: scan.threat_snapshot_html,
          markdown_content: scan.threat_snapshot_markdown,
          created_at: scan.threat_snapshot_generated_at,
          completed_at: scan.threat_snapshot_generated_at,
          findings_count: scan.verified_findings_count || 0
        })
      }
      
      if (scan.executive_summary_status === 'completed') {
        transformedReports.push({
          id: `${scan.scan_id}_executive_summary`,
          scan_id: scan.scan_id,
          report_type: 'executive_summary',
          status: 'completed',
          company_name: scan.company_name,
          domain: scan.domain,
          content: scan.executive_summary_html || scan.executive_summary_markdown,
          html_content: scan.executive_summary_html,
          markdown_content: scan.executive_summary_markdown,
          created_at: scan.executive_summary_generated_at,
          completed_at: scan.executive_summary_generated_at,
          findings_count: scan.verified_findings_count || 0
        })
      }
      
      if (scan.technical_remediation_status === 'completed') {
        transformedReports.push({
          id: `${scan.scan_id}_technical_remediation`,
          scan_id: scan.scan_id,
          report_type: 'technical_remediation',
          status: 'completed',
          company_name: scan.company_name,
          domain: scan.domain,
          content: scan.technical_remediation_html || scan.technical_remediation_markdown,
          html_content: scan.technical_remediation_html,
          markdown_content: scan.technical_remediation_markdown,
          created_at: scan.technical_remediation_generated_at,
          completed_at: scan.technical_remediation_generated_at,
          findings_count: scan.verified_findings_count || 0
        })
      }
    })

    return NextResponse.json(transformedReports)
  } catch (error) {
    console.error('Failed to fetch reports:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}