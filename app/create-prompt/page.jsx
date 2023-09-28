'use client';

import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreatePrompt() {

  const{data:session} = useSession();
  const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post , setPost] = useState({
        prompt:'',
        tag:''
    })

    const createPrompt = async (e)=>{
     e.preventDefault();
     setSubmitting(true)
     try {
        const response = await fetch('api/prompt/new',{
          method:'post',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag,
            userId:session?.user.id
          })
        })
         

        if(response.ok){
          router.push('/')
        }
     } catch (error) {
         console.log(error)
     }finally{
      setSubmitting(false)
     }
    }
  return (
    <Form
    handleSubmit={createPrompt}
    type='Create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    
    />
  )
}
