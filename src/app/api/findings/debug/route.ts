import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const scanId = searchParams.get('scanId') || 'm8ieBgwHiuI'
  
  console.log('\n========== FINDINGS DEBUG ==========')
  console.log('Testing direct SQL via Supabase REST API')
  
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Missing config' }, { status: 500 })
  }

  try {
    // Test 1: Count all findings
    console.log('\nTest 1: Counting all findings in the table...')
    const countResponse = await fetch(`${supabaseUrl}/rest/v1/findings?select=count`, {
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }
    })
    
    const countData = await countResponse.text()
    const totalCount = countResponse.headers.get('content-range')
    console.log('Count response:', countData)
    console.log('Content-Range header:', totalCount)

    // Test 2: Get first 5 findings without any filter
    console.log('\nTest 2: Getting first 5 findings (no filters)...')
    const allResponse = await fetch(`${supabaseUrl}/rest/v1/findings?select=id,scan_id,severity&limit=5`, {
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    const allData = await allResponse.json()
    console.log('First 5 findings:', JSON.stringify(allData, null, 2))

    // Test 3: Check specific scan_id with RPC function
    console.log('\nTest 3: Using RPC to check scan_id directly...')
    const rpcResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/check_findings`, {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ target_scan_id: scanId })
    })

    if (!rpcResponse.ok) {
      console.log('RPC function not found, skipping test 3')
    } else {
      const rpcData = await rpcResponse.json()
      console.log('RPC result:', rpcData)
    }

    // Test 4: Check RLS policies
    console.log('\nTest 4: Checking if RLS is enabled...')
    const policiesResponse = await fetch(`${supabaseUrl}/rest/v1/rls_policies?table_name=eq.findings`, {
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (policiesResponse.ok) {
      const policies = await policiesResponse.json()
      console.log('RLS policies:', JSON.stringify(policies, null, 2))
    } else {
      console.log('Could not fetch RLS policies')
    }

    // Test 5: Try different scan_id formats
    console.log('\nTest 5: Testing different scan_id query formats...')
    const tests = [
      { url: `${supabaseUrl}/rest/v1/findings?scan_id=eq.${scanId}`, desc: 'PostgREST format' },
      { url: `${supabaseUrl}/rest/v1/findings?scan_id=${scanId}`, desc: 'Direct format' },
      { url: `${supabaseUrl}/rest/v1/findings?scan_id=eq.'${scanId}'`, desc: 'Quoted format' }
    ]

    for (const test of tests) {
      console.log(`\nTrying ${test.desc}: ${test.url}`)
      const response = await fetch(test.url + '&limit=1', {
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(`Result: ${data.length} findings found`)
      if (data.length > 0) {
        console.log('First finding:', data[0])
      }
    }

    return NextResponse.json({
      message: 'Debug complete - check server logs',
      totalCount,
      firstFiveFindings: allData,
      scanId
    })

  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}