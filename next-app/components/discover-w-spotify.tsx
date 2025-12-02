'use client';

export default function DiscoverWithSpotify() {
  return (
    <button onClick={() => {document.getElementById("scroll-into")?.scrollIntoView({behavior: "smooth"})}} className="font-bold border rounded-full p-5 hover:bg-white hover:text-black transition duration-300">
          Discover with Spotify ↓
    </button>
  )
}