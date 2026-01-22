// Home.js
import React from 'react';
import Head from 'next/head';
import RoundedBgBtn from '@/components/Buttons/RoundedBgBtn';
import RoundedNotBGBtn from '@/components/Buttons/RoundedNotBGBtn';
import InfiniteScrollCarousel from './InfiniteScrollingImage';

// Fallback data in case API fails
const fallbackHeroData = {
  slogan: "Clean energy, unstoppable flow.",
  description: "Dudhkoshi Hydropower Nepal Pvt. Ltd. is a leading hydropower development company committed to delivering clean, reliable, and sustainable energy for Nepal's growing power needs. Established with a vision to harness Nepal's immense hydropower potential, the company specializes in planning, designing, developing, and managing high-quality hydropower projects that contribute to national energy security and economic growth.",
  btn1Text: "About Us",
  btn1Link: "#about-us",
  btn2Text: "Gallery",
  btn2Link: "#gallery"
};

// Function to fetch hero section data
const fetchHeroData = async () => {
  try {
    const BASE_API = process.env.BASE_API || 'http://localhost:4000/api';
    const response = await fetch(`${BASE_API}/contents/herosection`, {
      cache: 'no-store', // SSR - fresh data on every request
      // Or for better performance with ISR:
      // next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      const apiData = data.data[0];
      return {
        slogan: apiData.slogan || fallbackHeroData.slogan,
        description: apiData.description || fallbackHeroData.description,
        btn1Text: apiData.btn1Text || fallbackHeroData.btn1Text,
        btn1Link: apiData.btn1Link || fallbackHeroData.btn1Link,
        btn2Text: apiData.btn2Text || fallbackHeroData.btn2Text,
        btn2Link: apiData.btn2Link || fallbackHeroData.btn2Link
      };
    }
    
    return fallbackHeroData;
  } catch (error) {
    console.error('Failed to fetch hero section data:', error);
    return fallbackHeroData;
  }
};

// Main Hero Section Component
const Home1 = async () => {
  // Fetch hero section data from API during SSR
  const heroData = await fetchHeroData();

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content={heroData.description.substring(0, 160)} />
      </Head>
      
      <section className="bg-white pt-[120px] md:pt-20 lg:pt-24 max-w-[1400px] mx-auto px-[20px] lg:px-0">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8">
          <div className="flex flex-col justify-center py-8 lg:py-0">
            <h1 
              data-aos="fade-up" 
              className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[var(--primary1)] leading-tight"
            >
              {heroData.slogan}
            </h1>

            <p 
              data-aos="fade-up" 
              className="mt-8 text-lg sm:text-xl text-gray-600 w-full max-w-full"
            >
              {heroData.description}
            </p>

            <div className="mt-10 md:flex-row md:gap-1 gap-[10px] flex-col flex space-x-4">
              <RoundedBgBtn 
                label={heroData.btn1Text} 
                link={heroData.btn1Link} 
              />
              <RoundedNotBGBtn 
                label={heroData.btn2Text} 
                link={heroData.btn2Link} 
              />
            </div>
          </div>
          
          <div 
            data-aos="fade-right"
            className="lg:h-full flex items-center overflow-hidden justify-center"
          >
            <InfiniteScrollCarousel />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home1;