import prisma from '@libs/prisma';
import { NextResponse } from "next/server";


export const POST = async (response) => {
  try {
    // Parse the JSON data from the response
    const body = await response.json();

    if (!body ) {
      // Handle the case where the expected structure is missing
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    const { prompt, tag, userId } = body;
   

 
    if (prompt !== undefined && tag !== undefined && userId !== undefined) {
      const userPrompt = await prisma.post.create({
        data: {
          prompt: prompt,
          tag: tag,
          authorId: userId,
        },
      });
     

      return NextResponse.json(userPrompt);
    } else {
      // Handle the case where some properties are missing
      return NextResponse.json({ error: "Missing properties in the request" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
