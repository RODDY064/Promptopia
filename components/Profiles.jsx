'use client'
import PromptCard from "@components/promptCard"

export default function Profiles({posts ,name , desc, handleEdit ,handleDelete }) {
  return (
   <section className="w-full">
    <h1 className="head_text text-left"><span className="blue_gradient">{name} profile</span></h1>
    <p className="desc text-left">{desc}</p>
    <div className="mt-10 prompt_layout">
      {
        posts.map((post)=>(
          <PromptCard
           key={post.id}
           post={post}
           handleDelete={()=>handleDelete && handleDelete(post)}
           handleEdit={()=>handleEdit(post)}
       
           
          />

        ))
      }
     </div>
   </section>
  )
}
