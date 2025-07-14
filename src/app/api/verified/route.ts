import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('findings')
      .select(`
        id,
        scan_id,
        type,
        severity,
        description,
        state,
        verified_at,
        verified_by,
        verification_notes,
        scans!inner(domain)
      `)
      .in('state', ['pending_verification', 'verified', 'rejected'])
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch verified findings' },
        { status: 500 }
      )
    }

    const findings = data?.map(finding => ({
      id: finding.id,
      scanId: finding.scan_id,
      domain: finding.scans?.domain || 'Unknown',
      findingType: finding.type,
      severity: finding.severity,
      description: finding.description,
      status: finding.state === 'pending_verification' ? 'pending' : finding.state,
      verifiedAt: finding.verified_at,
      verifiedBy: finding.verified_by,
      notes: finding.verification_notes
    })) || []

    return NextResponse.json({ findings })
  } catch (error) {
    console.error('Failed to fetch verified findings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}