'use client'
import React, { useState } from 'react'
import { useAppContext } from '../context/Appcontext'
import Image from 'next/image'
import { Product } from '../context/Appcontext'


const ProductCard = ({product}: {product: Product}) => {
  const {currency, router,products, addToCart} = useAppContext()
  return (
  <div onClick={()=>router.push('/product/'+ product._id)}className='flex flex-col gap-1 items-start max-w-[170px] w-full cursor-pointer'>
    <div className='relative group bg-gray-500/10 h-52 rounded-lg flex items-center justify-center cursor-pointer'>
      <Image 
      src={product.image[0]}
      alt={product.name}
      height={800}
      width={800}
      className='group-hover:scale-105 transition object-cover size-4/5 md:w-full md:h-full'/>
      <button className='absolute rounded-full bg-white top-2 right-1.5 shadow-md p-1'>
        <Image
        src='/heart_icon.svg'
        alt='heart_icon' 
        className='size-3'
        width={12}  //Required when using next/image with public assets
        height={12}
        />
      </button>
    </div>

    <p className='md:text-base font-medium pt-2 truncate'>{product.name}</p>
    <p className='text-xs max-sm:hidden w-full truncate text-gray-500/50'>{product.description}</p>
    <div className='flex items-center gap-2'>
     <p className='text-xs'>{4.5}</p>
      <div className='flex items-center gap-1'>
        {Array.from({length: 5}).map((_,index)=>(
         <Image 
         key={index}
         className='size-3'
         src={
           index< Math.floor(4)? '/star_icon.svg': '/star_dull_icon.svg'
         }
         alt='star_icon'
         width={12} 
         height={12}
         />
        ))}
      </div>
    </div>
     <div className="flex items-end justify-between w-full mt-1 gap-1">
      <p className="text-base font-medium">{currency}.{product.offerPrice}</p>
        <button className=" max-sm:hidden px-3 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-100 transition">
             Buy
        </button>
    </div>
  </div>
  )
}

export default ProductCard