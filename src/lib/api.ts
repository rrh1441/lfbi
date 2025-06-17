const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dealbrief-scanner.fly.dev'

export interface Scan {
  id: string
  scanId: string
  companyName: string
  domain: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  createdAt: string
  findings: Finding[]
}

export interface Finding {
  id: string
  type: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  description: string
  recommendation: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  async startScan(companyName: string, domain: string): Promise<{ scanId: string }> {
    const response = await fetch(`${this.baseUrl}/api/scans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName,
        domain,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to start scan: ${response.statusText}`)
    }

    return response.json()
  }

  async getScans(): Promise<Scan[]> {
    const response = await fetch(`${this.baseUrl}/api/scans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get scans: ${response.statusText}`)
    }

    return response.json()
  }

  async getScan(scanId: string): Promise<Scan> {
    const response = await fetch(`${this.baseUrl}/api/scans/${scanId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get scan: ${response.statusText}`)
    }

    return response.json()
  }
}

export const api = new ApiClient()