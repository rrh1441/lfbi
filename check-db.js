const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DB_URL
});

console.log('=== CHECKING VULNERABLE-TEST-SITE SCAN RESULTS ===');
pool.query('SELECT type, val_text, severity, created_at FROM artifacts WHERE val_text ILIKE \'%vulnerable-test-site%\' ORDER BY created_at DESC LIMIT 5;')
.then(result => {
  console.log('Found', result.rows.length, 'results for vulnerable-test-site.vercel.app');
  if (result.rows.length === 0) {
    console.log('❌ NO SCAN RESULTS FOUND');
    return pool.query('SELECT COUNT(*) as count FROM artifacts WHERE created_at > NOW() - INTERVAL \'1 hour\';');
  } else {
    console.log('✅ ENHANCED SCANNER DETECTED:');
    result.rows.forEach((row, i) => {
      console.log(`${i+1}. [${row.severity}] ${row.type}`);
      console.log(`   Time: ${row.created_at}`);
      console.log(`   Finding: ${row.val_text}`);
      console.log('---');
    });
    return null;
  }
})
.then(recentCheck => {
  if (recentCheck) {
    console.log('Recent activity (1 hour):', recentCheck.rows[0].count);
  }
  pool.end();
})
.catch(err => {
  console.error('Database error:', err.message);
  pool.end();
});