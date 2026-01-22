"use client";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Import fallback images
import img1 from "../../../public/img/proj/11.png";
import img2 from "../../../public/img/proj/23.png";
import img3 from "../../../public/img/proj/24.png";
import img4 from "../../../public/img/proj/25.png";
import img5 from "../../../public/img/proj/26.png";
import img6 from "../../../public/img/proj/27.png";

// --- Configuration ---
const DURATION = 35;
const IMAGE_WIDTH_PX = 250; 
const GAP_PX = 16;

// Fallback images array
const fallbackImages = [
    img1.src,
    img2.src,
    img3.src,
    img4.src,
    img5.src,
    img6.src
];

// Function to fetch hero images
const fetchHeroImages = async () => {
  try {
    const BASE_API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';
    const response = await fetch(`${BASE_API}/contents/herosectionimg`, {
      cache: 'no-cache', // Fresh data for client-side
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    let imageArray;
    if (Array.isArray(data)) {
      imageArray = data;
    } else if (data.data && Array.isArray(data.data)) {
      imageArray = data.data;
    } else if (data.success && data.data) {
      imageArray = Array.isArray(data.data) ? data.data : [];
    } else {
      imageArray = [];
    }
    
    // Transform images to full URLs
    return imageArray.map(item => {
      const imagePath = item.image || item.url || item.src;
      
      if (!imagePath) return null;
      
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      
      // Construct full URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL || 'http://localhost:4000';
      return `${baseUrl}${imagePath.replace(/^\//, '')}`;
    }).filter(Boolean);
    
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }
};

const ImageCard = ({ src, alt, width, height }) => (
    <div 
        className="flex-shrink-0 rounded-xl shadow-lg overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
    >
        <Image
            unoptimized
            width={width}
            height={height}
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
        />
    </div>
);

const SameDirectionScrollCarousel = () => {
    const controlsTop = useAnimation();
    const controlsBottom = useAnimation();
    const [isHovering, setIsHovering] = useState(false);
    const [images, setImages] = useState(fallbackImages);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch images on client-side
    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            try {
                const apiImages = await fetchHeroImages();
                
                if (apiImages.length > 0) {
                    setImages(apiImages);
                } else {
                    // Use fallback if API returns empty array
                    setImages(fallbackImages);
                }
            } catch (error) {
                console.error('Failed to load images:', error);
                setImages(fallbackImages);
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
    }, []);

    // Tripled images for smooth infinite scroll
    const carouselImages = [...images, ...images, ...images];

    const SINGLE_SET_WIDTH_PX = (IMAGE_WIDTH_PX * images.length) + (GAP_PX * (images.length - 1));
    const CONTAINER_WIDTH_PX = (SINGLE_SET_WIDTH_PX * 3) + (GAP_PX * 2);

    // Animation variants
    const scrollVariants = {
        scroll: {
            x: `-${SINGLE_SET_WIDTH_PX}px`,
            transition: {
                x: {
                    type: 'tween',
                    ease: 'linear',
                    duration: DURATION,
                    repeat: Infinity,
                },
            },
        },
        paused: {
            transition: {
                duration: 0,
            },
        }
    };

    // Start animations when component mounts and images are loaded
    useEffect(() => {
        if (!isLoading) {
            controlsTop.start('scroll');
            controlsBottom.start('scroll');
        }
    }, [isLoading, controlsTop, controlsBottom]);

    const handleMouseEnter = () => {
        setIsHovering(true);
        controlsTop.stop();
        controlsBottom.stop();
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        controlsTop.start('scroll');
        controlsBottom.start('scroll');
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="w-full overflow-hidden py-10 bg-white">
                <div className="flex flex-col gap-6">
                    <div className="flex gap-4 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div 
                                key={`loading-top-${i}`}
                                className="flex-shrink-0 rounded-xl bg-gray-200"
                                style={{ width: `${IMAGE_WIDTH_PX}px`, height: '160px' }}
                            />
                        ))}
                    </div>
                    <div className="flex gap-4 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div 
                                key={`loading-bottom-${i}`}
                                className="flex-shrink-0 rounded-xl bg-gray-200"
                                style={{ width: `${IMAGE_WIDTH_PX}px`, height: '160px' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="w-full overflow-hidden py-10 bg-white"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col gap-6">
                {/* Row 1 */}
                <motion.div
                    className="flex flex-row gap-4"
                    style={{ width: `${CONTAINER_WIDTH_PX}px` }}
                    variants={scrollVariants}
                    animate={isHovering ? 'paused' : controlsTop}
                >
                    {carouselImages.map((src, index) => (
                        <ImageCard 
                            key={`top-${index}`}
                            src={src}
                            alt={`Hero Image ${(index % images.length) + 1}`}
                            width={IMAGE_WIDTH_PX}
                            height={160}
                        />
                    ))}
                </motion.div>

                {/* Row 2 (Reversed) */}
                <motion.div
                    className="flex flex-row gap-4"
                    style={{ 
                        width: `${CONTAINER_WIDTH_PX}px`,
                        transform: `translateX(-${IMAGE_WIDTH_PX * 1.5}px)`
                    }}
                    variants={scrollVariants}
                    animate={isHovering ? 'paused' : controlsBottom}
                >
                    {carouselImages.slice().reverse().map((src, index) => (
                        <ImageCard 
                            key={`bottom-${index}`}
                            src={src}
                            alt={`Hero Image ${(index % images.length) + 1}`}
                            width={IMAGE_WIDTH_PX}
                            height={160}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SameDirectionScrollCarousel;