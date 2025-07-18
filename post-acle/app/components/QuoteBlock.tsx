import React from 'react';

interface QuoteBlockProps {
  children: React.ReactNode;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ children }) => {
  return (
    <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-gray-800 rounded-r-lg shadow-lg">
      <p className="text-lg italic text-gray-300 leading-relaxed">{children}</p>
    </blockquote>
  );
};

export default QuoteBlock;