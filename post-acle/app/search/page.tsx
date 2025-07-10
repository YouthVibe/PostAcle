'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

interface BlogEntry {
  title: string;
  tags: string[];
  category: string;
  previewImage: string;
  blogNumber: number;
  blogID: string;
  wordsUsed: number;
  publishedDate: string;
  author: string;
}

export default function Search() {
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState<BlogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localIndex = localStorage.getItem('blogsIndex');
        const localTime = localStorage.getItem('blogsIndexTime');

        const serverTimeRes = await fetch('/indexTime.txt');
        const serverTime = (await serverTimeRes.text()).trim();

        if (!localIndex || !localTime || new Date(localTime) < new Date(serverTime)) {
          const res = await fetch('/index.json');
          const data = await res.json();
          localStorage.setItem('blogsIndex', JSON.stringify(data));
          localStorage.setItem('blogsIndexTime', serverTime);
          setBlogs(data);
        } else {
          const cachedData = JSON.parse(localIndex);
          setBlogs(cachedData);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight &&
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const loadMore = () => {
    const filtered = filteredBlogs();
    const nextBlogs = filtered.slice(visibleBlogs.length, visibleBlogs.length + 4);
    if (nextBlogs.length === 0) {
      setHasMore(false);
    } else {
      setVisibleBlogs(prev => [...prev, ...nextBlogs]);
    }
  };

  const filteredBlogs = () => {
    let filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    if (selectedSort === 'Newest') {
      filtered = filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (selectedSort === 'Oldest') {
      filtered = filtered.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
    } else if (selectedSort === 'Most Viewed') {
      filtered = filtered.sort((a, b) => b.wordsUsed - a.wordsUsed);
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filteredBlogs();
    setVisibleBlogs(filtered.slice(0, 4));
    setHasMore(filtered.length > 4);
  }, [searchQuery, selectedCategory, selectedSort, blogs]);

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

        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for articles, topics, or authors..."
            className="w-full px-5 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-200"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md"
                >
                  <option>All</option>
                  <option>Technology</option>
                  <option>AI</option>
                  <option>Development</option>
                  <option>Science</option>
                  <option>Health</option>
                  <option>Day-to-Day Life</option>
                  <option>General</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-1">Sort By</label>
                <select
                  value={selectedSort}
                  onChange={e => setSelectedSort(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Most Viewed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="grid gap-6 sm:grid-cols-2">
              {visibleBlogs.map(blog => {
                const readingTime = (blog.wordsUsed / 200).toFixed(1); // calculate reading time
                return (
                  <Link key={blog.blogID} href={`/blog/${blog.blogID}`}>
                    <div className="bg-gray-900/40 border border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                      <img src={blog.previewImage} alt={blog.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-purple-400 mb-2">{blog.title}</h3>
                        <p className="text-sm text-gray-400 mb-1">{blog.category}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(blog.publishedDate).toLocaleDateString()} • {readingTime} min read
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {hasMore && (
              <div className="mt-8 text-gray-400 text-sm">Scroll to load more...</div>
            )}
            {!hasMore && visibleBlogs.length > 0 && (
              <div className="mt-8 text-green-400 text-sm">You've reached the end of the results.</div>
            )}
            {visibleBlogs.length === 0 && (
              <div className="text-gray-500 mt-8">No results found.</div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
