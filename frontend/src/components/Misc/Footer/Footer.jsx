"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaInstagram, FaTwitter, FaTelegramPlane, FaYoutube, FaFacebookF } from 'react-icons/fa';

// Navigation links remain the same
const navigationLinks = [
  {
    title: "Main pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "#about-us" },
      { name: "Gallery", href: "#gallery" },
      { name: "Our Team", href: "#about-teams" },
      { name: "Contact", href: "#contact" },
    ]
  },
];

// Default data
const defaultData = {
  email: "aayududhkoshi@gmail.com",
  mobNo: "00977-1- 4102710",
  address: "Anamnagar-29, Kathmandu, Nepal",
  insta: "",
  twitter: "",
  yt: "",
  fb: "",
  mapLocation: "27.685466426456884,85.33743717507464",
  copyright: "© 2026 Dudhkoshi",
  developedby: "Aayu Softtech"
};

export default function Footer() {
  const [footerData, setFooterData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const BASE_APIw = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:30000/api';
        
        const response = await fetch(`${BASE_APIw}/contents/other`, {
                 next: { revalidate: 60 }, // Revalidate every 60 seconds

          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          const apiData = data.data[0];
          
          // Construct Google Maps URL from location or use coordinates
          let mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0300394987266!2d85.33743717507464!3d27.685466426456884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1993784f2fd5%3A0x3c08787f319fa742!2sDudhkoshi%20Power%20Co.!5e0!3m2!1sen!2snp!4v1765701175818!5m2!1sen!2snp";
          
          // If location field contains coordinates, use them
          if (apiData.location && apiData.location.includes(',')) {
            const [lat, lng] = apiData.location.split(',').map(coord => coord.trim());
            mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14142.901227029273!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v${Date.now()}!5m2!1sen!2snp`;
          }
          
          setFooterData({
            email: apiData.email || defaultData.email,
            mobNo: apiData.mobNo || defaultData.mobNo,
            address: apiData.address || defaultData.address,
            insta: apiData.insta || "",
            twitter: apiData.twitter || "",
            yt: apiData.yt || "",
            fb: apiData.fb || "",
            mapLocation: mapUrl,
            copyright: apiData.copyright || defaultData.copyright,
            developedby: apiData.developedby || defaultData.developedby
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch footer data:', err);
        setError('Failed to load footer information');
        // Keep default data
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Social links from API data
  const socialLinks = [
    { icon: FaInstagram, href: footerData.insta, label: "Instagram" },
    { icon: FaTwitter, href: footerData.twitter, label: "Twitter" },
    { icon: FaFacebookF, href: footerData.fb, label: "Facebook" },
    { icon: FaYoutube, href: footerData.yt, label: "YouTube" },
  ].filter(social => social.href); // Only show social links that have URLs

  // Loading state
  if (loading) {
    return (
      <footer data-aos="fade-up" className="bg-[#F9F9FF] pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="container mx-auto px-4 max-w-[1440px] relative">
          {/* Loading skeleton for main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-12 gap-y-10 md:gap-x-8 lg:gap-x-12 animate-pulse">
            {/* Navigation links skeleton */}
            <div>
              <div className="h-6 w-32 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-24 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
            
            {/* Contact card skeleton */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start lg:mt-0 mt-8">
              <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-lg space-y-4">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
                <div className="h-4 w-56 bg-gray-300 rounded"></div>
                <div className="flex gap-3 mt-4 pt-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map loading skeleton */}
          <div className="mb-12">
            <div className="h-6 w-40 bg-gray-300 rounded mx-auto mb-4"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>

          {/* Copyright loading */}
          <div className="text-center pt-8 mt-12 border-t border-gray-200">
            <div className="h-4 w-48 bg-gray-300 rounded mx-auto"></div>
            <div className="h-3 w-32 bg-gray-300 rounded mx-auto mt-2"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer data-aos="fade-up" className="bg-[#F9F9FF] pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-[1440px] relative">
        
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        {/* Main Footer Grid - Links, Map, Contact Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-12 gap-y-10 md:gap-x-8 lg:gap-x-12">
          
          {/* Navigation Link Columns */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="flex-col">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 hover:text-primary1 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Address Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start lg:mt-0 mt-8">
            <div className="relative w-full rounded-br-[95px] overflow-hidden rounded-lg shadow-md mb-4">
              <div className="col-span-1 lg:col-span-1 xl:col-span-1 lg:ml-auto lg:mt-0 mt-8"> 
                <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg flex flex-col space-y-4 w-full mx-auto lg:mx-0">
                  <p className="text-lg font-semibold text-gray-900 mb-2">Let's talk</p>
                  
                  <div className="flex items-start">
                    <MdEmail className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <a 
                      href={`mailto:${footerData.email}`} 
                      className="text-gray-700 hover:text-primary1 transition-colors"
                    >
                      {footerData.email}
                    </a>
                  </div>
                  
                  <div className="flex items-start">
                    <MdPhone className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <a 
                      href={`tel:${footerData.mobNo.replace(/\s+/g, '')}`} 
                      className="text-gray-700 hover:text-primary1 transition-colors"
                    >
                      {footerData.mobNo}
                    </a>
                  </div>

                  <div className="flex items-start">
                    <MdLocationOn className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      {footerData.address}
                    </span>
                  </div>

                  <div className="flex justify-start space-x-3 mt-4 pt-4 border-t border-gray-200">
                    {socialLinks.map((social, index) => (
                      <a 
                        key={index}
                        href={social.href} 
                        aria-label={social.label}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[var(--primary1)] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div> 

        {/* Map Section */}
        <div data-aos="fade-up">
          <p className="text-gray-700 font-medium text-center mb-4">Our Location</p>
          <iframe
            src={footerData.mapLocation}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Company Location Map"
          ></iframe>
        </div>

        {/* Copyright Section */}
        <div data-aos="fade-up" className="text-center pt-8 mt-12 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            {footerData.copyright}
          </p>
          <p className="text-gray-500 text-[12px] mt-1">
            Developed by {footerData.developedby}
          </p>
        </div>

      </div>
    </footer>
  );
}