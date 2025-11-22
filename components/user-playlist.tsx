export default async function UserPlaylist() {
  type Playlist = { id: string, name: string }
  type PlaylistResponse = { items: Playlist[] }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/playlists`)

  const data: PlaylistResponse = await res.json()
  const playlists: PlaylistResponse = data;

  return (
    <div>
      {playlists?.items?.length
        ? playlists.items.map(p => <div key={p.id}>{p.name}</div>)
        : <p>No Playlists found</p>}
    </div>
  )
}