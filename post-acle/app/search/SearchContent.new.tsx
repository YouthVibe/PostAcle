'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  targetRegion: 'India' | 'US' | 'Europe' | 'Global';
}

interface SearchContentProps {
  initialBlogs: BlogEntry[];
  initialSearchQuery: string;
  initialSort: string;
  initialRegion: string;
}

export default function SearchContent({ initialBlogs, initialSearchQuery, initialSort, initialRegion }: SearchContentProps) {
  const [blogs, setBlogs] = useState<BlogEntry[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState<BlogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearchQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [hasMore, setHasMore] = useState(true);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

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

    fetchSuggestions();

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          searchQuery: debouncedSearchQuery,
          selectedCategory,
          selectedSort,
          selectedRegion,
          startIndex: '0',
          count: '4',
          searchBy: 'titleAndAuthor', // New parameter to indicate searching by both title and author
        });
        const response = await fetch(`/api/blogs?${params.toString()}`);
        const data = await response.json();
        setVisibleBlogs(data.blogs);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [debouncedSearchQuery, selectedCategory, selectedSort, selectedRegion]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        searchQuery,
        selectedCategory,
        selectedSort,
        selectedRegion,
        startIndex: String(visibleBlogs.length),
        count: '4',
        searchBy: 'titleAndAuthor', // New parameter to indicate searching by both title and author
      });
      const response = await fetch(`/api/blogs?${params.toString()}`);
      const data = await response.json();
      setVisibleBlogs(prev => [...prev, ...data.blogs]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error loading more blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBlogCard = (blog: BlogEntry) => {
    const readingTime = (blog.wordsUsed / 200).toFixed(1);
    return React.createElement(Link, {
      key: blog.blogID,
      href: `/blog/${blog.blogID}`,
      className: "block h-full"
    }, React.createElement('div', {
      className: "bg-gray-900/40 border border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition relative h-full flex flex-col"
    }, [
      React.createElement('div', {
        className: "aspect-video relative w-full"
      }, [
        React.createElement('img', {
          src: blog.previewImage,
          className: "absolute inset-0 w-full h-full object-cover",
          onError: (e) => {
            (e.target as HTMLImageElement).src = "/images/defaultBlog.jpg";
          }
        }),
        React.createElement('div', {
          className: "absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md backdrop-blur-sm z-10"
        }, blog.targetRegion)
      ]),
      React.createElement('div', {
        className: "p-6 flex-1 flex flex-col"
      }, [
        React.createElement('h3', {
          className: "text-xl font-semibold text-purple-400 mb-2 line-clamp-2"
        }, blog.title),
        React.createElement('p', {
          className: "text-sm text-gray-400 mb-1"
        }, blog.category),
        React.createElement('p', {
          className: "text-xs text-gray-500"
        }, `${new Date(blog.publishedDate).toLocaleDateString()} • ${readingTime} min read`),
        React.createElement('div', {
          className: "flex items-center mt-2"
        }, [
          React.createElement('span', {
            className: "text-sm text-gray-400 mr-2"
          }, `By ${blog.author}`),
          React.createElement('span', {
            className: "bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
          }, "Author")
        ]),
        React.createElement('div', {
          className: "flex flex-wrap gap-2 mt-auto pt-4"
        }, blog.tags.map(tag =>
          React.createElement('span', {
            key: tag,
            className: "bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
          }, tag)
        ))
      ])
    ]));
  };

  return React.createElement('section', {
    className: "py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
  }, [
    React.createElement('h1', {
      key: 'title',
      className: "text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text"
    }, "Search Blogs"),
    React.createElement('p', {
      key: 'subtitle',
      className: "text-xl text-gray-300 max-w-3xl mx-auto mb-10"
    }, "Find the content that matters to you."),
    React.createElement('div', {
      key: 'search',
      className: "max-w-xl mx-auto mb-10 relative"
    }, [
      React.createElement('input', {
        type: "text",
        value: searchQuery,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            setDebouncedSearchQuery(searchQuery);
          }
        },
        placeholder: "Search for articles, topics, or authors...",
        className: "w-full pl-12 pr-5 py-3 rounded-full bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:border-purple-500",
        onBlur: () => setTimeout(() => setShowSuggestions(false), 100) // Hide suggestions when input loses focus
      }),
      showSuggestions && suggestions.length > 0 && React.createElement('ul', {
        className: "absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md mt-1 max-h-60 overflow-auto text-left"
      }, suggestions.map((suggestion, index) =>
        React.createElement('li', {
          key: index,
          className: "px-4 py-2 cursor-pointer hover:bg-gray-700 text-gray-200",
          onMouseDown: () => {
            setSearchQuery(suggestion);
            setDebouncedSearchQuery(suggestion);
            setShowSuggestions(false);
          }
        }, suggestion)
      )),
      React.createElement(Image, {
        src: "/file.svg", // Using file.svg as a placeholder for a search icon
        alt: "Search Icon",
        width: 20,
        height: 20,
        className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      })
    ]),
    React.createElement('div', {
      key: 'filters',
      className: "bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-lg mb-12"
    }, React.createElement('div', {
      className: "flex flex-col md:flex-row gap-6 justify-between text-left"
    }, [
      React.createElement('div', {
        key: 'category',
        className: "flex-1"
      }, [
        React.createElement('label', {
          className: "block text-gray-300 mb-2 font-medium"
        }, "Category"),
        React.createElement('select', {
          value: selectedCategory,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value),
          className: "w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md py-2 px-4 appearance-none focus:ring-2 focus:ring-purple-500"
        }, [
          React.createElement('option', { key: 'all' }, "All"),
          React.createElement('option', { key: 'tech' }, "Technology"),
          React.createElement('option', { key: 'life' }, "Day-to-Day Life"),
          React.createElement('option', { key: 'general' }, "General")
        ])
      ]),
      React.createElement('div', {
        key: 'sort',
        className: "flex-1"
      }, [
        React.createElement('label', {
          className: "block text-gray-300 mb-2 font-medium"
        }, "Sort By"),
        React.createElement('select', {
          value: selectedSort,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSort(e.target.value),
          className: "w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md py-2 px-4 appearance-none focus:ring-2 focus:ring-purple-500"
        }, [
          React.createElement('option', { key: 'newest' }, "Newest"),
          React.createElement('option', { key: 'oldest' }, "Oldest")
        ])
      ]),
      React.createElement('div', {
        key: 'region',
        className: "flex-1"
      }, [
        React.createElement('label', {
          className: "block text-gray-300 mb-2 font-medium"
        }, "Region"),
        React.createElement('select', {
          value: selectedRegion,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRegion(e.target.value),
          className: "w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md py-2 px-4 appearance-none focus:ring-2 focus:ring-purple-500"
        }, [
          React.createElement('option', { key: 'global' }, "Global"),
          React.createElement('option', { key: 'india' }, "India"),
          React.createElement('option', { key: 'us' }, "US"),
          React.createElement('option', { key: 'europe' }, "Europe")
        ])
      ])
    ])),
    React.createElement('div', {
      key: 'blogs-container',
      className: "md:w-full"
    }, [
      React.createElement('div', {
        className: "grid gap-8 sm:grid-cols-2"
      }, visibleBlogs.map(renderBlogCard)),
      hasMore && React.createElement('div', {
        key: 'load-more',
        className: "mt-8 text-gray-400 text-sm"
      }, "Scroll to load more..."),
      !hasMore && visibleBlogs.length > 0 && React.createElement('div', {
        key: 'end-message',
        className: "mt-8 text-green-400 text-sm"
      }, "You've reached the end of the results."),
      visibleBlogs.length === 0 && React.createElement('div', {
        key: 'no-results',
        className: "text-gray-500 mt-8"
      }, "No results found.")
    ])
  ]);
}