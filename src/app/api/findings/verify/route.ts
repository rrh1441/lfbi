import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(request: NextRequest) {
  try {
    const { findingIds, state } = await request.json()

    if (!findingIds || !Array.isArray(findingIds) || !state) {
      return NextResponse.json(
        { error: 'Finding IDs and state are required' },
        { status: 400 }
      )
    }

    if (!['AUTOMATED', 'VERIFIED', 'FALSE_POSITIVE'].includes(state)) {
      return NextResponse.json(
        { error: 'Invalid state value' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('findings')
      .update({ state })
      .in('id', findingIds)
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update findings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      updated: data.length,
      findings: data 
    })
  } catch (error) {
    console.error('Failed to verify findings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}