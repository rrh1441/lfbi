#!/usr/bin/env node

// Mock test to show LeakCheck data structure and queries
console.log('🧪 MOCK TEST: LeakCheck Data Structure & Queries\n');

// Based on the breach module code, here's what gets stored:
const mockArtifactData = {
  type: 'breach_directory_summary',
  val_text: 'Breach probe: 47 total breached accounts (BD: 12, LC: 35) for example.com',
  severity: 'HIGH',
  meta: {
    scan_id: 'scan_123',
    scan_module: 'breachDirectoryProbe',
    domain: 'example.com',
    breach_analysis: {
      domain: 'example.com',
      breached_total: 12,
      sample_usernames: ['admin', 'john.doe', 'support', 'sales'],
      high_risk_assessment: true,
      breach_directory_success: true,
      leakcheck_total: 35,
      leakcheck_sources: ['Collection #1', 'RedLine Stealer', 'Compilation DB', 'Corporate Breach 2023'],
      leakcheck_success: true,
      combined_total: 47
    }
  }
};

console.log('📊 Sample Artifact Data Structure:');
console.log(JSON.stringify(mockArtifactData, null, 2));
console.log('\n' + '='.repeat(80) + '\n');

// ISSUE: The breach module doesn't store the full LeakCheck result array!
console.log('❌ PROBLEM IDENTIFIED:');
console.log('   The current breach module only stores:');
console.log('   - leakcheck_total (count)');
console.log('   - leakcheck_sources (breach names)');
console.log('   - sample_usernames (from both sources)');
console.log('   - But NOT the full LeakCheck result array with emails!');
console.log('');

// What SHOULD be stored for full infostealer detection:
const improvedStructure = {
  breach_analysis: {
    // ... existing fields ...
    leakcheck_results: [
      {
        email: 'john.doe@example.com',
        username: 'john.doe',
        source: {
          name: 'RedLine Stealer',
          breach_date: '2023-08',
          unverified: 0,
          passwordless: 0,
          compilation: 0
        },
        fields: ['email', 'username', 'password', 'cookies', 'autofill'],
        first_name: 'John',
        last_name: 'Doe'
      },
      {
        email: 'admin@example.com',
        username: 'admin',
        source: {
          name: 'Corporate Breach 2023',
          breach_date: '2023-11',
          unverified: 0,
          passwordless: 0,
          compilation: 1
        },
        fields: ['email', 'username', 'password']
      }
    ]
  }
};

console.log('✅ IMPROVED STRUCTURE NEEDED:');
console.log(JSON.stringify(improvedStructure, null, 2));
console.log('\n' + '='.repeat(80) + '\n');

// Query for current limited data:
console.log('🔍 CURRENT QUERY (Limited Data):');
console.log(`
SELECT 
    jsonb_array_elements_text(meta->'breach_analysis'->'sample_usernames') as username,
    jsonb_array_elements_text(meta->'breach_analysis'->'leakcheck_sources') as breach_source,
    meta->>'domain' as company_domain,
    meta->>'scan_id' as scan_id,
    
    -- Detect infostealer by source name only
    CASE 
        WHEN jsonb_array_elements_text(meta->'breach_analysis'->'leakcheck_sources') ILIKE '%stealer%'
          OR jsonb_array_elements_text(meta->'breach_analysis'->'leakcheck_sources') ILIKE '%redline%'
          OR jsonb_array_elements_text(meta->'breach_analysis'->'leakcheck_sources') ILIKE '%raccoon%'
        THEN 'LIKELY_INFOSTEALER'
        ELSE 'TRADITIONAL_BREACH'
    END as risk_level,
    
    created_at
FROM artifacts 
WHERE type = 'breach_directory_summary'
  AND meta->'breach_analysis'->'leakcheck_total' > 0
ORDER BY created_at DESC;
`);

console.log('\n' + '='.repeat(80) + '\n');

// Query for improved structure (if LeakCheck results were stored):
console.log('🔍 IMPROVED QUERY (Full Data):');
console.log(`
SELECT 
    result_item->>'email' as email,
    result_item->>'username' as username,
    result_item->'source'->>'name' as breach_source,
    result_item->'source'->>'breach_date' as breach_date,
    result_item->'fields' as compromised_fields,
    
    -- Detailed infostealer detection
    CASE 
        WHEN result_item->'source'->>'name' ILIKE '%stealer%'
          OR result_item->'fields' ? 'cookies'
          OR result_item->'fields' ? 'autofill'
        THEN 'HIGH_RISK_INFOSTEALER'
        WHEN result_item->'fields' ? 'password'
        THEN 'MEDIUM_RISK_PASSWORD'
        ELSE 'LOW_RISK_EMAIL_ONLY'
    END as risk_level,
    
    -- Corporate vs personal email
    CASE 
        WHEN result_item->>'email' ILIKE '%@' || (meta->>'domain') 
        THEN 'CORPORATE_EMAIL'
        ELSE 'PERSONAL_EMAIL'
    END as email_type,
    
    meta->>'domain' as company_domain
FROM artifacts,
     jsonb_array_elements(meta->'breach_analysis'->'leakcheck_results') as result_item
WHERE type = 'breach_directory_summary'
ORDER BY 
    CASE 
        WHEN result_item->'fields' ? 'cookies' THEN 1
        WHEN result_item->'fields' ? 'password' THEN 2
        ELSE 3
    END;
`);

console.log('\n' + '='.repeat(80) + '\n');

console.log('💡 RECOMMENDATIONS:');
console.log('1. Modify breachDirectoryProbe.ts to store full LeakCheck results');
console.log('2. Use the current limited query for immediate needs');
console.log('3. Run with: DATABASE_URL=your_supabase_url node test-leakcheck-structure.js');
console.log('4. Prioritize users from infostealer sources for immediate password reset');
console.log('');
console.log('🚨 IMMEDIATE ACTION for current data:');
console.log('   Run the current query to get usernames and check if any sources');
console.log('   contain "stealer", "redline", "raccoon" etc. for high-priority resets');