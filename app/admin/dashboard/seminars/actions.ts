'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getSeminars() {
  return await prisma.seminar.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function createSeminar(formData: FormData) {
  const title = formData.get('title') as string
  const schedule = formData.get('schedule') as string
  const fee = formData.get('fee') as string
  const instructor = formData.get('instructor') as string
  const level = formData.get('level') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string || null
  const isPast = formData.get('isPast') === 'on'

  await prisma.seminar.create({
    data: {
      title,
      schedule,
      fee,
      instructor,
      level,
      location,
      description,
      isPast,
    },
  })

  revalidatePath('/admin/dashboard/seminars')
}

export async function updateSeminar(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const schedule = formData.get('schedule') as string
  const fee = formData.get('fee') as string
  const instructor = formData.get('instructor') as string
  const level = formData.get('level') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string || null
  const isPast = formData.get('isPast') === 'on'

  await prisma.seminar.update({
    where: { id },
    data: {
      title,
      schedule,
      fee,
      instructor,
      level,
      location,
      description,
      isPast,
    },
  })

  revalidatePath('/admin/dashboard/seminars')
}

export async function deleteSeminar(id: string) {
  await prisma.seminar.delete({ where: { id } })
  revalidatePath('/admin/dashboard/seminars')
}