
import prisma from '@libs/prisma';
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'



export async function POST(request){
  const body = await request.json()

  const {username, email, password } = body.data;
  
  if(!username || !email || !password){
    return new NextResponse("Missing username , email or password", { status:400 })
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })
 
  if(userExist){
    return new NextResponse("User already exist!",{status:400})
  }
  

   const passwordHashed = await bcrypt.hash(password,10)

   const user = await prisma.user.create({
    data:{
        name:username,
        email:email,
        password:passwordHashed,
        image:''
        
        }
       }
   )
   
   return NextResponse.json(user);
} 