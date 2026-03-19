'use client';

import { useState } from 'react';

const tags = ['Milestones', 'Community', 'Plantation', 'Products', 'Registered Agents', 'Seminars'];

interface ImageItem {
  id: number;
  url: string;
  tag: string;
}

// Mock images
const mockImages: ImageItem[] = [
  { id: 1, url: '/images/gallery/milestones/1.jpg', tag: 'Milestones' },
  { id: 2, url: '/images/gallery/community/1.jpg', tag: 'Community' },
];

export default function GalleryManager() {
  const [images, setImages] = useState<ImageItem[]>(mockImages);

  const handleUpload = () => {
    // In a real app, open file picker and upload to cloud storage
    alert('Upload functionality – will be integrated with cloud storage later');
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this image?')) {
      setImages(images.filter(img => img.id !== id));
      // TODO: call server action to delete from storage
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl">Gallery</h2>
        <button onClick={handleUpload} className="bg-green-600 px-4 py-2 rounded">Upload Image</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="bg-gray-800 p-2 rounded relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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