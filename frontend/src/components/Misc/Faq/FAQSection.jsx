// components/FAQSection.jsx
"use client"; // This component requires client-side interactivity (useState, onClick)

import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Using FaPlus and FaMinus for clarity

// --- MOCK FAQ DATA ---

const FAQSection = () => {









let data= [
  {
question: "1. What is the Dudhkoshi-2 (Jaleswar) Hydroelectric Project?",
answer:"It is a 95.7 MW, 6-hour peaking run-of-river hydropower project located in Solukhumbu, Koshi Province. The project utilizes the Dudhkoshi River to generate clean and reliable energy for Nepal.",
id:1
  },
  {
question: "2. Who owns and develops the project?",
answer:"The project is developed by Dudhkoshi Hydropower Nepal Pvt. Ltd., a company dedicated to sustainable hydropower development and modern engineering solutions.",
id:2
  },
  {
question: "3. How much energy will the project generate annually?",
answer:"The project will generate approximately 543.48 GWh of energy annually, including dry-season and wet-season production optimized for Nepal’s power demand.",
id:3
  },
  {
question: "4. How accessible is the project site?",
answer:`The project area is accessible via BP Highway → Khurkot → Nele, followed by an 18 km gravel road to the dam site. It is also close to Phaplu Airport (37 km).`,
id:4
  },
  {
question: " 5. What benefits will the project bring to the local community?",
answer:` The project supports local jobs, infrastructure development, community upliftment, and contributes to Nepal’s overall energy security through clean, renewable power generation.`,
id:5
  },
   {
    id: 6,
    question: "6. What type of hydropower scheme is Dudhkoshi-2?",
    answer: "It is a 6-hour peaking run-of-river (PRoR) hydropower scheme designed to supply stable energy during peak demand periods."
  },
  {
    id: 7,
    question: "7. What is the installed capacity of the project?",
    answer: "The installed capacity of the Dudhkoshi-2 Hydroelectric Project is 95.7 MW, generated through two vertical-axis Francis turbines."
  },
  {
    id: 8,
    question: "8. How long is the headrace tunnel of the project?",
    answer: "The project includes a 4,791-meter-long concrete-lined inverted D-shaped headrace tunnel for efficient water conveyance."
  }
]





  // State to manage which FAQ item is currently open/expanded
  const [openId, setOpenId] = useState(null);

  // Function to toggle the open state of an FAQ item
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section data-aos="fade-up" className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          
{/* Right Column: Accordion FAQ Items */}
          <div className="w-full">
            {data?.map((item) => (
              <div key={item.id} className="border-b border-gray-300 py-6">
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="flex justify-between cursor-pointer items-center w-full text-left text-gray-900 focus:outline-none"
                  aria-expanded={openId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="text-xl md:text-2xl ">{item.question}</span>
                  <span className="text-gray-500 transition-transform duration-300">
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
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === item.id ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                  // Note: max-h-[200px] is a safe estimate for average answer length.
                  // For very long answers, you might need a larger max-h value.
                >
                  <p className="text-gray-600 text-lg pr-4">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left Column: Heading and Description */}
          <div className="lg:pr-8 flex flex-col items-end text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Some questions, <br />some answers.
            </h2>
            <p className="text-lg text-gray-700 max-w-sm mx-auto lg:mx-0">
              Have a look at my most frequently asked questions.
            </p>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default FAQSection;