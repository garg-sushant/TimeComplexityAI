# 📖 TimeComplexityAI: The Premium AI Code Complexity Architect

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=for-the-badge&logo=vercel)](https://timecomplexityai.vercel.app/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Groq GPT OSS 120B](https://img.shields.io/badge/Groq_Fallback-GPT_OSS_120B-orange?style=for-the-badge)](https://groq.com/)
[![Gemini 3.5](https://img.shields.io/badge/Primary_AI-Gemini_3.5_Flash-blue?style=for-the-badge)](https://ai.google.dev/)

**TimeComplexityAI** is an elite developer platform that transforms the abstract world of Big O notation into high-fidelity, interactive narratives. Engineered with a **Multi-Provider AI Fallback Architecture**, it ensures 100% service uptime by cycling through an elastic pool of Gemini and Groq (GPT OSS 120B) engines to provide mathematically precise algorithm analysis.

---

## 🏗️ Core Architecture

```mermaid
graph TD
    User([User Code]) --> Orchestrator{AI Orchestrator}
    Orchestrator -->|Hit| Cache[(Persistent Cache)]
    Orchestrator -->|Miss| Local[Offline Heuristic Engine]
    Local -->|Simple| Result([O-Notation Result])
    Local -->|Complex| GeminiPool[Gemini Key Rotation Pool]
    GeminiPool -->|Quota Reached| GroqPool[Groq GPT OSS 120B Fallback]
    GroqPool --> Result
```

---

## ✨ Cutting-Edge Features

- **🚀 Hybrid AI Orchestrator**: Uses a primary Gemini key rotation pool with ultra-fast Groq (GPT OSS 120B) fallbacks to guarantee uninterrupted analysis.
- **🏠 Adaptive Local Engine**: Built-in heuristic analyzer identifies O(1), O(N), and O(N log N) patterns instantly without hitting your API quota.
- **📦 Intelligent Persistent Caching**: Deterministic code hashing and `localStorage` integration ensure re-analyzing the same code is instantaneous (0.1ms).
- **🎨 Emerald Neobrutalist UI**: A premium, high-contrast aesthetic built with Framer Motion for a fluid, tactile development experience.
- **⚡ SEO-Optimized SSR**: Robust Server-Side Rendering and Prerendering pipeline for near-instant first-contentful paint.
- **🧬 Deep-Trace Step-by-Step**: Mathematically rigorous breakdowns of time and space complexity with line-level granularity.

---

## 🚀 Pro Setup

### Prerequisites
- Node.js (v18+)
- npm / pnpm

### Installation

1. **Clone & Initialize:**
   ```bash
    git clone https://github.com/garg-sushant/timecomplexityai.git
    cd timecomplexityai
    npm install
   ```

2. **Environment Configuration:**
   Create a `.env` in the root (see `.env.example`) and configure your elite provider pools:
   ```env
   # AI Provider Pools (Comma-separated for auto-rotation)
   VITE_GEMINI_API_KEY="key1,key2,key3"
   VITE_GROQ_API_KEY="groq_key1,groq_key2"
   ```

3. **Development Boot:**
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Engineering Team

**Sushant Garg**  
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/garg-sushant)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sushant-garg-4b0a37284/)

**Akshat Aggarwal**  
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/akshat-chd)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akshat-aggarwal-10bbba301/)

---

## 📄 License
Licensed under the [MIT License](LICENSE).
