import RoundedBgBtn from "@/components/Buttons/RoundedBgBtn";
import Link from "next/link";

// Function to fetch other data from API
async function fetchOtherData() {
  try {
    const BASE_API = process.env.BASE_API || 'http://localhost:3000/api';
    
    const response = await fetch(`${BASE_API}/contents/other`, {
      cache: 'no-store', // SSR - fresh data on every request
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      const otherData = data.data[0];
      return {
        slogan: otherData.c || "Sustainable Energy for a Brighter Tomorrow.",
        description: otherData.d || "We harness the pure, natural flow of Nepal's rivers to deliver reliable, sustainable and environmentally friendly hydro-electric power. Our mission is to light homes, empower communities, and build a cleaner future for Nepal..."
      };
    }
    
    // Return fallback data if API returns but no data
    return {
      slogan: "Sustainable Energy for a Brighter Tomorrow.",
      description: "We harness the pure, natural flow of Nepal's rivers to deliver reliable, sustainable and environmentally friendly hydro-electric power. Our mission is to light homes, empower communities, and build a cleaner future for Nepal...."
    };
    
  } catch (error) {
    console.error('Failed to fetch other data:', error);
    // Return fallback data if API fails
    return {
      slogan: "Sustainable Energy for a Brighter Tomorrow.",
      description: "We harness the pure, natural flow of Nepal's rivers to deliver reliable, sustainable and environmentally friendly hydro-electric power. Our mission is to light homes, empower communities, and build a cleaner future for Nepal..."
    };
  }
}

// This is a Server Component by default in Next.js App Router
export default async function FooterHero() {
  // Fetch data on the server
  const { slogan, description } = await fetchOtherData();

  return (
    <section className="bg-white py-20 md:py-28 text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Main Heading - Using API data for slogan */}
        <h2 
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="800"
          data-aos-offset="0" 
          className="text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary1)] to-[var(--primary2)] font-extrabold uppercase tracking-wider mb-8"
        >
          {slogan}
        </h2>

        {/* Sub-description - Using API data for description */}
        <p 
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="800"
          data-aos-offset="0" 
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12"
        >
          {description}
        </p>

        {/* Call-to-Action Button */}
        <Link 
          href={"#about-us"} 
          className="px-6 py-3 text-lg font-medium text-white bg-[var(--primary1)] m-0 rounded-[50px] cursor-pointer shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Go to Up
        </Link>  
      </div>
    </section>
  );
}