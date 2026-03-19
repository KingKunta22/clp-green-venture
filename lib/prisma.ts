// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

console.log('[prisma.ts] DATABASE_URL:', process.env.DATABASE_URL)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma