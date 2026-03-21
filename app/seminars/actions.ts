'use server'

import { query } from '@/lib/db'

function generateRegistrationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'CLP-'
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
  code += '-'
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function getSeminars() {
  try {
    const result = await query('SELECT * FROM "Seminar" ORDER BY "createdAt" DESC')
    console.log('[getSeminars] result.rows:', result.rows); // Add this
    return Array.isArray(result?.rows) ? result.rows : []
  } catch (error) {
    console.error('Error fetching seminars:', error)
    return []
  }
}

export async function registerForSeminar(formData: FormData) {
  const seminarId = formData.get('seminarId') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const address = formData.get('address') as string
  const phone = formData.get('phone') as string
  const participants = parseInt(formData.get('participants') as string)
  const paymentMethod = formData.get('paymentMethod') as string
  const fee = parseFloat(formData.get('fee') as string) // total fee
  const code = generateRegistrationCode()

  await query(
    `INSERT INTO "Registration" (id, "firstName", "lastName", address, phone, participants, fee, "paymentMethod", code, "seminarId", "createdAt")
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
    [firstName, lastName, address, phone, participants, fee, paymentMethod, code, seminarId]
  )

  return { code }
}