'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          PostAcle
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ul className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
          <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><Link href="/search" className="hover:text-white transition-colors">Search</Link></li>
          <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
          <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
          <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
        </ul>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/search" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Search</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Terms</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
