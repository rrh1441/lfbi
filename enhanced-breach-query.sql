-- ENHANCED BREACH QUERY: Compromised Employees with Infostealer Detection
-- Run this after the updated breachDirectoryProbe.ts generates new data

SELECT DISTINCT
    result_item->>'email' as email,
    result_item->>'username' as username,
    result_item->'source'->>'name' as breach_source,
    result_item->'source'->>'breach_date' as breach_date,
    
    -- Risk assessment flags (NO actual sensitive data)
    (result_item->>'has_password')::boolean as has_password,
    (result_item->>'has_cookies')::boolean as has_cookies,
    (result_item->>'has_autofill')::boolean as has_autofill,
    (result_item->>'has_browser_data')::boolean as has_browser_data,
    (result_item->>'field_count')::int as field_count,
    
    -- Infostealer risk classification
    CASE 
        WHEN (result_item->>'has_cookies')::boolean = true 
          OR (result_item->>'has_autofill')::boolean = true 
          OR (result_item->>'has_browser_data')::boolean = true
          OR result_item->'source'->>'name' ILIKE '%stealer%'
          OR result_item->'source'->>'name' ILIKE '%redline%'
          OR result_item->'source'->>'name' ILIKE '%raccoon%'
          OR result_item->'source'->>'name' ILIKE '%vidar%'
        THEN 'CRITICAL_INFOSTEALER'
        WHEN (result_item->>'has_password')::boolean = true
        THEN 'HIGH_PASSWORD_EXPOSED'
        ELSE 'MEDIUM_EMAIL_EXPOSED'
    END as risk_level,
    
    -- Corporate vs personal email detection
    CASE 
        WHEN result_item->>'email' ILIKE '%@' || (meta->>'domain') 
        THEN 'CORPORATE_EMAIL'
        ELSE 'PERSONAL_EMAIL'
    END as email_type,
    
    -- Additional context
    result_item->>'first_name' as first_name,
    result_item->>'last_name' as last_name,
    meta->>'domain' as company_domain,
    meta->>'scan_id' as scan_id,
    created_at as scan_date
    
FROM artifacts,
     jsonb_array_elements(meta->'breach_analysis'->'leakcheck_results') as result_item
WHERE type = 'breach_directory_summary'
  AND meta->'breach_analysis'->'leakcheck_total' > 0
ORDER BY 
    -- Priority: Infostealer > Password > Email only
    CASE 
        WHEN (result_item->>'has_cookies')::boolean = true OR (result_item->>'has_autofill')::boolean = true THEN 1
        WHEN result_item->'source'->>'name' ILIKE '%stealer%' THEN 1
        WHEN (result_item->>'has_password')::boolean = true THEN 2
        ELSE 3
    END,
    -- Corporate emails first
    CASE WHEN result_item->>'email' ILIKE '%@' || (meta->>'domain') THEN 1 ELSE 2 END,
    result_item->'source'->>'breach_date' DESC;


-- IMMEDIATE ACTION QUERY: Get usernames requiring immediate password reset
SELECT DISTINCT
    result_item->>'username' as username,
    result_item->>'email' as email,
    result_item->'source'->>'name' as breach_source,
    'IMMEDIATE_RESET_REQUIRED' as action
FROM artifacts,
     jsonb_array_elements(meta->'breach_analysis'->'leakcheck_results') as result_item
WHERE type = 'breach_directory_summary'
  AND (
    (result_item->>'has_cookies')::boolean = true 
    OR (result_item->>'has_autofill')::boolean = true
    OR result_item->'source'->>'name' ILIKE '%stealer%'
    OR result_item->'source'->>'name' ILIKE '%redline%'
    OR result_item->'source'->>'name' ILIKE '%raccoon%'
  )
ORDER BY result_item->>'username';


-- SUMMARY STATS: Count by risk level
SELECT 
    CASE 
        WHEN (result_item->>'has_cookies')::boolean = true 
          OR (result_item->>'has_autofill')::boolean = true 
          OR result_item->'source'->>'name' ILIKE '%stealer%'
        THEN 'CRITICAL_INFOSTEALER'
        WHEN (result_item->>'has_password')::boolean = true
        THEN 'HIGH_PASSWORD_EXPOSED'
        ELSE 'MEDIUM_EMAIL_EXPOSED'
    END as risk_level,
    COUNT(*) as employee_count
FROM artifacts,
     jsonb_array_elements(meta->'breach_analysis'->'leakcheck_results') as result_item
WHERE type = 'breach_directory_summary'
GROUP BY 1
ORDER BY 
    CASE 
        WHEN CASE 
            WHEN (result_item->>'has_cookies')::boolean = true 
              OR (result_item->>'has_autofill')::boolean = true 
              OR result_item->'source'->>'name' ILIKE '%stealer%'
            THEN 'CRITICAL_INFOSTEALER'
            WHEN (result_item->>'has_password')::boolean = true
            THEN 'HIGH_PASSWORD_EXPOSED'
            ELSE 'MEDIUM_EMAIL_EXPOSED'
        END = 'CRITICAL_INFOSTEALER' THEN 1
        WHEN CASE 
            WHEN (result_item->>'has_cookies')::boolean = true 
              OR (result_item->>'has_autofill')::boolean = true 
              OR result_item->'source'->>'name' ILIKE '%stealer%'
            THEN 'CRITICAL_INFOSTEALER'
            WHEN (result_item->>'has_password')::boolean = true
            THEN 'HIGH_PASSWORD_EXPOSED'
            ELSE 'MEDIUM_EMAIL_EXPOSED'
        END = 'HIGH_PASSWORD_EXPOSED' THEN 2
        ELSE 3
    END;