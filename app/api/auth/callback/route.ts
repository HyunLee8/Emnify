import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  
  console.log('=== OAuth Callback ===')
  console.log('URL:', request.url)
  console.log('Code:', code ? 'present' : 'missing')
  console.log('Error param:', error)
  console.log('Error description:', errorDescription)
  
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }
  
  // If Spotify returned an error, redirect with error info
  if (error) {
    console.error('Spotify OAuth error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/dashboard?error=${error}&message=${encodeURIComponent(errorDescription || 'OAuth error')}`)
  }

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.session) {
      // Log what we got from the session
      console.log('Session after exchange:', {
        hasProviderToken: !!data.session.provider_token,
        hasProviderRefreshToken: !!data.session.provider_refresh_token,
        sessionKeys: Object.keys(data.session),
        user: data.user?.id
      })
      
      // If we have a user and provider token, we can optionally store it in user metadata
      if (data.user && data.session.provider_token) {
        // Store token in user metadata as backup
        await supabase.auth.updateUser({
          data: {
            spotify_access_token: data.session.provider_token,
            spotify_refresh_token: data.session.provider_refresh_token || null,
          }
        })
      }
      
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else if (error) {
      console.error('Error exchanging code for session:', error)
      // Redirect to dashboard with error message
      return NextResponse.redirect(`${origin}/dashboard?error=auth_failed&message=${encodeURIComponent(error.message)}`)
    }
  }

  // No code provided or other error - redirect to dashboard
  console.error('No code provided in callback')
  return NextResponse.redirect(`${origin}/dashboard?error=no_code`)
}