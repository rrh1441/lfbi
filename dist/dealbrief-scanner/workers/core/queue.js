import { Redis } from "@upstash/redis";
import { log } from "./logger.js";
export class UpstashQueue {
    redis;
    constructor(url) {
        this.redis = Redis.fromEnv();
    }
    async enqueue(job) {
        await this.redis.lpush("scan.jobs", JSON.stringify(job));
        await this.redis.hset(`job:${job.id}`, {
            state: "queued",
            updated: Date.now().toString()
        });
        log("[queue] enqueued", job.id);
    }
    async nextJob(blockMs = 5000) {
        const jobData = await this.redis.rpop("scan.jobs");
        if (!jobData) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return null;
        }
        const job = JSON.parse(jobData);
        return [job.id, job];
    }
    async setStatus(id, state, extra = {}) {
        await this.redis.hset(`job:${id}`, {
            state,
            updated: Date.now().toString(),
            ...extra
        });
    }
    async status(id) {
        const obj = await this.redis.hgetall(`job:${id}`);
        if (!obj || Object.keys(obj).length === 0)
            return null;
        return obj;
    }
}
//# sourceMappingURL=queue.js.map