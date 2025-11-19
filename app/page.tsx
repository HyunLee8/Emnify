import SpotifyButton from '@/components/spotify-login'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center h-screen">
        <SpotifyButton />
      </div>
    </main>
  );
}
