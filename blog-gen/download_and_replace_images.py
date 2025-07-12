import json
import requests
from pathlib import Path
from urllib.parse import urlparse
import os

# Directories
index_path = Path("./output/index.json")
blogs_dir = Path("./output/blogs")
images_dir = Path("./output/images")
images_dir.mkdir(parents=True, exist_ok=True)

# Download and return new local path
def download_image(url):
    try:
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        local_path = images_dir / filename

        if not local_path.exists():
            r = requests.get(url, timeout=10)
            if r.status_code == 200:
                with open(local_path, 'wb') as f:
                    f.write(r.content)
            else:
                return None
        return f"/images/{filename}"
    except Exception as e:
        print(f"❌ Failed to download: {url} -> {e}")
        return None

# Load index.json
with open(index_path, "r", encoding="utf-8") as f:
    index_data = json.load(f)

# Process each blog in index
for blog_entry in index_data:
    blog_id = blog_entry["blogID"]
    blog_path = blogs_dir / f"{blog_id}.json"

    # -- Download previewImage --
    if blog_entry.get("previewImage"):
        new_path = download_image(blog_entry["previewImage"])
        if new_path:
            blog_entry["previewImage"] = new_path

    # -- Update blog file --
    if blog_path.exists():
        with open(blog_path, "r", encoding="utf-8") as f:
            blog_data = json.load(f)

        # Download blog previewImageURL
        if blog_data.get("previewImageURL"):
            new_path = download_image(blog_data["previewImageURL"])
            if new_path:
                blog_data["previewImageURL"] = new_path

        # Replace all image blocks with local paths
        for block in blog_data.get("content", []):
            if block.get("contentType") == "image":
                url = block.get("content")
                new_path = download_image(url)
                if new_path:
                    block["content"] = new_path

        # Save updated blog
        with open(blog_path, "w", encoding="utf-8") as f:
            json.dump(blog_data, f, indent=2)
    else:
        print(f"⚠️ Blog file missing: {blog_path}")

# Save updated index.json
with open(index_path, "w", encoding="utf-8") as f:
    json.dump(index_data, f, indent=2)

print("✅ All images downloaded and paths updated!")
