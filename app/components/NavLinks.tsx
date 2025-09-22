'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import { useEffect } from "react"

const page =() => {
 const router= useRouter()
  const pathname = usePathname();

 gsap.registerPlugin(ScrollToPlugin)

 const protectRoute=(e: React.MouseEvent<HTMLAnchorElement>)=>{
    e.preventDefault()
    if(pathname == '/'){
  gsap.to(window,
     { duration: 1,
     scrollTo: "#products",
      ease: "power1.out" 
    });
  }else{
    sessionStorage.setItem('scroll', 'true')
    router.push('/')
  }
};

useEffect(()=>{
if(sessionStorage.getItem('scroll')=== 'true'){
  sessionStorage.removeItem('scroll'); //store scroll flag that gets checked in the homepage when loaded
  setTimeout(()=>{
     gsap.to(window, 
    { duration: 1,
     scrollTo: "#products",
      ease: "power1.out" 
    });
  }, 300) //300ms to wait for the page to mount/render
}
}, []) //useEffect runs automatically after the component appears on the screen.Because the dependency array is empty ([]), it runs only once on that first load.It does not run again unless the component unmounts and mounts again.

  return (
    <div>
      <Link href="#products" onClick={protectRoute} className="hover:text-gray-900 transition">
          Shop
    </Link>
    </div>
  )
}

export default page
