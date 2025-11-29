'use client'

export default function SpotifyLogout() {
  const handleClick = async () => {
    window.location.href = '/api/auth/signout'
  }

  return (
    <button
      type='button' onClick={handleClick}
      className="mt-10 px-6 py-3 bg-black text-white border rounded-xl hover:bg-white hover:text-black transition duration-700"
    >
      Sign out
    </button>
  )
}