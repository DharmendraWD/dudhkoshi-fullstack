"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

const TeamProfileClient = ({active, teamMembers}) => {
  const [activeMemberId, setActiveMemberId] = useState(active);
    const primaryColor = '#1e7ebb';

  const activeMember = teamMembers.find(member => member.id === active);



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
                  className="absolute inset-0 bg-black transition duration-300 opZeroInNoJs" 
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

export default TeamProfileClient