import { getUserPlaylists, getSpotifyToken } from '../../../../lib/auth/spotify'
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
    }

    const { accessToken } = await getSpotifyToken(user.id);
    const playlists = await getUserPlaylists(accessToken);
    console.log("SPOTIFY RESPONSE:", playlists);

    return NextResponse.json(playlists);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}