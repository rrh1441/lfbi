'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Eye, RefreshCw, Building, Shield, ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { ReportViewer } from '@/components/reports/ReportViewer'

const REPORT_TYPE_CONFIG = {
  threat_snapshot: {
    title: 'Threat Snapshot',
    description: 'Executive dashboard focused on financial impact',
    icon: Building,
    maxWords: 650,
    color: 'text-red-600'
  },
  executive_summary: {
    title: 'Executive Summary', 
    description: 'Strategic overview for leadership',
    icon: Building,
    maxWords: 2500,
    color: 'text-blue-600'
  },
  technical_remediation: {
    title: 'Technical Remediation',
    description: 'Detailed technical implementation guide',
    icon: Shield,
    maxWords: 4500,
    color: 'text-green-600'
  }
}

export default function ScanReportsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const scanId = params.scanId as string
  const reportTypeFromUrl = searchParams.get('type')
  const [selectedReport, setSelectedReport] = useState<{
    id: string
    scan_id: string
    report_type: string
    status: string
    company_name?: string
    domain?: string
    content?: string
    html_content?: string
    markdown_content?: string
    created_at: string
    completed_at?: string
  } | null>(null)

  // Use existing TanStack Query pattern
  const { data: scanData, isLoading: scanLoading } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: async () => {
      const response = await fetch(`/api/scans/${scanId}`)
      if (!response.ok) throw new Error('Failed to fetch scan')
      return response.json()
    }
  })

  const { data: reports, isLoading: reportsLoading, refetch } = useQuery({
    queryKey: ['reports', scanId],
    queryFn: async () => {
      const response = await fetch(`/api/reports?scanId=${scanId}`)
      if (!response.ok) throw new Error('Failed to fetch reports')
      return response.json()
    }
  })

  // Auto-open report if type is specified in URL
  useEffect(() => {
    if (reportTypeFromUrl && reports && !selectedReport) {
      const report = reports.find((r: { report_type: string; status: string }) => 
        r.report_type === reportTypeFromUrl && r.status === 'completed'
      )
      if (report) {
        setSelectedReport(report)
      }
    }
  }, [reportTypeFromUrl, reports, selectedReport])

  const generateSpecificReport = async (reportType: string) => {
    try {
      // Get all findings for this completed scan
      const findingsResponse = await fetch(`/api/findings?scanId=${scanId}`)
      const allFindings = await findingsResponse.json()

      await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          scanId,
          reportType,
          findings: allFindings,
          companyName: scanData?.company_name,
          domain: scanData?.domain
        })
      })
      
      refetch() // Refresh the data
    } catch (error) {
      console.error(`Failed to generate ${reportType}:`, error)
    }
  }

  const generateAllReports = async () => {
    const reportTypes = ['threat_snapshot', 'executive_summary', 'technical_remediation']
    
    for (const reportType of reportTypes) {
      await generateSpecificReport(reportType)
    }
  }

  if (scanLoading || reportsLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <Skeleton key={i} className="h-48 w-full" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header with back navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/scans/${scanId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scan
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{scanData?.company_name} Reports</h1>
          <p className="text-gray-600">{scanData?.domain} • Scan ID: {scanId}</p>
        </div>
        <Button onClick={generateAllReports} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate All Reports
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(REPORT_TYPE_CONFIG).map(([reportType, config]) => {
          const report = reports?.find((r: { report_type: string }) => r.report_type === reportType)
          const IconComponent = config.icon
          
          return (
            <Card key={reportType} className="hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => report?.status === 'completed' && setSelectedReport(report)}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 ${config.color}`} />
                  <div>
                    <CardTitle className="text-lg">{config.title}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Target length: ≤{config.maxWords.toLocaleString()} words
                  </div>
                  
                  {report ? (
                    <div className="space-y-3">
                      <Badge 
                        variant={report.status === 'completed' ? 'default' : 'secondary'}
                      >
                        {report.status === 'completed' ? 'Ready' : 'Generating...'}
                      </Badge>
                      
                      {report.status === 'completed' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedReport(report)
                            }}
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`/api/reports/${report.id}/download`, '_blank')
                            }}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      )}
                      
                      {report.created_at && (
                        <p className="text-xs text-gray-500">
                          Generated: {new Date(report.created_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Badge variant="outline">Not Generated</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          generateSpecificReport(reportType)
                        }}
                        className="w-full"
                      >
                        Generate Report
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Scan Information */}
      {scanData && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Status:</span>
                <div className="mt-1">
                  <Badge variant={scanData.status === 'completed' ? 'default' : 'secondary'}>
                    {scanData.status}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Progress:</span>
                <div className="mt-1">{scanData.progress || 0}/{scanData.total_modules || 0} modules</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Created:</span>
                <div className="mt-1">{new Date(scanData.created_at).toLocaleDateString()}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Completed:</span>
                <div className="mt-1">
                  {scanData.completed_at ? new Date(scanData.completed_at).toLocaleDateString() : 'In progress'}
                </div>
              </div>
            </div>
            {scanData.tags && scanData.tags.length > 0 && (
              <div className="mt-4">
                <span className="font-medium text-gray-600">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scanData.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Report Viewer Modal using existing Dialog */}
      {selectedReport && (
        <ReportViewer 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </div>
  )
}