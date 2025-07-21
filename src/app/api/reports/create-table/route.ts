import { NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'

const logger = createLogger('create-reports-table')

export async function POST() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Missing config' }, { status: 500 })
  }

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS reports (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      scan_id TEXT NOT NULL,
      report_type TEXT NOT NULL DEFAULT 'threat_snapshot',
      status TEXT NOT NULL DEFAULT 'pending',
      content JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Create index for faster queries
    CREATE INDEX IF NOT EXISTS idx_reports_scan_id ON reports(scan_id);
    CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

    -- Add RLS
    ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
  `

  try {
    // Execute SQL via Supabase's REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: createTableSQL })
    })

    if (!response.ok) {
      logger.info('RPC function not available, returning SQL for manual execution')
      // For now, return instructions
      return NextResponse.json({
        message: 'Please run the following SQL in your Supabase SQL Editor:',
        sql: createTableSQL
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Reports table created successfully' 
    })

  } catch (error) {
    logger.error('Failed to create table', error)
    return NextResponse.json({ 
      error: 'Failed to create table',
      message: 'Please run the following SQL in your Supabase SQL Editor:',
      sql: createTableSQL
    }, { status: 500 })
  }
}