"use client";

import React from 'react'
import Feed from '@components/Feed'
import { motion } from 'framer-motion'

// Add
export const dynamic = 'force-dynamic'

export default function Home() {
  const popUp = {
    hidden:{x:-1, opacity: 0, scale: 0.5 },
    visible:{
      x:0,
      opacity: 1,
      scale: 1 ,
      transition:{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 7,
          stiffness: 60,
          restDelta: 0.001}
      }
      }
  }
  return (
   <>
   <section 
   className='w-full flex-center flex-col'>
    <motion.h1
      variants={popUp}
     initial='hidden'
     animate='visible'

     className='head_text text-center'>
        Discover & Share 
        <br  className='max-md:hidden'/>
        <span className="orange_gradient text-center">AI-Powered Prompt</span>
    </motion.h1>
    <motion.p 
      variants={popUp}
      initial='hidden'
      animate='visible'
    className='desc text-center'>
     Promptopia is an open-source AI-prompting tool for modern world to discover , create and share creative prompts
    </motion.p>
    <Feed/>
   </section>
   </>
  )
}
