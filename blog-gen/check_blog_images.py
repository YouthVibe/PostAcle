import json
import requests
from pathlib import Path

# Paths
index_path = Path("./output/index.json")
blogs_dir = Path("./output/blogs")

# Helper: Check if image URL is valid (status code < 400)
def is_valid_image(url):
    try:
        r = requests.head(url, timeout=5)
        return r.status_code < 400
    except:
        return False

# Load index
with open(index_path, "r", encoding="utf-8") as f:
    index_data = json.load(f)

# Process each blog
for blog_entry in index_data:
    blog_id = blog_entry["blogID"]
    blog_path = blogs_dir / f"{blog_id}.json"

    # === Check previewImage ===
    preview_url = blog_entry.get("previewImage")
    if preview_url and not is_valid_image(preview_url):
        blog_entry["previewImage"] = None  # update index entry

    # === Load blog file ===
    if blog_path.exists():
        with open(blog_path, "r", encoding="utf-8") as f:
            blog_data = json.load(f)

        # Fix previewImage in blog too
        if blog_data.get("previewImageURL") == preview_url and not is_valid_image(preview_url):
            blog_data["previewImageURL"] = 'null'

        # Filter out broken image blocks in content
        cleaned_content = []
        for block in blog_data.get("content", []):
            if block.get("contentType") == "image":
                url = block.get("content")
                if is_valid_image(url):
                    cleaned_content.append(block)
                # else: skip this image
            else:
                cleaned_content.append(block)

        blog_data["content"] = cleaned_content

        # Save cleaned blog file
        with open(blog_path, "w", encoding="utf-8") as f:
            json.dump(blog_data, f, indent=2)
    else:
        print(f"⚠️ Blog file missing: {blog_path}")

# Save updated index.json
with open(index_path, "w", encoding="utf-8") as f:
    json.dump(index_data, f, indent=2)

print("✅ Done! Broken preview images set to None, invalid content images removed.")
