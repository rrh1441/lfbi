const { pool } = require('/app/apps/workers/dist/core/artifactStore.js');

console.log('=== CHECKING FOR VULNERABLE-TEST-SITE RESULTS ===');

pool.query(`SELECT type, val_text, severity, created_at 
           FROM artifacts 
           WHERE val_text ILIKE '%vulnerable-test-site%' 
           ORDER BY created_at DESC 
           LIMIT 5`)
.then(result => {
  console.log(`Found ${result.rows.length} results for vulnerable-test-site`);
  
  if (result.rows.length === 0) {
    console.log('❌ NO SCAN RESULTS FOUND');
    console.log('Checking recent activity...');
    return pool.query(`SELECT COUNT(*) as count FROM artifacts WHERE created_at > NOW() - INTERVAL '2 hours'`);
  } else {
    console.log('✅ SCAN RESULTS:');
    result.rows.forEach((row, i) => {
      console.log(`${i+1}. [${row.severity}] ${row.type}`);
      console.log(`   Time: ${row.created_at}`);
      console.log(`   ${row.val_text}`);
      console.log('');
    });
    return null;
  }
})
.then(recentCheck => {
  if (recentCheck) {
    console.log(`Recent artifacts (2 hours): ${recentCheck.rows[0].count}`);
  }
  pool.end();
})
.catch(err => {
  console.error('Database error:', err.message);
  pool.end();
});