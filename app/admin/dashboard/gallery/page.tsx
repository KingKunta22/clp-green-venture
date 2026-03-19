'use client';

import { useState } from 'react';

interface GalleryImage {
  id: number;
  url: string;
  tag: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([
    { id: 1, url: '/images/gallery/milestones/1.jpg', tag: 'Milestones' },
    { id: 2, url: '/images/gallery/community/1.jpg', tag: 'Community' },
  ]);

  const handleUpload = () => {
    alert('Upload functionality – will be integrated with cloud storage later');
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this image?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>
      <div className="flex justify-between mb-4">
        <button onClick={handleUpload} className="bg-green-600 px-4 py-2 rounded">Upload Image</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="bg-gray-800 p-2 rounded relative group">
            <img src={img.url} alt={img.tag} className="w-full h-32 object-cover rounded" />
            <p className="text-sm mt-1">{img.tag}</p>
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}