import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    const severity = searchParams.get('severity')
    const state = searchParams.get('state')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    console.log('Findings API called with:', { scanId, severity, state, type, search })

    let query = supabase.from('findings').select('*')

    // First, let's see what's in the findings table at all
    const { data: allFindings, error: allError } = await supabase
      .from('findings')
      .select('*')
      .limit(5)
    
    console.log('All findings in database (first 5):', allFindings, 'Error:', allError)

    if (scanId) {
      query = query.eq('scan_id', scanId)
      console.log('Filtering by scan_id:', scanId)
    }

    if (severity) {
      const severities = severity.split(',')
      query = query.in('severity', severities)
    }

    if (state) {
      const states = state.split(',')
      query = query.in('state', states)
    }

    if (type) {
      const types = type.split(',')
      query = query.in('type', types)
    }

    if (search) {
      query = query.or(`description.ilike.%${search}%,recommendation.ilike.%${search}%`)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch findings' },
        { status: 500 }
      )
    }

    console.log(`Found ${data?.length || 0} findings for scanId: ${scanId}`)
    console.log('Query result data:', data)
    console.log('Query error:', error)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch findings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}