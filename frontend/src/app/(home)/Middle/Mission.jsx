"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Gem } from "lucide-react";
import Image from "next/image";

// Fallback data in case API fails
const fallbackData = {
  heading: "Mission & Strategy",
  shortpara: "Deliver reliable renewable energy through sustainable hydropower development for Nepal's future growth.",
  firstCardHeading: "Deliver Sustainable Clean Energy",
  firstCardPara: "To develop reliable hydropower projects that contribute to Nepal's long-term energy security while promoting clean, renewable, and environmentally responsible power generation.",
  secCardHeading: "Empower Communities & Create Value",
  secCardPara: "To support local employment, uplift surrounding communities, and create long-term economic value for stakeholders, partners, and the nation.",
  thirdCardHeading: "Build with Excellence & Innovation",
  thirdCardPara: "To adopt modern engineering practices, advanced technologies, and international standards to ensure safe, efficient, and cost-effective project development from design to operation."
};

// Static MVV Data (as fallback)
const mvvData = [
  {
    title: "Deliver Sustainable Clean Energy",
    description: "To develop reliable hydropower projects that contribute to Nepal's long-term energy security while promoting clean, renewable, and environmentally responsible power generation.",
    icon: Target,
  },
  {
    title: "Empower Communities & Create Value",
    description: "To support local employment, uplift surrounding communities, and create long-term economic value for stakeholders, partners, and the nation.",
    icon: Eye,
  },
  {
    title: "Build with Excellence & Innovation",
    description: "To adopt modern engineering practices, advanced technologies, and international standards to ensure safe, efficient, and cost-effective project development from design to operation.",
    icon: Gem,
  },
];

// ----------------------------------------------------
// FRAMER MOTION CONFIGURATIONS
// ----------------------------------------------------

// 1. Container variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// 2. Card variants (Fade-in and subtle lift from the bottom)
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// 3. Image variants (Zoom-in and subtle Y-axis shift for parallax feel)
const imageVariants = {
  hidden: { opacity: 0, scale: 1.05, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.17, 0.55, 0.55, 1],
    },
  },
};

// ----------------------------------------------------
// Reusable Animated Card Component
// ----------------------------------------------------
const AnimatedMvvCard = ({ title, description, Icon }) => {
  return (
    <motion.div
      variants={cardVariants}
      className={`p-6 md:p-8 rounded-2xl bg-white shadow-xl
        transition-all duration-300 ease-in-out cursor-pointer h-full
        flex flex-col justify-start text-left border border-transparent 
        hover:border-[var(--primary1)] hover:shadow-2xl group`}
      whileHover={{ y: -5, scale: 1.01 }}
    >
      <div className="flex items-start mb-4">
        <div
          className={`p-3 rounded-xl mr-4 bg-[var(--primary1)] text-white 
            transition-all duration-300 ease-in-out 
            group-hover:bg-opacity-90`}
        >
          <Icon size={24} />
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-base text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------
// Main Modern Section
// ----------------------------------------------------
const ModernMissionSection = () => {
  const [data, setData] = useState(fallbackData);
  const [images, setImages] = useState({ img1: null, img2: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch mission data and images
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setLoading(true);
        const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:4000/api';
        const BASE_CONTENT_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL || 'http://localhost:4000/';

        // Fetch text data
        const textResponse = await fetch(`${BASE_API}/contents/mission`, {
          cache: 'no-cache',
        });

        if (textResponse.ok) {
          const textData = await textResponse.json();
          if (textData.success && textData.data) {
            setData(textData.data);
          }
        }

        // Fetch image data
        const imageResponse = await fetch(`${BASE_API}/contents/missionimg`, {
          cache: 'no-cache',
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          if (imageData.success && imageData.data) {
            const apiImages = imageData.data;
            setImages({
              img1: apiImages.img1 ? `${BASE_CONTENT_URL}uploads/missionimg/${apiImages.img1}` : null,
              img2: apiImages.img2 ? `${BASE_CONTENT_URL}uploads/missionimg/${apiImages.img2}` : null
            });
          }
        }

        setError(null);
      } catch (err) {
        console.error('Failed to fetch mission data:', err);
        setError('Failed to load mission data');
        // Use fallback data
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionData();
  }, []);

  // Map API data to MVV cards structure
  const apiMvvData = [
    {
      title: data.firstCardHeading || mvvData[0].title,
      description: data.firstCardPara || mvvData[0].description,
      icon: Target,
    },
    {
      title: data.secCardHeading || mvvData[1].title,
      description: data.secCardPara || mvvData[1].description,
      icon: Eye,
    },
    {
      title: data.thirdCardHeading || mvvData[2].title,
      description: data.thirdCardPara || mvvData[2].description,
      icon: Gem,
    },
  ];

  // Use API data or fallback
  const displayMvvData = apiMvvData;

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-50 py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Loading skeleton for left side */}
            <div className="space-y-8">
              <div className="animate-pulse">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-12 w-64 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 w-full bg-gray-300 rounded mb-8"></div>
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse p-6 md:p-8 rounded-2xl bg-white shadow-xl">
                  <div className="flex items-start">
                    <div className="p-3 rounded-xl mr-4 bg-gray-300"></div>
                    <div className="flex-1">
                      <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-full bg-gray-300 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-300 rounded mt-1"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Loading skeleton for right side */}
            <div className="h-[500px] lg:h-[700px] animate-pulse">
              <div className="w-full h-full bg-gray-300 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Define your primary color variable here for consistency
  const primaryColor = "var(--primary1)";

  return (
    <section 
      className="bg-gray-50 py-16 md:py-24 overflow-hidden" 
      style={{ '--primary1': '#1e7ebb' }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT SIDE: Content and Staggered Cards */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-base font-semibold text-[var(--primary1)] uppercase tracking-wider mb-2">
                Our Foundation
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary1)] to-[var(--primary2)]">
                  {data.heading?.split('&')[0] || 'Mission'}
                </span> & {data.heading?.split('&')[1] || 'Strategy'}
              </h2>

              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
                {data.shortpara}
              </p>
            </motion.div>

            {/* MVV CARDS - Framer Motion Staggered Container */}
            <motion.div
              className="flex flex-col gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {displayMvvData.map((item, idx) => (
                <AnimatedMvvCard
                  key={idx}
                  title={item.title}
                  description={item.description}
                  Icon={item.icon}
                />
              ))}
            </motion.div>

            {/* Error message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error} - Showing fallback content
              </div>
            )}
          </div>

         {/* RIGHT SIDE: Image Block - Now with two images */}
<div className="order-1 lg:order-2 h-full flex items-center justify-center">
  <motion.div
    className="relative w-full max-w-2xl flex flex-col items-center justify-center gap-6"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Main Image (img1 from API) */}
    <motion.div
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
      variants={imageVariants}
    >
      {images.img1 ? (
        <Image
        unoptimized
          src={images.img1}
          alt="Hydropower Mission Image 1"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Mission Image 1</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
    </motion.div>

    {/* Secondary Image (img2 from API) */}
    <motion.div
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
      variants={imageVariants}
      initial={{ opacity: 0, scale: 1.05, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.17, 0.55, 0.55, 1], delay: 0.2 }}
    >
      {images.img2 ? (
        <Image
        unoptimized
          src={images.img2}
          alt="Hydropower Mission Image 2"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <span className="text-blue-600">Mission Image 2</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
    </motion.div>
  </motion.div>
</div>

        </div>
      </div>
    </section>
  );
};

export default ModernMissionSection;