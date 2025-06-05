import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { insertArtifact } from '../core/artifactStore.js';
import { log } from '../core/logger.js';
const exec = promisify(execFile);
const TARGET_MODULES = 'sfp_crtsh,sfp_censys,sfp_sublist3r,sfp_shodan,sfp_chaos,sfp_r7_dns,' +
    'sfp_haveibeenpwnd,sfp_searchcode,sfp_psbdmp,sfp_skymem,sfp_sslcert,sfp_nuclei';
export async function runSpiderFoot(job) {
    const { domain } = job;
    log('[SpiderFoot]', domain);
    const out = await exec('sf', [
        '-q',
        domain,
        '-m',
        TARGET_MODULES,
        '-F',
        'json'
    ]);
    const result = JSON.parse(out.stdout);
    for (const row of result) {
        switch (row.type) {
            case 'AFFILIATE_INTERNET_NAME':
                await insertArtifact({
                    type: 'subdomain',
                    val_text: row.data,
                    severity: 'INFO'
                });
                break;
            case 'IP_ADDRESS':
                await insertArtifact({
                    type: 'ip',
                    val_text: row.data,
                    severity: 'INFO'
                });
                break;
            case 'LEAKSITE_CONTENT':
                await insertArtifact({
                    type: 'breach',
                    val_text: row.data,
                    severity: 'HIGH',
                    src_url: row.url
                });
                break;
            // …handle other SpiderFoot types as needed
        }
    }
    // persist raw for audit
    await fs.writeFile(`/tmp/spiderfoot-${Date.now()}.json`, out.stdout);
}
//# sourceMappingURL=spiderFoot.js.map