'use client'
import React, { useEffect, useState } from 'react'
import { assets, orderDummyData } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '../context/Appcontext';


export interface orderDummyData {
  _id: string;
  userId: string;
  items: {
    product: {
      _id: string;
      userId: string;
      name: string;
      description: string;
      price: number;
      offerPrice: number;
      image: string[];
      category: string;
      date: number;
      __v: number;
    };
    quantity: number;
    _id: string;
  }[];
  amount: number;
  address: {
    _id: string;
    userId: string;
    fullName: string;
    phoneNumber: string;
    pincode: number;
    area: string;
    city: string;
    state: string;
    __v: number;
  };
  status: string; // could narrow to "Order Placed" | "pending" | "completed" etc.
  date: number;
  __v: number;
}

type newOrder= {
    _id: string;
    userId: string;
    items: {
        productId: string;
        productName: string;
        quantity: number;
        price: number;
        subtotal: number;
    }[];
    address: {
        fullName: string;
        phoneNumber: string;
        pincode: number;
        area: string;
        city: string;
        state: string;
        __v: number;
    };
    totalWithTax: number;
    status: string;
    createdAt: string;
}

const Myorder = () => {
    //const[order, setOrder]= useState<orderDummyData[]>([])
    const[orderList, setOrderList]= useState<newOrder[]>([])

    const {currency}= useAppContext()

    // const getOrders= ()=>{
    //     setOrder(orderDummyData)
    // }
    // useEffect(()=>{
    //     getOrders()
    // },[])

    useEffect(()=>{
       const fetchOrder=  async ()=>{
        try{
        const res= await fetch('/api/order');
        const data= await res.json();

        setOrderList(data.orders || [])
        }catch(err){
         console.error("Error fetching orders:", err);
        }
       }

       fetchOrder()
    }, [])
  return (
    <div className='flex flex-col px-6 md:px-14 lg:px-32 mt-16 gap-6'>
      <div className='space-y-5'>
        <h2 className='text-2xl font-medium mt-6'>My Orders</h2>
          <div className='flex flex-col gap-4'>
            {orderList.map((order)=>(
                <div key={order._id} className='flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 border rounded-xl shadow-sm bg-white'>
                    <div className='flex-1 gap-5 flex-row max-w-80'>
                        <Image src={assets.box_icon} alt='box_icon' className='size-16 object-cover'
                    />
                    <p className="flex flex-col gap-4 flex-1">
                        <span className="font-semibold text-base">
                            {order.items.map((item) => item.productName + ` x ${item.quantity}`).join(", ")}
                        </span>
                        <span className='text-sm text-gray-600'>Items : {order.items.length}</span>
                    </p>
                    </div>
                     <div>
                        <p className='gap-5'>
                            <span className="font-medium">{order.address.fullName}</span>
                            <br />
                            <span >{order.address.area}</span>
                            <br />
                            <span>{`${order.address.city}, ${order.address.state}`}</span>
                            <br />
                            <span>{order.address.phoneNumber}</span>
                            </p>
                     </div>
                     <p className='font-semibold'>{currency}{order.totalWithTax}</p>
                     <div>
                        <p className="flex flex-col">
                            <span>Method : COD</span>
                            <span>Date : {new Date(order.createdAt).toLocaleDateString()}</span>
                            <span>Payment : Pending</span>
                        </p>
                     </div>
                </div>
                

            ))}
          </div>
      </div>
    </div>
  )
}

export default Myorder