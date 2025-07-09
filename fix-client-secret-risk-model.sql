-- Fix CLIENT_SIDE_SECRET_EXPOSURE risk model values
-- Current issue: 6 client-side secrets = only $12,000 annual risk
-- Reality: Should be $300,000+ for such severe exposure

-- Add proper risk values for CLIENT_SIDE_SECRET_EXPOSURE
INSERT INTO risk_constants (key, value) VALUES 
  -- Critical client-side secrets (e.g., service keys, admin tokens)
  ('CLIENT_SIDE_SECRET_EXPOSURE.CRITICAL', 500000),
  
  -- High client-side secrets (e.g., API keys, access tokens)
  ('CLIENT_SIDE_SECRET_EXPOSURE.HIGH', 200000),
  
  -- Medium client-side secrets (e.g., JWTs, session tokens)
  ('CLIENT_SIDE_SECRET_EXPOSURE.MEDIUM', 100000),
  
  -- Low client-side secrets (e.g., public keys, config tokens)
  ('CLIENT_SIDE_SECRET_EXPOSURE.LOW', 50000)

-- Update if they already exist (upsert)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Also add base rate for the category (if using category-based calculation)
INSERT INTO risk_constants (key, value) VALUES 
  ('CLIENT_SIDE_SECRET_EXPOSURE.BASE_RATE', 0.8),  -- 80% chance of exploitation
  ('CLIENT_SIDE_SECRET_EXPOSURE.IMPACT_MULTIPLIER', 2.0)  -- 2x impact for client-side exposure
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Verification query
SELECT key, value FROM risk_constants WHERE key LIKE '%CLIENT_SIDE_SECRET%' ORDER BY key;