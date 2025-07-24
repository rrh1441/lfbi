# Sync Worker System

## Overview
A robust sync worker system designed to handle scanner results without crashes by limiting each worker to 3 scans and terminating immediately after completion.

## Architecture

### Worker Pool Management
- Each worker handles maximum 3 scans
- Workers terminate immediately after syncing all assigned findings
- Automatic timeout after 3 minutes as safety measure
- No cleanup delay - instant termination

### Configuration (`/lib/sync-worker-config.ts`)
```typescript
export const SYNC_WORKER_CONFIG = {
  maxScansPerWorker: 3,    // Process only 3 scans per worker
  workerTimeout: 180000,   // 3 minutes max per worker
  pollInterval: 10000,     // Poll every 10 seconds
  maxRetries: 3,           // Retry failed syncs up to 3 times
  cleanupDelay: 0          // Clean up immediately after completion
}
```

## API Endpoints

### POST /api/sync
Start sync workers for specified scans.

**Request:**
```json
{
  "scanIds": ["scan-123", "scan-456", "scan-789"],
  "priority": "normal"  // "high" | "normal" | "low"
}
```

**Response:**
```json
{
  "success": true,
  "totalScans": 3,
  "assignments": [
    { "scanId": "scan-123", "workerId": "worker-xxx" }
  ],
  "workerLoad": [
    { "workerId": "worker-xxx", "scanCount": 3 }
  ]
}
```

### GET /api/sync
Check current worker status.

**Response:**
```json
{
  "workerLoad": [
    {
      "workerId": "worker-xxx",
      "scanCount": 3,
      "remainingScans": 2
    }
  ],
  "totalActiveWorkers": 1,
  "totalScansInProgress": 2,
  "config": { ... }
}
```

### GET /api/sync/health
Monitor sync worker health and get recommendations.

**Response:**
```json
{
  "timestamp": "2024-01-24T10:00:00Z",
  "health": {
    "status": "healthy",
    "issues": []
  },
  "metrics": {
    "activeWorkers": 2,
    "totalScansInProgress": 5,
    "pendingScans": 10,
    "recentlyCompleted": 15,
    "oldestPendingScan": "2024-01-24T09:55:00Z"
  },
  "recommendations": [
    "Consider starting additional sync workers"
  ]
}
```

## Worker Lifecycle

1. **Assignment**: Worker created when scan is assigned
2. **Tracking**: Worker tracks its assigned scans
3. **Polling**: Checks scan status every 10 seconds
4. **Syncing**: Fetches and saves findings when scan completes
5. **Termination**: Dies immediately when all scans are synced

## Integration with Bulk Scanner

The bulk scanner automatically creates sync workers:

```javascript
// Bulk scanner batches scans for sync workers
const batchSize = SYNC_WORKER_CONFIG.maxScansPerWorker  // 3
for (let i = 0; i < scanIds.length; i += batchSize) {
  const batch = scanIds.slice(i, i + batchSize)
  // Start sync worker for this batch
  await fetch('/api/sync', {
    method: 'POST',
    body: JSON.stringify({ scanIds: batch })
  })
}
```

## Error Handling

- **Retry Logic**: Failed syncs retry up to 3 times
- **Timeout Protection**: Workers force-terminate after 3 minutes
- **Graceful Degradation**: Worker removes failed scans from tracking
- **Health Monitoring**: Detect stuck or failed workers

## System Capacity

- **Max Concurrent Workers**: ~10 (30 scans total)
- **Scans Per Worker**: 3
- **Worker Lifetime**: Usually < 2 minutes
- **Memory Usage**: Low due to quick termination

## Health Status Indicators

### Healthy
- Active workers handling scans
- No scans pending > 10 minutes
- Less than 50 pending scans

### Degraded
- No workers but pending scans exist
- Some scans failing repeatedly

### Unhealthy
- Too many pending scans (>50)
- Oldest scan > 10 minutes old
- Multiple worker failures

## Benefits

1. **No Crashes**: Limited scans per worker prevents memory issues
2. **Fast Cleanup**: Workers die immediately when done
3. **Scalable**: Automatically creates workers as needed
4. **Monitored**: Health endpoint tracks system status
5. **Resilient**: Retry logic and timeout protection