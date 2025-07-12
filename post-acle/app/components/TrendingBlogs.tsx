import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';

interface Blog {
  title: string;
  tags: string[];
  category: string;
  previewImage: string;
  blogID: string;
  wordsUsed: number;
  publishedDate: string;
  author: string;
}

async function getBestBlogs(): Promise<Blog[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'best.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading best blogs:', error);
    return [];
  }
}

export default async function TrendingBlogs() {
  const blogs = await getBestBlogs();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Image src="/fire-icon.svg" alt="Trending" width={28} height={28} />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Trending Blogs
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.blogID}
            className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 overflow-hidden hover:border-pink-500/30 transition-all duration-300"
          >
            <Image
              src={blog.previewImage}
              alt={blog.title}
              width={768}
              height={432}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <div className="flex flex-wrap gap-2 text-xs mb-4">
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">{blog.category}</span>
                {blog.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-400 transition-colors">
                {blog.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {blog.title.length > 110
                  ? blog.title.slice(0, 110) + '...'
                  : blog.title}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {(Math.ceil(blog.wordsUsed / 250))} min read
                </span>

                <Link
                  href={`/blog/${blog.blogID}`}
                  className="text-pink-500 text-sm font-medium hover:text-pink-400 transition-colors flex items-center gap-1"
                >
                  Read more
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
