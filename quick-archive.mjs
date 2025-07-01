#!/usr/bin/env node

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function quickArchive() {
  let client;
  try {
    client = await pool.connect();
    console.log('🚀 Starting database archival...');
    
    // Quick data assessment
    const artifacts = await client.query('SELECT COUNT(*) as count FROM artifacts');
    const findings = await client.query('SELECT COUNT(*) as count FROM findings');
    const scans = await client.query('SELECT COUNT(*) as count FROM scans_master');
    
    console.log(`📊 Data to archive: ${artifacts.rows[0].count} artifacts, ${findings.rows[0].count} findings, ${scans.rows[0].count} scans`);
    
    const totalRecords = parseInt(artifacts.rows[0].count) + parseInt(findings.rows[0].count) + parseInt(scans.rows[0].count);
    
    if (totalRecords === 0) {
      console.log('✅ No data found - database is already clean');
      return;
    }
    
    // Create archive tables
    console.log('📦 Creating archive tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS artifacts_archive (
        LIKE artifacts INCLUDING ALL,
        archived_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS findings_archive (
        LIKE findings INCLUDING ALL,
        archived_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS scans_master_archive (
        LIKE scans_master INCLUDING ALL,
        archived_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Copy data to archive
    console.log('💾 Copying data to archive...');
    
    if (parseInt(artifacts.rows[0].count) > 0) {
      await client.query(`INSERT INTO artifacts_archive SELECT *, NOW() FROM artifacts`);
      console.log(`✅ Archived ${artifacts.rows[0].count} artifacts`);
    }
    
    if (parseInt(findings.rows[0].count) > 0) {
      await client.query(`INSERT INTO findings_archive SELECT *, NOW() FROM findings`);
      console.log(`✅ Archived ${findings.rows[0].count} findings`);
    }
    
    if (parseInt(scans.rows[0].count) > 0) {
      await client.query(`INSERT INTO scans_master_archive SELECT *, NOW() FROM scans_master`);
      console.log(`✅ Archived ${scans.rows[0].count} scans`);
    }
    
    // Verify archive
    console.log('🔍 Verifying archive...');
    const verifyArtifacts = await client.query('SELECT COUNT(*) as count FROM artifacts_archive');
    const verifyFindings = await client.query('SELECT COUNT(*) as count FROM findings_archive');
    const verifyScans = await client.query('SELECT COUNT(*) as count FROM scans_master_archive');
    
    console.log(`📋 Archive verification: ${verifyArtifacts.rows[0].count} artifacts, ${verifyFindings.rows[0].count} findings, ${verifyScans.rows[0].count} scans`);
    
    // Clean production tables
    console.log('🧹 Cleaning production tables...');
    await client.query('TRUNCATE findings CASCADE');
    await client.query('TRUNCATE artifacts CASCADE');
    await client.query('TRUNCATE scans_master CASCADE');
    await client.query('DELETE FROM worker_instances');
    
    // Reset sequences
    await client.query('ALTER SEQUENCE IF EXISTS artifacts_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE IF EXISTS findings_id_seq RESTART WITH 1');
    
    console.log('🎉 ARCHIVAL COMPLETE!');
    console.log(`📊 Summary: ${totalRecords} total records archived`);
    console.log('💡 Archive tables: artifacts_archive, findings_archive, scans_master_archive');
    console.log('✨ Production database is now clean and ready for fresh scans');
    
  } catch (error) {
    console.error('❌ Archival failed:', error.message);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

quickArchive();