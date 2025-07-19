'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
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
  Eye,
  Camera,
  FilePlus,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { Scan } from '@/lib/types/database'

export default function ScansPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: scans, isLoading } = useQuery<Scan[]>({
    queryKey: ['all-scans'],
    queryFn: async () => {
      const response = await fetch('/api/scans')
      if (!response.ok) throw new Error('Failed to fetch scans')
      return response.json()
    }
  })

  // Fetch report status for all scans
  const { data: reports } = useQuery({
    queryKey: ['all-reports'],
    queryFn: async () => {
      const response = await fetch('/api/reports')
      if (!response.ok) throw new Error('Failed to fetch reports')
      return response.json()
    },
    enabled: !!scans && scans.length > 0
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

  // Generate report mutation
  const generateReportMutation = useMutation({
    mutationFn: async ({ scanId, reportType }: { scanId: string; reportType: string }) => {
      const scan = scans?.find(s => s.scan_id === scanId)
      if (!scan) throw new Error('Scan not found')
      
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scanId,
          reportType,
          companyName: scan.company_name,
          domain: scan.domain
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate report')
      }
      
      return response.json()
    },
    onSuccess: (data, variables) => {
      toast.success(`${variables.reportType.replace('_', ' ')} report generated successfully`)
      queryClient.invalidateQueries({ queryKey: ['all-reports'] })
      queryClient.invalidateQueries({ queryKey: ['all-scans'] })
      // Navigate to the report
      router.push(`/scans/${variables.scanId}/reports?type=${variables.reportType}`)
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to generate report')
    }
  })

  const generateReport = (scanId: string, reportType: string) => {
    generateReportMutation.mutate({ scanId, reportType })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Security Scans</h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            Manage and monitor all security assessments
          </p>
        </div>
        
        <Button asChild className="w-fit">
          <Link href="/scans/new">
            <Plus className="mr-2 h-4 w-4" />
            New Scan
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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

      {/* Scans Table/Cards */}
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
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block">
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
                            <div className="flex items-center gap-2">
                              {/* View Details Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.push(`/scans/${scan.scan_id}`)}
                                title="View scan details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {/* View Findings Button - only show for completed scans */}
                              {scan.status === 'completed' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => router.push(`/scans/${scan.scan_id}/findings`)}
                                  title="View findings"
                                >
                                  <Search className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {/* View Snapshot Button - only show for completed scans */}
                              {scan.status === 'completed' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    // Check if threat snapshot exists
                                    const hasSnapshot = scan.threat_snapshot_status === 'completed'
                                    if (hasSnapshot) {
                                      router.push(`/scans/${scan.scan_id}/reports?type=threat_snapshot`)
                                    } else {
                                      // Generate snapshot
                                      generateReport(scan.scan_id, 'threat_snapshot')
                                    }
                                  }}
                                  title="View snapshot"
                                >
                                  <Camera className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {/* Create/View Reports Button */}
                              {scan.status === 'completed' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (completedReports.length > 0) {
                                      router.push(`/scans/${scan.scan_id}/reports`)
                                    } else {
                                      router.push(`/scans/${scan.scan_id}/reports/new`)
                                    }
                                  }}
                                >
                                  {completedReports.length > 0 ? (
                                    <>
                                      <FileText className="h-4 w-4 mr-1" />
                                      View Reports
                                    </>
                                  ) : (
                                    <>
                                      <FilePlus className="h-4 w-4 mr-1" />
                                      Create Reports
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4 p-4">
                {scans?.map((scan) => {
                  const progressPercentage = (scan.progress / scan.total_modules) * 100
                  const scanReports = getScanReports(scan.scan_id)
                  const completedReports = scanReports.filter((r: { status: string }) => r.status === 'completed')
                  const pendingReports = scanReports.filter((r: { status: string }) => r.status === 'pending')
                  
                  return (
                    <Card key={scan.scan_id} className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{scan.company_name}</h3>
                          <p className="text-xs text-muted-foreground truncate">{scan.domain}</p>
                        </div>
                        <Badge variant={getStatusVariant(scan.status)} className="gap-1 ml-2">
                          {getStatusIcon(scan.status)}
                          {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                        </Badge>
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{Math.round(progressPercentage)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>

                      {/* Reports */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {completedReports.length > 0 ? (
                            <Badge variant="default" className="gap-1 text-xs">
                              <FileText className="h-3 w-3" />
                              {completedReports.length} Ready
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">No Reports</Badge>
                          )}
                          {pendingReports.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {pendingReports.length} Pending
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Date and Tags */}
                      <div className="mb-3 space-y-2">
                        <div className="text-xs text-muted-foreground">
                          Created: {new Date(scan.created_at).toLocaleDateString()}
                        </div>
                        {scan.tags && scan.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {scan.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {scan.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{scan.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {/* View Details Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/scans/${scan.scan_id}`)}
                          className="flex-1 min-w-0"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        
                        {/* View Findings Button - only show for completed scans */}
                        {scan.status === 'completed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/scans/${scan.scan_id}/findings`)}
                            className="flex-1 min-w-0"
                          >
                            <Search className="h-4 w-4 mr-1" />
                            Findings
                          </Button>
                        )}
                        
                        {/* Create/View Reports Button */}
                        {scan.status === 'completed' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              if (completedReports.length > 0) {
                                router.push(`/scans/${scan.scan_id}/reports`)
                              } else {
                                router.push(`/scans/${scan.scan_id}/reports/new`)
                              }
                            }}
                            className="flex-1 min-w-0"
                          >
                            {completedReports.length > 0 ? (
                              <>
                                <FileText className="h-4 w-4 mr-1" />
                                Reports
                              </>
                            ) : (
                              <>
                                <FilePlus className="h-4 w-4 mr-1" />
                                Create
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
          
          {!isLoading && (!scans || scans.length === 0) && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No scans yet</h3>
              <p className="text-muted-foreground mb-4 text-sm lg:text-base">
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