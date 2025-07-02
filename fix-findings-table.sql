-- Fix findings table to add missing severity column
-- This allows the new breach probe module to store severity-specific findings

ALTER TABLE findings ADD COLUMN IF NOT EXISTS severity TEXT;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_findings_severity ON findings(severity);

-- Update any existing findings without severity to inherit from their artifact
UPDATE findings 
SET severity = a.severity 
FROM artifacts a 
WHERE findings.artifact_id = a.id 
AND findings.severity IS NULL;