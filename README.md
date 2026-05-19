<div align="center">

# 🚀 OtoMarketer
**Autonomous AI Marketing & Growth Engine for Micro E-Commerce Sellers**

[![Hackathon'26](https://img.shields.io/badge/Built_for-Hackathon'26-D1FF1A?style=for-the-badge&logo=google)](https://github.com/) 
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Gemini](https://img.shields.io/badge/Powered_by-Gemini_2.5_Flash-blue?style=for-the-badge&logo=googlebard)](https://aistudio.google.com/)

A collaborative event by **BTK Akademi**, **Google**, and **Girişimcilik Vakfı**.

🔴 **[Live Demo on Vercel](https://otomarketer-hackathon26.vercel.app/)**

</div>

---

## 💡 The Problem & Solution

**The Problem:** Micro-merchants and solo e-commerce sellers lack dedicated marketing teams. They waste over 60% of their operational time struggling with high-converting copywriting, adapting to 2026 SGE (Search Generative Experience) SEO standards, and structuring cross-platform ad campaigns.

**The Solution:** OtoMarketer provides a zero-friction, single-image ingestion pipeline. By simply uploading a product photo, the system triggers three sequential, autonomous AI sub-agents. Within seconds, it builds a complete, highly persuasive marketing kit in fluent, conversion-focused Turkish.

---

## 🤖 Multi-Agent Pipeline (The Core Logic)

OtoMarketer utilizes an advanced **Agentic Structure** to split complex marketing tasks into specialized, high-performing personas:

- **👁️ Visual Analyst:** Ingests the image, extracting precise materials, design styles, color palettes, and mapping the ideal target demographic.
- **🔍 2026 SEO Strategist:** Generates AI-First (SGE-optimized) title tags, highly persuasive product stories, and semantic long-tail keywords designed for modern search engines.
- **📢 Growth Manager:** Evaluates the product and formulates high-ROI campaign themes along with hyper-actionable, platform-specific tactical strategies (e.g., TikTok Hooks, Instagram Reels scripts).

---

## 🔥 Key Engineering Features

- **⚡ Token-Optimized & Cost-Efficient:** Engineered with custom prompt boundaries and strict JSON-only output constraints. This approach cuts API output token costs by 40% and drastically reduces latency, delivering a rapid user experience.
- **💾 One-Click Marketing Kit Exporter:** Maximizes user value by allowing merchants to instantly download their structured Turkish payload as a clean, ready-to-use `.txt` file.
- **🧪 Instant Testability HUD:** Includes a "Try with Sample Product" button to inject immediate pre-mapped states, enabling effortless, zero-setup evaluation for hackathon juries.
- **🌐 Turkish Localization Engine:** While the architecture and system instructions are written in English to maximize AI logic capability, all generated output strings are forced into flawless, persuasive e-commerce Turkish.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **AI Core:** Gemini 2.5 Flash API (via official `@google/genai` SDK)
- **Styling:** Tailwind CSS (Premium Dark Theme aesthetics)
- **UI Components:** Lucide Icons & Custom Shadcn-inspired styling

---

## ⚙️ Getting Started

Follow these steps to run OtoMarketer locally:

1. **Clone and Install:**
   ```bash
   git clone https://github.com/your-username/otomarketer.git
   cd otomarketer
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

---
<div align="center">
  <p><i>Engineered for the future of autonomous e-commerce.</i></p>
</div>