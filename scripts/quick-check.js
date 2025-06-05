import pkg from 'pg';
const { Pool } = pkg;

// Connect to database 
const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.DATABASE_URL
});

async function quickCheck() {
  try {
    console.log('🔍 Quick scan artifact check...');
    
    // Get artifact types and counts
    const typesQuery = `
      SELECT type, COUNT(*) as count
      FROM artifacts 
      GROUP BY type
      ORDER BY count DESC
    `;
    
    const result = await pool.query(typesQuery);
    console.log('\n📊 Artifact types found:');
    result.rows.forEach(row => {
      console.log(`  ${row.type}: ${row.count}`);
    });
    
    // Check specifically for secret artifacts (TruffleHog)
    const secretsQuery = `
      SELECT COUNT(*) as count 
      FROM artifacts 
      WHERE type = 'secret'
    `;
    
    const secretsResult = await pool.query(secretsQuery);
    const secretCount = secretsResult.rows[0].count;
    
    if (secretCount > 0) {
      console.log(`\n✅ TruffleHog found ${secretCount} secret(s)!`);
      
      // Show latest secret
      const latestSecret = await pool.query(`
        SELECT val_text, meta, created_at 
        FROM artifacts 
        WHERE type = 'secret' 
        ORDER BY created_at DESC 
        LIMIT 1
      `);
      
      if (latestSecret.rows.length > 0) {
        const secret = latestSecret.rows[0];
        console.log(`  Latest: ${secret.val_text}`);
        console.log(`  Found: ${secret.created_at}`);
        if (secret.meta?.detector) {
          console.log(`  Detector: ${secret.meta.detector}`);
        }
      }
    } else {
      console.log('\n❌ TruffleHog found 0 secrets');
    }
    
    // Check recent scan activity
    const recentQuery = `
      SELECT meta->>'scan_id' as scan_id, COUNT(*) as artifacts, MAX(created_at) as latest
      FROM artifacts 
      WHERE meta->>'scan_id' IS NOT NULL
      GROUP BY meta->>'scan_id'
      ORDER BY latest DESC
      LIMIT 3
    `;
    
    const recentResult = await pool.query(recentQuery);
    console.log('\n📅 Recent scan activity:');
    recentResult.rows.forEach(row => {
      console.log(`  ${row.scan_id}: ${row.artifacts} artifacts (${new Date(row.latest).toLocaleString()})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

quickCheck(); 