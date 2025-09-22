'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import React, { ReactNode, useEffect, useState } from 'react'
import { useContext, createContext } from 'react'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { addressDummyData } from '@/assets/assets' 

export interface Product {
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
}
export interface User {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
    cartItems: {};
    __v: number;
}
export interface Address {
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

type AppContextType = {
  currency: string | undefined;
  router: AppRouterInstance;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>; //a function that updates a boolean setIsSeller((prev)=>!prev)
  userData: User | null;
  fetchUserData: () => Promise<void>; // async function that the need for promise
  products: Product[];
  fetchDummyData: () => Promise<void>;
  cartItems: Record<string, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  addToCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  getCartCount: () => number;
  getCartAmount: () => number;
  dummyAddress: Address[];
  setdummyAddress: React.Dispatch<React.SetStateAction<Address[]>>;
 selectedAddress: Address | null;
setSelectedAddress: React.Dispatch<React.SetStateAction<Address | null>>;
handleSelect: (address:Address) => void;
};

export const AppContext= createContext<AppContextType | null>(null)

export const AppContextProvisder = ({ children }: { children: ReactNode }) => {
    const currency= process.env.NEXT_PUBLIC_CURRENCY;
    const router= useRouter();

    const [products, setProducts]= useState<Product[]>([])
    const [userData, setUserData]= useState<User| null>(null)
    const [isSeller, setIsSeller]= useState(true)
    const [cartItems, setCartItems]= useState<Record<string, number>>({})
    const [dummyAddress, setdummyAddress]= useState<Address[]>(addressDummyData)
    const [selectedAddress, setSelectedAddress]= useState<Address| null>(null)

     useEffect(() => {
   const stored = localStorage.getItem("selectedAddress");
   if (stored) {
     setSelectedAddress(JSON.parse(stored));
   }
 }, []); //makes the address on reload/refresh not get lost.

 const handleSelect=(address: Address)=>{
   setSelectedAddress(address);
 localStorage.setItem('selectedAddress', JSON.stringify(address))
 } // updates the React State selectedAddress and in cart page it uses the new state thus appears auto-selected without useEffcet

 const order= ()=>{}
    const fetchDummyData = async()=>{
        setProducts(productsDummyData)
    }
     const fetchUserData = async () => {
        setUserData(userDummyData)
    }

    const addToCart= async (itemId: string)=>{

      const cartData= structuredClone(cartItems)

      if(cartData[itemId]){
        cartData[itemId]+= 1
      }else{
        cartData[itemId]= 1
      }

      setCartItems(cartData)
    }

    const updateCartQuantity = async (itemId: string, quantity: number)=>{
     
      const cartData= structuredClone(cartItems)

      if(quantity === 0){
        delete cartData[itemId]
      }else{
        cartData[itemId]= quantity
      }

      setCartItems(cartData)
    }

    const getCartCount= ()=>{
      let totalCount=0;
      let ItemsIds= Object.keys(cartItems)//grab cartItems IDs

      for(let i=0; i<ItemsIds.length; i++){
        const itemsId= ItemsIds[i] //get the Ids
        const quantity= cartItems[itemsId] // get quantity corresponding to Ids

        if(quantity >0){
          totalCount+=quantity
        }
      }
      return totalCount
    }

    const getCartAmount= ()=>{
       let totalAmount=0;
      let ItemsIds= Object.keys(cartItems)//grab cartItems IDs

      for(let i=0; i<ItemsIds.length; i++){
       const itemsId= ItemsIds[i]
       const itemInfo= products.find((products)=>products._id=== itemsId)
       
       if(cartItems[itemsId] > 0){
         totalAmount+= itemInfo?.offerPrice! * cartItems[itemsId]
       }
      }
      return parseFloat(totalAmount.toFixed(2))

    }

   useEffect(() => {
        fetchDummyData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const value={
       currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchDummyData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        dummyAddress, setdummyAddress,
        selectedAddress, setSelectedAddress,
        handleSelect,
    }


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () =>{
   const context= useContext(AppContext);
   if(!context){
    throw new Error('no Appcontext')
   }
   return context
}
