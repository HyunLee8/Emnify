import { signInWithSpotify } from '../../../../lib/auth/spotify'
import { NextResponse } from 'next/server'

export async function GET() {
    const url = await signInWithSpotify()
    return NextResponse.redirect(url)
}
