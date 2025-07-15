import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    
    let query = supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (scanId) {
      query = query.eq('scan_id', scanId)
    }
    
    const { data: reports, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reports' },
        { status: 500 }
      )
    }

    return NextResponse.json(reports)
  } catch (error) {
    console.error('Failed to fetch reports:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}