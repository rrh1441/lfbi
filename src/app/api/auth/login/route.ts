import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const sitePassword = process.env.SITE_PASSWORD

    if (!sitePassword) {
      console.error('SITE_PASSWORD environment variable not set')
      return NextResponse.json(
        { error: 'Site configuration error' },
        { status: 500 }
      )
    }

    if (password === sitePassword) {
      const response = NextResponse.json({ success: true })
      
      // Set a secure httpOnly cookie
      response.cookies.set('site-authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })

      return response
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}