'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// import { cn } from "@/lib/utils";
import ChartDisplay from "@/app/components/ChartDisplay";
import CodeBlock from "@/app/components/CodeBlock";
import QuoteBlock from "@/app/components/QuoteBlock";
import Infographic from "@/app/components/Infographic";
import Accordion from "@/app/components/Accordion";
import HighlightBox from "@/app/components/HighlightBox";
import ReadingProgressBar from "@/app/components/ReadingProgressBar";
import fs from 'fs/promises';
import path from 'path';
// import Navbar from '../components/Navbar';
// import FooterStatic from '../components/FooterStatic';
// import SearchContent from './SearchContent.new';
import AdDisplay from "@/app/components/AdDisplay";
// import BlogPostContent from './BlogPostContent';
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
async function getAllBlogs(): Promise<BlogEntry[]> {
  try {
    const response = await fetch('https://www.post-acle.blog/index.json'); // fetch the file
    const fileContent = await response.text();   // get the content
    return JSON.parse(fileContent) as BlogEntry[];
  } catch (error) {
    console.error('Error reading blog index:', error);
    return [];
  }
}
// import { useEffect, useState } from "react";
// import Image from "next/image";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// import { useEffect, useState } from "react";
// import Image from "next/image";

function RelatedPosts({ blogPost }: { blogPost: any }) {
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  // console.log(blogPost);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await getAllBlogs();
        // console.log(allBlogs);

        const filtered = allBlogs
          .filter(
            (blog) =>
              blog.title !== blogPost.title // exclude current blog
              // blog.category === blogPost.category // same category
              // blog.targetRegion === blogPost.targetRegion // same region
          )
          .slice(0, 4); // only 4 blogs

        setRelatedBlogs(filtered);
        // console.log(filtered);
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      }
    };

    fetchBlogs();
  }, []);
  // console.log(relatedBlogs);

  if (relatedBlogs.length === 0) return null;

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {relatedBlogs.map((blog, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
          >
            <div className="aspect-[16/9] bg-gray-700 relative">
              <Image
                src={blog.previewImage || "/images/defaultBlog.jpg"}
                alt={blog.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/images/defaultBlog.jpg";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {blog.title}
              </h3>
              {/* <p className="text-gray-400 text-sm line-clamp-3">
                {blog.previewDescription}
              </p> */}
              <a
                href={`/blog/${blog.blogID}`}
                className="inline-block mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default RelatedPosts;


// export default RelatedPosts;


interface BlogJSON {
  title: string;
  previewDescription: string;
  previewImageURL?: string;
  tags?: string[];
  author?: string;
  publishedDate?: string;
  wordsUsed?: number;
  targetRegion?: string;
}
interface BlogPostContentProps {
  blogPost: BlogPost;
}

interface BlogPost {
  title: string;
  previewDescription: string;
  previewImageURL?: string;
  content: any[];
  tags?: string[];
  author?: string;
  publishedDate?: string;
  wordsUsed?: number;
  targetRegion?: string;
  infographics?: { type: string; content: string }[];
  accordions?: { title: string; content: string }[];
  highlights?: { type: 'tip' | 'warning' | 'note'; content: string }[];
}



export default function BlogPostContent({ blogPost }: BlogPostContentProps) {

  if (!blogPost || !Array.isArray(blogPost.content)) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className="text-white text-xl">Blog post not found or content is invalid.</p>
      </div>
    );
  }

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { // Show button after scrolling 200px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
      {/* <Ad468x60 /> */}
      <ReadingProgressBar />
      <nav className="text-left text-gray-400 mb-8">
        <a href="/" className="hover:underline">Home</a> &gt;
        <a href="/search" className="hover:underline">Blogs</a> &gt;
        <span>{blogPost.title}</span>
      </nav>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          {blogPost.title}
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          {blogPost.previewDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm">
          {blogPost.wordsUsed && (
            <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-purple-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className="text-purple-300 font-medium">
                {Math.ceil(blogPost.wordsUsed / 200)} min read
              </span>
            </div>
          )}
          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, i) => {
                // Generate a random pastel background color
                const bgColors = [
                  'bg-pink-600/30',
                  'bg-purple-600/30', 
                  'bg-blue-600/30',
                  'bg-green-600/30',
                  'bg-yellow-600/30',
                  'bg-red-600/30',
                  'bg-indigo-600/30'
                ];
                const randomBg = bgColors[i % bgColors.length];
                
                // Match icons to tag content
                const getIcon = (tag: string) => {
                  const iconMap: {[key: string]: any} = {
                    'tech': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    'programming': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
                    'web': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
                    'default': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  };
                  
                  const tagLower = tag.toLowerCase();
                  for (const [key, icon] of Object.entries(iconMap)) {
                    if (tagLower.includes(key)) return icon;
                  }
                  return iconMap.default;
                };

                return (
                  <span 
                    key={i} 
                    className={`${randomBg} px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 hover:scale-105 transition-transform duration-200 cursor-default`}
                  >
                    {getIcon(tag)}
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        {blogPost.author && (
          <div className="flex flex-col items-center justify-center mt-8">
            <span className="text-lg text-gray-400">By {blogPost.author}</span>
          </div>
        )}
      </div>

      {/* <Ad728x90 /> */}
      {/* ✅ Top Ad */}
      {/* <div className="my-6">
        <Ad728x90 />
      </div> */}

      <div className="prose prose-invert max-w-none text-left mx-auto">
        {/* <Ad728x90 /> */}
        {blogPost.content.map((block: any, index: number) => (
          <div key={index} className="my-6">
            {block.contentType === 'text' && (
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-slate-400 text-4xl font-bold my-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-slate-400 text-3xl font-bold my-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-slate-400 text-2xl font-bold my-2" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-slate-400 text-xl font-bold my-2" {...props} />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5 className="text-slate-400 text-lg font-bold my-2" {...props} />
                  ),
                  h6: ({ node, ...props }) => (
                    <h6 className="text-slate-400 text-base font-bold my-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-300 text-lg leading-relaxed my-4" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-blue-400 hover:underline" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside text-gray-300 ml-4 my-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside text-gray-300 ml-4 my-4" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-2" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-white" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="italic text-gray-400" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <QuoteBlock children={props.children} />
                  ),
                  code: ({ node, className, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <CodeBlock
                        value={String(props.children).replace(/\n$/, '')}
                        language={match[1]}
                        {...props}
                      />
                    ) : (
                      <code className="bg-gray-700 text-purple-300 px-1 py-0.5 rounded text-sm" {...props} />
                    );
                  },
                  img: ({ node, ...props }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="my-4 rounded-lg shadow-lg max-w-full h-auto" alt={props.alt || ''} {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <table className="min-w-full bg-gray-800 rounded-lg shadow-lg my-4" {...props} />
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gray-700" {...props} />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody {...props} />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr className="border-b border-gray-700 last:border-b-0" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="py-3 px-4 text-left text-gray-300 font-semibold" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="py-3 px-4 text-gray-400" {...props} />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="border-gray-700 my-8" {...props} />
                  ),
                }}
                remarkPlugins={[remarkGfm]}
              >
                {block.content}
              </ReactMarkdown>
            )}
            {block.contentType === 'ad' && (
              <div className="my-6 w-full max-w-full overflow-x-hidden flex justify-center">
                {block.content === '728x90' && (
                  <div className="w-full max-w-[728px]">
                    <AdDisplay adType='728x90' />
                  </div>
                )}
                {block.content === '468x60' && (
                  <div className="w-full max-w-[468px]">
                    <AdDisplay adType='468x60' />
                  </div>
                )}
                {block.content === '320x50' && (
                  <div className="w-full max-w-[320px]">
                    <AdDisplay adType='320x50' />
                  </div>
                )}
                {block.content === 'video' && (
                  <div className="w-full max-w-[320px]">
                    <AdDisplay adType='video' />
                  </div>
                )}
              </div>
            )}
            {block.contentType === 'image' && typeof block.content === 'string' && (
              <div className="flex justify-center my-6">
                <Image
                  src={block.content}
                  alt={`Image ${index}`}
                  width={800}
                  height={450}
                  className="rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'; // Hide the image on error
                  }}
                />
              </div>
            )}

            {block.contentType === 'chart' &&
              block.content &&
              Array.isArray(block.content.x) &&
              Array.isArray(block.content.y) && (
                <ChartDisplay
                  data={block.content.x.map((label: string, i: number) => ({
                    name: label,
                    value: block.content.y[i],
                  }))}
                  titleChart={block.content.titleChart}
                  lableX={block.content.lableX}
                  lableY={block.content.lableY}
                />
              )}

            {block.contentType === 'infographic' && typeof block.content === 'string' && (
              <Infographic>{block.content}</Infographic>
            )}

            {block.contentType === 'accordion' && block.content && (
              <Accordion title={block.content.title}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {block.content.content}
                </ReactMarkdown>
              </Accordion>
            )}

            {block.contentType === 'highlight' && block.content && (
              <HighlightBox type={block.content.type}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {block.content.content}
                </ReactMarkdown>
              </HighlightBox>
            )}

            {block.contentType === 'table' &&
              block.content &&
              Array.isArray(block.content.headers) &&
              Array.isArray(block.content.rows) && (
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">Table Data</h3>
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        {block.content.headers.map((header: string, i: number) => (
                          <th
                            key={i}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {block.content.rows.map((row: string[], i: number) => (
                        <tr key={i}>
                          {row.map((cell: string, j: number) => (
                            <td
                              key={j}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-400"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        ))}
      </div>
      {/* Related Blog Posts Slider */}
      <RelatedPosts blogPost={blogPost}/>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg my-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Join Our Community!</h3>
        <p className="text-gray-300 mb-6">
          Connect with fellow readers and join the discussion in our Discord server. Get exclusive content, updates, and interact with our community!
        </p>
        <a
          href="https://post-acle.blog/join"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Join Discord Server
        </a>
      </div>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
      {/* <Ad468x60 /> */}
    </section>
  );
}
