'use client';

import { useState, useEffect } from 'react';
import { getGalleryImages, uploadImage, deleteImage } from './actions';
import { X } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  tag: string;
  alt: string | null;
  createdAt: string;
}

const tags = ['Milestones', 'Community', 'Plantation', 'Products', 'Registered Agents', 'Seminars'];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    file: null as File | null,
    tag: '',
    alt: '',
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const data = await getGalleryImages();
    setImages(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

const handleUpload = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!uploadForm.file || !uploadForm.tag) {
    alert('Please select a file and a tag');
    return;
  }

  setUploading(true);
  const formData = new FormData();
  formData.append('file', uploadForm.file);
  formData.append('tag', uploadForm.tag);
  if (uploadForm.alt) formData.append('alt', uploadForm.alt);

  try {
    await uploadImage(formData);
    await loadImages();
    setShowUploadModal(false);
    setUploadForm({ file: null, tag: '', alt: '' });
  } catch (error) {
    console.error('Upload error:', error);
    alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    setUploading(false);
  }
};

  const handleDelete = async (id: string) => {
    if (confirm('Delete this image?')) {
      await deleteImage(id);
      await loadImages();
    }
  };

  if (loading) {
    return <div className="text-white p-6 text-center">Loading gallery...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Upload Image
        </button>
      </div>

      {images.length === 0 ? (
        <p className="text-gray-400 text-center">No images yet. Click Upload to add some.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-gray-800 p-2 rounded relative group">
              <img
                src={img.url}
                alt={img.alt || img.tag}
                className="w-full h-40 object-cover rounded"
              />
              <p className="text-sm mt-1">{img.tag}</p>
              {img.alt && <p className="text-xs text-gray-400 truncate">{img.alt}</p>}
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Upload Image</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Image File *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Tag *</label>
                <select
                  value={uploadForm.tag}
                  onChange={(e) => setUploadForm({ ...uploadForm, tag: e.target.value })}
                  required
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                >
                  <option value="">Select tag</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Alt Text (optional)</label>
                <input
                  type="text"
                  value={uploadForm.alt}
                  onChange={(e) => setUploadForm({ ...uploadForm, alt: e.target.value })}
                  placeholder="Describe the image"
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}