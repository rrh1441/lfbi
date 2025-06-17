import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    // Get scans with findings count
    let scansQuery = supabase
      .from('scan_status')
      .select(`
        *,
        findings(count)
      `)
      .order('created_at', { ascending: false })

    if (search) {
      scansQuery = scansQuery.or(`company_name.ilike.%${search}%,domain.ilike.%${search}%,scan_id.ilike.%${search}%`)
    }

    const { data: scans, error: scansError } = await scansQuery

    if (scansError) {
      console.error('Database error:', scansError)
      return NextResponse.json(
        { error: 'Failed to fetch scans' },
        { status: 500 }
      )
    }

    // Transform the data to include findings count
    const scansWithCounts = scans?.map(scan => ({
      ...scan,
      findings_count: scan.findings?.[0]?.count || 0
    })) || []

    return NextResponse.json(scansWithCounts)
  } catch (error) {
    console.error('Failed to fetch scans with findings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}