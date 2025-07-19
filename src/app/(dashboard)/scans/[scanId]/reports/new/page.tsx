'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Building, Shield, Camera, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

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

export default function CreateReportsPage() {
  const params = useParams()
  const router = useRouter()
  const scanId = params.scanId as string
  const [selectedReports, setSelectedReports] = useState<string[]>(['threat_snapshot'])

  const { data: scanData, isLoading: scanLoading } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: async () => {
      const response = await fetch(`/api/scans/${scanId}`)
      if (!response.ok) throw new Error('Failed to fetch scan')
      return response.json()
    }
  })

  const { data: findings } = useQuery({
    queryKey: ['findings', scanId],
    queryFn: async () => {
      const response = await fetch(`/api/findings?scanId=${scanId}`)
      if (!response.ok) throw new Error('Failed to fetch findings')
      const allFindings = await response.json()
      return allFindings
    }
  })

  const generateReportsMutation = useMutation({
    mutationFn: async () => {
      const results = []
      
      for (const reportType of selectedReports) {
        const response = await fetch('/api/reports/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scanId,
            reportType,
            findings,
            companyName: scanData?.company_name,
            domain: scanData?.domain
          })
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || `Failed to generate ${reportType}`)
        }
        
        results.push(await response.json())
      }
      
      return results
    },
    onSuccess: () => {
      toast.success('Reports generated successfully!')
      router.push(`/scans/${scanId}/reports`)
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to generate reports')
    }
  })

  const toggleReport = (reportType: string) => {
    setSelectedReports(prev => 
      prev.includes(reportType) 
        ? prev.filter(r => r !== reportType)
        : [...prev, reportType]
    )
  }

  if (scanLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const verifiedFindingsCount = findings?.length || 0

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/scans/${scanId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scan
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Generate Reports</h1>
        <p className="text-gray-600">{scanData?.company_name} • {scanData?.domain}</p>
      </div>

      {/* Findings Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Verified Findings:</span> {verifiedFindingsCount}
            </p>
            {verifiedFindingsCount === 0 && (
              <p className="text-sm text-amber-600">
                Note: No verified findings found. Reports will contain limited information.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Reports to Generate</CardTitle>
          <CardDescription>
            Choose which reports you&apos;d like to generate. Each report is tailored for different audiences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(REPORT_TYPES).map(([reportType, config]) => {
            const IconComponent = config.icon
            const isSelected = selectedReports.includes(reportType)
            
            return (
              <div
                key={reportType}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleReport(reportType)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleReport(reportType)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <IconComponent className={`h-5 w-5 mt-0.5 ${config.color}`} />
                  <div className="flex-1">
                    <Label className="text-base font-medium cursor-pointer">
                      {config.title}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {config.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Generation time: {config.time}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href={`/scans/${scanId}/reports`}>Cancel</Link>
        </Button>
        <Button
          onClick={() => generateReportsMutation.mutate()}
          disabled={selectedReports.length === 0 || generateReportsMutation.isPending}
        >
          {generateReportsMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating {selectedReports.length} {selectedReports.length === 1 ? 'Report' : 'Reports'}...
            </>
          ) : (
            <>Generate {selectedReports.length} {selectedReports.length === 1 ? 'Report' : 'Reports'}</>
          )}
        </Button>
      </div>
    </div>
  )
}