'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, X, Maximize2, Shield, AlertCircle, Info, Building, FileText } from 'lucide-react'

interface ReportViewerProps {
  report: {
    id: string
    scan_id: string
    company_name?: string
    domain?: string
    content?: string
    html_content?: string
    markdown_content?: string
    report_type: string
    status: string
    created_at: string
    completed_at?: string
  }
  onClose: () => void
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function ReportViewer({ report, onClose }: ReportViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get the HTML content or fallback to markdown/content
  const htmlContent = report.html_content || report.content

  useEffect(() => {
    // Set loading to false once component mounts
    setIsLoading(false)
  }, [])

  const getReportIcon = (reportType: string) => {
    switch (reportType) {
      case 'threat_snapshot':
        return <AlertCircle className="w-5 h-5" />
      case 'executive_summary':
        return <Building className="w-5 h-5" />
      case 'technical_remediation':
        return <Shield className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getReportTitle = (reportType: string) => {
    switch (reportType) {
      case 'threat_snapshot':
        return 'Security Risk Assessment - Threat Snapshot'
      case 'executive_summary':
        return 'Executive Security Briefing'
      case 'technical_remediation':
        return 'Technical Remediation Guide'
      default:
        return 'Security Assessment Report'
    }
  }

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl h-[90vh] overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading report...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-7xl ${isFullscreen ? 'h-screen w-screen max-w-none' : 'h-[90vh]'} overflow-hidden p-0`}>
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              {getReportIcon(report.report_type)}
            </div>
            <div>
              <DialogTitle className="text-xl">
                {getReportTitle(report.report_type)}
              </DialogTitle>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-600">
                  {report.company_name || 'Unknown'} • {report.domain || 'Unknown'}
                </span>
                <Badge variant="outline" className="text-xs">
                  {report.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  Generated: {formatDate(report.completed_at || report.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/api/reports/${report.id}/download`, '_blank')}
              title="Download HTML"
            >
              <Download className="h-4 w-4" />
              <span className="ml-1 text-xs">HTML</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/api/reports/${report.id}/pdf`, '_blank')}
              title="Export as PDF"
            >
              <FileText className="h-4 w-4" />
              <span className="ml-1 text-xs">PDF</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto bg-gray-50">
          {htmlContent ? (
            // Display HTML content in an iframe for better isolation
            <iframe
              srcDoc={htmlContent}
              className="w-full h-full border-0"
              title="Report Content"
              sandbox="allow-same-origin allow-popups"
            />
          ) : (
            // Fallback to markdown display
            <div className="p-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="prose prose-lg max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">
                    {report.markdown_content || report.content || 'No content available'}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}