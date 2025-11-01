'use client'

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SpotifySigninButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 🔹 Force sign out first
      await supabase.auth.signOut();

      // 🔹 Then start a fresh Spotify login
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          redirectTo: `${window.location.origin}/protected`,
          // This forces Spotify to always show the login prompt:
          queryParams: { show_dialog: "true" },
        },
      });

      if (error) throw error;

      const url = (data as any)?.url;
      if (url) {
        window.location.assign(url);
        return;
      }

      router.push("/auth/sign-up-success");
    } catch (err: any) {
      console.error("Spotify sign-in failed:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={login} disabled={isLoading}>
      {isLoading ? "Signing in with Spotify..." : "Sign up with Spotify"}
    </Button>
  );
}
