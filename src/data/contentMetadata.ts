import { getEnv } from '../utils/env';

const DEFAULT_SITE_URL = 'https://timecomplexityai.vercel.app';

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, '');
}

export const SITE_URL = normalizeSiteUrl(
  getEnv('VITE_SITE_URL') || getEnv('APP_URL') || DEFAULT_SITE_URL,
);
export const SITE_NAME = 'TimeComplexityAI';

export const homeRouteMetadata = {
  '/': {
    title: 'TimeComplexityAI | Time Complexity Calculator, Big O Guides, and Algorithm Tutorials',
    description:
      'Learn Big O notation, analyze code complexity, and explore algorithm tutorials. Use the free time complexity calculator, space complexity calculator, and step-by-step complexity lab.',
    heading: 'Every line of code tells a story.',
    intro:
      'Use the calculator for quick answers, then go deeper with Big O guides, tutorials, and line-by-line explanations.',
  },
  '/time-complexity-calculator': {
    title: 'Time Complexity Calculator & Big O Calculator | Free Code Analyzer | TimeComplexityAI',
    description:
      'Free time complexity calculator and Big O calculator for Python, JavaScript, Java, C, and C++. Paste code to estimate runtime complexity and get AI explanations.',
    heading: 'Time complexity calculator',
    intro:
      'Paste code and get an AI-assisted breakdown of runtime growth, loop nesting, recursion, and Big O behavior.',
  },
  '/space-complexity-calculator': {
    title: 'Space Complexity Calculator | Free Memory Complexity Analyzer | TimeComplexityAI',
    description:
      'Free space complexity calculator to estimate auxiliary memory, recursion stack usage, and memory growth for Python, JavaScript, Java, C, and C++.',
    heading: 'Space complexity calculator',
    intro:
      'Paste your code and get an AI-assisted explanation of memory growth, auxiliary storage, and recursion stack usage.',
  },
} as const;

export const tutorialMetadataById = {
  'binary-search': {
    title: 'Binary Search: The Art of Halving',
    category: 'Searching',
    readTime: '8 min read',
    description:
      'Learn how to find an element in a sorted array in O(log N) time by repeatedly dividing the search interval in half.',
  },
  'merge-sort': {
    title: 'Merge Sort: Divide and Conquer',
    category: 'Sorting',
    readTime: '12 min read',
    description:
      'A highly efficient, stable sorting algorithm that uses the divide and conquer paradigm to sort arrays in O(N log N) time.',
  },
  dijkstra: {
    title: "Dijkstra's Shortest Path",
    category: 'Graphs',
    readTime: '15 min read',
    description:
      'Find the shortest paths between nodes in a graph. Essential for routing, navigation, and network analysis.',
  },
  'dynamic-programming': {
    title: '0/1 Knapsack (Dynamic Programming)',
    category: 'Advanced',
    readTime: '20 min read',
    description:
      'Master Dynamic Programming by solving the classic 0/1 Knapsack problem. Learn to build the DP table.',
  },
  'quick-sort': {
    title: 'Quick Sort: The Pivot Master',
    category: 'Sorting',
    readTime: '10 min read',
    description:
      'An efficient, in-place sorting algorithm that partitions an array around a pivot element.',
  },
  bfs: {
    title: 'Breadth-First Search (BFS)',
    category: 'Graphs',
    readTime: '10 min read',
    description:
      'Explore a graph level by level. Perfect for finding the shortest path in unweighted graphs.',
  },
  dfs: {
    title: 'Depth-First Search (DFS)',
    category: 'Graphs',
    readTime: '10 min read',
    description:
      'Dive deep into a graph before backtracking. Useful for topological sorting and finding connected components.',
  },
  'two-pointers': {
    title: 'Two Pointers Technique',
    category: 'Arrays',
    readTime: '8 min read',
    description:
      'Optimize array and string problems by using two references to iterate from different ends or at different speeds.',
  },
  'sliding-window': {
    title: 'Sliding Window',
    category: 'Arrays',
    readTime: '12 min read',
    description:
      'Efficiently solve problems involving contiguous subarrays or substrings by maintaining a moving window of elements.',
  },
  'bubble-sort': {
    title: 'Bubble Sort: The Simple Sorter',
    category: 'Sorting',
    readTime: '7 min read',
    description:
      'The simplest sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if needed.',
  },
  'insertion-sort': {
    title: 'Insertion Sort: Building a Sorted Array',
    category: 'Sorting',
    readTime: '8 min read',
    description:
      'Build a sorted array one element at a time by inserting each element into its correct position in the sorted portion.',
  },
  'linear-search': {
    title: 'Linear Search: Sequential Scanning',
    category: 'Searching',
    readTime: '6 min read',
    description:
      'Find an element in an unsorted list by checking each element sequentially until the target is found.',
  },
  'hash-table': {
    title: 'Hash Tables: O(1) Lookup Magic',
    category: 'Data Structures',
    readTime: '14 min read',
    description:
      'Master the art of constant-time lookups using hash tables. Understand collisions, load factors, and practical implementations.',
  },
  'linked-list': {
    title: 'Linked Lists: Dynamic Data Storage',
    category: 'Data Structures',
    readTime: '12 min read',
    description:
      'Learn how linked lists provide dynamic memory allocation and efficient insertion/deletion compared to arrays.',
  },
  'stack-queue': {
    title: 'Stacks & Queues: LIFO and FIFO',
    category: 'Data Structures',
    readTime: '11 min read',
    description:
      'Understand the fundamental abstract data types: stacks (Last-In-First-Out) and queues (First-In-First-Out).',
  },
  'tree-traversal': {
    title: 'Tree Traversal: In, Pre, Post Order',
    category: 'Trees',
    readTime: '13 min read',
    description:
      'Master inorder, preorder, and postorder tree traversals. Learn when to use each approach for different problems.',
  },
  'binary-tree-search': {
    title: 'Binary Search Tree: Ordered Excellence',
    category: 'Trees',
    readTime: '14 min read',
    description:
      'Explore balanced and unbalanced binary search trees for efficient searching, insertion, and deletion operations.',
  },
} as const;

export const tutorialMetadata = Object.entries(tutorialMetadataById).map(([id, value]) => ({
  id,
  ...value,
}));

export const blogMetadataBySlug = {
  'algorithm-complexity-cheatsheet': {
    title: 'Algorithm Complexity Cheatsheet: The Ultimate Comparison',
    description:
      'A comprehensive reference table for time and space complexities of sorting, graph algorithms, and common DSA patterns.',
    readTime: '15 min read',
  },
  'how-to-calculate-time-complexity': {
    title: 'How to Calculate Time Complexity: Step-by-Step Guide With Examples',
    description:
      'Learn how to calculate time complexity from loops, recursion, and data structures, with practical examples and a faster way to check your code.',
    readTime: '10 min read',
  },
  'big-o-notation-explained': {
    title: 'Big O Notation Explained: The Ultimate Guide',
    description:
      'Learn what Big O notation means, how to read common complexity classes, and how to compare algorithms with practical examples.',
    readTime: '9 min read',
  },
  'bubble-sort-time-complexity': {
    title: 'Bubble Sort Time Complexity: A Deep Dive',
    description:
      'Understand why Bubble Sort is O(N^2), when its best case improves, and how nested loops shape runtime.',
    readTime: '7 min read',
  },
  'merge-sort-time-complexity': {
    title: 'Merge Sort Time Complexity: O(N log N) Explained',
    description:
      'A practical explanation of Merge Sort with divide-and-conquer reasoning, recurrence intuition, and space tradeoffs.',
    readTime: '8 min read',
  },
  'understanding-recursion': {
    title: 'Understanding Recursion: The Foundational Concept',
    description:
      'Learn how recursion works, why base cases matter, and how to visualize recursive calls with practical examples.',
    readTime: '10 min read',
  },
  'backtracking-guide': {
    title: 'Solving Problems with Backtracking: A Comprehensive Guide',
    description:
      'Master backtracking by exploring state-space trees and pruning techniques for complex problem-solving.',
    readTime: '12 min read',
  },
  'segment-trees-mastery': {
    title: 'Mastering Segment Trees: Range Queries and Updates',
    description:
      'Efficiently perform range sum, minimum, and maximum queries along with pointwise updates in O(log N) time.',
    readTime: '15 min read',
  },
  'bit-manipulation-hacks': {
    title: 'Bit Manipulation Hacks for Fast Programming',
    description:
      'Speed up your CP solutions with clever bit manipulation tricks and binary representation insights.',
    readTime: '10 min read',
  },
  'dynamic-programming-optimization': {
    title: 'Dynamic Programming: Optimizing Recursive Solutions',
    description:
      'Convert recursive solutions into efficient iterative ones using memoization and tabular DP approaches.',
    readTime: '14 min read',
  },
  'graph-representation': {
    title: 'Graph Representation: Adjacency Lists vs. Matrices',
    description:
      'Explore the trade-offs between adjacency lists and matrices for storing and traversing graph data in memory.',
    readTime: '9 min read',
  },
  'sorting-algorithms-comparison': {
    title: 'Sorting Algorithms: Choosing the Right Strategy',
    description:
      'A deep dive into common sorting algorithms and when to use each for maximum performance.',
    readTime: '11 min read',
  },
  'linked-lists-vs-arrays': {
    title: 'Linked Lists vs. Arrays: Choosing the Right Data Structure',
    description:
      'Understand the fundamental differences and use cases for linear data structures in memory.',
    readTime: '8 min read',
  },
  'hash-map-collisions': {
    title: 'Inside Hash Maps: Solving the Collision Problem',
    description:
      'How hash maps work internally and how they handle collisions through chaining and open addressing.',
    readTime: '12 min read',
  },
  'balanced-bst-trees': {
    title: 'Balanced Binary Search Trees: Keeping Data in Order',
    description:
      'A guide to AVL trees and Red-Black trees and how they maintain O(log N) operations.',
    readTime: '13 min read',
  },
} as const;

export const blogMetadata = Object.entries(blogMetadataBySlug).map(([slug, value]) => ({
  slug,
  ...value,
}));

export const prerenderRoutes = [
  '/',
  '/time-complexity-calculator',
  '/space-complexity-calculator',
  '/tutorials',
  ...tutorialMetadata.map((tutorial) => `/tutorials/${tutorial.id}`),
  '/inside-math',
  '/blog',
  ...blogMetadata.map((post) => `/blog/${post.slug}`),
];
