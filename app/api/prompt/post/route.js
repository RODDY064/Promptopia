import prisma from "@libs/prisma";
import { NextResponse } from "next/server";


export const revalidate = 0 


export const GET = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true // Include the author relation
            }
        });
        if (!posts) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}