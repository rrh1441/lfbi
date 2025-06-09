-- Create scans_master table for tracking scan status
CREATE TABLE IF NOT EXISTS scans_master (
    scan_id VARCHAR(255) PRIMARY KEY,
    company_name VARCHAR(255),
    domain VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'queued', -- e.g., 'queued', 'processing', 'analyzing_modules', 'generating_report', 'done', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    total_findings_count INTEGER DEFAULT 0, -- Count from the 'findings' table
    max_severity VARCHAR(20) -- Highest severity from 'findings'
);

-- Trigger to update 'updated_at' timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_scans_master_updated_at
BEFORE UPDATE ON scans_master
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Index for the sync worker
CREATE INDEX IF NOT EXISTS idx_scans_master_updated_at ON scans_master(updated_at);
CREATE INDEX IF NOT EXISTS idx_findings_created_at ON findings(created_at); -- Ensure this exists on your 'findings' table 