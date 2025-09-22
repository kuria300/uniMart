'use client'
import React, { FormEvent,useState } from 'react'
import { useAppContext } from '../context/Appcontext'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { addressDummyData } from '@/assets/assets' 

const Addaddress = () => {
    const {router, userData, dummyAddress, setdummyAddress, selectedAddress, setSelectedAddress, handleSelect}= useAppContext()

    type addressDummyData ={
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

    const [address, setAddress]= useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
    })
  

    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      setAddress({...address, [e.target.name]:e.target.value})
    }

    const handleSubmit =(e:FormEvent<HTMLFormElement>)=>{
     e.preventDefault();

     const newAddress:addressDummyData = {
       _id: Date.now().toString(),
    userId: userData!._id,
    fullName: address.fullName,
    phoneNumber: address.phoneNumber,
    pincode: Number(address.pincode),
    area: address.area,
    city: address.city,
    state: address.state,
    __v: 0,
     }
    
     setdummyAddress([...dummyAddress, newAddress]);

     handleSelect(newAddress)

    router.push("/cart");

    }
  return (
    <div className='px-6 md:px-16 lg:px-32 mt-16 flex flex-col md:flex-row justify-between'>
     <form className='w-full md:max-w-2/6' onSubmit={handleSubmit}>
      <h1 className='text-2xl text-black font-medium'>Add Shipping <span className=' text-2xl text-amber-600 font-bold'>Address</span></h1>
       
       <div className='flex flex-col gap-3 mt-10'>
        <input
              type="text"
              name='fullName'
              placeholder="Full name"
              className="outline-none p-2.5 text-gray-600 border border-gray-500/30 rounded focus:border-gray-600/70 transition"
              onChange={handleChange}
              value={address.fullName}
            />
            <input
              type="number"
              name='phoneNumber'
              placeholder="Phone number"
              className="outline-none p-2.5 text-gray-600 border border-gray-500/30 rounded"
              onChange={handleChange}
              value={address.phoneNumber}
            />
            <input
              type="number"
              name='pincode'
              placeholder="Pin code"
              className="outline-none focus:border-orange-500 transition p-2.5 text-gray-600 border rounded"
              onChange={handleChange}
              value={address.pincode}
            />
            <textarea
            className="p-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-600 resize-none"
            rows={4}
            name='area'
            placeholder="Address (Area and Street)"
            onChange={handleChange}
            value={address.area}
            ></textarea>
            <div className='flex space-x-2'>
              <input
              type="text"
              name='city'
              placeholder="City/District/Town"
              className="flex-1 w-full outline-none p-2.5 text-gray-600 border border-gray-500/30 rounded"
               onChange={handleChange}
            value={address.city}
            />
             <input
              type="text"
              name='state'
              placeholder="State"
              className="flex-1 w-full outline-none p-2.5 text-gray-600 border border-gray-500/30 rounded"
               onChange={handleChange}
            value={address.state}
            />   
            </div>
            <button className='bg-orange-600 hover:bg-amber-700 px-6 py-2.5 mt-5 text-white uppercase'>Save Address</button>
       </div>
    </form>
   <Image
    className="md:ml-16 mt-16 md:mt-0"
    src={assets.my_location_image}
    alt="my_location_image"
    />
    
    </div>
  )
}

export default Addaddress