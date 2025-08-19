'use client';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import FooterStatic from '../../../components/FooterStatic';
import { renderBlog } from '../../page';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../../page';

export default function ViewBlog() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const storedBlogs = localStorage.getItem('postacle-blogs');
    if (storedBlogs) {
      const blogs = JSON.parse(storedBlogs);
      const blogIndex = Number(params.id);
      if (blogs[blogIndex]) {
        setBlog(blogs[blogIndex]);
      }
    }
  }, [params.id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <p className="text-white text-xl">Blog not found</p>
        </div>
        <FooterStatic />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <article className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-4">{blog.title}</h1>
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          {renderBlog({ blogPost: blog })}
        </div>
      </article>
      <FooterStatic />
    </div>
  );
}