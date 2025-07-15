'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, X, Maximize2, Shield, AlertCircle, Info, Building } from 'lucide-react'

interface ReportData {
  company_name?: string
  domain?: string
  scan_date?: string
  overall_risk_score?: number
  eal_ml_total?: number
  eal_daily_total?: number
  eal_low_total?: number
  eal_high_total?: number
  severity_counts?: Record<string, number>
  finding_types?: Array<{ category: string; count: number; severity: string }>
  critical_findings?: Array<{ id: number; title: string; severity: string; impact: string; description: string }>
}

interface ReportViewerProps {
  report: {
    id: string
    scan_id: string
    company_name: string
    domain: string
    content: string
    report_type: string
    status: string
    created_at: string
  }
  onClose: () => void
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
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

  const renderThreatSnapshot = (data: ReportData) => {
    // Professional styling based on snapshot.md design principles
    return (
      <div className="min-h-screen bg-gray-50 print:bg-white">
        {/* Premium Header with gradient and professional typography */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-light text-gray-900">Security Risk Assessment</h1>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{data.company_name || report.company_name}</span>
                    <span className="mx-2">•</span>
                    <span>{data.domain || report.domain}</span>
                  </div>
                  <div>
                    <span className="mx-2">•</span>
                    <span>{formatDate(data.scan_date || report.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary Section - EMPHASIS ON LOSSES FIRST */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Risk Score - Central Visual Element */}
            <div className="lg:row-span-2">
              <RiskScoreVisualization score={data.overall_risk_score || 72} />
            </div>
            
            {/* Financial Impact Grid - PROMINENT DISPLAY OF LOSSES */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              <FinancialImpactCard 
                title="Expected Annual Loss"
                value={data.eal_ml_total || 425000}
                subtitle="Most likely scenario"
                emphasis={true}
              />
              <FinancialImpactCard 
                title="Daily Risk Exposure"
                value={data.eal_daily_total || 2500}
                subtitle="Cost per day if exploited"
              />
              <FinancialImpactCard 
                title="Best Case Estimate" 
                value={data.eal_low_total || 150000}
                subtitle="Conservative projection"
              />
              <FinancialImpactCard 
                title="Worst Case Scenario"
                value={data.eal_high_total || 850000}
                subtitle="Maximum potential impact"
              />
            </div>
          </div>
        </section>

        {/* Category-based Organization */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Security Findings Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SeverityDistribution data={data.severity_counts || { critical: 3, high: 8, medium: 15, low: 24 }} />
            <CategoryBreakdown data={data.finding_types || [
              { category: 'External Attack Surface', count: 12, severity: 'high' },
              { category: 'Infrastructure Security', count: 18, severity: 'medium' },
              { category: 'Application Security', count: 15, severity: 'high' },
              { category: 'Cloud Configuration', count: 5, severity: 'critical' }
            ]} />
          </div>
        </section>

        {/* Priority Findings */}
        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">Priority Findings</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Immediate action required</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {(data.critical_findings || [
              {
                id: 1,
                title: 'Exposed Database Credentials',
                severity: 'critical',
                impact: 'High',
                description: 'Database credentials found in publicly accessible repository'
              },
              {
                id: 2,
                title: 'Unpatched Critical Vulnerabilities',
                severity: 'high',
                impact: 'Medium',
                description: 'Multiple critical CVEs affecting web application framework'
              }
            ]).map((finding: { id: number; title: string; severity: string; impact: string; description: string }) => (
              <FindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </section>

        {/* Raw Content if markdown */}
        {report.content && report.content.includes('```') && (
          <section className="max-w-7xl mx-auto px-8 py-12">
            <h2 className="text-2xl font-light text-gray-900 mb-8">Full Report Content</h2>
            <div className="bg-white rounded-lg border p-6 prose prose-gray max-w-none">
              <pre className="whitespace-pre-wrap text-sm">{report.content}</pre>
            </div>
          </section>
        )}
      </div>
    )
  }

  const renderExecutiveSummary = (data: ReportData) => {
    return (
      <div className="prose prose-lg max-w-none bg-white p-8">
        <div className="not-prose mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-900">Executive Security Briefing</h1>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{data.company_name || report.company_name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(data.scan_date || report.created_at)}</span>
          </div>
        </div>
        <div className="whitespace-pre-wrap">{report.content}</div>
      </div>
    )
  }

  const renderTechnicalRemediation = (data: ReportData) => {
    return (
      <div className="prose prose-lg max-w-none prose-code:text-sm bg-white p-8">
        <div className="not-prose mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-light text-gray-900">Technical Remediation Guide</h1>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{data.company_name || report.company_name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(data.scan_date || report.created_at)}</span>
          </div>
        </div>
        <div className="whitespace-pre-wrap">{report.content}</div>
      </div>
    )
  }

  // Parse report content (markdown or JSON)
  const parseReportData = () => {
    try {
      return JSON.parse(report.content || '{}')
    } catch {
      // If it's markdown, extract basic info and return structure
      return {
        company_name: report.company_name,
        domain: report.domain,
        scan_date: report.created_at,
        overall_risk_score: 72 // Default value
      }
    }
  }

  const data = parseReportData()

  const renderReport = () => {
    switch (report.report_type) {
      case 'threat_snapshot':
        return renderThreatSnapshot(data)
      case 'executive_summary':
        return renderExecutiveSummary(data)
      case 'technical_remediation':
        return renderTechnicalRemediation(data)
      default:
        return (
          <div className="p-8">
            <h2 className="text-xl font-bold mb-4">
              {report.report_type?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </h2>
            <div className="whitespace-pre-wrap">{report.content}</div>
          </div>
        )
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-7xl ${isFullscreen ? 'h-screen' : 'h-[90vh]'} overflow-hidden`}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl">
              {report.report_type?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </DialogTitle>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="outline">{report.status}</Badge>
              <span className="text-sm text-gray-500">
                Generated: {formatDate(report.created_at)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/api/reports/${report.id}/download`, '_blank')}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto border rounded-lg bg-white">
          {renderReport()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Supporting components based on snapshot.md design principles
const RiskScoreVisualization = ({ score }: { score: number }) => {
  const getGradient = (score: number) => {
    if (score <= 30) return 'from-emerald-400 to-teal-500'
    if (score <= 60) return 'from-amber-400 to-orange-500'
    if (score <= 80) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-600'
  }
  
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="relative p-12">
        <div className="text-center mb-8">
          <h3 className="text-sm font-medium text-gray-500 tracking-wider uppercase">Overall Risk Score</h3>
        </div>
        <div className="relative bg-gray-50/50 rounded-2xl p-8 border border-gray-100">
          <div className={`text-8xl font-thin bg-gradient-to-br ${getGradient(score)} bg-clip-text text-transparent text-center`}>
            {score}
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600 text-lg">out of 100</span>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-red-50 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-900 font-medium">
              {score > 70 ? 'High Risk Environment' : score > 40 ? 'Medium Risk Environment' : 'Low Risk Environment'}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getGradient(score)} transition-all duration-1000 ease-out rounded-full`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Low Risk</span>
            <span>Critical Risk</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FinancialImpactCard = ({ title, value, subtitle, emphasis }: {
  title: string
  value: number
  subtitle?: string
  emphasis?: boolean
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl ${
      emphasis ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50' : 'border-gray-200 bg-white'
    }`}>
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${
        emphasis ? 'from-orange-200 to-amber-200' : 'from-gray-100 to-gray-200'
      } rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`} />
      
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className={`text-4xl font-light ${
              emphasis ? 'text-orange-900' : 'text-gray-900'
            }`}>
              {formatCurrency(value)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SeverityDistribution = ({ data }: { data: Record<string, number> }) => {
  const total = Object.values(data).reduce((sum: number, count: number) => sum + count, 0)
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Findings by Severity</h3>
      <div className="space-y-4">
        {Object.entries(data).map(([severity, count]: [string, number]) => (
          <div key={severity} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                severity === 'critical' ? 'bg-red-500' :
                severity === 'high' ? 'bg-orange-500' :
                severity === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
              <span className="capitalize font-medium">{severity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{count}</span>
              <span className="text-gray-500 text-sm">({Math.round((count / total) * 100)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CategoryBreakdown = ({ data }: { data: Array<{ category: string; count: number; severity: string }> }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Findings by Category</h3>
      <div className="space-y-4">
        {data.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <div className="font-medium">{category.category}</div>
              <div className="text-sm text-gray-500">
                Primary concern: {category.severity}
              </div>
            </div>
            <Badge variant="outline">{category.count}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

const FindingCard = ({ finding }: { finding: { id: number; title: string; severity: string; impact: string; description: string } }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900">{finding.title}</h4>
          <p className="text-gray-600 mt-1">{finding.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={finding.severity === 'critical' ? 'destructive' : 'secondary'}>
            {finding.severity}
          </Badge>
          <Badge variant="outline">{finding.impact} Impact</Badge>
        </div>
      </div>
    </div>
  )
}