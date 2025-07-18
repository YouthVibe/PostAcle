import React from 'react';

interface HighlightBoxProps {
  type: 'tip' | 'warning' | 'note';
  children: React.ReactNode;
}

const HighlightBox: React.FC<HighlightBoxProps> = ({ type, children }) => {
  let bgColorClass = '';
  let borderColorClass = '';
  let icon = '';

  switch (type) {
    case 'tip':
      bgColorClass = 'bg-blue-900/20';
      borderColorClass = 'border-blue-500';
      icon = '💡';
      break;
    case 'warning':
      bgColorClass = 'bg-yellow-900/20';
      borderColorClass = 'border-yellow-500';
      icon = '⚠️';
      break;
    case 'note':
      bgColorClass = 'bg-purple-900/20';
      borderColorClass = 'border-purple-500';
      icon = '📌';
      break;
    default:
      bgColorClass = 'bg-gray-900/20';
      borderColorClass = 'border-gray-500';
      break;
  }

  return (
    <div className={`p-4 my-6 rounded-lg border-l-4 ${bgColorClass} ${borderColorClass}`}>
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h4 className="font-semibold text-lg text-white capitalize">{type}</h4>
      </div>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default HighlightBox;