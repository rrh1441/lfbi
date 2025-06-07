import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function getLexigateData() {
  try {
    console.log('🔍 Getting Lexigate scan data...');
    
    // Get scan IDs
    const scanResult = await pool.query(`
      SELECT DISTINCT 
        meta->>'scan_id' as scan_id,
        meta->>'company' as company,
        COUNT(*) as artifacts
      FROM artifacts 
      WHERE (meta->>'company' ILIKE '%lexigate%' OR val_text ILIKE '%lexigate%')
      AND meta->>'scan_id' IS NOT NULL
      GROUP BY 1,2 
      ORDER BY 3 DESC
    `);
    
    console.log('Found scans:', JSON.stringify(scanResult.rows, null, 2));
    
    // Get all data for each scan
    for (const scan of scanResult.rows) {
      console.log(`\n📋 SCAN: ${scan.scan_id} (${scan.company})`);
      
      const artifacts = await pool.query(`
        SELECT type, val_text, severity, src_url, meta, created_at
        FROM artifacts 
        WHERE meta->>'scan_id' = $1
        ORDER BY severity DESC, created_at
      `, [scan.scan_id]);
      
      artifacts.rows.forEach((artifact, i) => {
        console.log(`${i+1}. [${artifact.severity}] ${artifact.val_text}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

getLexigateData();