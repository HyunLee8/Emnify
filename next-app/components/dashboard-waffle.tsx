import Link from 'next/link'
import TextType from '@/components/TextType';
import GradientText from '@/components/GradientText';

export default function DashboardWaffle() {
  return (
      <div className="flex flex-wrap justify-center gap-10 w-150 p-5 bg-[#191414] rounded-xl">
        <Link href="/insight" className="animate-pulse flex justify-center items-center w-64 h-64 p-10 border-[0.25px] border-white text-center rounded-lg transition-all duration-500 hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.8)]">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={10}
            showBorder={false}
            className="text-xl font-bold text-center"
          >
            Playlist Insights
          </GradientText>
        </Link>
        <Link href="" className="animate-pulse flex justify-center items-center w-64 h-64 p-10 border-[0.25px] border-white text-center rounded-lg transition-all duration-500 hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.8)]">
          <GradientText
            colors={["#a8ffbf", "#6fcf97", "#a8ffbf", "#6fcf97", "#a8ffbf"]}
            animationSpeed={10}
            showBorder={false}
            className="text-xl font-bold text-center"
          >
            Song Insights
          </GradientText>
        </Link>
        <Link href="" className="animate-pulse flex justify-center items-center w-64 h-64 p-10 border-[0.25px] border-white text-center rounded-lg transition-all duration-500 hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.8)]">
          <GradientText
            colors={["#ff6b6b", "#ff9e40", "#ffd740", "#ff9e40", "#ff6b6b"]}
            animationSpeed={10}
            showBorder={false}
            className="text-xl font-bold text-center"
          >
            Artist Insights
          </GradientText>
        </Link>
        <Link href="" className="animate-pulse flex justify-center items-center w-64 h-64 p-10 border-[0.25px] border-white text-center rounded-lg transition-all duration-500 hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.8)]">
          <GradientText
            colors={["#8a2be2", "#6a5acd", "#00bfff", "#6a5acd", "#8a2be2"]}
            animationSpeed={10}
            showBorder={false}
            className="text-xl font-bold text-center"
          >
            Playlist Generator
          </GradientText>
        </Link>
      </div>
  )
}