'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function getGalleryImages() {
  try {
    const result = await query('SELECT * FROM "GalleryImage" ORDER BY "createdAt" DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File;
  const tag = formData.get('tag') as string;
  const alt = formData.get('alt') as string || null;

  if (!file || !tag) {
    throw new Error('Missing required fields');
  }

  // Upload to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from('gallery')
    .upload(fileName, file);

  if (error) {
    console.error('Storage upload error:', error);
    throw new Error('Failed to upload image');
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('gallery')
    .getPublicUrl(fileName);

  // Save record in database
  await query(
    `INSERT INTO "GalleryImage" (id, url, tag, alt, "createdAt")
     VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
    [publicUrl, tag, alt]
  );

  revalidatePath('/admin/dashboard/gallery');
  revalidatePath('/gallery');
}

export async function deleteImage(id: string) {
  try {
    // Get image record to find storage path
    const result = await query('SELECT url FROM "GalleryImage" WHERE id = $1', [id]);
    if (result.rows.length === 0) return;

    const url = result.rows[0].url;
    // Extract filename from URL (assumes format: .../gallery/filename)
    const fileName = url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('gallery').remove([fileName]);
    }

    // Delete record
    await query('DELETE FROM "GalleryImage" WHERE id = $1', [id]);

    revalidatePath('/admin/dashboard/gallery');
    revalidatePath('/gallery');
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete image');
  }
}