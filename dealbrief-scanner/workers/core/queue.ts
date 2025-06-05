import { Redis } from "@upstash/redis";
import { log } from "./logger.js";

export interface ScanJob {
  id: string;
  companyName: string;
  domain: string;
  ownerName: string;
  userId: string;
  enqueuedAt: number;
}

export interface JobStatus {
  id: string;
  state: "queued" | "processing" | "done" | "error";
  updated: number;
  resultUrl?: string;
  error?: string;
}

export class UpstashQueue {
  redis: Redis;

  constructor(url: string) {
    this.redis = Redis.fromEnv();
  }

  async enqueue(job: ScanJob): Promise<void> {
    await this.redis.lpush("scan.jobs", JSON.stringify(job));
    await this.redis.hset(`job:${job.id}`, {
      state: "queued",
      updated: Date.now().toString()
    });
    log("[queue] enqueued", job.id);
  }

  async nextJob(blockMs = 5000): Promise<[string, ScanJob] | null> {
    const jobData = await this.redis.rpop("scan.jobs");
    if (!jobData) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return null;
    }
    const job = JSON.parse(jobData as string) as ScanJob;
    return [job.id, job];
  }

  async setStatus(id: string, state: JobStatus["state"], extra: Record<string, any> = {}) {
    await this.redis.hset(`job:${id}`, {
      state,
      updated: Date.now().toString(),
      ...extra
    });
  }

  async status(id: string): Promise<JobStatus | null> {
    const obj = await this.redis.hgetall(`job:${id}`);
    if (!obj || Object.keys(obj).length === 0) return null;
    return obj as unknown as JobStatus;
  }
}
