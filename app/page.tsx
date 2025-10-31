'use client'
import Link from 'next/link'
import SpotifySigninButton from '@/components/spotify-signin-button'

export default function() {
  return(
    <main className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className="font-bold text-5xl">Emnify</h1>
      <p>Create your own novel playlists</p>
      <SpotifySigninButton />
    </main>
  )
}