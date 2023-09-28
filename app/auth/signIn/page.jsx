'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"



export default function SignIn () {
  
  const router = useRouter();
  
  const [data , setData]= useState({
    email:'',
    password:''
  })

  const loginUser = async (e) =>{
    e.preventDefault()
    try {
      const callback = await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: false, // Set to false to handle the callback yourself
      });

      
      if (callback?.error) {
        toast.error('Invalid username or password. Please try again.');
      }else if (callback?.ok) {
        toast.success('Logged in successfully!');

      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }
    const session = useSession()

      useEffect(()=>{
        if(session.status ==='authenticated'){
          router.push('/')
        }
      })

  return (
    <> 

    <div  className="flex flex-col justify-center w-full min-h-screen min-w-[360px] ">
      <main id="page-content" className="flex flex-auto flex-col max-w-full">
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
          <section className="py-6 w-full max-w-lg">
            <header className="mb-10 text-center">
              <h1 className="text-2xl font-bold inline-flex items-center mb-2 space-x-2">
                <Image
                 width={37}
                 height={37}
                 alt="company"
                 src="/assets/images/logo.svg"></Image>
                <span className="logo_text">Promptopia</span>
              </h1>
              <h2 className="text-sm font-medium text-gray-400">
              Welcome, please sign in to your dashboard
              </h2>
            </header>
        
            <div className="flex flex-col rounded-lg shadow-sm grassmorphism overflow-hidden text-gray-100">
              <div className="p-5 md:px-16 md:py-12 grow">
                <form className="space-y-6" onSubmit={loginUser}>
                  <div className="space-y-1">
                    <label htmlFor="email" className=" text-gray-500 text-sm font-medium">Username</label>
                    <input type="email" id="email" name="email"  
                    autoComplete="email"
                    value={data.email}  onChange={(e)=>setData({...data,email:e.target.value})} required  placeholder="Enter your email" className="w-full input_field" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="password" className=" text-gray-500-sm font-medium">Password</label>
                    <input type="password" id="password" name="password" value={data.password} required onChange={(e)=>setData({...data,password:e.target.value})} placeholder="Enter your password" className="w-full input_field"/>
                  </div>
                  <div>
                   <div className="flex items-center justify-between space-x-2 mb-5">
                        <label className="flex items-center">
                          <input type="checkbox" id="remember_me" name="remember_me" className="border border-gray-200 rounded h-4 w-4 text-primary-orange  bg-primary-orange checked:bg-primary-orange "/>
                          <span className="text-primary-orange text-sm ml-2">Remember me</span>
                         </label>
                        <Link href="/" className="text-sm font-medium inline-block text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">Forgot Password?</Link>
                    </div>
          
                    <button type="submit"   className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 button_gradient  text-white hover:text-white hover:orange_gradient focus:outline-none">
                      <svg className="hi-mini hi-arrow-uturn-right inline-block w-5 h-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clipRule="evenodd" /></svg>
                      <span>log in </span>
                    </button>
                    <div className="flex items-center my-5">
                        <span aria-hidden="true" className="grow bg-gray-100 rounded h-0.5 dark:bg-gray-700/75" />
                        <span className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1 dark:bg-gray-700 dark:text-gray-200">or sign in with</span>
                        <span aria-hidden="true" className="grow bg-gray-100 rounded h-0.5 dark:bg-gray-700/75" />
                      </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="black_signin  h-12" onClick={(e)=>{e.preventDefault(),signIn('google',{redirect:true,callbackUrl:'/'})}}>
                        <Image
                        src='/assets/icons/search.svg'
                        width={15}
                        height={15}
                        alt="google"
                        />
                       <p>Google</p></button>
                       <button className="black_signin   h-12" onClick={(e)=>{e.preventDefault(),signIn('github',{redirect:true,callbackUrl:'/'})}}>
                        <Image
                        src='/assets/icons/github.svg'
                        width={22}
                        height={22}
                        alt="github"
                        />
                       <p>Github</p></button>

                     </div>
                  </div>
                </form>
              </div>   
              <div className="p-5 md:px-16 grow text-sm text-center button_gradient   rounded-full">
                 Don’t have an account yet?
                <Link href="/auth/register" className="ml-1 font-medium text-blue-600 hover:text-blue-400"> Register</Link>
              </div>
              </div>
            <div className="text-sm text-gray-500 text-center mt-6 dark:text-gray-400">
              Powered by <Link href="/" className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">Promptopia</Link>
            </div>
          </section>
        </div>
      </main>
    </div>

  </>
  )
}

