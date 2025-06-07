import { pool } from '../dist/workers/core/artifactStore.js';

async function debugReportIssue() {
  try {
    console.log('🔍 Debugging report generation issues...\n');
    
    // 1. Check recent scans
    const recentScansResult = await pool.query(`
      SELECT DISTINCT 
        meta->>'scan_id' as scan_id,
        meta->>'company' as company,
        meta->>'domain' as domain,
        COUNT(*) as artifact_count,
        MAX(created_at) as latest_artifact
      FROM artifacts 
      WHERE meta->>'scan_id' IS NOT NULL
      AND created_at > NOW() - INTERVAL '7 days'
      GROUP BY meta->>'scan_id', meta->>'company', meta->>'domain'
      ORDER BY MAX(created_at) DESC
      LIMIT 10
    `);
    
    console.log('📊 Recent scans in last 7 days:');
    console.log('=====================================');
    recentScansResult.rows.forEach(row => {
      console.log(`Scan ID: ${row.scan_id}`);
      console.log(`Company: ${row.company || 'NOT SET'}`);
      console.log(`Domain: ${row.domain || 'NOT SET'}`);
      console.log(`Artifacts: ${row.artifact_count}`);
      console.log(`Latest: ${new Date(row.latest_artifact).toLocaleString()}`);
      console.log('-------------------------------------');
    });
    
    if (recentScansResult.rows.length === 0) {
      console.log('⚠️  NO SCANS FOUND IN LAST 7 DAYS\n');
      return;
    }
    
    // 2. Pick the most recent scan for detailed analysis
    const latestScanId = recentScansResult.rows[0].scan_id;
    console.log(`\n🔎 Analyzing latest scan: ${latestScanId}\n`);
    
    // 3. Check module breakdown
    const moduleResult = await pool.query(`
      SELECT 
        meta->>'scan_module' as module,
        COUNT(*) as count,
        COUNT(CASE WHEN src_url IS NOT NULL THEN 1 END) as with_src_url,
        COUNT(CASE WHEN meta->>'error' = 'true' THEN 1 END) as errors
      FROM artifacts 
      WHERE meta->>'scan_id' = $1
      GROUP BY meta->>'scan_module'
      ORDER BY count DESC
    `, [latestScanId]);
    
    console.log('📋 Module breakdown:');
    console.log('=====================================');
    console.log('Module         | Total | With URL | Errors');
    console.log('---------------|-------|----------|--------');
    moduleResult.rows.forEach(row => {
      console.log(`${(row.module || 'unknown').padEnd(14)} | ${String(row.count).padEnd(5)} | ${String(row.with_src_url).padEnd(8)} | ${row.errors}`);
    });
    
    // 4. Check for Shodan findings specifically
    const shodanResult = await pool.query(`
      SELECT COUNT(*) as shodan_count 
      FROM artifacts 
      WHERE meta->>'scan_id' = $1 
      AND meta->>'scan_module' = 'shodan'
      AND src_url IS NOT NULL
    `, [latestScanId]);
    
    console.log(`\n⚠️  Shodan findings with src_url: ${shodanResult.rows[0].shodan_count}`);
    
    // 5. Check validation criteria
    console.log('\n🚨 Report Validator Criteria Check:');
    console.log('=====================================');
    
    const validationChecks = await pool.query(`
      SELECT 
        COUNT(*) as total_artifacts,
        COUNT(CASE WHEN meta->>'error' IS NULL THEN 1 END) as non_error_artifacts,
        COUNT(CASE WHEN src_url IS NOT NULL THEN 1 END) as with_src_url,
        COUNT(CASE WHEN meta->>'scan_module' = 'shodan' AND src_url IS NOT NULL THEN 1 END) as shodan_with_url
      FROM artifacts 
      WHERE meta->>'scan_id' = $1
    `, [latestScanId]);
    
    const check = validationChecks.rows[0];
    console.log(`Total artifacts: ${check.total_artifacts}`);
    console.log(`Non-error artifacts: ${check.non_error_artifacts}`);
    console.log(`With src_url: ${check.with_src_url}`);
    console.log(`Shodan with src_url: ${check.shodan_with_url}`);
    
    // Determine why validation might fail
    if (check.non_error_artifacts === 0) {
      console.log('\n❌ VALIDATION WILL FAIL: No non-error artifacts found');
    } else if (check.shodan_with_url === 0) {
      console.log('\n❌ VALIDATION WILL FAIL: No Shodan findings with src_url');
      console.log('   The validator requires at least one Shodan finding with src_url');
    } else {
      console.log('\n✅ VALIDATION SHOULD PASS');
    }
    
    // 6. Sample some actual findings
    const sampleResult = await pool.query(`
      SELECT 
        type,
        severity,
        val_text,
        src_url,
        meta->>'scan_module' as module
      FROM artifacts 
      WHERE meta->>'scan_id' = $1
      AND meta->>'error' IS NULL
      LIMIT 5
    `, [latestScanId]);
    
    console.log('\n📄 Sample findings:');
    console.log('=====================================');
    sampleResult.rows.forEach((row, i) => {
      console.log(`\n${i + 1}. ${row.type} (${row.severity})`);
      console.log(`   Module: ${row.module || 'unknown'}`);
      console.log(`   Finding: ${row.val_text.substring(0, 100)}...`);
      console.log(`   Source: ${row.src_url || 'NO SOURCE URL'}`);
    });
    
    // 7. Check if reports exist for this scan
    const reportResult = await pool.query(`
      SELECT id, generated_at 
      FROM security_reports 
      WHERE scan_id = $1
    `, [latestScanId]);
    
    if (reportResult.rows.length > 0) {
      console.log(`\n✅ Report EXISTS for this scan (ID: ${reportResult.rows[0].id})`);
      console.log(`   Generated at: ${new Date(reportResult.rows[0].generated_at).toLocaleString()}`);
    } else {
      console.log('\n❌ NO REPORT found for this scan in security_reports table');
    }
    
  } catch (error) {
    console.error('❌ Debug script failed:', error.message);
    console.error(error);
  } finally {
    await pool.end();
  }
}

debugReportIssue();