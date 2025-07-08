import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrendingBlogs from './components/TrendingBlogs';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <Hero />
      <TrendingBlogs />
      <Footer />
    </main>
  );
}
