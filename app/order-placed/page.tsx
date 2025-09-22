'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useAppContext } from '../context/Appcontext'

const Page = () => {

    const {router}= useAppContext()
    useEffect(()=>{
        setTimeout(()=>{
          router.push('/my-orders')
        }, 4000)
    })
  return (
    <div className='flex flex-col items-center justify-center gap-5 min-h-screen'>
      <div className='flex items-center justify-center relative'>
        <Image src={assets.checkmark} alt='checkmark' className='size-12 absolute'/>
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className='text-2xl font-semibold '>Order Placed Successfully </div>
    </div>
  )
}

export default Page