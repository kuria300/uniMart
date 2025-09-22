'use client'
import React, { useEffect, useState } from 'react'
import { Product, useAppContext } from '@/app/context/Appcontext'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'


const Page = () => {
  const {products, currency, router, addToCart} = useAppContext();
  const { id }= useParams();

  const [productData, setProductData]= useState<Product| null>(null);
  const [mainImage, setMainImage]= useState<string| null>(null);

  const fetchProductData = async ()=>{
    const product= products.find(product=> product._id === id) || null
    setProductData(product)
  }

  useEffect(()=>{
    if(!id || !products.length) return
   fetchProductData()
  }, [id, products])

  const notify=()=>{
    toast.success('Item added to Cart', {position: 'top-center'})
  }
  return (
    <>
     {productData ? (
        <div className='flex flex-col md:flex-row items-center justify-center p-14 px-6 md:px-16 lg:px-32 space-y-10 max-w-6xl mx-auto gap-20'>
            <div className='flex flex-col items-center'>
                <div className='bg-gray-500/10 rounded-xl mb-3 relative w-full max-w-[600px] h-[500px]'>
                <Image 
                  src={mainImage || productData.image[0]}
                  alt="product"
                  fill
                  className="object-contain mix-blend-multiply"
                />
             </div>

             <div className='grid grid-cols-4 gap-4'>
                {productData.image.map((image:string, index:number)=>(
                    <div key={index} className='rounded-xl bg-gray-500/10 cursor-pointer overflow-hidden' onClick={()=>{setMainImage(image)}}>
                       <Image
                       src={image}
                       alt='product'
                       width={100}
                       height={100}
                       className='h-auto object-cover mix-blend-multiply'
                        />
                    </div>
                ))}
               
             </div>
            </div>

            <div className='flex flex-col max-w-md '>
              <h2 className='text-2xl text-start text-gray-800/90 mb-3 font-bold'>{productData.name}</h2>
              <div className='flex flex-row items-center gap-2'>
                <div className='flex items-center gap-1'>
                   {Array.from({length: 5}).map((_,index)=>(
                     <Image 
                      key={index}
                      className='size-4'
                      src={
                      index< Math.floor(4)? '/star_icon.svg': '/star_dull_icon.svg'
                      }
                      alt='star_icon'
                     width={30} 
                     height={30}
                    />
                   ))}
                </div>
                <p className='text-md'>{((4.5))}</p>
            </div>
              <p className='text-xl text-start mb-6'>{productData.description}</p>
               <p className="text-2xl font-medium mt-6">
                        {currency}.{productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            {currency}.{productData.price}
                        </span>
                </p>
                <hr className="bg-gray-600 my-6" />

                <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                <div className="flex items-center mt-10 gap-4">
                        <button onClick={() =>{addToCart(productData._id); notify()}} className="w-full rounded py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(productData._id); router.push('/cart') }} className="w-full rounded py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition">
                            Buy now
                        </button>
                    </div>
            </div>
        </div>
      ) : (
        <p className="text-black">Loading product...</p>
      )}
    
    
    </>

    

    
    
  )
}

export default Page