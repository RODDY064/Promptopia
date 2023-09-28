'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { toast} from "react-hot-toast"

export default function Register() {
  const router = useRouter();
  const [ data , setData] = useState({
    username:'',
    email:'',
    password:''
  })

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('/api/register',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ data })
    }).then((callback)=>{
      if(callback?.ok){
        toast.success('Account registered successfully')
      }

      if(callback?.error){
        toast.error('Something went wrong')
      }
    })
 
    if(response.ok){
      router.push('/auth/signIn')
    }
    
   
  }
    return (
      <>
        {/* Pages: Sign In: Boxed */}
  
        {/* Page Container */}
        <div id="page-container" className="flex flex-col mx-auto w-full min-h-screen min-w-[320px] ">
          {/* Page Content */}
          <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
              {/* Sign In Section */}
              <section className="py-6 w-full max-w-lg">
                {/* Header */}
                <header className="mb-10 text-center">
                  <h1 className="text-2xl font-bold inline-flex items-center mb-2 space-x-2">
                    <Image
                     width={37}
                     height={37}
                     alt="company"
                     src="/assets/images/logo.svg"></Image>
                    <span className="logo_text">Promptopia</span>
                  </h1>
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Please welcome to register  dashboard
                  </h2>
                </header>
                {/* END Header */}
  
                {/* Sign In Form */}
                <div className="flex flex-col rounded-lg shadow-sm grassmorphism overflow-hidden text-gray-100">
                  <div className="p-5 md:px-16 md:py-12 grow">
                    <form className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="name" className=" text-gray-500 text-sm font-medium">Name</label>
                        <input type="text"  placeholder="Enter your name" className="w-full input_field" onChange={(e)=>setData({...data,username: e.target.value})}/>
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className=" text-gray-500 text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full input_field" 
                        onChange={(e)=>setData({...data,email: e.target.value})}/>
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="password" className=" text-gray-500-sm font-medium">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" className="w-full input_field"
                        onChange={(e)=>setData({...data, password: e.target.value})}/>
                      </div>
                      <div>
              
                        <button type="submit"  onClick={handleSubmit} className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 button_gradient  text-white hover:text-white hover:orange_gradient focus:outline-none">
                          <svg className="hi-mini hi-arrow-uturn-right inline-block w-5 h-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clipRule="evenodd" /></svg>
                          <span>Register</span>
                        </button>
                      </div>
                    </form>
                  </div>        
                  <div className="p-5 md:px-16 grow text-sm text-center orange_gradient rounded-full">
                    Already have an account?
                    <Link href="/auth/signIn" className="font-medium text-blue-600 hover:text-blue-400">Sign in</Link>
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