import { pool } from '../../workers/core/artifactStore.js';
export async function validateScanData(scanId) {
    try {
        // Check if scan exists and completed
        const scanQuery = await pool.query('SELECT COUNT(*) as count FROM artifacts WHERE meta->>\'scan_id\' = $1 AND meta->>\'error\' IS NULL', [scanId]);
        const realFindings = parseInt(scanQuery.rows[0].count);
        // Check for scan errors
        const errorQuery = await pool.query('SELECT val_text FROM artifacts WHERE meta->>\'scan_id\' = $1 AND meta->>\'error\' = \'true\'', [scanId]);
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
        // Validate that findings are from real sources (not simulated)
        const sourceQuery = await pool.query(`SELECT COUNT(*) as shodan_count 
       FROM artifacts 
       WHERE meta->>\'scan_id\' = $1 
       AND meta->>\'scan_module\' = 'shodan'
       AND src_url IS NOT NULL`, [scanId]);
        const realSources = parseInt(sourceQuery.rows[0].shodan_count);
        if (realSources === 0) {
            return {
                isValid: false,
                realFindings: realFindings,
                errorMessage: 'No verified external sources found. All findings appear to be simulated.',
                scanStatus: 'invalid'
            };
        }
        return {
            isValid: true,
            realFindings: realFindings,
            scanStatus: 'valid'
        };
    }
    catch (error) {
        return {
            isValid: false,
            realFindings: 0,
            errorMessage: `Validation error: ${error.message}`,
            scanStatus: 'invalid'
        };
    }
}
export async function getVerifiedArtifacts(scanId) {
    // Only return artifacts with verified external sources
    const query = `
    SELECT * FROM artifacts 
    WHERE meta->>\'scan_id\' = $1 
    AND meta->>\'error\' IS NULL
    AND (
      src_url IS NOT NULL 
      OR meta->>\'scan_module\' = 'shodan'
    )
    ORDER BY severity DESC, created_at DESC
  `;
    const result = await pool.query(query, [scanId]);
    return result.rows;
}
export async function getVerifiedFindings(scanId) {
    // Only return findings linked to verified artifacts
    const query = `
    SELECT f.*, a.val_text as artifact_text, a.type as artifact_type 
    FROM findings f 
    JOIN artifacts a ON f.artifact_id = a.id 
    WHERE a.meta->>\'scan_id\' = $1
    AND a.meta->>\'error\' IS NULL
    AND (
      a.src_url IS NOT NULL 
      OR a.meta->>\'scan_module\' = 'shodan'
    )
    ORDER BY f.created_at DESC
  `;
    const result = await pool.query(query, [scanId]);
    return result.rows;
}
//# sourceMappingURL=reportValidator.js.map