import Image from "next/image"

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons"

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

const features = [
  {
    Icon: FileTextIcon,
    name: "Playlist Creator",
    description: "We automatically save your files as you type.",
    href: "/creator",
    cta: "Continue creating",
    background: <Image src="/path-to-image.jpg" alt="" className="absolute -top-20 -right-20 opacity-60" fill />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Playlist Insights",
    description: "Search through all your files in one place.",
    href: "/insight",
    cta: "View insights",
    background: <Image src="/path-to-image.jpg" alt="" className="absolute -top-20 -right-20 opacity-60" fill />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Song insights",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <Image src="/path-to-image.jpg" alt="" className="absolute -top-20 -right-20 opacity-60" fill />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Artist Insights",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <Image src="/path-to-image.jpg" alt="" className="absolute -top-20 -right-20 opacity-60" fill />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Spotify Updates",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <Image src="/path-to-image.jpg" alt="" className="absolute -top-20 -right-20 opacity-60" fill />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
]

export function BentoDash() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  )
}
