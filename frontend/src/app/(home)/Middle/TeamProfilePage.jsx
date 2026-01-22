"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

// Fallback team data in case API fails
const fallbackTeamMembers = [
  {
    id: 1,
    name: "Kadam KC",
    title: "CHAIRMAN",
    bio: `Background in Env. Science & Geotechnical Eng (UK). Entrepreneur in Hydropower & Construction. MD of Puwa Khola-1 (4MW), Aayu Malun (21MW), Upper Tamor A (60MW).`,
    profileImage: "/img/testimonial/1.jpg",
    thumbnailImage: "/img/testimonial/1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 2,
    name: "Arun Kumar Agarwal",
    title: "Director",
    bio: `A leading businessman in the construction and infrastructure sector, with extensive experience driving growth across multiple enterprises. He leads Rajesh Trade Link, RTL Mall, and Goyal Aluminum, overseeing operations supported by a strong nationwide distribution network. His leadership focuses on strategic expansion, operational excellence, and building scalable businesses that deliver consistent quality, market reach, and long-term value across the construction and infrastructure ecosystem.`,
    profileImage: "/img/testimonial/2.jpg",
    thumbnailImage: "/img/testimonial/2.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 3,
    name: "Bikram Gautam",
    title: "Director",
    bio: `With over 15 years of experience leading large-scale manufacturing and construction teams, He brings deep expertise in the Real Estate and Mines business sectors. He has a strong track record in end-to-end product development, operational leadership, and project execution. His experience includes strategic planning, cross-functional team management, process optimization, and delivering high-quality, cost-effective solutions that drive sustainable business growth and long-term value.`,
    profileImage: "/img/testimonial/3.jpg",
    thumbnailImage: "/img/testimonial/3.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 4,
    name: "Abhigya Malla",
    title: "Director",
    bio: `Holds Masters in Professional Accountancy and Commerce in Finance (Macquarie University, Australia). Vice President/Finance Controller at High Himalaya Hydro Construction Pvt. Ltd. Project developer and youth contractor, involved in Aayu Malun - 21 MW, Puwa Khola - 4 MW, Hongu Khola - 28.9 MW, Midim Khola - 3 MW, and Upper Tamor A - 60 MW. Managing Director of Union Hydropower Public Ltd.`,
    profileImage: "/img/testimonial/4.jpg",
    thumbnailImage: "/img/testimonial/4.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 5,
    name: "Devendra Adhikari",
    title: "Director",
    bio: `A seasoned entrepreneur with 30+ years of experience in trading, export, agriculture, and real estate; former Director of Lumbini Finance and Lumbini Bikash Bank; active capital market investor and real estate developer`,
    profileImage: "/img/testimonial/deve.jpeg",
    thumbnailImage: "/img/testimonial/deve.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
];

export default function TeamProfile() {
  const [teamMembers, setTeamMembers] = useState(fallbackTeamMembers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMemberId, setActiveMemberId] = useState(fallbackTeamMembers[0].id);
  
  const primaryColor = '#1e7ebb';

  // Fetch team data from API
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:4000/api';
        const BASE_CONTENT_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL || 'http://localhost:4000/';
        
        const response = await fetch(`${BASE_API}/contents/team`, {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
          // Transform API data to match our component structure
          const apiTeamMembers = data.data.map((member, index) => ({
            id: member.id || index + 1,
            name: member.name || `Team Member ${index + 1}`,
            title: member.designation || "Team Member",
            bio: member.description || "Description not available",
            profileImage: member.dp 
              ? `${BASE_CONTENT_URL}uploads/team/${member.dp}`
              : `/img/testimonial/${(index % 5) + 1}.jpg`,
            thumbnailImage: member.dp 
              ? `${BASE_CONTENT_URL}uploads/team/${member.dp}`
              : `/img/testimonial/${(index % 5) + 1}.jpg`,
            social: {
              linkedin: "#",
              twitter: "#",
              instagram: "#",
              youtube: "#",
            }
          }));
          
          setTeamMembers(apiTeamMembers);
          setActiveMemberId(apiTeamMembers[0].id);
          setError(null);
        } else {
          // If API returns empty array, use fallback
          setTeamMembers(fallbackTeamMembers);
          setActiveMemberId(fallbackTeamMembers[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch team data:', err);
        setError('Failed to load team data. Showing default information.');
        setTeamMembers(fallbackTeamMembers);
        setActiveMemberId(fallbackTeamMembers[0].id);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const activeMember = teamMembers.find(member => member.id === activeMemberId);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-white" id="about-teams">
        <div className="container mx-auto px-4 max-w-[1440px]">
          {/* Loading skeleton for header */}
          <div className="mb-12 md:mb-16">
            <div className="w-16 h-1 bg-gray-300 mb-2 animate-pulse"></div>
            <div className="h-12 w-48 bg-gray-300 mb-4 animate-pulse rounded"></div>
            <div className="h-6 w-64 bg-gray-300 animate-pulse rounded"></div>
          </div>

          {/* Loading skeleton for main content */}
          <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
            {/* Left side skeleton */}
            <div className="lg:w-1/2">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-6"></div>
              <div className="h-8 w-48 bg-gray-300 mb-2 rounded"></div>
              <div className="h-6 w-32 bg-gray-300 mb-4 rounded"></div>
              <div className="flex space-x-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gray-300 rounded-full"></div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Right side skeleton */}
            <div className="lg:w-1/2 flex justify-between h-96 overflow-hidden rounded-lg bg-gray-300">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-full ${i === 0 ? 'w-[45%]' : 'w-[11%]'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!activeMember) {
    return (
      <section className="py-12 md:py-20 bg-white" id="about-teams">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No Team Members Found</h3>
            <p className="text-gray-600">Please check back later or contact support.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-white" id="about-teams">
      <div className="container mx-auto px-4 max-w-[1440px]">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          {/* Blue Underline Style */}
          <div className="w-16 h-1 bg-indigo-600 mb-2" style={{ backgroundColor: primaryColor }}></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            Behind Our Big Success.
          </p>
          
          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* 2. Main Content Grid (Responsive Layout) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row gap-8"
        >
          
          {/* LEFT SIDE: Profile Details */}
          <div className="lg:w-1/2 flex flex-col items-start">
            <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-600">
              {/* Profile image */}
              <img 
                src={activeMember.profileImage} 
                alt={activeMember.name} 
                className="w-full object-top h-full object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  e.target.onerror = null;
                  e.target.src = `/img/testimonial/${(activeMember.id % 5) + 1}.jpg`;
                }}
              />
            </div>
            
            <h3 className="text-3xl font-bold mb-1 text-gray-900">
              {activeMember.name}
            </h3>
            <p className="text-xl text-[var(--primary1)] mb-4">
              {activeMember.title}
            </p>
            
            {/* Social Icons */}
  
            
            {/* Biography Paragraph */}
            <p className="text-gray-700 leading-relaxed max-w-lg whitespace-pre-line">
              {activeMember.bio}
            </p>
          </div>

          {/* RIGHT SIDE: Dynamic Image Gallery */}
          <div className="lg:w-1/2 flex justify-between h-96 overflow-hidden rounded-lg shadow-2xl">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`relative h-full cursor-pointer 
                            transition-all duration-500 ease-in-out
                            ${activeMemberId === member.id 
                                ? 'w-[45%] md:w-2/3 opacity-100' // Active: Wider
                                : 'w-[11%] md:w-[25%] opacity-70'  // Inactive: Thinner
                            }`}
                onClick={() => setActiveMemberId(member.id)}
              >
                <img
                  src={member.thumbnailImage}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.onerror = null;
                    e.target.src = `/img/testimonial/${(member.id % 5) + 1}.jpg`;
                  }}
                />
         
                {/* Optional: Add a subtle overlay for better text contrast if you add text */}
                <div 
                  className="absolute inset-0 bg-black transition duration-300" 
                  style={{ opacity: activeMemberId === member.id ? 0 : 0.2 }}
                ></div>
              </div>
            ))}
          </div>

        </motion.div>
        
        {/* Team member count indicator */}
        {/* <div className="mt-8 text-sm text-gray-500">
          Showing {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
        </div> */}
      </div>
    </section>
  );
}