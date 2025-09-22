import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


    const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

export const FeaturedProducts = () => {

  return (
    <div className='flex flex-col items-center justify-between py-4 '>
     <h1 className='flex items-center justify-center text-xl font-bold mt-2'>Featured Products</h1>
     <div className='grid grid-cols-1 md:grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 flex-col gap-12 md:px-14 px-4 items-center py-7'>
      {products.map((product)=>(
        <div key={product.id} className='relative group'>
         <Image 
         src={product.image}
         alt={product.title}
         height={300}
         width={300}
         className='group-hover:brightness-75 group-hover:scale-105 transition duration-300 h-auto object-cover'
         />
        <div className='absolute left-4 bottom-2 right-0 space-y-2 group-hover: translate-y-4'>
         <h2 className='text-xl text-white font-medium text-left'>{product.title}</h2>
         <p className='text-sm text-white text-start mt-1'>{product.description}</p>
         <button className='opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 
           group-hover:max-h-10 transition-all duration-300 ease-in-out py-2 px-3 bg-orange-600 rounded
          text-white font-medium cursor-pointer hover:bg-amber-700 mb-4'>
            Buy Now
         </button>
        </div>
        </div>
      ))}
     </div>
    </div>
  )
}
