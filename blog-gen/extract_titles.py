import json
from pathlib import Path

# File paths
index_path = Path("./output/index.json")
topics_path = Path("./output/topics.json")

# Load index.json
with open(index_path, "r", encoding="utf-8") as f:
    index_data = json.load(f)

# Extract titles
titles = [entry["title"] for entry in index_data if "title" in entry]

# Save to topics.json
with open(topics_path, "w", encoding="utf-8") as f:
    json.dump(titles, f, indent=2)

print(f"✅ Extracted {len(titles)} titles to {topics_path}")
