-- Debug CLIENT_SIDE_SECRET_EXPOSURE risk calculation
-- Scan ID: YgvqoxIo6Uc (the test scan with 6 client-side secrets)

-- Check what's in the scan_financials_cache for this scan
SELECT 
  finding_id,
  asset,
  category,
  severity,
  eal_low,
  eal_ml,
  eal_high
FROM scan_financials_cache 
WHERE scan_id = 'YgvqoxIo6Uc'
AND category = 'CLIENT_SIDE_SECRET_EXPOSURE'
ORDER BY eal_high DESC;

-- Check the findings themselves
SELECT 
  f.id,
  f.type as finding_type,
  f.severity,
  f.description,
  a.type as artifact_type,
  a.severity as artifact_severity,
  a.meta->>'pattern_name' as pattern_name
FROM findings f
JOIN artifacts a ON f.artifact_id = a.id
WHERE f.scan_id = 'YgvqoxIo6Uc'
AND f.type = 'CLIENT_SIDE_SECRET_EXPOSURE'
ORDER BY f.id;

-- Check current risk constants
SELECT * FROM risk_constants WHERE key LIKE '%CLIENT_SIDE_SECRET%' OR key LIKE '%SECRET%';

-- Check if there are any generic risk constants being used
SELECT * FROM risk_constants WHERE key LIKE '%CRITICAL%' OR key LIKE '%HIGH%' OR key LIKE '%MEDIUM%';

-- Check total risk calculation for the scan
SELECT 
  category,
  COUNT(*) as finding_count,
  SUM(eal_low) as total_low,
  SUM(eal_ml) as total_ml,
  SUM(eal_high) as total_high
FROM scan_financials_cache 
WHERE scan_id = 'YgvqoxIo6Uc'
GROUP BY category
ORDER BY total_high DESC;