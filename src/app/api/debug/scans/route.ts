import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Supabase client config:', {
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
    })
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

    // Check RLS status on findings table
    let rlsCheck = null
    let rlsError = null
    try {
      const result = await supabase.rpc('sql', { 
        query: `SELECT schemaname, tablename, rowsecurity 
                FROM pg_tables 
                WHERE tablename = 'findings';` 
      })
      rlsCheck = result.data
      rlsError = result.error
    } catch (err) {
      rlsError = err
    }

    console.log('RLS status check:', rlsCheck)
    console.log('RLS check error:', rlsError)

    // Check what user we're connecting as
    let userCheck = null
    let userError = null
    try {
      const result = await supabase.rpc('sql', { 
        query: `SELECT current_user, session_user, current_role;` 
      })
      userCheck = result.data
      userError = result.error
    } catch (err) {
      userError = err
    }

    console.log('Current database user:', userCheck)
    console.log('User check error:', userError)

    console.log('Sample findings:', findings)
    console.log('Findings error:', findingsError)

    // Test if findings table exists by trying to query it
    const { data: testFindings, error: testFindingsError } = await supabase
      .from('findings')
      .select('count')
      .limit(1)
      .single()

    console.log('Test findings query result:', testFindings)
    console.log('Test findings error (table exists if this is null):', testFindingsError)

    // Test a non-existent table to compare errors
    const { error: testNonExistentError } = await supabase
      .from('non_existent_table')
      .select('*')
      .limit(1)

    console.log('Non-existent table error:', testNonExistentError)

    return NextResponse.json({ 
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      scans, 
      findings, 
      scanError, 
      findingsError,
      testFindings,
      testFindingsError,
      testNonExistentError,
      rlsCheck,
      rlsError,
      userCheck,
      userError
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ error: 'Debug failed' }, { status: 500 })
  }
}