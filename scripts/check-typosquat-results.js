import { pool } from '../dist/workers/core/artifactStore.js';

async function checkTyposquatResults() {
  try {
    console.log('🔍 Checking typosquat scan results...');
    
    // Test basic connection
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Database connected:', testResult.rows[0].current_time);
    
    // Check for recent typosquat_summary artifacts ordered by newest first
    const typosquatResults = await pool.query(`
      SELECT 
        id,
        val_text,
        severity,
        created_at,
        meta->>'scan_id' as scan_id,
        meta->>'domain' as domain,
        meta->'summary' as summary,
        (meta->'all_analyses')::json as all_analyses
      FROM artifacts 
      WHERE type = 'typosquat_summary'
      ORDER BY created_at DESC
      LIMIT 10
    `);
    
    console.log(`\n📊 Found ${typosquatResults.rows.length} typosquat summary artifacts:`);
    
    if (typosquatResults.rows.length === 0) {
      console.log('❌ No typosquat_summary artifacts found in database');
      
      // Check for any scan_error artifacts from typosquatScorer
      const errorResults = await pool.query(`
        SELECT 
          id,
          val_text,
          severity,
          created_at,
          meta->>'scan_id' as scan_id
        FROM artifacts 
        WHERE type = 'scan_error' 
        AND meta->>'scan_module' = 'typosquatScorer'
        ORDER BY created_at DESC
        LIMIT 5
      `);
      
      if (errorResults.rows.length > 0) {
        console.log(`\n⚠️  Found ${errorResults.rows.length} typosquat scan errors:`);
        errorResults.rows.forEach((row, index) => {
          console.log(`\n${index + 1}. Error ID: ${row.id}`);
          console.log(`   Created: ${row.created_at}`);
          console.log(`   Scan ID: ${row.scan_id}`);
          console.log(`   Message: ${row.val_text}`);
        });
      }
    } else {
      typosquatResults.rows.forEach((row, index) => {
        console.log(`\n${index + 1}. Artifact ID: ${row.id}`);
        console.log(`   Created: ${row.created_at}`);
        console.log(`   Domain: ${row.domain}`);
        console.log(`   Scan ID: ${row.scan_id}`);
        console.log(`   Severity: ${row.severity}`);
        console.log(`   Summary: ${row.val_text}`);
        
        if (row.summary) {
          const summary = row.summary;
          console.log(`   📈 Analysis Summary:`);
          console.log(`      - Total domains checked: ${summary.total_domains_checked || 'N/A'}`);
          console.log(`      - Active squats found: ${summary.active_squats_found || 'N/A'}`);
          console.log(`      - Suspicious domains: ${summary.suspicious_domains || 'N/A'}`);
          console.log(`      - Average risk score: ${summary.avg_risk_score || 'N/A'}`);
          
          if (summary.top_risk_domains && summary.top_risk_domains.length > 0) {
            console.log(`      - Top risk domains: ${summary.top_risk_domains.slice(0, 3).join(', ')}`);
          }
        }
        
        if (row.all_analyses && Array.isArray(row.all_analyses)) {
          console.log(`   🔍 Domain Analysis Details:`);
          console.log(`      - Total analyses: ${row.all_analyses.length}`);
          
          // Show first few domain analyses
          const analyses = row.all_analyses.slice(0, 3);
          analyses.forEach((analysis, i) => {
            console.log(`      ${i + 1}. Domain: ${analysis.domain}`);
            console.log(`         - Fuzzer: ${analysis.fuzzer}`);
            console.log(`         - Risk score: ${analysis.risk_score}`);
            console.log(`         - Days since creation: ${analysis.days_since_creation || 'N/A'}`);
            console.log(`         - Is active squat: ${analysis.is_active_squat}`);
            console.log(`         - ASN match: ${analysis.asn_match}`);
            console.log(`         - Evidence: ${analysis.evidence ? analysis.evidence.join(', ') : 'None'}`);
          });
          
          if (row.all_analyses.length > 3) {
            console.log(`      ... and ${row.all_analyses.length - 3} more analyses`);
          }
        }
      });
    }
    
    // Check for any related findings
    const findingsResults = await pool.query(`
      SELECT 
        f.id,
        f.finding_type,
        f.recommendation,
        f.description,
        f.created_at,
        a.meta->>'scan_id' as scan_id
      FROM findings f
      JOIN artifacts a ON f.artifact_id = a.id
      WHERE a.type = 'typosquat_summary'
      ORDER BY f.created_at DESC
      LIMIT 20
    `);
    
    if (findingsResults.rows.length > 0) {
      console.log(`\n🎯 Found ${findingsResults.rows.length} typosquat findings:`);
      findingsResults.rows.forEach((finding, index) => {
        console.log(`\n${index + 1}. Finding ID: ${finding.id}`);
        console.log(`   Type: ${finding.finding_type}`);
        console.log(`   Description: ${finding.description}`);
        console.log(`   Evidence: ${finding.recommendation}`);
        console.log(`   Created: ${finding.created_at}`);
        console.log(`   Scan ID: ${finding.scan_id}`);
      });
    } else {
      console.log('\n📝 No typosquat findings found');
    }
    
    // Check what scans have been run recently
    const recentScans = await pool.query(`
      SELECT 
        meta->>'scan_id' as scan_id,
        meta->>'domain' as domain,
        meta->>'scan_module' as scan_module,
        COUNT(*) as artifact_count,
        MAX(created_at) as latest_artifact
      FROM artifacts 
      WHERE meta->>'scan_id' IS NOT NULL
      AND created_at > NOW() - INTERVAL '7 days'
      GROUP BY meta->>'scan_id', meta->>'domain', meta->>'scan_module'
      HAVING meta->>'scan_module' = 'typosquatScorer' OR COUNT(*) > 5
      ORDER BY latest_artifact DESC
      LIMIT 10
    `);
    
    console.log(`\n📅 Recent scans (last 7 days):`);
    recentScans.rows.forEach((scan, index) => {
      console.log(`${index + 1}. Scan ID: ${scan.scan_id}`);
      console.log(`   Domain: ${scan.domain}`);
      console.log(`   Module: ${scan.scan_module}`);
      console.log(`   Artifacts: ${scan.artifact_count}`);
      console.log(`   Latest: ${scan.latest_artifact}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Database query failed:', error.message);
  } finally {
    await pool.end();
  }
}

checkTyposquatResults();