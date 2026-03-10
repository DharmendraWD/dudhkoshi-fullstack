
"use client";
import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Gem } from "lucide-react";


const MissionClient = ({mvvDataDynamic, images}) => {
  const BASE_CONTENT_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL || 'http://localhost:4000/';


  const apiMvvData = [
    {
      title: mvvDataDynamic?.firstCardHeading || mvvData[0].title,
      description: mvvDataDynamic?.firstCardPara || mvvData[0].description,
      icon: Target,
    },
    {
      title: mvvDataDynamic?.secCardHeading || mvvData[1].title,
      description: mvvDataDynamic?.secCardPara || mvvData[1].description,
      icon: Eye,
    },
    {
      title: mvvDataDynamic?.thirdCardHeading || mvvData[2].title,
      description: mvvDataDynamic?.thirdCardPara || mvvData[2].description,
      icon: Gem,
    },
  ];

  const primaryColor = "var(--primary1)";


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

  return (
    <>
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
                  {mvvDataDynamic.heading?.split('&')[0] || 'Mission'}
                </span> & 
                {mvvDataDynamic.heading?.split('&')[1] || 'Strategy'}
              </h2>

              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
                {mvvDataDynamic.shortpara}
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
              {apiMvvData?.map((item, idx) => (
                <AnimatedMvvCard
                  key={idx}
                  title={item.title}
                  description={item.description}
                  Icon={item.icon}
                />
              ))}
            </motion.div>

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

    <motion.div
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
      variants={imageVariants}
    >
      {images.img1 ? (
        <Image
        unoptimized
          src={BASE_CONTENT_URL + "/uploads/missionimg/" + images.img2}
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
                 src={BASE_CONTENT_URL + "/uploads/missionimg/" + images.img1}
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
    </>
  )
}

export default MissionClient