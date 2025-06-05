import { Pool } from 'pg';
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DB_URL
});
// Insert artifact into database and return ID
export async function insertArtifact(artifact) {
    try {
        const result = await pool.query(`INSERT INTO artifacts (type, val_text, severity, src_url, sha256, mime, meta, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
       RETURNING id`, [
            artifact.type,
            artifact.val_text,
            artifact.severity,
            artifact.src_url || null,
            artifact.sha256 || null,
            artifact.mime || null,
            artifact.meta ? JSON.stringify(artifact.meta) : null
        ]);
        console.log(`[artifactStore] Inserted ${artifact.type} artifact: ${artifact.val_text.slice(0, 60)}...`);
        return result.rows[0].id;
    }
    catch (error) {
        console.error('[artifactStore] Insert artifact error:', error);
        throw error;
    }
}
// Insert finding linked to an artifact
export async function insertFinding(artifactId, findingType, recommendation, description) {
    try {
        const result = await pool.query(`INSERT INTO findings (artifact_id, finding_type, recommendation, description, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING id`, [artifactId, findingType, recommendation, description]);
        console.log(`[artifactStore] Inserted finding ${findingType} for artifact ${artifactId}`);
        return result.rows[0].id;
    }
    catch (error) {
        console.error('[artifactStore] Insert finding error:', error);
        throw error;
    }
}
// Initialize database tables if they don't exist
export async function initializeDatabase() {
    try {
        // Create artifacts table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS artifacts (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        val_text TEXT NOT NULL,
        severity VARCHAR(20) NOT NULL,
        src_url TEXT,
        sha256 VARCHAR(64),
        mime VARCHAR(100),
        meta JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
        // Create findings table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS findings (
        id SERIAL PRIMARY KEY,
        artifact_id INTEGER NOT NULL REFERENCES artifacts(id) ON DELETE CASCADE,
        finding_type VARCHAR(50) NOT NULL,
        recommendation TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
        // Create indexes for performance
        await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_artifacts_type ON artifacts(type);
      CREATE INDEX IF NOT EXISTS idx_artifacts_severity ON artifacts(severity);
      CREATE INDEX IF NOT EXISTS idx_artifacts_created_at ON artifacts(created_at);
      CREATE INDEX IF NOT EXISTS idx_findings_artifact_id ON findings(artifact_id);
      CREATE INDEX IF NOT EXISTS idx_findings_type ON findings(finding_type);
    `);
        console.log('[artifactStore] Database initialized successfully');
    }
    catch (error) {
        console.error('[artifactStore] Database initialization error:', error);
        throw error;
    }
}
//# sourceMappingURL=artifactStore.js.map