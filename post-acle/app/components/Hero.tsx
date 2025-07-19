'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/grid.svg" 
          alt="Grid Background" 
          fill 
          className="opacity-30" 
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          PostAcle
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Gen Z’s zone for unfiltered expression.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search for articles, topics, or authors..."
              className="w-full px-5 py-3 rounded-l-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-r-md hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Create Card */}
          <div className="group relative bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Image src="/create-icon.svg" alt="Create" width={48} height={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">Create</h3>
            <p className="text-gray-400 text-sm">Write and publish your thoughts with our AI-powered editor</p>
          </div>

          {/* Share Card */}
          <div className="group relative bg-gradient-to-br from-pink-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Image src="/share-icon.svg" alt="Share" width={48} height={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-pink-400 transition-colors">Share</h3>
            <p className="text-gray-400 text-sm">Share your stories with our growing community of readers</p>
          </div>

          {/* Grow Card */}
          <div className="group relative bg-gradient-to-br from-blue-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Image src="/grow-icon.svg" alt="Grow" width={48} height={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">Grow</h3>
            <p className="text-gray-400 text-sm">Build your audience and grow your influence</p>
          </div>
        </div>
      </div>
    </section>
  );
}