'use client' 

export default function SpotifyLogout () {
  const handleClick = async () => {
    window.location.href = '/api/auth/signout'
  }

  return (
    <button type='button' onClick={handleClick}> Sign out</button>
  )
}