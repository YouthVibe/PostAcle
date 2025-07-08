import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          About PostAcle
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          PostAcle is your smart AI-powered blogging platform, designed to empower creators and connect readers with the content that matters most.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-semibold mb-4 text-purple-400">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to revolutionize the way content is created and consumed. We believe in the power of AI to enhance human creativity, providing tools that simplify the writing process, optimize content for engagement, and help stories reach a wider audience.
            </p>
          </div>
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-semibold mb-4 text-pink-400">What We Offer</h2>
            <ul className="text-gray-400 list-disc list-inside space-y-2 leading-relaxed">
              <li>AI-powered writing assistance to spark ideas and refine drafts.</li>
              <li>Seamless publishing tools for a global reach.</li>
              <li>Advanced analytics to understand your audience and content performance.</li>
              <li>A vibrant community of writers and readers.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 bg-gray-900/50 p-8 rounded-xl border border-gray-800">
          <h2 className="text-3xl font-semibold mb-4 text-blue-400">Our Vision</h2>
          <p className="text-gray-400 leading-relaxed">
            We envision a future where anyone can share their voice, regardless of their technical expertise. By leveraging cutting-edge AI and intuitive design, PostAcle aims to be the go-to platform for insightful articles, trending topics, and engaging narratives.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}