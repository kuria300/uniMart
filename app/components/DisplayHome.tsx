'use client'
import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/Appcontext'


const DisplayHome = () => {
    const {products, router}=  useAppContext()
  return (
     <section id="products" className="flex flex-col items-center mt-6 px-6 md:px-16 lg:px-32 xl:px-44 ">
          <h2 className="text-2xl font-medium text-left w-full py-6">Popular <span className='underline underline-offset-8 w-16 h-0.5 rounded-full'>Products</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
            {products.map((product)=> <ProductCard key={product._id} product={product}/>)} 
     
          </div>
          <button onClick={()=>{router.push('/all-products')}} className='px-12 py-2 rounded-md border text-gray-900 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-transform duration-100 hover:scale-105'>
            See More
          </button>
     </section>
  )
}
//how you pass data from a parent component to a child component. prouct card receive as parameters ({product}: {product:product})
////The code uses JavaScript's .map() function to go through every item inside the products array.For each product in that array, it creates a <ProductCard /> component.

export default DisplayHome