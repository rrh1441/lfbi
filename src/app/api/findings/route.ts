import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const requestId = Math.random().toString(36).substring(7)
  
  console.log(`\n========== FINDINGS API REQUEST ${requestId} ==========`)
  console.log(`[${requestId}] Timestamp: ${new Date().toISOString()}`)
  console.log(`[${requestId}] URL: ${request.url}`)
  
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get('scanId')
    const severity = searchParams.get('severity')
    const state = searchParams.get('state')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    console.log(`[${requestId}] Query Parameters:`)
    console.log(`[${requestId}]   - scanId: ${scanId || 'NOT PROVIDED'}`)
    console.log(`[${requestId}]   - severity: ${severity || 'NOT PROVIDED'}`)
    console.log(`[${requestId}]   - state: ${state || 'NOT PROVIDED'}`)
    console.log(`[${requestId}]   - type: ${type || 'NOT PROVIDED'}`)
    console.log(`[${requestId}]   - search: ${search || 'NOT PROVIDED'}`)

    // Get environment variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log(`[${requestId}] Environment Check:`)
    console.log(`[${requestId}]   - SUPABASE_URL: ${supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING'}`)
    console.log(`[${requestId}]   - SERVICE_ROLE_KEY: ${serviceRoleKey ? `${serviceRoleKey.substring(0, 20)}... (length: ${serviceRoleKey.length})` : 'MISSING'}`)

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(`[${requestId}] ERROR: Missing Supabase configuration`)
      throw new Error('Missing Supabase configuration')
    }

    // Build query params
    const queryParams = new URLSearchParams()
    queryParams.append('select', '*')
    
    if (scanId) {
      queryParams.append('scan_id', `eq.${scanId}`)
      console.log(`[${requestId}] Added filter: scan_id=eq.${scanId}`)
    }

    if (severity) {
      queryParams.append('severity', `in.(${severity})`)
      console.log(`[${requestId}] Added filter: severity=in.(${severity})`)
    }

    if (state) {
      queryParams.append('state', `in.(${state})`)
      console.log(`[${requestId}] Added filter: state=in.(${state})`)
    }

    if (type) {
      queryParams.append('type', `in.(${type})`)
      console.log(`[${requestId}] Added filter: type=in.(${type})`)
    }

    if (search) {
      queryParams.append('or', `(description.ilike.%${search}%,recommendation.ilike.%${search}%)`)
      console.log(`[${requestId}] Added filter: search in description/recommendation`)
    }

    queryParams.append('order', 'created_at.desc')

    const url = `${supabaseUrl}/rest/v1/findings?${queryParams.toString()}`
    console.log(`[${requestId}] Full REST API URL: ${url}`)
    console.log(`[${requestId}] Query string: ${queryParams.toString()}`)

    console.log(`[${requestId}] Making REST API call...`)
    const fetchStart = Date.now()
    
    const response = await fetch(url, {
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    })

    const fetchDuration = Date.now() - fetchStart
    console.log(`[${requestId}] REST API Response:`)
    console.log(`[${requestId}]   - Status: ${response.status} ${response.statusText}`)
    console.log(`[${requestId}]   - Duration: ${fetchDuration}ms`)
    console.log(`[${requestId}]   - Headers:`)
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'authorization') {
        console.log(`[${requestId}]     ${key}: ${value}`)
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[${requestId}] ERROR: REST API returned error`)
      console.error(`[${requestId}] Error body: ${errorText}`)
      
      const totalDuration = Date.now() - startTime
      console.log(`[${requestId}] Request failed after ${totalDuration}ms`)
      console.log(`========== END REQUEST ${requestId} (FAILED) ==========\n`)
      
      return NextResponse.json(
        { error: 'Failed to fetch findings', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(`[${requestId}] Success! Data received:`)
    console.log(`[${requestId}]   - Total findings: ${data?.length || 0}`)
    console.log(`[${requestId}]   - Data is array: ${Array.isArray(data)}`)
    
    if (data && data.length > 0) {
      console.log(`[${requestId}]   - First finding:`)
      console.log(`[${requestId}]     ${JSON.stringify(data[0], null, 2)}`)
      console.log(`[${requestId}]   - Finding IDs: ${data.map((f: { id: number }) => f.id).join(', ')}`)
    } else {
      console.log(`[${requestId}]   - No findings returned (empty array)`)
    }

    const totalDuration = Date.now() - startTime
    console.log(`[${requestId}] Request completed successfully in ${totalDuration}ms`)
    console.log(`========== END REQUEST ${requestId} (SUCCESS) ==========\n`)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error(`[${requestId}] UNEXPECTED ERROR:`, error)
    console.error(`[${requestId}] Error type: ${error?.constructor?.name}`)
    console.error(`[${requestId}] Error message: ${error instanceof Error ? error.message : 'Unknown error'}`)
    console.error(`[${requestId}] Stack trace:`, error instanceof Error ? error.stack : 'No stack trace')
    
    const totalDuration = Date.now() - startTime
    console.log(`[${requestId}] Request crashed after ${totalDuration}ms`)
    console.log(`========== END REQUEST ${requestId} (CRASHED) ==========\n`)
    
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}