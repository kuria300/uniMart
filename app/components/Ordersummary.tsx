'use client'

import React, {useState } from 'react'
import { useAppContext } from '../context/Appcontext'
import { addressDummyData } from '@/assets/assets' 
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 type addressDummyData={
    _id: string;
    userId: string;
    fullName: string;
    phoneNumber: string;
    pincode: number;
    area: string;
    city: string;
    state: string;
    __v: number;
 }
const Ordersummary = () => {
    const {currency, router, getCartCount, getCartAmount, dummyAddress, selectedAddress, setSelectedAddress, cartItems, products}= useAppContext()
    const {data: session}= useSession();
    const [isDropDownOpen, setIsDropDownOpen]= useState(false)
    // const [UserAddress, setUserAddress]= useState<addressDummyData[]>([])
    // const fetchDummyAddress= ()=>{
    //     setUserAddress(addressDummyData)
    // }

    const handleAddressSelect = (address:addressDummyData) => {
    setSelectedAddress(address);

    localStorage.setItem('selectedAddress', JSON.stringify(address)) //helps it stay even after reload when one chooses from dropdown
    setIsDropDownOpen(false);
  };


  // useEffect(() => {
  //   fetchDummyAddress();
  // }, [])

   const notify=()=>{
      toast.error('Please Login first!', {position: 'top-center'})
      return
    }

    const createOrder =async ()=>{
     if(!selectedAddress){
      toast.error('Please select Address first!')
      return
     }
     if (getCartCount() === 0) {
       toast.error("Your cart is empty!", { position: "top-center" });
      return;
      }

      const newOrder = {
         _id: Date.now().toString(),
       userId: session?.user?.email || "guest",

  items: Object.keys(cartItems).map((id) => {
    const product = products.find((p) => p._id === id);
    return {
      productId: id,
      productName: product ? product.name : "Unknown Product",
      quantity: cartItems[id],
      price: product ? product.price : 0,
      subtotal: product ? product.price * cartItems[id] : 0,
    };
  }),

  address: {
    fullName: selectedAddress.fullName,
    phoneNumber: selectedAddress.phoneNumber,
    pincode: selectedAddress.pincode,
    area: selectedAddress.area,
    city: selectedAddress.city,
    state: selectedAddress.state,
  },

  totalWithTax: getCartAmount() + Math.floor(getCartAmount() * 0.02),
  status: "pending",
};
   
    try{
      const res= await fetch('/api/user',{
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(newOrder)
    })

    const data= await res.json();

    if (res.ok) {
    toast.success("Order placed successfully!", {position:'top-center'});
    router.push("/order-placed");
  } else {
    toast.error(data.error || "Failed to place order.", {position:'top-center'});
  }
    }catch(err){
       toast.error(String(err), {position:'top-center'});
    }
  
    }

  return (
    <div className='w-full md:w-96 bg-gray-500/5 p-5'>
      <h2 className='text-xl md:text-2xl font-bold text-left'>Order Summary</h2>
      <hr className='border-gray-500/30 my-5'/>
     <div className='space-y-4'>
        <div>
            <label className='text-base text-gray-700 block uppercase font-medium mb-2'>Select Address</label>
        </div>
         <div className='relative w-full inline-block text-sm border'>
           <button className='w-full text-left px-4 py-2 bg-white text-gray-700 focus:outline-none' 
           onClick={()=>{setIsDropDownOpen(!isDropDownOpen)}}>
            <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropDownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
          </button> 
           {isDropDownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {dummyAddress.map((address, _id) => (
                  <li
                    key={_id}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-left"
                >
                  + Add New Address
                </li>
              </ul>
            )} 
      </div>

      <div>
         <label className='text-base text-gray-700 block uppercase font-medium'>Promo Code</label>
      </div>
      <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-6 py-2 hover:bg-orange-700">
              Apply
            </button>
        </div>
     <hr className='border-b border-gray-500/20 my-5'/>
     <div className='space-y-3'>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-gray-600 font-bold'>ITEMS {getCartCount()}</p>
        <p className='font-bold text-gray-800'>{currency}{getCartAmount()}</p>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-gray-600 font-medium'>Shipping Fee</p>
        <p className='font-bold text-gray-800'>Free</p>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-gray-500 font-medium'>Tax (2%)</p>
        <p className='text-gray-800 font-bold'>{currency}{Math.floor(getCartAmount()* 0.02)}</p>
      </div>
     </div>

     <hr className='border-b border-gray-500/5 my-6'/>

     <div className='flex flex-row items-center justify-between'>
       <p className='font-bold text-gray-800'>TOTAL</p>
       <p className='font-bold text-gray-900'>{currency}{getCartAmount() + Math.floor(getCartAmount()* 0.02)}</p>
     </div>
     {session ?(
       <button onClick={createOrder} className="bg-orange-600 text-white px-6 py-3.5 hover:bg-orange-700 w-full">
              Place Order
            </button>
     ):(
      <button onClick={()=>notify()} className="bg-orange-600 text-white px-6 py-3.5 hover:bg-orange-700 w-full">
              Place Order
            </button>
     )}
  
     </div>
    </div>
  )
}

export default Ordersummary