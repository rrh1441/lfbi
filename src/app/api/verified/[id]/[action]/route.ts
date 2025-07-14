import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; action: string } }
) {
  try {
    const { id, action } = params
    const { notes } = await request.json()

    if (!['verify', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "verify" or "reject"' },
        { status: 400 }
      )
    }

    const newState = action === 'verify' ? 'verified' : 'rejected'
    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('findings')
      .update({
        state: newState,
        verified_at: now,
        verified_by: 'Current User', // You might want to get this from authentication
        verification_notes: notes || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update finding verification status' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      finding: {
        id: data.id,
        status: newState,
        verifiedAt: data.verified_at,
        verifiedBy: data.verified_by,
        notes: data.verification_notes
      }
    })
  } catch (error) {
    console.error('Failed to update verification status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}