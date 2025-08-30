'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import FooterStatic from '../components/FooterStatic';

export default function WriterDashboard() {
  const [rawText, setRawText] = useState('');
  const [message, setMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      router.push('/blog'); // Redirect to login if not authenticated
    } else {
      fetchWriterBlogs();
    }
  }, []);

  const fetchWriterBlogs = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const apiKey = localStorage.getItem('apiKey');
      const response = await fetch(`${backendUrl}/api/writer/my-blogs`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setMessage('Failed to fetch blogs.');
      }
    } catch (error) {
      console.error('Error fetching writer blogs:', error);
      setMessage('Error fetching blogs.');
    }
  };

  const handleGenerateBlog = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const apiKey = localStorage.getItem('apiKey');
      const response = await fetch(`${backendUrl}/api/writer/generate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ rawText }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setRawText('');
        fetchWriterBlogs(); // Refresh the list of blogs
      } else {
        setMessage(data.message || 'Blog generation failed.');
      }
    } catch (error) {
      console.error('Error generating blog:', error);
      setMessage('An unexpected error occurred during blog generation.');
    }
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!editingBlog) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const apiKey = localStorage.getItem('apiKey');
      const response = await fetch(`${backendUrl}/api/writer/modify-blog/${editingBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(editingBlog),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setEditingBlog(null);
        fetchWriterBlogs(); // Refresh the list of blogs
      } else {
        setMessage(data.message || 'Blog update failed.');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setMessage('An unexpected error occurred during blog update.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d1a] flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold mb-6">Writer Dashboard</h1>

        {message && <p className="mb-4 text-green-500">{message}</p>}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Generate New Blog</h2>
          <form onSubmit={handleGenerateBlog} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="rawText" className="block text-gray-300 text-sm font-bold mb-2">Raw Text for Blog Generation:</label>
              <textarea
                id="rawText"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 h-32"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Enter raw text here to generate a blog post..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate Blog
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>
          {blogs.length === 0 ? (
            <p>No blogs found. Generate one to get started!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">Status: {blog.status}</p>
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {editingBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Edit Blog: {editingBlog.title}</h2>
              <form onSubmit={handleUpdateBlog}>
                <div className="mb-4">
                  <label htmlFor="editTitle" className="block text-gray-300 text-sm font-bold mb-2">Title:</label>
                  <input
                    type="text"
                    id="editTitle"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="editContent" className="block text-gray-300 text-sm font-bold mb-2">Content:</label>
                  <textarea
                    id="editContent"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 h-64"
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="editStatus" className="block text-gray-300 text-sm font-bold mb-2">Status:</label>
                  <select
                    id="editStatus"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                    value={editingBlog.status}
                    onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <FooterStatic />
    </main>
  );
}