-- Create scan totals tables for automated and verified results

CREATE TABLE scan_totals_automated (
  id SERIAL PRIMARY KEY,
  scan_id VARCHAR NOT NULL UNIQUE,
  company_domain VARCHAR NOT NULL,
  
  -- Cyber Incident Costs (individual attack types)
  phishing_bec_low NUMERIC DEFAULT 0,
  phishing_bec_ml NUMERIC DEFAULT 0, 
  phishing_bec_high NUMERIC DEFAULT 0,
  
  site_hack_low NUMERIC DEFAULT 0,
  site_hack_ml NUMERIC DEFAULT 0,
  site_hack_high NUMERIC DEFAULT 0,
  
  malware_low NUMERIC DEFAULT 0,
  malware_ml NUMERIC DEFAULT 0,
  malware_high NUMERIC DEFAULT 0,
  
  -- Cyber totals (sum of above)
  cyber_total_low NUMERIC DEFAULT 0,
  cyber_total_ml NUMERIC DEFAULT 0,
  cyber_total_high NUMERIC DEFAULT 0,
  
  -- Potential Legal Costs (ADA compliance)
  ada_compliance_low NUMERIC DEFAULT 0,
  ada_compliance_ml NUMERIC DEFAULT 0,
  ada_compliance_high NUMERIC DEFAULT 0,
  
  -- Daily Losses (Denial of Wallet)
  dow_daily_low NUMERIC DEFAULT 0,
  dow_daily_ml NUMERIC DEFAULT 0,
  dow_daily_high NUMERIC DEFAULT 0,
  
  -- Metadata
  total_findings INTEGER DEFAULT 0,
  verified_findings INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_scan_totals_automated_scan_id (scan_id),
  INDEX idx_scan_totals_automated_domain (company_domain)
);

CREATE TABLE scan_totals_verified (
  id SERIAL PRIMARY KEY,
  scan_id VARCHAR NOT NULL UNIQUE,
  company_domain VARCHAR NOT NULL,
  
  -- Cyber Incident Costs (individual attack types)
  phishing_bec_low NUMERIC DEFAULT 0,
  phishing_bec_ml NUMERIC DEFAULT 0, 
  phishing_bec_high NUMERIC DEFAULT 0,
  
  site_hack_low NUMERIC DEFAULT 0,
  site_hack_ml NUMERIC DEFAULT 0,
  site_hack_high NUMERIC DEFAULT 0,
  
  malware_low NUMERIC DEFAULT 0,
  malware_ml NUMERIC DEFAULT 0,
  malware_high NUMERIC DEFAULT 0,
  
  -- Cyber totals (sum of above)
  cyber_total_low NUMERIC DEFAULT 0,
  cyber_total_ml NUMERIC DEFAULT 0,
  cyber_total_high NUMERIC DEFAULT 0,
  
  -- Potential Legal Costs (ADA compliance)
  ada_compliance_low NUMERIC DEFAULT 0,
  ada_compliance_ml NUMERIC DEFAULT 0,
  ada_compliance_high NUMERIC DEFAULT 0,
  
  -- Daily Losses (Denial of Wallet)
  dow_daily_low NUMERIC DEFAULT 0,
  dow_daily_ml NUMERIC DEFAULT 0,
  dow_daily_high NUMERIC DEFAULT 0,
  
  -- Metadata
  total_findings INTEGER DEFAULT 0,
  verified_findings INTEGER DEFAULT 0,
  verified_at TIMESTAMP,
  verified_by VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Reference to automated table
  automated_id INTEGER REFERENCES scan_totals_automated(id),
  
  -- Indexes
  INDEX idx_scan_totals_verified_scan_id (scan_id),
  INDEX idx_scan_totals_verified_domain (company_domain),
  INDEX idx_scan_totals_verified_automated_id (automated_id)
);