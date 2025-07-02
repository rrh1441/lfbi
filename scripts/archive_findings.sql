-- Archive current findings to findings_archive table
-- Run this on your Fly machine to move all existing findings

-- Create findings_archive table if it doesn't exist
CREATE TABLE IF NOT EXISTS findings_archive (
    id SERIAL PRIMARY KEY,
    artifact_id UUID NOT NULL,
    finding_type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    evidence TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    archived_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (artifact_id) REFERENCES artifacts(id) ON DELETE CASCADE
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_findings_archive_artifact_id ON findings_archive(artifact_id);
CREATE INDEX IF NOT EXISTS idx_findings_archive_archived_at ON findings_archive(archived_at);

-- Move all current findings to archive
INSERT INTO findings_archive (artifact_id, finding_type, description, evidence, created_at, archived_at)
SELECT 
    artifact_id,
    finding_type,
    description,
    evidence,
    created_at,
    NOW() as archived_at
FROM findings;

-- Get count of archived findings
SELECT COUNT(*) as archived_findings_count FROM findings_archive 
WHERE archived_at = (SELECT MAX(archived_at) FROM findings_archive);

-- Clear current findings table
DELETE FROM findings;

-- Verify the operation
SELECT 
    'Archived' as status,
    COUNT(*) as count 
FROM findings_archive
UNION ALL
SELECT 
    'Current' as status,
    COUNT(*) as count 
FROM findings;