import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Add report-related columns to scan_status table
    const { error: alterError } = await supabase.rpc('sql', {
      query: `
        ALTER TABLE public.scan_status 
        ADD COLUMN IF NOT EXISTS threat_snapshot_html text,
        ADD COLUMN IF NOT EXISTS threat_snapshot_markdown text,
        ADD COLUMN IF NOT EXISTS threat_snapshot_generated_at timestamp with time zone,
        ADD COLUMN IF NOT EXISTS threat_snapshot_status text CHECK (threat_snapshot_status IN ('pending', 'generating', 'completed', 'failed')),
        ADD COLUMN IF NOT EXISTS executive_summary_html text,
        ADD COLUMN IF NOT EXISTS executive_summary_markdown text,
        ADD COLUMN IF NOT EXISTS executive_summary_generated_at timestamp with time zone,
        ADD COLUMN IF NOT EXISTS executive_summary_status text CHECK (executive_summary_status IN ('pending', 'generating', 'completed', 'failed')),
        ADD COLUMN IF NOT EXISTS technical_remediation_html text,
        ADD COLUMN IF NOT EXISTS technical_remediation_markdown text,
        ADD COLUMN IF NOT EXISTS technical_remediation_generated_at timestamp with time zone,
        ADD COLUMN IF NOT EXISTS technical_remediation_status text CHECK (technical_remediation_status IN ('pending', 'generating', 'completed', 'failed')),
        ADD COLUMN IF NOT EXISTS verified_findings_count integer DEFAULT 0,
        ADD COLUMN IF NOT EXISTS auto_generate_reports boolean DEFAULT false,
        ADD COLUMN IF NOT EXISTS report_generation_metadata jsonb DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS total_findings_count integer DEFAULT 0,
        ADD COLUMN IF NOT EXISTS max_severity text,
        ADD COLUMN IF NOT EXISTS completed_at timestamp with time zone,
        ADD COLUMN IF NOT EXISTS findings_count integer DEFAULT 0;
      `
    })

    if (alterError) {
      console.error('Migration error:', alterError)
      return NextResponse.json(
        { error: 'Migration failed', details: alterError },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Migration completed successfully' })
  } catch (error) {
    console.error('Migration failed:', error)
    return NextResponse.json(
      { error: 'Migration failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}