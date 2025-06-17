import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const { companyName, domain } = await request.json()

    if (!companyName || !domain) {
      return NextResponse.json(
        { error: 'Company name and domain are required' },
        { status: 400 }
      )
    }

    // Generate unique scan ID
    const scanId = `scan_${nanoid()}`

    // TODO: Call external scanner API here
    // For now, we'll simulate starting a scan by inserting into the database
    
    const { error } = await supabase
      .from('scan_status')
      .insert({
        scan_id: scanId,
        company_name: companyName,
        domain,
        status: 'pending',
        progress: 0,
        total_modules: 15
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create scan record' },
        { status: 500 }
      )
    }

    // Trigger the actual scanner service
    try {
      const scannerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          scanId, 
          companyName, 
          domain 
        })
      })

      if (!scannerResponse.ok) {
        console.error('Failed to trigger scanner:', await scannerResponse.text())
        // Update scan status to failed in database
        await supabase
          .from('scan_status')
          .update({ status: 'failed', error_message: 'Failed to trigger scanner' })
          .eq('scan_id', scanId)
      }
    } catch (scannerError) {
      console.error('Scanner API error:', scannerError)
      // Update scan status to failed in database
      await supabase
        .from('scan_status')
        .update({ status: 'failed', error_message: 'Scanner API unreachable' })
        .eq('scan_id', scanId)
    }

    return NextResponse.json({ scanId })
  } catch (error) {
    console.error('Failed to start scan:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('scan_status')
      .select('scan_id, company_name, domain, status, progress, total_modules, started_at, completed_at, total_findings_count, max_severity')
      .order('started_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch scans' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch scans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}