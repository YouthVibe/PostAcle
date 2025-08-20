import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - PostAcle',
  description: 'Get in touch with PostAcle. Contact us for support, feedback, or inquiries. Find our email, phone number, and a contact form to send us a message.',
  keywords: ['PostAcle', 'contact', 'support', 'feedback', 'inquiry', 'email', 'phone'],
  openGraph: {
    title: 'Contact Us - PostAcle',
    description: 'Get in touch with PostAcle. Contact us for support, feedback, or inquiries. Find our email, phone number, and a contact form to send us a message.',
    url: 'https://www.post-acle.blog/contact',
    siteName: 'PostAcle',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - PostAcle',
    description: 'Get in touch with PostAcle. Contact us for support, feedback, or inquiries. Find our email, phone number, and a contact form to send us a message.',
  },
};
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          Contact Us
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-semibold mb-4 text-purple-400">Get in Touch</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              You can reach us via email or phone. We aim to respond to all inquiries within 24-48 hours.
            </p>
            <ul className="text-gray-400 space-y-2">
              <li><strong>Email:</strong> epicdeveloper14@gmail.com</li>
              <li><strong>Phone:</strong> +91 8010182409</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-semibold mb-4 text-pink-400">Send Us a Message</h2>
            <form className="space-y-4" action="mailto:epicdeveloper14@gmail.com" method="POST" encType="text/plain">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50 border-gray-700 text-gray-200" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50 border-gray-700 text-gray-200" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50 border-gray-700 text-gray-200"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium py-2 px-4 rounded hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}