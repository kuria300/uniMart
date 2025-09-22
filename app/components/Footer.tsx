import React from 'react'

const Footer = () => {
  return (
<footer  className='bg-white'>
 <div className='flex flex-col md:flex-row items-center justify-center mt-20 px-6 md:px-12 gap-10 py-14 border-b border-gray-500/30 '>
    <div className='flex flex-col space-y-6 w-full md:w-4/5'>
       <h1 className='text-2xl font-bold'><span className='text-orange-600 text-start'>u</span>niMart</h1>
       <p className='text-start text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi saepe tenetur odit delectus laudantium repudiandae recusandae quisquam, consequuntur, accusamus itaque debitis esse.</p>
    </div>
     <nav className=" w-full md:w-1/2 flex items-center justify-start md:justify-center" aria-label="Company Links">
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Company</h2>
            <ul className="group text-sm space-y-2">
              <li>
                <a className="inline-block hover:translate-x-4 transition"  href="#">Home</a>
              </li>
              <li>
                <a className="inline-block hover:translate-x-4 transition"  href="#">About us</a>
              </li>
              <li>
                <a className="inline-block hover:translate-x-4 transition"  href="#">Contact us</a>
              </li>
              <li>
                <a className="inline-block hover:translate-x-4 transition"  href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </nav>
         <div className="w-full md:w-1/2 flex items-center justify-start md:justify-center mb-16">
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+254768863372</p>
              <p>eugenekuria66@gmailcom</p>
            </div>
          </div>
          </div>
     </div>

     <p className='text-center text-xs py-4 md:text-sm'>
       Copyright 2025 © Kuria300.dev All Right Reserved.
     </p>
</footer>
  )
}

export default Footer