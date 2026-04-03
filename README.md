# 📖 AlgoStory: The Premium AI Code Complexity Architect

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=for-the-badge&logo=vercel)](https://algostory-pi.vercel.app/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Groq Llama 3.3](https://img.shields.io/badge/Groq_Fallback-Llama_3.3_70B-orange?style=for-the-badge)](https://groq.com/)
[![Gemini 2.0](https://img.shields.io/badge/Primary_AI-Gemini_2.0_Flash-blue?style=for-the-badge)](https://ai.google.dev/)

**AlgoStory** is an elite developer platform that transforms the abstract world of Big O notation into high-fidelity, interactive narratives. Engineered with a **Multi-Provider AI Fallback Architecture**, it ensures 100% service uptime by cycling through an elastic pool of Gemini and Groq (Llama 3.3 70B) engines to provide mathematically precise algorithm analysis.

---

## ✨ Cutting-Edge Features

- **🚀 Hybrid AI Orchestrator**: Uses a primary Gemini key rotation pool with ultra-fast Groq/Llama fallbacks to guarantee uninterrupted analysis.
- **🏠 Adaptive Local Engine**: Built-in heuristic analyzer identifies O(1), O(N), and O(N log N) patterns instantly without hitting your API quota.
- **📦 Intelligent Persistent Caching**: Deterministic code hashing and `localStorage` integration ensure re-analyzing the same code is instantaneous (0.1ms).
- **🎨 Emerald Neobrutalist UI**: A premium, high-contrast aesthetic built with Framer Motion for a fluid, tactile development experience.
- **⚡ SEO-Optimized SSR**: Robust Server-Side Rendering and Prerendering pipeline for near-instant first-contentful paint.
- **🧬 Deep-Trace Step-by-Step**: Mathematically rigorous breakdowns of time and space complexity with line-level granularity.

---

## 🛠️ Performance Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **AI Infrastructure**: 
  - [Google Gemini 2.0 Flash](https://ai.google.dev/) (Primary Engine)
  - [Groq / Llama 3.3 70B](https://groq.com/) (High-Speed Fallback)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State & Identity**: [Firebase](https://firebase.google.com/) (Auth & Security)
- **Styling**: Vanilla CSS (Custom Emerald Neobrutalist Tokens)
- **Deployment**: SSR-optimized [Vercel](https://vercel.com/) Build Pipeline

---

## 🚀 Pro Setup

### Prerequisites
- Node.js (v18+)
- npm / pnpm

### Installation

1. **Clone & Initialize:**
   ```bash
   git clone https://github.com/garg-sushant/algostory.git
   cd algostory
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` in the root and configure your elite provider pools:
   ```env
   # Firebase Identity
   VITE_FIREBASE_API_KEY="..."
   VITE_FIREBASE_AUTH_DOMAIN="..."
   VITE_FIREBASE_PROJECT_ID="..."
   VITE_FIREBASE_STORAGE_BUCKET="..."
   VITE_FIREBASE_MESSAGING_SENDER_ID="..."
   VITE_FIREBASE_APP_ID="..."

   # AI Provider Pools (Comma-separated for auto-rotation)
   VITE_GEMINI_API_KEY="key1,key2,key3"
   VITE_GROQ_API_KEY="groq_key1,groq_key2"
   ```

3. **Development Boot:**
   ```bash
   npm run dev
   ```

### Verification Suite
Verify your provider health anytime:
```bash
npx tsx scripts/check-keys.ts
```

---

## 📂 Architecture

```text
src/
├── components/   # Neobrutalist UI & Interaction Layers
├── lib/          # AI Orchestrator, Multi-Provider Logic & Persistence
├── pages/        # Complexity Lab, Knowledge Vault & Visualizers
├── utils/        # SSR-Safe Env Management & Hashing
└── assets/       # High-Fidelity Design Tokens
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
