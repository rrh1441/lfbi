import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { createLogger } from '@/lib/logger'

const logger = createLogger('sync-health')

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get sync worker status
    const syncStatusResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/sync`
    )
    const syncStatus = await syncStatusResponse.json()
    
    // Get pending scans (those that haven't been synced)
    const { data: pendingScans, error: pendingScanError } = await supabase
      .from('scan_status')
      .select('scan_id, status, created_at')
      .in('status', ['pending', 'processing'])
      .order('created_at', { ascending: true })
      .limit(50)
    
    if (pendingScanError) {
      logger.error('Failed to fetch pending scans', pendingScanError)
    }
    
    // Get recently completed scans
    const { data: completedScans, error: completedScanError } = await supabase
      .from('scan_status')
      .select('scan_id, status, completed_at')
      .eq('status', 'completed')
      .gte('completed_at', new Date(Date.now() - 3600000).toISOString()) // Last hour
      .order('completed_at', { ascending: false })
      .limit(20)
    
    if (completedScanError) {
      logger.error('Failed to fetch completed scans', completedScanError)
    }
    
    // Calculate health metrics
    const metrics = {
      activeWorkers: syncStatus.workerLoad?.length || 0,
      totalScansInProgress: syncStatus.workerLoad?.reduce(
        (sum: number, w: any) => sum + w.scanCount, 0
      ) || 0,
      pendingScans: pendingScans?.length || 0,
      recentlyCompleted: completedScans?.length || 0,
      oldestPendingScan: pendingScans?.[0]?.created_at || null,
      workerConfig: syncStatus.config
    }
    
    // Determine health status
    const healthStatus = {
      status: 'healthy',
      issues: [] as string[]
    }
    
    if (metrics.activeWorkers === 0 && metrics.pendingScans > 0) {
      healthStatus.status = 'degraded'
      healthStatus.issues.push('No active workers but pending scans exist')
    }
    
    if (metrics.pendingScans > 50) {
      healthStatus.status = 'unhealthy'
      healthStatus.issues.push('Too many pending scans')
    }
    
    if (metrics.oldestPendingScan) {
      const age = Date.now() - new Date(metrics.oldestPendingScan).getTime()
      if (age > 600000) { // 10 minutes
        healthStatus.status = 'unhealthy'
        healthStatus.issues.push('Oldest pending scan is over 10 minutes old')
      }
    }
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      health: healthStatus,
      metrics,
      workers: syncStatus.workerLoad || [],
      recommendations: getRecommendations(metrics, healthStatus)
    })
    
  } catch (error) {
    logger.error('Failed to check sync health', error)
    return NextResponse.json(
      { 
        error: 'Failed to check sync health',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

function getRecommendations(metrics: any, healthStatus: any): string[] {
  const recommendations = []
  
  if (metrics.pendingScans > 20) {
    recommendations.push('Consider starting additional sync workers')
  }
  
  if (metrics.activeWorkers > 5) {
    recommendations.push('High number of active workers - check for memory usage')
  }
  
  if (healthStatus.status === 'unhealthy') {
    recommendations.push('Investigate and restart sync workers if necessary')
  }
  
  if (metrics.totalScansInProgress > metrics.activeWorkers * 5) {
    recommendations.push('Workers may be overloaded - consider reducing batch sizes')
  }
  
  return recommendations
}