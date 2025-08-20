'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function HeroStatic() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) { // Fetch suggestions only if query is long enough
        try {
          const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          const allSuggestions = [...data.titles, ...data.authors];
          setSuggestions(allSuggestions.filter((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase())));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce for 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

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
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const searchValue = (e.target as HTMLFormElement).search.value;
              if (searchValue.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
              }
            }}
            className="relative"
          >
            <div className="flex items-center rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, topics, or authors..."
                className="w-full px-5 py-3 pl-12 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-200"
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Hide suggestions when input loses focus
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md mt-20 max-h-60 overflow-auto text-left">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-gray-200"
                      onMouseDown={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>

        {/* Our Niches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Discover Card */}
          <div className="group relative bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Image src="/create-icon.svg" alt="Discover" width={48} height={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">Discover</h3>
            <p className="text-gray-400 text-sm">Explore handpicked blogs powered by AI and curated for curious minds</p>
          </div>

          {/* Read Card */}
          <div className="group relative bg-gradient-to-br from-pink-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Image src="/share-icon.svg" alt="Read" width={48} height={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-pink-400 transition-colors">Read</h3>
            <p className="text-gray-400 text-sm">Dive into fresh blogs on AI, tech, trends, and insights — updated regularly</p>
          </div>

          {/* Learn Card */}
          <div className="group relative bg-gradient-to-br from-blue-500/5 to-transparent backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Image src="/grow-icon.svg" alt="Learn" width={48} height={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">Learn</h3>
            <p className="text-gray-400 text-sm">Stay informed and inspired — one blog at a time</p>
          </div>
        </div>
      </div>
    </section>
  );
}