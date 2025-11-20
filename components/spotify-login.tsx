'use client'

export default function SpotifyButton() {
  const handleClick = async () => {
    window.location.href = '/api/auth/spotify'
  }
  return (
    <button 
      onClick={handleClick}
      className="font-bold border rounded-full p-5 hover:bg-white hover:text-black transition duration-300"
    >
      Spotify Button goes here
    </button>
  )
}