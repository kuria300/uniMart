'use client'

import { useState } from "react"

const Login = () => {
  const [email, setEmail]= useState('')
   const [password, setPassword]= useState('')

  return (
   <div className='flex items-center justify-center min-h-screen'>
    <form className=' flex flex-col items-center justify-center p-12 bg-[#F7F7F7] w-full max-w-sm shadow-xl rounded-xl'>
      <h1 className="text-2xl text-black font-bold mb-4">Login</h1>
      <input  type='email' 
      name='email'
      placeholder="example@gmail.com" 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className='rounded border-2 mb-4 py-2 px-3 w-full'/>

      <input  type='password' 
      name='password' 
      placeholder="enter password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className='rounded border-2 mb-4 py-2 px-4 w-full'/>
       
       <button
      type="submit"
      className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 mt-4"
    >
      Sign In
    </button>
      
    </form>
    </div>
  )
}

export default Login