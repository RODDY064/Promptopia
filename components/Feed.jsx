"use client";

import { useEffect, useState } from "react"
import PromptCard from "./promptCard";
import { usePathname, useRouter } from "next/navigation";
import cache from 'react'

export const PromptCardList = ({ data ,handleProfile}) =>{
  
  return(
    <>
     <div className="mt-16 prompt_layout">
      {
        data.map((post)=>(
          <PromptCard
           key={post.id}
           post={post}
           handleProfile={handleProfile}
          />

        ))
      }
     </div>
    </>
  )
}
export default function Feed() {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchPost , setSearchPost] = useState([])
  const [isSearching, setIsSearching] = useState(false);
 
  
   
    
  const UpdatePost = async() =>{
    try {

   
     

      const response = await fetch('/api/prompt/post', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
     }catch (error) {
      console.error(error);
    }
   };

   useEffect(() => {
    UpdatePost();
   },[]);
 

  const filterPosts = (searchTerm) => {

    return posts.filter((post) =>
      post.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
    setIsSearching(searchTerm.trim() !== ''); // Set isSearching based on whether search is empty or not
  };

  

  useEffect(() => {
    if (searchText.trim() === '') {
      setIsSearching(false); 
      // No search term, so not searching
    } else {
      setIsSearching(true);
      setSearchPost(filterPosts(searchText));
    }
  }, [searchText]);
  const router = useRouter();

  const handleProfile = (post)=>{
    router.push(`/portfolio?id=${post.authorId}&author=${post.author.name}`)
}

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text"  
        onChange={(e)=>handleSearch(e)}
        className="search_input peer"
        placeholder="Search for prompts , a tag or a user name"/>

      </form>
     {
       isSearching ?(<>
        <PromptCardList
       data={searchPost} 
       handleProfile={handleProfile}
      />
      </>)
      :(<>
       <PromptCardList
      data={posts}
      handleProfile={handleProfile}
      />
      </>)
     }
    </section>
  )
}
