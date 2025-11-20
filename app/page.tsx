import SpotifyButton from '@/components/spotify-login'
import TextType from '../components/TextType'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h1 className="font-bold text-7xl">EMNIFY</h1>
        <TextType
          text={["Emanate your own Spotify Playlist through a Novelty Based Model", "5 times smarter than smart shuffle and no overlaps", "Generate stats and insights on your listening habits"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
        <SpotifyButton />
      </div>
    </main>
  );
}
