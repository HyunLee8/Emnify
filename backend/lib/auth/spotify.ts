import { createClient } from '../supabase/server'

async function signInWithSpotify() {
  const supabase = await createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      redirectTo: `https://fldaivpvboojmdlycehn.supabase.co/auth/v1/callback`,
    },
  })
}

async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
}