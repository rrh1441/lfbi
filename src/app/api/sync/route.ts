import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { createLogger } from '@/lib/logger'
import { SYNC_WORKER_CONFIG, WorkerPool } from '@/lib/sync-worker-config'

const logger = createLogger('sync-worker')
const workerPool = new WorkerPool()
const workerScans = new Map<string, Set<string>>() // Track scans per worker

interface SyncRequest {
  scanIds: string[]
  priority?: 'high' | 'normal' | 'low'
}

export async function POST(request: NextRequest) {
  try {
    const { scanIds, priority = 'normal' } = await request.json() as SyncRequest
    
    if (!scanIds || !Array.isArray(scanIds) || scanIds.length === 0) {
      return NextResponse.json(
        { error: 'scanIds array is required and must not be empty' },
        { status: 400 }
      )
    }
    
    // Check current worker load
    const workerLoad = workerPool.getWorkerLoad()
    const totalScans = workerLoad.reduce((sum, w) => sum + w.scanCount, 0)
    
    // Prevent overload
    if (totalScans + scanIds.length > SYNC_WORKER_CONFIG.maxScansPerWorker * 10) {
      return NextResponse.json(
        { error: 'System at capacity. Please try again later.' },
        { status: 503 }
      )
    }
    
    const assignments: { scanId: string; workerId: string }[] = []
    
    // Assign scans to workers
    for (const scanId of scanIds) {
      const workerId = await workerPool.assignScanToWorker(scanId)
      assignments.push({ scanId, workerId })
      
      // Track scan assignment
      if (!workerScans.has(workerId)) {
        workerScans.set(workerId, new Set())
      }
      workerScans.get(workerId)!.add(scanId)
      
      // Start sync process for this scan
      startSyncProcess(scanId, workerId, priority)
    }
    
    return NextResponse.json({
      success: true,
      totalScans: scanIds.length,
      assignments,
      workerLoad: workerPool.getWorkerLoad()
    })
    
  } catch (error) {
    logger.error('Failed to start sync process', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function startSyncProcess(
  scanId: string, 
  workerId: string, 
  priority: string,
  retryCount: number = 0
) {
  const supabase = createServerClient()
  
  const syncScan = async () => {
    try {
      // Check scan status from external API
      const response = await fetch(`https://dealbrief-scanner.fly.dev/scans/${scanId}/status`, {
        headers: {
          'Origin': 'https://lfbi.vercel.app'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to check scan status: ${response.statusText}`)
      }
      
      const status = await response.json()
      
      // Update local database with latest status
      const { error: updateError } = await supabase
        .from('scan_status')
        .upsert({
          scan_id: scanId,
          status: status.status,
          progress: status.progress || 0,
          updated_at: new Date().toISOString()
        })
      
      if (updateError) {
        throw updateError
      }
      
      // If scan is completed, sync findings
      if (status.status === 'completed') {
        await syncFindings(scanId)
        
        // Mark scan as completed for this worker
        const scans = workerScans.get(workerId)
        if (scans) {
          scans.delete(scanId)
          
          // If all scans for this worker are done, terminate immediately
          if (scans.size === 0) {
            logger.info(`Worker ${workerId} completed all scans, terminating`)
            workerPool.terminateWorker(workerId)
            workerScans.delete(workerId)
          }
        }
        
        return // Exit the sync process
      }
      
      // If still processing, schedule next check
      if (status.status === 'processing' || status.status === 'pending') {
        setTimeout(() => {
          syncScan() // Recursive call
        }, SYNC_WORKER_CONFIG.pollInterval)
      } else {
        // Handle failed or unknown status
        logger.warn(`Scan ${scanId} has unexpected status: ${status.status}`)
        
        // Remove scan from worker tracking
        const scans = workerScans.get(workerId)
        if (scans) {
          scans.delete(scanId)
          
          // If all scans for this worker are done, terminate
          if (scans.size === 0) {
            workerPool.terminateWorker(workerId)
            workerScans.delete(workerId)
          }
        }
      }
      
    } catch (error) {
      logger.error(`Sync error for scan ${scanId}`, error)
      
      // Retry logic
      if (retryCount < SYNC_WORKER_CONFIG.maxRetries) {
        logger.info(`Retrying sync for scan ${scanId} (attempt ${retryCount + 1})`)
        setTimeout(() => {
          startSyncProcess(scanId, workerId, priority, retryCount + 1)
        }, SYNC_WORKER_CONFIG.pollInterval * 2) // Double interval for retries
      } else {
        logger.error(`Max retries reached for scan ${scanId}`)
        
        // Remove scan from worker tracking
        const scans = workerScans.get(workerId)
        if (scans) {
          scans.delete(scanId)
          
          // If all scans for this worker are done, terminate
          if (scans.size === 0) {
            workerPool.terminateWorker(workerId)
            workerScans.delete(workerId)
          }
        }
      }
    }
  }
  
  // Start the sync process based on priority
  const delay = priority === 'high' ? 0 : priority === 'low' ? 5000 : 2000
  setTimeout(syncScan, delay)
}

async function syncFindings(scanId: string) {
  const supabase = createServerClient()
  
  try {
    // Fetch findings from external API
    const response = await fetch(`https://dealbrief-scanner.fly.dev/scans/${scanId}/findings`, {
      headers: {
        'Origin': 'https://lfbi.vercel.app'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch findings: ${response.statusText}`)
    }
    
    const findings = await response.json()
    
    // Batch insert findings
    if (findings && findings.length > 0) {
      const { error } = await supabase
        .from('findings')
        .upsert(
          findings.map((finding: any) => ({
            ...finding,
            scan_id: scanId,
            synced_at: new Date().toISOString()
          }))
        )
      
      if (error) {
        throw error
      }
      
      logger.info(`Synced ${findings.length} findings for scan ${scanId}`)
    }
    
    // Update scan status to indicate sync is complete
    await supabase
      .from('scan_status')
      .update({
        status: 'completed',
        sync_completed: true,
        completed_at: new Date().toISOString()
      })
      .eq('scan_id', scanId)
    
  } catch (error) {
    logger.error(`Failed to sync findings for scan ${scanId}`, error)
    throw error
  }
}

// GET endpoint to check worker status
export async function GET() {
  const workerDetails = workerPool.getWorkerLoad().map(w => ({
    ...w,
    remainingScans: workerScans.get(w.workerId)?.size || 0
  }))
  
  return NextResponse.json({
    workerLoad: workerDetails,
    totalActiveWorkers: workerDetails.length,
    totalScansInProgress: Array.from(workerScans.values())
      .reduce((sum, scans) => sum + scans.size, 0),
    config: SYNC_WORKER_CONFIG
  })
}