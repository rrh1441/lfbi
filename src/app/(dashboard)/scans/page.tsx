'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  FileText,
  MoreHorizontal
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Scan } from '@/lib/types/database'

export default function ScansPage() {
  const { data: scans, isLoading } = useQuery<Scan[]>({
    queryKey: ['all-scans'],
    queryFn: async () => {
      const response = await fetch('/api/scans')
      if (!response.ok) throw new Error('Failed to fetch scans')
      return response.json()
    }
  })

  // Fetch reports for all scans
  const { data: reports } = useQuery({
    queryKey: ['all-reports'],
    queryFn: async () => {
      const response = await fetch('/api/reports')
      if (!response.ok) throw new Error('Failed to fetch reports')
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <Activity className="h-4 w-4 animate-spin" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getScanReports = (scanId: string) => {
    if (!reports) return []
    return reports.filter((report: { scan_id: string }) => report.scan_id === scanId)
  }

  const activeScans = scans?.filter(s => s.status === 'processing' || s.status === 'pending') || []
  const completedScans = scans?.filter(s => s.status === 'completed') || []
  const failedScans = scans?.filter(s => s.status === 'failed') || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Scans</h1>
          <p className="text-muted-foreground">
            Manage and monitor all security assessments
          </p>
        </div>
        
        <Button asChild>
          <Link href="/scans/new">
            <Plus className="mr-2 h-4 w-4" />
            New Scan
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scans?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeScans.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedScans.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedScans.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Scans Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Scans</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scans?.map((scan) => {
                  const progressPercentage = (scan.progress / scan.total_modules) * 100
                  const scanReports = getScanReports(scan.scan_id)
                  const completedReports = scanReports.filter((r: { status: string }) => r.status === 'completed')
                  const pendingReports = scanReports.filter((r: { status: string }) => r.status === 'pending')
                  
                  return (
                    <TableRow key={scan.scan_id}>
                      <TableCell className="font-medium">
                        {scan.company_name}
                      </TableCell>
                      <TableCell>{scan.domain}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(scan.status)} className="gap-1">
                          {getStatusIcon(scan.status)}
                          {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={progressPercentage} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground w-8">
                            {Math.round(progressPercentage)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {completedReports.length > 0 ? (
                            <Badge variant="default" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {completedReports.length} Ready
                            </Badge>
                          ) : (
                            <Badge variant="outline">No Reports</Badge>
                          )}
                          {pendingReports.length > 0 && (
                            <Badge variant="secondary">
                              {pendingReports.length} Pending
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(scan.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {scan.tags && scan.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {scan.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {scan.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{scan.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/scans/${scan.scan_id}`}>View Details</Link>
                            </DropdownMenuItem>
                            {scan.status === 'completed' && (
                              <DropdownMenuItem asChild>
                                <Link href={`/scans/${scan.scan_id}/findings`}>View Findings</Link>
                              </DropdownMenuItem>
                            )}
                            {completedReports.length > 0 && (
                              <DropdownMenuItem asChild>
                                <Link href={`/scans/${scan.scan_id}/reports`}>
                                  📊 View Reports ({completedReports.length})
                                </Link>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
          
          {!isLoading && (!scans || scans.length === 0) && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No scans yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your first security scan to see results here.
              </p>
              <Button asChild>
                <Link href="/scans/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Start First Scan
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}