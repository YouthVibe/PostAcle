// 'use client';

// import React, { useState, useEffect } from 'react';
// import { BlogPost, BlogBlock, renderBlog } from '../page';
// import { useParams, useRouter } from 'next/navigation';
// import Navbar from '../../components/Navbar';
// import FooterStatic from '../../components/FooterStatic';
// import EditorToolbar from './EditorToolbar';
// import { storage } from '../utils/storage';
// import { 
//   FiSettings, FiImage, FiTag, FiGlobe, FiCalendar,
//   FiType, FiList, FiGrid, FiBox, FiAlertCircle
// } from 'react-icons/fi';

// const BlogEditor: React.FC = () => {
//   const router = useRouter();
//   const params = useParams();
//   const [blogPost, setBlogPost] = useState<BlogPost>({
//     title: '',
//     previewDescription: '',
//     content: [],
//     status: 'draft',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString()
//   });

//   useEffect(() => {
//     // Load blog if editing existing one
//     if (params?.id) {
//       const storedBlogs = localStorage.getItem('postacle-blogs');
//       if (storedBlogs) {
//         const blogs = JSON.parse(storedBlogs);
//         const blogIndex = Number(params.id);
//         if (blogs[blogIndex]) {
//           setBlogPost(blogs[blogIndex]);
//         }
//       }
//     }
//   }, [params?.id]);

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBlogPost({ ...blogPost, title: e.target.value });
//   };

//   const handlePreviewDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setBlogPost({ ...blogPost, previewDescription: e.target.value });
//   };

//   const handleSave = () => {
//     const storedBlogs = localStorage.getItem('postacle-blogs');
//     let blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
    
//     if (params?.id) {
//       // Update existing blog
//       blogs[Number(params.id)] = blogPost;
//     } else {
//       // Add new blog
//       blogs.push(blogPost);
//     }
    
//     localStorage.setItem('postacle-blogs', JSON.stringify(blogs));
    
//     // Save images to localStorage
//     blogPost.content.forEach(block => {
//       if (block.contentType === 'image' && block.content.startsWith('data:')) {
//         localStorage.setItem(`image-${Date.now()}`, block.content);
//       }
//     });
    
//     router.push('/blog');
//   };

//   // ... [Keep all the existing block manipulation functions from BlogEditor.tsx]

//   const [isPreviewVisible, setIsPreviewVisible] = useState(true);
//   const [showSettings, setShowSettings] = useState(false);
//   const [isDirty, setIsDirty] = useState(false);

//   const handleToolbarAction = (action: string, value?: any) => {
//     setIsDirty(true);
//     switch (action) {
//       case 'format':
//         // Handle text formatting
//         break;
//       case 'insert':
//         handleAddBlock(value as BlogBlock['contentType']);
//         break;
//       case 'heading':
//         // Handle heading insertion
//         break;
//       case 'list':
//         // Handle list insertion
//         break;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <Navbar />
      
//       <div className="container mx-auto">
//         <EditorToolbar 
//           onAction={handleToolbarAction}
//           canSave={isDirty}
//           onSave={handleSave}
//           onPreviewToggle={() => setIsPreviewVisible(!isPreviewVisible)}
//           isPreviewVisible={isPreviewVisible}
//         />
        
//         <div className="flex flex-col lg:flex-row">
//           {/* Editor Panel */}
//           <div className={`lg:w-${isPreviewVisible ? '1/2' : 'full'} p-4`}>
//             <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//               {/* Title Section */}
//               <div className="p-6 border-b border-gray-700">
//                 <input
//                   type="text"
//                   placeholder="Blog Title"
//                   className="w-full text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500"
//                   value={blogPost.title}
//                   onChange={handleTitleChange}
//                 />
//               </div>

//               {/* Settings Button */}
//               <button
//                 onClick={() => setShowSettings(!showSettings)}
//                 className="w-full flex items-center gap-2 px-6 py-3 bg-gray-750 text-gray-300 hover:bg-gray-700 transition-colors"
//               >
//                 <FiSettings className="w-5 h-5" />
//                 <span>Blog Settings</span>
//               </button>

//               {/* Settings Panel */}
//               {showSettings && (
//                 <div className="p-6 border-b border-gray-700 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       Preview Description
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
//                       rows={3}
//                       value={blogPost.previewDescription}
//                       onChange={handlePreviewDescriptionChange}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       <FiImage className="inline mr-2" />
//                       Preview Image URL
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
//                       value={blogPost.previewImageURL || ''}
//                       onChange={(e) => setBlogPost({ ...blogPost, previewImageURL: e.target.value })}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       <FiTag className="inline mr-2" />
//                       Tags
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
//                       placeholder="Enter tags separated by commas"
//                       value={blogPost.tags?.join(', ') || ''}
//                       onChange={(e) => setBlogPost({ ...blogPost, tags: e.target.value.split(',').map(tag => tag.trim()) })}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       <FiGlobe className="inline mr-2" />
//                       Target Region
//                     </label>
//                     <select
//                       className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
//                       value={blogPost.targetRegion || 'Global'}
//                       onChange={(e) => setBlogPost({ ...blogPost, targetRegion: e.target.value as any })}
//                     >
//                       <option value="Global">Global</option>
//                       <option value="India">India</option>
//                       <option value="US">US</option>
//                       <option value="Europe">Europe</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       <FiCalendar className="inline mr-2" />
//                       Publication Status
//                     </label>
//                     <select
//                       className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
//                       value={blogPost.status}
//                       onChange={(e) => setBlogPost({ ...blogPost, status: e.target.value as 'draft' | 'published' })}
//                     >
//                       <option value="draft">Draft</option>
//                       <option value="published">Published</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

//               {/* Content Blocks */}
//               <div className="p-6 space-y-6">
//                 {blogPost.content.map((block, index) => (
//                   <div key={index} className="relative group">
//                     <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
//                       <button
//                         onClick={() => handleMoveBlock(index, 'up')}
//                         disabled={index === 0}
//                         className="p-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
//                       >
//                         ↑
//                       </button>
//                       <button
//                         onClick={() => handleMoveBlock(index, 'down')}
//                         disabled={index === blogPost.content.length - 1}
//                         className="p-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
//                       >
//                         ↓
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBlock(index)}
//                         className="p-1 rounded bg-red-600 text-white hover:bg-red-700"
//                       >
//                         ×
//                       </button>
//                     </div>
//                     {/* Existing block content rendering */}
//                     {/* ... [Keep your existing block rendering code] ... */}
//                   </div>
//                 ))}

//                 {/* Add Block Button */}
//                 <div className="mt-6">
//                   <h3 className="text-lg font-medium text-gray-300 mb-3">Add Content Block</h3>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                     <button
//                       onClick={() => handleAddBlock('text')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiType className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Text</span>
//                     </button>
                    
//                     <button
//                       onClick={() => handleAddBlock('image')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiImage className="w-6 h-6 text-green-400 group-hover:text-green-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Image</span>
//                     </button>

//                     <button
//                       onClick={() => handleAddBlock('chart')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiGrid className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Chart</span>
//                     </button>

//                     <button
//                       onClick={() => handleAddBlock('infographic')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiBox className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Infographic</span>
//                     </button>

//                     <button
//                       onClick={() => handleAddBlock('accordion')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiList className="w-6 h-6 text-red-400 group-hover:text-red-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Accordion</span>
//                     </button>

//                     <button
//                       onClick={() => handleAddBlock('highlight')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiAlertCircle className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Highlight</span>
//                     </button>

//                     <button
//                       onClick={() => handleAddBlock('table')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiGrid className="w-6 h-6 text-teal-400 group-hover:text-teal-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Table</span>
//                     </button>

//                     <button
//                       onClick={() => handleAddBlock('ad')}
//                       className="flex flex-col items-center p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors group"
//                     >
//                       <FiBox className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
//                       <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300">Ad</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Preview Panel */}
//           {isPreviewVisible && (
//             <div className="lg:w-1/2 p-4">
//               <div className="bg-gray-800 rounded-lg shadow-lg p-6">
//                 <div className="prose prose-invert max-w-none">
//                   {renderBlog({ blogPost })}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <div className="text-gray-400">
//               {isDirty ? 'Unsaved changes' : 'All changes saved'}
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => router.push('/blog')}
//                 className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={!isDirty}
//                 className={`px-6 py-2 rounded transition-colors ${
//                   isDirty
//                     ? 'bg-green-600 text-white hover:bg-green-700'
//                     : 'bg-gray-700 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogEditor;
export default function Page() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}