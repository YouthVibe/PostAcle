'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '../page';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blogs from localStorage
    const loadBlogs = () => {
      const storedBlogs = localStorage.getItem('postacle-blogs');
      if (storedBlogs) {
        setBlogs(JSON.parse(storedBlogs));
      }
    };
    loadBlogs();
  }, []);

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const newBlogs = blogs.filter((_, i) => i !== index);
      localStorage.setItem('postacle-blogs', JSON.stringify(newBlogs));
      setBlogs(newBlogs);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map((blog, index) => (
        <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
          {blog.previewImageURL && (
            <div className="h-48 overflow-hidden">
              <img 
                src={blog.previewImageURL} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
            <p className="text-gray-400 mb-4 line-clamp-3">{blog.previewDescription}</p>
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Link 
                  href={`/blog/edit/${index}`} 
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Link>
                <Link 
                  href={`/blog/view/${index}`}
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  View
                </Link>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      <Link href="/blog/create" className="flex items-center justify-center h-64 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="mt-2 block text-gray-400">Create New Blog</span>
        </div>
      </Link>
    </div>
  );
};

export default BlogList;