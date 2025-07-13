# PostAcle: AI-Powered Blogging Platform

[![Website](https://img.shields.io/badge/Live%20Site-post--acle.blog-purple?style=flat-square&logo=vercel)](https://post-acle.blog)
[![GitHub](https://img.shields.io/badge/Source%20Code-GitHub-blue?style=flat-square&logo=github)](https://github.com/YouthVibe/PostAcle)

## 🌐 Overview
**PostAcle** is a smart AI-powered blogging platform designed to simplify and accelerate the blog creation process using the latest AI technologies. It empowers developers, writers, and creators to:

- ✍️ Write and publish blogs using AI
- 🔎 Search blogs by keywords, topics, or tags
- 🧠 Generate content automatically using the Gemini 2.5 Flash model
- 📈 Focus on trending and SEO-optimized topics via Google Trends, Reddit, and custom APIs

Website: [https://post-acle.blog](https://post-acle.blog)

## 🚀 Built With
- **Next.js 15 (App Router)** – Modern frontend framework for building fast web apps
- **Tailwind CSS** – For sleek, responsive UI
- **TypeScript** – Type-safe development
- **Static Site Generation** – For SEO & speed
- **GitHub Pages / Vercel** – Deployment

## 🤖 AI Automation
All blogs are generated using a fully automated AI agent that:
- Collects trending topics using APIs (Google Trends, Reddit, etc.)
- Generates structured JSON files
- Creates SEO-friendly HTML blog pages
- Auto-generates metadata, cover images, robots.txt, and sitemap.xml
- Pushes content to GitHub automatically

> Content generation and management is handled by an AI bot built and maintained by [@UltronTheAI](https://github.com/UltronTheAI) (Swaraj Puppalwar)

## 🧱 Project Structure
```
./
├── public/
│   └── blogs/                # JSON blog entries
│   └── images/               # Default blog images and favicons
├── post-acle/
│   ├── app/                  # Next.js App Router structure
│   ├── components/           # Reusable React components
│   ├── styles/               # Tailwind + global CSS
│   └── README.md             # Project-specific README
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── sitemap.xml              # Auto-generated
├── robots.txt               # SEO
└── README.md                # Root project documentation
```

## 👨‍💻 Developers
- [YouthVibe](https://github.com/YouthVibe) – Platform Initiator and Maintainer
- [UltronTheAI](https://github.com/UltronTheAI) – AI Creator, Automator, and Strategist (Swaraj Puppalwar)

## 📚 Features
- Fully static SEO-optimized blogs
- Favicon and OpenGraph support
- Dark-mode UI with minimalistic theme
- Blog metadata support (tags, word count, read time)
- No backend required – serverless architecture

## 📦 Hosting
The site can be deployed on:
- [x] GitHub Pages (via `output: export`)
- [x] Vercel (static hosting)

## 📈 SEO-Ready
- Robots.txt
- Sitemap.xml
- Structured meta tags
- Responsive and accessible layout

## 📜 License
This project is open-source under the MIT License.

---

Made with 💻 + 🤖 by [YouthVibe](https://github.com/YouthVibe) & [Swaraj Puppalwar](https://github.com/UltronTheAI)
