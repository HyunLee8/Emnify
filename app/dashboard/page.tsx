import InsightsButton from '@/components/playlist-insights'
import CreatorButton from '@/components/playlist-creator'
import SimilarButton from '@/components/similar-playlists'

export default function dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center h-screen mt-20">
        <h1 className="text-4xl font-bold">Welcome to your Dashboard</h1>
        <div className="flex gap-15">
          <InsightsButton />
          <CreatorButton />
          <SimilarButton />
        </div>
        <h1></h1>
      </div>
    </main>
  )
}