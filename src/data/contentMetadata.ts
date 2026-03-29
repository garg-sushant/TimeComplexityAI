export const SITE_URL = 'https://algostory.com';
export const SITE_NAME = 'AlgoStory';

export const homeRouteMetadata = {
  '/': {
    title: 'AlgoStory - Free Time Complexity & Big O Calculator | AI Code Analyzer',
    description:
      'Free online time complexity calculator with Big O notation analyzer. Paste code, instantly get O(N) analysis. AI-powered algorithm complexity analyzer. Better than BigOCalc.',
    heading: 'Every line of code tells a story.',
    intro:
      'Paste your code below and watch the complexity come to life with our whimsical analyzer.',
  },
  '/time-complexity-calculator': {
    title: 'Time Complexity Calculator - Analyze Big O Notation | Free | AlgoStory',
    description:
      'Free time complexity calculator to analyze Big O of your code. Instant O(N) analysis with AI explanations. Better than BigOCalc. No signup needed.',
    heading: 'Time complexity calculator',
    intro:
      'Paste your code and get an AI-assisted breakdown of runtime growth, loop nesting, and Big O behavior.',
  },
  '/space-complexity-calculator': {
    title: 'Space Complexity Calculator - Analyze Memory Usage | Free Tool | AlgoStory',
    description:
      'Free space complexity calculator to analyze auxiliary memory usage. Estimate O notation growth for algorithm memory. AI-powered space analysis with explanations.',
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
