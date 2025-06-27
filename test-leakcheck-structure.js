#!/usr/bin/env node

const { Pool } = require('pg');

async function testLeakCheckStructure() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DB_URL
  });

  try {
    console.log('🔍 Testing LeakCheck data structure...\n');

    // Check if we have any breach directory data
    const breachQuery = `
      SELECT 
        COUNT(*) as total_records,
        type,
        meta->'breach_analysis'->'leakcheck_total' as leakcheck_total,
        meta->'breach_analysis'->'combined_total' as combined_total
      FROM artifacts 
      WHERE type = 'breach_directory_summary'
      GROUP BY type, meta->'breach_analysis'->'leakcheck_total', meta->'breach_analysis'->'combined_total'
      ORDER BY total_records DESC;
    `;

    const breachResult = await pool.query(breachQuery);
    
    if (breachResult.rows.length === 0) {
      console.log('❌ No breach_directory_summary records found');
      console.log('   Need to run breach scans first to get LeakCheck data\n');
      return;
    }

    console.log('✅ Found breach directory records:');
    breachResult.rows.forEach(row => {
      console.log(`   - ${row.total_records} records with ${row.leakcheck_total || 0} LeakCheck results`);
    });
    console.log('');

    // Get a sample record to see the structure
    const sampleQuery = `
      SELECT 
        meta->'breach_analysis' as breach_analysis,
        created_at
      FROM artifacts 
      WHERE type = 'breach_directory_summary' 
        AND meta->'breach_analysis'->'leakcheck_total' > 0
      ORDER BY created_at DESC 
      LIMIT 1;
    `;

    const sampleResult = await pool.query(sampleQuery);
    
    if (sampleResult.rows.length > 0) {
      console.log('📊 Sample LeakCheck data structure:');
      console.log(JSON.stringify(sampleResult.rows[0].breach_analysis, null, 2));
      console.log('');

      // Try to extract usernames and sources
      const extractQuery = `
        SELECT 
          jsonb_array_elements_text(meta->'breach_analysis'->'sample_usernames') as username,
          jsonb_array_elements_text(meta->'breach_analysis'->'leakcheck_sources') as breach_source,
          meta->>'domain' as company_domain
        FROM artifacts 
        WHERE type = 'breach_directory_summary'
          AND meta->'breach_analysis'->'leakcheck_total' > 0
        LIMIT 10;
      `;

      const extractResult = await pool.query(extractQuery);
      
      if (extractResult.rows.length > 0) {
        console.log('👥 Sample compromised employee data:');
        extractResult.rows.forEach(row => {
          console.log(`   - Username: ${row.username}`);
          console.log(`     Source: ${row.breach_source}`);
          console.log(`     Domain: ${row.company_domain}`);
          console.log('');
        });
      } else {
        console.log('❌ Could not extract username/source data from current structure');
      }
    } else {
      console.log('❌ No records with LeakCheck data found');
      console.log('   Records exist but no LeakCheck results stored');
    }

  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check DATABASE_URL environment variable');
    console.log('   2. Verify database is accessible');
    console.log('   3. Ensure artifacts table exists');
  } finally {
    await pool.end();
  }
}

testLeakCheckStructure().catch(console.error);