'use client'

import { useState } from "react"
import { signInWithSpotify } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SpotifySigninButton () {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async() => {
    setLoading(true);
    try {
      const { data, error } = await signInWithSpotify();
      if(error) {
        console.log('Spotify sing-in error', error);
        return;
      }

      const url = (data as any)?.url;
      if (url) {
        window.location.assign(url);
      } else {
        router.push('/')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={() => void login()} disabled={loading}>
      {loading ? 'Signing in with Spotify' : 'Signup with Spotify'}
    </Button>
  )
}