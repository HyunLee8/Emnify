import logo from "../assets/logo.png"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function NavBar() {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  return (
    <nav className="fixed w-full p-5 flex justify-between items-center z-50">
      <Link href='/nav/dashboard'>
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="text-4xl font-bold">EMNIFY</h1>
        </div>
      </Link>
      <div className="space-x-4">
        <a href="/api/auth/logout" className="hover:underline mr-10">
          Welcome {user.user_metadata.name}
        </a>
      </div>
    </nav>
  )
}