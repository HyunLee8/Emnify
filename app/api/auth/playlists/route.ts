import { getUserPlaylists, getSpotifyToken } from '../../../../lib/auth/spotify'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient()

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
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}