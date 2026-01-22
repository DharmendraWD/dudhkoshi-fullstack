
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Gem } from "lucide-react";

// NOTE: Replace this with your actual image path or use Next/image
import IMAGE_SRC from "../../../../public/img/blog/blog2.png"

// Static MVV Data (Same as yours)
const mvvData = [
  {
    title: "Deliver Sustainable Clean Energy",
    description:
      "To develop reliable hydropower projects that contribute to Nepal’s long-term energy security while promoting clean, renewable, and environmentally responsible power generation.",
    icon: Target,
  },
  {
    title: "Empower Communities & Create Value",
    description:
      "To support local employment, uplift surrounding communities, and create long-term economic value for stakeholders, partners, and the nation.",
    icon: Eye,
  },
  {
    title: "Build with Excellence & Innovation",
    description:
      "To adopt modern engineering practices, advanced technologies, and international standards to ensure safe, efficient, and cost-effective project development from design to operation.",
    icon: Gem,
  },
];

// ----------------------------------------------------
// FRAMER MOTION CONFIGURATIONS
// ----------------------------------------------------

// 1. Container variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child card
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
      ease: [0.17, 0.55, 0.55, 1], // Custom slow ease for a smooth feel
    },
  },
};

// ----------------------------------------------------
// Reusable Animated Card Component
// ----------------------------------------------------
const AnimatedMvvCard = ({ title, description, Icon }) => {
  return (
    <motion.div
      variants={cardVariants} // Apply the fade-in animation
      className={`p-6 md:p-8 rounded-2xl bg-white shadow-xl
        transition-all duration-300 ease-in-out cursor-pointer h-full
        flex flex-col justify-start text-left border border-transparent 
        hover:border-[var(--primary1)] hover:shadow-2xl group`}
      whileHover={{ y: -5, scale: 1.01 }} // Subtle lift on hover
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
const ModernMissionSection = () => {
  // Define your primary color variable here for consistency
  // NOTE: You should ensure '--primary1' is defined in your global CSS or Tailwind config
  const primaryColor = "var(--primary1)"; 

  return (
    <section className="bg-gray-50 py-16 md:py-24 overflow-hidden" 
             style={{ '--primary1': '#1e7ebb' }} // Example primary color for standalone use
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
                        Mission
                    </span> & Strategy
                </h2>

                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
                    Deliver reliable renewable energy through sustainable hydropower
                    development for Nepal’s future growth.
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
              {mvvData.map((item, idx) => (
                <AnimatedMvvCard
                  key={idx}
                  title={item.title}
                  description={item.description}
                  Icon={item.icon}
                />
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE: Image Block */}
          <div className="order-1 lg:order-2 h-full min-h-[500px] lg:min-h-[700px] flex items-center">
            <motion.div
              className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={IMAGE_SRC.src}
                alt="Hydropower Site Survey"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 20%' }} // Adjust focus on the image
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ModernMissionSection;