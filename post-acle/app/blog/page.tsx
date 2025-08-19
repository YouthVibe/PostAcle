'use client'
import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Ad728x90, Ad468x60, Ad320x50 } from "@/app/components/AdBanner";
import ChartDisplay from "@/app/components/ChartDisplay";
import CodeBlock from "@/app/components/CodeBlock";
import QuoteBlock from "@/app/components/QuoteBlock";
import Infographic from "@/app/components/Infographic";
import Accordion from "@/app/components/Accordion";
import HighlightBox from "@/app/components/HighlightBox";
import Navbar from '../components/Navbar';
import FooterStatic from '../components/FooterStatic';
// BlogPostContent schema for a single blog file
export interface BlogPost {
  id?: string;
  title: string;
  previewDescription: string;
  previewImageURL?: string;
  content: BlogBlock[];
  tags?: string[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedDate?: string;
  status: 'draft' | 'published';
  wordsUsed?: number;
  targetRegion?: "India" | "US" | "Europe" | "Global";
  infographics?: { type: string; content: string }[];
  accordions?: { title: string; content: string }[];
  highlights?: { type: "tip" | "warning" | "note"; content: string }[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Each block of blog content
export type BlogBlock =
  | { contentType: "text"; content: string }
  | { contentType: "image"; content: string }
  | {
      contentType: "chart";
      content: {
        x: string[];
        y: number[];
        titleChart: string;
        lableX: string;
        lableY: string;
      };
    }
  | { contentType: "ad"; content: "728x90" | "468x60" | "320x50" }
  | { contentType: "infographic"; content: string }
  | { contentType: "accordion"; content: { title: string; content: string } }
  | { contentType: "highlight"; content: { type: "tip" | "warning" | "note"; content: string } }
  | {
      contentType: "table";
      content: {
        headers: string[];
        rows: string[][];
      };
    };

export function renderBlog({blogPost}: {blogPost: BlogPost}) {
  if (!blogPost || !Array.isArray(blogPost.content)) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className="text-white text-xl">Blog post not found or content is invalid.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-invert max-w-none text-left mx-auto">
      {blogPost.content.map((block, index) => (
        <div key={index} className="my-6">
          {block.contentType === "text" && (
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-slate-400 text-4xl font-bold my-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-slate-400 text-3xl font-bold my-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-slate-400 text-2xl font-bold my-2" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-slate-400 text-xl font-bold my-2" {...props} />,
                h5: ({ node, ...props }) => <h5 className="text-slate-400 text-lg font-bold my-2" {...props} />,
                h6: ({ node, ...props }) => <h6 className="text-slate-400 text-base font-bold my-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-300 text-lg leading-relaxed my-4" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-300 ml-4 my-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-300 ml-4 my-4" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                em: ({ node, ...props }) => <em className="italic text-gray-400" {...props} />,
                blockquote: ({ node, ...props }) => <QuoteBlock>{props.children}</QuoteBlock>,
                code: ({ node, className, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <CodeBlock value={String(props.children).replace(/\n$/, "")} language={match[1]} {...props} />
                  ) : (
                    <code className="bg-gray-700 text-purple-300 px-1 py-0.5 rounded text-sm" {...props} />
                  );
                },
                img: ({ node, ...props }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="my-4 rounded-lg shadow-lg max-w-full h-auto" alt={props.alt || ""} {...props} />
                ),
                table: ({ node, ...props }) => <table className="min-w-full bg-gray-800 rounded-lg shadow-lg my-4" {...props} />,
                thead: ({ node, ...props }) => <thead className="bg-gray-700" {...props} />,
                tbody: ({ node, ...props }) => <tbody {...props} />,
                tr: ({ node, ...props }) => <tr className="border-b border-gray-700 last:border-b-0" {...props} />,
                th: ({ node, ...props }) => <th className="py-3 px-4 text-left text-gray-300 font-semibold" {...props} />,
                td: ({ node, ...props }) => <td className="py-3 px-4 text-gray-400" {...props} />,
                hr: ({ node, ...props }) => <hr className="border-gray-700 my-8" {...props} />,
              }}
              remarkPlugins={[remarkGfm]}
            >
              {block.content}
            </ReactMarkdown>
          )}

          {block.contentType === "ad" && (
            <div className="my-6 w-full max-w-full overflow-x-hidden flex justify-center">
              {block.content === "728x90" && (
                <div className="w-full max-w-[728px]">
                  <Ad728x90 />
                </div>
              )}
              {block.content === "468x60" && (
                <div className="w-full max-w-[468px]">
                  <Ad468x60 />
                </div>
              )}
              {block.content === "320x50" && (
                <div className="w-full max-w-[320px]">
                  <Ad320x50 />
                </div>
              )}
            </div>
          )}

          {block.contentType === "image" && typeof block.content === "string" && (
            <div className="flex justify-center my-6">
              <Image
                src={block.content}
                alt={`Image ${index}`}
                width={800}
                height={450}
                className="rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {block.contentType === "chart" &&
            block.content &&
            Array.isArray(block.content.x) &&
            Array.isArray(block.content.y) && (
              <ChartDisplay
                data={block.content.x.map((label, i) => ({
                  name: label,
                  value: block.content.y[i],
                }))}
                titleChart={block.content.titleChart}
                lableX={block.content.lableX}
                lableY={block.content.lableY}
              />
            )}

          {block.contentType === "infographic" && typeof block.content === "string" && (
            <Infographic>{block.content}</Infographic>
          )}

          {block.contentType === "accordion" && block.content && (
            <Accordion title={block.content.title}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {block.content.content}
              </ReactMarkdown>
            </Accordion>
          )}

          {block.contentType === "highlight" && block.content && (
            <HighlightBox type={block.content.type}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {block.content.content}
              </ReactMarkdown>
            </HighlightBox>
          )}

          {block.contentType === "table" &&
            block.content &&
            Array.isArray(block.content.headers) &&
            Array.isArray(block.content.rows) && (
              <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <h3 className="text-xl font-semibold mb-2 text-green-400">Table Data</h3>
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      {block.content.headers.map((header, i) => (
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
                    {block.content.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
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
  );
}

import BlogList from "./components/BlogList";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-white mb-8 px-6">Blog Posts</h1>
        <BlogList />
      </main>
      <FooterStatic />
    </div>
  );
};