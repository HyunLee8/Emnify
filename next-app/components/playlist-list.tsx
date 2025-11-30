import { createClient } from '@/lib/supabase/server'
import { getSpotifyToken, formatUserPlaylists } from '@/lib/auth/spotify'
import TiltedCard from '@/components/TiltedCard';


export default async function UserPlaylist() {

  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return (
      <div>
        <p className="text-red-500">Please sign in to view your playlists</p>
      </div>
    )
  }

  const { accessToken } = await getSpotifyToken(user.id)

  const formattedPlaylists = await formatUserPlaylists(accessToken)

  if (!formattedPlaylists || formattedPlaylists.length === 0) {
    return (
      <div>
        <p>You dont have any playlists yet</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-10">
        {formattedPlaylists.map(pl => (
          <TiltedCard
            key={pl.id}
            imageSrc={pl.image || ""}
            altText={pl.name}
            captionText={pl.name}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={19}
            scaleOnHover={1.3}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white font-bold p-3 bg-gradient-to-br from-[#4a4a4a] via-[#6b6b6b] to-[#3a3a3a] rounded-full mt-5 ml-7">
                {pl.name}
              </p>
            }
          />
        ))}
      </div>
    </div>
  );
  
}