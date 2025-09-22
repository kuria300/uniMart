'use client'
import React from 'react'
import Image from 'next/image'
import { useAppContext} from '../context/Appcontext'
import { useSession } from 'next-auth/react'
import Ordersummary from './Ordersummary'

const Carts = () => {
    const { data: session} = useSession();
    const {products, router, cartItems, addToCart, updateCartQuantity,getCartCount, currency}= useAppContext()
  return (
   <div className='flex flex-col md:flex-row items-center justify-center py-14 px-6 md:px-12 lg:px-32  gap-10'>
     <div className='flex-1'>
       <div className='flex flex-row items-center justify-between border-b border-gray-500/30 pb-6'>
        {session ?(
         <h1 className='text-2xl font-bold'>Your <span className='text-orange-400'>Cart</span></h1>
        ):(
           <h1 className='text-2xl font-bold'>Shopping <span className='text-orange-400'>Cart</span></h1>
        )}
        <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
        </div>
       <div className='overflow-x-auto mt-6'>
        <table className='min-w-full table-auto'>
          <thead className='text-left'>
            <tr>
              <th className='text-sm px-1 md:px-4 font-bold pb-6'>Product Details</th>
              <th className='text-sm px-1 md:px-4 font-bold pb-6'>Price</th>
              <th className='text-sm px-1 md:px-4 font-bold pb-6'>Quantity</th>
               <th className='text-sm px-1 md:px-4 font-bold pb-6'>SubTotal</th>
           </tr>
            </thead>
            <tbody>
               {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(product => product._id === itemId);

                  if (!product || cartItems[itemId] <= 0) return null;
                return(
                 <tr key={itemId}>
                  <td className='flex items-center gap-4 py-4 md:px-3 px-1'>
                  <div>
                     <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                        <Image
                         src={product.image[0]}
                         alt={product.name}
                         className="w-20 h-auto object-cover mix-blend-multiply"
                         width={1270}
                         height={720}
                         />
                     </div>
                    <button className="md:hidden text-xs  hover:text-orange-800 text-orange-600 mt-1 cursor-pointer" onClick={() => updateCartQuantity(product._id, 0)}>Remove</button>
                  </div>
                  <div className='md:block hidden'>
                    <p className='text-sm font-medium text-gray-800'>{product.name}</p>
                    <button className="text-xs hover:text-orange-800 text-orange-600 mt-1 cursor-pointer" onClick={() => updateCartQuantity(product._id, 0)}>Remove</button>
                  </div>

                  </td>
                  <td className='md:px-4 px-1 py-4 text-gray-600'>{currency}{product.offerPrice}</td>
                  <td className='py-4 md:px-4 px-1'>
                    <div className='flex items-center md:gap-2 gap-1'>
                      <button onClick={()=> updateCartQuantity(product._id, cartItems[itemId]-1)}>
                       <Image 
                       src='/decrease_arrow.svg'
                       alt='arrow'
                       width={12}
                       height={12}
                       />
                      </button>
                        <span className="w-6 text-center font-medium">
                           {cartItems[itemId]}
                        </span>
                       <button onClick={()=> addToCart(product._id)}>
                         <Image 
                       src='/increase_arrow.svg'
                       alt='arrow'
                       width={12}
                       height={12}
                       />
                      </button>
                    </div>
                  </td>
                  <td className='py-4 md:px-4 px-1'>
                    <p className='text-gray-600'>{currency}{(product.offerPrice * cartItems[itemId]).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </td>
                 </tr>
                )
               })}
            </tbody>

        </table>
       </div>
        <button onClick={()=> router.push('/all-products')} className="group flex items-center mt-6 gap-2 text-orange-600">
            <Image
              className="group-hover:-translate-x-1 transition"
              src='/arrow_right_icon_colored.svg'
              alt="arrow_right_icon_colored"
              width={12}
              height={12}
            />
            Continue Shopping
          </button>
     </div>
     <Ordersummary />
   </div>

  )
}

export default Carts