"use client";

import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from "../../../../public/img/blog/blog2.png";
import img2 from "../../../../public/img/proj/22.png";
import img3 from "../../../../public/img/proj/23.png";
import img4 from "../../../../public/img/proj/24.png";
import img5 from "../../../../public/img/proj/25.png";
import img6 from "../../../../public/img/proj/26.png";

// Fallback images in case API fails
const fallbackImages = [
  {
    original: img1.src,
    thumbnail: img1.src,
    originalAlt: "Gallery Image 1",
    thumbnailAlt: "Thumbnail 1"
  },
  {
    original: img2.src,
    thumbnail: img2.src,
    originalAlt: "Gallery Image 2",
    thumbnailAlt: "Thumbnail 2"
  },
  {
    original: img3.src,
    thumbnail: img3.src,
    originalAlt: "Gallery Image 3",
    thumbnailAlt: "Thumbnail 3"
  },
  {
    original: img4.src,
    thumbnail: img4.src,
    originalAlt: "Gallery Image 4",
    thumbnailAlt: "Thumbnail 4"
  },
  {
    original: img5.src,
    thumbnail: img5.src,
    originalAlt: "Gallery Image 5",
    thumbnailAlt: "Thumbnail 5"
  },
  {
    original: img6.src,
    thumbnail: img6.src,
    originalAlt: "Gallery Image 6",
    thumbnailAlt: "Thumbnail 6"
  },
];

export default function MyGallery() {
  const [images, setImages] = useState(fallbackImages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery images from API
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:3000/api';
        const BASE_CONTENT_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL  || 'http://localhost:3000';
        
        const response = await fetch(`${BASE_API}/contents/gallery`, {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both array and object response formats
        let galleryData;
        if (Array.isArray(data)) {
          galleryData = data;
        } else if (data.data && Array.isArray(data.data)) {
          galleryData = data.data;
        } else if (data.success && Array.isArray(data.data)) {
          galleryData = data.data;
        } else {
          galleryData = [];
        }
        
        if (galleryData.length > 0) {
          // Transform API data to match ImageGallery format
          const apiImages = galleryData.map((item, index) => {
            const imagePath = item.image || item.url || item.src;
            
            // Construct full image URLs
            const originalUrl = imagePath 
              ? imagePath.startsWith('http') 
                ? imagePath 
                : `${BASE_CONTENT_URL}${imagePath.replace(/^\//, '')}`
              : null;
            
            // Use the original image for both original and thumbnail
            // or you could create different sized versions if your API provides them
            return {
              original: originalUrl || fallbackImages[index]?.original || fallbackImages[0].original,
              thumbnail: originalUrl || fallbackImages[index]?.thumbnail || fallbackImages[0].thumbnail,
              originalAlt: item.title || `Gallery Image ${index + 1}`,
              thumbnailAlt: item.title || `Thumbnail ${index + 1}`,
              originalTitle: item.title || `Image ${index + 1}`,
              description: item.title || `Gallery Image ${index + 1}`,
            };
          }).filter(item => item.original); // Remove items with null URLs
          
          if (apiImages.length > 0) {
            setImages(apiImages);
          } else {
            setImages(fallbackImages);
          }
        } else {
          // If API returns empty array, use fallback
          setImages(fallbackImages);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch gallery data:', err);
        setError('Failed to load gallery images. Showing default gallery.');
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

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

  // Loading state
  if (loading) {
    return (
      <div className="" id="gallery">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
          Gallery
        </h2>
        <div className="animate-pulse">
          <div className="h-[500px] bg-gray-300 rounded-lg mb-4"></div>
          <div className="flex gap-2 justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 w-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4">Loading gallery images...</p>
      </div>
    );
  }

  return (
    <div className="" id="gallery">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
        Gallery
      </h2>
      
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-lg text-center">
          {error}
        </div>
      )}
      
      {/* Image count indicator */}
      <div className="text-center text-gray-600 mb-6">
        Showing {images.length} image{images.length !== 1 ? 's' : ''}
      </div>
      
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
      

    </div>
  );
}