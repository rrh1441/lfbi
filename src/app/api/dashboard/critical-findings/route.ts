import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: criticalFindings, error } = await supabase
      .from('findings')
      .select(`
        *,
        scan_status!inner(company_name, domain)
      `)
      .eq('severity', 'CRITICAL')
      .eq('state', 'AUTOMATED')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch critical findings' },
        { status: 500 }
      )
    }

    return NextResponse.json(criticalFindings)
  } catch (error) {
    console.error('Failed to fetch critical findings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}