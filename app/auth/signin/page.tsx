'use client'

import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import React, { useState } from "react"
import { AlertCircle } from "lucide-react";

const Login = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const error = searchParams.get('error') // NextAuth error query param

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFormError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setFormError(res.error)
    } else {
      router.push('/')
    }

    setLoading(false)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className="flex flex-col items-center justify-center p-10 bg-[#F7F7F7] w-full max-w-sm shadow-xl rounded-xl">
        <form onSubmit={handleClick} className='flex flex-col w-full'>
          <h1 className="text-2xl text-orange-400 font-bold mb-4 text-center">Login</h1>
          {(formError || error) && (
            <div className="flex items-center w-full max-w-sm mb-3 bg-red-300 border border-red-400 text-red-700 px-3 py-2 rounded">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              <p className="text-sm">{formError || error}</p>
            </div>
          )}
          <input
            type='email'
            name='email'
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mb-4 py-2 px-3 w-full outline-none focus:border-orange-500 transition text-gray-600 border rounded'
          />
          <input
            type='password'
            name='password'
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mb-4 py-2 px-3 w-full outline-none focus:border-orange-500 transition text-gray-600 border rounded'
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-500 mt-3"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center w-full my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          disabled={loading}
          className="mt-2.5 bg-red-500 text-white py-2 px-4 rounded hover:scale-105 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
