'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface VerifiedFinding {
  id: string
  scanId: string
  domain: string
  findingType: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  description: string
  status: 'pending' | 'verified' | 'rejected'
  verifiedAt?: string
  verifiedBy?: string
  notes?: string
}

export default function VerifiedPage() {
  const [findings, setFindings] = useState<VerifiedFinding[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchVerifiedFindings()
  }, [])

  const fetchVerifiedFindings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/verified')
      const data = await response.json()
      setFindings(data.findings || [])
    } catch (error) {
      console.error('Failed to fetch verified findings:', error)
      // Set dummy data for now
      setFindings([
        {
          id: '1',
          scanId: 'scan_123',
          domain: 'example.com',
          findingType: 'CLIENT_SIDE_SECRET_EXPOSURE',
          severity: 'CRITICAL',
          description: 'API key exposed in JavaScript bundle',
          status: 'pending'
        },
        {
          id: '2',
          scanId: 'scan_124',
          domain: 'test.com',
          findingType: 'TLS_CONFIGURATION_ISSUE',
          severity: 'MEDIUM',
          description: 'TLS 1.0 still enabled',
          status: 'verified',
          verifiedAt: '2024-01-15T10:30:00Z',
          verifiedBy: 'Security Team'
        },
        {
          id: '3',
          scanId: 'scan_125',
          domain: 'company.com',
          findingType: 'EXPOSED_SERVICE',
          severity: 'LOW',
          description: 'Development server accessible',
          status: 'rejected',
          verifiedAt: '2024-01-14T15:45:00Z',
          verifiedBy: 'Security Team',
          notes: 'False positive - intentionally public'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (findingId: string, action: 'verify' | 'reject', notes?: string) => {
    try {
      const response = await fetch(`/api/verified/${findingId}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      })

      if (response.ok) {
        // Update local state
        setFindings(prev => prev.map(finding => 
          finding.id === findingId 
            ? { 
                ...finding, 
                status: action === 'verify' ? 'verified' : 'rejected',
                verifiedAt: new Date().toISOString(),
                verifiedBy: 'Current User',
                notes
              }
            : finding
        ))
      }
    } catch (error) {
      console.error('Verification failed:', error)
    }
  }

  const filteredFindings = findings.filter(finding => {
    const matchesFilter = filter === 'all' || finding.status === filter
    const matchesSearch = finding.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.findingType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading verified findings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CheckCircle className="w-8 h-8 text-primary" />
          Verified Findings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage finding verification and maintain quality control
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {findings.filter(f => f.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-green-600">
                  {findings.filter(f => f.status === 'verified').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {findings.filter(f => f.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{findings.length}</p>
              </div>
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              {(['all', 'pending', 'verified', 'rejected'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search findings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Findings List */}
      <div className="space-y-4">
        {filteredFindings.map((finding) => (
          <Card key={finding.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getStatusIcon(finding.status)}
                    <Badge className={getSeverityColor(finding.severity)}>
                      {finding.severity}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{finding.domain}</span>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{finding.findingType.replace(/_/g, ' ')}</h3>
                  <p className="text-muted-foreground mb-3">{finding.description}</p>
                  
                  {finding.verifiedAt && (
                    <div className="text-sm text-muted-foreground">
                      {finding.status === 'verified' ? 'Verified' : 'Rejected'} by {finding.verifiedBy} on{' '}
                      {new Date(finding.verifiedAt).toLocaleDateString()}
                      {finding.notes && (
                        <div className="mt-1">
                          <span className="font-medium">Notes:</span> {finding.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {finding.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => handleVerification(finding.id, 'verify')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const notes = prompt('Reason for rejection (optional):')
                        handleVerification(finding.id, 'reject', notes || undefined)
                      }}
                      className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFindings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold mb-2">No findings found</h3>
            <p className="text-muted-foreground">
              {filter === 'all' 
                ? 'No findings available for verification' 
                : `No ${filter} findings match your search`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}