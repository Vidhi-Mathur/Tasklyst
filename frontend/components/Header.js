import Link from 'next/link'
import Image from 'next/image'
import Logo from "@/assets/logo.png"
import { Menu } from 'lucide-react' 

export const Header = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white">
      <div className="px-2 py-5 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link href="/" className="flex ms-2 md:me-24">
              <Image src={Logo} className='me-3' width={40} height={40} alt="Tasklyst" />
              <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-black">TASKLYST</span>
            </Link>
          </div>
          <button className="md:hidden text-black p-2 focus:outline-none" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  )
}
