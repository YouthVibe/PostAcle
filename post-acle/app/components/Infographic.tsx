import React from 'react';

interface InfographicProps {
  children: React.ReactNode;
}

const Infographic: React.FC<InfographicProps> = ({ children }) => {
  return (
    <div className="my-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-purple-600">
      <h3 className="text-2xl font-bold text-purple-400 mb-4">Infographic</h3>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default Infographic;