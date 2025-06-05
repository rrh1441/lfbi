import { Redis } from '@upstash/redis';
export class UpstashQueue {
    redis;
    constructor(url) {
        // Parse the Redis URL to extract token and URL for Upstash
        if (url.includes('@')) {
            // Format: redis://username:token@host:port
            const urlObj = new URL(url);
            const token = urlObj.password;
            const restUrl = `https://${urlObj.hostname}`;
            this.redis = new Redis({
                url: restUrl,
                token: token
            });
        }
        else {
            // Fallback to environment variables
            this.redis = Redis.fromEnv();
        }
    }
    async addJob(id, job) {
        await this.redis.lpush('scan.jobs', JSON.stringify({ ...job, id }));
        await this.redis.hset(`job:${id}`, {
            state: 'queued',
            updated: Date.now().toString(),
            message: 'Scan queued and waiting for processing'
        });
        console.log('[queue] enqueued', id);
    }
    async getNextJob() {
        try {
            const jobData = await this.redis.rpop('scan.jobs');
            if (!jobData) {
                return null;
            }
            console.log('[queue] Raw job data from Redis:', jobData, 'Type:', typeof jobData);
            // Handle different data types from Redis
            let jobString;
            if (typeof jobData === 'string') {
                jobString = jobData;
            }
            else if (typeof jobData === 'object') {
                jobString = JSON.stringify(jobData);
            }
            else {
                jobString = String(jobData);
            }
            console.log('[queue] Job string to parse:', jobString);
            // Additional safety check - if it doesn't look like JSON, skip it
            if (!jobString.trim().startsWith('{') && !jobString.trim().startsWith('[')) {
                console.log('[queue] Invalid job data format, skipping:', jobString);
                return null;
            }
            const job = JSON.parse(jobString);
            console.log('[queue] Parsed job:', job);
            return job;
        }
        catch (error) {
            console.error('[queue] Error in getNextJob:', error);
            console.error('[queue] Failed to parse job data, skipping...');
            return null;
        }
    }
    async updateStatus(id, state, message, resultUrl) {
        const statusUpdate = {
            state,
            updated: Date.now().toString()
        };
        if (message)
            statusUpdate.message = message;
        if (resultUrl)
            statusUpdate.resultUrl = resultUrl;
        await this.redis.hset(`job:${id}`, statusUpdate);
        console.log(`[queue] Updated job ${id} status: ${state}${message ? ` - ${message}` : ''}`);
    }
    async getStatus(id) {
        const obj = await this.redis.hgetall(`job:${id}`);
        if (!obj || Object.keys(obj).length === 0)
            return null;
        return obj;
    }
    // Legacy methods for backwards compatibility
    async nextJob(blockMs = 5000) {
        const job = await this.getNextJob();
        if (!job)
            return null;
        return [job.id, job];
    }
    async setStatus(id, state, extra = {}) {
        await this.redis.hset(`job:${id}`, {
            state,
            updated: Date.now().toString(),
            ...extra
        });
    }
}
//# sourceMappingURL=queue.js.map