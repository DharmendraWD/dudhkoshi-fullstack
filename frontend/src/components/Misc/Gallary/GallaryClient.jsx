"use client";
import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const GallaryClient = ({images}) => {

  // Custom render for gallery items to handle image loading errors
  const renderItem = (item) => {
    const handleImageError = (e) => {
      console.error('Image failed to load:', e.target.src);
      // Try to fallback to local image based on index
      const fallbackIndex = images.findIndex(img => img.original === item.original);
      if (fallbackIndex >= 0 && fallbackImages[fallbackIndex]) {
        e.target.src = fallbackImages[fallbackIndex].original;
      } else {
        e.target.src = fallbackImages[0].original;
      }
    };

    return (
      <div className="image-gallery-image">
        <img
          src={item.original}
          alt={item.originalAlt || item.description || 'Gallery Image'}
          onError={handleImageError}
          loading="lazy"
        />
        {item.description && (
          <span className="image-gallery-description">
            {item.description}
          </span>
        )}
      </div>
    );
  };

  // Custom render for thumbnail items
  const renderThumbInner = (item) => {
    const handleThumbError = (e) => {
      console.error('Thumbnail failed to load:', e.target.src);
      // Try to fallback to local thumbnail based on index
      const fallbackIndex = images.findIndex(img => img.thumbnail === item.thumbnail);
      if (fallbackIndex >= 0 && fallbackImages[fallbackIndex]) {
        e.target.src = fallbackImages[fallbackIndex].thumbnail;
      } else {
        e.target.src = fallbackImages[0].thumbnail;
      }
    };

    return (
      <div className="image-gallery-thumbnail-inner">
        <img
          src={item.thumbnail}
          alt={item.thumbnailAlt || 'Thumbnail'}
          onError={handleThumbError}
          loading="lazy"
        />
      </div>
    );
  };


    
  return (
         <ImageGallery 
        items={images} 
        renderItem={renderItem}
        renderThumbInner={renderThumbInner}
        showPlayButton={true}
        showFullscreenButton={true}
        showNav={true}
        autoPlay={false}
        slideInterval={5000}
        slideDuration={450}
        additionalClass="custom-gallery min-w-[100%]"
      />
  )
}

export default GallaryClient