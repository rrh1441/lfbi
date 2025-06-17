'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Plus,
  Activity,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { Scan, Finding } from '@/lib/types/database'

interface DashboardStats {
  totalScans: number
  criticalFindings: number
  verifiedIssues: number
  activeScans: number
}

interface CriticalFindingWithScan extends Finding {
  scan_status: {
    company_name: string
    domain: string
  }
}

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json()
    }
  })

  const { data: recentScans, isLoading: scansLoading } = useQuery<Scan[]>({
    queryKey: ['recent-scans'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/recent-scans')
      if (!response.ok) throw new Error('Failed to fetch recent scans')
      return response.json()
    }
  })

  const { data: criticalFindings, isLoading: criticalLoading } = useQuery<CriticalFindingWithScan[]>({
    queryKey: ['critical-findings'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/critical-findings')
      if (!response.ok) throw new Error('Failed to fetch critical findings')
      return response.json()
    }
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'processing': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
        <Button asChild>
          <Link href="/scans/new">
            <Plus className="mr-2 h-4 w-4" />
            New Scan
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.totalScans || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Security assessments conducted
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.criticalFindings || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.verifiedIssues || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Confirmed security issues
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scans</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.activeScans || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>
              Your latest security assessments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scansLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : recentScans && recentScans.length > 0 ? (
              recentScans.map((scan) => {
                const progressPercentage = (scan.progress / scan.total_modules) * 100
                return (
                  <div key={scan.scan_id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{scan.company_name}</p>
                      <p className="text-xs text-muted-foreground">{scan.domain}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusVariant(scan.status)}>
                        {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                      </Badge>
                      <div className="w-20">
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No scans yet</p>
                <p className="text-xs text-muted-foreground">Start your first security scan</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/scans/new">
                <Plus className="mr-2 h-4 w-4" />
                Start New Scan
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/findings">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Review Findings
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/reports">
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/scans">
                <Clock className="mr-2 h-4 w-4" />
                View All Scans
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Critical Findings Alert */}
      {(criticalFindings && criticalFindings.length > 0) && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Critical Findings Require Attention
            </CardTitle>
            <CardDescription>
              High-priority security issues that need immediate review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                criticalFindings.slice(0, 3).map((finding) => (
                  <div key={finding.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{finding.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {finding.scan_status.company_name} - {finding.description.slice(0, 50)}...
                      </p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                ))
              )}
              
              <Button className="w-full" asChild>
                <Link href="/findings?severity=CRITICAL">
                  Review All Critical Findings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}