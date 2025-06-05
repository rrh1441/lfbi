import { pool } from '../dist/workers/core/artifactStore.js';

async function testDatabase() {
  try {
    console.log('🔍 Testing database connectivity...');
    
    // Test basic connection
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Database connected:', testResult.rows[0].current_time);
    
    // Check tables exist
    const tablesResult = await pool.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('artifacts', 'findings')
    `);
    console.log('📋 Tables found:', tablesResult.rows.map(r => r.tablename));
    
    // Check for Ion Interactive scan data
    const scanResult = await pool.query(`
      SELECT COUNT(*) as count 
      FROM artifacts 
      WHERE meta->>'scan_id' = $1
    `, ['rpQbDvL6BiK']);
    
    console.log('🔍 Ion Interactive scan findings:', scanResult.rows[0].count);
    
    // Check for any recent scan data
    const recentResult = await pool.query(`
      SELECT meta->>'scan_id' as scan_id, COUNT(*) as count
      FROM artifacts 
      WHERE meta->>'scan_id' IS NOT NULL
      GROUP BY meta->>'scan_id'
      ORDER BY MAX(created_at) DESC
      LIMIT 5
    `);
    
    console.log('📊 Recent scans:');
    recentResult.rows.forEach(row => {
      console.log(`  - ${row.scan_id}: ${row.count} findings`);
    });
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await pool.end();
  }
}

testDatabase(); 