'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

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
  try {

    const testResult = await query('SELECT NOW()');
    console.log('DB test:', testResult.rows);
    const file = formData.get('file') as File;
    const tag = formData.get('tag') as string;
    const alt = formData.get('alt') as string || null;

    if (!file || !tag) {
      throw new Error('Missing required fields: file or tag');
    }

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    console.log('Uploading to bucket "gallery" with filename:', fileName);

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('gallery')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('gallery')
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;
    console.log('Public URL:', publicUrl);

    // Save record in database
    const dbResult = await query(
      `INSERT INTO "GalleryImage" (id, url, tag, alt, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW())
       RETURNING id`,
      [publicUrl, tag, alt]
    );

    console.log('Database insert successful, id:', dbResult.rows[0]?.id);

    revalidatePath('/admin/dashboard/gallery');
    revalidatePath('/gallery');
    return { success: true };
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function deleteImage(id: string) {
  try {
    // Get image record to find storage path
    const result = await query('SELECT url FROM "GalleryImage" WHERE id = $1', [id]);
    if (result.rows.length === 0) return;

    const url = result.rows[0].url;
    const fileName = url.split('/').pop();
    if (fileName) {
      const { error: deleteError } = await supabaseAdmin.storage.from('gallery').remove([fileName]);
      if (deleteError) console.error('Storage delete error:', deleteError);
    }

    await query('DELETE FROM "GalleryImage" WHERE id = $1', [id]);

    revalidatePath('/admin/dashboard/gallery');
    revalidatePath('/gallery');
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete image');
  }
}