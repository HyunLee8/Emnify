import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SpotifyLogout from '@/components/spotify-logout'
import { BentoDash } from '@/components/dashboard-bento'

export default async function dashboard({
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {

  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/api/auth/spotify')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center h-screen mt-15">
        <h1 className="text-4xl font-bold text-center mb-10">Dashboard {user.user_metadata.name}</h1>
        <div className="flex gap-15 mt-8 w-2/3">
          <BentoDash />
        </div>
        <SpotifyLogout />
      </div>
    </main>
  )
}