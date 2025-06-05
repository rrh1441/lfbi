import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
const exec = promisify(execFile);
export async function runSpfDmarc(job) {
    log('[dmarc]', job.domain);
    const { stdout } = await exec('dig', [
        'txt',
        `_dmarc.${job.domain}`,
        '+short'
    ]);
    if (!stdout.trim()) {
        await insertArtifact({
            type: 'dmarc_missing',
            val_text: job.domain,
            severity: 'MEDIUM'
        });
    }
    else if (/p=none/i.test(stdout)) {
        await insertArtifact({
            type: 'dmarc_weak',
            val_text: job.domain,
            severity: 'LOW'
        });
    }
}
//# sourceMappingURL=spfDmarc.js.map