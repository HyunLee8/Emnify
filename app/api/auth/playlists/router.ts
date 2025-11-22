import { getUserPlaylists, getSpotifyToken } from '../../../../lib/auth/spotify'
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();
}