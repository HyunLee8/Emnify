import { getUserPlaylists, getSpotifyToken } from '../../../../lib/auth/spotify'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log("=== Playlists API called ===")
    const supabase = await createClient()

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error getting user:", userError)
      return NextResponse.json({ error: `Auth error: ${userError.message}` }, { status: 401 });
    }

    if (!user) {
      console.log("No user found")
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
    }

    console.log("User found:", user.id)
    console.log("Attempting to get Spotify token...")
    
    const { accessToken } = await getSpotifyToken(user.id);
    console.log("Got access token, length:", accessToken?.length || 0)
    
    console.log("Fetching playlists from Spotify...")
    const playlists = await getUserPlaylists(accessToken);
    console.log("SPOTIFY RESPONSE:", playlists);

    return NextResponse.json(playlists);
  } catch (error) {
    console.error("=== API ERROR ===")
    console.error("Error:", error);
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}