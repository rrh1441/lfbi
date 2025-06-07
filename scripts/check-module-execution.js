#!/usr/bin/env node

// Check if Shodan and SpiderFoot modules have executed recently
import { config } from 'dotenv';
import pg from 'pg';

config();

const { Pool } = pg;

async function checkModuleExecution() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔍 Checking recent module executions...\n');

    // Check Shodan execution
    const shodanQuery = `
      SELECT 
        type, 
        val_text, 
        severity,
        created,
        meta->>'scan_module' as module,
        meta->>'scan_id' as scan_id
      FROM artifacts 
      WHERE (
        type IN ('shodan_service', 'scan_error', 'scan_summary', 'module_execution')
        OR meta->>'scan_module' = 'shodan'
        OR val_text ILIKE '%shodan%'
      )
      AND created > NOW() - INTERVAL '1 hour'
      ORDER BY created DESC
      LIMIT 10
    `;

    const shodanResult = await pool.query(shodanQuery);
    console.log(`📊 Shodan artifacts (last hour): ${shodanResult.rows.length}`);
    if (shodanResult.rows.length > 0) {
      console.log('Recent Shodan activity:');
      shodanResult.rows.forEach(row => {
        console.log(`  - [${row.created.toISOString()}] ${row.type}: ${row.val_text.substring(0, 100)}`);
      });
    }

    // Check SpiderFoot execution
    const spiderFootQuery = `
      SELECT 
        type, 
        val_text, 
        severity,
        created,
        meta->>'scan_module' as module,
        meta->>'spiderfoot_type' as sf_type
      FROM artifacts 
      WHERE (
        meta->>'scan_module' = 'spiderfoot'
        OR meta->>'source_module' ILIKE '%spider%'
        OR val_text ILIKE '%spiderfoot%'
      )
      AND created > NOW() - INTERVAL '1 hour'
      ORDER BY created DESC
      LIMIT 10
    `;

    const spiderFootResult = await pool.query(spiderFootQuery);
    console.log(`\n📊 SpiderFoot artifacts (last hour): ${spiderFootResult.rows.length}`);
    if (spiderFootResult.rows.length > 0) {
      console.log('Recent SpiderFoot activity:');
      spiderFootResult.rows.forEach(row => {
        console.log(`  - [${row.created.toISOString()}] ${row.type}: ${row.val_text.substring(0, 100)}`);
      });
    }

    // Check for error artifacts
    const errorQuery = `
      SELECT 
        type, 
        val_text, 
        created,
        meta
      FROM artifacts 
      WHERE type IN ('scan_error', 'error')
      AND created > NOW() - INTERVAL '1 hour'
      AND (
        val_text ILIKE '%shodan%' 
        OR val_text ILIKE '%spiderfoot%'
        OR val_text ILIKE '%censys%'
      )
      ORDER BY created DESC
      LIMIT 5
    `;

    const errorResult = await pool.query(errorQuery);
    console.log(`\n⚠️  Module errors (last hour): ${errorResult.rows.length}`);
    if (errorResult.rows.length > 0) {
      console.log('Recent errors:');
      errorResult.rows.forEach(row => {
        console.log(`  - [${row.created.toISOString()}] ${row.val_text}`);
        if (row.meta?.error_type) {
          console.log(`    Error type: ${row.meta.error_type}`);
        }
      });
    }

    // Check latest scan activity
    const latestScanQuery = `
      SELECT DISTINCT
        meta->>'scan_id' as scan_id,
        COUNT(*) as artifact_count,
        MAX(created) as last_activity
      FROM artifacts
      WHERE meta->>'scan_id' IS NOT NULL
      AND created > NOW() - INTERVAL '1 hour'
      GROUP BY meta->>'scan_id'
      ORDER BY last_activity DESC
      LIMIT 5
    `;

    const latestScans = await pool.query(latestScanQuery);
    console.log(`\n📋 Recent scans (last hour): ${latestScans.rows.length}`);
    if (latestScans.rows.length > 0) {
      for (const scan of latestScans.rows) {
        console.log(`\n  Scan ID: ${scan.scan_id}`);
        console.log(`  Artifacts: ${scan.artifact_count}`);
        console.log(`  Last activity: ${scan.last_activity}`);
        
        // Check which modules ran for this scan
        const moduleQuery = `
          SELECT DISTINCT
            meta->>'scan_module' as module,
            COUNT(*) as count
          FROM artifacts
          WHERE meta->>'scan_id' = $1
          GROUP BY meta->>'scan_module'
        `;
        
        const modules = await pool.query(moduleQuery, [scan.scan_id]);
        console.log('  Modules executed:');
        modules.rows.forEach(mod => {
          if (mod.module) {
            console.log(`    - ${mod.module}: ${mod.count} artifacts`);
          }
        });
      }
    }

  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await pool.end();
  }
}

checkModuleExecution().catch(console.error);