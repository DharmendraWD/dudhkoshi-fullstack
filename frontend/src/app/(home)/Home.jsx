
import React from 'react';
import Head from 'next/head';
import RoundedBgBtn from '@/components/Buttons/RoundedBgBtn';
import RoundedNotBGBtn from '@/components/Buttons/RoundedNotBGBtn';
import InfiniteScrollCarousel from './InfiniteScrollingImage';





// Main Hero Section Component
const Home1 = async() => {

 
      

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      
      <section className="bg-white  pt-[120px] md:pt-20 lg:pt-24 max-w-[1400px] mx-auto px-[20px] lg:px-0">
        
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8">
          
          <div className="flex flex-col justify-center py-8 lg:py-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[var(--primary1)] leading-tight">
           Clean energy, unstoppable flow.
            </h1>

            <p data-aos="fade-up" className="mt-8 text-lg sm:text-xl text-gray-600 w-full max-w-full">
         Dudhkoshi Hydropower Nepal Pvt. Ltd. is a leading hydropower development company committed to delivering clean, reliable, and sustainable energy for Nepal’s growing power needs. Established with a vision to harness Nepal’s immense hydropower potential, the company specializes in planning, designing, developing, and managing high-quality hydropower projects that contribute to national energy security and economic growth.
            </p>

            <div className="mt-10 md:flex-row md:gap-1 gap-[10px] flex-col flex space-x-4">
          
<RoundedBgBtn 
  label={"About Us"} 
  link={"#about-us"} 
/>
          <RoundedNotBGBtn 
  label={"Gallary"} 
  link={"#gallery"} 
/>
            </div>
          </div>
          
          <div 
         data-aos="fade-right"
          className="lg:h-full flex items-center overflow-hidden justify-center ">
            <InfiniteScrollCarousel/>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Home1;