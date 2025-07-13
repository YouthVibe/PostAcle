import React from 'react';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - PostAcle',
  description: 'Terms of Service for PostAcle. By accessing or using this blog, you agree to the following terms.',
  keywords: ['terms of service', 'PostAcle', 'content usage', 'external links', 'disclaimer'],
  openGraph: {
    title: 'Terms of Service - PostAcle',
    description: 'Terms of Service for PostAcle. By accessing or using this blog, you agree to the following terms.',
    url: 'https://www.post-acle.blog/terms',
    siteName: 'PostAcle',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - PostAcle',
    description: 'Terms of Service for PostAcle. By accessing or using this blog, you agree to the following terms.',
  },
};

export default function TermsOfService() {
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto prose prose-invert text-left">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          Terms of Service for PostAcle
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          <strong>Effective Date:</strong> July 13, 2025<br />
          <strong>Website:</strong> https://www.post-acle.blog<br />
          <strong>Contact:</strong> epicdeveloper14@gmail.com | +91 8010182409
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          By accessing or using this blog, you agree to the following terms.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-purple-400">1. Content Usage</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          All blog content is original and owned by the creator of PostAcle. You may:
          <ul>
            <li>Read and share blog content freely.</li>
            <li>Not copy, reproduce, or republish content without permission.</li>
          </ul>
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-pink-400">2. User Accounts</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          No registration or login is required. Users cannot post or upload content.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-blue-400">3. External Links & Ads</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Some pages may contain:
          <ul>
            <li><strong>Affiliate links or ads</strong> via Google AdSense.</li>
            <li>External links to other websites. We are not responsible for their content or policies.</li>
          </ul>
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-green-400">4. Disclaimer</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          All blog content is for informational or entertainment purposes only. No guarantees are made regarding the accuracy or completeness.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-yellow-400">5. Limitation of Liability</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          PostAcle will not be held responsible for any damages or issues arising from the use of this site.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-red-400">6. Governing Law</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          These terms are governed by the laws of Maharashtra, India.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-purple-400">Contact Us</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Questions or concerns:
          <ul>
            <li>📧 Email: epicdeveloper14@gmail.com</li>
            <li>📞 Phone: +91 8010182409</li>
          </ul>
        </p>
      </section>
      <Footer />
    </main>
  );
}