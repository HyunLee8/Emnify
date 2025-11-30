import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SpotifyLogout from '@/components/spotify-logout'
import DashboardWaffle from '@/components/dashboard-waffle'
import DecryptedText from '@/components/DecryptedText';


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
      <div className="flex flex-col items-center h-screen mt-10">
        <h1 className="text-3xl font-bold text-center mb-10 pt-5 pb-5 pl-10 pr-10 border rounded-full backdrop-blur-md bg-white/10">{user.user_metadata.name}&apos;s Dashboard</h1>
        <div className="flex gap-15 mt-8">
          <DashboardWaffle />
        </div>
        <SpotifyLogout />
      </div>
    </main>
  )
}