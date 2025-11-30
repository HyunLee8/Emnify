'use client'

import logo from "../assets/logo.png"
import Image from "next/image"
import Link from "next/link"

export default function NavBar() {


  return (
    <nav className="fixed w-full p-5 flex justify-between items-center">
      <Link href='/dashboard'>
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="text-4xl font-bold">EMNIFY</h1>
        </div>
      </Link>
      <div className="space-x-4">
        <a href="/api/auth/logout" className="hover:underline mr-10">
          Welcome 
        </a>
      </div>
    </nav>
  )
}