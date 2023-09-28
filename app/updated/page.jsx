'use client';

import Form from "@components/Form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function EditPrompt() {
    const  searchParams = useSearchParams();
    const promptId = searchParams.get('id');

 
  const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post , setPost] = useState({
        prompt:'',
        tag:''
    })
   
    useEffect(() => {
        const getPost = async () => {
          try {
            const res = await fetch(`/api/prompt/${promptId}`);
            if (res.ok) {
              const data = await res.json(); // Await here
              setPost({
                prompt: data.prompt,
                tag: data.tag,
              });
            } else {
              console.error('Failed to fetch post:', res.status,);
            }
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
      
        if (promptId) getPost();
      }, [promptId]);
      
   

      const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
          
        const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    prompt:post.prompt,
                    tag:post.tag
                 }),
              });
          // Handle the response here
          if (response.ok) {
             router.push('/')
          } else {
            // Handle error response
            console.error('Failed to update post:', response.status, );
          }
        } catch (error) {
          console.error('Error updating post:', error);
        } finally {
          setSubmitting(false);
        }
      };
      
  return (
    <Form
    handleSubmit={editPrompt}
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    
    />
  )
}
