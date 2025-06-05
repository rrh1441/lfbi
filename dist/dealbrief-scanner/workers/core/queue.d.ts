import { Redis } from "@upstash/redis";
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
export declare class UpstashQueue {
    redis: Redis;
    constructor(url: string);
    enqueue(job: ScanJob): Promise<void>;
    nextJob(blockMs?: number): Promise<[string, ScanJob] | null>;
    setStatus(id: string, state: JobStatus["state"], extra?: Record<string, any>): Promise<void>;
    status(id: string): Promise<JobStatus | null>;
}
//# sourceMappingURL=queue.d.ts.map