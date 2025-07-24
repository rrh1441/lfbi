// Sync Worker Configuration
// This configuration helps manage sync workers for scanner instances

export interface WorkerConfig {
  maxScansPerWorker: number      // Maximum scans a single worker should handle
  workerTimeout: number           // Time in ms before worker is terminated
  pollInterval: number            // How often to check scan status
  maxRetries: number             // Maximum retries for failed syncs
  cleanupDelay: number           // Delay before cleaning up completed workers
}

export const SYNC_WORKER_CONFIG: WorkerConfig = {
  maxScansPerWorker: 3,          // Process only 3 scans per worker
  workerTimeout: 180000,         // 3 minutes max per worker
  pollInterval: 10000,           // Poll every 10 seconds
  maxRetries: 3,                 // Retry failed syncs up to 3 times
  cleanupDelay: 0                // Clean up immediately after completion
}

// Worker pool management
export class WorkerPool {
  private activeWorkers: Map<string, NodeJS.Timeout> = new Map()
  private scanToWorker: Map<string, string> = new Map()
  
  async assignScanToWorker(scanId: string): Promise<string> {
    // Find a worker with capacity
    for (const [workerId, _] of this.activeWorkers) {
      const assignedScans = Array.from(this.scanToWorker.entries())
        .filter(([_, wId]) => wId === workerId).length
      
      if (assignedScans < SYNC_WORKER_CONFIG.maxScansPerWorker) {
        this.scanToWorker.set(scanId, workerId)
        return workerId
      }
    }
    
    // Create new worker if none available
    const newWorkerId = `worker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Set timeout as a safety measure - worker should terminate itself when done
    this.activeWorkers.set(newWorkerId, setTimeout(() => {
      console.log(`Worker ${newWorkerId} timed out - force terminating`)
      this.terminateWorker(newWorkerId)
    }, SYNC_WORKER_CONFIG.workerTimeout))
    
    this.scanToWorker.set(scanId, newWorkerId)
    return newWorkerId
  }
  
  terminateWorker(workerId: string) {
    const timeout = this.activeWorkers.get(workerId)
    if (timeout) {
      clearTimeout(timeout)
      this.activeWorkers.delete(workerId)
    }
    
    // Remove scan assignments
    for (const [scanId, wId] of this.scanToWorker.entries()) {
      if (wId === workerId) {
        this.scanToWorker.delete(scanId)
      }
    }
    
    console.log(`Worker ${workerId} terminated - ${this.activeWorkers.size} workers remaining`)
  }
  
  getWorkerLoad(): { workerId: string; scanCount: number }[] {
    const load: { workerId: string; scanCount: number }[] = []
    
    for (const [workerId, _] of this.activeWorkers) {
      const scanCount = Array.from(this.scanToWorker.entries())
        .filter(([_, wId]) => wId === workerId).length
      load.push({ workerId, scanCount })
    }
    
    return load
  }
}