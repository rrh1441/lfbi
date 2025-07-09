const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

console.log('=== CHECKING SCAN RESULTS FOR vulnerable-test-site.vercel.app ===');

pool.query(`
  SELECT type, val_text, severity, created_at 
  FROM artifacts 
  WHERE val_text ILIKE '%vulnerable-test-site%' 
  ORDER BY created_at DESC 
  LIMIT 10;
`)
.then(result => {
  console.log(`Found ${result.rows.length} results:`);
  
  if (result.rows.length === 0) {
    console.log('❌ NO FINDINGS FOR vulnerable-test-site.vercel.app');
    console.log('Checking recent activity...');
    return pool.query(`SELECT COUNT(*) as total FROM artifacts WHERE created_at > NOW() - INTERVAL '1 hour'`);
  } else {
    console.log('✅ SCAN RESULTS FOUND:');
    result.rows.forEach((row, i) => {
      console.log(`${i+1}. [${row.severity}] ${row.type}`);
      console.log(`   Time: ${row.created_at}`);
      console.log(`   Finding: ${row.val_text}`);
      console.log('');
    });
    return Promise.resolve();
  }
})
.then(recentCheck => {
  if (recentCheck) {
    console.log(`Recent artifacts in last hour: ${recentCheck.rows[0].total}`);
  }
  pool.end();
})
.catch(err => {
  console.error('Database error:', err.message);
  pool.end();
});