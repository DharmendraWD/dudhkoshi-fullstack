

import img1 from "../../../../public/img/blog/blog2.png";
import img2 from "../../../../public/img/proj/22.png";
import img3 from "../../../../public/img/proj/23.png";
import img4 from "../../../../public/img/proj/24.png";
import img5 from "../../../../public/img/proj/25.png";
import img6 from "../../../../public/img/proj/26.png";
import GallaryClient from "./GallaryClient";

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

export default async function MyGallery() {
  let images = fallbackImages;

  // Fetch gallery images from API
      try {
        const BASE_API = process.env.BASE_API || 'http://localhost:3000/api';
        const BASE_CONTENT_URL = process.env.BASE_CONTENT_URL  || 'http://localhost:3000';
        
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
           images = apiImages;
          } else {
           images = fallbackImages;
          }
        } else {
          // If API returns empty array, use fallback
                     images = fallbackImages;

        }

      } catch (err) {
        console.error('Failed to fetch gallery data:', err);
                 images = fallbackImages;

      } finally {
      }







  return (
    <div className="" id="gallery">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
        Gallery
      </h2>

      
      {/* Image count indicator */}
      <div className="text-center text-gray-600 mb-6">
        Showing {images.length} image{images.length !== 1 ? 's' : ''}
      </div>
      
<GallaryClient images={images} />
      

    </div>
  );
}