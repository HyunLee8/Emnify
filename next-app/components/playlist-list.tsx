import { createClient } from "@/lib/supabase/server";
import { getSpotifyToken, formatUserPlaylists } from "@/lib/auth/spotify";

export default async function UserPlaylist() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return (
      <div>
        <p className="text-red-500">Please sign in to view your playlists</p>
      </div>
    );
  }

  const { accessToken } = await getSpotifyToken(user.id);

  const formattedPlaylists = await formatUserPlaylists(accessToken);

  if (!formattedPlaylists || formattedPlaylists.length === 0) {
    return (
      <div>
        <p>You dont have any playlists yet</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      <h1 className="mr-auto font-bold text-3xl">You playlists</h1>
      <div className="grid grid-cols-1 gap-5">
        {formattedPlaylists.map((pl) => (
          <div key={pl.id} className="playlist-item flex items-center py-2 pl-4 pr-25 border border-white rounded-xl gap-20">
            <img
              src={pl.image || ""}
              alt={`Cover image for ${pl.name}`}
              className="playlist-cover w-15 h-15 object-cover rounded-xl"
            />
            <p className="playlist-name text-white font-bold">{pl.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
