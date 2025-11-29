'use client'
import Link from 'next/link'

export default function InsightsButton() {
  return (
    <Link href='/insight'>
      <button>Playlist Insights</button>
    </Link>
  )
}