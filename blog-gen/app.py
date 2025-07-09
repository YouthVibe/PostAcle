from dotenv import load_dotenv
from pydantic import BaseModel
from google.genai import types
from google import genai
import requests
import json
import os

load_dotenv()

pixabayApiUrl = "https://pixabay.com/api/"
pixabayApiKey = os.getenv("pixabayApiKey")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# class Content(BaseModel):
#     contentType: str
#     content: str

class Blogs(BaseModel):
    title: str
    content: list[object]
    previewImageURL: str
    previewDescription: str

client = genai.Client(api_key=GEMINI_API_KEY)
blog_writer = client.chats.create(model="gemini-2.5-flash-lite-preview-06-17")

# Define the grounding tool
grounding_tool = types.Tool(
    google_search=types.GoogleSearch()
)

# Configure generation settings
config = types.GenerateContentConfig(
    tools=[grounding_tool]
)

# Load blog topic from 1.json
data = json.load(open("data/2.json"))[0]

output_data = []

if data["useImage"]["use"]:
    for query in data["useImage"]["searchQueryForImages"]:
        params = {
            "key": pixabayApiKey,
            "q": query,
            "image_type": "photo",
            "per_page": data["useImage"]["TotalImagesToBeUsed"],
            "safesearch": "true"
        }
        response = requests.get(pixabayApiUrl, params=params)
        images = response.json().get("hits", [])

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

# Save result to ./images.json
with open(f"output/{str(data["number"])}/images.json", "w") as f:
    json.dump(output_data, f, indent=2)

print("✅ Saved extracted image info to images.json")
# print(config)

response = blog_writer.send_message(f"""
You are a professional blogger and writes very good blogs.
You will be given a topic/data and you have to write a blog about that topic.

Blog: '''{json.dumps(data)}'''

You can use some following provided images urls.
Images: '''{json.dumps(output_data)}'''

You can use max 5000 words for your blog.
And in the provided blog idea, for text, charts, images, table or code then you can provide that content as a json object with content type as "text"/"image"/"chart"/"code" ==> and with this you can provide source as (url for image, markdown for phara/text, code in span tag with classes as tailwindcss for code, data for charts like "x": [valuesX], "y": [valuesY], and "lableX": [values], "lableY": [values], "titleChart": "title" for charts, headers: list[str], rows: [list(str)] for table). And provide a preview image url as used for thubnail and also provide previewDescription of blog under 500 characters.

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
    "previewDescription": "Preview Description"
}}

Example blog:
""" + '''```json
{
  "title": "The Future of Artificial General Intelligence (AGI)",
  "content": [
    {
      "contentType": "text",
      "content": "Artificial General Intelligence (AGI) refers to a form of AI capable of understanding, learning, and applying knowledge across a wide range of tasks — akin to human cognitive abilities. Unlike Narrow AI, AGI does not rely on task-specific algorithms but is envisioned to possess autonomous reasoning, adaptability, and decision-making across various domains. The future of AGI presents both exciting possibilities and significant risks, and is one of the most debated subjects in the AI community today."
    },
    {
      "contentType": "image",
      "content": "https://cdn.pixabay.com/photo/2020/06/07/06/28/ai-5268062_960_720.jpg"
    },
    {
      "contentType": "text",
      "content": "### Path to AGI: Current Approaches\n\nMultiple research paradigms are being pursued toward AGI:\n\n- **Neuroscience-inspired models** that mimic brain functions (e.g., DeepMind's work on neural architectures).\n- **Multi-agent systems** where AI learns through interaction.\n- **Unified learning models** combining symbolic reasoning with deep learning.\n\nEach approach aims to create a scalable, generalizable intelligence capable of transferring learning across tasks."
    },
    {
      "contentType": "chart",
      "content": \"\"\"{
        "x": ["2023", "2025", "2030", "2040", "2050"],
        "y": [0.1, 0.3, 0.5, 0.8, 0.95],
        "lableX": "Year",
        "lableY": "AGI Development Probability",
        "titleChart": "Projected Probability of AGI Development Over Time"
      }\"\"\"
    },
    {
      "contentType": "image",
      "content": "https://cdn.pixabay.com/photo/2018/05/08/08/49/artificial-intelligence-3382507_960_720.jpg"
    },
    {
      "contentType": "text",
      "content": "### Impacts of AGI on Society\n\nAGI will likely transform sectors such as healthcare, education, finance, and defense. It could:\n\n- Automate complex decision-making.\n- Drive scientific discovery.\n- Assist in crisis management (e.g., climate, pandemics).\n\nHowever, potential risks include mass unemployment, privacy breaches, and misuse by malicious entities. Mitigating these risks is critical."
    },
    {
      "contentType": "chart",
      "content": \"\"\"{
        "x": ["Healthcare", "Education", "Finance", "Defense", "Entertainment"],
        "y": [90, 85, 80, 70, 60],
        "lableX": "Sector",
        "lableY": "Expected Impact Level (%)",
        "titleChart": "Predicted Sector-wise Impact of AGI"
      }\"\"\"
    },
    {
      "contentType": "text",
      "content": "### Ethical and Safety Challenges\n\nAGI introduces several complex ethical issues:\n\n- **Value alignment**: Ensuring AGI’s goals align with human values.\n- **Control problem**: Designing systems we can control even when they surpass human intelligence.\n- **Consciousness and Rights**: If AGI becomes sentient, what rights should it have?"
    },
    {
      "contentType": "image",
      "content": "https://cdn.pixabay.com/photo/2023/01/08/13/35/superintelligence-7705436_960_720.jpg"
    },
    {
      "contentType": "chart",
      "content": \"\"\"{
        "x": ["Value Alignment", "Control", "Security", "Sentience", "Misuse"],
        "y": [88, 85, 75, 60, 70],
        "lableX": "Challenge",
        "lableY": "Complexity Score (%)",
        "titleChart": "Top Ethical and Safety Challenges in AGI"
      }\"\"\"
    },
    {
      "contentType": "text",
      "content": "### Code Example: Simulating Learning with Neural Networks (Python)"
    },
    {
      "contentType": "code",
      "content": "import tensorflow as tf\nfrom tensorflow import keras\n\nmodel = keras.Sequential([\n    keras.layers.Dense(128, activation='relu'),\n    keras.layers.Dense(64, activation='relu'),\n    keras.layers.Dense(10, activation='softmax')\n])\n\nmodel.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\n# Dummy training example\n# model.fit(x_train, y_train, epochs=5)"
    },
    {
      "contentType": "text",
      "content": "### Example: Interactive Visualization in JavaScript"
    },
    {
      "contentType": "code",
      "content": "const data = [10, 20, 30, 40];\nconst canvas = document.getElementById('chart');\nconst ctx = canvas.getContext('2d');\nctx.fillStyle = 'blue';\ndata.forEach((val, index) => {\n  ctx.fillRect(index * 50, canvas.height - val, 40, val);\n});"
    },
    {
      "contentType": "text",
      "content": "### Comparison Table: Narrow AI vs AGI"
    },
    {
      "contentType": "table",
      "content": \"\"\"{
        "headers": ["Aspect", "Narrow AI", "AGI"],
        "rows": [
          ["Scope", "Task-specific", "General-purpose"],
          ["Learning", "Limited", "Autonomous & continual"],
          ["Adaptability", "Low", "High"],
          ["Reasoning", "Pre-defined", "Flexible"],
          ["Example", "Spam filter", "Human-like assistant"]
        ]
      }\"\"\"
    }
  ],
  "previewImageURL": "https://cdn.pixabay.com/photo/2020/06/07/06/28/ai-5268062_960_720.jpg",
  "previewDescription": "Explore the future of Artificial General Intelligence (AGI), including key research paths, sector-wise impacts, ethical challenges, and simulation code examples in Python and JavaScript."
}
```
''', config={
        "response_mime_type": "application/json",
        "response_schema": Blogs,
})

blog = json.loads(response.text)

with open(f"output/{str(data['number'])}/blog.json", "w") as f:
    json.dump(blog, f, indent=2)