# 📖 AlgoStory: AI-Powered Code Complexity Visualizer

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black.svg?style=for-the-badge&logo=vercel)](https://algostory-pi.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

**AlgoStory** is a premium developer tool designed to transform the dry world of Big O notation into engaging narratives. Using the power of Google's Gemini AI, we analyze your code to determine its time and space complexity, providing 100% mathematical accuracy alongside a line-by-line breakdown of how your algorithms scale.

---

## ✨ Features

- **🚀 AI Complexity Lab**: Analyze raw code snippets for instantaneous Big O results.
- **🧬 Line-by-Line Breakdown**: Get a "Story" of your code where every loop, recursion, and condition is explained mathematically.
- **🎓 Knowledge Vault**: Explore interactive tutorials on everything from Logarithmic growth to Dynamic Programming.
- **📊 Virtualized Performance**: Visualize how different complexity classes $(O(N), O(N^2), etc.)$ perform as data grows.
- **🎨 Emerald Neobrutalist UI**: A high-contrast, premium aesthetic designed for clarity and a tactile feel.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Neobrutalist Utility System)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **AI Engine**: [Google Gemini 2.0 Flash](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO & Metadata**: [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/garg-sushant/algostory.git
   cd algostory
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   VITE_GEMINI_API_KEY="your_gemini_api_key"
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (Calculator, Layout, etc.)
├── contexts/     # Auth & State management
├── data/         # Static tutorial content
├── lib/          # Service initializations (Firebase, Gemini)
├── pages/        # Main application views
├── types/        # TypeScript interfaces
└── utils/        # Helper functions
```

---

## 🔗 Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your code to GitHub.
2. Connect your repo to Vercel.
3. Add the **Environment Variables** in the Vercel dashboard.
4. **Deploy!**

---

## 👨‍💻 Author

**Sushant Garg**
- GitHub: [@garg-sushant](https://github.com/garg-sushant)
- LinkedIn: [Sushant Garg](https://www.linkedin.com/in/sushant-garg-4b0a37284/)
- Discord: `sushantgarg.`
**Akshat Aggarwal**
- GitHub: akshat-chd
- LinkedIn: [Akshat Aggarwal](https://www.linkedin.com/in/akshat-aggarwal-10bbba301/)
---

## 📄 License

This project is licensed under the MIT License.
