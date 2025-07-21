import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'

const logger = createLogger('reports-debug')

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const scanId = searchParams.get('scanId')
  
  logger.info('Debug endpoint called', { scanId })

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Missing config' }, { status: 500 })
  }

  try {
    // Check scan_status columns
    logger.info('Checking scan_status table schema...')
    const schemaResponse = await fetch(
      `${supabaseUrl}/rest/v1/scan_status?select=*&limit=1`,
      {
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const scanData = await schemaResponse.json()
    logger.info('Sample scan_status record:', scanData[0] || 'No records found')

    // Check reports table
    logger.info('Checking reports table...')
    const reportsResponse = await fetch(
      `${supabaseUrl}/rest/v1/reports?select=*&limit=5`,
      {
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const reportsData = await reportsResponse.json()
    logger.info(`Found ${reportsData.length} reports`)
    
    if (reportsData.length > 0) {
      logger.info('Sample report:', reportsData[0])
    }

    // Check report_sections table (for prompts)
    logger.info('Checking report_sections table...')
    const sectionsResponse = await fetch(
      `${supabaseUrl}/rest/v1/report_sections?select=*`,
      {
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const sectionsData = await sectionsResponse.json()
    logger.info(`Found ${sectionsData.length} report sections`)
    
    // Get column info
    const columnsQuery = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name IN ('scan_status', 'reports', 'report_sections')
      ORDER BY table_name, ordinal_position
    `

    return NextResponse.json({
      scanStatus: {
        sampleRecord: scanData[0] || null,
        columns: Object.keys(scanData[0] || {})
      },
      reports: {
        count: reportsData.length,
        sampleRecord: reportsData[0] || null
      },
      reportSections: {
        count: sectionsData.length,
        sections: sectionsData
      },
      scanId
    })

  } catch (error) {
    logger.error('Debug error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}