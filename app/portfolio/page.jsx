'use client';

import Profiles from "@components/Profiles";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


export default function EditPrompt() {
    const  searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const promptName = searchParams.get('author');

    const [posts , setPosts] = useState([])
   
    useEffect(() => {
        const getPost = async () => {
          try {
            const res = await fetch(`/api/portfolio/${promptId}/posts`);
            if (res.ok) {
              const data = await res.json(); // Await here
              setPosts(data);
            } else {
              console.error('Failed to fetch post:', res.status,);
            }
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
      
        if (promptId) getPost();
      },[promptId]);

  return (
        <div>
        <Profiles posts={posts}
        name={promptName}
        desc={`Welcome to ${promptName} posts `}
        />
     </div>
    )
}
