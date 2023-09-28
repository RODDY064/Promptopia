'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Form({  type, post, setPost,submitting,handleSubmit}) {
  
  const title ={
    hidden:{x:-1000,opacity:1},
    visible:{
       x:0,
      opacity:1,
      transition:{
        ease:[1,0.7,0.4,1,1],
        type:'spring',
        damping:10,
        stiffness:65 }
      } 
  }
  return (
    <section 
    className='w-full max-w-full flex-start flex-col'>
      <motion.h1
       variants={title}
       initial="hidden"
       animate="visible"
       className="head_text text-left">
        <span className='blue_gradient'>{type} Post</span>
      </motion.h1>
      <motion.p 
       variants={title}
       initial="hidden"
       animate="visible"
      className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild  with the world, and let your imagination run wild with any AI-powered platform
      </motion.p>
      <form onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className='font-sotoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
          <textarea
          value={post.prompt}
          onChange={(e)=> setPost({...post,
          prompt:e.target.value})}
          placeholder='Write your prompt here...'
          className='form_textarea'
          type='text'
          >

          </textarea>
        </label>
        <label>
          <span className='font-sotoshi font-semibold text-base text-gray-700'>Tag
          <span> (#product , #code, #webdev, #anime)</span></span>
          <input
          value={post.tag}
          onChange={(e)=> setPost({...post,
          tag:e.target.value})}
          placeholder='#tag'
          required
          className='form_input'
          type='text'
          >

          </input>
        </label>
         <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
          type='submit'
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          disabled={submitting}>
            {submitting? `${type}...`:type}

          </button>
         </div>
      </form>
    </section>
  )
}
