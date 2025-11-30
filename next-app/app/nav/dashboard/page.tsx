import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SpotifyLogout from '@/components/spotify-logout'
import DashboardWaffle from '@/components/dashboard-waffle'
import TextType from '@/components/TextType';
import Link from 'next/link';

export default async function dashboard() {

  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/api/auth/spotify')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <Link href="/playlists" className="pt-1 pb-1 pl-2 pr-2 border rounded-full">Trending now →</Link>
        <h1 className="text-center text-5xl max-w-150">AI-powered insights and playlist creation</h1>
        <TextType
          text={["Emanate your own Spotify Playlist through a Novelty Based Model", "5 times smarter than smart shuffle and no overlaps", "Generate stats and insights on your listening habits"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
        <button className="font-bold border rounded-full p-5 hover:bg-white hover:text-black transition duration-300">
          Discover with Spotify
        </button>
      </div>
      <div className="flex flex-col items-center h-screen mt-5">
        <h1 className="text-3xl font-bold text-center pt-5 pb-5 pl-30 pr-30 border rounded-full backdrop-blur-md bg-white/10">{user.user_metadata.name}&apos;s Dashboard</h1>
        <div className="flex gap-15 mt-5">
          <DashboardWaffle />
        </div>
        <SpotifyLogout />
      </div>
    </main>
  )
}