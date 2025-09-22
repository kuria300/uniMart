import Navbar from '@/app/components/Navbar'
import Products from '@/app/components/Products'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Products />
      </main>
   </>
  )
}

export default page