import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.DATABASE_URL
});

async function checkTruffleHogResults() {
  try {
    console.log('🔍 Checking for TruffleHog results...');
    
    // Test basic connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected');
    
    // Check for TruffleHog-specific artifacts
    const secretsQuery = `
      SELECT 
        id,
        type,
        val_text,
        severity,
        src_url,
        meta,
        created_at
      FROM artifacts 
      WHERE type = 'secret'
      ORDER BY created_at DESC
      LIMIT 10
    `;
    
    const secretsResult = await pool.query(secretsQuery);
    console.log(`📊 Found ${secretsResult.rows.length} TruffleHog secret artifacts`);
    
    if (secretsResult.rows.length > 0) {
      console.log('\n🕵️  TruffleHog Secret Findings:');
      secretsResult.rows.forEach((row, idx) => {
        console.log(`\n${idx + 1}. [${row.severity}] ${row.val_text}`);
        if (row.src_url) console.log(`   Source: ${row.src_url}`);
        if (row.meta?.detector) console.log(`   Detector: ${row.meta.detector}`);
        if (row.meta?.verified !== undefined) console.log(`   Verified: ${row.meta.verified}`);
        console.log(`   Found: ${row.created_at}`);
      });
    } else {
      console.log('❌ No TruffleHog secret artifacts found');
    }
    
    // Check for any scan that might have included TruffleHog
    const scanQuery = `
      SELECT DISTINCT meta->>'scan_id' as scan_id, COUNT(*) as total_artifacts
      FROM artifacts 
      WHERE meta->>'scan_id' IS NOT NULL
      GROUP BY meta->>'scan_id'
      ORDER BY MAX(created_at) DESC
      LIMIT 5
    `;
    
    const scanResult = await pool.query(scanQuery);
    console.log(`\n📋 Recent scans that may have included TruffleHog:`);
    
    for (const scan of scanResult.rows) {
      if (scan.scan_id) {
        console.log(`\n🔍 Scan: ${scan.scan_id} (${scan.total_artifacts} artifacts)`);
        
        // Check this specific scan for secrets
        const scanSecretsQuery = `
          SELECT COUNT(*) as secret_count
          FROM artifacts 
          WHERE meta->>'scan_id' = $1 AND type = 'secret'
        `;
        
        const scanSecretsResult = await pool.query(scanSecretsQuery, [scan.scan_id]);
        const secretCount = scanSecretsResult.rows[0].secret_count;
        
        if (secretCount > 0) {
          console.log(`   ✅ TruffleHog found ${secretCount} secrets in this scan`);
        } else {
          console.log(`   ❌ TruffleHog found 0 secrets in this scan`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  } finally {
    await pool.end();
  }
}

checkTruffleHogResults(); 