import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
// new prisma client
export const GET = async (req) =>{
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: true // Include the author relation
        }
      });
     
      console.log(posts)
      return NextResponse.json(posts)
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error:"Internal server error" },{ status: 500 });
    }
}