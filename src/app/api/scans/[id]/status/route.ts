import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Get backend URL from environment (server-side only)
    const backendUrl = process.env.DEALBRIEF_BACKEND_URL || 'https://dealbrief-scanner.fly.dev'
    
    const response = await fetch(`${backendUrl}/scan/${id}/status`, {
      headers: {
        ...(process.env.DEALBRIEF_API_KEY && {
          'Authorization': `Bearer ${process.env.DEALBRIEF_API_KEY}`
        })
      }
    })

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to get scan status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}