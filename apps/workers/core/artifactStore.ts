import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DB_URL
});

export interface ArtifactInput {
  type: string;
  val_text: string;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  src_url?: string;
  sha256?: string;
  mime?: string;
  meta?: Record<string, any>;
}

export interface Finding {
  artifact_id: number;
  finding_type: string;
  recommendation: string;
  description: string;
}

// Insert artifact into database and return ID
export async function insertArtifact(artifact: ArtifactInput): Promise<number> {
  try {
    const result = await pool.query(
      `INSERT INTO artifacts (type, val_text, severity, src_url, sha256, mime, meta, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
       RETURNING id`,
      [
        artifact.type,
        artifact.val_text,
        artifact.severity,
        artifact.src_url || null,
        artifact.sha256 || null,
        artifact.mime || null,
        artifact.meta ? JSON.stringify(artifact.meta) : null
      ]
    );
    
    const artifactId = result.rows[0].id;
    
    console.log(`[artifactStore] Inserted ${artifact.type} artifact: ${artifact.val_text.slice(0, 60)}...`);
    return artifactId;
  } catch (error) {
    console.error('[artifactStore] Insert artifact error:', error);
    throw error;
  }
}

// Insert finding linked to an artifact
export async function insertFinding(
  artifactId: number, 
  findingType: string, 
  recommendation: string, 
  description: string
): Promise<number> {
  try {
    const result = await pool.query(
      `INSERT INTO findings (artifact_id, finding_type, recommendation, description, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING id`,
      [artifactId, findingType, recommendation, description]
    );
    
    console.log(`[artifactStore] Inserted finding ${findingType} for artifact ${artifactId}`);
    return result.rows[0].id;
  } catch (error) {
    console.error('[artifactStore] Insert finding error:', error);
    throw error;
  }
}

// Initialize database tables if they don't exist
export async function initializeDatabase(): Promise<void> {
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

    // Create scans_master table for tracking scan status
    await pool.query(`
      CREATE TABLE IF NOT EXISTS scans_master (
        scan_id VARCHAR(255) PRIMARY KEY,
        company_name VARCHAR(255),
        domain VARCHAR(255),
        status VARCHAR(50) NOT NULL DEFAULT 'queued',
        progress INTEGER DEFAULT 0,
        current_module VARCHAR(100),
        total_modules INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP WITH TIME ZONE,
        error_message TEXT,
        total_findings_count INTEGER DEFAULT 0,
        max_severity VARCHAR(20)
      )
    `);

    // Create trigger function for updating updated_at
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
         NEW.updated_at = NOW();
         RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create trigger for scans_master
    await pool.query(`
      DROP TRIGGER IF EXISTS update_scans_master_updated_at ON scans_master;
      CREATE TRIGGER update_scans_master_updated_at
      BEFORE UPDATE ON scans_master
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);

    // Create indexes for performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_artifacts_type ON artifacts(type);
      CREATE INDEX IF NOT EXISTS idx_artifacts_severity ON artifacts(severity);
      CREATE INDEX IF NOT EXISTS idx_artifacts_created_at ON artifacts(created_at);
      CREATE INDEX IF NOT EXISTS idx_artifacts_meta_scan_id ON artifacts((meta->>'scan_id'));
      CREATE INDEX IF NOT EXISTS idx_findings_artifact_id ON findings(artifact_id);
      CREATE INDEX IF NOT EXISTS idx_findings_type ON findings(finding_type);
      CREATE INDEX IF NOT EXISTS idx_findings_created_at ON findings(created_at);
      CREATE INDEX IF NOT EXISTS idx_scans_master_updated_at ON scans_master(updated_at);
      CREATE INDEX IF NOT EXISTS idx_scans_master_status ON scans_master(status);
    `);

    console.log('[artifactStore] Database initialized successfully');
  } catch (error) {
    console.error('[artifactStore] Database initialization error:', error);
    throw error;
  }
} 