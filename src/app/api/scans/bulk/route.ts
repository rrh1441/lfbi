import { NextRequest, NextResponse } from 'next/server'
import { SYNC_WORKER_CONFIG } from '@/lib/sync-worker-config'

interface BulkScanRequest {
  companyName: string
  domain: string
  tags?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { scans } = await request.json() as { scans: BulkScanRequest[] }

    if (!scans || !Array.isArray(scans) || scans.length === 0) {
      return NextResponse.json(
        { error: 'Scans array is required and must not be empty' },
        { status: 400 }
      )
    }

    // Validate each scan entry
    const validScans = scans.filter(scan => 
      scan.companyName && scan.companyName.trim() && 
      scan.domain && scan.domain.trim()
    )

    if (validScans.length === 0) {
      return NextResponse.json(
        { error: 'No valid scans found. Each scan must have companyName and domain' },
        { status: 400 }
      )
    }

    const results = []
    const errors = []
    const scanIdsToSync = []

    // Process each scan sequentially to avoid overwhelming the external API
    for (const scan of validScans) {
      try {
        const response = await fetch('https://dealbrief-scanner.fly.dev/scans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://lfbi.vercel.app'
          },
          body: JSON.stringify({
            companyName: scan.companyName.trim(),
            domain: scan.domain.trim(),
            tags: scan.tags || []
          })
        })

        if (!response.ok) {
          throw new Error(`Scanner API error for ${scan.companyName}: ${response.statusText}`)
        }

        const result = await response.json()
        const scanId = result.scanId || result.id
        results.push({
          companyName: scan.companyName,
          domain: scan.domain,
          status: 'success',
          scanId
        })
        
        // Collect scan IDs for batch sync
        scanIdsToSync.push(scanId)

        // Add a small delay between requests to be respectful to the external API
        await new Promise(resolve => setTimeout(resolve, 1000))

      } catch (error) {
        console.error(`Failed to start scan for ${scan.companyName}:`, error)
        errors.push({
          companyName: scan.companyName,
          domain: scan.domain,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    // Start sync workers for successfully created scans
    if (scanIdsToSync.length > 0) {
      // Batch scans based on worker config
      const batchSize = SYNC_WORKER_CONFIG.maxScansPerWorker
      for (let i = 0; i < scanIdsToSync.length; i += batchSize) {
        const batch = scanIdsToSync.slice(i, i + batchSize)
        
        try {
          // Start sync worker for this batch
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              scanIds: batch,
              priority: 'normal'
            })
          })
        } catch (error) {
          console.error('Failed to start sync worker for batch', error)
        }
      }
    }

    return NextResponse.json({
      success: results.length > 0,
      total: validScans.length,
      successful: results.length,
      failed: errors.length,
      results,
      errors,
      syncWorkersStarted: Math.ceil(scanIdsToSync.length / SYNC_WORKER_CONFIG.maxScansPerWorker)
    })

  } catch (error) {
    console.error('Failed to process bulk scans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}