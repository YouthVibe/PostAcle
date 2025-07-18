'use client';

import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      if (totalHeight > 0) {
        const currentProgress = (scrollPosition / totalHeight) * 100;
        setProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
      <div
        className="h-full bg-purple-500 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ReadingProgressBar;