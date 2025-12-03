import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UserPlaylist from "@/components/playlist-list";
import ReturnDashboard from "@/components/return";

export default async function PlaylistInsights() {

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/api/auth/spotify");
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mr-auto ml-30 justify-center items-center py-70">
        <h2 className="text-3xl mt-10">Playlist Insights</h2>
        <h1 className="text-6xl max-w-200 mt-3">Using a novelty Model to handle your playlist insights </h1>
        <h2 className="font-bold text-2xl mt-5">Start review now ↓</h2>
      </div>
      <div className="mr-auto ml-10 mt-30">
        <UserPlaylist />
      </div>
      <div className="mt-20 flex flex-col items-center gap-10">
        <div className="mt-20">
          <ReturnDashboard />
        </div>
      </div>
    </main>
  );
}