import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient



const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
          CredentialsProvider({
           name: 'Credentials',
           
           credentials: {
             username: { label: "Username", type: "email", placeholder: "Enter your username" },
             password: { label: "Password", type: "password", placeholder: "Enter your password"  }
                      },
        
          async authorize(credentials){
            
            // check to see if email and password is there
            if(!credentials.username || !credentials.password ){
              throw new Error('Please enter an email and password')
            }

            // check if the user exists
             const user = await prisma.user.findUnique({
              where:{
                email:credentials.username
              }
             })
             
             try {
              
             
             if(!user || !user.password){
              throw new Error('The email address you entered is not registered with us')
             }

           //check if there password match
           const passwordMatch = await bcrypt.compare(credentials.password, user.password)
            
           // if they don't match 
           if(!passwordMatch){
            throw new Error('Invalid username or password. Please try again.')
           }
  
              return user
              
             } catch (error) {
              console.log(error)
              return null
             }
           
           }
        })

      ],

      pages:{
        signIn:'/auth/signIn'
      },
      session:{
     strategy:'jwt'
   },
   callbacks:{
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where:{
          email:session.user.email
        }
      })
  
      session.user.id = sessionUser.id
      return session
    }
   }
   
}
)

export { handler as GET , handler as POST };