import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  value: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden shadow-lg">
      <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
        <span className="text-sm text-gray-300">{language}</span>
        <button
          onClick={handleCopy}
          className="px-3 py-1 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter language={language} style={dracula} customStyle={{ padding: '1.5rem', borderRadius: '0 0 0.5rem 0.5rem' }}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;