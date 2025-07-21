import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { createLogger } from '@/lib/logger'

const logger = createLogger('reports-api')

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    
    logger.info('Fetching reports', { scanId })
    
    const supabase = createServerClient()
    
    // Query reports table directly
    let query = supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (scanId) {
      query = query.eq('scan_id', scanId)
    }
    
    const { data: reports, error } = await query
    
    if (error) {
      logger.error('Failed to fetch reports', error)
      return NextResponse.json(
        { error: 'Failed to fetch reports', details: error.message },
        { status: 500 }
      )
    }
    
    logger.info(`Found ${reports?.length || 0} reports`)
    
    // Return empty array if no reports
    return NextResponse.json(reports || [])
    
  } catch (error) {
    logger.error('Unexpected error', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { scanId, reportType = 'threat_snapshot' } = body
    
    logger.info('Creating report', { scanId, reportType })
    
    if (!scanId) {
      return NextResponse.json(
        { error: 'scanId is required' },
        { status: 400 }
      )
    }
    
    const supabase = createServerClient()
    
    // Get scan details
    const { data: scan, error: scanError } = await supabase
      .from('scan_status')
      .select('*')
      .eq('scan_id', scanId)
      .single()
    
    if (scanError || !scan) {
      logger.error('Scan not found', scanError)
      return NextResponse.json(
        { error: 'Scan not found' },
        { status: 404 }
      )
    }
    
    // Get findings for this scan
    const { data: findings, error: findingsError } = await supabase
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
    
    logger.info(`Found ${findings?.length || 0} findings for scan`)
    
    // Create a basic report
    const reportContent = {
      scan_id: scanId,
      company_name: scan.company_name,
      domain: scan.domain,
      scan_completed_at: scan.completed_at,
      total_findings: findings?.length || 0,
      findings_by_severity: {
        critical: findings?.filter(f => f.severity === 'CRITICAL').length || 0,
        high: findings?.filter(f => f.severity === 'HIGH').length || 0,
        medium: findings?.filter(f => f.severity === 'MEDIUM').length || 0,
        low: findings?.filter(f => f.severity === 'LOW').length || 0,
        info: findings?.filter(f => f.severity === 'INFO').length || 0
      },
      findings: findings || []
    }
    
    // Insert report
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        scan_id: scanId,
        report_type: reportType,
        status: 'completed',
        content: JSON.stringify(reportContent),
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (reportError) {
      logger.error('Failed to create report', reportError)
      return NextResponse.json(
        { error: 'Failed to create report', details: reportError.message },
        { status: 500 }
      )
    }
    
    logger.info('Report created successfully', { reportId: report.id })
    
    return NextResponse.json(report)
    
  } catch (error) {
    logger.error('Unexpected error', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}