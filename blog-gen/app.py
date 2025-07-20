from dotenv import load_dotenv
from pydantic import BaseModel
from google.genai import types
from google import genai
import requests
import json
import os
from datetime import datetime
import re
import time
import sys

load_dotenv()

pixabayApiUrl = "https://pixabay.com/api/"
pixabayApiKey = os.getenv("pixabayApiKey")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

class Blogs(BaseModel):
    title: str
    content: list[object]
    previewImageURL: str
    previewDescription: str
    category: str
    tags: list[str]
    author: str
    publishedDate: str
    wordsUsed: int

client = genai.Client(api_key=GEMINI_API_KEY)
# blog_writer = client.chats.create(model="gemini-2.5-flash-lite-preview-06-17")
# blog_writer = client.chats.create(model="gemini-2.5-pro")

# Define the grounding tool
grounding_tool = types.Tool(
    google_search=types.GoogleSearch()
)

# Configure generation settings
config = types.GenerateContentConfig(
    tools=[grounding_tool]
)

def build_pixabay_url(params):
    base_url = "https://pixabay.com/api/"
    query_string = "&".join([f"{key}={value}" for key, value in params.items()])
    return f"{base_url}?{query_string}"

# Function to create URL-friendly blogID from title
def generate_blog_id(title):
    # Convert to lowercase, replace spaces and special characters, ensure no invalid chars
    blog_id = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    return blog_id

# Function to prompt user for Y/N input
def prompt_yes_no(message):
    while True:
        response = input(f"{message} (Y/N): ").strip().lower()
        if response in ['y', 'n']:
            return response == 'y'
        print("Please enter 'Y' or 'N'.")

# Ensure output directories exist
os.makedirs("output/blogs", exist_ok=True)
os.makedirs("output/previewBlogs", exist_ok=True)

# Initialize index for all blogs
index_data = []
with open("output/index.json", "r") as f:
    index_data = json.load(f)
    f.close()

try:
    # Process each blog_ideas_part{n}.json file (n from 1 to 10)
    for n in range(1, 11):
        # Load blog topics from data/blog_ideas_part{n}.json
        # input(f"Press Enter to process blog_ideas_part{n}.json...")
        file_path = f"data/blog_ideas_part{n}.json"
        if not os.path.exists(file_path):
            print(f"❌ File {file_path} not found, skipping...")
            continue

        with open(file_path, 'r') as f:
            blog_ideas = json.load(f)

        # Process each blog idea in the file
        for data in blog_ideas:
            blog_writer = client.chats.create(model="gemini-2.5-pro")
            # input(f"Press Enter to process blog idea: {data['topic']}...")
            blog_number = data["number"]
            # output_dir = f"output/{str(blog_number)}"
            # os.makedirs(output_dir, exist_ok=True)

            output_data = []

            # Fetch images if useImage is enabled
            if data.get("useImage", {}).get("use", False):
                for query in data["useImage"]["searchQueryForImages"]:
                    params = {
                        "key": pixabayApiKey,
                        "q": query,
                        "image_type": "photo",
                        "per_page": data["useImage"]["TotalImagesToBeUsed"] + 5,
                        "safesearch": "true"
                    }
                    response = requests.get(build_pixabay_url(params))
                    # images = response.text
                    images = response.json().get("hits", [])
                    # print(images)
                    # print(params)
                    # exit()

                    formatted_images = []
                    for image in images:
                        formatted_images.append({
                            "largeImageURL": image["largeImageURL"],
                            "width": image["imageWidth"],
                            "height": image["imageHeight"]
                        })

                    output_data.append({
                        "query": query,
                        "images": formatted_images
                    })

                # Save images to output/{blog_number}/images.json
                # with open(f"{output_dir}/images.json", "w") as f:
                #     json.dump(output_data, f, indent=2)

                # print(f"✅ Saved extracted image info to {output_dir}/images.json")

            # Generate blog content with retry logic for rate limits
            max_retries = float('inf')  # Infinite retries for minute-based rate limit
            retry_delay = 60 / 15  # Approx 4 seconds per request to stay under 15/min
            attempt = 0

            while True:
                try:
                    response = blog_writer.send_message(f"""
You are a professional blogger and writes very good blogs.
You will be given a topic/data and you have to write a blog about that topic.

Blog: '''{json.dumps(data)}'''

You can use some following provided images urls.
Images: '''{json.dumps(output_data)}'''

You can use max 5000 words for your blog.
And in the provided blog idea, for text, charts, images, table or code then you can provide that content as a json object with content type as "text"/"image"/"chart"/"code" ==> and with this you can provide source as (url for image, markdown for phara/text, code in span tag with classes as tailwindcss for code, data for charts like "x": [valuesX], "y": [valuesY], "lableX": [values], "lableY": [values], "titleChart": "title" for charts, headers: list[str], rows: [list(str)] for table). And provide a preview image url as used for thubnail and also provide previewDescription of blog under 500 characters.

Your output should be in the following format:
{{
    "title": "Blog Title",
    "content": [
        {{
            "contentType": "text",
            "content": "Content of the blog"
        }},
        {{
            "contentType": "image",
            "content": "Image URL"
        }},
        {{
            "contentType": "chart",
            "content": \"\"\"{{
                "x": [valuesX],
                "y": [valuesY],
                "lableX": [values],
                "lableY": [values],
                "titleChart": "title"
            }}\"\"\"
        }},
        {{
            "contentType": "table",
            "content": \"\"\"{{
                "headers": ["Column 1", "Column 2"],
                "rows": [
                    ["Row 1, Column 1", "Row 1, Column 2"],
                    ["Row 2, Column 1", "Row 2, Column 2"]
                ]
            }}\"\"\"
        }}
    ],
    "previewImageURL": "Preview Image URL",
    "previewDescription": "Preview Description",
    "category": "Blog Category",
    "tags": ["tag1", "tag2"],
    "author": "Author Name",
    "publishedDate": "YYYY-MM-DD",
    "wordsUsed": "Number of words used"
}}
""", config={
                        "response_mime_type": "application/json",
                        "response_schema": Blogs,
                    })
                    break  # Exit retry loop on success

                except Exception as e:
                    if "daily limit" in str(e).lower():
                        print("❌ Daily limit exceeded")
                        if prompt_yes_no("Do you want to end the script?"):
                            sys.exit(0)
                        else:
                            print("Continuing to next blog idea...")
                            break
                    else:
                        attempt += 1
                        print(f"⚠️ Rate limit or error encountered: {e}. Retrying after {retry_delay} seconds... (Attempt {attempt})")
                        time.sleep(retry_delay)
                        retry_delay *= 1.5  # Exponential backoff

            if "response" not in locals():
                continue  # Skip to next blog if response was not generated due to daily limit

            blog = json.loads(response.text)

            blog["author"] = "PostAcle"
            blog["publishedDate"] = datetime.now().isoformat()
            blog["targetRegion"] = data["targetRegion"]

            # Generate blogID from title
            blog_id = generate_blog_id(blog["title"])

            # Save full blog to output/blogs/{blogID}.json
            with open(f"output/blogs/{blog_id}.json", "w") as f:
                json.dump(blog, f, indent=2)

            # Save preview description to output/previewBlogs/{blogID}.json
            with open(f"output/previewBlogs/{blog_id}.json", "w") as f:
                json.dump({"previewDescription": blog["previewDescription"]}, f, indent=2)

            # Add to index data
            index_data.append({
                "title": blog["title"],
                "tags": blog["tags"],
                "category": blog["category"],
                "previewImage": blog["previewImageURL"],
                "blogNumber": blog_number,
                "blogID": blog_id,
                "wordsUsed": blog["wordsUsed"],
                "publishedDate": datetime.now().isoformat(),
                "author": blog["author"],
                "targetRegion": data["targetRegion"]
            })

            print(f"✅ Generated blog {blog_id} for blog number {blog_number}")

    # Save index to output/index.json
    with open("output/index.json", "w") as f:
        json.dump(index_data, f, indent=2)

    # Save index update time to output/indexTime.txt
    with open("output/indexTime.txt", "w") as f:
        f.write(datetime.now().isoformat())

    print("✅ Saved index to output/index.json and update time to output/indexTime.txt")

except KeyboardInterrupt:
    print("\n⚠️ KeyboardInterrupt detected.")
    if prompt_yes_no("Do you want to stop the script?"):
        print("Exiting script...")
        sys.exit(0)
    else:
        print("Continuing execution...")