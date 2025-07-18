'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0px';
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-700 rounded-lg mb-4 overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left text-lg font-semibold text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: '0px' }}
      >
        <div className="p-4 bg-gray-900 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;