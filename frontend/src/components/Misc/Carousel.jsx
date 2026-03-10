import React from 'react';

import map from "../../../public/img/map.png"
import img2 from "../../../public/img/proj/28.png";
import CarouselClient from './CarouselClient';

// Fallback data in case API fails
const fallbackData = {
  heading: "About Us",
  longPara: "Dudhkoshi Hydropower Nepal Pvt. Ltd., established in 2070 B.S. and headquartered in Anamnagar, Kathmandu, is a dedicated hydropower development company committed to advancing Nepal's clean and sustainable energy future. The company is developing the Dudhkoshi-2 (Jaleshwor) Hydropower Project, a 95.7 MW optimized Peaking Run-of-River (PROR) project located on the Dudhkoshi River in Thulung Dudhkoshi, Solukhumbu District of Koshi Province. Backed by an experienced leadership team and strong institutional partners, the project is strategically designed on solid bedrock with robust geological conditions and reliable access, and is positioned to make a significant contribution to national power supply while supporting long-term economic and energy security in Nepal.",
  firstCardHeading: "Foundation",
  firstCardPara: "Our company stands on a strong foundation of transparency, accountability, and ethical hydropower development, ensuring every project is planned and executed with integrity. Backed by experienced engineers, consultants, and industry experts, our foundation is shaped by precision, innovation, and proven hydropower expertise. We are grounded in the belief that hydropower should benefit both people and the planet driving clean energy, empowering communities, and supporting Nepal's sustainable future.",
  secCardHeading: "Where we Operate",
  secCardPara: "Dudhkoshi Hydropower Nepal Pvt. Ltd. operates in one of Nepal's most promising hydropower regions — Solukhumbu District, located in Koshi Province. Our primary operational focus is the development of the Dudhkoshi-2 (Jaleswar) Hydroelectric Project, a 95.7 MW run-of-river project strategically positioned along the Dudhkoshi River.",
  thirdCardHeading: "Capacity",
  thirdCardHeading2: "97.5MW",
  thirdCardPara: "The Dudhkoshi-2 (Jaleswar) Hydroelectric Project is designed as a 95.7 MW peaking run-of-river (PRoR) hydropower project optimized to meet Nepal's growing demand for reliable and sustainable energy. The project uses a design discharge of 83.5 m³/s and a gross head of 144.5 meters, enabling high-efficiency power generation even during dry seasons."
};

// Function to fetch about us data
const fetchAboutUsData = async () => {
  try {
    const BASE_API = process.env.BASE_API || 'http://localhost:4000/api';
    const response = await fetch(`${BASE_API}/contents/aboutus`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return fallbackData;
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
      const apiData = data?.data?.[0];
      // console.log(apiData)
      return {
        heading: apiData.heading || fallbackData.heading,
        longPara: apiData.longPara || fallbackData.longPara,
        firstCardHeading: apiData.firstCardHeading || fallbackData.firstCardHeading,
        firstCardPara: apiData.firstCardPara || fallbackData.firstCardPara,
        secCardHeading: apiData.secCardHeading || fallbackData.secCardHeading,
        secCardPara: apiData.secCardPara || fallbackData.secCardPara,
        thirdCardHeading: apiData.thirdCardHeading || fallbackData.thirdCardHeading,
        thirdCardHeading2: apiData.thirdCardHeading2 || fallbackData.thirdCardHeading2,
        thirdCardPara: apiData.thirdCardPara || fallbackData.thirdCardPara
      };
    }
    
    return fallbackData;
  } catch (error) {
    console.error('Failed to fetch about us data:', error);
    return fallbackData;
  }
};

// Function to fetch about us images
const fetchAboutUsImages = async () => {
  try {
    const BASE_API = process.env.BASE_API || 'http://localhost:4000/api';
    const BASE_CONTENT_URL = process.env.BASE_CONTENT_URL || 'http://localhost:4000';
    
    const response = await fetch(`${BASE_API}/contents/aboutusimg`, {
      cache: 'no-cache',

    });
    
    if (!response.ok) {
      return { fullImage: null, firstCardImage: null };
    }
    
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      const apiImages = data.data[0];
      
      return {
        fullImage: apiImages.fullImage 
          ? `${BASE_CONTENT_URL}uploads/aboutusimg/${apiImages.fullImage}`
          : null,
        firstCardImage: apiImages.firstCardImage
          ? `${BASE_CONTENT_URL}uploads/aboutusimg/${apiImages.firstCardImage}`
          : null
      };
    }
    
    return { fullImage: null, firstCardImage: null };
  } catch (error) {
    console.error('Failed to fetch about us images:', error);
    return { fullImage: null, firstCardImage: null };
  }
};

const Carousel = async () => {
  // Fetch data on the server side
  const aboutData = await fetchAboutUsData();
  const aboutImages = await fetchAboutUsImages();

  // Determine which image to use for each card
  const firstCardImageSrc = aboutImages.firstCardImage || img2.src;
  const mapImageSrc = aboutImages.fullImage || map.src;
  // console.log(aboutData)

  return (
    <>
    <h1>daldn</h1>
<CarouselClient aboutData={aboutData} firstCardImageSrc={firstCardImageSrc} mapImageSrc={mapImageSrc} aboutImages={aboutImages}/>
</>
  );
};

export default Carousel;