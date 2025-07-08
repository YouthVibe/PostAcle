'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Search() {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Newest');

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowSortDropdown(false); // Close other dropdown
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    setShowCategoryDropdown(false); // Close other dropdown
  };

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    setShowSortDropdown(false);
  };

  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          Search Blogs
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Find the content that matters to you.
        </p>

        {/* Search Input */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search for articles, topics, or authors..."
              className="w-full px-5 py-3 rounded-l-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-200"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-r-md hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 text-left">
          {/* Filters Section */}
          <div className="md:w-1/4 group relative bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Filters</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-gray-300 text-sm font-bold mb-2">Category</label>
                {/* Custom Select for Category */}
                <div className="relative">
                  <button
                    onClick={toggleCategoryDropdown}
                    className="w-full px-3 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 flex justify-between items-center"
                  >
                    <span>{selectedCategory}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {/* Dropdown content */}
                  <div className={`absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg ${showCategoryDropdown ? '' : 'hidden'}`}>
                    <a href="#" onClick={() => handleCategorySelect('All')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">All</a>
                    <a href="#" onClick={() => handleCategorySelect('Technology')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Technology</a>
                    <a href="#" onClick={() => handleCategorySelect('AI')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">AI</a>
                    <a href="#" onClick={() => handleCategorySelect('Development')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Development</a>
                    <a href="#" onClick={() => handleCategorySelect('Science')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Science</a>
                    <a href="#" onClick={() => handleCategorySelect('Health')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Health</a>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="sort" className="block text-gray-300 text-sm font-bold mb-2">Sort By</label>
                {/* Custom Select for Sort By */}
                <div className="relative">
                  <button
                    onClick={toggleSortDropdown}
                    className="w-full px-3 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex justify-between items-center"
                  >
                    <span>{selectedSort}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {/* Dropdown content */}
                  <div className={`absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg ${showSortDropdown ? '' : 'hidden'}`}>
                    <a href="#" onClick={() => handleSortSelect('Newest')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Newest</a>
                    <a href="#" onClick={() => handleSortSelect('Oldest')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Oldest</a>
                    <a href="#" onClick={() => handleSortSelect('Most Viewed')} className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Most Viewed</a>
                  </div>
                </div>
              </div>
              <button className="w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Blog Results */}
          <div className="md:w-3/4 group relative bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-pink-400">Search Results</h2>
            <div className="text-gray-400">
              <p>Search results will appear here...</p>
              {/* You can integrate your TrendingBlogs component or a similar blog listing here */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}