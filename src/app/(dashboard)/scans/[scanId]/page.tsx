'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Activity,
  FileText,
  Shield,
  Search,
  Filter,
  Camera,
  Building
} from 'lucide-react'
import { Scan, Finding } from '@/lib/types/database'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const REPORT_TYPES = {
  threat_snapshot: {
    title: 'Threat Snapshot',
    description: 'Executive dashboard with financial impact analysis',
    icon: Camera,
    color: 'text-red-600',
    time: '~30 seconds'
  },
  executive_summary: {
    title: 'Executive Summary',
    description: 'Strategic overview and business recommendations',
    icon: Building,
    color: 'text-blue-600',
    time: '~45 seconds'
  },
  technical_remediation: {
    title: 'Technical Remediation',
    description: 'Detailed technical fixes and implementation steps',
    icon: Shield,
    color: 'text-green-600',
    time: '~60 seconds'
  }
}

export default function ScanDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const scanId = params.scanId as string
  
  const [scan, setScan] = useState<Scan | null>(null)
  const [findings, setFindings] = useState<Finding[]>([])
  const [selectedFindings, setSelectedFindings] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    severity: 'ALL',
    state: 'ALL',
    search: ''
  })
  const [generatingReport, setGeneratingReport] = useState<string | null>(null)

  const fetchScan = async () => {
    try {
      const response = await fetch(`/api/scans/${scanId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch scan')
      }
      const scanData = await response.json()
      setScan(scanData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const fetchFindings = async () => {
    try {
      const params = new URLSearchParams({
        scanId,
        ...(filters.severity !== 'ALL' && { severity: filters.severity }),
        ...(filters.state !== 'ALL' && { state: filters.state }),
        ...(filters.search && { search: filters.search })
      })
      
      const response = await fetch(`/api/findings?${params}`)
      if (response.ok) {
        const data = await response.json()
        setFindings(data)
      }
    } catch (error) {
      console.error('Failed to fetch findings:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([fetchScan(), fetchFindings()])
      setIsLoading(false)
    }

    fetchData()

    // Poll for updates every 2 seconds if scan is in progress
    const interval = setInterval(() => {
      if (scan?.status === 'processing' || scan?.status === 'pending') {
        fetchScan()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [scanId, scan?.status])

  useEffect(() => {
    fetchFindings()
  }, [scanId, filters])

  const handleVerifyFindings = async (findingIds: string[], newState: string) => {
    try {
      const response = await fetch('/api/findings/verify', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ findingIds, state: newState }),
      })

      if (response.ok) {
        await fetchFindings()
        setSelectedFindings([])
      }
    } catch (error) {
      console.error('Failed to verify findings:', error)
    }
  }

  const handleGenerateReport = async (reportType: string) => {
    setGeneratingReport(reportType)
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scanId,
          reportType,
          findings,
          companyName: scan?.company_name,
          domain: scan?.domain
        }),
      })

      if (response.ok) {
        const { scanId: resultScanId, reportType: resultType } = await response.json()
        // Refresh scan data to get updated report status
        await fetchScan()
      } else {
        const error = await response.json()
        console.error('Failed to generate report:', error)
      }
    } catch (error) {
      console.error('Failed to generate report:', error)
    } finally {
      setGeneratingReport(null)
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'destructive'
      case 'HIGH': return 'destructive'
      case 'MEDIUM': return 'secondary'
      case 'LOW': return 'outline'
      default: return 'outline'
    }
  }

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading scan details...</p>
        </div>
      </div>
    )
  }

  if (error || !scan) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Scan Not Found</h2>
        <p className="text-muted-foreground mb-4">
          {error || 'The requested scan could not be found.'}
        </p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  const progressPercentage = Math.min((scan.progress / scan.total_modules) * 100, 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{scan.company_name}</h1>
          <p className="text-muted-foreground">{scan.domain}</p>
        </div>
        <Badge variant={getStatusVariant(scan.status)} className="gap-1">
          {getStatusIcon(scan.status)}
          {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
        </Badge>
      </div>

      {/* Progress Card - Only show if not completed */}
      {scan.status !== 'completed' && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Progress</CardTitle>
            <CardDescription>
              Security assessment progress across all modules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Modules Completed</span>
                <span>{scan.progress}/{scan.total_modules}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.round(progressPercentage)}% complete</span>
                <span>
                  {scan.status === 'completed' 
                    ? 'Scan completed' 
                    : scan.status === 'processing'
                    ? 'Scanning in progress...'
                    : 'Waiting to start...'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="findings">Findings ({findings.length})</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Findings</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{findings.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical/High</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {findings.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scan Status</CardTitle>
                {getStatusIcon(scan.status)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{scan.status}</div>
                {scan.completed_at && (
                  <p className="text-xs text-muted-foreground">
                    Completed {new Date(scan.completed_at).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search findings..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity</label>
                  <Select 
                    value={filters.severity} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All severities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All severities</SelectItem>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={filters.state} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All statuses</SelectItem>
                      <SelectItem value="AUTOMATED">Automated</SelectItem>
                      <SelectItem value="VERIFIED">Verified</SelectItem>
                      <SelectItem value="FALSE_POSITIVE">False Positive</SelectItem>
                      <SelectItem value="DISREGARD">Disregard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings Actions */}
          {selectedFindings.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleVerifyFindings(selectedFindings, 'VERIFIED')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Selected ({selectedFindings.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleVerifyFindings(selectedFindings, 'FALSE_POSITIVE')}
              >
                Mark False Positive
              </Button>
            </div>
          )}

          {/* Findings Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedFindings.length === findings.length && findings.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFindings(findings.map(f => f.id))
                          } else {
                            setSelectedFindings([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {findings.map((finding) => (
                    <TableRow key={finding.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedFindings.includes(finding.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFindings(prev => [...prev, finding.id])
                            } else {
                              setSelectedFindings(prev => prev.filter(id => id !== finding.id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {finding.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityVariant(finding.severity)}>
                          {finding.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{finding.description}</p>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={finding.state}
                          onValueChange={(newState) => handleVerifyFindings([finding.id], newState)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AUTOMATED">Automated</SelectItem>
                            <SelectItem value="VERIFIED">Verified</SelectItem>
                            <SelectItem value="FALSE_POSITIVE">False Positive</SelectItem>
                            <SelectItem value="DISREGARD">Disregard</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {findings.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No findings found</h3>
                  <p className="text-muted-foreground">
                    No security findings match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(REPORT_TYPES).map(([reportType, config]) => {
              const IconComponent = config.icon
              const isGenerating = generatingReport === reportType
              
              return (
                <Card key={reportType}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-6 w-6 ${config.color}`} />
                        <div>
                          <CardTitle>{config.title}</CardTitle>
                          <CardDescription>{config.description}</CardDescription>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleGenerateReport(reportType)}
                        disabled={isGenerating || findings.length === 0}
                      >
                        {isGenerating ? (
                          <>
                            <Activity className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Report
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-sm">{scan.company_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Domain</label>
                  <p className="text-sm">{scan.domain}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Started</label>
                  <p className="text-sm">{new Date(scan.created_at).toLocaleString()}</p>
                </div>
                {scan.completed_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Completed</label>
                    <p className="text-sm">{new Date(scan.completed_at).toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Modules</label>
                  <p className="text-sm">{scan.total_modules}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Progress</label>
                  <p className="text-sm">{scan.progress}/{scan.total_modules} ({Math.round(progressPercentage)}%)</p>
                </div>
              </div>
              
              {scan.tags && scan.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scan.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}