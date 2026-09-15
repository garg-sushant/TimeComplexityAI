# 📖 TimeComplexityAI: The Premium AI Code Complexity Architect

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=for-the-badge&logo=vercel)](https://timecomplexityai.vercel.app/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase Auth & Firestore](https://img.shields.io/badge/Firebase-Auth_%26_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Primary_AI-Gemini_3.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Groq Fast Inference](https://img.shields.io/badge/Groq_Fallback-GPT_OSS_120B-F05032?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)

**TimeComplexityAI** is a developer platform that transforms the abstract world of Big O notation into high-fidelity, interactive visual narratives. Engineered with an **Adaptive Multi-Provider AI Fallback Engine**, it ensures 99.9% uptime by automatically rotating through an elastic pool of Gemini and Groq (GPT OSS 120B) models with deterministic local heuristic acceleration.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    %% ─── CLIENT LAYER ───
    User(["<b>User Code Submission</b><br/>React 19 & Framer Motion UI"]):::client
    Normalize["<b>Code Normalizer & Sanitizer</b><br/>Strip docstrings, comments & collapse spaces"]:::client
    HashCheck{"<b>SHA-256 Code Hash Check</b><br/>Deterministic Cache Lookup"}:::decision

    %% ─── CACHE LAYER ───
    LocalCache[("<b>Persistent LocalStorage</b><br/>Zero-latency cached analysis (<0.1ms)")]:::storage

    %% ─── ORCHESTRATION LAYER ───
    Orchestrator["<b>AI Orchestration & Key Manager</b><br/>Cooldown tracker & auto-rotating provider dispatcher"]:::client

    %% ─── STAGE 1: GEMINI POOL ───
    GeminiPool["<b>Stage 1: Google Gemini Pool</b><br/>gemini-3.5-flash / gemini-3.7-flash<br/>Elastic API key pool with 60s cooldown"]:::primary
    GeminiVerify["<b>Gemini 2-Pass Self-Verification</b><br/>Cross-examines reasoning & corrects hallucinations"]:::primary
    GeminiCheck{"<b>Gemini Response Check</b><br/>HTTP 200 vs 429 Quota Exceeded"}:::decision

    %% ─── STAGE 2: GROQ POOL ───
    GroqPool["<b>Stage 2: Groq High-Speed Pool</b><br/>openai/gpt-oss-120b & llama-3.3-70b<br/>Ultra-fast multi-model fallback"]:::fallback
    GroqVerify["<b>Groq 2-Pass Schema Verification</b><br/>Validates strict JSON mathematical schema"]:::fallback
    GroqCheck{"<b>Groq Status Check</b><br/>Valid Response vs Pool Exhausted"}:::decision

    %% ─── STAGE 3: OFFLINE HEURISTIC ───
    OfflineEngine["<b>Stage 3: Offline Heuristic Engine</b><br/>AST Loop & Recursion Pattern Analyzer<br/>O(1), O(N), O(N log N), O(N^2), O(2^N)"]:::heuristic

    %% ─── PERSISTENCE & AUTH ───
    FirebaseAuth["<b>Firebase Authentication</b><br/>Google OAuth 2.0 with popup/redirect fallback"]:::auth
    FirestoreDB[("<b>Cloud Firestore Database</b><br/>users/{uid}/analyses history sync")]:::storage

    %% ─── OUTPUT LAYER ───
    OutputNode["<b>Interactive Analysis Workspace</b><br/>KaTeX Math, Recharts Complexity Curve & Line Tracing"]:::output

    %% ─── FLOW CONNECTIONS ───
    User --> Normalize
    Normalize --> HashCheck

    HashCheck -->|"Cache Hit (0ms)"| OutputNode
    HashCheck -->|"Cache Miss"| Orchestrator

    Orchestrator -->|"Primary Dispatch"| GeminiPool
    GeminiPool --> GeminiVerify
    GeminiVerify --> GeminiCheck

    GeminiCheck -->|"Success (HTTP 200)"| OutputNode
    GeminiCheck -->|"429 Rate Limit / Quota Exceeded"| GroqPool

    GroqPool --> GroqVerify
    GroqVerify --> GroqCheck

    GroqCheck -->|"Success (HTTP 200)"| OutputNode
    GroqCheck -->|"All AI Keys Exhausted"| OfflineEngine

    OfflineEngine -->|"Deterministic AST Breakdown"| OutputNode

    OutputNode -.->|"Persist Result"| LocalCache
    FirebaseAuth <==>|"User Session"| OutputNode
    OutputNode -.->|"Cloud Sync"| FirestoreDB

    %% ─── STYLING / THEMES ───
    classDef client fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef decision fill:#1c1917,stroke:#f59e0b,stroke-width:2px,color:#fef3c7;
    classDef primary fill:#0b213f,stroke:#3b82f6,stroke-width:2px,color:#eff6ff;
    classDef fallback fill:#240c3c,stroke:#a855f7,stroke-width:2px,color:#faf5ff;
    classDef heuristic fill:#042f2e,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
    classDef storage fill:#082f49,stroke:#06b6d4,stroke-width:2px,color:#f0fdfa;
    classDef auth fill:#3b0718,stroke:#f43f5e,stroke-width:2px,color:#fff1f2;
    classDef output fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#f0fdf4;
```

---

## ✨ Features

- **🚀 Hybrid Multi-AI Fallback Orchestration**: Zero downtime AI analysis cycling through an auto-rotating pool of Gemini API keys with instant fallback to Groq GPT OSS 120B.
- **⚡ Deterministic Instant Caching**: Automatic code hashing with `localStorage` persistence gives 0ms latency for previously analyzed code snippets.
- **🏠 Client-Side Heuristic Analyzer**: Lightweight static analysis engine that identifies common algorithmic patterns without consuming API quota.
- **📊 Interactive Big-O Visualizer**: Real-time interactive complexity curve plotting using Recharts and KaTeX mathematical notation.
- **🔐 Google Cloud Authentication & Firestore Sync**: Seamless Google Sign-In with automatic cross-device syncing of analysis history.
- **🎨 Glassmorphic Neobrutalist UI**: Modern dark-mode aesthetic with Framer Motion micro-interactions and syntax-highlighted code editor.
- **🌐 SEO-Ready SSR & Static Prerender Pipeline**: Full SSG/prerender scripts and dynamic sitemap generation for top-tier search engine visibility.

---

## 📁 Repository Structure

```text
algostory/
├── public/                 # Static assets, sitemap.xml, robots.txt
├── scripts/                # SSR Prerender, Sitemap Generator, Diagnostics
│   ├── generate-sitemap.ts
│   ├── prepare-prerender.ts
│   └── prerender.js
├── src/
│   ├── components/         # Reusable UI components (Layout, Header, Navigation)
│   ├── contexts/           # React Contexts (AuthContext)
│   ├── data/               # Blog posts, tutorials, and algorithm metadata
│   ├── lib/                # Firebase, Firestore, and AI client configuration
│   ├── pages/              # Route views (Home, Time/Space Calculator, MathLab, Blog)
│   ├── utils/              # SSR-safe environment helpers, math helpers
│   ├── App.tsx             # Main Application Component
│   ├── AppRoutes.tsx       # Route definitions
│   ├── entry-client.tsx    # Client-side hydration entry
│   └── entry-server.tsx    # Server-side prerender entry
├── firestore.rules         # Security rules for Cloud Firestore
├── tailwind.config.js      # Styling configuration
├── vite.config.ts          # Vite build, SSR, and chunk optimization config
└── package.json            # Scripts & dependencies
```

---

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### 1. Clone & Install

```bash
git clone https://github.com/garg-sushant/timecomplexityai.git
cd timecomplexityai
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory by copying the sample:

```bash
cp .env.example .env
```

Fill in your configuration:

```env
# ⚛️ Firebase Configuration
VITE_FIREBASE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"

# 🚀 AI Provider Pools (Comma-separated for automated key rotation)
VITE_GEMINI_API_KEY="gemini_key_1,gemini_key_2,gemini_key_3"
VITE_GROQ_API_KEY="groq_key_1,groq_key_2"

# 🌐 App Settings
VITE_SITE_URL="https://timecomplexityai.vercel.app"
APP_URL="https://timecomplexityai.vercel.app"
VITE_ENABLE_CACHE="true"
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 🔐 Firebase & Firestore Configuration

1. **Authentication**:
   - Go to [Firebase Console](https://console.firebase.google.com/) → **Authentication** → **Sign-in method**.
   - Enable **Google** provider and configure your support email.
   - Go to **Settings** → **Authorized domains** and ensure `localhost`, `127.0.0.1`, and your production domain are added.
2. **Cloud Firestore**:
   - Navigate to **Firestore Database** → Click **Create Database** (Database ID: `(default)`).
   - Deploy the provided [`firestore.rules`](file:///d:/complexity/algostory/firestore.rules) to ensure users can only access their own analysis history.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on port 3000 with HMR. |
| `npm run build` | Builds client assets and runs SSR prerender pipeline. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs TypeScript static type checking (`tsc --noEmit`). |
| `npm run prebuild` | Generates routes and dynamic `sitemap.xml`. |

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
