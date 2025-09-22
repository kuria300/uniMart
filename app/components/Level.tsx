import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'

export const Level = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between md:pl-20 py-4 md:py-0 mb-8 rounded-xl shadow-md bg-slate-200 max-w-6xl mx-4 md:mx-auto'>
     <Image 
      src={assets.jbl_soundbox_image}
      alt='jbl speaker'
      className="max-w-40"
     />
     <div className='flex flex-col space-y-2 items-center text-center px-4 md:px-0'>
      <h2 className='font-bold text-2xl  md:text-3xl max-w-[290px]'>Level up your Gaming</h2>
      <p className='text-sm max-w-[343px]'>From immense sound to Precise control- Everything you need to win</p>
      <button className='group py-2 px-6 bg-orange-600 rounded text-white font-medium cursor-pointer hover:bg-amber-700 flex items-center gap-1'>Buy Now <Image src='/arrow_icon_white.svg' alt='arrow icon' className='group-hover:translate-x-1 transition' width={12} height={12}/></button>
     </div>
     <Image 
      src={assets.md_controller_image}
      alt='controller'
      className='hidden md:block max-w-56'
     />
      <Image 
      src={assets.sm_controller_image}
      alt='controller'
      className='hidden'
     />
    </div>
  )
}
