'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Users, Upload, FileText, AlertCircle } from 'lucide-react'

export default function BulkScanPage() {
  const [domains, setDomains] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<Array<{domain: string, scanId: string, status: string}>>([])

  const handleBulkScan = async () => {
    const domainList = domains.split('\n').filter(d => d.trim()).map(d => d.trim())
    
    if (domainList.length === 0) {
      alert('Please enter at least one domain')
      return
    }

    setIsScanning(true)
    setProgress(0)
    setResults([])

    try {
      const response = await fetch('/api/scans/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domains: domainList })
      })

      const data = await response.json()
      
      if (response.ok) {
        setResults(data.scans)
        setProgress(100)
      } else {
        throw new Error(data.error || 'Failed to start bulk scan')
      }
    } catch (error) {
      console.error('Bulk scan error:', error)
      alert('Failed to start bulk scan. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      // Simple CSV parsing - assume domains are in first column
      const lines = text.split('\n')
      const domainList = lines
        .map(line => line.split(',')[0].trim())
        .filter(domain => domain && domain !== 'domain' && domain !== 'Domain')
      
      setDomains(domainList.join('\n'))
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="w-8 h-8 text-primary" />
          Bulk Scan
        </h1>
        <p className="text-muted-foreground mt-2">
          Trigger security scans for multiple domains simultaneously
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Domain Input
            </CardTitle>
            <CardDescription>
              Enter domains manually or upload a CSV file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domains">Domains (one per line)</Label>
              <textarea
                id="domains"
                className="w-full h-40 p-3 border border-gray-200 rounded-md resize-none"
                placeholder="example.com&#10;company.com&#10;startup.io"
                value={domains}
                onChange={(e) => setDomains(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="file-upload">Or upload CSV file</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
              </div>
              <Upload className="w-5 h-5 text-muted-foreground mt-6" />
            </div>

            <Button 
              onClick={handleBulkScan} 
              disabled={isScanning || !domains.trim()}
              className="w-full"
            >
              {isScanning ? 'Starting Scans...' : 'Start Bulk Scan'}
            </Button>
          </CardContent>
        </Card>

        {/* Progress & Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Scan Progress
            </CardTitle>
            <CardDescription>
              Monitor bulk scan progress and results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isScanning && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Processing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {results.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Scan Results</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{result.domain}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          result.status === 'started' ? 'bg-green-100 text-green-700' : 
                          result.status === 'failed' ? 'bg-red-100 text-red-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {result.status}
                        </span>
                        {result.scanId && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/scans/${result.scanId}`, '_blank')}
                          >
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isScanning && results.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No scans started yet</p>
                <p className="text-sm">Enter domains and click "Start Bulk Scan"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Bulk Scanning</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Each domain will be scanned independently</li>
            <li>Large bulk scans may take time to process</li>
            <li>CSV files should have domains in the first column</li>
            <li>Invalid domains will be skipped automatically</li>
            <li>You can monitor individual scan progress from the "All Scans" page</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}