import prisma from '@libs/prisma';
import { NextResponse } from 'next/server';



// GET Read the prompt and tag


export const GET = async ( req,{ params }) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};

// update the prompt
export async function  PUT(req,{ params}){
    try{
     const { prompt, tag } = await req.json(); 

    if (!prompt || !tag) {
      return NextResponse.json({ error: 'Prompt and tag are required fields' }, { status: 400 });
    }
      const updatePost = await prisma.post.update({
        where: {
          id: params.id,
        },
        data: {
          prompt: prompt,
          tag: tag,
        },
      });
  
      return NextResponse.json(updatePost, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
  
export async function DELETE(req,{ params }) {
    try {
        const deletePosts = await prisma.post.delete({
            where:{
                id:params.id
            }
        })
        return NextResponse.json(deletePosts, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 }); 
    }
}