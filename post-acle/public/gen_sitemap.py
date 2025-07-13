import json
import os
from datetime import datetime

BASE_URL = "https://www.post-acle.blog"
SITEMAP_PATH = os.path.join("sitemap.xml")

# Ensure public dir exists
# os.makedirs(PUBLIC_DIR, exist_ok=True)

# Load index and best
with open("index.json", "r", encoding="utf-8") as f:
    index_data = json.load(f)

with open("best.json", "r", encoding="utf-8") as f:
    best_data = json.load(f)

# Collect best blog IDs to avoid repeating them
best_blog_ids = {blog["blogID"] for blog in best_data}

# Sitemap header
sitemap_entries = ['<?xml version="1.0" encoding="UTF-8"?>']
sitemap_entries.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

# ➤ Add main pages
main_pages = [
    ("/", "daily", "1.0"),
    ("/about", "monthly", "0.9"),
    ("/search", "monthly", "0.9"),
    ("/contact", "monthly", "0.9")
]

for path, freq, priority in main_pages:
    sitemap_entries.append(f"""  <url>
    <loc>{BASE_URL}{path}</loc>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

# ➤ Add best blogs (priority 0.8)
for blog in best_data:
    blog_id = blog["blogID"]
    pub_date = blog.get("publishedDate", datetime.now().isoformat()).split("T")[0]
    sitemap_entries.append(f"""  <url>
    <loc>{BASE_URL}/blogs/{blog_id}</loc>
    <lastmod>{pub_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""")

# ➤ Add remaining blogs from index.json (priority 0.7)
for blog in index_data:
    blog_id = blog["blogID"]
    if blog_id in best_blog_ids:
        continue  # Skip duplicate
    pub_date = blog.get("publishedDate", datetime.now().isoformat()).split("T")[0]
    sitemap_entries.append(f"""  <url>
    <loc>{BASE_URL}/blogs/{blog_id}</loc>
    <lastmod>{pub_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""")

# Close sitemap
sitemap_entries.append('</urlset>')

# Save to sitemap.xml
with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(sitemap_entries))

print(f"✅ Sitemap generated at ./{SITEMAP_PATH}")
