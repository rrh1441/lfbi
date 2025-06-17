'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter,
  Shield,
  Loader2
} from 'lucide-react'
import { Finding } from '@/lib/types/database'

interface FindingWithScan extends Finding {
  scan_status: {
    company_name: string
    domain: string
  }
}

function FindingsContent() {
  const searchParams = useSearchParams()
  const [selectedFindings, setSelectedFindings] = useState<string[]>([])
  const [filters, setFilters] = useState({
    severity: searchParams.get('severity') || '',
    state: '',
    search: ''
  })

  const { data: findings, isLoading, refetch } = useQuery<FindingWithScan[]>({
    queryKey: ['all-findings', filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(filters.severity && { severity: filters.severity }),
        ...(filters.state && { state: filters.state }),
        ...(filters.search && { search: filters.search })
      })
      
      const response = await fetch(`/api/findings?${params}`)
      if (!response.ok) throw new Error('Failed to fetch findings')
      return response.json()
    }
  })

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
        await refetch()
        setSelectedFindings([])
      }
    } catch (error) {
      console.error('Failed to verify findings:', error)
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

  const verifiedCount = findings?.filter(f => f.state === 'VERIFIED').length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Security Findings</h1>
          <p className="text-muted-foreground">
            {verifiedCount} verified of {findings?.length || 0} total findings across all scans
          </p>
        </div>
        
        <div className="flex gap-2">
          {selectedFindings.length > 0 && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Findings</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{findings?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {findings?.filter(f => f.severity === 'CRITICAL').length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {findings?.filter(f => f.state === 'AUTOMATED').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

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
                  <SelectItem value="">All severities</SelectItem>
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
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="AUTOMATED">Automated</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="FALSE_POSITIVE">False Positive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Findings Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedFindings.length === findings?.length && findings.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked && findings) {
                          setSelectedFindings(findings.map(f => f.id))
                        } else {
                          setSelectedFindings([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {findings?.map((finding) => (
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
                      <div>
                        <p className="font-medium">{finding.scan_status.company_name}</p>
                        <p className="text-xs text-muted-foreground">{finding.scan_status.domain}</p>
                      </div>
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
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground truncate">
                        {finding.recommendation}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {!isLoading && (!findings || findings.length === 0) && (
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
    </div>
  )
}

export default function FindingsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <FindingsContent />
    </Suspense>
  )
}