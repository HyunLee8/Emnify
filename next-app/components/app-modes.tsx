import Link from 'next/link'
import GradientText from '@/components/GradientText'

export default function Modes() {
  return (
    <div className="flex flex-col items-center justify-center gap-100 text-center pt-20">
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl font-bold" >Playlist Insights</h1>
        <h2 className="max-w-120 text-xl">Analyze your music habits with detailed playlist performance insights</h2>
        <Link href='/nav/insight' className="font-bold border pt-5 pb-5 px-12 hover:bg-white hover:text-black transition duration-300">
          Continue
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl font-bold" >Song Insights</h1>
        <h2 className="max-w-120 text-xl">Discover detailed analytics and trends for each song you love</h2>
        <Link href='/nav/insight' className="font-bold border pt-5 pb-5 px-12 hover:bg-white hover:text-black transition duration-300">
          Continue
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl font-bold" >Artist Insights</h1>
        <h2 className="max-w-120 text-xl">Gain in-depth analytics and trends about your favorite artists</h2>
        <Link href='/nav/insight' className="font-bold border pt-5 pb-5 px-12 hover:bg-white hover:text-black transition duration-300">
          Continue
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class text-5xl font-bold"
        >
          Playlist Creator
        </GradientText>
        <h2 className="max-w-120 text-xl">Manage and organize your playlists effortlessly with ease.</h2>
        <Link href='/nav/insight' className="font-bold border pt-5 pb-5 px-12 hover:bg-white hover:text-black transition duration-300">
          Continue
        </Link>
      </div>
    </div>
  )
}