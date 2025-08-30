import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The following function is an example and should be adapted to your needs.
// It is not automatically executed.

/*
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();
*/


export async function generateBlogContent(rawText) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a blog post from the following raw text. Provide a title, and the main content. The content should be well-structured with paragraphs. Raw text: ${rawText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Attempt to parse title and content from the generated text
    // This is a basic example, you might need more sophisticated parsing
    const lines = text.split('\n');
    let title = 'Generated Blog Post';
    let content = text;

    if (lines.length > 0 && lines[0].trim().length > 0) {
      title = lines[0].replace(/^(Title:|제목:)\s*/i, '').trim();
      content = lines.slice(1).join('\n').trim();
    }

    return { title, content };
  } catch (error) {
    console.error('Error generating content from Gemini:', error);
    throw new Error('Failed to generate blog content.');
  }
}

export default ai;