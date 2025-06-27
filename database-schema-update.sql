-- Add original domain tracking to scan tables

-- Update scans_master table to store original domain input
ALTER TABLE scans_master 
ADD COLUMN IF NOT EXISTS original_domain VARCHAR(255);

-- Add index for faster domain normalization queries
CREATE INDEX IF NOT EXISTS idx_scans_master_domain_normalized 
ON scans_master(domain);

-- Add comment to clarify the domain columns
COMMENT ON COLUMN scans_master.domain IS 'Normalized domain (no www, no protocol, lowercase)';
COMMENT ON COLUMN scans_master.original_domain IS 'Original domain input from user (for reference)';

-- Update any scan totals tables to use normalized domains
UPDATE scan_totals_automated 
SET company_domain = LOWER(REPLACE(REPLACE(company_domain, 'https://', ''), 'www.', ''))
WHERE company_domain LIKE '%www.%' OR company_domain LIKE '%http%';

UPDATE scan_totals_verified 
SET company_domain = LOWER(REPLACE(REPLACE(company_domain, 'https://', ''), 'www.', ''))
WHERE company_domain LIKE '%www.%' OR company_domain LIKE '%http%';