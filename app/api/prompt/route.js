import prisma from '@libs/prisma';
import { NextResponse } from "next/server";


export const GET = async (req) =>{
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: true // Include the author relation
        }
      });
      
    
        return NextResponse.json(posts,{status:200})
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}