'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function BlogPost() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch('/sampleBlog.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Preprocess content to parse chart/table JSON strings
        data.content = data.content.map((block: any) => {
          if (
            (block.contentType === 'chart' || block.contentType === 'table') &&
            typeof block.content === 'string'
          ) {
            try {
              block.content = JSON.parse(block.content);
            } catch (e) {
              console.warn('Failed to parse JSON in block:', block);
            }
          }
          return block;
        });

        setBlogPost(data);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-[#0d0d1a] min-h-screen text-white font-sans flex justify-center items-center">
        <p className="text-white text-xl">Loading blog post...</p>
      </main>
    );
  }

  if (!blogPost || !Array.isArray(blogPost.content)) {
    return (
      <main className="bg-[#0d0d1a] min-h-screen text-white font-sans flex justify-center items-center">
        <p className="text-white text-xl">Blog post not found or content is invalid.</p>
      </main>
    );
  }

  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
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
              objectFit="cover"
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

              {block.contentType === 'image' && (
                <div className="flex justify-center my-6">
                  <Image
                    src={block.content}
                    alt={`Image ${index}`}
                    width={800}
                    height={450}
                    objectFit="contain"
                    className="rounded-lg shadow-md"
                  />
                </div>
              )}

              {block.contentType === 'chart' && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">
                    {block.content.titleChart}
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={block.content.x.map((label: string, i: number) => ({
                        name: label,
                        value: block.content.y[i],
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                      <XAxis
                        dataKey="name"
                        stroke="#cbd5e0"
                        label={{
                          value: block.content.lableX,
                          position: 'insideBottomRight',
                          offset: -5,
                        }}
                      />
                      <YAxis
                        stroke="#cbd5e0"
                        label={{
                          value: block.content.lableY,
                          angle: -90,
                          position: 'insideLeft',
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {block.contentType === 'table' && (
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

              {block.contentType === 'code' && (
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">Code Block</h3>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {`\`\`\`${block.language || 'javascript'}\n${block.content}\n\`\`\``}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
