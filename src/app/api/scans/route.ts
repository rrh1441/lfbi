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

    // Just call the scanner backend - it handles everything including database records
    try {
      const scannerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          companyName, 
          domain 
        })
      })

      if (!scannerResponse.ok) {
        const errorText = await scannerResponse.text()
        console.error('Failed to trigger scanner:', errorText)
        return NextResponse.json(
          { error: `Scanner error: ${errorText}` },
          { status: 500 }
        )
      }

      const result = await scannerResponse.json()
      return NextResponse.json(result)
    } catch (scannerError) {
      console.error('Scanner API error:', scannerError)
      return NextResponse.json(
        { error: 'Scanner API unreachable' },
        { status: 500 }
      )
    }
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