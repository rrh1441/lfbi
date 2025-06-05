import { config } from 'dotenv';
import { UpstashQueue } from './core/queue.js';
import { log } from './core/logger.js';
import { runFileHunt } from './modules/fileHunt.js';
import { runSpiderFoot } from './modules/spiderFoot.js';
import { runDnsTwist } from './modules/dnsTwist.js';
import { runSpfDmarc } from './modules/spfDmarc.js';
import { runTlsScan } from './modules/tlsScan.js';
import { runTrufflehog } from './modules/trufflehog.js';
import { runNuclei } from './modules/nuclei.js';
import { runDbPortScan } from './modules/dbPortScan.js';
config();
const queue = new UpstashQueue(process.env.REDIS_URL);
async function processJob(jobId, job) {
    log('[job] start', jobId, job.companyName);
    try {
        await runFileHunt(job);
        await runSpiderFoot(job);
        await runDnsTwist(job);
        await runSpfDmarc(job);
        await runTlsScan(job);
        await runTrufflehog(job);
        await runNuclei(job);
        await runDbPortScan(job);
        await queue.setStatus(job.id, 'done', { resultUrl: `/storage/${job.id}.pdf` });
        log('[job] done', jobId);
    }
    catch (err) {
        log('[job] error', jobId, err.message);
        await queue.setStatus(job.id, 'error', { error: err.message });
    }
}
(async () => {
    while (true) {
        const next = await queue.nextJob();
        if (!next)
            continue;
        const [redisId, job] = next;
        await queue.setStatus(job.id, 'processing');
        await processJob(job.id, job);
        // acknowledge
        await queue.redis.xack('scan.jobs', '0', redisId);
    }
})();
//# sourceMappingURL=worker.js.map