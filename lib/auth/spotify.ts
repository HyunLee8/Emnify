import { createClient } from '../supabase/server'

export async function signInWithSpotify() {

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      redirectTo: `http://localhost:3000/dashboard`,
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