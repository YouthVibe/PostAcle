// 'use client';
// import React from 'react';
// import { IconType } from 'react-icons';
// import { 
//   FaBold, FaItalic, FaListUl, FaListOl, FaLink, FaImage, 
//   FaChartBar, FaAd, FaInfoCircle, FaChevronDown, FaCode,
//   FaTable, FaHeading, FaSave, FaEye, FaTimes
// } from 'react-icons/fa';

// interface ToolbarButton {
//   icon: IconType;
//   label: string;
//   action: () => void;
//   isActive?: boolean;
// }

// interface ToolbarProps {
//   onAction: (action: string, value?: any) => void;
//   canSave: boolean;
//   onSave: () => void;
//   onPreviewToggle: () => void;
//   isPreviewVisible: boolean;
// }

// const EditorToolbar: React.FC<ToolbarProps> = ({ 
//   onAction, 
//   canSave, 
//   onSave,
//   onPreviewToggle,
//   isPreviewVisible 
// }) => {
//   const [showHeadingMenu, setShowHeadingMenu] = React.useState(false);

//   const formatButtons: ToolbarButton[] = [
//     { icon: FaBold, label: 'Bold', action: () => onAction('format', 'bold') },
//     { icon: FaItalic, label: 'Italic', action: () => onAction('format', 'italic') },
//     { icon: FaLink, label: 'Add Link', action: () => onAction('insert', 'link') },
//   ];

//   const insertButtons: ToolbarButton[] = [
//     { icon: FaImage, label: 'Image', action: () => onAction('insert', 'image') },
//     { icon: FaChartBar, label: 'Chart', action: () => onAction('insert', 'chart') },
//     { icon: FaAd, label: 'Ad', action: () => onAction('insert', 'ad') },
//     { icon: FaInfoCircle, label: 'Infographic', action: () => onAction('insert', 'infographic') },
//     { icon: FaTable, label: 'Table', action: () => onAction('insert', 'table') },
//     { icon: FaCode, label: 'Code Block', action: () => onAction('insert', 'code') },
//   ];

//   const listButtons: ToolbarButton[] = [
//     { icon: FaListUl, label: 'Bullet List', action: () => onAction('list', 'bullet') },
//     { icon: FaListOl, label: 'Number List', action: () => onAction('list', 'number') },
//   ];

//   return (
//     <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center gap-2 sticky top-0 z-10">
//       <div className="relative">
//         <button
//           onClick={() => setShowHeadingMenu(!showHeadingMenu)}
//           className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-700 text-gray-300"
//         >
//           <FaHeading />
//           <FaChevronDown className="w-3 h-3" />
//         </button>
        
//         {showHeadingMenu && (
//           <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg">
//             {[1, 2, 3, 4, 5, 6].map(level => (
//               <button
//                 key={level}
//                 onClick={() => {
//                   onAction('heading', level);
//                   setShowHeadingMenu(false);
//                 }}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300"
//               >
//                 Heading {level}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="h-6 w-px bg-gray-700" />

//       <div className="flex items-center gap-1">
//         {formatButtons.map((btn, i) => (
//           <button
//             key={i}
//             onClick={btn.action}
//             className="p-2 rounded hover:bg-gray-700 text-gray-300"
//             title={btn.label}
//           >
//             <btn.icon />
//           </button>
//         ))}
//       </div>

//       <div className="h-6 w-px bg-gray-700" />

//       <div className="flex items-center gap-1">
//         {listButtons.map((btn, i) => (
//           <button
//             key={i}
//             onClick={btn.action}
//             className="p-2 rounded hover:bg-gray-700 text-gray-300"
//             title={btn.label}
//           >
//             <btn.icon />
//           </button>
//         ))}
//       </div>

//       <div className="h-6 w-px bg-gray-700" />

//       <div className="flex items-center gap-1">
//         {insertButtons.map((btn, i) => (
//           <button
//             key={i}
//             onClick={btn.action}
//             className="p-2 rounded hover:bg-gray-700 text-gray-300"
//             title={btn.label}
//           >
//             <btn.icon />
//           </button>
//         ))}
//       </div>

//       <div className="flex-1" />

//       <div className="flex items-center gap-2">
//         <button
//           onClick={onPreviewToggle}
//           className={`px-4 py-2 rounded flex items-center gap-2 ${
//             isPreviewVisible ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//           }`}
//           title={isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
//         >
//           <FaEye />
//           <span className="hidden sm:inline">Preview</span>
//         </button>

//         <button
//           onClick={onSave}
//           disabled={!canSave}
//           className={`px-4 py-2 rounded flex items-center gap-2 ${
//             canSave
//               ? 'bg-green-600 text-white hover:bg-green-700'
//               : 'bg-gray-700 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           <FaSave />
//           <span className="hidden sm:inline">Save</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditorToolbar;
export default function Page() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}