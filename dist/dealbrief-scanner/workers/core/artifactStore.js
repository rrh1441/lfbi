import pg from 'pg';
import { log } from './logger.js';
const pool = new pg.Pool({
    connectionString: process.env.DB_URL
});
export async function insertArtifact(a) {
    const { type, val_text, severity = 'INFO', src_url, sha256, mime, meta } = a;
    const { rows } = await pool.query(`
    insert into artifacts(type,val_text,severity,src_url,sha256,mime,meta)
    values ($1,$2,$3,$4,$5,$6,$7)
    returning id
  `, [type, val_text, severity, src_url, sha256, mime, meta ?? {}]);
    log('[artifact]', type, val_text);
    return rows[0].id;
}
export async function insertFinding(artifactId, clazz, mitigation, summary) {
    await pool.query(`
    insert into findings(artifact_id,class,mitigation,summary)
    values ($1,$2,$3,$4)
  `, [artifactId, clazz, mitigation, summary]);
    log('[finding]', clazz, summary);
}
//# sourceMappingURL=artifactStore.js.map