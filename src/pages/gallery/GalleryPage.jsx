
import React, { useState } from 'react';

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  const handleUpload = e => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...urls]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Photo Gallery</h1>
      <input type="file" accept="image/*" multiple onChange={handleUpload} className="mt-2" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`upload-${i}`} className="w-full h-auto rounded shadow" />
        ))}
      </div>
    </div>
  );
}
