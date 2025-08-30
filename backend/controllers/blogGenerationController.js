import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import axios from "axios";
import cloudinary from "./cloudinary.js";
import Blog from "../models/blog.js";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ "GEMINI_API_KEY": process.env.GEMINI_API_KEY });

const generateBlogJson = async (rawText) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Given the following raw blog text, generate a JSON object that adheres to the BlogPost schema. Also, provide search keywords for relevant images from Pixabay. The blog content should be an array of objects, where each object has a 'contentType' (e.g., 'text', 'image', 'chart') and 'content'. For 'text' content, use markdown. For 'image' content, the 'content' should be a URL. Ensure all required fields are present and valid. The blogID should be a unique string. The wordsUsed should be an accurate count of words in the generated content.

BlogPost Schema:
{
  "title": "Blog Title",
  "previewDescription": "Short summary of the blog",
  "previewImageURL": "https://www.post-acle.blog/images/your-image.jpg",
  "content": [
    { "contentType": "text", "content": "# Welcome\\nThis is your blog content." },
    { "contentType": "image", "content": "https://www.post-acle.blog/images/example.jpg" },
    { "contentType": "chart", "content": {
      "x": ["Jan", "Feb"], "y": [30, 50], "titleChart": "Visitors", "lableX": "Month", "lableY": "Count"
    }}
  ],
  "tags": ["example", "tutorial"],
  "author": "Swaraj Puppalwar",
  "publishedDate": "2025-07-20",
  "wordsUsed": 600,
  "targetRegion": "Global",
  "blogID": "your-blog-id"
}

Your output should be a single JSON object with two top-level keys: 'blogPost' (containing the BlogPost JSON) and 'imageKeywords' (an array of strings for Pixabay image search).

Raw Blog Text:
${rawText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            blogPost: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                previewDescription: { type: Type.STRING },
                previewImageURL: { type: Type.STRING },
                content: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      contentType: { type: Type.STRING },
                      content: { type: Type.STRING },
                    },
                    required: ["contentType", "content"],
                  },
                },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                author: { type: Type.STRING },
                publishedDate: { type: Type.STRING },
                wordsUsed: { type: Type.NUMBER },
                targetRegion: { type: Type.STRING },
                blogID: { type: Type.STRING },
              },
              required: [
                "title",
                "previewDescription",
                "previewImageURL",
                "content",
                "tags",
                "author",
                "publishedDate",
                "wordsUsed",
                "targetRegion",
                "blogID",
              ],
            },
            imageKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["blogPost", "imageKeywords"],
        },
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating blog JSON with Gemini:", error);
    throw new Error("Failed to generate blog content.");
  }
};

const searchPixabayImages = async (keywords) => {
  try {
    const allImages = [];
    
    // Search images for each keyword individually
    for (const keyword of keywords) {
      const response = await axios.get("https://pixabay.com/api/", {
        params: {
          key: process.env.PIXABAY_API_KEY,
          q: keyword,
          image_type: "photo",
          per_page: 3,
        },
      });
      
      if (response.data.hits && response.data.hits.length > 0) {
        allImages.push(...response.data.hits);
      }
    }

    return allImages;
  } catch (error) {
    console.error("Error searching Pixabay:", error);
    return []; // Return empty array instead of throwing error
  }
};

const uploadImageToCloudinary = async (imageUrl) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "blog_images",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image.");
  }
};

export { generateBlogJson, searchPixabayImages, uploadImageToCloudinary };