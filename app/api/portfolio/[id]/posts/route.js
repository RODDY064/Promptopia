import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
      const { id } = params; // Extract the 'id' parameter
  
      const posts = await prisma.post.findMany({
        where: {
          authorId: id, // Use the extracted 'id' parameter
        },
        include:{
            author:true,
        }
      });
      return NextResponse.json(posts, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  