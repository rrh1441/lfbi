const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'EWLwYpuVkFIb',
  database: 'postgres',
  ssl: false
});

async function checkTruffleHog(scanId) {
  try {
    // Check TruffleHog artifacts
    const artifacts = await pool.query(`
      SELECT type, val_text, meta 
      FROM artifacts 
      WHERE meta->>'scan_id' = $1 
      AND meta->>'scan_module' = 'trufflehog'
    `, [scanId]);
    
    console.log(`TRUFFLEHOG ARTIFACTS: ${artifacts.rows.length}`);
    artifacts.rows.forEach(a => {
      console.log(`- ${a.type}: ${a.val_text.slice(0, 50)}...`);
    });
    
    // Check secret artifacts
    const secrets = await pool.query(`
      SELECT * FROM artifacts 
      WHERE meta->>'scan_id' = $1 
      AND type = 'secret'
    `, [scanId]);
    
    console.log(`SECRET ARTIFACTS: ${secrets.rows.length}`);
    secrets.rows.forEach(s => {
      console.log(`- Secret: ${s.val_text}`);
    });
    
    // Check web assets
    const webAssets = await pool.query(`
      SELECT meta 
      FROM artifacts 
      WHERE meta->>'scan_id' = $1 
      AND type = 'discovered_web_assets'
    `, [scanId]);
    
    console.log(`WEB ASSETS: ${webAssets.rows.length}`);
    if (webAssets.rows.length > 0) {
      const assets = webAssets.rows[0].meta.assets || [];
      console.log(`Assets found: ${assets.length}`);
      assets.slice(0, 5).forEach(a => {
        console.log(`- ${a.type}: ${a.url}`);
        if (a.content && a.content.length > 0) {
          console.log(`  Content preview: ${a.content.slice(0, 100)}...`);
        }
      });
    }
    
    // Check findings - findings table uses artifact_id to link to artifacts
    const findings = await pool.query(`
      SELECT f.finding_type, f.description 
      FROM findings f
      JOIN artifacts a ON f.artifact_id = a.id
      WHERE a.meta->>'scan_id' = $1 
      AND f.finding_type LIKE '%SECRET%'
    `, [scanId]);
    
    console.log(`SECRET FINDINGS: ${findings.rows.length}`);
    findings.rows.forEach(f => {
      console.log(`- ${f.finding_type}: ${f.description.slice(0, 100)}...`);
    });

    // Check if TruffleHog actually ran
    const truffleHogLogs = await pool.query(`
      SELECT val_text FROM artifacts 
      WHERE meta->>'scan_id' = $1 
      AND type = 'scan_summary'
      AND val_text LIKE '%TruffleHog%'
    `, [scanId]);
    
    console.log(`TRUFFLEHOG LOG: ${truffleHogLogs.rows.length > 0 ? truffleHogLogs.rows[0].val_text : 'No log found'}`);
    
    // Show JavaScript content that should contain secrets
    if (webAssets.rows.length > 0) {
      const jsAsset = webAssets.rows[0].meta.assets.find(a => a.type === 'javascript');
      if (jsAsset) {
        console.log(`\nJAVASCRIPT CONTENT:\n${jsAsset.content.slice(0, 500)}...`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

const scanId = process.argv[2];
if (!scanId) {
  console.error('Usage: node check-trufflehog.js <scanId>');
  process.exit(1);
}

checkTruffleHog(scanId);