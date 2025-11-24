import { createClient } from '../supabase/server'

export async function signInWithSpotify() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      scopes: 'user-read-email playlist-read-private playlist-read-collaborative',
      redirectTo: `http://localhost:3000/api/auth/callback?next=/dashboard`
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
  
  // Debug: Log session structure to see what's available
  console.log('Session keys:', Object.keys(session))
  console.log('Session provider_token:', session.provider_token)
  
  // The provider token should be in session.provider_token
  // Supabase stores OAuth provider tokens here when configured
  const providerToken = session.provider_token
  
  if (!providerToken) {
    console.error('Session object:', JSON.stringify(session, null, 2))
    throw new Error(
      'No Spotify provider token found in session. ' +
      'This usually means Supabase is not configured to store provider tokens. ' +
      'Check your Supabase dashboard: Authentication > Providers > Spotify > ' +
      'ensure "Store provider tokens" is enabled, or the token may need to be retrieved differently.'
    )
  }

  return {
    accessToken: providerToken,
    refreshToken: session.provider_refresh_token
  }
}

export async function getUserPlaylists(accessToken: string) {
  //Fetches the user's playlist from the API
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      // here it uses the token. Bearer is a type of token
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch playlists from Spotify')
  }

  return response.json()
}