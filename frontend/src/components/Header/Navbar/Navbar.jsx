
"use client";
// components/Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logo from "../../../../public/img/logof.png"
import { motion } from "framer-motion";


// Define the navigation links
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: 'about-us' },
  { name: 'Gallery', href: 'gallery' },
  { name: 'About teams', href: 'about-teams' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Helper component for the hamburger/X icon
  const HamburgerIcon = () => (
    <div className="flex flex-col justify-center items-center w-6 h-6 cursor-pointer">
      <div
        className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
        }`}
      ></div>
      <div
        className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></div>
      <div
        className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
          isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
        }`}
      ></div>
    </div>
  );

  return (
    <nav className="border-b border-gray-100 bg-white fixed z-[999999999] w-full">

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">


        <motion.div className="flex justify-between gap-2 md:justify-center lg:gap-[40px] items-center h-20"
        initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* Replace with your actual Logo component or image */}
            <div className="flex items-center flex-col justify-center rounded-sm">
                {/* Placeholder for the complex orange logo graphic */}
             <img src={logo.src} className='w-[50px] lg:w-[60px]' alt="" /> 
             <span className='text-[var(--primary1)] text-[11px] lg:text-sm font-bold'>Dudhkoshi</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8"
           
          >
            {/* {navLinks.map((item) => ( */}
              <Link
                key={"Home"}
                             href={"/"} 

                className={`text-base font-medium transition duration-150 ease-in-out ${
                  router.pathname === "/"
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {"Home"}
              </Link>
              <Link
          
                key={"About Us"}
                             href={"/#about-us"} 

                className={`text-base font-medium transition duration-150 ease-in-out ${
                  router.pathname === "#about-us"
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {"About Us"}
              </Link>
              <Link
                key={"Gallary"}
                             href={"/#gallery"} 

                className={`text-base font-medium transition duration-150 ease-in-out ${
                  router.pathname === "#gallery"
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {"Gallery"}
              </Link>
              <Link
                key={"About Teams"}
                             href={"/#about-teams"} 

                className={`text-base font-medium transition duration-150 ease-in-out ${
                  router.pathname === "#about-teams"
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {"About Team"}
              </Link>
            {/* ))} */}
            
            {/* Contact Button (Desktop) */}
            <Link 
              href="/#contact"
              // Use Tailwind's utility for the primary color: 
              // The class 'bg-primary1' would need to be defined in tailwind.config.js
              // Using indigo-600 as a visual match for the example image's button color
              className="px-6 py-2 text-base font-medium text-white bg-[var(--primary1)] rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
               // Fallback for primary1
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="text-gray-900"
            >
              <span className="sr-only">Open main menu</span>
              <HamburgerIcon />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        id="mobile-menu" 
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-2 pb-3 space-y-1 px-2 sm:px-3">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={`#${item.href}`} 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition duration-150 ease-in-out"
            >
              {item.name}
            </Link>
          ))}
          

          
          {/* Contact Button (Mobile) */}
          <div className="pt-4 px-3">
            <Link
            href={"#contact"}
              onClick={() => {  setIsOpen(false); }}
              className="w-full px-4 py-2 text-base font-medium text-white bg-[var(--primary1)] rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
             // Fallback for primary1
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;