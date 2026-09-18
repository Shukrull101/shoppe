import React, { useState } from 'react';
import { posts } from '../data/posts';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const POSTS_PER_PAGE = 4;

  // Filters
  const categories = ['All', 'Fashion', 'Style', 'Accessories', 'Season'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
      
      {/* Title */}
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-[32px] font-medium text-black">Blog</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-[250px] flex-shrink-0 space-y-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search.." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              className="w-full border-b border-gray-300 py-2 pr-8 text-sm outline-none focus:border-black transition-colors bg-transparent text-gray-700" 
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-black pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-[20px] font-medium mb-6">Categories</h2>
            <ul className="space-y-3">
              {categories.map(category => (
                <li key={category}>
                  <button 
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1); // Reset to page 1 on category change
                    }}
                    className={`text-[15px] transition-colors ${selectedCategory === category ? 'text-black font-medium' : 'text-gray-500 hover:text-black'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Content - Posts Grid */}
        <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {currentPosts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-16">
              <AnimatePresence mode="popLayout">
                {currentPosts.map(post => (
                  <motion.div 
                    key={post.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    {/* Image */}
                  <Link to={`/blog/${post.id}`} className="block mb-6 overflow-hidden rounded-md bg-gray-100 aspect-[4/3]">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </Link>
                  
                  {/* Meta */}
                  <div className="text-[13px] text-gray-400 mb-2 font-light">
                    {post.category} - {post.date}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-[20px] font-normal mb-3 text-black transition-colors group-hover:text-gray-600">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  {/* Read More */}
                  <Link to={`/blog/${post.id}`} className="text-[15px] font-medium text-[#A18A68] hover:text-black transition-colors">
                    Read More
                  </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-20 text-center text-gray-500">
              No posts found matching your criteria.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center text-sm rounded-sm transition-colors ${
                    currentPage === page 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black border border-gray-200 hover:border-black'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-200 text-sm hover:border-black transition-colors rounded-sm ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
