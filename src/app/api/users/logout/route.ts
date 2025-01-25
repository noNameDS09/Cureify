import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: 'User logged out successfully' },
      { status: 200 }
    )

    response.cookies.set('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, 
      path: '/', 
      sameSite: 'strict', 
    })

    response.cookies.set('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, 
      path: '/', 
      sameSite: 'strict', 
    })

    return response
  } catch (error) {
    console.error('Error during logout:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
