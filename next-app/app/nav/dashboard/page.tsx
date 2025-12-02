import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SpotifyLogout from '@/components/spotify-logout'
import Modes from '@/components/app-modes'
import TextType from '@/components/TextType';
import DiscoverWithSpotify from '@/components/discover-w-spotify';
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
        <Link href="/playlists" className="py-1 px-2 border rounded-full">Trending now →</Link>
        <h1 className="text-center text-5xl max-w-150">AI-powered insights and playlist creation</h1>
        <TextType
          text={["Emanate your own Spotify Playlist through a Novelty Based Model", "5 times smarter than smart shuffle and no overlaps", "Generate stats and insights on your listening habits"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
        <DiscoverWithSpotify />
        <div id="scroll-into"></div>
      </div>
      <div className="flex flex-col items-center h-screen">
        <div className="flex gap-15 mb-100">
          <Modes />
        </div>
          <SpotifyLogout />
      </div>
    </main>
  )
}