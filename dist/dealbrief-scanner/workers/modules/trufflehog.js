import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
const exec = promisify(execFile);
const GITHUB_RE = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)(\.git)?$/i;
async function scanGit(url) {
    const { stdout } = await exec('trufflehog', ['git', url, '--json']);
    const lines = stdout.trim().split('\n');
    for (const line of lines) {
        const obj = JSON.parse(line);
        await insertArtifact({
            type: 'secret',
            val_text: obj.SourceMetadata.Data,
            severity: 'HIGH',
            src_url: url,
            meta: { detector: obj.DecoderName }
        });
    }
}
export async function runTrufflehog(job) {
    log('[trufflehog]', job.domain);
    // scan HTTP response for secrets
    await exec('trufflehog', ['http', '--url', `https://${job.domain}`]);
    // parse links.json from SpiderFoot
    try {
        const links = JSON.parse(await fs.readFile('/tmp/spiderfoot-links.json', 'utf8'));
        for (const l of links)
            if (GITHUB_RE.test(l))
                await scanGit(l);
    }
    catch { }
}
//# sourceMappingURL=trufflehog.js.map