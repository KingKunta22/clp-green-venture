'use server'

import { query } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getSeminars() {
  const result = await query('SELECT * FROM "Seminar" ORDER BY "createdAt" DESC');
  return result.rows;
}

export async function createSeminar(formData: FormData) {
  const title = formData.get('title') as string
  const schedule = formData.get('schedule') as string
  const feeValue = formData.get('fee') as string;
  const fee = feeValue === '0' ? 'Free' : `₱${parseFloat(feeValue).toFixed(2)}`;
  const instructor = formData.get('instructor') as string
  const level = formData.get('level') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string || null
  const isPast = formData.get('isPast') === 'on'

  await query(
    `INSERT INTO "Seminar" (id, title, schedule, fee, instructor, level, location, description, "isPast", "createdAt", "updatedAt")
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
    [title, schedule, fee, instructor, level, location, description, isPast]
  );

  revalidatePath('/admin/dashboard/seminars')
}

export async function updateSeminar(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const schedule = formData.get('schedule') as string
  const feeValue = formData.get('fee') as string;
  const fee = feeValue === '0' ? 'Free' : `₱${parseFloat(feeValue).toFixed(2)}`;
  const instructor = formData.get('instructor') as string
  const level = formData.get('level') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string || null
  const isPast = formData.get('isPast') === 'on'

  await query(
    `UPDATE "Seminar" SET title=$1, schedule=$2, fee=$3, instructor=$4, level=$5, location=$6, description=$7, "isPast"=$8, "updatedAt"=NOW() WHERE id=$9`,
    [title, schedule, fee, instructor, level, location, description, isPast, id]
  );

  revalidatePath('/admin/dashboard/seminars')
}

export async function deleteSeminar(id: string) {
  await query('DELETE FROM "Seminar" WHERE id=$1', [id]);
  revalidatePath('/admin/dashboard/seminars')
}