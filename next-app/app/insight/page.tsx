import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UserPlaylist from '@/components/playlist-list'
import ReturnDashboard from '@/components/return'

export default async function PlaylistInsights() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/api/auth/spotify')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <UserPlaylist />
      <ReturnDashboard />
    </main>
  )
}