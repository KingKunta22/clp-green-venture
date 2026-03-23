'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Shared type for registration data
export interface Registration {
  id: string;
  name: string;
  seminar: string;
  participants: number;
  fee: number;
  paymentMethod: string;
  code: string;
  verified: boolean;
  createdAt: string;
}

// Shape of the raw database row
type RegistrationRow = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  participants: number;
  fee: number;
  paymentMethod: string;
  code: string;
  verified: boolean;
  createdAt: Date;
  seminar_title: string;
  seminar_id: string;
};

export async function getRegistrations(): Promise<Registration[]> {
  try {
    const result = await query(`
      SELECT r.id, r."firstName", r."lastName", r.address, r.phone, r.participants, r.fee, r."paymentMethod", r.code, r.verified, r."createdAt",
             s.title as seminar_title, s.id as seminar_id
      FROM "Registration" r
      LEFT JOIN "Seminar" s ON r."seminarId" = s.id
      ORDER BY r."createdAt" DESC
    `);
    const rows = result.rows as RegistrationRow[];
    return rows.map(row => ({
      id: row.id,
      name: `${row.firstName} ${row.lastName}`,
      seminar: row.seminar_title,
      participants: row.participants,
      fee: row.fee,
      paymentMethod: row.paymentMethod,
      code: row.code,
      verified: row.verified,
      createdAt: row.createdAt.toISOString(),
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