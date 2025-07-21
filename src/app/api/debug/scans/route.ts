import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get all scan IDs
    const { data: scans, error: scanError } = await supabase
      .from('scan_status')
      .select('scan_id, company_name, domain, status, created_at')
      .order('created_at', { ascending: false })
      .limit(10)

    console.log('Recent scans:', scans)
    console.log('Scan error:', scanError)

    // Get all findings with their scan_ids
    const { data: findings, error: findingsError } = await supabase
      .from('findings')
      .select('scan_id, type, severity, created_at')
      .limit(10)

    console.log('Sample findings:', findings)
    console.log('Findings error:', findingsError)

    return NextResponse.json({ scans, findings, scanError, findingsError })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ error: 'Debug failed' }, { status: 500 })
  }
}