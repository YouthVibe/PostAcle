import React from 'react';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - PostAcle',
  description: 'Privacy Policy for PostAcle. This website is a read-only blog and does not collect any personal information from users.',
  keywords: ['privacy policy', 'PostAcle', 'data collection', 'cookies', 'Google Analytics', 'Google AdSense'],
  openGraph: {
    title: 'Privacy Policy - PostAcle',
    description: 'Privacy Policy for PostAcle. This website is a read-only blog and does not collect any personal information from users.',
    url: 'https://www.post-acle.blog/privacy',
    siteName: 'PostAcle',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - PostAcle',
    description: 'Privacy Policy for PostAcle. This website is a read-only blog and does not collect any personal information from users.',
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto prose prose-invert text-left">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          Privacy Policy for PostAcle
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          <strong>Effective Date:</strong> July 13, 2025<br />
          <strong>Website:</strong> https://www.post-acle.blog<br />
          <strong>Contact:</strong> epicdeveloper14@gmail.com | +91 8010182409
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          At PostAcle, we respect your privacy. This website is a read-only blog and does <strong>not collect any personal information</strong> from users.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-purple-400">What We Collect</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          We <strong>do not collect</strong> any personally identifiable information such as your name, email, or IP address directly.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          However, we may use:
          <ul>
            <li><strong>Google Analytics</strong> to collect anonymous usage data (browser type, pages visited, time spent).</li>
            <li><strong>Google AdSense</strong> to serve ads, which may use cookies to personalize ads based on your behavior.</li>
          </ul>
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-pink-400">Cookies</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Third-party services like Google may use cookies to serve personalized content or ads.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          You can disable cookies via your browser settings.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-blue-400">Third-Party Services</h2>
        <ul className="text-gray-400 list-disc list-inside space-y-2 leading-relaxed mb-6">
          <li><strong>Google Analytics</strong> (anonymous usage tracking)</li>
          <li><strong>Google AdSense</strong> (personalized ads)</li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-6">
          We do not control how these third parties use your data. Please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://policies.google.com/privacy</a>.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-green-400">Children's Privacy</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          This site is not intended for users under the age of 18.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-yellow-400">Changes to This Policy</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          This policy may be updated occasionally. Check this page for updates.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-red-400">Contact Us</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          If you have any concerns:
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