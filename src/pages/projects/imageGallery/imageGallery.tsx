import React, { useState } from 'react';
import './imageGallery.css';

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(null);

  return (
    <div className="gallery-container">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`img-${idx}`}
          className="gallery-thumb"
          onClick={() => setActive(img)}
        />
      ))}
      {active && (
        <div className="gallery-modal" onClick={() => setActive(null)}>
          <img src={active} alt="fullview" className="gallery-full" />
        </div>
      )}
    </div>
  );
}
