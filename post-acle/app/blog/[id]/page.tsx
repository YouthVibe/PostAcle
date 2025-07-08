'use client';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useParams } from 'next/navigation';

export default function BlogPost() {
  const params = useParams();
  const id = params?.id;

  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          Blog Post: {id}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          This is a placeholder for the blog post content.
        </p> */}

        <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 text-left">
          <h2 className="text-3xl font-semibold mb-4 text-purple-400">Article Title</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet...
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
