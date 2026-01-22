"use client";
import React, { useState, useEffect } from 'react'
import { MdEmail, MdPhone, MdLocationOn, MdMap } from 'react-icons/md';
import { FaLinkedinIn, FaTwitter, FaTelegramPlane, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// Framer Motion Variants for Staggered Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      duration: 0.8
    } 
  },
};

const ContactSection = () => {
  // State for company details
  const [companyDetails, setCompanyDetails] = useState({
    email: 'aayududhkoshi@gmail.com',
    mobNo: '00977-1- 4102710',
    mobNo2: '00977-1- 4102710',
    address: 'Anamnagar-29, Kathmandu, Nepal',
    insta: 'https://instagram.com/company',
    yt: 'https://youtube.com/company',
    twitter: 'https://twitter.com/company',
    fb: 'https://facebook.com/company',
    telegram: '#'
  });

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State for loading
  const [loading, setLoading] = useState({
    companyDetails: true,
    submitting: false
  });

  // State for success popup
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch company details from API
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(prev => ({ ...prev, companyDetails: true }));
        const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:3000/api';
        
        const response = await fetch(`${BASE_API}/contents/other`, {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          const details = data.data[0];
          setCompanyDetails({
            email: details.email || 'aayududhkoshi@gmail.com',
            mobNo: details.mobNo || '00977-1- 4102710',
            mobNo2: details.mobNo2 || '00977-1- 4102710',
            address: details.address || 'Anamnagar-29, Kathmandu, Nepal',
            insta: details.insta || 'https://instagram.com/',
            yt: details.yt || 'https://youtube.com/',
            twitter: details.twitter || 'https://twitter.com/',
            fb: details.fb || 'https://facebook.com/',
            telegram: '#'
          });
        }
        
      } catch (error) {
        console.error('Failed to fetch company details:', error);
        toast.error('Failed to load contact details');
      } finally {
        setLoading(prev => ({ ...prev, companyDetails: false }));
      }
    };

    fetchCompanyDetails();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, submitting: true }));
      
      const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:3000/api';
      
      const response = await fetch(`${BASE_API}/contents/clientmessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Show success popup
        setShowSuccess(true);
        toast.success('Message sent successfully!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        // Hide success popup after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        toast.error(data.message || 'Failed to send message');
      }
      
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  // Prepare contact details array
  const contactDetails = [
    { icon: MdEmail, label: 'Email Address', value: companyDetails.email },
    { icon: MdPhone, label: 'Phone Number', value: companyDetails.mobNo },
    { icon: MdMap, label: 'Office Location', value: companyDetails.address },
  ];

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">Your message has been sent successfully. We'll get back to you soon.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-3 bg-[var(--primary1)] text-white font-medium rounded-lg hover:bg-[var(--primary1-dark)] transition duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      <div className="min-h-screen bg-[var(--primary2)] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center" id='contact'>
        
        {/* Main Grid Container */}
        <motion.div
          className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* --- Left Side: Contact Info & Details --- */}
          <motion.div
            className="p-8 md:p-12 bg-[#3c3e43] rounded-2xl shadow-2xl relative overflow-hidden"
            variants={cardVariants}
            initial="hiddenLeft"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Header */}
            <motion.h2 
              className="text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight"
              variants={itemVariants}
            >
              Get In Touch With Us
            </motion.h2>

            <motion.p 
              className="text-white text-lg mb-10"
              variants={itemVariants}
            >
              We'd love to hear from you. Reach out to us through any of the channels below.
            </motion.p>
            
            {/* Loading state for company details */}
            {loading.companyDetails ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-4 animate-pulse">
                    <div className="flex-shrink-0 p-3 bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 w-48 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Contact Points */
              <motion.div 
                className="space-y-8"
                variants={containerVariants}
              >
                {contactDetails.map((detail, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-4"
                    variants={itemVariants}
                  >
                    <div className="flex-shrink-0 p-3 bg-[var(--primary1)] rounded-full text-white shadow-lg">
                      <detail.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{detail.label}</h3>
                      <p className="text-indigo-200 hover:text-indigo-100 transition duration-200">
                        {detail.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Social Icons */}
            <motion.div 
              className="mt-12 flex space-x-5"
              variants={itemVariants}
            >
              {companyDetails.fb !== '#' && (
                <a href={companyDetails.fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--primary1)] hover:text-indigo-400 transition transform hover:scale-110">
                  <FaFacebookF className="h-8 w-8" />
                </a>
              )}
              {companyDetails.twitter !== '#' && (
                <a href={companyDetails.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[var(--primary1)] hover:text-indigo-400 transition transform hover:scale-110">
                  <FaTwitter className="h-8 w-8" />
                </a>
              )}
              {companyDetails.insta !== '#' && (
                <a href={companyDetails.insta} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--primary1)] hover:text-indigo-400 transition transform hover:scale-110">
                  <FaInstagram className="h-8 w-8" />
                </a>
              )}
              {companyDetails.yt !== '#' && (
                <a href={companyDetails.yt} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[var(--primary1)] hover:text-indigo-400 transition transform hover:scale-110">
                  <FaYoutube className="h-8 w-8" />
                </a>
              )}
              {companyDetails.telegram !== '#' && (
                <a href={companyDetails.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-[var(--primary1)] hover:text-indigo-400 transition transform hover:scale-110">
                  <FaTelegramPlane className="h-8 w-8" />
                </a>
              )}
            </motion.div>

          </motion.div>


          {/* --- Right Side: Contact Form --- */}
          <motion.div 
            className="p-8 md:p-12 bg-white rounded-2xl shadow-2xl space-y-6"
            variants={cardVariants}
            initial="hiddenRight"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Form Structure */}
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Send a Message</h3>
            
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 outline-none hover:shadow-md"
                  required
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 outline-none hover:shadow-md"
                  required
                />
              </motion.div>
              
              {/* Message Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Your message..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 resize-none outline-none hover:shadow-md"
                  required
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={loading.submitting}
                  className={`w-full py-4 px-6 bg-[var(--primary1)] text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 ${
                    loading.submitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-indigo-700'
                  }`}
                >
                  {loading.submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </motion.div>
              
              {/* Form note */}
              <motion.p 
                className="text-sm text-gray-500 mt-4"
                variants={itemVariants}
              >
                * Required fields. We'll respond to your message within 24-48 hours.
              </motion.p>
            </form>

          </motion.div>

        </motion.div>
      </div>
    </>
  );
};

export default ContactSection;