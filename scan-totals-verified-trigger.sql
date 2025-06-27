-- Function to update scan_totals_verified when findings are verified
CREATE OR REPLACE FUNCTION update_scan_totals_verified()
RETURNS TRIGGER AS $$
DECLARE
    scan_totals_record RECORD;
    verified_count INTEGER;
BEGIN
    -- Only proceed if state changed to VERIFIED
    IF NEW.state = 'VERIFIED' AND (OLD.state IS NULL OR OLD.state != 'VERIFIED') THEN
        
        -- Get the automated totals for this scan
        SELECT * INTO scan_totals_record 
        FROM scan_totals_automated 
        WHERE scan_id = NEW.scan_id;
        
        IF scan_totals_record IS NOT NULL THEN
            -- Count total verified findings for this scan
            SELECT COUNT(*) INTO verified_count
            FROM findings 
            WHERE scan_id = NEW.scan_id AND state = 'VERIFIED';
            
            -- Upsert into scan_totals_verified with same values as automated
            INSERT INTO scan_totals_verified (
                scan_id,
                company_domain,
                phishing_bec_low,
                phishing_bec_ml,
                phishing_bec_high,
                site_hack_low,
                site_hack_ml,
                site_hack_high,
                malware_low,
                malware_ml,
                malware_high,
                cyber_total_low,
                cyber_total_ml,
                cyber_total_high,
                ada_compliance_low,
                ada_compliance_ml,
                ada_compliance_high,
                dow_daily_low,
                dow_daily_ml,
                dow_daily_high,
                total_findings,
                verified_findings,
                automated_id,
                verified_at,
                updated_at
            ) VALUES (
                scan_totals_record.scan_id,
                scan_totals_record.company_domain,
                scan_totals_record.phishing_bec_low,
                scan_totals_record.phishing_bec_ml,
                scan_totals_record.phishing_bec_high,
                scan_totals_record.site_hack_low,
                scan_totals_record.site_hack_ml,
                scan_totals_record.site_hack_high,
                scan_totals_record.malware_low,
                scan_totals_record.malware_ml,
                scan_totals_record.malware_high,
                scan_totals_record.cyber_total_low,
                scan_totals_record.cyber_total_ml,
                scan_totals_record.cyber_total_high,
                scan_totals_record.ada_compliance_low,
                scan_totals_record.ada_compliance_ml,
                scan_totals_record.ada_compliance_high,
                scan_totals_record.dow_daily_low,
                scan_totals_record.dow_daily_ml,
                scan_totals_record.dow_daily_high,
                scan_totals_record.total_findings,
                verified_count,
                scan_totals_record.id,
                NOW(),
                NOW()
            )
            ON CONFLICT (scan_id) DO UPDATE SET
                verified_findings = verified_count,
                verified_at = NOW(),
                updated_at = NOW();
                
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on findings table
DROP TRIGGER IF EXISTS trigger_update_scan_totals_verified ON findings;
CREATE TRIGGER trigger_update_scan_totals_verified
    AFTER UPDATE OF state ON findings
    FOR EACH ROW
    EXECUTE FUNCTION update_scan_totals_verified();

-- Also create trigger for INSERT in case findings are created with VERIFIED state
DROP TRIGGER IF EXISTS trigger_insert_scan_totals_verified ON findings;
CREATE TRIGGER trigger_insert_scan_totals_verified
    AFTER INSERT ON findings
    FOR EACH ROW
    WHEN (NEW.state = 'VERIFIED')
    EXECUTE FUNCTION update_scan_totals_verified();