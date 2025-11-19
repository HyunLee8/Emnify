'use client'

export default function SpotifyButton() {
  const handleClick = async () => {
    window.location.href = 'http://localhost:3000/api/auth/spotify'
  }
  return (
    <button 
      onClick={handleClick}
      className=""
    >
      Spotify Button goes here
    </button>
  )
}