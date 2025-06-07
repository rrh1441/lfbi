import { pool } from '../../workers/core/artifactStore.js';

export interface ValidationResult {
  isValid: boolean;
  realFindings: number;
  errorMessage?: string;
  scanStatus: 'valid' | 'no_data' | 'scan_failed' | 'invalid';
}

export async function validateScanData(scanId: string): Promise<ValidationResult> {
  try {
    // Check if scan exists and completed
    const scanQuery = await pool.query(
      'SELECT COUNT(*) as count FROM artifacts WHERE meta->>\'scan_id\' = $1 AND meta->>\'error\' IS NULL',
      [scanId]
    );
    
    const realFindings = parseInt(scanQuery.rows[0].count);
    
    // Check for scan errors
    const errorQuery = await pool.query(
      'SELECT val_text FROM artifacts WHERE meta->>\'scan_id\' = $1 AND meta->>\'error\' = \'true\'',
      [scanId]
    );
    
    if (errorQuery.rows.length > 0) {
      return {
        isValid: false,
        realFindings: 0,
        errorMessage: `Scan failed: ${errorQuery.rows[0].val_text}`,
        scanStatus: 'scan_failed'
      };
    }
    
    if (realFindings === 0) {
      return {
        isValid: false,
        realFindings: 0,
        errorMessage: 'No real scan data found. Cannot generate report without verified findings.',
        scanStatus: 'no_data'
      };
    }
    
    
    return {
      isValid: true,
      realFindings: realFindings,
      scanStatus: 'valid'
    };
    
  } catch (error) {
    return {
      isValid: false,
      realFindings: 0,
      errorMessage: `Validation error: ${(error as Error).message}`,
      scanStatus: 'invalid'
    };
  }
}

export async function getVerifiedArtifacts(scanId: string) {
  // Return ALL artifacts that aren't errors
  const query = `
    SELECT * FROM artifacts 
    WHERE meta->>\'scan_id\' = $1 
    AND meta->>\'error\' IS NULL
    ORDER BY severity DESC, created_at DESC
  `;
  
  const result = await pool.query(query, [scanId]);
  return result.rows;
}

export async function getVerifiedFindings(scanId: string) {
  // Return ALL findings linked to non-error artifacts
  const query = `
    SELECT f.*, a.val_text as artifact_text, a.type as artifact_type 
    FROM findings f 
    JOIN artifacts a ON f.artifact_id = a.id 
    WHERE a.meta->>\'scan_id\' = $1
    AND a.meta->>\'error\' IS NULL
    ORDER BY f.created_at DESC
  `;
  
  const result = await pool.query(query, [scanId]);
  return result.rows;
} 