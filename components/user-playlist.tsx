import { createClient } from '@/lib/supabase/server'
import { getSpotifyToken, getUserPlaylists } from '@/lib/auth/spotify'

export default async function UserPlaylist() {
  type Playlist = { id: string, name: string }
  type PlaylistResponse = { items: Playlist[] }

  try {
    // Get user and session directly (server component has access to cookies)
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return (
        <div>
          <p className="text-red-500">Please sign in to view your playlists</p>
        </div>
      )
    }

    // Get Spotify token and playlists directly
    const { accessToken } = await getSpotifyToken(user.id)
    
    const playlists = await getUserPlaylists(accessToken)
    
    // Verify the playlists belong to the logged-in user
    console.log('User ID from Supabase:', user.id)
    console.log('User email from Supabase:', user.email)
    console.log('Spotify API response:', JSON.stringify(playlists, null, 2))
    console.log('Response keys:', Object.keys(playlists))
    console.log('Has items?', 'items' in playlists)
    console.log('Items type:', typeof playlists.items)
    console.log('Items is array?', Array.isArray(playlists.items))
    console.log('Items length:', playlists.items?.length)

    // Spotify API returns { items: [...], total: number, ... }
    if (!playlists.items || !Array.isArray(playlists.items)) {
      console.log('No items array found in response')
      return (
        <div>
          <p>No playlists found</p>
          <p className="text-sm text-gray-500 mt-2">
            Response structure: {JSON.stringify(Object.keys(playlists))}
          </p>
        </div>
      )
    }

    if (playlists.items.length === 0) {
      return (
        <div>
          <p>You dont have any playlists yet</p>
        </div>
      )
    }

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Your Public Playlists</h2>
        {playlists.items.length > 0 ? (
          <ul className="space-y-3">
            {playlists.items.map((p: Playlist) => (
              <li key={p.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium">{p.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No playlists found</p>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching playlists:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return (
      <div>
        <p className="text-red-500">
          Failed to load playlists: {errorMessage}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Check the server terminal for more details
        </p>
      </div>
    )
  }
}