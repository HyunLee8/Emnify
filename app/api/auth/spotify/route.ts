import { signInWithSpotify } from '../../../../lib/auth/spotify'
import { NextResponse } from 'next/server'

export async function GET() {
  const url = await signInWithSpotify()
  const response = NextResponse.redirect(url)
  
  return response
}