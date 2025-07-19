'use client';
import React, { useState, useEffect } from 'react';
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
            <span>
              Estimated Reading Time: {Math.ceil(blogPost.wordsUsed / 200)} min
            </span>
          )}
          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, i) => (
                <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-left mx-auto">
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
                  // Custom component for chart display
                  // chart: ({ node, ...props }) => (
                  //   <ChartDisplay data={JSON.parse(props.children as string)} />
                  // ),
                }}
                remarkPlugins={[remarkGfm]}
              >
                {block.content}
              </ReactMarkdown>
            )}

            {block.contentType === 'image' && typeof block.content === 'string' && (
              <div className="flex justify-center my-6">
                <Image
                  src={block.content}
                  alt={`Image ${index}`}
                  width={800}
                  height={450}
                  className="rounded-lg shadow-md"
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
    </section>
  );
}
