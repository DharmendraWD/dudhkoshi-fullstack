"use client";
import img1 from "../../../../public/img/testimonial/1.jpg";
import img2 from "../../../../public/img/testimonial/2.jpg";
import img3 from "../../../../public/img/testimonial/3.jpg";
import img4 from "../../../../public/img/testimonial/4.jpg";
import img5 from "../../../../public/img/testimonial/5.jpg";
import deve from "../../../../public/img/testimonial/deve.jpeg";

import { motion } from "framer-motion";

import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';


import sabinProfile from "../../../../public/img/gallary/1.png"; // Replace with your path
import collageImage from "../../../../public/img/gallary/1.png"; // Replace with your path

// Define data for the profile
// data/team.js or inside the component file
export const teamMembers = [
  {
    id: 1,
    name: "Kadam KC",
    title: "CHAIRMAN",
    bio: `Background in Env. Science &
Geotechnical Eng (UK). Entrepreneur
in Hydropower & Construction. MD
of Puwa Khola-1 (4MW), Aayu
Malun (21MW), Upper Tamor A
(60MW).`,
    profileImage: img1, // The main circular image
    thumbnailImage: img1, // The image in the horizontal list
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
    bio: `A leading businessman in the construction and infrastructure sector, with extensive experience driving growth across multiple enterprises. He leads Rajesh Trade Link, RTL Mall, and Goyal Aluminum, overseeing operations supported by a strong nationwide distribution network. His leadership focuses on strategic expansion, operational excellence, and building scalable businesses that deliver consistent quality, market reach, and long-term value across the construction and infrastructure ecosystem.
`, 
    profileImage: img2,
    thumbnailImage:img2,
    social: { /* ... */ }
  },
   {
    id: 3,
    name: "Bikram Gautam",
    title: "Director",
    bio: `With over 15 years of experience leading large-scale manufacturing and construction teams, He brings deep expertise in the Real Estate and Mines business sectors. He has a strong track record in end-to-end product development, operational leadership, and project execution. His experience includes strategic planning, cross-functional team management, process optimization, and delivering high-quality, cost-effective solutions that drive sustainable business growth and long-term value.
`,
    profileImage: img3,
    thumbnailImage:img3,
    social: { /* ... */ }
  },
    {
    id: 4,
    name: "Abhigya Malla",
    title: "Director",
    bio: `Holds Masters in Professional Accountancy and Commerce in Finance (Macquarie 
University, Australia). Vice President/Finance Controller at High Himalaya Hydro 
Construction Pvt. Ltd. Project developer and youth contractor, involved in Aayu 
Malun - 21 MW, Puwa Khola - 4 MW, Hongu Khola - 28.9 MW, Midim Khola - 3 
MW, and Upper Tamor A - 60 MW. Managing Director of Union Hydropower Public 
Ltd.`,
    profileImage: img4,
    thumbnailImage:img4,
    social: { /* ... */ }
  },
    {
    id: 5,
    name: "Devendra Adhikari",
    title: "Director",
    bio: `A seasoned entrepreneur with 30+ years
of experience in trading, export,
agriculture, and real estate; former
Director of Lumbini Finance and
Lumbini Bikash Bank; active capital
market investor and real estate developer`,
    profileImage: deve,
    thumbnailImage:deve,
    social: { /* ... */ }
  },
     
];

// Define the assumed primary color from your design (the blue line)
// This should match a color defined in your tailwind.config.js, or use inline styles.

export default function TeamProfile() {
const primaryColor = '#1e7ebb'; // Example Indigo-600
const [activeMemberId, setActiveMemberId] = useState(teamMembers[0].id);
  const activeMember = teamMembers.find(member => member.id === activeMemberId);

  // Fallback in case of an issue
if (!activeMember) {
    // Optionally render a loading spinner or an error message instead of null
     <div>Member Not Found</div>; 
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
        </div>

        











        {/* ----------------- */}
        {/* 2. Main Content Grid (Responsive Layout) */}
      <motion.div
         initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDE: Profile Details */}
        <div className="lg:w-1/2 flex flex-col items-start">
          <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-600">
             {/* Use activeMember.profileImage for the circular image */}
            <img src={activeMember?.profileImage?.src} alt={activeMember.name} className="w-full object-top h-full object-cover" />
          </div>
          
          <h3 className="text-3xl font-bold mb-1 text-gray-900">
            {activeMember.name}
          </h3>
          <p className="text-xl text-[var(--primary1)] mb-4">
            {activeMember.title}
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mb-8">
            <a href={activeMember.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaLinkedin size={24} /></a>
            <a href={activeMember.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaTwitter size={24} /></a>
            <a href={activeMember.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaInstagram size={24} /></a>
            <a href={activeMember.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaYoutube size={24} /></a>
          </div>
          
          {/* Biography Paragraph */}
          <p className="text-gray-700 leading-relaxed max-w-lg">
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
                src={member?.thumbnailImage?.src ? member.thumbnailImage.src : member?.thumbnailImage} 
                alt={member?.thumbnailImage}
                // Tailwind: object-cover ensures the image fills the dynamic container
                className="w-full h-full object-cover" 
              />
       
              {/* Optional: Add a subtle overlay for better text contrast if you add text */}
              <div className="absolute inset-0 bg-black transition duration-300" 
                   style={{ opacity: activeMemberId === member.id ? 0 : 0.2 }}>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
      </div>
    </section>
  );
}