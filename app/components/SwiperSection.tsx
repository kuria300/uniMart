'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


const SwiperSection = () => {

  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    }
  ]

  gsap.registerPlugin(ScrollToPlugin);
  
    const handleScroll =(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      gsap.to( window, {
        scrollTo:'#products',
         duration: 1,
         ease: 'power2.Out'
      })
    }
  return (
    <>
       <Swiper loop={true} spaceBetween={20} slidesPerView={1} pagination={{clickable: true}} modules={[Pagination]} className="!pb-10">
         {sliderData.map((item)=>(
            <SwiperSlide key={item.id}>
            <div className="flex flex-col-reverse md:flex-row items-center gap-4 bg-gray-200 shadow-lg min-h-[200px] max-w-6xl mx-4 md:mx-auto mt-8 rounded-xl p-6">
            <div className='flex flex-col space-y-3 w-full p-6'>
             <p className="md:text-base md:text-start text-orange-600">{item.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-tight md:text-start text-2xl font-semibold">
               {item.title}
              </h1>
             <div className="flex flex-wrap items-center mt-4 md:mt-6 gap-2">
                <button onClick={handleScroll} className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium cursor-pointer hover:bg-amber-700">
                  {item.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium cursor-pointer">
                  {item.buttonText2}
                 <Image src='/arrow_icon.svg' alt='arrow icon' className='group-hover:translate-x-1 transition' width={12} height={12}/>
                </button>
              </div>
            </div>

             <div className="w-full md:w-1/2 flex items-center justify-center">
                <Image
                src={item.imgSrc}
                alt="image"
                width={250}
                height={250}
                className="object-contain w-[150px] md:w-[250px]"
                />
            </div>
          </div>
         </SwiperSlide>
         ))}
            </Swiper>
           <style jsx global>{`
        .swiper-pagination-bullet {
          background: grey !important; 
          width: 6px !important; 
          height: 6px !important; 
          opacity: 0.5 !important; 
        }
        .swiper-pagination-bullet-active {
          background: #f97316 !important; 
          opacity: 1 !important; 
        }
      `}</style>
    </>
  )
}

export default SwiperSection