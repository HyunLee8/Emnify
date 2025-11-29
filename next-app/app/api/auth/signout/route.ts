import { signOut } from '@/lib/auth/spotify'
import { NextResponse } from 'next/server'

export async function GET() {
  await signOut()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}