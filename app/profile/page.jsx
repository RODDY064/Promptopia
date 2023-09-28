'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profiles from "@components/Profiles";
import { useEffect, useState } from "react";

export default function MyProfile() {
    
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (session?.user.id) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch(`/api/users/${session?.user.id}/post`);
                    if (response.ok) {
                        const data = await response.json();
                        setPosts(data);
                    } else {
                        console.error('Failed to fetch posts:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            };

            fetchPosts();
        }
    }, [session?.user.id]);
    const  handleDelete = async(post) =>{
      const hasConfirm = confirm('Are you sure you want to delete this prompt')

      if(hasConfirm){
        if (post && post.id) {
            try {
              await fetch(`api/prompt/${post.id}`, {
                method: 'DELETE',
              });
              const filterPosts = posts.filter((p) => p.id !== post.id);
              setPosts(filterPosts);
            } catch (error) {
              console.error(error);
            }
          }
          
      }

    }

    const handleEdit = (post)=>{
        router.push(`/updated?id=${post.id}`)

    }
    
   
    return (
        <div>
            <Profiles posts={posts}
            name='My'
            desc='Welcome to your personalized page'
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            />
        </div>
    );
}
