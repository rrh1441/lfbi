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

    // Allow more flexible state values in case database uses different format
    const allowedStates = ['AUTOMATED', 'VERIFIED', 'FALSE_POSITIVE', 'false_positive', 'False Positive']
    if (!allowedStates.includes(state)) {
      console.log('Invalid state received:', state, 'Allowed:', allowedStates)
      return NextResponse.json(
        { error: 'Invalid state value', received: state, allowed: allowedStates },
        { status: 400 }
      )
    }

    console.log('Attempting to update findings:', { findingIds, state })
    
    const { data, error } = await supabase
      .from('findings')
      .update({ state })
      .in('id', findingIds)
      .select()

    if (error) {
      console.error('Database error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        { 
          error: 'Failed to update findings',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    console.log('Successfully updated findings:', data)

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