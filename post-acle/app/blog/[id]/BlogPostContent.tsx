import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fs from 'fs/promises';
import path from 'path';
import ChartDisplay from '../../components/ChartDisplay';

interface BlogPostContentProps {
  id: string;
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
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'blogs', `${id}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    if (!Array.isArray(data.content)) {
      console.error('❌ Invalid content array:', data.content);
      return null;
    }

    // Parse charts and tables only if content is string
    data.content = data.content.map((block: any) => {
      if (
        (block.contentType === 'chart' || block.contentType === 'table')
      ) {
        if (typeof block.content === 'string') {
          try {
            block.content = JSON.parse(block.content);
          } catch (e) {
            console.warn('❌ Failed to parse JSON in chart/table block:', block);
            block.content = {};
          }
        } else if (typeof block.content !== 'object') {
          console.warn('❌ Unexpected content type (not object) in chart/table block:', block);
          block.content = {};
        }
      }
      return block;
    });

    return data;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

export default async function BlogPostContent({ id }: BlogPostContentProps) {
  const blogPost = await getBlogPost(id);

  if (!blogPost || !Array.isArray(blogPost.content)) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className="text-white text-xl">Blog post not found or content is invalid.</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
        {blogPost.title}
      </h1>

      {blogPost.previewImageURL && (
        <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={blogPost.previewImageURL}
            alt={blogPost.title}
            width={1200}
            height={600}
            className="rounded-lg"
          />
        </div>
      )}

      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
        {blogPost.previewDescription}
      </p>

      <div className="prose prose-invert max-w-none text-left mx-auto">
        {blogPost.content.map((block: any, index: number) => (
          <div key={index} className="my-6">
            {block.contentType === 'text' && (
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-gray-400 leading-relaxed">{children}</p>
                  ),
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
    </section>
  );
}
