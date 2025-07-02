import { pool } from './apps/workers/core/artifactStore.js';

async function checkDnsTwistFindings() {
  try {
    console.log('🔍 Checking DNS Twist findings for WHOIS evidence issues...');
    
    // Test basic connection
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Database connected:', testResult.rows[0].current_time);
    
    // Check for recent DNS Twist artifacts (type='typo_domain' or scan_module='dnstwist')
    const dnsTwistResults = await pool.query(`
      SELECT 
        id,
        type,
        val_text,
        severity,
        created_at,
        meta->>'scan_id' as scan_id,
        meta->>'domain' as domain,
        meta->>'scan_module' as scan_module,
        meta->'whois_evidence' as whois_evidence,
        meta->'whois_data' as whois_data
      FROM artifacts 
      WHERE (type = 'typo_domain' OR meta->>'scan_module' = 'dnstwist')
      ORDER BY created_at DESC
      LIMIT 20
    `);
    
    console.log(`\n📊 Found ${dnsTwistResults.rows.length} DNS Twist artifacts:`);
    
    if (dnsTwistResults.rows.length === 0) {
      console.log('❌ No DNS Twist artifacts found in database');
      return;
    }
    
    // Filter for specific scan_id if provided
    const targetScanId = '3SGBBEAKK63';
    const targetScanResults = dnsTwistResults.rows.filter(row => row.scan_id === targetScanId);
    
    if (targetScanResults.length > 0) {
      console.log(`\n🎯 Found ${targetScanResults.length} artifacts from target scan ${targetScanId}:`);
      
      targetScanResults.forEach((row, index) => {
        console.log(`\n${index + 1}. Artifact ID: ${row.id}`);
        console.log(`   Type: ${row.type}`);
        console.log(`   Created: ${row.created_at}`);
        console.log(`   Domain: ${row.domain}`);
        console.log(`   Scan ID: ${row.scan_id}`);
        console.log(`   Description: ${row.val_text}`);
        
        if (row.whois_evidence) {
          console.log(`   WHOIS Evidence: ${JSON.stringify(row.whois_evidence, null, 2)}`);
        }
        
        if (row.whois_data) {
          console.log(`   WHOIS Data: ${JSON.stringify(row.whois_data, null, 2)}`);
        }
      });
    }
    
    // Look for findings that might contain the contradictory evidence issue
    const findingsResults = await pool.query(`
      SELECT 
        f.id,
        f.finding_type,
        f.recommendation,
        f.description,
        f.created_at,
        a.meta->>'scan_id' as scan_id,
        a.meta->>'domain' as domain,
        a.meta->'whois_evidence' as whois_evidence
      FROM findings f
      JOIN artifacts a ON f.artifact_id = a.id
      WHERE (a.type = 'typo_domain' OR a.meta->>'scan_module' = 'dnstwist')
      AND (f.description ILIKE '%different ownership%' 
           OR f.description ILIKE '%different registrar and registrant%'
           OR f.description ILIKE '%Same registrant as original domain: Unknown%')
      ORDER BY f.created_at DESC
      LIMIT 10
    `);
    
    if (findingsResults.rows.length > 0) {
      console.log(`\n⚠️  Found ${findingsResults.rows.length} findings with potential contradictory evidence:`);
      
      findingsResults.rows.forEach((finding, index) => {
        console.log(`\n${index + 1}. Finding ID: ${finding.id}`);
        console.log(`   Type: ${finding.finding_type}`);
        console.log(`   Scan ID: ${finding.scan_id}`);
        console.log(`   Domain: ${finding.domain}`);
        console.log(`   Created: ${finding.created_at}`);
        console.log(`   Description: ${finding.description}`);
        console.log(`   Evidence: ${finding.recommendation}`);
        
        if (finding.whois_evidence) {
          console.log(`   WHOIS Evidence: ${JSON.stringify(finding.whois_evidence, null, 2)}`);
        }
        
        // Check for the specific contradiction pattern
        if (finding.description.includes('Same registrant as original domain: Unknown') && 
            finding.description.includes('Different registrar and registrant')) {
          console.log(`   🚨 CONTRADICTION DETECTED: Claims "different registrant" but also says "Same registrant: Unknown"`);
        }
      });
    } else {
      console.log('\n✅ No findings found with contradictory evidence patterns');
    }
    
    // Check all recent DNS Twist artifacts regardless of scan_id
    console.log(`\n📋 All recent DNS Twist artifacts:`);
    dnsTwistResults.rows.forEach((row, index) => {
      console.log(`\n${index + 1}. Artifact ID: ${row.id}`);
      console.log(`   Type: ${row.type}`);
      console.log(`   Created: ${row.created_at}`);
      console.log(`   Domain: ${row.domain}`);
      console.log(`   Scan ID: ${row.scan_id}`);
      console.log(`   Module: ${row.scan_module}`);
      console.log(`   Description: ${row.val_text.substring(0, 100)}...`);
      
      // Check for potential contradictory language in val_text
      if (row.val_text.includes('different ownership') || 
          row.val_text.includes('different registrar and registrant') ||
          row.val_text.includes('Same registrant as original domain: Unknown')) {
        console.log(`   ⚠️  Potential contradictory language detected in description`);
      }
    });
    
  } catch (error) {
    console.error('❌ Database query failed:', error.message);
  } finally {
    await pool.end();
  }
}

checkDnsTwistFindings();