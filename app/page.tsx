'use client'
import Link from 'next/link'
import SpotifySigninButton from '@/components/spotify-signin-button'
import TextType from '@/components/TextType';

export default function () {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className="font-bold text-7xl">Emnify</h1>
      <TextType
        text={["Novelty Based sorter", "Explore differents songs but same tastes", "5 times smarter than radio shuffle"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
      />
      <a href="auth/login" className="pt-5 pb-5 px-10 bg-black border rounded-full hover:bg-white hover:text-black transition-colors duration-300">Continue with Spotify</a>
    </main>
  )
}