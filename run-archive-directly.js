// Quick database archival for production
const { execSync } = require('child_process');

try {
  console.log('Running database archival via fly ssh...');
  
  const result = execSync(`
    fly ssh console -a dealbrief-scanner --command 'node -p "
    const pg = require(\\"pg\\");
    const pool = new pg.Pool({connectionString: process.env.DATABASE_URL});
    
    (async () => {
      try {
        const client = await pool.connect();
        console.log(\\"🚀 Starting archival...\\");
        
        // Check current data
        const artifacts = await client.query(\\"SELECT COUNT(*) as count FROM artifacts\\");
        const findings = await client.query(\\"SELECT COUNT(*) as count FROM findings\\");
        const scans = await client.query(\\"SELECT COUNT(*) as count FROM scans_master\\");
        
        const artCount = parseInt(artifacts.rows[0].count);
        const findCount = parseInt(findings.rows[0].count);
        const scanCount = parseInt(scans.rows[0].count);
        
        console.log(\`📊 Current data: \${artCount} artifacts, \${findCount} findings, \${scanCount} scans\`);
        
        if (artCount === 0 && findCount === 0 && scanCount === 0) {
          console.log(\\"✅ Database is already clean\\");
          return;
        }
        
        // Create archive tables and copy data
        console.log(\\"📦 Creating archives...\\");
        await client.query(\\"CREATE TABLE IF NOT EXISTS artifacts_archive AS SELECT *, NOW() as archived_at FROM artifacts\\");
        await client.query(\\"CREATE TABLE IF NOT EXISTS findings_archive AS SELECT *, NOW() as archived_at FROM findings\\");
        await client.query(\\"CREATE TABLE IF NOT EXISTS scans_master_archive AS SELECT *, NOW() as archived_at FROM scans_master\\");
        
        // Clean production tables
        console.log(\\"🧹 Cleaning production tables...\\");
        await client.query(\\"TRUNCATE findings CASCADE\\");
        await client.query(\\"TRUNCATE artifacts CASCADE\\");
        await client.query(\\"TRUNCATE scans_master CASCADE\\");
        await client.query(\\"DELETE FROM worker_instances\\");
        
        // Reset sequences
        await client.query(\\"ALTER SEQUENCE IF EXISTS artifacts_id_seq RESTART WITH 1\\");
        await client.query(\\"ALTER SEQUENCE IF EXISTS findings_id_seq RESTART WITH 1\\");
        
        console.log(\\"🎉 ARCHIVAL COMPLETE!\\");
        console.log(\`📊 Archived: \${artCount} artifacts, \${findCount} findings, \${scanCount} scans\`);
        console.log(\\"💡 Archive tables: artifacts_archive, findings_archive, scans_master_archive\\");
        console.log(\\"✨ Production database is now clean and ready for fresh scans\\");
        
        client.release();
      } catch (error) {
        console.error(\\"❌ Error:\\", error.message);
      } finally {
        await pool.end();
      }
    })();
    "'
  `, { encoding: 'utf8', stdio: 'inherit' });
  
  console.log('✅ Archival command executed');
} catch (error) {
  console.error('❌ Failed to run archival:', error.message);
}