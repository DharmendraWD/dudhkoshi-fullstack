"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

// Fallback FAQ data
const fallbackFAQs = [
  {
    id: 1,
    question: "1. What is the Dudhkoshi-2 (Jaleswar) Hydroelectric Project?",
    answer: "It is a 95.7 MW, 6-hour peaking run-of-river hydropower project located in Solukhumbu, Koshi Province. The project utilizes the Dudhkoshi River to generate clean and reliable energy for Nepal.",
  },
  {
    id: 2,
    question: "2. Who owns and develops the project?",
    answer: "The project is developed by Dudhkoshi Hydropower Nepal Pvt. Ltd., a company dedicated to sustainable hydropower development and modern engineering solutions.",
  },
  {
    id: 3,
    question: "3. How much energy will the project generate annually?",
    answer: "The project will generate approximately 543.48 GWh of energy annually, including dry-season and wet-season production optimized for Nepal's power demand.",
  },
  {
    id: 4,
    question: "4. How accessible is the project site?",
    answer: "The project area is accessible via BP Highway → Khurkot → Nele, followed by an 18 km gravel road to the dam site. It is also close to Phaplu Airport (37 km).",
  },
  {
    id: 5,
    question: "5. What benefits will the project bring to the local community?",
    answer: "The project supports local jobs, infrastructure development, community upliftment, and contributes to Nepal's overall energy security through clean, renewable power generation.",
  },
  {
    id: 6,
    question: "6. What type of hydropower scheme is Dudhkoshi-2?",
    answer: "It is a 6-hour peaking run-of-river (PRoR) hydropower scheme designed to supply stable energy during peak demand periods.",
  },
  {
    id: 7,
    question: "7. What is the installed capacity of the project?",
    answer: "The installed capacity of the Dudhkoshi-2 Hydroelectric Project is 95.7 MW, generated through two vertical-axis Francis turbines.",
  },
  {
    id: 8,
    question: "8. How long is the headrace tunnel of the project?",
    answer: "The project includes a 4,791-meter-long concrete-lined inverted D-shaped headrace tunnel for efficient water conveyance.",
  }
];

const FAQSection = () => {
  // State to manage FAQ data
  const [faqData, setFaqData] = useState(fallbackFAQs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State to manage which FAQ item is currently open/expanded
  const [openId, setOpenId] = useState(null);

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:3000/api';
        
        const response = await fetch(`${BASE_API}/contents/faqs`, {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        let faqList;
        if (Array.isArray(data)) {
          faqList = data;
        } else if (data.data && Array.isArray(data.data)) {
          faqList = data.data;
        } else if (data.success && Array.isArray(data.data)) {
          faqList = data.data;
        } else {
          // Handle single FAQ object format from your example
          if (data.ques && data.ans) {
            faqList = [{
              id: 1,
              question: data.ques,
              answer: data.ans
            }];
          } else {
            faqList = [];
          }
        }
        
        if (faqList.length > 0) {
          // Transform API data to match our component structure
          const transformedFAQs = faqList.map((item, index) => ({
            id: item.id || index + 1,
            question: item.ques || item.question || `Question ${index + 1}`,
            answer: item.ans || item.answer || 'Answer not available',
          }));
          
          setFaqData(transformedFAQs);
        } else {
          // Use fallback if API returns empty
          setFaqData(fallbackFAQs);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch FAQs:', err);
        setError('Failed to load FAQs. Showing default questions.');
        setFaqData(fallbackFAQs);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Function to toggle the open state of an FAQ item
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Loading state
  if (loading) {
    return (
      <section data-aos="fade-up" className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Left Column - Loading skeleton */}
            <div className="lg:pr-8 flex flex-col items-end text-center lg:text-left">
              <div className="h-12 w-64 bg-gray-300 rounded mb-4 animate-pulse"></div>
              <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            {/* Right Column - Loading skeleton */}
            <div className="w-full">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="border-b border-gray-300 py-6 animate-pulse">
                  <div className="flex justify-between items-center w-full">
                    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="mt-4">
                    <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-aos="fade-up" className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* Right Column: Accordion FAQ Items */}
          <div className="w-full">
            {error && (
              <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                {error}
              </div>
            )}
            
            {faqData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">No FAQs available at the moment.</p>
              </div>
            ) : (
              faqData.map((item) => (
                <div key={item.id} className="border-b border-gray-300 py-6">
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="flex justify-between cursor-pointer items-center w-full text-left text-gray-900 focus:outline-none hover:text-blue-600 transition-colors duration-200"
                    aria-expanded={openId === item.id}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className="text-xl md:text-2xl pr-4">{item.question}</span>
                    <span className="text-gray-500 transition-transform duration-300 flex-shrink-0">
                      {openId === item.id ? 
                          <FaMinus className="w-5 h-5" /> : 
                          <FaPlus className="w-5 h-5" />
                      }
                    </span>
                  </button>
                  
                  {/* Answer Section (conditionally rendered with animation) */}
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openId === item.id ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-600 text-lg pr-4 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))
            )}
            
            {/* FAQ count */}
            <div className="mt-6 text-sm text-gray-500">
              {faqData.length} question{faqData.length !== 1 ? 's' : ''} available
            </div>
          </div>

          {/* Left Column: Heading and Description */}
          <div className="lg:pr-8 flex flex-col items-end text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Some questions, <br />some answers.
            </h2>
            <p className="text-lg text-gray-700 max-w-sm mx-auto lg:mx-0">
              Have a look at our most frequently asked questions.
            </p>
            
            {/* Info about FAQs */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-sm">
              <p className="text-sm text-blue-700">
                {faqData.length > 0 
                  ? `We've answered ${faqData.length} common questions to help you understand our project better.`
                  : 'FAQ questions will appear here once loaded.'
                }
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;