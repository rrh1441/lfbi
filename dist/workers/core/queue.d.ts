import { Redis } from '@upstash/redis';
export interface ScanJob {
    id: string;
    companyName: string;
    domain: string;
    createdAt: string;
}
export interface JobStatus {
    id: string;
    state: 'queued' | 'processing' | 'done' | 'failed';
    updated: number;
    message?: string;
    resultUrl?: string;
    error?: string;
}
export declare class UpstashQueue {
    redis: Redis;
    constructor(url: string);
    addJob(id: string, job: any): Promise<void>;
    getNextJob(): Promise<ScanJob | null>;
    updateStatus(id: string, state: JobStatus['state'], message?: string, resultUrl?: string): Promise<void>;
    getStatus(id: string): Promise<JobStatus | null>;
    nextJob(blockMs?: number): Promise<[string, ScanJob] | null>;
    setStatus(id: string, state: JobStatus['state'], extra?: Record<string, any>): Promise<void>;
}
//# sourceMappingURL=queue.d.ts.map