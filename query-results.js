// Quick script to query scan results
import { pool } from './apps/workers/core/artifactStore.js';

async function getResults() {
  try {
    console.log('Querying for vulnerable-test-site results...');
    
    const result = await pool.query(`
      SELECT type, val_text, severity, created_at, meta 
      FROM artifacts 
      WHERE val_text ILIKE '%vulnerable-test-site%' 
      ORDER BY created_at DESC 
      LIMIT 10;
    `);
    
    console.log(`\n🔍 Found ${result.rows.length} results for vulnerable-test-site.vercel.app:\n`);
    
    if (result.rows.length === 0) {
      console.log('❌ No scan results found for vulnerable-test-site.vercel.app');
      console.log('This means either:');
      console.log('1. The scan hasn\'t run yet');
      console.log('2. The scan failed');
      console.log('3. No findings were detected (scanner still broken)');
      
      // Check for any recent scans
      const recentScans = await pool.query(`
        SELECT type, val_text, severity, created_at 
        FROM artifacts 
        WHERE created_at > NOW() - INTERVAL '1 hour'
        ORDER BY created_at DESC 
        LIMIT 5;
      `);
      
      console.log(`\n📊 Recent scans (last hour): ${recentScans.rows.length}`);
      recentScans.rows.forEach(row => {
        console.log(`  - ${row.created_at}: ${row.type} - ${row.val_text}`);
      });
    } else {
      result.rows.forEach((row, i) => {
        console.log(`${i + 1}. [${row.severity}] ${row.type}`);
        console.log(`   Time: ${row.created_at}`);
        console.log(`   Finding: ${row.val_text}`);
        if (row.meta && row.meta.scan_module) {
          console.log(`   Module: ${row.meta.scan_module}`);
        }
        console.log('');
      });
    }
    
    await pool.end();
    
  } catch (error) {
    console.error('❌ Database query failed:', error.message);
    process.exit(1);
  }
}

getResults();