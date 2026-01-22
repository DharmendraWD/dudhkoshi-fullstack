import React from 'react';
import wp from "../../../../public/img/wp1.jpg"
import { Form } from './Form';
import Navbar from '@/components/Header/Navbar/Navbar';
import Footer from '@/components/Misc/Footer/Footer';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import HTMLReactParser from 'html-react-parser';
import bimg1 from "../../../../public/img/blog/blog1.jpg"
import bimg2 from "../../../../public/img/blog/blog2.png"

// Fallback statistics (kept as original)
const STATISTICS = [
    { value: "500k", label: "cost savings" },
    { value: "$500k", label: "cost savings" },
    { value: "95%", label: "customer satisfactions" },
    { value: "5%", label: "market shares growth" },
];

// Fallback blog data
const fallbackBlogs = [
    {
        id: 1,
        title: "Laxmi Sunrise Bank-led consortium to invest in 70 MW Dudhkoshi 2",
        content: `The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost of Rs 15 billion. "This venture will play a crucial role in Nepal's renewable energy landscape," reads a LSBL-issued press statement.`,
        cover_image: bimg1.src,
        author_name: "Admin",
        created_at: "2024-01-01T00:00:00.000Z",
        desc: `The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost of Rs 15 billion. "This venture will play a crucial role in Nepal's renewable energy landscape," reads a LSBL-issued press statement.`
    },
    {
        id: 2,
        title: "दूधकोशी–२ आयोजनाको क्षमता बढेर पुग्यो ९६ मेगावाट, लागत पनि थपियो",
        content: `काठमाडौँ। निजी लगानीमा निर्माण सुरु भएको दूधकोशी–२ अर्धजलासय जलविद्युत आयोजनाको क्षमता बढेर ९५.७ मेगावाट पुगेको छ। यसअघि ७० मेगावाटमा आयोजना डिजाइन गरिएको थियो।`,
        cover_image: bimg2.src,
        author_name: "Admin",
        created_at: "2024-01-02T00:00:00.000Z",
        desc: `काठमाडौँ। निजी लगानीमा निर्माण सुरु भएको दूधकोशी–२ अर्धजलासय जलविद्युत आयोजनाको क्षमता बढेर ९५.७ मेगावाट पुगेको छ। यसअघि ७० मेगावाटमा आयोजना डिजाइन गरिएको थियो।`
    },
];

// Function to fetch blog data by ID
async function fetchBlogById(id) {
    try {
        const BASE_API = process.env.BASE_API || 'http://localhost:4000/api';
        const BASE_CONTENT_URL = process.env.BASE_CONTENT_URL || 'http://localhost:4000/';
        
        const response = await fetch(`${BASE_API}/contents/blogs/${id}`, {
            cache: 'no-store', // SSR - fresh data on every request
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data) {
            // Handle both object and wrapped response formats
            const blogData = data.data || data;
            
            return {
                id: blogData.id || id,
                title: blogData.title || 'Untitled Blog',
                content: blogData.content || 'No content available',
                cover_image: blogData.cover_image 
                    ? `${BASE_CONTENT_URL}uploads/blogs/${blogData.cover_image.replace(/\//g, '')}`
                    : bimg1.src,
                author_name: blogData.author_name || 'Admin',
                created_at: blogData.created_at || new Date().toISOString(),
                desc: blogData.content || 'No description available'
            };
        }
        
        return null;
    } catch (error) {
        console.error(`Failed to fetch blog ${id}:`, error);
        return null;
    }
}

// Function to fetch all blogs for "Other Blogs" section
async function fetchAllBlogs() {
    try {
        const BASE_API = process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:3000/api';
        const BASE_CONTENT_URL = process.env.NEXT_PUBLIC_BASE_CONTENT_URL || process.env.NEXT_PUBLIC_BASE_API || 'http://localhost:3000';
        
        const response = await fetch(`${BASE_API}/contents/blogs`, {
            cache: 'no-store',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        let blogData;
        if (Array.isArray(data)) {
            blogData = data;
        } else if (data.data && Array.isArray(data.data)) {
            blogData = data.data;
        } else if (data.success && Array.isArray(data.data)) {
            blogData = data.data;
        } else {
            blogData = [];
        }
        
        if (blogData.length > 0) {
            return blogData.map(blog => ({
                id: blog.id,
                title: blog.title || 'Untitled Blog',
                content: blog.content || 'No content',
                desc: blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No description',
                img: blog.cover_image 
                    ? `${BASE_CONTENT_URL}uploads/blogs/${blog.cover_image.replace(/^\//, '')}`
                    : (blog.id % 2 === 0 ? bimg2.src : bimg1.src),
                author_name: blog.author_name || 'Admin',
                created_at: blog.created_at || new Date().toISOString()
            }));
        }
        
        return fallbackBlogs;
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        return fallbackBlogs;
    }
}

// Function to format date
function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
}


export default async function NewsDets(props) {
    const { params } = props;
    const awaitedParams = await params;
    const id = awaitedParams.id;
    
    // Fetch current blog data
    const currentBlog = await fetchBlogById(id);
    // Fetch all blogs for "Other Blogs" section
    const allBlogs = await fetchAllBlogs();
    
    // Filter out current blog from "Other Blogs"
    const otherBlogs = allBlogs.filter(blog => blog.id.toString() !== id.toString()).slice(0, 3);
    
    // Use fallback if API returns null
    const blogData = currentBlog || {
        ...fallbackBlogs.find(b => b.id.toString() === id.toString()) || fallbackBlogs[0],
        id: id
    };

    const backgroundImage = blogData?.cover_image || wp.src;

    return (
        <>
            <div className="min-h-[100vh] flex items-end justify-center font-[Inter] relative overflow-hidden bg-gray-100">
                {/* Background Image and Overlay Container */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    </div>
                </div>

                {/* Content Container (z-10 for stacking above the background) */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 m-auto">
                    {/* Main Text Content */}
                    <div className="text-center flex flex-col justify-around mb-12">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
                            {blogData.title}
                        </h1>
                        
                        {/* Author and Date Info */}
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center text-gray-200 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">By {blogData.author_name}</span>
                            </div>
                            <div className="text-gray-300">
                                {formatDate(blogData.created_at)}
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
            
            {/* ------------------------------------- */}
            <div className="min-h-screen py-12 sm:py-16 md:py-20 font-[Inter] bg-[#e9e9e9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Responsive Grid Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
                        {/* Column 1: Main Content */}
                        <div className="md:col-span-2 mb-10 md:mb-0">
                            <NewsStudy blogData={blogData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Blogs Section */}
            {otherBlogs.length > 0 && (
                <div className="bg-white py-12">
                    <div className='max-w-7xl mx-auto mb-8 flex gap-4 justify-between items-center'>
                        <h1 className='text-3xl font-bold text-gray-900 ml-3'>Other Blogs</h1>
                        <Link href="/blog">
                            <button className='bg-[#9999db] cursor-pointer px-6 py-3 text-[#272797] font-medium rounded-lg hover:bg-[#8888cc] transition duration-150'>
                                See all
                            </button>
                        </Link>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherBlogs.map((blog, index) => (
                                <div key={index} className="bg-white rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="w-full h-auto overflow-hidden p-4">
                                        <Image
                                            width={400}
                                            height={200}
                                            src={blog.img}
                                            alt={blog.title}
                                            className="w-full h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
                                            unoptimized
                                  
                                        />
                                    </div>
                                    
                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        
                                        {/* Author and Date Info */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                            <div className="flex items-center">
                                                <span className="font-medium">By {blog.author_name}</span>
                                            </div>
                                            <div className="text-gray-400">
                                                {formatDate(blog.created_at)}
                                            </div>
                                        </div>
                                        
                                        <div className="text-base text-gray-600 mb-4 flex-grow line-clamp-3">
                                            {blog.desc}
                                        </div>
                                        
                                        <Link href={`/blog/${blog.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start mt-auto">
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
            
        
        </>
    );
}

// Newsletter Sidebar Component
const NewsletterSidebar = () => {
    return (
        <div className="p-8 bg-indigo-700 rounded-3xl sticky top-8 md:top-12 self-start shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2">
                Join newsletter
            </h3>
            <p className="text-indigo-200 text-sm mb-6">
                Stay up to date with new case studies. We promise no spam, just good content.
            </p>
            <Form />
        </div>
    );
};

// Main Case Study Content Component
const NewsStudy = ({ blogData }) => {
    return (
        <div className="text-gray-700 leading-relaxed space-y-8">
            <section>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                    {blogData.title}
                </h2>
                
                {/* Author and Date Info */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-medium text-gray-700">By {blogData.author_name}</span>
                    </div>
                    <div className="text-gray-500">
                        {formatDate(blogData.created_at)}
                    </div>
                </div>
                
                <div className="text-lg prose max-w-none">
                    {HTMLReactParser(blogData.content || 'No content available')}
                </div>
            </section>
        </div>
    );
};