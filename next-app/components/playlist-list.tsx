import { createClient } from "@/lib/supabase/server";
import { getSpotifyToken, formatUserPlaylists } from "@/lib/auth/spotify";
import Link from "next/link";

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
    <div className="w-full flex flex-col items-center p-5 bg-stone-950 rounded-xl h-screen">
      <div className="flex w-full mb-3">
        <h1 className="mr-auto font-bold text-xl">Your Library</h1>
        <p className="text-4xl rounded-full">+</p>
      </div>
      <button className="mr-auto px-4 py-2 rounded-full bg-stone-700 mb-6">Playlists</button>
      <div className="grid grid-cols-1 gap-2">
        {formattedPlaylists.map((pl) => (
          <div key={pl.id} className="playlist-item flex py-2 pr-25 rounded-xl gap-3">
            <img
              src={pl.image || ""}
              alt={`Cover image for ${pl.name}`}
              className="playlist-cover w-15 h-15 object-cover rounded-xl"
            />
            <div className="flex flex-col justify-center">
              <p className="playlist-name text-white font-bold">{pl.name}</p>
              <p>Playlist • {user.user_metadata.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
