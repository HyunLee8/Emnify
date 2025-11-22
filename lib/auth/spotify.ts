import { createClient } from '../supabase/server'

export async function signInWithSpotify() {

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      scopes: 'user-read-email',
      redirectTo: `http://localhost:3000/dashboard`
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

  // fetches the token by finding the userID and as a single item not a array
  const { data: session, error } = await supabase
  .from('sessions')
  .select('provider_token, provider_refresh_token')
  .eq('user_id', userID)
  .single()    

  if(error) throw error

  return {
    accessToken: session.provider_token,
    refreshToken: session.provider_refresh_token
  }

}

export async function getUserPlaylists(acessToken: string) {
  //Fetches the user's playlist from the API
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      // here it uses the token. Bearer is a type of token
      Authorization: `Bearer ${acessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch playlists from Spotify')
  }

  return response.json()
}