"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import bimg1 from "../../../../public/img/blog/blog1.jpg";
import bimg2 from "../../../../public/img/blog/blog2.png";

// Fallback data in case API fails
const fallbackData = [
  {
    id: 1,
    title: "Laxmi Sunrise Bank-led consortium to invest in 70 MW Dudhkoshi 2",
    desc: `The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost of Rs 15 billion...`,
    img: bimg1.src,
    author_name: "Admin",
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    title: "दूधकोशी–२ आयोजनाको क्षमता बढेर पुग्यो ९६ मेगावाट, लागत पनि थपियो",
    desc: `काठमाडौँ। निजी लगानीमा निर्माण सुरु भएको दूधकोशी–२ अर्धजलासय जलविद्युत आयोजनाको क्षमता बढेर ९५.७ मेगावाट पुगेको छ...`,
    img: bimg2.src,
    author_name: "Admin",
    created_at: "2024-01-02T00:00:00.000Z"
  },
];

// Function to truncate text to a certain length
const truncateText = (text, maxLength = 150) => {
  if (!text || typeof text !== 'string') return '';
  
  // Remove HTML tags for clean text
  const cleanText = text.replace(/<[^>]*>/g, '');
  
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.substring(0, maxLength) + '...';
};

// Function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

// Individual Card Component
const CaseStudyCard = ({ study }) => {
  const BASE_CONTENT_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL || 'http://localhost:3000';
  
  return (
    <div className="bg-white rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="w-full h-auto overflow-hidden p-4">
        <Image
          width={400}
          height={200}
          src={study.img?.startsWith('http') || study.img?.startsWith('/') 
            ? study.img 
            : `${BASE_CONTENT_URL}/${study.img?.replace(/^\//, '')}`}
          alt={study.title}
          className="w-full h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
          unoptimized
          onError={(e) => {
            // Fallback to local images
            e.target.onerror = null;
            if (study.id % 2 === 0) {
              e.target.src = bimg2.src;
            } else {
              e.target.src = bimg1.src;
            }
          }}
        />
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3 line-clamp-2">
          {study.title}
        </h3>
        
        {/* Author and Date Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <span className="font-medium">By {study.author_name || 'Admin'}</span>
          </div>
          <div className="text-gray-400">
            {formatDate(study.created_at)}
          </div>
        </div>
        
        <div className="text-base text-gray-600 mb-4 flex-grow line-clamp-3">
          {truncateText(study.desc || study.content, 120)}
        </div>
        
        <Link 
          href={`/blog/${study.id}`} 
          className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start mt-auto"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

// Main App Component
export default function NewsAndCaseStudy() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:4000/api';
        const BASE_CONTENT_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL || process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:4000/';
        
        const response = await fetch(`${BASE_API}/contents/blogs`, {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiData = await response.json();
        
        // Handle different response formats
        let blogData;
        if (Array.isArray(apiData)) {
          blogData = apiData;
        } else if (apiData.data && Array.isArray(apiData.data)) {
          blogData = apiData.data;
        } else if (apiData.success && Array.isArray(apiData.data)) {
          blogData = apiData.data;
        } else {
          blogData = [];
        }
        
        if (blogData.length > 0) {
          // Transform API data to match our component structure
          const transformedData = blogData?.map((item) => ({
            id: item.id || Math.random(),
            title: item.title || 'Untitled Blog Post',
            desc: item.content || 'No content available',
            content: item.content,
            img: item.cover_image 
              ? `${BASE_CONTENT_URL}/${item.cover_image.replace(/^\//, '')}`
              : (blogData.indexOf(item) % 2 === 0 ? bimg1.src : bimg2.src),
            author_name: item.author_name || 'Admin',
            created_at: item.created_at || new Date().toISOString()
          }));
          
          setData(transformedData);
        } else {
          // If API returns empty array, use fallback
          setData(fallbackData);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blog data:', err);
        setError('Failed to load blog posts. Showing default articles.');
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogData();
  }, []);
  
  // Display data
  const displayData = data.length > 0 ? data : fallbackData;

  // Loading state
  if (loading) {
    return (
      <div data-aos="fade-up" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-[Inter]">
        <div className="max-w-[1440px] mx-auto">
          {/* Header - Centered */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="h-12 w-64 bg-gray-300 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-48 bg-gray-300 rounded mx-auto animate-pulse"></div>
          </div>

          {/* Responsive Grid Container - Loading skeleton */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl rounded-br-[95px] shadow-xl overflow-hidden flex flex-col h-full animate-pulse">
                {/* Image skeleton */}
                <div className="w-full h-[200px] bg-gray-300 m-4 rounded"></div>
                
                {/* Content skeleton */}
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-5 w-24 bg-gray-300 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 text-gray-500">
            Loading articles...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-aos="fade-up" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-[Inter]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header - Centered */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
          News and Case Studies
        </h2>
        
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-lg text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}
        
        {/* Display count */}
        <div className="text-center text-gray-600 mb-8">
          Showing {displayData.length} article{displayData.length !== 1 ? 's' : ''}
        </div>

        {/* Responsive Grid Container */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {displayData.map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        
        {/* View all button */}
        {/* {displayData.length > 3 && (
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150"
            >
              View All Articles
            </Link>
          </div>
        )} */}
        
        {/* Add custom styles for line clamping */}
        <style jsx global>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
        
      </div>
    </div>
  );
}