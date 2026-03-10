
"use client";
import React from 'react'
import Image from 'next/image';
import elec from "../../../public/img/electric.png"

const Card = ({ children, className }) => (
  <div
    className={`p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-[1.01] ${className}`}
  >
    {children}
  </div>
);
const CarouselClient = ({aboutData, firstCardImageSrc, mapImageSrc, aboutImages}) => {

    
  return (
       <div className="max-w-[1440px] pt-4 mx-auto bg-white" id='about-us'>
      <div className="relative flex items-center justify-center overflow-hidden bg-white font-[Inter]">
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="zoom-out-up" className="flex justify-center">
            <button className="px-6 py-2 bg-white text-gray-900 font-medium text-xl rounded-full shadow-lg transition duration-200 hover:shadow-xl hover:text-gray-800 border border-gray-200">
              {aboutData.heading}
            </button>
          </div>
          
          <p 
            data-aos="zoom-out-up" 
            className="text-l pb-8 sm:text-xl text-gray-700 text-start leading-relaxed max-w-[100%] mx-auto mt-4 border-blue-600 pt-4"
          >
            {aboutData.longPara}
            {aboutData.longPara.includes("95.7 MW") && (
              <span className='font-semibold'> 95.7 MW</span>
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:h-[350px] min-h-[60vh]">
        {/* Image Card - First column */}
        <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">
          <div className="relative w-full h-full">
            <div data-aos="zoom-out-up" className="flex h-full">
              <Image 
                width={300}
                height={300}
                unoptimized
                src={firstCardImageSrc}
                alt="Side view of the hydropower dam structure"
                className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Foundation Card - Second column */}
        <Card className="bg-[var(--primary1)] text-gray-800 lg:col-span-1 lg:row-span-1 border border-gray-100 h-full">
          <h3 data-aos="zoom-out-up" className="text-l font-semibold mb-4 text-gray-300 opacity-75">
            {aboutData.firstCardHeading}
          </h3>
          <p data-aos="zoom-out-up" className="leading-relaxed text-white">
            {aboutData.firstCardPara}
          </p>
        </Card>

        {/* Capacity Card - Third column */}
        <Card 
          data-aos="zoom-out-up" 
          className="bg-[var(--primary1)] text-white lg:col-span-1 lg:row-span-1 h-full relative overflow-hidden flex flex-col justify-between"
        >
          <div className='flex md:flex-row flex-col justify-between'>
            <div data-aos="zoom-out-up">
              <h3 className="text-l font-semibold opacity-75">
                {aboutData.thirdCardHeading}
              </h3>
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative text-xl font-extrabold">
                  {aboutData.thirdCardHeading2}
                </div>
              </div>
              <p className="mt-4 overflow-auto my-scroll text-l leading-relaxed max-w-[100%] lg:max-w-xs">
                {aboutData.thirdCardPara}
              </p>
            </div>
            <Image 
              src={elec} 
              width={200} 
              className='w-[20%]' 
              height={200} 
              alt="electricity icon" 
            />
          </div>
        </Card>
      </div>

      {/* Where we Operate Card - Full width */}
      <Card className="bg-[var(--primary2)] mt-8 mb-4 text-white lg:col-span-2 lg:row-span-1 h-full overflow-hidden">
        <div className='flex md:flex-row flex-col items-center justify-between'>
          <div className='w-[90%]'>
            <h3 className="text-xl font-bold mb-4 opacity-75 text-gray-100">
              {aboutData.secCardHeading}
            </h3>
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-repeat [background-image:radial-gradient(currentColor_1px,_transparent_1px)] [background-size:20px_20px]"></div>
            </div>
            <div className="relative z-10">
              <p data-aos="zoom-out-up" className="text-lg leading-relaxed max-w-2x text-gray-100">
                {aboutData.secCardPara}
              </p>
            </div>
          </div>
          <Image 
            data-aos="zoom-out-up" 
            src={mapImageSrc} 
            width={300}
            height={200}
            className='w-full md:w-auto max-w-[300px]' 
            alt="map" 
            unoptimized
          />
        </div>
      </Card>
    </div>
  )
}

export default CarouselClient