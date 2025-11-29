import { createClient } from '@/lib/supabase/server'
import { getSpotifyToken, formatUserPlaylists } from '@/lib/auth/spotify'

export default async function UserPlaylist() {

  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return (
      <div>
        <p className="text-red-500">Please sign in to view your playlists</p>
      </div>
    )
  }

  const { accessToken } = await getSpotifyToken(user.id)

  const formattedPlaylists = await formatUserPlaylists(accessToken)

  if (!formattedPlaylists || formattedPlaylists.length === 0) {
    return (
      <div>
        <p>You dont have any playlists yet</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2>You playlists</h2>
      <div className="flex gap-10">
        {formattedPlaylists.map(pl => (
          <div key={pl.id}>
            <img src={pl.image || ''} width={150} />
            <p>{pl.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}