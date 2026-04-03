import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { lazy, useContext, createContext, Suspense, useState, useEffect } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Link, NavLink, Outlet, useLocation, useParams, Routes, Route, Navigate, MemoryRouter } from "react-router-dom";
import { H as Helmet, a as HelmetProvider } from "./assets/vendor-BbfjqPYt.js";
import { PassThrough } from "stream";
import { User, LogOut, LogIn, Github, Linkedin, Twitter, ArrowRight, Mail, Activity, Check, Copy, Zap, BookOpen, Save, Cpu, Lightbulb, Search, Layers, Network, Brain, ListOrdered, ArrowRightLeft, Maximize, Repeat, Hash, Link2, Box, Trees, BarChart3, Home as Home$2, ChevronRight, Ghost, Calculator, AlertTriangle } from "lucide-react";
import Editor from "react-simple-code-editor";
import { P as Prism } from "./assets/prism-OM6GymsZ.js";
import { r as reactKatexExports } from "./assets/math-DRdIFewa.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "prop-types";
import "katex";
lazy(() => Promise.resolve().then(() => Home$1));
lazy(() => Promise.resolve().then(() => Tutorials$1));
lazy(() => Promise.resolve().then(() => TutorialPost$1));
lazy(() => Promise.resolve().then(() => InsideMath$1));
lazy(() => Promise.resolve().then(() => BlogIndex$1));
lazy(() => Promise.resolve().then(() => BlogPost$1));
lazy(() => Promise.resolve().then(() => Layout$1));
lazy(() => Promise.resolve().then(() => NotFound$1));
function LoadingFallback() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-8 border-primary border-t-transparent rounded-full animate-spin" }) });
}
const AuthContext = createContext({ user: null, loading: false });
const useAuth = () => useContext(AuthContext);
function Layout() {
  const { user } = useAuth();
  const handleSignIn = async () => {
    const { signInWithGoogle } = await import("./assets/firebase-DDh2ZTZn.js");
    await signInWithGoogle();
  };
  const handleSignOut = async () => {
    const { logOut } = await import("./assets/firebase-DDh2ZTZn.js");
    await logOut();
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-white flex flex-col", children: [
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 w-full z-50 bg-white border-b-4 border-on-background shadow-[0_4px_0_rgba(15,23,42,0.05)]", children: /* @__PURE__ */ jsxs("nav", { className: "flex justify-between items-center max-w-7xl mx-auto px-6 h-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-xl sm:text-2xl font-black text-primary italic font-headline flex items-center gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-white border-2 sm:border-4 border-on-background shadow-[2px_2px_0_#0f172a] sm:shadow-[4px_4px_0_#0f172a]", children: "A" }),
          /* @__PURE__ */ jsx("span", { className: "truncate max-w-[100px] sm:max-w-none", children: "AlgoStory" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
          /* @__PURE__ */ jsx(
            NavLink,
            {
              to: "/",
              end: true,
              className: ({ isActive }) => `font-headline font-bold text-sm tracking-tight hover:scale-105 transition-all duration-200 active:scale-95 pb-1 ${isActive ? "text-primary border-b-4 border-primary" : "text-on-surface-variant hover:text-primary border-b-4 border-transparent"}`,
              children: "Analyzer"
            }
          ),
          /* @__PURE__ */ jsx(
            NavLink,
            {
              to: "/tutorials",
              className: ({ isActive }) => `font-headline font-bold text-sm tracking-tight hover:scale-105 transition-all duration-200 active:scale-95 pb-1 ${isActive ? "text-primary border-b-4 border-primary" : "text-on-surface-variant hover:text-primary border-b-4 border-transparent"}`,
              children: "Tutorials"
            }
          ),
          /* @__PURE__ */ jsx(
            NavLink,
            {
              to: "/inside-math",
              className: ({ isActive }) => `font-headline font-bold text-sm tracking-tight hover:scale-105 transition-all duration-200 active:scale-95 pb-1 ${isActive ? "text-primary border-b-4 border-primary" : "text-on-surface-variant hover:text-primary border-b-4 border-transparent"}`,
              children: "Inside the Math"
            }
          ),
          /* @__PURE__ */ jsx(
            NavLink,
            {
              to: "/blog",
              className: ({ isActive }) => `font-headline font-bold text-sm tracking-tight hover:scale-105 transition-all duration-200 active:scale-95 pb-1 ${isActive ? "text-primary border-b-4 border-primary" : "text-on-surface-variant hover:text-primary border-b-4 border-transparent"}`,
              children: "Blog"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-on-surface-variant font-headline font-bold text-xs sm:text-sm", children: [
          user.photoURL ? /* @__PURE__ */ jsx("img", { src: user.photoURL, alt: "Profile", className: "w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-primary", referrerPolicy: "no-referrer" }) : /* @__PURE__ */ jsx(User, { className: "w-5 h-5 sm:w-6 sm:h-6" }),
          /* @__PURE__ */ jsx("span", { className: "hidden lg:inline", children: user.displayName })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: handleSignOut, className: "bg-surface-container-high text-on-surface px-4 py-2 rounded-full font-headline font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
          " Sign Out"
        ] })
      ] }) : /* @__PURE__ */ jsxs("button", { onClick: handleSignIn, className: "bg-primary text-on-primary px-4 sm:px-8 py-2 sm:py-3 rounded-full font-headline font-bold text-[10px] sm:text-sm hover:scale-105 active:scale-95 transition-all duration-200 border-2 sm:border-4 border-on-primary-container shadow-[3px_3px_0_#064e3b] sm:shadow-[6px_6px_0_#064e3b] flex items-center gap-1 sm:gap-2", children: [
        /* @__PURE__ */ jsx(LogIn, { className: "w-3 h-3 sm:w-4 sm:h-4" }),
        " ",
        /* @__PURE__ */ jsx("span", { children: "Get Started" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-28 pb-12 px-6 max-w-7xl mx-auto w-full", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxs("footer", { className: "w-full mt-32 bg-white border-t-8 border-on-background relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03] pointer-events-none graph-paper" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-3xl font-black text-primary italic font-headline flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white border-4 border-on-background shadow-[4px_4px_0_#0f172a]", children: "A" }),
              "AlgoStory"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-body text-on-surface-variant font-bold leading-relaxed max-w-xs", children: "Empowering developers to visualize algorithms and master code complexity through the art of storytelling." }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("a", { href: "https://github.com/garg-sushant", target: "_blank", rel: "noopener noreferrer", className: "w-10 h-10 bg-white border-4 border-on-background rounded-xl flex items-center justify-center hover:bg-primary-container transition-colors shadow-[4px_4px_0_#0f172a] hover:translate-y-[-2px]", children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/sushant-garg-4b0a37284/", target: "_blank", rel: "noopener noreferrer", className: "w-10 h-10 bg-white border-4 border-on-background rounded-xl flex items-center justify-center hover:bg-tertiary-container transition-colors shadow-[4px_4px_0_#0f172a] hover:translate-y-[-2px]", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxs("a", { href: "https://discordapp.com/users/1181611562277011611", target: "_blank", rel: "noopener noreferrer", className: "w-10 h-10 bg-white border-4 border-on-background rounded-xl flex items-center justify-center hover:bg-secondary-container transition-colors shadow-[4px_4px_0_#0f172a] hover:translate-y-[-2px]", children: [
                /* @__PURE__ */ jsx(Twitter, { className: "w-5 h-5 flex-shrink-0", fill: "currentColor" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Discord: sushantgarg." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-headline font-black text-xl uppercase tracking-tighter text-on-background italic underline decoration-primary decoration-4 underline-offset-4", children: "Product" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "font-body font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" }),
                " AI Analyzer"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/tutorials", className: "font-body font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" }),
                " Knowledge Base"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/inside-math", className: "font-body font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" }),
                " Complexity Lab"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "font-body font-bold text-on-surface-variant hover:text-primary flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" }),
                " Blog Articles"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-headline font-black text-xl uppercase tracking-tighter text-on-background italic underline decoration-secondary decoration-4 underline-offset-4", children: "Community" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/tutorials", className: "font-body font-bold text-on-surface-variant hover:text-secondary flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" }),
                " Docs"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "font-body font-bold text-on-surface-variant hover:text-secondary flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" }),
                " Blog"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "https://discordapp.com/users/1181611562277011611", target: "_blank", rel: "noopener noreferrer", className: "font-body font-bold text-on-surface-variant hover:text-secondary flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" }),
                " Discord (sushantgarg.)"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-headline font-black text-xl uppercase tracking-tighter text-on-background italic underline decoration-tertiary decoration-4 underline-offset-4", children: "Stay Notified" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  placeholder: "name@email.com",
                  className: "w-full px-4 py-3 bg-white border-4 border-on-background rounded-xl font-body font-bold text-sm focus:outline-none focus:ring-4 focus:ring-tertiary/20 shadow-[4px_4px_0_#94a3b8]"
                }
              ),
              /* @__PURE__ */ jsx("button", { className: "mt-4 w-full bg-tertiary text-white py-3 rounded-xl font-headline font-black uppercase text-sm border-4 border-on-background shadow-[4px_4px_0_#4c1d95] hover:translate-y-1 hover:shadow-none transition-all", children: "Join The Story" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-xs font-bold text-on-surface-variant", children: [
              /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
              " weekly tips on complexity."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-20 pt-8 border-t-4 border-on-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-on-surface-variant", children: [
          /* @__PURE__ */ jsx("p", { children: "© 2026 AlgoStory. Every line of code tells a story. 📖" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
            /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-primary transition-colors", children: "Blog" }),
            /* @__PURE__ */ jsx(Link, { to: "/tutorials", className: "hover:text-primary transition-colors", children: "Tutorials" }),
            /* @__PURE__ */ jsx(Link, { to: "/time-complexity-calculator", className: "hover:text-primary transition-colors", children: "Time Calculator" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const Layout$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
const ComplexityCalculator = lazy(async () => {
  const module = await import("./assets/ComplexityCalculator-sUYB1x2x.js");
  return { default: module.ComplexityCalculator };
});
function LazyComplexityCalculator({ complexityClass }) {
  const fallback = /* @__PURE__ */ jsxs("div", { className: "my-4 w-full rounded-3xl border-4 border-on-background bg-white p-6 text-sm font-bold text-on-surface-variant shadow-[6px_6px_0_rgba(5,150,105,0.1)] sm:my-8 sm:p-8", children: [
    "Interactive chart ready for ",
    /* @__PURE__ */ jsx("span", { className: "text-primary", children: complexityClass }),
    " after hydration."
  ] });
  if (typeof window === "undefined") {
    return fallback;
  }
  return /* @__PURE__ */ jsx(Suspense, { fallback, children: /* @__PURE__ */ jsx(ComplexityCalculator, { complexityClass }) });
}
const SITE_URL = "https://algostory.com";
const SITE_NAME = "AlgoStory";
const homeRouteMetadata = {
  "/": {
    title: "AlgoStory - Free Time Complexity & Big O Calculator | AI Code Analyzer",
    description: "Free online time complexity calculator with Big O notation analyzer. Paste code, instantly get O(N) analysis. AI-powered algorithm complexity analyzer. Better than BigOCalc.",
    heading: "Every line of code tells a story.",
    intro: "Paste your code below and watch the complexity come to life with our whimsical analyzer."
  },
  "/time-complexity-calculator": {
    title: "Time Complexity Calculator - Analyze Big O Notation | Free | AlgoStory",
    description: "Free time complexity calculator to analyze Big O of your code. Instant O(N) analysis with AI explanations. Better than BigOCalc. No signup needed.",
    heading: "Time complexity calculator",
    intro: "Paste your code and get an AI-assisted breakdown of runtime growth, loop nesting, and Big O behavior."
  },
  "/space-complexity-calculator": {
    title: "Space Complexity Calculator - Analyze Memory Usage | Free Tool | AlgoStory",
    description: "Free space complexity calculator to analyze auxiliary memory usage. Estimate O notation growth for algorithm memory. AI-powered space analysis with explanations.",
    heading: "Space complexity calculator",
    intro: "Paste your code and get an AI-assisted explanation of memory growth, auxiliary storage, and recursion stack usage."
  }
};
const tutorialMetadataById = {
  "binary-search": {
    title: "Binary Search: The Art of Halving",
    category: "Searching",
    readTime: "8 min read",
    description: "Learn how to find an element in a sorted array in O(log N) time by repeatedly dividing the search interval in half."
  },
  "merge-sort": {
    title: "Merge Sort: Divide and Conquer",
    category: "Sorting",
    readTime: "12 min read",
    description: "A highly efficient, stable sorting algorithm that uses the divide and conquer paradigm to sort arrays in O(N log N) time."
  },
  dijkstra: {
    title: "Dijkstra's Shortest Path",
    category: "Graphs",
    readTime: "15 min read",
    description: "Find the shortest paths between nodes in a graph. Essential for routing, navigation, and network analysis."
  },
  "dynamic-programming": {
    title: "0/1 Knapsack (Dynamic Programming)",
    category: "Advanced",
    readTime: "20 min read",
    description: "Master Dynamic Programming by solving the classic 0/1 Knapsack problem. Learn to build the DP table."
  },
  "quick-sort": {
    title: "Quick Sort: The Pivot Master",
    category: "Sorting",
    readTime: "10 min read",
    description: "An efficient, in-place sorting algorithm that partitions an array around a pivot element."
  },
  bfs: {
    title: "Breadth-First Search (BFS)",
    category: "Graphs",
    readTime: "10 min read",
    description: "Explore a graph level by level. Perfect for finding the shortest path in unweighted graphs."
  },
  dfs: {
    title: "Depth-First Search (DFS)",
    category: "Graphs",
    readTime: "10 min read",
    description: "Dive deep into a graph before backtracking. Useful for topological sorting and finding connected components."
  },
  "two-pointers": {
    title: "Two Pointers Technique",
    category: "Arrays",
    readTime: "8 min read",
    description: "Optimize array and string problems by using two references to iterate from different ends or at different speeds."
  },
  "sliding-window": {
    title: "Sliding Window",
    category: "Arrays",
    readTime: "12 min read",
    description: "Efficiently solve problems involving contiguous subarrays or substrings by maintaining a moving window of elements."
  },
  "bubble-sort": {
    title: "Bubble Sort: The Simple Sorter",
    category: "Sorting",
    readTime: "7 min read",
    description: "The simplest sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if needed."
  },
  "insertion-sort": {
    title: "Insertion Sort: Building a Sorted Array",
    category: "Sorting",
    readTime: "8 min read",
    description: "Build a sorted array one element at a time by inserting each element into its correct position in the sorted portion."
  },
  "linear-search": {
    title: "Linear Search: Sequential Scanning",
    category: "Searching",
    readTime: "6 min read",
    description: "Find an element in an unsorted list by checking each element sequentially until the target is found."
  },
  "hash-table": {
    title: "Hash Tables: O(1) Lookup Magic",
    category: "Data Structures",
    readTime: "14 min read",
    description: "Master the art of constant-time lookups using hash tables. Understand collisions, load factors, and practical implementations."
  },
  "linked-list": {
    title: "Linked Lists: Dynamic Data Storage",
    category: "Data Structures",
    readTime: "12 min read",
    description: "Learn how linked lists provide dynamic memory allocation and efficient insertion/deletion compared to arrays."
  },
  "stack-queue": {
    title: "Stacks & Queues: LIFO and FIFO",
    category: "Data Structures",
    readTime: "11 min read",
    description: "Understand the fundamental abstract data types: stacks (Last-In-First-Out) and queues (First-In-First-Out)."
  },
  "tree-traversal": {
    title: "Tree Traversal: In, Pre, Post Order",
    category: "Trees",
    readTime: "13 min read",
    description: "Master inorder, preorder, and postorder tree traversals. Learn when to use each approach for different problems."
  },
  "binary-tree-search": {
    title: "Binary Search Tree: Ordered Excellence",
    category: "Trees",
    readTime: "14 min read",
    description: "Explore balanced and unbalanced binary search trees for efficient searching, insertion, and deletion operations."
  }
};
const tutorialMetadata = Object.entries(tutorialMetadataById).map(([id, value]) => ({
  id,
  ...value
}));
const blogMetadataBySlug = {
  "algorithm-complexity-cheatsheet": {
    title: "Algorithm Complexity Cheatsheet: The Ultimate Comparison",
    description: "A comprehensive reference table for time and space complexities of sorting, graph algorithms, and common DSA patterns.",
    readTime: "15 min read"
  },
  "big-o-notation-explained": {
    title: "Big O Notation Explained: The Ultimate Guide",
    description: "Learn what Big O notation means, how to read common complexity classes, and how to compare algorithms with practical examples.",
    readTime: "9 min read"
  },
  "bubble-sort-time-complexity": {
    title: "Bubble Sort Time Complexity: A Deep Dive",
    description: "Understand why Bubble Sort is O(N^2), when its best case improves, and how nested loops shape runtime.",
    readTime: "7 min read"
  },
  "merge-sort-time-complexity": {
    title: "Merge Sort Time Complexity: O(N log N) Explained",
    description: "A practical explanation of Merge Sort with divide-and-conquer reasoning, recurrence intuition, and space tradeoffs.",
    readTime: "8 min read"
  },
  "understanding-recursion": {
    title: "Understanding Recursion: The Foundational Concept",
    description: "Learn how recursion works, why base cases matter, and how to visualize recursive calls with practical examples.",
    readTime: "10 min read"
  },
  "backtracking-guide": {
    title: "Solving Problems with Backtracking: A Comprehensive Guide",
    description: "Master backtracking by exploring state-space trees and pruning techniques for complex problem-solving.",
    readTime: "12 min read"
  },
  "segment-trees-mastery": {
    title: "Mastering Segment Trees: Range Queries and Updates",
    description: "Efficiently perform range sum, minimum, and maximum queries along with pointwise updates in O(log N) time.",
    readTime: "15 min read"
  },
  "bit-manipulation-hacks": {
    title: "Bit Manipulation Hacks for Fast Programming",
    description: "Speed up your CP solutions with clever bit manipulation tricks and binary representation insights.",
    readTime: "10 min read"
  },
  "dynamic-programming-optimization": {
    title: "Dynamic Programming: Optimizing Recursive Solutions",
    description: "Convert recursive solutions into efficient iterative ones using memoization and tabular DP approaches.",
    readTime: "14 min read"
  },
  "graph-representation": {
    title: "Graph Representation: Adjacency Lists vs. Matrices",
    description: "Explore the trade-offs between adjacency lists and matrices for storing and traversing graph data in memory.",
    readTime: "9 min read"
  },
  "sorting-algorithms-comparison": {
    title: "Sorting Algorithms: Choosing the Right Strategy",
    description: "A deep dive into common sorting algorithms and when to use each for maximum performance.",
    readTime: "11 min read"
  },
  "linked-lists-vs-arrays": {
    title: "Linked Lists vs. Arrays: Choosing the Right Data Structure",
    description: "Understand the fundamental differences and use cases for linear data structures in memory.",
    readTime: "8 min read"
  },
  "hash-map-collisions": {
    title: "Inside Hash Maps: Solving the Collision Problem",
    description: "How hash maps work internally and how they handle collisions through chaining and open addressing.",
    readTime: "12 min read"
  },
  "balanced-bst-trees": {
    title: "Balanced Binary Search Trees: Keeping Data in Order",
    description: "A guide to AVL trees and Red-Black trees and how they maintain O(log N) operations.",
    readTime: "13 min read"
  }
};
const blogMetadata = Object.entries(blogMetadataBySlug).map(([slug, value]) => ({
  slug,
  ...value
}));
[
  "/",
  "/time-complexity-calculator",
  "/space-complexity-calculator",
  "/tutorials",
  ...tutorialMetadata.map((tutorial) => `/tutorials/${tutorial.id}`),
  "/inside-math",
  "/blog",
  ...blogMetadata.map((post) => `/blog/${post.slug}`)
];
function toAbsoluteUrl(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path === "/") {
    return SITE_URL;
  }
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function Seo({
  title,
  description,
  path,
  type = "website",
  keywords,
  robots,
  schema,
  image
}) {
  const url = toAbsoluteUrl(path);
  const imageUrl = image ? toAbsoluteUrl(image) : `${SITE_URL}/og-image.png`;
  const structuredData = Array.isArray(schema) ? schema : schema ? [schema] : [];
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords ? /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }) : null,
    robots ? /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }) : null,
    /* @__PURE__ */ jsx("meta", { name: "author", content: SITE_NAME }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_US" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: imageUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: imageUrl }),
    structuredData.map((entry, index) => /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(entry) }, index))
  ] });
}
function Home() {
  var _a;
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [code, setCode] = useState(`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`);
  const [hint, setHint] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [analyzedCode, setAnalyzedCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (code.trim().length > 10) {
        try {
          const { fastCodeHint } = await import("./assets/gemini-z3KVUO2H.js");
          const quickHint = await fastCodeHint(code);
          if (!cancelled) {
            setHint(quickHint);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }, 1500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [code]);
  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setIsSaved(false);
    try {
      const { analyzeCodeComplexity } = await import("./assets/gemini-z3KVUO2H.js");
      const res = await analyzeCodeComplexity(code);
      setResult(res);
      setAnalyzedCode(code);
    } catch (error) {
      console.error("Analysis failed:", error);
      const msg = ((error == null ? void 0 : error.message) || "").toLowerCase();
      const isQuotaLike = msg.includes("429") || msg.includes("quota") || msg.includes("rate limit") || msg.includes("exhausted");
      if (isQuotaLike) {
        alert("Wait a second! The AI wizards are overwhelmed. Please wait a minute and try again (quota/rate limit).");
        return;
      }
      const status = (error == null ? void 0 : error.status) ? `(${error.status}) ` : "";
      const message = (error == null ? void 0 : error.message) || "Unknown error";
      alert(`Failed to analyze code. ${status}${message.substring(0, 100)}${message.length > 100 ? "..." : ""}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const handleSaveAnalysis = async () => {
    if (!user) {
      alert("Please log in to save your analysis.");
      return;
    }
    if (!result) return;
    setIsSaving(true);
    try {
      const [{ db }, firestore] = await Promise.all([
        import("./assets/firebase-DDh2ZTZn.js"),
        import("firebase/firestore")
      ]);
      await firestore.addDoc(firestore.collection(db, "users", user.uid, "analyses"), {
        code: analyzedCode,
        complexity: result.complexity,
        complexityClass: result.complexityClass,
        spaceComplexity: result.spaceComplexity,
        explanationPoints: result.explanationPoints,
        createdAt: firestore.serverTimestamp()
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving analysis:", error);
      alert("Failed to save analysis.");
    } finally {
      setIsSaving(false);
    }
  };
  const pageSeo = homeRouteMetadata[pathname] ?? homeRouteMetadata["/"];
  const pagePath = pathname || "/";
  const isTimeCalculator = pagePath === "/time-complexity-calculator";
  const isSpaceCalculator = pagePath === "/space-complexity-calculator";
  const isServer = typeof window === "undefined";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: isSpaceCalculator ? "AlgoStory Space Complexity Calculator" : isTimeCalculator ? "AlgoStory Time Complexity Calculator" : "AlgoStory Code Complexity Analyzer",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      url: `${SITE_URL}${pagePath === "/" ? "" : pagePath}`,
      description: pageSeo.description,
      offers: {
        "@type": "Offer",
        price: "0"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does this complexity calculator do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AlgoStory reviews your code and explains how time and space complexity grow as the input size increases."
          }
        },
        {
          "@type": "Question",
          name: "Can it help with Big O notation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It turns loops, recursion, and data structure usage into readable Big O explanations."
          }
        },
        {
          "@type": "Question",
          name: "Does it cover both time and space complexity?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The analyzer surfaces both runtime growth and auxiliary memory usage so you can compare tradeoffs clearly."
          }
        }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "graph-paper min-h-screen", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: pageSeo.title,
        description: pageSeo.description,
        path: pagePath,
        keywords: isSpaceCalculator ? "space complexity calculator, auxiliary space calculator, memory complexity, big o space complexity" : isTimeCalculator ? "time complexity calculator, big o calculator, runtime complexity analyzer, algorithm complexity" : "code complexity analyzer, big o notation, time complexity, space complexity, algorithm tutorials",
        schema
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center max-w-3xl mx-auto space-y-4 px-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-headline font-black text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[1.1] md:leading-[1.05]", children: pagePath === "/" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Every line of code",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-primary italic underline decoration-[8px] md:decoration-[12px] decoration-primary-container", children: "tells a story." })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        pageSeo.heading.split(" ").slice(0, -1).join(" "),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-primary italic underline decoration-[8px] md:decoration-[12px] decoration-primary-container", children: pageSeo.heading.split(" ").slice(-1) })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-on-surface-variant font-bold max-w-2xl mx-auto", children: pageSeo.intro })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-10 items-start", children: [
      /* @__PURE__ */ jsxs("section", { className: "lg:col-span-5 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Activity, { className: "text-primary w-10 h-10" }),
          /* @__PURE__ */ jsx("h2", { className: "font-headline font-black text-4xl tracking-tighter uppercase italic", children: "The Lab" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group px-2 sm:px-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#0f172a] rounded-3xl overflow-hidden border-4 border-on-background shadow-[8px_8px_0_#0f172a] sm:shadow-[12px_12px_0_#0f172a]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-on-background/50 border-b-2 border-on-background/30", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-error" }),
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-tertiary" }),
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-primary-fixed-dim" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleCopy,
                    className: "text-white hover:text-primary-fixed-dim transition-colors flex items-center gap-1 font-label text-[10px] sm:text-xs uppercase tracking-widest font-black bg-white/20 px-2 py-1 rounded-lg border border-white/20 cursor-pointer",
                    title: "Copy Code",
                    children: [
                      copied ? /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }),
                      copied ? "Copied" : "Copy"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-white/70 font-label text-[10px] sm:text-xs uppercase tracking-widest font-black", children: "your_code" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-[#1d1f21] min-h-[250px] max-h-[400px] overflow-auto", children: isServer ? /* @__PURE__ */ jsx("pre", { className: "overflow-auto p-6 text-sm text-white", children: /* @__PURE__ */ jsx("code", { children: code }) }) : /* @__PURE__ */ jsx(
              Editor,
              {
                value: code,
                onValueChange: (code2) => setCode(code2),
                highlight: (value) => Prism.highlight(value, Prism.languages.python, "python"),
                padding: 24,
                style: {
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  backgroundColor: "transparent"
                },
                className: "text-white"
              }
            ) })
          ] }),
          hint && /* @__PURE__ */ jsxs("div", { className: "absolute -bottom-4 right-4 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-label text-xs font-bold shadow-lg transform rotate-2 z-10", children: [
            "💡 ",
            hint
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 py-4", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleAnalyze,
              disabled: isAnalyzing,
              className: "bg-primary text-white w-40 h-40 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center gap-2 border-4 sm:border-8 border-on-primary-container shadow-[0_8px_0_#064e3b] sm:shadow-[0_12px_0_#064e3b] hover:translate-y-1 hover:shadow-[0_6px_0_#064e3b] sm:hover:shadow-[0_8px_0_#064e3b] active:translate-y-3 active:shadow-none transition-all duration-150 group disabled:opacity-50 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsx(Zap, { className: `w-12 h-12 ${isAnalyzing ? "animate-pulse" : "group-hover:scale-110 transition-transform"}` }),
                /* @__PURE__ */ jsx("span", { className: "font-headline font-extrabold text-center px-4 leading-tight uppercase", children: isAnalyzing ? "Analyzing..." : "Analyze Complexity" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "font-label text-on-surface-variant text-sm font-bold tracking-wide italic", children: '"Push it. I dare you."' })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "lg:col-span-7 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "text-tertiary w-10 h-10" }),
          /* @__PURE__ */ jsx("h2", { className: "font-headline font-black text-4xl tracking-tighter uppercase italic", children: "The Story" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border-4 border-on-background rounded-3xl p-4 sm:p-8 shadow-[8px_8px_0_#0f172a] sm:shadow-[16px_16px_0_#0f172a] min-h-[400px] sm:min-h-[500px] flex flex-col relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/2 blur-[100px] rounded-full pointer-events-none" }),
          !result && !isAnalyzing && /* @__PURE__ */ jsx("div", { className: "flex-grow flex items-center justify-center text-on-surface-variant font-headline text-lg italic", children: "Waiting for your code..." }),
          isAnalyzing && /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-8 border-primary border-t-transparent rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("p", { className: "font-headline font-bold text-primary animate-pulse", children: "Consulting the math wizards..." })
          ] }),
          result && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "font-label text-xs font-bold text-on-surface-variant uppercase tracking-tighter", children: "Growth Metric" }),
                /* @__PURE__ */ jsx("span", { className: "font-headline font-bold text-lg", children: "Computational Velocity" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-center justify-end", children: [
                /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-surface-container rounded-full text-xs font-bold font-label", children: [
                  "Time: ",
                  result.complexity
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-secondary-container rounded-full text-xs font-bold font-label text-on-secondary-container", children: [
                  "Space: ",
                  result.spaceComplexity
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleSaveAnalysis,
                    disabled: isSaving || isSaved,
                    className: "flex items-center gap-2 px-4 py-1.5 bg-primary text-on-primary rounded-full font-bold text-xs shadow hover:bg-primary/90 disabled:opacity-50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                      isSaving ? "Saving..." : isSaved ? "Saved!" : "Save Analysis"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: result.complexityClass }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-start gap-4 z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-2xl border-4 border-on-background bg-tertiary-container shadow-[6px_6px_0_#0f172a] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Cpu, { className: "w-10 h-10 text-on-tertiary-container" }) }),
              /* @__PURE__ */ jsxs("div", { className: "speech-bubble p-4 sm:p-8 rounded-3xl shadow-[6px_6px_0_#0f172a] sm:shadow-[8px_8px_0_#0f172a] bg-white w-full", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-2xl text-primary", children: result.complexity }) }),
                /* @__PURE__ */ jsx("ul", { className: "font-body text-on-surface leading-relaxed list-disc list-inside space-y-2", children: (_a = result.explanationPoints) == null ? void 0 : _a.map((point, index) => /* @__PURE__ */ jsx("li", { className: "text-sm", children: point }, index)) })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    result && /* @__PURE__ */ jsxs("div", { className: "mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 relative z-10 px-2 sm:px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 sm:p-10 rounded-3xl border-4 border-on-background shadow-[6px_6px_0_rgba(5,150,105,0.15)] sm:shadow-[8px_8px_0_rgba(5,150,105,0.15)] hover:shadow-[10px_10px_0_rgba(5,150,105,0.25)] transition-all group", children: [
        /* @__PURE__ */ jsx(Cpu, { className: "text-primary mb-4 sm:mb-6 w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" }),
        /* @__PURE__ */ jsx("h4", { className: "font-headline font-black text-xl sm:text-2xl mb-2 uppercase text-on-surface italic", children: "Space Complexity" }),
        /* @__PURE__ */ jsxs("p", { className: "text-md sm:text-lg text-on-surface-variant font-bold", children: [
          "Your script uses ",
          /* @__PURE__ */ jsx("strong", { className: "text-primary", children: result.spaceComplexity }),
          " auxiliary space."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 sm:p-10 rounded-3xl border-4 border-on-background shadow-[6px_6px_0_rgba(2,132,199,0.15)] sm:shadow-[8px_8px_0_rgba(2,132,199,0.15)] hover:shadow-[10px_10px_0_rgba(2,132,199,0.25)] transition-all group", children: [
        /* @__PURE__ */ jsx(Lightbulb, { className: "text-secondary mb-4 w-8 h-8 group-hover:scale-110 transition-transform" }),
        /* @__PURE__ */ jsx("h4", { className: "font-headline font-bold text-lg mb-2 uppercase", children: "Pro Tip" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant font-medium", children: "Keep an eye on nested loops or recursive calls. They are the usual suspects for high complexity!" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-32 mb-16 px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between mb-12 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-xl text-center md:text-left", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-headline font-black text-4xl sm:text-5xl tracking-tighter uppercase italic mb-4", children: "Common Complexity Classes" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-on-surface-variant font-bold leading-relaxed", children: "Every algorithm has its own growth story. Here are the most common computational arcs you'll encounter." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-24 h-24 bg-primary rounded-full border-4 border-on-background shadow-[6px_6px_0_#0f172a] animate-bounce" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        { tag: "O(1)", title: "Constant", desc: "Array access, hash lookup", color: "bg-primary", accent: "#059669" },
        { tag: "O(log n)", title: "Logarithmic", desc: "Binary search", color: "bg-secondary", accent: "#0284c7" },
        { tag: "O(n)", title: "Linear", desc: "Single loop, linear search", color: "bg-[#f59e0b]", accent: "#f59e0b" },
        { tag: "O(n log n)", title: "Linearithmic", desc: "Merge sort, quick sort", color: "bg-[#d97706]", accent: "#d97706" },
        { tag: "O(n²)", title: "Quadratic", desc: "Nested loops, bubble sort", color: "bg-error", accent: "#dc2626" },
        { tag: "O(2ⁿ)", title: "Exponential", desc: "Recursive Fibonacci", color: "bg-[#991b1b]", accent: "#991b1b" }
      ].map((cls, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `bg-white p-8 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#0f172a] hover:-translate-y-2 transition-transform cursor-default group ${idx % 2 === 1 ? "lg:rotate-1" : "lg:-rotate-1"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsx("span", { className: `${cls.color} text-white px-4 py-1.5 rounded-full font-headline font-black text-sm border-2 border-on-background shadow-[3px_3px_0_#0f172a] uppercase`, children: cls.tag }),
              /* @__PURE__ */ jsx(Activity, { className: "w-6 h-6 text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-2xl mb-2 text-on-surface uppercase italic tracking-tighter", children: cls.title }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-sm font-bold leading-relaxed", children: cls.desc })
          ]
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-16 pt-16 border-t-4 border-on-background", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 px-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-headline text-4xl sm:text-5xl md:text-6xl font-black text-on-background mb-4 uppercase", children: [
          "The ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Free Time Complexity" }),
          " Calculator"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-on-surface-variant max-w-2xl mx-auto font-bold", children: "AlgoStory is the most powerful free Big O calculator available. Better than BigOCalc, more intuitive than manual analysis." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-primary-container p-8 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#064e3b]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 text-primary" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-2xl text-on-background", children: "⚡ Time Complexity Analyzer" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Instantly analyze O(N), O(log N), O(N²) and more patterns in your code. Get Big O notation with AI explanations." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-secondary-container p-8 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#0c4a6e]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(Cpu, { className: "w-8 h-8 text-secondary" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-2xl text-on-background", children: "💾 Space Complexity Calculator" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Calculate auxiliary space and memory usage of your algorithms. Analyze O notation with AI-powered insights." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-tertiary-container p-8 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#4c1d95]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(Lightbulb, { className: "w-8 h-8 text-tertiary" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-2xl text-on-background", children: "🤖 AI-Powered Insights" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Get natural language explanations of complexity patterns. Understand algorithm efficiency in plain English." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-error-container p-8 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#7f1d1d]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-8 h-8 text-error" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-2xl text-on-background", children: "📚 Learn Big O Notation" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Master algorithm complexity with 16+ interactive tutorials. From linear search to dynamic programming." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-16 bg-secondary-container p-12 rounded-3xl border-4 border-on-background shadow-[12px_12px_0_#0c4a6e]", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-headline text-4xl font-black text-on-background text-center mb-12", children: "Why Choose AlgoStory Over BigOCalc?" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b-4 border-on-background", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left p-4 font-headline font-black text-lg text-on-background", children: "Feature" }),
          /* @__PURE__ */ jsx("th", { className: "text-center p-4 font-headline font-black text-lg text-on-background", children: "AlgoStory" }),
          /* @__PURE__ */ jsx("th", { className: "text-center p-4 font-headline font-black text-lg text-on-background", children: "BigOCalc" }),
          /* @__PURE__ */ jsx("th", { className: "text-center p-4 font-headline font-black text-lg text-on-background", children: "Manual" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-on-background/30 hover:bg-on-background/5", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-on-background", children: "Free Forever" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "✅" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "⚠️" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "✅" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-on-background/30 hover:bg-on-background/5", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-on-background", children: "AI Explanations" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "✅" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "❌" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "❌" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-on-background/30 hover:bg-on-background/5", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-on-background", children: "Space Complexity" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "✅" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "⚠️" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "❌" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-on-background/30 hover:bg-on-background/5", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-on-background", children: "16+ Tutorials" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "✅" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "❌" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "❌" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { className: "hover:bg-on-background/5", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-on-background", children: "Step-by-Step Breakdown" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "✅" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "❌" }),
            /* @__PURE__ */ jsx("td", { className: "text-center p-4 text-2xl", children: "❌" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-on-background font-bold text-lg mt-8", children: [
        "Get started now with our ",
        /* @__PURE__ */ jsx("strong", { children: "Free Time Complexity Calculator" }),
        " - No signup, no limits, no ads."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-16 bg-surface-container-low p-12 rounded-3xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-headline text-4xl font-black text-on-background mb-12 text-center", children: "How Our Complexity Calculator Works" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary text-white font-headline font-black text-xl flex items-center justify-center border-2 border-on-background", children: "1" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-xl text-on-background mb-2", children: "Paste Your Code" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Paste any Python, Java, JavaScript, C++ or other language code into our Big O calculator" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-secondary text-white font-headline font-black text-xl flex items-center justify-center border-2 border-on-background", children: "2" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-xl text-on-background mb-2", children: "AI Analyzes Complexity" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Our AI examines your code and calculates time complexity, space complexity, and identifies optimization opportunities" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-tertiary text-white font-headline font-black text-xl flex items-center justify-center border-2 border-on-background", children: "3" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-xl text-on-background mb-2", children: "Get Big O Analysis" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Receive instant O(N) notation with natural language explanations of why your algorithm has that complexity" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-error text-white font-headline font-black text-xl flex items-center justify-center border-2 border-on-background", children: "4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-xl text-on-background mb-2", children: "Learn & Improve" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-bold", children: "Use our 16+ algorithm tutorials to understand complexity patterns and optimize your code for better performance" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-16 rounded-[2rem] border-4 border-on-background bg-white px-6 py-10 shadow-[12px_12px_0_#0f172a] sm:px-10", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 font-headline text-4xl font-black uppercase italic tracking-tighter", children: "Learn The Patterns Behind The Output" }),
        /* @__PURE__ */ jsx("p", { className: "text-base font-bold leading-relaxed text-on-surface-variant sm:text-lg", children: "Strong SEO pages need strong internal linking. These guides connect the calculator to specific algorithm topics users actually search for." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/tutorials",
            className: "rounded-3xl border-4 border-on-background bg-primary-container p-6 shadow-[8px_8px_0_#0f172a] transition-transform hover:-translate-y-1",
            children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "mb-5 h-10 w-10 text-primary" }),
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-headline text-2xl font-black", children: "Algorithm Tutorials" }),
              /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm font-bold leading-relaxed text-on-surface-variant", children: "Crawlable guides on binary search, merge sort, graphs, dynamic programming, and more." }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-black text-primary", children: [
                "Browse Tutorials",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/inside-math",
            className: "rounded-3xl border-4 border-on-background bg-secondary-container p-6 shadow-[8px_8px_0_#0f172a] transition-transform hover:-translate-y-1",
            children: [
              /* @__PURE__ */ jsx(Cpu, { className: "mb-5 h-10 w-10 text-secondary" }),
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-headline text-2xl font-black", children: "Line-By-Line Breakdowns" }),
              /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm font-bold leading-relaxed text-on-surface-variant", children: "Use the step-by-step analyzer to understand where each complexity term comes from." }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-black text-secondary", children: [
                "Open Complexity Lab",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/blog",
            className: "rounded-3xl border-4 border-on-background bg-tertiary-container p-6 shadow-[8px_8px_0_#0f172a] transition-transform hover:-translate-y-1",
            children: [
              /* @__PURE__ */ jsx(Activity, { className: "mb-5 h-10 w-10 text-tertiary" }),
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-headline text-2xl font-black", children: "Big O Articles" }),
              /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm font-bold leading-relaxed text-on-surface-variant", children: "Read focused explainers on Big O notation, Bubble Sort, and Merge Sort complexity." }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-black text-tertiary", children: [
                "Read The Blog",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-10 px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 font-headline text-4xl font-black uppercase italic tracking-tighter", children: "Complexity Calculator FAQ" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold leading-relaxed text-on-surface-variant", children: "This extra explanatory content helps users and search engines understand what the tool does, which queries it serves, and when to use each experience." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: [
        {
          question: "When should I use the time complexity calculator?",
          answer: "Use it when you want to estimate how runtime changes as input size grows, especially for loops, nested loops, and recursive code."
        },
        {
          question: "When should I use the space complexity calculator?",
          answer: "Use it when memory growth matters, including recursion stack depth, temporary arrays, hash maps, and auxiliary storage."
        },
        {
          question: "Can I learn Big O from this site?",
          answer: "Yes. The calculator is paired with tutorials, articles, and a line-by-line lab so users can move from quick answers to deeper understanding."
        }
      ].map((item) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: "rounded-3xl border-4 border-on-background bg-white p-6 shadow-[8px_8px_0_#0f172a]",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-3 font-headline text-2xl font-black leading-tight", children: item.question }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold leading-relaxed text-on-surface-variant", children: item.answer })
          ]
        },
        item.question
      )) })
    ] })
  ] });
}
const Home$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const CodeBlock = ({ code, language = "python" }) => {
  if (typeof window === "undefined") {
    return /* @__PURE__ */ jsxs("div", { className: "bg-[#1d1f21] rounded-xl overflow-hidden my-6 border-2 border-on-background/20 shadow-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-2 bg-on-background/50 border-b border-on-background/30", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-error" }),
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-tertiary" }),
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-primary-fixed-dim" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ml-4 text-inverse-on-surface font-label text-xs uppercase tracking-widest font-bold", children: "Example Code" })
      ] }),
      /* @__PURE__ */ jsx("pre", { className: "overflow-auto p-4 text-sm text-white", children: /* @__PURE__ */ jsx("code", { children: code }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#1d1f21] rounded-xl overflow-hidden my-6 border-2 border-on-background/20 shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-2 bg-on-background/50 border-b border-on-background/30", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-error" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-tertiary" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-primary-fixed-dim" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "ml-4 text-inverse-on-surface font-label text-xs uppercase tracking-widest font-bold", children: "Example Code" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 overflow-auto text-sm font-mono text-white", children: /* @__PURE__ */ jsx(
      Editor,
      {
        value: code,
        onValueChange: () => {
        },
        highlight: (value) => Prism.highlight(value, Prism.languages[language] || Prism.languages.javascript, language),
        padding: 10,
        style: {
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: 14,
          backgroundColor: "transparent"
        },
        disabled: true
      }
    ) })
  ] });
};
const tutorialsData = [
  {
    id: "binary-search",
    ...tutorialMetadataById["binary-search"],
    icon: Search,
    colorClass: "text-primary",
    bgClass: "bg-primary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Binary Search is a classic algorithm that finds the position of a target value within a ",
        /* @__PURE__ */ jsx("strong", { children: "sorted array" }),
        ". It compares the target value to the middle element of the array."
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Imagine looking for a word in a dictionary. You don't read page by page. You open it to the middle, check if your word comes before or after, and then repeat the process on the remaining half. That's Binary Search." }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(\\log_2 N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(1) \\text{ (Iterative)}" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Because the search space is halved with each step, the maximum number of steps required is the logarithm (base 2) of the array size ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "N" }),
        "."
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(log N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1` })
    ] })
  },
  {
    id: "merge-sort",
    ...tutorialMetadataById["merge-sort"],
    icon: Layers,
    colorClass: "text-secondary",
    bgClass: "bg-secondary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Merge Sort is a sorting algorithm that follows the ",
        /* @__PURE__ */ jsx("strong", { children: "Divide and Conquer" }),
        " paradigm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves."
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "The algorithm continuously divides the array in half until it cannot be further divided (i.e., the array has only one element). Then, it repeatedly merges the sublists to produce new sorted sublists until there is only one sorted list remaining." }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(N \\log N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(N)" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "The dividing step takes ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(\\log N)" }),
        " time, and the merging step takes ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N)" }),
        " time at each level of the recursion tree. Thus, the total time complexity is ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N \\log N)" }),
        "."
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N log N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0

        # Merge the temp arrays back into arr
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        # Checking if any element was left
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1` })
    ] })
  },
  {
    id: "dijkstra",
    ...tutorialMetadataById.dijkstra,
    icon: Network,
    colorClass: "text-tertiary",
    bgClass: "bg-tertiary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Dijkstra's algorithm allows us to find the shortest path between any two vertices of a graph. It differs from the minimum spanning tree because the shortest distance between two vertices might not include all the vertices of the graph." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "The algorithm maintains a set of unvisited nodes and calculates a tentative distance from the source node to every other node. It greedily selects the unvisited node with the smallest tentative distance, visits it, and updates the distances of its neighbors." }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}((V + E) \\log V)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(V)" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Where ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "V" }),
        " is the number of vertices and ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "E" }),
        " is the number of edges. The use of a Priority Queue (Min-Heap) allows us to efficiently extract the node with the minimum distance."
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `import heapq

def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances` })
    ] })
  },
  {
    id: "dynamic-programming",
    ...tutorialMetadataById["dynamic-programming"],
    icon: Brain,
    colorClass: "text-error",
    bgClass: "bg-error-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "A naive solution is to consider all subsets of items and calculate the total weight and value of all subsets. This takes ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(2^N)" }),
        " time. Dynamic Programming solves this by breaking it down into overlapping subproblems and storing the results in a table."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "DP[i][w] = \\max(DP[i-1][w], DP[i-1][w-wt[i]] + val[i])" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(N \\times W)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(N \\times W)" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Where ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "N" }),
        " is the number of items and ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "W" }),
        " is the capacity of the knapsack."
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def knapsack(W, wt, val, n):
    K = [[0 for x in range(W + 1)] for x in range(n + 1)]
 
    # Build table K[][] in bottom up manner
    for i in range(n + 1):
        for w in range(W + 1):
            if i == 0 or w == 0:
                K[i][w] = 0
            elif wt[i-1] <= w:
                K[i][w] = max(val[i-1] + K[i-1][w-wt[i-1]],  K[i-1][w])
            else:
                K[i][w] = K[i-1][w]
 
    return K[n][W]` })
    ] })
  },
  {
    id: "quick-sort",
    ...tutorialMetadataById["quick-sort"],
    icon: ListOrdered,
    colorClass: "text-primary",
    bgClass: "bg-primary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Quick Sort is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. A large array is partitioned into two arrays one of which holds values smaller than the specified value, say pivot, based on which the partition is made and another array holds values greater than the pivot value." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Quicksort partitions an array and then calls itself recursively twice to sort the two resulting subarrays. This algorithm is quite efficient for large-sized data sets as its average and best-case complexity are ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N \\log N)" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Best/Average Time: } \\mathcal{O}(N \\log N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Worst Time: } \\mathcal{O}(N^2)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(\\log N)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N log N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def partition(arr, low, high):
    i = (low-1)         # index of smaller element
    pivot = arr[high]     # pivot
  
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i = i+1
            arr[i], arr[j] = arr[j], arr[i]
  
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return (i+1)
  
def quick_sort(arr, low, high):
    if len(arr) == 1:
        return arr
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi-1)
        quick_sort(arr, pi+1, high)` })
    ] })
  },
  {
    id: "bfs",
    ...tutorialMetadataById.bfs,
    icon: Network,
    colorClass: "text-secondary",
    bgClass: "bg-secondary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "BFS uses a ",
        /* @__PURE__ */ jsx("strong", { children: "Queue" }),
        " data structure to keep track of the nodes to visit next. It guarantees that the shortest path (in terms of number of edges) is found first in unweighted graphs."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(V + E)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(V)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        vertex = queue.popleft()
        print(vertex, end=" ")

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)` })
    ] })
  },
  {
    id: "dfs",
    ...tutorialMetadataById.dfs,
    icon: Network,
    colorClass: "text-tertiary",
    bgClass: "bg-tertiary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "DFS uses a ",
        /* @__PURE__ */ jsx("strong", { children: "Stack" }),
        " (often implicitly via recursion) to remember where it should go back to when it reaches a dead end."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(V + E)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(V)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=" ")

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
            
    return visited` })
    ] })
  },
  {
    id: "two-pointers",
    ...tutorialMetadataById["two-pointers"],
    icon: ArrowRightLeft,
    colorClass: "text-primary",
    bgClass: "bg-primary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "The Two Pointers technique is a simple yet powerful strategy used to solve array and string problems. It involves using two pointers (indices) to iterate through the data structure, often from opposite ends or moving at different speeds." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "This technique is particularly useful for problems involving sorted arrays (like finding pairs that sum to a target) or linked lists (like finding the middle or detecting cycles). It often reduces time complexity from ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N^2)" }),
        " to ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N)" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(1)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python - Two Sum Sorted)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return []` })
    ] })
  },
  {
    id: "sliding-window",
    ...tutorialMetadataById["sliding-window"],
    icon: Maximize,
    colorClass: "text-error",
    bgClass: "bg-error-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'The Sliding Window technique is used to perform operations on a specific window size of a given array or string. The window "slides" over the data, allowing you to compute results efficiently without redundant calculations.' }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Instead of recalculating the sum (or other property) of a subarray from scratch, you subtract the element leaving the window and add the element entering the window. This reduces nested loops to a single loop." }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(1)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python - Max Sum Subarray of Size K)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def max_sum_subarray(arr, k):
    if not arr or k <= 0 or k > len(arr):
        return 0
        
    max_sum = current_sum = sum(arr[:k])
    
    for i in range(k, len(arr)):
        current_sum = current_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, current_sum)
        
    return max_sum` })
    ] })
  },
  {
    id: "bubble-sort",
    ...tutorialMetadataById["bubble-sort"],
    icon: Zap,
    colorClass: "text-error",
    bgClass: "bg-error-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Bubble Sort is the simplest sorting algorithm. It repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: `The algorithm is named for the way smaller elements "bubble" to the top of the list. It's not efficient for large datasets but is great for learning and understanding sorting concepts.` }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Best Time: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Average/Worst Time: } \\mathcal{O}(N^2)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(1)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N²)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def bubble_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater
            # than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps occurred, array is sorted
        if not swapped:
            break
    
    return arr` })
    ] })
  },
  {
    id: "insertion-sort",
    ...tutorialMetadataById["insertion-sort"],
    icon: Repeat,
    colorClass: "text-primary",
    bgClass: "bg-primary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort, but provides several advantages such as simplicity and online sorting." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Imagine sorting playing cards in your hands. You start with an empty left hand and the cards in your right hand. Then you remove one card at a time from your right hand and insert it into the correct position in your left hand. To find the correct position for a card, you compare it with each of the cards already in your hand, from right to left, until you find the right place." }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Best Time: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Average/Worst Time: } \\mathcal{O}(N^2)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(1)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N²)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def insertion_sort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements of arr[0..i-1] that are
        # greater than key to one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert the key at its correct position
        arr[j + 1] = key
    
    return arr` })
    ] })
  },
  {
    id: "linear-search",
    ...tutorialMetadataById["linear-search"],
    icon: Search,
    colorClass: "text-secondary",
    bgClass: "bg-secondary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Linear Search is the simplest search algorithm. It checks every element in the list sequentially until it finds the desired element or reaches the end of the list. Unlike binary search, it doesn't require the list to be sorted." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "Linear search is useful when working with unsorted data or small datasets. It's straightforward to implement but scales poorly as the dataset grows. Each comparison has an equal probability of being the right one, so the average case is ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N/2)" }),
        " which simplifies to ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N)" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Best Time: } \\mathcal{O}(1)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Average Time: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Worst Time: } \\mathcal{O}(N)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `def linear_search(arr, target):
    """
    Perform linear search on an unsorted array
    Returns the index if found, -1 otherwise
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    
    return -1


# Example usage
arr = [3, 1, 4, 1, 5, 9, 2, 6]
target = 5
result = linear_search(arr, target)
print(f"Element found at index: {result}")` })
    ] })
  },
  {
    id: "hash-table",
    ...tutorialMetadataById["hash-table"],
    icon: Hash,
    colorClass: "text-tertiary",
    bgClass: "bg-tertiary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A Hash Table (also called Hash Map) is a data structure that implements an associative array—a structure that maps keys to values. It uses a hash function to compute an index (hash code) into an array of buckets or slots from which the desired value can be found." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "The ideal hash function distributes keys uniformly across the hash table. When two keys hash to the same index, a ",
        /* @__PURE__ */ jsx("strong", { children: "collision" }),
        " occurs. Common collision resolution techniques include chaining (using linked lists) and open addressing (finding another empty slot)."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Average Search: } \\mathcal{O}(1)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Worst Search: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(N)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(1)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python - Dictionary/HashMap)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self._hash(key)
        bucket = self.table[index]
        
        # Update if exists, else append
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        bucket.append((key, value))
    
    def get(self, key):
        index = self._hash(key)
        bucket = self.table[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        return None` })
    ] })
  },
  {
    id: "linked-list",
    ...tutorialMetadataById["linked-list"],
    icon: Link2,
    colorClass: "text-error",
    bgClass: "bg-error-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A Linked List is a linear data structure where elements (nodes) are stored in objects called nodes. Each node contains data and a reference (link) to the next node in the sequence. Unlike arrays, linked lists allow efficient insertion and deletion at any position." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Singly linked lists have one pointer per node (to the next node), while doubly linked lists have two pointers (to next and previous). This dynamic memory allocation comes with the cost of extra memory for pointers and slower random access compared to arrays." }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Access: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Insertion/Deletion (if position known): } \\mathcal{O}(1)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Search: } \\mathcal{O}(N)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def insert_at_end(self, data):
        new_node = Node(data)
        
        if not self.head:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        
        current.next = new_node
    
    def delete(self, data):
        if not self.head:
            return
        
        if self.head.data == data:
            self.head = self.head.next
            return
        
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next` })
    ] })
  },
  {
    id: "stack-queue",
    ...tutorialMetadataById["stack-queue"],
    icon: Box,
    colorClass: "text-primary",
    bgClass: "bg-primary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Stacks and Queues are fundamental abstract data types used in computer science. A Stack follows the Last-In-First-Out (LIFO) principle, while a Queue follows the First-In-First-Out (FIFO) principle. Both can be implemented using arrays or linked lists." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("strong", { children: "Stack (LIFO):" }),
        " The most recently added element is removed first. Think of a stack of plates—you add and remove from the top. ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("strong", { children: "Queue (FIFO):" }),
        " The first element added is the first one to be removed. Like a line at a grocery store."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Stack/Queue Push/Pop: } \\mathcal{O}(1)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Stack/Queue Peek: } \\mathcal{O}(1)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(N)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(1)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `from collections import deque

# Stack using list (LIFO)
stack = []
stack.append(1)    # Push
stack.append(2)
stack.append(3)
print(stack.pop()) # Pop: returns 3

# Queue using deque (FIFO)
queue = deque()
queue.append(1)      # Enqueue
queue.append(2)
queue.append(3)
print(queue.popleft())  # Dequeue: returns 1

# Alternative: Queue using list (slower)
queue2 = []
queue2.append(1)   # Append to end
queue2.pop(0)      # Remove from front` })
    ] })
  },
  {
    id: "tree-traversal",
    ...tutorialMetadataById["tree-traversal"],
    icon: Trees,
    colorClass: "text-secondary",
    bgClass: "bg-secondary-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Tree Traversal is the process of visiting all the nodes in a tree data structure. There are three main depth-first traversal methods: Inorder, Preorder, and Postorder. Each visits nodes in a different sequence, useful for different applications." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("strong", { children: "Inorder (Left-Root-Right):" }),
        " Produces sorted output for BSTs. ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("strong", { children: "Preorder (Root-Left-Right):" }),
        " Useful for copying the tree. ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("strong", { children: "Postorder (Left-Right-Root):" }),
        " Useful for deletion and evaluation of expressions."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Time Complexity: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(H)" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant mb-4", children: "Where H is the height of the tree (O(N) worst case for skewed trees)" }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root, result=[]):
    """Left-Root-Right (produces sorted for BST)"""
    if root:
        inorder(root.left, result)
        result.append(root.val)
        inorder(root.right, result)
    return result

def preorder(root, result=[]):
    """Root-Left-Right"""
    if root:
        result.append(root.val)
        preorder(root.left, result)
        preorder(root.right, result)
    return result

def postorder(root, result=[]):
    """Left-Right-Root"""
    if root:
        postorder(root.left, result)
        postorder(root.right, result)
        result.append(root.val)
    return result` })
    ] })
  },
  {
    id: "binary-tree-search",
    ...tutorialMetadataById["binary-tree-search"],
    icon: BarChart3,
    colorClass: "text-error",
    bgClass: "bg-error-container",
    content: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A Binary Search Tree (BST) is a binary tree data structure where each node has at most two children (left and right). The key property is that for each node, all values in its left subtree are smaller, and all values in its right subtree are larger." }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Theory" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
        "This ordering property allows for efficient searching, insertion, and deletion. In a balanced BST, operations run in ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(\\log N)" }),
        " time. However, if the tree becomes skewed (like a linked list), performance degrades to ",
        /* @__PURE__ */ jsx(reactKatexExports.InlineMath, { math: "\\mathcal{O}(N)" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6", children: [
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Balanced BST Search: } \\mathcal{O}(\\log N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Unbalanced BST Search: } \\mathcal{O}(N)" }),
        /* @__PURE__ */ jsx(reactKatexExports.BlockMath, { math: "\\text{Space Complexity: } \\mathcal{O}(H)" })
      ] }),
      /* @__PURE__ */ jsx(LazyComplexityCalculator, { complexityClass: "O(log N)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8 mb-4", children: "The Code (Python)" }),
      /* @__PURE__ */ jsx(CodeBlock, { code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BST:
    def __init__(self):
        self.root = None
    
    def search(self, val):
        """Search for a value in the BST"""
        current = self.root
        while current:
            if val == current.val:
                return True
            elif val < current.val:
                current = current.left
            else:
                current = current.right
        return False
    
    def insert(self, val):
        """Insert a value into the BST"""
        if not self.root:
            self.root = TreeNode(val)
        else:
            self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        if val < node.val:
            if node.left:
                self._insert_recursive(node.left, val)
            else:
                node.left = TreeNode(val)
        else:
            if node.right:
                self._insert_recursive(node.right, val)
            else:
                node.right = TreeNode(val)` })
    ] })
  }
];
const tutorialsById = Object.fromEntries(
  tutorialsData.map((tutorial) => [tutorial.id, tutorial])
);
function Tutorials() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Guides");
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setSearchResult("");
    try {
      const { searchTutorials } = await import("./assets/gemini-z3KVUO2H.js");
      const result = await searchTutorials(query);
      setSearchResult(result);
    } catch (error) {
      console.error(error);
      setSearchResult("The library is currently closed for maintenance. Try again later!");
    } finally {
      setIsSearching(false);
    }
  };
  const categories = ["All Guides", ...Array.from(new Set(tutorialsData.map((t) => t.category)))];
  const filteredTutorials = activeCategory === "All Guides" ? tutorialsData : tutorialsData.filter((t) => t.category === activeCategory);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AlgoStory Tutorials",
    description: "Master Big O notation, data structures, graph algorithms, and sorting patterns with crawlable algorithm tutorials.",
    url: "https://algostory.com/tutorials",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tutorialsData.map((tutorial, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tutorial.title,
        url: `https://algostory.com/tutorials/${tutorial.id}`,
        description: tutorial.description
      }))
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Knowledge Vault: Master Big O, Algorithms, and Data Structures | AlgoStory",
        description: "Master Big O notation, dynamic programming, graph traversal, and sorting with crawlable algorithm stories and interactive guides.",
        path: "/tutorials",
        keywords: "algorithm tutorials, big o notation guide, binary search tutorial, merge sort tutorial, data structures",
        schema
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between mb-16 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1 rounded-full bg-primary text-white font-label text-xs sm:text-sm font-black mb-4 border-2 border-on-background shadow-[3px_3px_0_#064e3b] transform -rotate-1", children: "FREE RESOURCES" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-6xl md:text-8xl font-black font-headline text-on-background tracking-tighter leading-[1] md:leading-[0.9] mb-6 sm:mb-8 uppercase italic", children: [
          "The ",
          /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Knowledge" }),
          " Library"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-on-surface-variant max-w-lg mb-8", children: "Crack the code without the headache. Explore our interactive guides to algorithms, complexity, and the secret life of data." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Search for a concept...",
              className: "flex-grow px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-on-background bg-white font-label text-sm sm:text-md font-bold focus:outline-none focus:bg-primary/5 shadow-[4px_4px_0_rgba(15,23,42,0.1)]"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: isSearching,
              className: "bg-primary text-white border-2 sm:border-4 border-on-background px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-headline font-black text-md sm:text-lg shadow-[4px_4px_0_#064e3b] sm:shadow-[6px_6px_0_#064e3b] hover:-translate-y-1 transition-all disabled:opacity-50",
              children: isSearching ? /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Searching..." }) : /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 sm:w-6 sm:h-6" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative w-48 h-48 sm:w-80 sm:h-80 bg-secondary border-4 border-on-background rounded-3xl flex items-center justify-center transform rotate-2 overflow-hidden shadow-[8px_8px_0_#0c4a6e] sm:shadow-[12px_12px_0_#0c4a6e]", children: /* @__PURE__ */ jsx(BookOpen, { className: "w-24 h-24 sm:w-40 sm:h-40 text-white" }) })
    ] }),
    searchResult && /* @__PURE__ */ jsxs("div", { className: "mb-16 bg-white p-10 rounded-3xl border-4 border-primary shadow-[12px_12px_0_#059669]", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-2xl mb-4 text-primary", children: "Search Results" }),
      /* @__PURE__ */ jsx("div", { className: "prose prose-emerald max-w-none font-body whitespace-pre-wrap", children: searchResult })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
      /* @__PURE__ */ jsx("aside", { className: "lg:w-1/4 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-surface-container-low p-8 rounded-xl border border-outline/30 shadow-lg", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-headline font-extrabold text-xl mb-6", children: "Categories" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: categories.map((category) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveCategory(category),
            className: `px-6 py-2.5 rounded-full font-black text-sm transition-all border-4 ${activeCategory === category ? "bg-primary text-white border-on-background shadow-[4px_4px_0_#064e3b]" : "bg-white border-on-background text-on-background hover:bg-primary/5"}`,
            children: category
          },
          category
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "lg:w-3/4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: filteredTutorials.map((tutorial, idx) => /* @__PURE__ */ jsxs(
        "article",
        {
          className: `bg-white rounded-3xl p-8 border-4 border-on-background hover:shadow-[12px_12px_0_#0f172a] transition-all group ${idx % 2 === 1 ? "transform rotate-1" : "transform -rotate-1"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `aspect-video rounded-lg mb-6 overflow-hidden flex items-center justify-center relative ${tutorial.bgClass}`, children: /* @__PURE__ */ jsx(tutorial.icon, { className: `w-16 h-16 group-hover:scale-110 transition-transform duration-500 ${tutorial.colorClass}` }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsx("span", { className: `text-[10px] font-label font-bold uppercase tracking-widest px-2 py-0.5 rounded ${tutorial.bgClass} ${tutorial.colorClass}`, children: tutorial.category }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-on-surface-variant font-bold", children: [
                "• ",
                tutorial.readTime
              ] })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black font-headline mb-3 text-on-background leading-tight group-hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Link, { to: `/tutorials/${tutorial.id}`, children: tutorial.title }) }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant mb-6 text-sm font-bold leading-relaxed line-clamp-3", children: tutorial.description }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/tutorials/${tutorial.id}`,
                className: `inline-flex items-center gap-2 px-8 py-3 rounded-full font-headline font-black text-sm transition-transform group-hover:-translate-y-1 ${tutorial.bgClass} text-on-background border-4 border-on-background shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a]`,
                children: [
                  "Read Guide",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ]
        },
        tutorial.id
      )) }) })
    ] })
  ] });
}
const Tutorials$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tutorials
}, Symbol.toStringTag, { value: "Module" }));
function formatTitle(segment) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  if (pathnames.length === 0) {
    return null;
  }
  const crumbs = pathnames.map((segment, index) => {
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
    let label = formatTitle(segment);
    if (pathnames[0] === "tutorials" && index === 1 && tutorialMetadataById[segment]) {
      label = tutorialMetadataById[segment].title;
    }
    if (pathnames[0] === "blog" && index === 1 && blogMetadataBySlug[segment]) {
      label = blogMetadataBySlug[segment].title;
    }
    return { href, label };
  });
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://algostory.com/"
      },
      ...crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.label,
        item: `https://algostory.com${crumb.href}`
      }))
    ]
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }) }),
    /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mb-6 flex items-center gap-2 px-4 text-sm font-medium text-on-surface-variant", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center hover:text-primary transition-colors", children: [
        /* @__PURE__ */ jsx(Home$2, { className: "mr-1 h-4 w-4" }),
        "Home"
      ] }),
      crumbs.map((crumb, index) => {
        const last = index === crumbs.length - 1;
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 opacity-50" }),
          last ? /* @__PURE__ */ jsx("span", { className: "max-w-[200px] truncate font-bold text-on-surface md:max-w-max", "aria-current": "page", children: crumb.label }) : /* @__PURE__ */ jsx(Link, { to: crumb.href, className: "max-w-[150px] truncate hover:text-primary transition-colors md:max-w-max", children: crumb.label })
        ] }, crumb.href);
      })
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[70vh] flex flex-col items-center justify-center text-center px-4", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "404 - Page Not Found | AlgoStory",
        description: "The page you are looking for has been moved or doesn't exist.",
        path: "/404",
        robots: "noindex, follow"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "w-32 h-32 bg-error-container rounded-full flex items-center justify-center mb-8 shadow-[8px_8px_0_#2d2f31] border-4 border-on-background", children: /* @__PURE__ */ jsx(Ghost, { className: "w-16 h-16 text-error animate-bounce" }) }),
    /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl font-headline font-black mb-4", children: [
      "O(NO!) ",
      /* @__PURE__ */ jsx("br", {}),
      " Page Not Found"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-on-surface-variant font-medium max-w-lg mb-8", children: "It looks like the algorithm you were searching for has exceeded its bounds. Let's redirect you back to safety." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/time-complexity-calculator",
          className: "flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-full border-4 border-on-background shadow-[4px_4px_0_#2d2f31] hover:translate-y-1 hover:shadow-none active:translate-y-2 transition-all",
          children: [
            "Go to Home ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/tutorials",
          className: "flex items-center gap-2 px-6 py-3 bg-tertiary text-on-tertiary font-bold rounded-full border-4 border-on-background shadow-[4px_4px_0_#2d2f31] hover:translate-y-1 hover:shadow-none active:translate-y-2 transition-all",
          children: "Browse Tutorials"
        }
      )
    ] })
  ] });
}
const NotFound$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
function TutorialPost() {
  const { slug } = useParams();
  const [isHydrated, setIsHydrated] = useState(false);
  const tutorial = slug ? tutorialsById[slug] : void 0;
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (!tutorial) {
    return /* @__PURE__ */ jsx(NotFound, {});
  }
  const relatedTutorials = tutorialMetadata.filter((item) => item.id !== tutorial.id && item.category === tutorial.category).slice(0, 3);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: tutorial.title,
      description: tutorial.description,
      datePublished: "2024-01-01",
      author: {
        "@type": "Organization",
        name: "AlgoStory",
        url: "https://algostory.com"
      },
      publisher: {
        "@type": "Organization",
        name: "AlgoStory",
        logo: {
          "@type": "ImageObject",
          url: "https://algostory.com/logo.png"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://algostory.com/tutorials/${tutorial.id}`
      },
      url: `https://algostory.com/tutorials/${tutorial.id}`,
      articleSection: tutorial.category,
      keywords: `${tutorial.title}, ${tutorial.category}, algorithm, big o notation`
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl py-8", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: `${tutorial.title} | AlgoStory Tutorials`,
        description: tutorial.description,
        path: `/tutorials/${tutorial.id}`,
        keywords: `${tutorial.title}, ${tutorial.category}, algorithm tutorial, big o, time complexity, space complexity`,
        type: "article",
        schema
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, {}),
    /* @__PURE__ */ jsxs("main", { className: "rounded-3xl border-4 border-on-background bg-white p-8 shadow-[12px_12px_0_#0f172a] md:p-12", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-10 border-b-4 border-on-background/10 pb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-3 text-sm font-bold", children: [
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary-container px-3 py-1 text-primary", children: tutorial.category }),
          /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: tutorial.readTime })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mb-4 font-headline text-4xl font-black leading-tight text-on-background md:text-5xl", children: tutorial.title }),
        /* @__PURE__ */ jsx("p", { className: "max-w-3xl text-lg font-bold leading-relaxed text-on-surface-variant", children: tutorial.description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "prose prose-lg prose-slate max-w-none font-body", children: isHydrated ? tutorial.content : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: tutorial.description }),
        /* @__PURE__ */ jsxs("p", { children: [
          "This ",
          tutorial.category.toLowerCase(),
          " guide explains the runtime and memory behavior behind ",
          tutorial.title.toLowerCase(),
          ", including practical examples and Big O tradeoffs."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "The full interactive lesson loads immediately after hydration so readers can explore formulas, code snippets, and visual complexity comparisons." })
      ] }) }),
      relatedTutorials.length > 0 ? /* @__PURE__ */ jsxs("section", { className: "mt-14 rounded-3xl border-4 border-on-background bg-surface-container-low p-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-6 font-headline text-3xl font-black uppercase italic tracking-tighter", children: "Related Tutorials" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: relatedTutorials.map((item) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/tutorials/${item.id}`,
            className: "rounded-2xl border-4 border-on-background bg-white p-5 shadow-[6px_6px_0_#0f172a] transition-transform hover:-translate-y-1",
            children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs font-black uppercase tracking-widest text-primary", children: item.category }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 font-headline text-xl font-black leading-tight", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-bold leading-relaxed text-on-surface-variant", children: item.description }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-black text-primary", children: [
                "Read Guide",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] })
            ]
          },
          item.id
        )) })
      ] }) : null
    ] })
  ] });
}
const TutorialPost$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TutorialPost
}, Symbol.toStringTag, { value: "Module" }));
function InsideMath() {
  const [code, setCode] = useState(`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const isServer = typeof window === "undefined";
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };
  const handleAnalyze = async () => {
    var _a;
    if (!code.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const { analyzeCodeStepByStep } = await import("./assets/gemini-z3KVUO2H.js");
      const res = await analyzeCodeStepByStep(code);
      setResult(res);
    } catch (error) {
      console.error("Analysis failed:", error);
      if ((_a = error == null ? void 0 : error.message) == null ? void 0 : _a.includes("429")) {
        alert("The math wizards are taking a quick water break. Please try again in 60 seconds (Quota Exceeded).");
      } else {
        alert("Failed to analyze code. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen max-w-7xl mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Complexity Lab: Line-By-Line Code Analysis | AlgoStory",
        description: "Analyze your algorithms step-by-step. Get a mathematical breakdown of loops, recursion, and Big O notation.",
        path: "/inside-math",
        keywords: "big o breakdown, line by line complexity analysis, recursion analysis, algorithm math",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AlgoStory Complexity Lab",
          description: "Step-by-step mathematical breakdown of time and space complexity.",
          url: "https://algostory.com/inside-math"
        }
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, {}),
    /* @__PURE__ */ jsxs("section", { className: "mb-8 sm:mb-16 text-center px-4", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-headline font-black text-4xl sm:text-6xl md:text-8xl text-on-background tracking-tighter mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 italic uppercase", children: [
        /* @__PURE__ */ jsx(Calculator, { className: "w-12 h-12 sm:w-16 sm:h-16 text-primary" }),
        "Inside the Math"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-md sm:text-xl font-bold max-w-3xl mx-auto", children: "Paste your code and we'll break it down line-by-line to show you exactly how the Big O complexity is calculated." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("section", { className: "lg:col-span-5 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-on-background rounded-3xl overflow-hidden border-4 border-on-background shadow-[12px_12px_0_#0f172a]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-on-background/50 border-b-2 border-on-background/30", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-error" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-tertiary" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-primary-fixed-dim" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleCopy,
                  className: "text-white hover:text-primary transition-colors flex items-center gap-1 font-label text-xs uppercase tracking-widest font-black bg-white/10 px-3 py-1 rounded-lg border border-white/20 cursor-pointer",
                  title: "Copy Code",
                  children: [
                    copied ? /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }),
                    copied ? "Copied" : "Copy"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-white font-label text-xs uppercase tracking-widest font-black", children: "your_code" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-[#1d1f21] min-h-[400px] max-h-[600px] overflow-auto", children: isServer ? /* @__PURE__ */ jsx("pre", { className: "overflow-auto p-6 text-sm text-white", children: /* @__PURE__ */ jsx("code", { children: code }) }) : /* @__PURE__ */ jsx(
            Editor,
            {
              value: code,
              onValueChange: (value) => setCode(value),
              highlight: (value) => Prism.highlight(value, Prism.languages.python, "python"),
              padding: 24,
              style: {
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: 14,
                backgroundColor: "transparent"
              },
              className: "text-white"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleAnalyze,
            disabled: isAnalyzing,
            className: "w-full bg-primary text-white py-4 sm:py-5 rounded-3xl font-headline font-black text-xl sm:text-2xl uppercase tracking-tighter border-4 border-on-background shadow-[0_6px_0_#064e3b] sm:shadow-[0_8px_0_#064e3b] hover:translate-y-1 hover:shadow-[0_4px_0_#064e3b] sm:hover:shadow-[0_6px_0_#064e3b] active:translate-y-3 active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3",
            children: isAnalyzing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" }),
              "Crunching..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8" }),
              "Break Down Code"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "lg:col-span-7", children: [
        !result && !isAnalyzing && /* @__PURE__ */ jsxs("div", { className: "h-full min-h-[400px] flex flex-col items-center justify-center text-on-surface-variant border-4 border-dashed border-outline-variant rounded-xl p-8 text-center bg-surface-container-lowest", children: [
          /* @__PURE__ */ jsx(ListOrdered, { className: "w-16 h-16 mb-4 text-outline" }),
          /* @__PURE__ */ jsx("h3", { className: "font-headline font-bold text-2xl mb-2", children: "Awaiting Code" }),
          /* @__PURE__ */ jsx("p", { children: 'Click "Break Down Code" to see the line-by-line mathematical analysis.' })
        ] }),
        isAnalyzing && /* @__PURE__ */ jsxs("div", { className: "h-full min-h-[400px] flex flex-col items-center justify-center text-primary border-4 border-on-background rounded-3xl p-8 text-center bg-white shadow-[12px_12px_0_#0f172a]", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 border-8 border-primary border-t-transparent rounded-full animate-spin mb-6" }),
          /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-3xl animate-pulse uppercase italic", children: "Analyzing paths..." })
        ] }),
        result && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 sm:p-10 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#0f172a] sm:shadow-[12px_12px_0_#0f172a] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-headline font-black text-xl sm:text-2xl uppercase tracking-tighter text-on-surface-variant mb-1 sm:mb-2 italic", children: "Overall Complexity" }),
              /* @__PURE__ */ jsx("p", { className: "text-md sm:text-lg font-bold", children: "The final calculated cost of the algorithm." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-primary/5 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-4 border-primary text-center shadow-[4px_4px_0_rgba(5,150,105,0.1)] sm:shadow-[6px_6px_0_rgba(5,150,105,0.1)]", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 opacity-80", children: "Time" }),
                /* @__PURE__ */ jsx("div", { className: "font-headline font-black text-2xl sm:text-4xl leading-none", children: result.overallTimeComplexity })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-secondary/5 text-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-4 border-secondary text-center shadow-[4px_4px_0_rgba(2,132,199,0.1)] sm:shadow-[6px_6px_0_rgba(2,132,199,0.1)]", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 opacity-80", children: "Space" }),
                /* @__PURE__ */ jsx("div", { className: "font-headline font-black text-2xl sm:text-4xl leading-none", children: result.overallSpaceComplexity })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute left-8 top-8 bottom-8 w-1 bg-outline-variant rounded-full hidden md:block" }),
            result.steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row gap-6 items-start group", children: [
              /* @__PURE__ */ jsx("div", { className: "hidden sm:flex w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-4 border-on-background shadow-[4px_4px_0_#0f172a] sm:shadow-[6px_6px_0_#0f172a] items-center justify-center shrink-0 z-10 font-headline font-black text-2xl sm:text-3xl text-primary", children: index + 1 }),
              /* @__PURE__ */ jsx("div", { className: "flex-grow bg-white p-6 sm:p-8 rounded-3xl border-4 border-on-background shadow-[6px_6px_0_#0f172a] sm:shadow-[8px_8px_0_#0f172a] w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col xl:flex-row gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "xl:w-1/2 space-y-4", children: /* @__PURE__ */ jsx("div", { className: "bg-[#1d1f21] p-4 rounded-lg overflow-x-auto border-2 border-outline", children: /* @__PURE__ */ jsx("pre", { className: "text-sm font-mono text-white m-0", children: /* @__PURE__ */ jsx("code", { dangerouslySetInnerHTML: {
                  __html: isServer ? step.codeSnippet : Prism.highlight(step.codeSnippet, Prism.languages.python, "python")
                } }) }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "xl:w-1/2 flex flex-col justify-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-3", children: /* @__PURE__ */ jsxs("span", { className: "bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full font-label font-bold text-sm border-2 border-tertiary", children: [
                    "Cost: ",
                    step.timeComplexity
                  ] }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-on-surface font-body text-sm leading-relaxed", children: step.explanation })
                ] })
              ] }) })
            ] }, index))
          ] })
        ] })
      ] })
    ] })
  ] });
}
const InsideMath$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: InsideMath
}, Symbol.toStringTag, { value: "Module" }));
const blogPosts = [
  {
    slug: "algorithm-complexity-cheatsheet",
    ...blogMetadataBySlug["algorithm-complexity-cheatsheet"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Memorizing complexities is one thing, but having a clear, comparative view of how different algorithms perform across best, average, and worst-case scenarios is essential for effective problem-solving and system design." }),
      /* @__PURE__ */ jsx("h2", { children: "Sorting Algorithms" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto my-6 border-2 border-black rounded-lg shadow-neobrutalist-sm bg-white", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-black", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[#B0EBB4]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Algorithm" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Best Case" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Average Case" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Worst Case" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold uppercase tracking-wider", children: "Space Complexity" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-black", children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Quicksort" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-green-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(log N)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Mergesort" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-green-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-green-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(N)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Heapsort" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-green-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-green-700 font-mono italic", children: "O(N log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(1)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Bubble Sort" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(1)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Insertion Sort" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(1)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Selection Sort" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N^2)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(1)" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("h2", { children: "Graph Algorithms" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto my-6 border-2 border-black rounded-lg shadow-neobrutalist-sm bg-white", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-black", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[#B0EBB4]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Algorithm" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Time Complexity" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold uppercase tracking-wider", children: "Space Complexity" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-black", children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "DFS / BFS" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(V + E)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(V)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Dijkstra (with Binary Heap)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O((V + E) log V)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(V)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Bellman-Ford" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(VE)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(V)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Floyd-Warshall" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(V^3)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(V^2)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Prim (with Binary Heap)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O((V + E) log V)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(V)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Kruskal" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(E log E)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono italic", children: "O(V)" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("h2", { children: "Data Structure Operations" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto my-6 border-2 border-black rounded-lg shadow-neobrutalist-sm bg-white", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-black", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[#B0EBB4]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Structure" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider", children: "Access / Search" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold uppercase tracking-wider", children: "Insertion / Deletion" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-black", children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Hash Table" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-green-700 font-mono italic", children: "Avg O(1), Worst O(N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-green-700 font-mono italic", children: "Avg O(1), Worst O(N)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Balanced BST (AVL, R-B)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(log N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-blue-700 font-mono italic", children: "O(log N)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Stack / Queue" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-blue-700 font-mono italic", children: "O(N) (top is O(1))" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-blue-700 font-mono italic", children: "O(1)" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]", children: "Linked List" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 border-r border-black text-red-700 font-mono italic", children: "O(N)" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-blue-700 font-mono italic", children: "O(1)" })
          ] })
        ] })
      ] }) })
    ] })
  },
  {
    slug: "big-o-notation-explained",
    ...blogMetadataBySlug["big-o-notation-explained"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Big O notation describes how the work done by an algorithm grows as the input grows. It does not try to predict the exact number of milliseconds on your laptop. Instead, it gives you a stable way to compare strategies as the problem gets larger." }),
      /* @__PURE__ */ jsx("h2", { children: "Why Engineers Use Big O" }),
      /* @__PURE__ */ jsx("p", { children: "Two pieces of code can solve the same task but scale very differently. A loop that runs once over an array behaves very differently from a loop inside another loop. Big O gives you the language to explain that difference before the system is under load." }),
      /* @__PURE__ */ jsx("h2", { children: "Common Complexity Classes" }),
      /* @__PURE__ */ jsx("p", { children: "Constant time stays flat. Logarithmic time grows slowly. Linear time grows in proportion to the input. Quadratic time appears when one pass is nested inside another. Exponential growth is usually a sign that brute force or repeated recursion needs to be replaced." }),
      /* @__PURE__ */ jsx("h2", { children: "How To Read It In Real Code" }),
      /* @__PURE__ */ jsx("p", { children: "Start by counting the loops, recursion depth, and any extra data structures. Then ask how those parts depend on input size. If you repeatedly halve the search space, you are likely looking at logarithmic growth. If every element compares with every other element, the runtime is probably quadratic." }),
      /* @__PURE__ */ jsx("p", { children: "AlgoStory is useful here because it translates the code into a readable explanation instead of making you infer every cost manually." })
    ] })
  },
  {
    slug: "bubble-sort-time-complexity",
    ...blogMetadataBySlug["bubble-sort-time-complexity"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Bubble Sort compares adjacent values and swaps them until larger values bubble to the end of the array. The algorithm is easy to understand, which makes it a good teaching tool, but it becomes inefficient quickly as arrays grow." }),
      /* @__PURE__ */ jsx("h2", { children: "Why The Average Case Is O(N^2)" }),
      /* @__PURE__ */ jsx("p", { children: "The outer loop runs across the array, and the inner loop repeats comparisons for nearly every remaining position. That repeated pairwise checking creates a triangular number of operations, which simplifies to quadratic growth." }),
      /* @__PURE__ */ jsx("h2", { children: "When Bubble Sort Improves" }),
      /* @__PURE__ */ jsx("p", { children: "With an optimization that stops early when no swaps happen, Bubble Sort can finish in linear time on an already sorted array. That best-case improvement is real, but it does not fix the average and worst-case cost." }),
      /* @__PURE__ */ jsx("h2", { children: "What To Use Instead" }),
      /* @__PURE__ */ jsx("p", { children: "In production systems, Merge Sort, Quick Sort, or language-native sorting implementations are usually better choices. Bubble Sort remains valuable mainly because it teaches how nested loops translate into runtime growth." })
    ] })
  },
  {
    slug: "merge-sort-time-complexity",
    ...blogMetadataBySlug["merge-sort-time-complexity"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Merge Sort splits an array into smaller halves, sorts each half recursively, and merges the results back together. It is one of the clearest examples of divide and conquer in algorithm design." }),
      /* @__PURE__ */ jsx("h2", { children: "Why The Runtime Is O(N log N)" }),
      /* @__PURE__ */ jsx("p", { children: "Each level of recursion touches every element during the merge step, which costs linear time. The number of levels is logarithmic because the array keeps getting cut in half. Multiply those together and you get O(N log N)." }),
      /* @__PURE__ */ jsx("h2", { children: "Space Complexity Tradeoff" }),
      /* @__PURE__ */ jsx("p", { children: "Merge Sort is fast and stable, but it typically needs extra space to hold intermediate arrays during merging. That makes it different from in-place strategies such as Quick Sort, where memory usage and runtime trade off differently." }),
      /* @__PURE__ */ jsx("h2", { children: "Where It Works Well" }),
      /* @__PURE__ */ jsx("p", { children: "Merge Sort is a strong choice when predictable performance matters and stable ordering is useful. It also transfers well to linked lists and external sorting scenarios where data does not fit neatly into memory." })
    ] })
  },
  {
    slug: "understanding-recursion",
    ...blogMetadataBySlug["understanding-recursion"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Recursion is a process where a function calls itself to solve smaller instances of the same problem. It's the heart of many complex algorithms and is essential for understanding more advanced topics." }),
      /* @__PURE__ */ jsx("h2", { children: "The Base Case: Why It's Critical" }),
      /* @__PURE__ */ jsx("p", { children: "Every recursive function needs a base case—a simple condition that stops the recursion. Without it, the function would keep calling itself forever, leading to a stack overflow error." }),
      /* @__PURE__ */ jsx("h2", { children: "The Recursive Step" }),
      /* @__PURE__ */ jsx("p", { children: "This is where the function calls itself with a slightly modified argument, moving the problem closer to the base case each time. Understanding how these calls stack up is key to visualization." }),
      /* @__PURE__ */ jsx("h2", { children: "Visualizing the Call Stack" }),
      /* @__PURE__ */ jsx("p", { children: "Imagine a stack of books. Each recursive call adds a new book to the top. Only when a base case is reached can you start removing books one by one, returning the result back down the line." })
    ] })
  },
  {
    slug: "backtracking-guide",
    ...blogMetadataBySlug["backtracking-guide"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: 'Backtracking is a refined form of brute force. It builds solutions incrementally and abandons paths ("backtracks") as soon as it determines they cannot lead to a valid solution.' }),
      /* @__PURE__ */ jsx("h2", { children: "State-Space Trees" }),
      /* @__PURE__ */ jsx("p", { children: "Think of the decision process as a tree. Each node represents a state, and each edge is a choice. Backtracking explores this tree, using recursion to go deep into promising branches." }),
      /* @__PURE__ */ jsx("h2", { children: "Pruning: The Secret Sauce" }),
      /* @__PURE__ */ jsx("p", { children: "Pruning is what makes backtracking efficient. By checking constraints early, we can avoid exploring huge sections of the tree that would never work, saving massive amounts of computation." }),
      /* @__PURE__ */ jsx("h2", { children: "Common Applications" }),
      /* @__PURE__ */ jsx("p", { children: "From solving puzzles like Sudoku and N-Queens to finding paths in a maze, backtracking is the go-to strategy for problems involving a sequence of interdependent choices." })
    ] })
  },
  {
    slug: "segment-trees-mastery",
    ...blogMetadataBySlug["segment-trees-mastery"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "A Segment Tree is a powerful data structure designed to handle range-based queries and updates efficiently. It's a staple in competitive programming for tasks involving intervals." }),
      /* @__PURE__ */ jsx("h2", { children: "The Logarithmic Advantage" }),
      /* @__PURE__ */ jsx("p", { children: "In a standard array, range sums might take O(N) and updates O(1). A segment tree balances this, making both operations O(log N). This is critical when dealing with thousands of queries." }),
      /* @__PURE__ */ jsx("h2", { children: "Hierarchical Structure" }),
      /* @__PURE__ */ jsx("p", { children: "Leaf nodes represent individual array elements, while internal nodes store pre-aggregated data (like sums or minimums) for their child segments. This hierarchy speeds up the lookup process." }),
      /* @__PURE__ */ jsx("h2", { children: "Building and Querying" }),
      /* @__PURE__ */ jsx("p", { children: "Building a segment tree takes O(N) time. Once built, you can query any sub-range by traversing the tree and combining the pre-calculated results of relevant segments." })
    ] })
  },
  {
    slug: "bit-manipulation-hacks",
    ...blogMetadataBySlug["bit-manipulation-hacks"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Computers operate on bits. Bit manipulation involves using bitwise operators like AND, OR, XOR, and shifts to perform tasks at lightning speed, often in O(1)." }),
      /* @__PURE__ */ jsx("h2", { children: "The Power of XOR" }),
      /* @__PURE__ */ jsx("p", { children: "XOR has the unique property that `X ^ X = 0` and `X ^ 0 = X`. This makes it incredibly useful for finding the unique element in an array where every other element appears twice." }),
      /* @__PURE__ */ jsx("h2", { children: "Setting and Clearing Bits" }),
      /* @__PURE__ */ jsx("p", { children: "Learn how to use masks to check if a specific bit is set, or to set/clear bits without affecting others. This is essential for memory-efficient state representation (bitmasks)." }),
      /* @__PURE__ */ jsx("h2", { children: "Shift Operators and Powers of Two" }),
      /* @__PURE__ */ jsx("p", { children: "Left shifting by K is equivalent to multiplying by 2^K, and right shifting is like dividing. These operations are handled directly at the CPU level, making them faster than standard arithmetic." })
    ] })
  },
  {
    slug: "dynamic-programming-optimization",
    ...blogMetadataBySlug["dynamic-programming-optimization"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Dynamic Programming (DP) is about solving complex problems by breaking them into overlapping subproblems and storing their results to avoid redundant calculations." }),
      /* @__PURE__ */ jsx("h2", { children: "Overlapping Subproblems" }),
      /* @__PURE__ */ jsx("p", { children: "If you solve the same sub-task multiple times (like in naive Fibonacci), you're wasting time. DP identifies these overlaps and ensures each is only computed once." }),
      /* @__PURE__ */ jsx("h2", { children: "Memoization vs. Tabulation" }),
      /* @__PURE__ */ jsx("p", { children: "Memoization is the top-down approach that caches results of recursive calls. Tabulation is the bottom-up approach that builds a table iteratively. Both lead to the same efficiency." }),
      /* @__PURE__ */ jsx("h2", { children: "The Transition Function" }),
      /* @__PURE__ */ jsx("p", { children: "The core of any DP problem is finding the recurrence relation (transition) that describes how the solution to a larger problem depends on the solutions to smaller ones." })
    ] })
  },
  {
    slug: "graph-representation",
    ...blogMetadataBySlug["graph-representation"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Graphs are fundamental data structures that represent relationships between objects. Representing them efficiently is critical for algorithm performance." }),
      /* @__PURE__ */ jsx("h2", { children: "Adjacency Matrices: O(1) Lookup" }),
      /* @__PURE__ */ jsx("p", { children: "An adjacency matrix uses an N x N grid to show connections. It's fast for checking if two nodes are connected, but it consumes O(N^2) space even if the graph has very few edges." }),
      /* @__PURE__ */ jsx("h2", { children: "Adjacency Lists: Space-Saving King" }),
      /* @__PURE__ */ jsx("p", { children: "Adjacency lists only store the edges that actually exist, making them ideal for sparse graphs. They use O(V + E) space and are generally the preferred choice for most graph algorithms." }),
      /* @__PURE__ */ jsx("h2", { children: "Choosing the Right Format" }),
      /* @__PURE__ */ jsx("p", { children: "If your graph is dense (nearly every node connects to every other), use a matrix. For sparse graphs, an adjacency list is almost always better for speed and memory." })
    ] })
  },
  {
    slug: "sorting-algorithms-comparison",
    ...blogMetadataBySlug["sorting-algorithms-comparison"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Not all sorting algorithms are created equal. Understanding the difference between O(N log N) and O(N^2) is just the beginning of choosing the right tool." }),
      /* @__PURE__ */ jsx("h2", { children: "Comparison-Based vs. Distributed" }),
      /* @__PURE__ */ jsx("p", { children: "Quicksort and mergesort compare values directly. Distributed sorts like Counting Sort don't—they count frequencies instead, allowing them to reach O(N) in specific cases with limited value ranges." }),
      /* @__PURE__ */ jsx("h2", { children: "Stability and In-Place Sorting" }),
      /* @__PURE__ */ jsx("p", { children: "A stable sort (like Merge Sort) preserves the relative order of equal elements. An in-place sort (like Quick Sort) uses no extra memory, which is critical when system resources are tight." }),
      /* @__PURE__ */ jsx("h2", { children: "The Hybrid Approach" }),
      /* @__PURE__ */ jsx("p", { children: "Modern languages often use hybrid sorts like Timsort (Python/Java), which combines Merge Sort and Insertion Sort to exploit patterns already existing in real-world data." })
    ] })
  },
  {
    slug: "linked-lists-vs-arrays",
    ...blogMetadataBySlug["linked-lists-vs-arrays"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Arrays and linked lists are the building blocks of most other data structures. Both store linear sequences, but their performance profiles are worlds apart." }),
      /* @__PURE__ */ jsx("h2", { children: "Arrays: Random Access Power" }),
      /* @__PURE__ */ jsx("p", { children: "Arrays provide O(1) access to any element via its index because they are stored contiguously. However, inserting or deleting elements from the middle requires O(N) shifting." }),
      /* @__PURE__ */ jsx("h2", { children: "Linked Lists: Fast Insertions" }),
      /* @__PURE__ */ jsx("p", { children: "Linked lists excel at insertions and deletions because you only need to update a few pointers. The downside is that finding an element requires O(N) traversal." }),
      /* @__PURE__ */ jsx("h2", { children: "Memory Layout and Caching" }),
      /* @__PURE__ */ jsx("p", { children: "Arrays are much more cache-friendly because their elements are physically next to each other. Linked lists involve jumping around in memory, which can be significantly slower in practice." })
    ] })
  },
  {
    slug: "hash-map-collisions",
    ...blogMetadataBySlug["hash-map-collisions"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Hash maps provide O(1) magic, but that magic depends on a good hash function and a solid strategy for handling the inevitable collisions." }),
      /* @__PURE__ */ jsx("h2", { children: "What is a Collision?" }),
      /* @__PURE__ */ jsx("p", { children: "A collision happens when two different keys hash to the same index. Even the best hash functions cannot avoid this entirely due to the Pigeonhole Principle." }),
      /* @__PURE__ */ jsx("h2", { children: "Chaining: Storing Lists at buckets" }),
      /* @__PURE__ */ jsx("p", { children: "In separate chaining, every bucket in the table holds a linked list. When multiple keys collide, they are simply appended to the list at that index." }),
      /* @__PURE__ */ jsx("h2", { children: "Open Addressing: Finding the Next Hole" }),
      /* @__PURE__ */ jsx("p", { children: "Linear probing and quadratic probing look for the next empty spot in the table if a collision occurs. This keeps data in a single array, improving cache performance but increasing complexity." })
    ] })
  },
  {
    slug: "balanced-bst-trees",
    ...blogMetadataBySlug["balanced-bst-trees"],
    content: /* @__PURE__ */ jsxs("article", { className: "prose prose-slate max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "A standard Binary Search Tree (BST) can degrade into a linked list, making operations O(N). Balanced trees ensure that this never happens, keeping the tree height at log N." }),
      /* @__PURE__ */ jsx("h2", { children: "AVL Trees: Strict Balance" }),
      /* @__PURE__ */ jsx("p", { children: "AVL trees use rotations to ensure the height difference between child subtrees is never more than one. This makes them great for read-heavy workloads where fast lookups are crucial." }),
      /* @__PURE__ */ jsx("h2", { children: "Red-Black Trees: Performance over Precision" }),
      /* @__PURE__ */ jsx("p", { children: "Red-Black trees allow for slightly less perfect balance than AVL trees, but they require fewer rotations during insertions and deletions, making them faster for write-intensive tasks." }),
      /* @__PURE__ */ jsx("h2", { children: "Self-Balancing Logic" }),
      /* @__PURE__ */ jsx("p", { children: "The core concept is that every operation that modifies the tree also checks for balance. If the tree becomes lopsided, a sequence of re-coloring and rotations restores the logarithmic height." })
    ] })
  }
];
const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post])
);
function BlogIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AlgoStory Blog",
    description: "Algorithm explainers covering Big O notation, sorting complexity, and practical code analysis.",
    url: "https://algostory.com/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://algostory.com/blog/${post.slug}`,
        name: post.title
      }))
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "AlgoStory Blog: Big O Guides, Sorting Analysis, and Algorithm Articles",
        description: "Read algorithm explainers on Big O notation, Bubble Sort, Merge Sort, and practical code complexity analysis.",
        path: "/blog",
        keywords: "big o notation, algorithm blog, sorting algorithms, complexity analysis, interview preparation",
        schema
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "mb-14 flex flex-col gap-6 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-fit rounded-full border-2 border-on-background bg-primary px-4 py-1 font-label text-xs font-black text-white shadow-[3px_3px_0_#064e3b]", children: "SEO CONTENT HUB" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline text-4xl font-black uppercase italic tracking-tighter sm:text-6xl", children: "The AlgoStory Blog" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg font-bold text-on-surface-variant", children: "Practical guides on Big O notation, algorithm design, and the runtime patterns that show up again and again in interviews and production code." })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "grid gap-8 md:grid-cols-2 xl:grid-cols-3", children: blogPosts.map((post, index) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: `rounded-3xl border-4 border-on-background bg-white p-8 shadow-[10px_10px_0_#0f172a] transition-transform hover:-translate-y-1 ${index % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "rounded-2xl border-4 border-on-background bg-secondary-container p-4 shadow-[4px_4px_0_#0f172a]", children: /* @__PURE__ */ jsx(BookOpen, { className: "h-8 w-8 text-on-secondary-container" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-on-surface-variant", children: post.readTime })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mb-3 font-headline text-3xl font-black leading-tight text-on-background", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, className: "hover:text-primary", children: post.title }) }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm font-bold leading-relaxed text-on-surface-variant", children: post.description }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/blog/${post.slug}`,
              className: "inline-flex items-center gap-2 rounded-full border-4 border-on-background bg-primary px-6 py-3 font-headline text-sm font-black uppercase text-white shadow-[4px_4px_0_#064e3b] transition-transform hover:-translate-y-1",
              children: [
                "Read Article",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          )
        ]
      },
      post.slug
    )) })
  ] });
}
const BlogIndex$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogIndex
}, Symbol.toStringTag, { value: "Module" }));
function BlogPost() {
  const { slug } = useParams();
  if (!slug || !blogPostBySlug[slug]) {
    return /* @__PURE__ */ jsx(NotFound, {});
  }
  const post = blogPostBySlug[slug];
  const relatedPosts = blogPosts.filter((item) => item.slug !== slug).slice(0, 2);
  const url = `https://algostory.com/blog/${slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      author: {
        "@type": "Organization",
        name: "AlgoStory"
      },
      publisher: {
        "@type": "Organization",
        name: "AlgoStory",
        logo: {
          "@type": "ImageObject",
          url: "https://algostory.com/favicon.png"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url
      },
      url
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto py-8", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: `${post.title} | AlgoStory Blog`,
        description: post.description,
        path: `/blog/${slug}`,
        type: "article",
        keywords: `${post.title}, algorithm, big o notation, sorting, complexity analysis`,
        schema: structuredData
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, {}),
    /* @__PURE__ */ jsxs("main", { className: "surface-container-lowest p-8 md:p-12 rounded-3xl border-4 border-on-background shadow-[12px_12px_0_#2d2f31]", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "w-16 h-16 text-primary mx-auto mb-6" }),
        /* @__PURE__ */ jsx("h1", { className: "font-headline font-black text-4xl md:text-5xl leading-tight mb-4", children: post.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-on-surface-variant italic", children: post.description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-on-background/10 h-1 w-full my-8 rounded-full" }),
      post.content,
      /* @__PURE__ */ jsxs("div", { className: "mt-16 p-6 bg-secondary-container rounded-xl border-2 border-on-background flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "w-8 h-8 text-on-secondary-container shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg text-on-secondary-container mb-2", children: "Want to see this in action?" }),
          /* @__PURE__ */ jsx("p", { className: "text-on-secondary-container mb-4", children: "Jump directly into our interactive analyzer to see how code translates to mathematical growth." }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/time-complexity-calculator",
              className: "inline-flex items-center gap-2 px-6 py-2 bg-on-background text-background font-bold rounded-lg shadow-sm hover:translate-y-px transition-transform",
              children: [
                "Go To Calculator",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-6 font-headline text-3xl font-black uppercase italic tracking-tighter", children: "Related Articles" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2", children: relatedPosts.map((item) => /* @__PURE__ */ jsxs(
          "article",
          {
            className: "rounded-3xl border-4 border-on-background bg-white p-6 shadow-[8px_8px_0_#0f172a]",
            children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs font-black uppercase tracking-widest text-primary", children: item.readTime }),
              /* @__PURE__ */ jsx("h3", { className: "mb-3 font-headline text-2xl font-black leading-tight", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${item.slug}`, className: "hover:text-primary", children: item.title }) }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-bold leading-relaxed text-on-surface-variant", children: item.description }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/blog/${item.slug}`,
                  className: "inline-flex items-center gap-2 text-sm font-black text-primary",
                  children: [
                    "Read Article",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ]
          },
          item.slug
        )) })
      ] })
    ] })
  ] });
}
const BlogPost$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogPost
}, Symbol.toStringTag, { value: "Module" }));
function AppRoutesServer() {
  return /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(Layout, {}), children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "time-complexity-calculator", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "space-complexity-calculator", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "tutorials", element: /* @__PURE__ */ jsx(Tutorials, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "tutorials/:slug", element: /* @__PURE__ */ jsx(TutorialPost, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "inside-math", element: /* @__PURE__ */ jsx(InsideMath, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "complexity-lab", element: /* @__PURE__ */ jsx(Navigate, { to: "/inside-math", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "blog", element: /* @__PURE__ */ jsx(BlogIndex, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "blog/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "big-o-notation-explained", element: /* @__PURE__ */ jsx(Navigate, { to: "/blog/big-o-notation-explained", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "bubble-sort-time-complexity", element: /* @__PURE__ */ jsx(Navigate, { to: "/blog/bubble-sort-time-complexity", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "merge-sort-time-complexity", element: /* @__PURE__ */ jsx(Navigate, { to: "/blog/merge-sort-time-complexity", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] }) });
}
class ErrorBoundary extends React__default.Component {
  constructor() {
    super(...arguments);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    var _a;
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-surface p-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-error-container text-on-error-container p-8 rounded-2xl max-w-lg shadow-xl border-4 border-on-background", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-headline font-black text-3xl mb-4", children: "Oops! Something broke." }),
        /* @__PURE__ */ jsx("p", { className: "font-body mb-4", children: "The code gremlins got into the machine." }),
        /* @__PURE__ */ jsx("pre", { className: "bg-on-background text-surface p-4 rounded-xl overflow-auto text-sm font-label", children: (_a = this.state.error) == null ? void 0 : _a.message }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => this.setState({ hasError: false, error: null }),
            className: "mt-6 bg-on-background text-surface px-6 py-2 rounded-full font-headline font-bold hover:scale-105 transition-transform",
            children: "Try Again"
          }
        )
      ] }) });
    }
    return this.props.children;
  }
}
function renderHead(context) {
  var _a, _b, _c, _d;
  const helmet = context.helmet;
  if (!helmet) {
    return "";
  }
  return [
    ((_a = helmet.title) == null ? void 0 : _a.toString()) ?? "",
    ((_b = helmet.meta) == null ? void 0 : _b.toString()) ?? "",
    ((_c = helmet.link) == null ? void 0 : _c.toString()) ?? "",
    ((_d = helmet.script) == null ? void 0 : _d.toString()) ?? ""
  ].join("");
}
function splitHeadTagsFromMarkup(markup) {
  const tagPatterns = [
    /^<title\b[\s\S]*?<\/title>/i,
    /^<meta\b[^>]*>/i,
    /^<link\b[^>]*>/i,
    /^<script\b[\s\S]*?<\/script>/i
  ];
  let remainingMarkup = markup;
  let headTags = "";
  while (true) {
    const match = tagPatterns.map((pattern) => remainingMarkup.match(pattern)).find(Boolean);
    if (!match) {
      break;
    }
    headTags += match[0];
    remainingMarkup = remainingMarkup.slice(match[0].length);
  }
  return {
    headTags,
    appHtml: remainingMarkup
  };
}
async function renderRoute(url) {
  const helmetContext = {};
  const appHtml = await new Promise((resolve, reject) => {
    const stream = new PassThrough();
    let html = "";
    let abortTimer;
    stream.on("data", (chunk) => {
      html += chunk.toString();
    });
    stream.on("end", () => {
      if (abortTimer) {
        clearTimeout(abortTimer);
      }
      resolve(html);
    });
    stream.on("error", (error) => {
      if (abortTimer) {
        clearTimeout(abortTimer);
      }
      reject(error);
    });
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user: null, loading: false }, children: /* @__PURE__ */ jsx(MemoryRouter, { initialEntries: [url], children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(LoadingFallback, {}), children: /* @__PURE__ */ jsx(AppRoutesServer, {}) }) }) }) }) }),
      {
        onAllReady() {
          pipe(stream);
        },
        onError(error) {
          if (abortTimer) {
            clearTimeout(abortTimer);
          }
          reject(error);
        }
      }
    );
    abortTimer = setTimeout(() => abort(), 15e3);
  });
  const extracted = splitHeadTagsFromMarkup(appHtml);
  const contextHead = renderHead(helmetContext);
  return {
    appHtml: extracted.appHtml,
    headTags: extracted.headTags || contextHead
  };
}
export {
  renderRoute
};
