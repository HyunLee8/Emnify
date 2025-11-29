import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SpotifyLogout from '@/components/spotify-logout'
import { BentoDash } from '@/components/dashboard-bento'

export default async function dashboard({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams
  const error = params.error
  const errorMessage = params.message

  // Check if user is authenticated
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/api/auth/spotify')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center h-screen mt-20">
        <h1 className="text-4xl font-bold text-center">Welcome to your Dashboard {user.user_metadata.name
        }</h1>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl">
            <h2 className="text-red-800 font-bold mb-2">Authentication Error</h2>
            <p className="text-red-700 text-sm">
              {errorMessage ? decodeURIComponent(errorMessage) : 'An error occurred during authentication'}
            </p>
          </div>
        )}
        <div className="flex gap-15 mt-8 w-2/3">
          <BentoDash />
        </div>
        <SpotifyLogout />
      </div>

      <button></button>
    </main>
  )
}