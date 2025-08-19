'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost, BlogBlock, renderBlog } from '@/app/blog/page';
import { v4 as uuidv4 } from 'uuid';

const initialBlogPost: BlogPost = {
  title: '',
  previewDescription: '',
  content: [],
};

const BlogEditor: React.FC = () => {
  const [blogPost, setBlogPost] = useState<BlogPost>(initialBlogPost);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({ ...blogPost, title: e.target.value });
  };

  const handlePreviewDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogPost({ ...blogPost, previewDescription: e.target.value });
  };

  const handleBlockContentChange = (index: number, value: string) => {
    const newContent = [...blogPost.content];
    if (newContent[index].contentType === 'text') {
      (newContent[index] as { contentType: 'text'; content: string }).content = value;
    }
    setBlogPost({ ...blogPost, content: newContent });
  };

  const handleAddBlock = (type: BlogBlock['contentType']) => {
    let newBlock: BlogBlock;
    switch (type) {
      case 'text':
        newBlock = { contentType: 'text', content: '' };
        break;
      case 'image':
        newBlock = { contentType: 'image', content: '' };
        break;
      case 'chart':
        newBlock = { contentType: 'chart', content: { x: [], y: [], titleChart: '', lableX: '', lableY: '' } };
        break;
      case 'ad':
        newBlock = { contentType: 'ad', content: '728x90' };
        break;
      case 'infographic':
        newBlock = { contentType: 'infographic', content: '' };
        break;
      case 'accordion':
        newBlock = { contentType: 'accordion', content: { title: '', content: '' } };
        break;
      case 'highlight':
        newBlock = { contentType: 'highlight', content: { type: 'tip', content: '' } };
        break;
      case 'table':
        newBlock = { contentType: 'table', content: { headers: [], rows: [] } };
        break;
      default:
        return;
    }
    setBlogPost({ ...blogPost, content: [...blogPost.content, newBlock] });
  };

  const handleDeleteBlock = (index: number) => {
    const newContent = blogPost.content.filter((_, i) => i !== index);
    setBlogPost({ ...blogPost, content: newContent });
    setSelectedBlockIndex(null);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const newContent = [...blogPost.content];
    const [removed] = newContent.splice(index, 1);
    if (direction === 'up' && index > 0) {
      newContent.splice(index - 1, 0, removed);
      setSelectedBlockIndex(index - 1);
    } else if (direction === 'down' && index < newContent.length - 1) {
      newContent.splice(index + 1, 0, removed);
      setSelectedBlockIndex(index + 1);
    }
    setBlogPost({ ...blogPost, content: newContent });
  };

  const handleSave = () => {
    // In a real application, you would send this data to a backend API
    console.log('Saving blog post:', JSON.stringify(blogPost, null, 2));
    alert('Blog post saved! Check console for data.');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Blog Editor</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Blog Post Metadata</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
            value={blogPost.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="previewDescription" className="block text-gray-300 text-sm font-bold mb-2">Preview Description:</label>
          <textarea
            id="previewDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 h-32"
            value={blogPost.previewDescription}
            onChange={handlePreviewDescriptionChange}
          />
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Blog Content Blocks</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          <button onClick={() => handleAddBlock('text')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Text Block</button>
          <button onClick={() => handleAddBlock('image')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Image Block</button>
          <button onClick={() => handleAddBlock('chart')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Chart Block</button>
          <button onClick={() => handleAddBlock('ad')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Ad Block</button>
          <button onClick={() => handleAddBlock('infographic')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Infographic Block</button>
          <button onClick={() => handleAddBlock('accordion')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Accordion Block</button>
          <button onClick={() => handleAddBlock('highlight')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Highlight Block</button>
          <button onClick={() => handleAddBlock('table')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Table Block</button>
        </div>

        {blogPost.content.map((block, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4 relative">
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleMoveBlock(index, 'up')}
                disabled={index === 0}
                className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded disabled:opacity-50"
              >▲</button>
              <button
                onClick={() => handleMoveBlock(index, 'down')}
                disabled={index === blogPost.content.length - 1}
                className="bg-gray-600 hover:bg-gray-500 text-white p-1 rounded disabled:opacity-50"
              >▼</button>
              <button
                onClick={() => handleDeleteBlock(index)}
                className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
              >✕</button>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Block Type: {block.contentType}</h3>
            
            {block.contentType === 'text' && (
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-48"
                value={block.content}
                onChange={(e) => handleBlockContentChange(index, e.target.value)}
                placeholder="Enter Markdown content for this text block..."
              />
            )}

            {block.contentType === 'image' && (
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500"
                value={block.content}
                onChange={(e) => handleBlockContentChange(index, e.target.value)}
                placeholder="Enter image URL..."
              />
            )}

            {block.contentType === 'chart' && (
              <div>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 mb-2"
                  placeholder="Chart Title"
                  value={block.content.titleChart}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.titleChart = e.target.value;
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 mb-2"
                  placeholder="X-axis Label"
                  value={block.content.lableX}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.lableX = e.target.value;
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 mb-2"
                  placeholder="Y-axis Label"
                  value={block.content.lableY}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.lableY = e.target.value;
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-24"
                  placeholder="Enter X values (comma-separated)"
                  value={block.content.x.join(', ')}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.x = e.target.value.split(',').map(s => s.trim());
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-24 mt-2"
                  placeholder="Enter Y values (comma-separated numbers)"
                  value={block.content.y.join(', ')}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.y = e.target.value.split(',').map(Number);
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
              </div>
            )}

            {block.contentType === 'ad' && (
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500"
                value={block.content}
                onChange={(e) => {
                  const newContent = [...blogPost.content];
                  (newContent[index] as any).content = e.target.value;
                  setBlogPost({ ...blogPost, content: newContent });
                }}
              >
                <option value="728x90">728x90</option>
                <option value="468x60">468x60</option>
                <option value="320x50">320x50</option>
              </select>
            )}

            {block.contentType === 'infographic' && (
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-32"
                value={block.content}
                onChange={(e) => handleBlockContentChange(index, e.target.value)}
                placeholder="Enter infographic content (e.g., a description or data points)"
              />
            )}

            {block.contentType === 'accordion' && (
              <div>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 mb-2"
                  placeholder="Accordion Title"
                  value={block.content.title}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.title = e.target.value;
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-32"
                  placeholder="Accordion Content (Markdown)"
                  value={block.content.content}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.content = e.target.value;
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
              </div>
            )}

            {block.contentType === 'highlight' && (
              <div>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 mb-2"
                  value={block.content.type}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.type = e.target.value;
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                >
                  <option value="tip">Tip</option>
                  <option value="warning">Warning</option>
                  <option value="note">Note</option>
                </select>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-32"
                  placeholder="Highlight Content (Markdown)"
                  value={block.content.content}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.content = e.target.value;
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
              </div>
            )}

            {block.contentType === 'table' && (
              <div>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-24 mb-2"
                  placeholder="Enter headers (comma-separated)"
                  value={block.content.headers.join(', ')}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.headers = e.target.value.split(',').map(s => s.trim());
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500 h-48"
                  placeholder="Enter rows (each row on a new line, cells comma-separated)"
                  value={block.content.rows.map(row => row.join(', ')).join('\n')}
                  onChange={(e) => {
                    const newContent = [...blogPost.content];
                    (newContent[index] as any).content.rows = e.target.value.split('\n').map(row => row.split(',').map(s => s.trim()));
                    setBlogPost({ ...blogPost, content: newContent });
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Blog Post
        </button>
      </div>

      <div className="mt-12 bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">Blog Post Preview</h2>
        {renderBlog({ blogPost })}
      </div>
    </div>
  );
};

export default BlogEditor;