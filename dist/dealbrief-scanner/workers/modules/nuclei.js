import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
const exec = promisify(execFile);
const TEMPL_DIR = new URL('../templates', import.meta.url).pathname;
export async function runNuclei(job) {
    log('[nuclei]', job.domain);
    const { stdout } = await exec('nuclei', [
        '-u',
        job.domain,
        '-t',
        `${TEMPL_DIR}`,
        '-severity',
        'medium,high,critical',
        '-json'
    ]);
    stdout
        .trim()
        .split('\n')
        .filter(Boolean)
        .forEach(async (l) => {
        const o = JSON.parse(l);
        await insertArtifact({
            type: 'vuln',
            val_text: o.info.name,
            severity: o.info.severity.toUpperCase(),
            src_url: o.host,
            meta: o
        });
    });
}
//# sourceMappingURL=nuclei.js.map