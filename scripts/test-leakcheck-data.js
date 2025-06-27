#!/usr/bin/env node

/**
 * LeakCheck Data Structure Test Script
 * 
 * This script tests various queries against the database to understand
 * how LeakCheck data is structured and stored in the artifacts table.
 * 
 * Usage: node test-leakcheck-data.js
 * 
 * Requirements:
 * - DATABASE_URL environment variable set
 * - Node.js with ES modules support
 */

import { pool } from '../apps/workers/core/artifactStore.js';

async function testLeakCheckDataStructure() {
  try {
    console.log('🔍 Testing LeakCheck data structure in database...\n');

    // Test 1: Check database connectivity
    console.log('1. Testing database connection...');
    const connectionTest = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Database connected successfully');
    console.log(`   Current time: ${connectionTest.rows[0].current_time}`);
    console.log(`   PostgreSQL version: ${connectionTest.rows[0].pg_version.split(' ')[0]}\n`);

    // Test 2: Check if artifacts table exists and get schema
    console.log('2. Checking artifacts table structure...');
    const schemaQuery = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'artifacts' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);
    
    console.log('✅ Artifacts table schema:');
    schemaQuery.rows.forEach(row => {
      console.log(`   ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
    });
    console.log('');

    // Test 3: Search for any LeakCheck-related artifacts
    console.log('3. Searching for LeakCheck-related artifacts...');
    const leakcheckSearch = await pool.query(`
      SELECT type, COUNT(*) as count, 
             array_agg(DISTINCT severity) as severities,
             MIN(created_at) as first_seen,
             MAX(created_at) as last_seen
      FROM artifacts 
      WHERE type ILIKE '%leak%' 
         OR type ILIKE '%breach%' 
         OR type ILIKE '%credential%'
         OR type ILIKE '%password%'
         OR val_text ILIKE '%leakcheck%'
         OR val_text ILIKE '%breach%'
         OR val_text ILIKE '%credential%'
      GROUP BY type
      ORDER BY count DESC, type
    `);

    if (leakcheckSearch.rows.length > 0) {
      console.log('✅ Found LeakCheck-related artifacts:');
      leakcheckSearch.rows.forEach(row => {
        console.log(`   Type: ${row.type}`);
        console.log(`   Count: ${row.count}`);
        console.log(`   Severities: ${row.severities.join(', ')}`);
        console.log(`   Date range: ${row.first_seen} to ${row.last_seen}`);
        console.log('');
      });
    } else {
      console.log('ℹ️  No LeakCheck-related artifacts found yet\n');
    }

    // Test 4: Check for artifacts with structured metadata that might contain LeakCheck data
    console.log('4. Analyzing artifact metadata structure...');
    const metaAnalysis = await pool.query(`
      SELECT type, 
             jsonb_object_keys(meta || '{}') as meta_keys,
             COUNT(*) as occurrences
      FROM artifacts 
      WHERE meta IS NOT NULL 
        AND meta != '{}'
      GROUP BY type, jsonb_object_keys(meta || '{}')
      HAVING COUNT(*) > 1
      ORDER BY type, occurrences DESC
    `);

    if (metaAnalysis.rows.length > 0) {
      console.log('✅ Found artifacts with metadata structure:');
      const groupedByType = {};
      metaAnalysis.rows.forEach(row => {
        if (!groupedByType[row.type]) {
          groupedByType[row.type] = [];
        }
        groupedByType[row.type].push(`${row.meta_keys} (${row.occurrences})`);
      });

      Object.entries(groupedByType).forEach(([type, keys]) => {
        console.log(`   Type: ${type}`);
        console.log(`   Metadata keys: ${keys.join(', ')}`);
        console.log('');
      });
    } else {
      console.log('ℹ️  No artifacts with structured metadata found\n');
    }

    // Test 5: Sample recent artifacts to understand current data structure
    console.log('5. Sampling recent artifacts to understand data patterns...');
    const recentSample = await pool.query(`
      SELECT type, val_text, severity, 
             CASE 
               WHEN meta IS NOT NULL THEN jsonb_pretty(meta)
               ELSE 'No metadata'
             END as formatted_meta,
             created_at
      FROM artifacts 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    console.log('✅ Recent artifact samples:');
    recentSample.rows.forEach((row, index) => {
      console.log(`   Sample ${index + 1}:`);
      console.log(`   Type: ${row.type}`);
      console.log(`   Severity: ${row.severity}`);
      console.log(`   Text: ${row.val_text.substring(0, 100)}${row.val_text.length > 100 ? '...' : ''}`);
      console.log(`   Metadata: ${row.formatted_meta.substring(0, 200)}${row.formatted_meta.length > 200 ? '...' : ''}`);
      console.log(`   Created: ${row.created_at}`);
      console.log('');
    });

    // Test 6: Test a potential LeakCheck data insert pattern
    console.log('6. Testing LeakCheck data insert pattern...');
    
    // Sample LeakCheck data structure based on common patterns
    const sampleLeakCheckData = {
      type: 'credential_exposure',
      val_text: 'Found 3 credential exposures for example.com domain',
      severity: 'HIGH',
      meta: {
        scan_id: 'test-leakcheck-' + Date.now(),
        scan_module: 'leakCheckCredentials', 
        domain: 'example.com',
        exposures: [
          {
            email: 'user@example.com',
            source: 'Collection #1',
            date_found: '2024-01-15',
            breach_name: 'Example Breach 2024'
          },
          {
            email: 'admin@example.com', 
            source: 'LinkedIn Dump',
            date_found: '2024-02-20',
            breach_name: 'Professional Network Leak'
          }
        ],
        total_exposures: 3,
        unique_emails: 2,
        data_sources: ['Collection #1', 'LinkedIn Dump'],
        risk_score: 8.5
      }
    };

    // Import the insertArtifact function
    const { insertArtifact } = await import('../apps/workers/core/artifactStore.js');
    
    const testArtifactId = await insertArtifact(sampleLeakCheckData);
    console.log(`✅ Successfully inserted test LeakCheck artifact with ID: ${testArtifactId}`);

    // Verify the inserted data
    const verifyInsert = await pool.query(`
      SELECT type, val_text, severity, jsonb_pretty(meta) as formatted_meta, created_at
      FROM artifacts 
      WHERE id = $1
    `, [testArtifactId]);

    console.log('✅ Verified inserted data:');
    const inserted = verifyInsert.rows[0];
    console.log(`   Type: ${inserted.type}`);
    console.log(`   Text: ${inserted.val_text}`);
    console.log(`   Severity: ${inserted.severity}`);
    console.log(`   Metadata structure verified: ${inserted.formatted_meta ? 'YES' : 'NO'}`);
    console.log('');

    // Test 7: Query patterns for LeakCheck data retrieval
    console.log('7. Testing LeakCheck data retrieval patterns...');
    
    // Pattern 1: Get all credential exposures for a domain
    const domainQuery = await pool.query(`
      SELECT id, val_text, severity, 
             meta->>'total_exposures' as total_exposures,
             meta->>'unique_emails' as unique_emails,
             meta->>'risk_score' as risk_score,
             created_at
      FROM artifacts 
      WHERE type = 'credential_exposure' 
        AND meta->>'domain' = $1
      ORDER BY created_at DESC
    `, ['example.com']);

    console.log('✅ Domain-specific credential exposure query:');
    domainQuery.rows.forEach(row => {
      console.log(`   ID: ${row.id}, Exposures: ${row.total_exposures}, Risk: ${row.risk_score}`);
    });

    // Pattern 2: Get breach source analysis
    const sourceAnalysis = await pool.query(`
      SELECT 
        unnest(array(SELECT jsonb_array_elements_text(meta->'data_sources'))) as source,
        COUNT(*) as frequency
      FROM artifacts 
      WHERE type = 'credential_exposure' 
        AND meta ? 'data_sources'
      GROUP BY unnest(array(SELECT jsonb_array_elements_text(meta->'data_sources')))
      ORDER BY frequency DESC
    `);

    console.log('✅ Breach source frequency analysis:');
    sourceAnalysis.rows.forEach(row => {
      console.log(`   Source: ${row.source}, Frequency: ${row.frequency}`);
    });

    // Pattern 3: High-risk exposure summary
    const riskSummary = await pool.query(`
      SELECT 
        COUNT(*) as total_artifacts,
        AVG((meta->>'risk_score')::numeric) as avg_risk_score,
        SUM((meta->>'total_exposures')::integer) as total_exposures,
        COUNT(DISTINCT meta->>'domain') as unique_domains
      FROM artifacts 
      WHERE type = 'credential_exposure' 
        AND meta ? 'risk_score'
    `);

    console.log('✅ Risk summary analysis:');
    if (riskSummary.rows[0].total_artifacts > 0) {
      const summary = riskSummary.rows[0];
      console.log(`   Total artifacts: ${summary.total_artifacts}`);
      console.log(`   Average risk score: ${parseFloat(summary.avg_risk_score).toFixed(2)}`);
      console.log(`   Total exposures: ${summary.total_exposures}`);
      console.log(`   Unique domains: ${summary.unique_domains}`);
    } else {
      console.log('   No risk data available yet');
    }

    console.log('\n🎉 LeakCheck data structure test completed successfully!');
    console.log('\n📋 Summary of findings:');
    console.log('   ✅ Database connection working');
    console.log('   ✅ Artifacts table structure confirmed');
    console.log('   ✅ JSON metadata storage working');
    console.log('   ✅ LeakCheck data insert pattern validated');
    console.log('   ✅ Query patterns for data retrieval tested');
    console.log('\n💡 Next steps:');
    console.log('   - Implement the actual LeakCheck module using these patterns');
    console.log('   - Use the tested metadata structure for storing breach data');
    console.log('   - Leverage the query patterns for data analysis and reporting');

  } catch (error) {
    console.error('❌ LeakCheck data structure test failed:', error);
    
    // Provide specific guidance based on error type
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - Ensure DATABASE_URL environment variable is set');
      console.log('   - Check if PostgreSQL database is running');
      console.log('   - Verify database connection details');
    } else if (error.code === '42P01') {
      console.log('\n💡 Database setup needed:');
      console.log('   - Run: node scripts/init-db.js');
      console.log('   - This will create the required tables');
    }
  } finally {
    await pool.end();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testLeakCheckDataStructure();
}

export { testLeakCheckDataStructure };