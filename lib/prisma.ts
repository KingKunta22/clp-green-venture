// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

console.log('[prisma.ts] DATABASE_URL:', process.env.DATABASE_URL)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  try {
    console.log('[prisma.ts] Attempting to create PrismaClient...')
    const client = new PrismaClient()
    console.log('[prisma.ts] PrismaClient created successfully')
    return client
  } catch (error) {
    console.error('[prisma.ts] ❌ Failed to create PrismaClient:', error)
    throw error
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma