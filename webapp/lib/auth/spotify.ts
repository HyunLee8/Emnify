import { createClient } from '../supabase/server'

export async function signInWithSpotify() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      redirectTo: `https://localhost:3000/api/auth/callback`,
    },
  })

  if (error) throw error
  if (!data.url) throw new Error('No URL returned from Spotify OAuth sign-in')

  return data.url
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if ( error ) throw error
}