'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  username: string;
  userType: string;
}

interface Blog {
  _id: string;
  title: string;
  author: string;
  status: string;
}

export default function OwnerDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      router.push('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
          headers: { 'x-api-key': apiKey },
        });
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        } else {
          throw new Error('Failed to fetch users');
        }

        // Fetch blogs (assuming an endpoint for all blogs for managers/owners)
        const blogsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/all`, { // Assuming a new endpoint /blogs/all for owner
          headers: { 'x-api-key': apiKey },
        });
        if (blogsResponse.ok) {
          const blogsData = await blogsResponse.json();
          setBlogs(blogsData);
        } else {
          throw new Error('Failed to fetch blogs');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Owner Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">User Type</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border-b">{user.username}</td>
                    <td className="py-2 px-4 border-b">{user.userType}</td>
                    <td className="py-2 px-4 border-b">
                      {/* Add user management actions here (e.g., Edit, Delete) */}
                      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {blogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Author</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="py-2 px-4 border-b">{blog.title}</td>
                    <td className="py-2 px-4 border-b">{blog.author}</td>
                    <td className="py-2 px-4 border-b">{blog.status}</td>
                    <td className="py-2 px-4 border-b">
                      {/* Add blog management actions here (e.g., View, Edit, Approve/De-approve, Delete) */}
                      <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">View</button>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                      <button className="bg-purple-500 text-white px-3 py-1 rounded">Approve/De-approve</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}