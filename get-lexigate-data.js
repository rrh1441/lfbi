import { config } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

config();

const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.DATABASE_URL
});

async function getLexigateScans() {
  try {
    console.log('🔍 Looking for Lexigate scan data...');
    
    // First, let's find all scans with Lexigate in the metadata
    const scanResult = await pool.query(`
      SELECT DISTINCT 
        meta->>'scan_id' as scan_id,
        meta->>'company' as company,
        COUNT(*) as artifact_count,
        MIN(created_at) as first_scan,
        MAX(created_at) as last_scan
      FROM artifacts 
      WHERE (meta->>'company' ILIKE '%lexigate%' 
         OR val_text ILIKE '%lexigate%' 
         OR src_url ILIKE '%lexigate%')
      AND meta->>'scan_id' IS NOT NULL
      GROUP BY meta->>'scan_id', meta->>'company'
      ORDER BY first_scan DESC
    `);
    
    console.log(`📊 Found ${scanResult.rows.length} Lexigate scans:`);
    scanResult.rows.forEach(scan => {
      console.log(`  - Scan ID: ${scan.scan_id}, Company: ${scan.company}, Artifacts: ${scan.artifact_count}, Date: ${scan.first_scan}`);
    });
    
    // For each scan, get the detailed data
    for (const scan of scanResult.rows) {
      console.log(`\n🔍 Getting details for scan ${scan.scan_id}...`);
      
      const artifactsResult = await pool.query(`
        SELECT 
          type, 
          val_text, 
          severity, 
          src_url, 
          meta,
          created_at
        FROM artifacts 
        WHERE meta->>'scan_id' = $1
        ORDER BY severity DESC, created_at DESC
      `, [scan.scan_id]);
      
      console.log(`📋 Scan ${scan.scan_id} Details:`);
      console.log(`Company: ${scan.company}`);
      console.log(`Total Artifacts: ${artifactsResult.rows.length}`);
      console.log(`Scan Date: ${scan.first_scan}`);
      
      // Group by severity
      const bySeverity = {};
      artifactsResult.rows.forEach(artifact => {
        const severity = artifact.severity || 'UNKNOWN';
        if (!bySeverity[severity]) bySeverity[severity] = [];
        bySeverity[severity].push(artifact);
      });
      
      console.log('\n📊 Findings by Severity:');
      Object.keys(bySeverity).forEach(severity => {
        console.log(`  ${severity}: ${bySeverity[severity].length} findings`);
      });
      
      console.log('\n📝 Sample Findings:');
      artifactsResult.rows.slice(0, 10).forEach((artifact, i) => {
        console.log(`  ${i + 1}. [${artifact.severity}] ${artifact.type}: ${artifact.val_text?.substring(0, 100)}...`);
        if (artifact.src_url) console.log(`      Source: ${artifact.src_url}`);
        if (artifact.meta?.scan_module) console.log(`      Module: ${artifact.meta.scan_module}`);
      });
      
      // Write full data to file
      const filename = `lexigate_scan_${scan.scan_id}_data.json`;
      const fullData = {
        scan_id: scan.scan_id,
        company: scan.company,
        scan_date: scan.first_scan,
        total_artifacts: artifactsResult.rows.length,
        artifacts: artifactsResult.rows
      };
      
      await import('fs').then(fs => {
        fs.writeFileSync(filename, JSON.stringify(fullData, null, 2));
        console.log(`💾 Full data saved to ${filename}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

getLexigateScans();