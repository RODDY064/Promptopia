import { PrismaClient } from '@prisma/client';

let prisma;
//prisma global

if (process.env.NODE_ENV === 'production') {
  // In production, reuse the Prisma Client instance
  prisma = new PrismaClient();
} else {
  // In development, create a new Prisma Client instance for each request
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
