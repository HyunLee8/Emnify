import SpotifyButton from '@/components/spotify-login'
import TextType from '../components/TextType'
import GradientText from '../components/GradientText'
import Image from 'next/image'
import logo from '../assets/logo.png'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <div className="flex items-center">
        <Image src={logo} alt="Logo" width={100} height={80} className="ml-4 mt-1" />
          <h1 className="text-7xl font-bold mr-20">EMNIFY</h1>
        </div>
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
