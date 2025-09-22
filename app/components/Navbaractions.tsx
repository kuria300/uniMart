'use client'
import React, { useEffect, useRef, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { LogOut, ShoppingCart, UserRound } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Navbaractions = ({session}: {session: Session| null}) => {

  const router= useRouter()
  const [navbarDropdown, setNavbarDropdown]= useState(false);
  const dropDown= useRef<HTMLDivElement>(null);

  useEffect(()=>{
  const handleClickOutside = (e: MouseEvent) => {
    // Check if the dropdown exists AND if the click happened outside of it
    if (dropDown.current && !dropDown.current.contains(e.target as Node)) {
      setNavbarDropdown(false); // close the dropdown
    }
  };

  // Attach an event listener to the whole document
  document.addEventListener("mousedown", handleClickOutside);

  // Cleanup: remove the event listener when component unmounts
  return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  return (
  <div>
    {session && session?.user ?(
      <div className='flex items-center gap-3'>
        {session?.user?.image ?(
           <Image 
              src={session?.user?.image}
              alt='user avatar'
              width={32}
              height={32}
              className="rounded-xl cursor-pointer"
              onClick={()=>setNavbarDropdown(!navbarDropdown)}
            />
        ):( 
             <div className="w-8 h-8 bg-gray-300 rounded-xl flex items-center justify-center">
                 <UserRound className="text-white size-4" />
            </div>
        )}

    </div>
    ):(
     <button 
       onClick={()=>{signIn()}} 
        className='flex items-center gap-1 hover:text-gray-900 transition cursor-pointer'>
        <UserRound className='w-4 s-4'/>
         Account
    </button>
    )}
   <div className="relative" ref={dropDown}>
  {navbarDropdown && (
    <div className="absolute right-0 mt-1 w-52 bg-white shadow-lg rounded-lg border py-3 z-50">
      <div className="flex flex-row items-center justify-center gap-2">
        {session?.user?.image && (
          <>
            <Image
              src={session.user.image}
              alt="user avatar"
              width={20}
              height={20}
              className="rounded-xl"
            />
            <p className="text-sm font-bold">{session.user.name}</p>
          </>
        )}
      </div>
      <hr className="border-gray-500/15 border-b my-3 w-full" />

      <div className="flex flex-col items-center">
        <button
          onClick={() => router.push(`/profile/${session?.user.id}`)}
          className="group py-2 hover:bg-gray-200 text-gray-700 w-full flex items-center gap-2 px-6"
        >
          <UserRound className="size-3 inline-block group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Manage Account</span>
        </button>

        <button
          onClick={() => router.push('/cart')}
          className="group py-2 hover:bg-gray-200 text-gray-700 w-full flex items-center gap-2 px-6"
        >
          <ShoppingCart className="size-3 inline-block group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Cart</span>
        </button>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="group py-2 hover:bg-gray-200 text-gray-700 w-full flex items-center gap-2 px-6"
        >
          <LogOut className="size-3 inline-block group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      <hr className="border-b border-gray-500/30 my-3 w-full" />
      <div className='flex items-center justify-center'>
        <h1 className='font-bold text-xl'><span className='text-orange-600'>u</span>niMart</h1>
      </div>
      
    </div>
  )}
</div>
  </div>
  )
}

export default Navbaractions