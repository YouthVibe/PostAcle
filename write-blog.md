# ✍️ How to Write a Blog on PostAcle

Welcome to the official **PostAcle write-blog guide**. Here’s how **you** (as a contributor or developer) can publish blogs on PostAcle manually using JSON files.

> **PostAcle is a fully static blog platform.** Blogs are created and updated through structured JSON files stored in the `public/` directory. There is no backend, auth, or CMS.

---

## 🧩 File Structure for Blogs

Your blog is composed of **3 parts**:

### 1. `public/blogs/[blogID].json`

This contains the actual blog **content** in structured JSON format following the `BlogPostContent` schema.

### 2. `public/index.json`

This is the **search and listing index** of all blogs. Each entry summarizes a blog with metadata.

### 3. `public/best.json`

This shows **top blogs on the homepage**. Add only selected blogs here.

### 4. `public/images/`

Upload your blog's **preview image** here and use its link in the JSON.

---

## 🧱 Blog Metadata Format (index.json / best.json)

Each blog must have an entry in `index.json`:

```json
{
  "title": "Blog Title",
  "tags": ["tag1", "tag2"],
  "category": "Category Name",
  "previewImage": "https://www.post-acle.blog/images/your-image.jpg",
  "blogNumber": 102,
  "blogID": "your-blog-id",
  "wordsUsed": 780,
  "publishedDate": "2025-07-20T14:30:00.000Z",
  "author": "PostAcle",
  "targetRegion": "Global"
}
```

> ✅ You must add this to both `index.json` and `best.json` (optional).

---

## 📖 Blog Content Format (`public/blogs/[blogID].json`)

Each blog content file must match the `BlogPost` format:

```json
{
  "title": "Blog Title",
  "previewDescription": "Short summary of the blog",
  "previewImageURL": "https://www.post-acle.blog/images/your-image.jpg",
  "content": [
    { "contentType": "text", "content": "# Welcome\nThis is your blog content." },
    { "contentType": "image", "content": "https://www.post-acle.blog/images/example.jpg" },
    { "contentType": "chart", "content": {
      "x": ["Jan", "Feb"], "y": [30, 50], "titleChart": "Visitors", "lableX": "Month", "lableY": "Count"
    }}
  ],
  "tags": ["example", "tutorial"],
  "author": "Swaraj Puppalwar",
  "publishedDate": "2025-07-20",
  "wordsUsed": 600,
  "targetRegion": "Global"
}
```

---

## 📦 Steps to Publish a Blog

1. ✍️ Write the blog JSON content and save it as:
   `public/blogs/[your-blogID].json`

2. 🖼️ Upload preview image to:
   `public/images/your-image.jpg`

3. 🧩 Add an entry to:
   `public/index.json`

4. ⭐ (Optional) Add the same entry to:
   `public/best.json` if it’s a featured blog

5. 🚀 Commit and deploy your changes

```bash
git add .
git commit -m "Added new blog: [blog title]"
git push
```

Vercel or GitHub Pages will auto-deploy the updated site.

---

## ✅ Tips for Good Blogs

* Use `#` headings and markdown in `text` blocks
* Combine multiple content types (text, image, chart, etc.)
* Add correct `wordsUsed` (estimate manually if needed)
* Set `targetRegion` wisely (Global / USA / India etc.)
* Use attractive preview images (hosted in `/images/`)

---

## 💬 Need Help?

Join our community or contact [@UltronTheAI](https://github.com/UltronTheAI) for support.

---

> Made with ❤️ by [Swaraj Puppalwar](https://github.com/UltronTheAI)
