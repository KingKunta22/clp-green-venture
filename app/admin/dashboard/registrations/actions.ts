'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getRegistrations() {
  try {
    const result = await query(`
      SELECT r.id, r."firstName", r."lastName", r.address, r.phone, r.participants, r.fee, r."paymentMethod", r.code, r.verified, r."createdAt",
             s.title as seminar_title, s.id as seminar_id
      FROM "Registration" r
      LEFT JOIN "Seminar" s ON r."seminarId" = s.id
      ORDER BY r."createdAt" DESC
    `);
    return result.rows.map(row => ({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      name: `${row.firstName} ${row.lastName}`,
      seminar: row.seminar_title,
      seminarId: row.seminar_id,
      participants: row.participants,
      fee: row.fee,
      paymentMethod: row.paymentMethod,
      code: row.code,
      verified: row.verified,
      createdAt: row.createdAt,
    }));
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return [];
  }
}

export async function toggleVerification(id: string, verified: boolean) {
  try {
    await query(
      'UPDATE "Registration" SET verified = $1 WHERE id = $2',
      [verified, id]
    );
    revalidatePath('/admin/dashboard/registrations');
  } catch (error) {
    console.error('Error toggling verification:', error);
    throw error;
  }
}