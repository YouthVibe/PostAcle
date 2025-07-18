'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-react-richtexteditor/styles/material.css';

interface BlogPostData {
  id: string;
  title: string;
  previewDescription: string;
  previewImageURL?: string;
  content: string;
  tags: string[];
  author: string;
  publishedDate: string;
  wordsUsed?: number;
  targetRegion?: string;
}

const LOCAL_STORAGE_KEY = 'blogPosts';

const getBlogPosts = (): BlogPostData[] => {
  if (typeof window === 'undefined') return [];
  const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const saveBlogPosts = (posts: BlogPostData[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
};

const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default function WriteBlogPage() {
  const [view, setView] = useState<'list' | 'createForm' | 'viewBlog' | 'editContent' | 'editMetadata'>('list');
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostData | null>(null);

  const [title, setTitle] = useState('');
  const [previewDescription, setPreviewDescription] = useState('');
  const [previewImageURL, setPreviewImageURL] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setBlogPosts(getBlogPosts());
    const today = new Date();
    setPublishedDate(today.toISOString().split('T')[0]);
  }, []);

  const handleSaveBlog = (blog: BlogPostData) => {
    const updatedPosts = selectedBlog
      ? blogPosts.map((p) => (p.id === blog.id ? blog : p))
      : [...blogPosts, { ...blog, id: generateUniqueId() }];
    saveBlogPosts(updatedPosts);
    setBlogPosts(updatedPosts);
    setMessage('Blog post saved successfully!');
    setView('list');
    setSelectedBlog(null);
  };

  const handleDeleteBlog = (id: string) => {
    const updatedPosts = blogPosts.filter((blog) => blog.id !== id);
    saveBlogPosts(updatedPosts);
    setBlogPosts(updatedPosts);
    setMessage('Blog post deleted successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !previewDescription || !content || !tags || !author || !publishedDate) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const wordsUsed = content.split(/\s+/).filter(Boolean).length;

    const newBlogPost: BlogPostData = {
      id: selectedBlog?.id || generateUniqueId(),
      title,
      previewDescription,
      previewImageURL,
      content: content,
      tags: tags.split(',').map(tag => tag.trim()),
      author,
      publishedDate,
      wordsUsed,
    };

    handleSaveBlog(newBlogPost);
  };

  const toolbarSettings = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', 'CreateLink', 'Image', 'SourceCode', 'Undo', 'Redo']
  };

  const handleEditContent = (blog: BlogPostData) => {
    setSelectedBlog(blog);
    setContent(blog.content);
    setView('editContent');
  };

  const handleEditMetadata = (blog: BlogPostData) => {
    setSelectedBlog(blog);
    setTitle(blog.title);
    setPreviewDescription(blog.previewDescription);
    setPreviewImageURL(blog.previewImageURL || '');
    setTags(blog.tags.join(', '));
    setAuthor(blog.author);
    setPublishedDate(blog.publishedDate);
    setView('editMetadata');
  };

  const handleViewBlog = (blog: BlogPostData) => {
    setSelectedBlog(blog);
    setView('viewBlog');
  };

  const handleCreateNew = () => {
    setSelectedBlog(null);
    setTitle('');
    setPreviewDescription('');
    setPreviewImageURL('');
    setContent('');
    setTags('');
    setAuthor('');
    const today = new Date();
    setPublishedDate(today.toISOString().split('T')[0]);
    setMessage('');
    setView('createForm');
  };

  const renderBlogList = () => (
    <div className="space-y-4">
      <button
        onClick={handleCreateNew}
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-6"
      >
        Create New Blog Post
      </button>
      {blogPosts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts saved yet. Click 'Create New Blog Post' to get started!</p>
      ) : (
        <ul className="space-y-4">
          {blogPosts.map((blog) => (
            <li key={blog.id} className="bg-gray-700 p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="text-gray-400">{blog.author} - {blog.publishedDate}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleViewBlog(blog)}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                >
                  Open
                </button>
                <button
                  onClick={() => handleEditMetadata(blog)}
                  className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
                >
                  Edit Metadata
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderCreateEditForm = (isEdit: boolean) => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center">{isEdit ? 'Edit Blog Post Metadata' : 'Write a New Blog Post'}</h1>
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-300">Title</label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="previewDescription" className="block text-lg font-medium text-gray-300">Preview Description</label>
        <textarea
          id="previewDescription"
          rows={3}
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
          value={previewDescription}
          onChange={(e) => setPreviewDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="previewImageURL" className="block text-lg font-medium text-gray-300">Preview Image URL (Optional)</label>
        <input
          type="text"
          id="previewImageURL"
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
          value={previewImageURL}
          onChange={(e) => setPreviewImageURL(e.target.value)}
        />
      </div>

      {!isEdit && (
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-300">Content</label>
          <RichTextEditorComponent
            height={300}
            toolbarSettings={toolbarSettings}
            value={content}
            change={(e: any) => setContent(e.value)}
            cssClass="rte-dark-theme"
          >
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
          </RichTextEditorComponent>
          <style jsx global>{`
            .rte-dark-theme.e-richtexteditor {
              background-color: #2d3748; /* gray-800 */
              border-color: #4a5568; /* gray-600 */
              color: #e2e8f0; /* gray-200 */
            }
            .rte-dark-theme .e-rte-toolbar {
              background-color: #4a5568; /* gray-700 */
              border-color: #4a5568; /* gray-600 */
            }
            .rte-dark-theme .e-rte-content {
              background-color: #2d3748; /* gray-800 */
              color: #e2e8f0; /* gray-200 */
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn {
              color: #e2e8f0; /* gray-200 */
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn:hover {
              background-color: #6b7280; /* gray-600 */
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item.e-active .e-btn {
              background-color: #8b5cf6; /* purple-500 */
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item.e-active .e-btn:hover {
              background-color: #7c3aed; /* purple-600 */
            }
            .rte-dark-theme .e-rte-toolbar .e-dropdown-btn .e-caret {
              color: #e2e8f0; /* gray-200 */
            }
            .rte-dark-theme .e-rte-toolbar .e-dropdown-btn:hover .e-caret {
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-btn-icon {
              color: #e2e8f0; /* gray-200 */
            }
            .rte-dark-theme .e-rte-toolbar .e-btn-icon:hover {
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-btn-icon.e-active {
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-btn-icon.e-active:hover {
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active {
              background-color: #8b5cf6; /* purple-500 */
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active:hover {
              background-color: #7c3aed; /* purple-600 */
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active .e-btn-icon {
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active:hover .e-btn-icon {
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active .e-caret {
              color: #ffffff;
            }
            .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active:hover .e-caret {
              color: #ffffff;
            }
          `}</style>
        </div>
      )}

      <div>
        <label htmlFor="tags" className="block text-lg font-medium text-gray-300">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-lg font-medium text-gray-300">Author</label>
        <input
          type="text"
          id="author"
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="publishedDate" className="block text-lg font-medium text-gray-300">Published Date</label>
        <input
          type="date"
          id="publishedDate"
          className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {isEdit ? 'Save Metadata' : 'Create Blog Post'}
      </button>
      <button
        type="button"
        onClick={() => setView('list')}
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2"
      >
        Cancel
      </button>
    </form>
  );

  const renderViewBlog = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center">{selectedBlog?.title}</h1>
      <p className="text-gray-400 text-center">By {selectedBlog?.author} on {selectedBlog?.publishedDate}</p>
      {selectedBlog?.previewImageURL && (
        <div className="flex justify-center">
          <img src={selectedBlog.previewImageURL} alt={selectedBlog.title} className="max-w-full h-auto rounded-lg" />
        </div>
      )}
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedBlog?.content || '' }} />
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleEditContent(selectedBlog!)}
          className="py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
        >
          Edit Content
        </button>
        <button
          onClick={() => handleEditMetadata(selectedBlog!)}
          className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
        >
          Edit Metadata
        </button>
        <button
          onClick={() => setView('list')}
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
        >
          Back to List
        </button>
      </div>
    </div>
  );

  const renderEditContent = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Edit Content for: {selectedBlog?.title}</h1>
      <div>
        <label htmlFor="content" className="block text-lg font-medium text-gray-300">Content</label>
        <RichTextEditorComponent
          height={500}
          toolbarSettings={toolbarSettings}
          value={content}
          change={(e: any) => setContent(e.value)}
          cssClass="rte-dark-theme"
        >
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
        </RichTextEditorComponent>
        <style jsx global>{`
          .rte-dark-theme.e-richtexteditor {
            background-color: #2d3748; /* gray-800 */
            border-color: #4a5568; /* gray-600 */
            color: #e2e8f0; /* gray-200 */
          }
          .rte-dark-theme .e-rte-toolbar {
            background-color: #4a5568; /* gray-700 */
            border-color: #4a5568; /* gray-600 */
          }
          .rte-dark-theme .e-rte-content {
            background-color: #2d3748; /* gray-800 */
            color: #e2e8f0; /* gray-200 */
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn {
            color: #e2e8f0; /* gray-200 */
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn:hover {
            background-color: #6b7280; /* gray-600 */
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item.e-active .e-btn {
            background-color: #8b5cf6; /* purple-500 */
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item.e-active .e-btn:hover {
            background-color: #7c3aed; /* purple-600 */
          }
          .rte-dark-theme .e-rte-toolbar .e-dropdown-btn .e-caret {
            color: #e2e8f0; /* gray-200 */
          }
          .rte-dark-theme .e-rte-toolbar .e-dropdown-btn:hover .e-caret {
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-btn-icon {
            color: #e2e8f0; /* gray-200 */
          }
          .rte-dark-theme .e-rte-toolbar .e-btn-icon:hover {
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-btn-icon.e-active {
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-btn-icon.e-active:hover {
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active {
            background-color: #8b5cf6; /* purple-500 */
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active:hover {
            background-color: #7c3aed; /* purple-600 */
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active .e-btn-icon {
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active:hover .e-btn-icon {
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active .e-caret {
            color: #ffffff;
          }
          .rte-dark-theme .e-rte-toolbar .e-toolbar-item .e-btn.e-active:hover .e-caret {
            color: #ffffff;
          }
        `}</style>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            if (selectedBlog) {
              handleSaveBlog({ ...selectedBlog, content });
            }
          }}
          className="py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
        >
          Save Content
        </button>
        <button
          onClick={() => setView('viewBlog')}
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        {message && (
          <p className="mt-4 text-center text-lg font-medium text-green-400 mb-4">
            {message}
          </p>
        )}
        {view === 'list' && renderBlogList()}
        {view === 'createForm' && renderCreateEditForm(false)}
        {view === 'editMetadata' && renderCreateEditForm(true)}
        {view === 'viewBlog' && selectedBlog && renderViewBlog()}
        {view === 'editContent' && selectedBlog && renderEditContent()}
      </div>
    </div>
  );
}