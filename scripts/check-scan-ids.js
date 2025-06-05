import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.DATABASE_URL
});

async function checkScanIds() {
  try {
    const result = await pool.query(`
      SELECT meta->>'scan_id' as scan_id, 
             meta->>'company' as company,
             COUNT(*) as findings 
      FROM artifacts 
      WHERE meta->>'scan_id' IS NOT NULL 
      GROUP BY meta->>'scan_id', meta->>'company'
      ORDER BY COUNT(*) DESC
    `);
    
    console.log('=== SCAN IDs WITH COMPANIES ===');
    result.rows.forEach(row => {
      console.log(`${row.scan_id}: ${row.company || 'Unknown'} - ${row.findings} findings`);
    });
    
    // Check for any Cohesive-related scans
    const cohesiveCheck = await pool.query(`
      SELECT meta->>'scan_id' as scan_id, 
             meta->>'company' as company,
             COUNT(*) as findings
      FROM artifacts 
      WHERE LOWER(meta->>'company') LIKE '%cohesive%'
         OR LOWER(val_text) LIKE '%cohesive%'
         OR LOWER(src_url) LIKE '%cohesive%'
      GROUP BY meta->>'scan_id', meta->>'company'
    `);
    
    console.log('\n=== COHESIVE-RELATED SCANS ===');
    if (cohesiveCheck.rows.length > 0) {
      cohesiveCheck.rows.forEach(row => {
        console.log(`${row.scan_id}: ${row.company || 'Unknown'} - ${row.findings} findings`);
      });
    } else {
      console.log('No Cohesive-related scans found');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkScanIds(); 