/**
 * Dedicated ZAP Worker Process
 * 
 * Runs on separate machines that auto-scale to zero when idle.
 * Handles ZAP scan requests via queue system for optimal pay-per-second economics.
 */

import { config } from 'dotenv';
import { UpstashQueue } from './core/queue.js';
import { initializeDatabase } from './core/artifactStore.js';
import { runZAPScan } from './modules/zapScan.js';

config();

const queue = new UpstashQueue(process.env.REDIS_URL!);

function log(...args: unknown[]) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [zap-worker]`, ...args);
}

interface ZAPJob {
  id: string;
  type: 'zap_scan';
  domain: string;
  scanId: string;
  createdAt: string;
}

/**
 * Process a single ZAP scan job
 */
async function processZAPJob(job: ZAPJob): Promise<void> {
  const { id, domain, scanId } = job;
  
  log(`🕷️ ZAP JOB PICKED UP: Processing ZAP scan ${id} for ${domain} (${scanId})`);
  
  try {
    // Update job status to processing
    await queue.updateStatus(id, 'processing', 'ZAP web application security scan in progress...');
    
    // Run ZAP scan
    const findingsCount = await runZAPScan({ domain, scanId });
    
    // Update job status to completed
    await queue.updateStatus(
      id, 
      'done', 
      `ZAP scan completed - ${findingsCount} web application vulnerabilities found`
    );
    
    log(`✅ ZAP SCAN COMPLETED for ${domain}: ${findingsCount} web vulnerabilities found`);
    
  } catch (error) {
    log(`❌ ZAP scan failed for ${domain}:`, (error as Error).message);
    
    // Update job status to failed
    await queue.updateStatus(
      id, 
      'failed', 
      `ZAP scan failed: ${(error as Error).message}`
    );
    
    throw error;
  }
}

/**
 * Main ZAP worker loop
 */
async function startZAPWorker(): Promise<void> {
  // Log worker startup
  const workerInstanceId = process.env.FLY_MACHINE_ID || `zap-worker-${Date.now()}`;
  log(`Starting dedicated ZAP worker [${workerInstanceId}]`);
  
  // Initialize database connection
  try {
    await initializeDatabase();
    log('Database connection initialized successfully');
  } catch (error) {
    log('Database initialization failed:', (error as Error).message);
    process.exit(1);
  }
  
  // Verify ZAP is available
  const zapBaseline = '/usr/local/bin/zap-baseline.py';
  try {
    const fs = await import('node:fs/promises');
    await fs.access(zapBaseline);
    log('ZAP baseline script found and accessible');
  } catch {
    log(`ERROR: ZAP baseline script not found at ${zapBaseline}`);
    process.exit(1);
  }
  
  let isShuttingDown = false;
  
  // Graceful shutdown handler
  const gracefulShutdown = (signal: string) => {
    if (isShuttingDown) {
      log(`Already shutting down, ignoring ${signal}`);
      return;
    }
    
    isShuttingDown = true;
    log(`Received ${signal}, initiating graceful shutdown...`);
    
    // ZAP worker can shut down immediately since scans are short-lived
    log('ZAP worker shutdown completed');
    process.exit(0);
  };
  
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  
  // Main processing loop - optimized for ZAP workloads
  while (!isShuttingDown) {
    try {
      // Look for any available jobs - we'll filter for ZAP jobs
      const job = await queue.getNextJob() as ZAPJob | null;
      
      if (job && !isShuttingDown) {
        // Filter for ZAP jobs only - skip non-ZAP jobs
        if (job.type === 'zap_scan') {
          log(`Processing ZAP job: ${job.id}`);
          await processZAPJob(job);
        } else {
          // Put non-ZAP job back in queue for other workers
          await queue.addJob(job.id, job);
          log(`Skipped non-ZAP job ${job.id} (type: ${(job as any).type || 'unknown'})`);
        }
      } else {
        // No ZAP jobs available, wait before checking again
        // ZAP workers can check more frequently since they scale to zero
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second intervals
      }
      
    } catch (error) {
      if (!isShuttingDown) {
        log('ZAP worker error:', (error as Error).message);
        // Wait before retrying on error
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  
  log('ZAP worker loop exited due to shutdown signal');
}

// Start the ZAP worker
startZAPWorker().catch(error => {
  log('CRITICAL: Failed to start ZAP worker:', (error as Error).message);
  process.exit(1);
});