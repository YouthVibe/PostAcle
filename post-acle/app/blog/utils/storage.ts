// import { BlogPost } from '../page';

// const STORAGE_KEYS = {
//   BLOGS_INDEX: 'postacle-blogs-index',
//   BLOG_PREFIX: 'postacle-blog-',
//   IMAGE_PREFIX: 'postacle-image-',
// };

// interface BlogIndex {
//   ids: string[];
//   lastUpdated: string;
// }

// export const storage = {
//   // Image handling
//   saveImage: (imageData: string): string => {
//     const imageId = `${STORAGE_KEYS.IMAGE_PREFIX}${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
//     localStorage.setItem(imageId, imageData);
//     return imageId;
//   },

//   getImage: (imageId: string): string | null => {
//     return localStorage.getItem(imageId);
//   },

//   // Blog handling
//   saveBlog: (blog: BlogPost): string => {
//     const blogId = blog.id || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
//     const blogKey = `${STORAGE_KEYS.BLOG_PREFIX}${blogId}`;
    
//     // Update the blog index
//     const index = storage.getBlogIndex();
//     if (!index.ids.includes(blogId)) {
//       index.ids.push(blogId);
//     }
//     index.lastUpdated = new Date().toISOString();
//     localStorage.setItem(STORAGE_KEYS.BLOGS_INDEX, JSON.stringify(index));

//     // Save the blog
//     localStorage.setItem(blogKey, JSON.stringify({ ...blog, id: blogId }));
//     return blogId;
//   },

//   getBlog: (blogId: string): BlogPost | null => {
//     const blogKey = `${STORAGE_KEYS.BLOG_PREFIX}${blogId}`;
//     const blogData = localStorage.getItem(blogKey);
//     return blogData ? JSON.parse(blogData) : null;
//   },

//   deleteBlog: (blogId: string): void => {
//     const blogKey = `${STORAGE_KEYS.BLOG_PREFIX}${blogId}`;
//     localStorage.removeItem(blogKey);

//     // Update the index
//     const index = storage.getBlogIndex();
//     index.ids = index.ids.filter(id => id !== blogId);
//     index.lastUpdated = new Date().toISOString();
//     localStorage.setItem(STORAGE_KEYS.BLOGS_INDEX, JSON.stringify(index));
//   },

//   getAllBlogs: (): BlogPost[] => {
//     const index = storage.getBlogIndex();
//     return index.ids
//       .map(id => storage.getBlog(id))
//       .filter((blog): blog is BlogPost => blog !== null)
//       .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
//   },

//   getBlogIndex: (): BlogIndex => {
//     const indexData = localStorage.getItem(STORAGE_KEYS.BLOGS_INDEX);
//     return indexData 
//       ? JSON.parse(indexData)
//       : { ids: [], lastUpdated: new Date().toISOString() };
//   },

//   // Utility functions
//   clearAll: () => {
//     const keys = Object.keys(localStorage);
//     keys.forEach(key => {
//       if (key.startsWith('postacle-')) {
//         localStorage.removeItem(key);
//       }
//     });
//   },
// };