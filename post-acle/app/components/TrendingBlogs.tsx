'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function TrendingBlogs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Image src="/fire-icon.svg" alt="Trending" width={28} height={28} />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Trending Blogs
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Featured Blog */}
        <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 overflow-hidden hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]">
          <div className="p-6">
            <div className="flex flex-wrap gap-2 text-xs mb-4">
              <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">Technology</span>
              <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full">AI</span>
              <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full">Tech</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-400 transition-colors">
              Mastering AI Tools in 2025
            </h3>
            
            <p className="text-gray-400 text-sm mb-4">
              AI tools are reshaping industries and careers. Learn how to leverage the latest advancements to stay ahead in your field and transform your workflow...
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                5 min read • 1,234 views
              </span>
              
              <Link href="/blog/mastering-ai-tools-2025" className="text-pink-500 text-sm font-medium hover:text-pink-400 transition-colors flex items-center gap-1">
                Read more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Blog */}
        <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <div className="p-6">
            <div className="flex flex-wrap gap-2 text-xs mb-4">
              <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full">Development</span>
              <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full">Web</span>
              <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full">Future</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
              The Future of Web Development
            </h3>
            
            <p className="text-gray-400 text-sm mb-4">
              Explore the cutting-edge technologies and frameworks that are shaping the future of web development. From AI-assisted coding to new paradigms...
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                7 min read • 982 views
              </span>
              
              <Link href="/blog/future-web-development" className="text-purple-500 text-sm font-medium hover:text-purple-400 transition-colors flex items-center gap-1">
                Read more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}