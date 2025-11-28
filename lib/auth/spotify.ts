import { createClient } from '../supabase/server'

export async function signInWithSpotify() {
  const supabase = await createClient()

  // Always start from a clean Supabase session so a different Spotify account can be used.
  await supabase.auth.signOut().catch(() => {
    // ignore if there is no active session
  })

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      scopes: 'user-read-email playlist-read-private playlist-read-collaborative',
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?next=/dashboard`,
      // Force Spotify to show the account picker so users can switch accounts.
      queryParams: {
        show_dialog: 'true',
      },
    },
  })

  if (error) {
    console.error('Supabase OAuth error:', error)
    throw error
  }
  if (!data.url) {
    throw new Error('No URL returned from Spotify OAuth sign-in')
  }
  console.log("OAuth URL:", data.url)
  return data.url
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if ( error ) throw error
}

export async function getSpotifyToken(userID: string) {
  const supabase = await createClient()

  // Get the current session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) throw sessionError
  if (!session) throw new Error('No active session found')
  
  // Verify the session belongs to the requested user
  if (session.user.id !== userID) {
    console.error('Session user mismatch!', {
      requestedUserID: userID,
      sessionUserID: session.user.id
    })
    throw new Error('Session user does not match requested user')
  }
  
  console.log('Session verified for user:', session.user.id, session.user.email)
  
  // Try to get token from session.provider_token first (preferred method)
  let providerToken = session.provider_token
  let providerRefreshToken = session.provider_refresh_token
  
  // If not in session, try to get from user metadata (backup method)
  if (!providerToken) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (!userError && user?.user_metadata) {
      // Verify this is the same user
      if (user.id !== userID) {
        throw new Error('User metadata user does not match requested user')
      }
      providerToken = user.user_metadata.spotify_access_token
      providerRefreshToken = user.user_metadata.spotify_refresh_token
      console.log('Got token from user metadata for user:', user.id)
    }
  }
  
  // Debug logging
  console.log('Token retrieval:', {
    requestedUserID: userID,
    sessionUserID: session.user.id,
    fromSession: !!session.provider_token,
    fromMetadata: !!providerToken && !session.provider_token,
    hasToken: !!providerToken
  })
  
  if (!providerToken) {
    console.error('Session keys:', Object.keys(session))
    throw new Error(
      'No Spotify provider token found. ' +
      'Please sign out and sign in again with Spotify. ' +
      'If the problem persists, check your Supabase dashboard: ' +
      'Authentication > Providers > Spotify configuration.'
    )
  }

  return {
    accessToken: providerToken,
    refreshToken: providerRefreshToken
  }
}

export async function getUserPlaylists(accessToken: string) {
  // Fetches the user's playlists from the Spotify API
  // Spotify returns playlists in pages (default limit is 20)
  // We'll fetch up to 50 playlists per request
  console.log('Fetching playlists from Spotify API...')
  console.log('Token length:', accessToken?.length || 0)
  
  const limit = 50 // Maximum allowed by Spotify
  const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  console.log('Spotify API response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    let errorMessage = `Failed to fetch playlists from Spotify (${response.status})`
    
    try {
      const errorData = JSON.parse(errorText)
      errorMessage = errorData.error?.message || errorMessage
      console.error('Spotify API error:', errorData)
    } catch {
      console.error('Spotify API error response:', errorText)
    }
    
    throw new Error(errorMessage)
  }

  const data = await response.json()
  console.log('=== Spotify API Response ===')
  console.log('Total playlists (reported):', data.total)
  console.log('Items in this page:', data.items?.length)
  console.log('Has next page?', !!data.next)
  console.log('Response keys:', Object.keys(data))
  
  // Verify we got playlists for the correct user by checking the API
  // We can also verify by calling /v1/me to get the Spotify user info
  const meResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  
  if (meResponse.ok) {
    const meData = await meResponse.json()
    console.log('Spotify user info:', {
      id: meData.id,
      display_name: meData.display_name,
      email: meData.email
    })
  }
  
  // Log first few playlist names for debugging
  if (data.items && data.items.length > 0) {
    console.log('First 3 playlists:', data.items.slice(0, 3).map((p: any) => ({ 
      name: p.name, 
      id: p.id,
      owner: p.owner?.display_name || p.owner?.id
    })))
  } else {
    console.log('WARNING: Items array is empty or missing!')
    console.log('Full response:', JSON.stringify(data, null, 2))
  }
  
  // Handle pagination - if there are more playlists, fetch them
  let allPlaylists = data.items || []
  let nextUrl = data.next
  
  // Fetch additional pages if needed (up to a reasonable limit)
  let pageCount = 1
  const maxPages = 10 // Limit to prevent infinite loops
  
  while (nextUrl && pageCount < maxPages) {
    console.log(`Fetching page ${pageCount + 1}...`)
    const nextResponse = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    
    if (!nextResponse.ok) {
      console.warn(`Failed to fetch page ${pageCount + 1}:`, nextResponse.status)
      break
    }
    
    const nextData = await nextResponse.json()
    allPlaylists = [...allPlaylists, ...(nextData.items || [])]
    nextUrl = nextData.next
    pageCount++
  }
  
  console.log(`Fetched ${pageCount} page(s), total playlists: ${allPlaylists.length}`)
  
  // Return the data with all playlists
  return {
    ...data,
    items: allPlaylists,
    total: data.total || allPlaylists.length
  }
}