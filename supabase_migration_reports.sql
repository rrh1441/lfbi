-- Migration to add report fields to scan_status table
-- This makes scan_status the central source of truth for all scan-related data

-- Add report-related columns to scan_status table
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
ADD COLUMN IF NOT EXISTS report_generation_metadata jsonb DEFAULT '{}';

-- Create indexes for report status queries
CREATE INDEX IF NOT EXISTS idx_scan_status_threat_snapshot_status ON public.scan_status(threat_snapshot_status) WHERE threat_snapshot_status IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scan_status_executive_summary_status ON public.scan_status(executive_summary_status) WHERE executive_summary_status IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scan_status_technical_remediation_status ON public.scan_status(technical_remediation_status) WHERE technical_remediation_status IS NOT NULL;

-- Create a view for easy report querying
CREATE OR REPLACE VIEW public.scan_reports AS
SELECT 
  s.id,
  s.scan_id,
  s.company_name,
  s.domain,
  s.status as scan_status,
  s.completed_at as scan_completed_at,
  s.total_findings_count,
  s.verified_findings_count,
  s.max_severity,
  -- Threat Snapshot
  CASE 
    WHEN s.threat_snapshot_html IS NOT NULL THEN s.threat_snapshot_html
    ELSE s.threat_snapshot_markdown
  END as threat_snapshot_content,
  s.threat_snapshot_status,
  s.threat_snapshot_generated_at,
  -- Executive Summary
  CASE 
    WHEN s.executive_summary_html IS NOT NULL THEN s.executive_summary_html
    ELSE s.executive_summary_markdown
  END as executive_summary_content,
  s.executive_summary_status,
  s.executive_summary_generated_at,
  -- Technical Remediation
  CASE 
    WHEN s.technical_remediation_html IS NOT NULL THEN s.technical_remediation_html
    ELSE s.technical_remediation_markdown
  END as technical_remediation_content,
  s.technical_remediation_status,
  s.technical_remediation_generated_at,
  s.created_at,
  s.updated_at
FROM public.scan_status s;

-- Grant permissions
GRANT SELECT ON public.scan_reports TO authenticated;
GRANT SELECT ON public.scan_reports TO anon;

-- Function to get a specific report type for a scan
CREATE OR REPLACE FUNCTION public.get_scan_report(
  p_scan_id text,
  p_report_type text
) RETURNS TABLE (
  scan_id text,
  company_name text,
  domain text,
  report_type text,
  html_content text,
  markdown_content text,
  status text,
  generated_at timestamp with time zone,
  findings_count integer
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_report_type = 'threat_snapshot' THEN
    RETURN QUERY
    SELECT 
      s.scan_id,
      s.company_name,
      s.domain,
      'threat_snapshot'::text as report_type,
      s.threat_snapshot_html as html_content,
      s.threat_snapshot_markdown as markdown_content,
      s.threat_snapshot_status as status,
      s.threat_snapshot_generated_at as generated_at,
      s.verified_findings_count as findings_count
    FROM public.scan_status s
    WHERE s.scan_id = p_scan_id;
  ELSIF p_report_type = 'executive_summary' THEN
    RETURN QUERY
    SELECT 
      s.scan_id,
      s.company_name,
      s.domain,
      'executive_summary'::text as report_type,
      s.executive_summary_html as html_content,
      s.executive_summary_markdown as markdown_content,
      s.executive_summary_status as status,
      s.executive_summary_generated_at as generated_at,
      s.verified_findings_count as findings_count
    FROM public.scan_status s
    WHERE s.scan_id = p_scan_id;
  ELSIF p_report_type = 'technical_remediation' THEN
    RETURN QUERY
    SELECT 
      s.scan_id,
      s.company_name,
      s.domain,
      'technical_remediation'::text as report_type,
      s.technical_remediation_html as html_content,
      s.technical_remediation_markdown as markdown_content,
      s.technical_remediation_status as status,
      s.technical_remediation_generated_at as generated_at,
      s.verified_findings_count as findings_count
    FROM public.scan_status s
    WHERE s.scan_id = p_scan_id;
  END IF;
END;
$$;

-- Function to get all reports for a scan
CREATE OR REPLACE FUNCTION public.get_scan_all_reports(p_scan_id text)
RETURNS TABLE (
  report_type text,
  html_content text,
  markdown_content text,
  status text,
  generated_at timestamp with time zone
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'threat_snapshot'::text,
    s.threat_snapshot_html,
    s.threat_snapshot_markdown,
    s.threat_snapshot_status,
    s.threat_snapshot_generated_at
  FROM public.scan_status s
  WHERE s.scan_id = p_scan_id
  UNION ALL
  SELECT 
    'executive_summary'::text,
    s.executive_summary_html,
    s.executive_summary_markdown,
    s.executive_summary_status,
    s.executive_summary_generated_at
  FROM public.scan_status s
  WHERE s.scan_id = p_scan_id
  UNION ALL
  SELECT 
    'technical_remediation'::text,
    s.technical_remediation_html,
    s.technical_remediation_markdown,
    s.technical_remediation_status,
    s.technical_remediation_generated_at
  FROM public.scan_status s
  WHERE s.scan_id = p_scan_id;
END;
$$;

-- Migrate existing data from report_jobs if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'report_jobs') THEN
    -- Update scan_status with report data from report_jobs
    UPDATE public.scan_status s
    SET 
      threat_snapshot_html = r.html_content,
      threat_snapshot_markdown = r.markdown_content,
      threat_snapshot_generated_at = r.completed_at,
      threat_snapshot_status = r.status
    FROM public.report_jobs r
    WHERE s.scan_id = r.scan_id 
    AND r.report_type = 'threat_snapshot';

    UPDATE public.scan_status s
    SET 
      executive_summary_html = r.html_content,
      executive_summary_markdown = r.markdown_content,
      executive_summary_generated_at = r.completed_at,
      executive_summary_status = r.status
    FROM public.report_jobs r
    WHERE s.scan_id = r.scan_id 
    AND r.report_type = 'executive_summary';

    UPDATE public.scan_status s
    SET 
      technical_remediation_html = r.html_content,
      technical_remediation_markdown = r.markdown_content,
      technical_remediation_generated_at = r.completed_at,
      technical_remediation_status = r.status
    FROM public.report_jobs r
    WHERE s.scan_id = r.scan_id 
    AND r.report_type = 'technical_remediation';
  END IF;
END $$;

-- Update verified findings count
UPDATE public.scan_status s
SET verified_findings_count = (
  SELECT COUNT(*) 
  FROM public.findings f 
  WHERE f.scan_id = s.scan_id 
  AND f.state = 'VERIFIED'
);

-- Add trigger to update verified findings count automatically
CREATE OR REPLACE FUNCTION public.update_verified_findings_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.scan_status
    SET verified_findings_count = (
      SELECT COUNT(*) 
      FROM public.findings 
      WHERE scan_id = NEW.scan_id 
      AND state = 'VERIFIED'
    )
    WHERE scan_id = NEW.scan_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.scan_status
    SET verified_findings_count = (
      SELECT COUNT(*) 
      FROM public.findings 
      WHERE scan_id = OLD.scan_id 
      AND state = 'VERIFIED'
    )
    WHERE scan_id = OLD.scan_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_verified_findings_count_trigger
AFTER INSERT OR UPDATE OF state OR DELETE ON public.findings
FOR EACH ROW
EXECUTE FUNCTION public.update_verified_findings_count();

-- Create RLS policies if needed
ALTER TABLE public.scan_status ENABLE ROW LEVEL SECURITY;

-- Example RLS policy (adjust based on your auth setup)
-- CREATE POLICY "Users can view their own scans" ON public.scan_status
-- FOR SELECT USING (auth.uid() = user_id);

COMMENT ON COLUMN public.scan_status.threat_snapshot_html IS 'HTML content for threat snapshot report';
COMMENT ON COLUMN public.scan_status.executive_summary_html IS 'HTML content for executive summary report';
COMMENT ON COLUMN public.scan_status.technical_remediation_html IS 'HTML content for technical remediation report';
COMMENT ON COLUMN public.scan_status.report_generation_metadata IS 'JSON metadata for report generation (tokens used, costs, etc.)';