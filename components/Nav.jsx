"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {signIn , signOut ,useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion';

export default function Nav() {
    const [toggleDrop, setToggleDrop] = useState(false);
    const { data: session } = useSession();
    // use the session
    

  return (
    <AnimatePresence>
   <nav className='flex-between w-full mb-16  pt-3'>
    <Link href="/" className='flex gap-2 flex-center'>
        <Image
        src='/assets/images/logo.svg'
        width={30}
        height={30}
        className='object-contain'
        alt='Promptopia logo'
        />
     <p className='logo_text'>Promptopia</p>
    </Link>

    {/* desktop nav*/}

    <div className='sm:flex hidden'>
    { session?.user ? 
    (
    <div className='flex gap-3 md:gap-5'>
        <Link href="/create-prompt" className='black_btn'>
        Create post 
        </Link>
        <button onClick={signOut} className='outline_btn'>
           Sign Out
        </button>
        <Link href="/profile">
            <Image
            src={session?.user.image||`/assets/images/profile.svg`}
            width={37}
            height={37}
            alt='profile'
            className='object-contain rounded-full'
            />
        </Link>
    </div>
     )
    :(<>
      <button
        type='button'
        onClick={()=>signIn()}
        className='black_btn'
        >
        Sign In
        </button>
    </>)

    }
    </div>
    
    {//mobile nav
    
    }
    <div className='flex relative sm:hidden'>
        {session?.user ?
        (
         <div className='flex'>
          <Image
            src={session?.user.image||`/assets/images/profile.svg`}
            width={37}
            height={37}
            alt='profile'
            className='rounded-full'
            onClick={()=> setToggleDrop((prev)=>!prev)}
            />
            {
             toggleDrop && (
                <motion.div 
                initial={{x:100,opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{
                    duration:0.2
                }}
                className='dropdown'>
                    <Link href="/profile"
                    className='dropdown_item'
                    onClick={()=>setToggleDrop(false)}>
                        My profile
                    </Link>
                    <Link href="/create-prompt"
                    className='dropdown_item'
                    onClick={()=>setToggleDrop(false)}>
                        Create Prompt
                    </Link>
                    <button
                    type='button'
                    onClick={()=>{
                        setToggleDrop(false);
                        signOut();
                    }}
                    className='mt-5 w-full black_btn'
                    >
                        Sign Out
                    </button>

                </motion.div>
             )
            }

         </div>   
        ):(<>
         <button
        type='button'
        onClick={()=>signIn()}
        className='black_btn'
        >
        Sign In
        </button>
        </>)

        }
    
    </div>
   </nav>
   </AnimatePresence>
  )
}
