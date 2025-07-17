import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ scanId: string }> }
) {
  try {
    const resolvedParams = await params
    const scanId = resolvedParams.scanId
    
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

    return NextResponse.json(scan)
  } catch (error) {
    console.error('Failed to fetch scan:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}