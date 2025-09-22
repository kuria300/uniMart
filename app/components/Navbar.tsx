import { auth } from '@/auth';
import Link from 'next/link'
import { Search} from 'lucide-react'
import Navbaractions from './Navbaractions';
import NavLinks from './NavLinks';


const Navbar = async() => {
  const session= await auth()
  return (
   <>
     <nav className='header-Navbar flex flex-row items-center justify-between'>
        <h1 className='font-bold text-2xl'><span className='text-orange-400'>u</span>niMart</h1>

        <ul className='flex flex-row items-center justify-center gap-7 max-md:hidden font-semibold'>
          <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
         {/* Scroll effect */}
        <NavLinks />
        
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>
        </ul>

      <div className='flex flex-row items-center gap-6 font-medium'>
          <Link href='/login'> <Search className='size-4 w-4'/></Link>
          <Navbaractions session={session}/>
      </div>

    
     </nav>

   </>
  )
}

export default Navbar