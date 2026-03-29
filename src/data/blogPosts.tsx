import type { ReactNode } from 'react';
import { blogMetadataBySlug } from './contentMetadata';

export interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  content: ReactNode;
}

export const blogPosts: BlogPostData[] = [
  {
    slug: 'algorithm-complexity-cheatsheet',
    ...blogMetadataBySlug['algorithm-complexity-cheatsheet'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Memorizing complexities is one thing, but having a clear, comparative view of how different
          algorithms perform across best, average, and worst-case scenarios is essential for
          effective problem-solving and system design.
        </p>

        <h2>Sorting Algorithms</h2>
        <div className="overflow-x-auto my-6 border-2 border-black rounded-lg shadow-neobrutalist-sm bg-white">
          <table className="min-w-full divide-y divide-black">
            <thead className="bg-[#B0EBB4]">
              <tr>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Algorithm</th>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Best Case</th>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Average Case</th>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Worst Case</th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Quicksort</td>
                <td className="px-4 py-3 border-r border-black text-green-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 font-mono italic">O(log N)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Mergesort</td>
                <td className="px-4 py-3 border-r border-black text-green-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 border-r border-black text-green-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 font-mono italic">O(N)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Heapsort</td>
                <td className="px-4 py-3 border-r border-black text-green-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 border-r border-black text-green-700 font-mono italic">O(N log N)</td>
                <td className="px-4 py-3 font-mono italic">O(1)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Bubble Sort</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(N)</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 font-mono italic">O(1)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Insertion Sort</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(N)</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 font-mono italic">O(1)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Selection Sort</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N^2)</td>
                <td className="px-4 py-3 font-mono italic">O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Graph Algorithms</h2>
        <div className="overflow-x-auto my-6 border-2 border-black rounded-lg shadow-neobrutalist-sm bg-white">
          <table className="min-w-full divide-y divide-black">
            <thead className="bg-[#B0EBB4]">
              <tr>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Algorithm</th>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Time Complexity</th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">DFS / BFS</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(V + E)</td>
                <td className="px-4 py-3 font-mono italic">O(V)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Dijkstra (with Binary Heap)</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O((V + E) log V)</td>
                <td className="px-4 py-3 font-mono italic">O(V)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Bellman-Ford</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(VE)</td>
                <td className="px-4 py-3 font-mono italic">O(V)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Floyd-Warshall</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(V^3)</td>
                <td className="px-4 py-3 font-mono italic">O(V^2)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Prim (with Binary Heap)</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O((V + E) log V)</td>
                <td className="px-4 py-3 font-mono italic">O(V)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Kruskal</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(E log E)</td>
                <td className="px-4 py-3 font-mono italic">O(V)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Data Structure Operations</h2>
        <div className="overflow-x-auto my-6 border-2 border-black rounded-lg shadow-neobrutalist-sm bg-white">
          <table className="min-w-full divide-y divide-black">
            <thead className="bg-[#B0EBB4]">
              <tr>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Structure</th>
                <th className="px-4 py-3 text-left font-bold border-r border-black uppercase tracking-wider">Access / Search</th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Insertion / Deletion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Hash Table</td>
                <td className="px-4 py-3 border-r border-black text-green-700 font-mono italic">Avg O(1), Worst O(N)</td>
                <td className="px-4 py-3 text-green-700 font-mono italic">Avg O(1), Worst O(N)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Balanced BST (AVL, R-B)</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(log N)</td>
                <td className="px-4 py-3 text-blue-700 font-mono italic">O(log N)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Stack / Queue</td>
                <td className="px-4 py-3 border-r border-black text-blue-700 font-mono italic">O(N) (top is O(1))</td>
                <td className="px-4 py-3 text-blue-700 font-mono italic">O(1)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-black font-semibold bg-[#f9f9f9]">Linked List</td>
                <td className="px-4 py-3 border-r border-black text-red-700 font-mono italic">O(N)</td>
                <td className="px-4 py-3 text-blue-700 font-mono italic">O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    ),
  },
  {
    slug: 'big-o-notation-explained',
    ...blogMetadataBySlug['big-o-notation-explained'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Big O notation describes how the work done by an algorithm grows as the input grows. It
          does not try to predict the exact number of milliseconds on your laptop. Instead, it
          gives you a stable way to compare strategies as the problem gets larger.
        </p>
        <h2>Why Engineers Use Big O</h2>
        <p>
          Two pieces of code can solve the same task but scale very differently. A loop that runs
          once over an array behaves very differently from a loop inside another loop. Big O gives
          you the language to explain that difference before the system is under load.
        </p>
        <h2>Common Complexity Classes</h2>
        <p>
          Constant time stays flat. Logarithmic time grows slowly. Linear time grows in proportion
          to the input. Quadratic time appears when one pass is nested inside another. Exponential
          growth is usually a sign that brute force or repeated recursion needs to be replaced.
        </p>
        <h2>How To Read It In Real Code</h2>
        <p>
          Start by counting the loops, recursion depth, and any extra data structures. Then ask how
          those parts depend on input size. If you repeatedly halve the search space, you are likely
          looking at logarithmic growth. If every element compares with every other element, the
          runtime is probably quadratic.
        </p>
        <p>
          AlgoStory is useful here because it translates the code into a readable explanation
          instead of making you infer every cost manually.
        </p>
      </article>
    ),
  },
  {
    slug: 'bubble-sort-time-complexity',
    ...blogMetadataBySlug['bubble-sort-time-complexity'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Bubble Sort compares adjacent values and swaps them until larger values bubble to the end
          of the array. The algorithm is easy to understand, which makes it a good teaching tool,
          but it becomes inefficient quickly as arrays grow.
        </p>
        <h2>Why The Average Case Is O(N^2)</h2>
        <p>
          The outer loop runs across the array, and the inner loop repeats comparisons for nearly
          every remaining position. That repeated pairwise checking creates a triangular number of
          operations, which simplifies to quadratic growth.
        </p>
        <h2>When Bubble Sort Improves</h2>
        <p>
          With an optimization that stops early when no swaps happen, Bubble Sort can finish in
          linear time on an already sorted array. That best-case improvement is real, but it does
          not fix the average and worst-case cost.
        </p>
        <h2>What To Use Instead</h2>
        <p>
          In production systems, Merge Sort, Quick Sort, or language-native sorting implementations
          are usually better choices. Bubble Sort remains valuable mainly because it teaches how
          nested loops translate into runtime growth.
        </p>
      </article>
    ),
  },
  {
    slug: 'merge-sort-time-complexity',
    ...blogMetadataBySlug['merge-sort-time-complexity'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Merge Sort splits an array into smaller halves, sorts each half recursively, and merges
          the results back together. It is one of the clearest examples of divide and conquer in
          algorithm design.
        </p>
        <h2>Why The Runtime Is O(N log N)</h2>
        <p>
          Each level of recursion touches every element during the merge step, which costs linear
          time. The number of levels is logarithmic because the array keeps getting cut in half.
          Multiply those together and you get O(N log N).
        </p>
        <h2>Space Complexity Tradeoff</h2>
        <p>
          Merge Sort is fast and stable, but it typically needs extra space to hold intermediate
          arrays during merging. That makes it different from in-place strategies such as Quick
          Sort, where memory usage and runtime trade off differently.
        </p>
        <h2>Where It Works Well</h2>
        <p>
          Merge Sort is a strong choice when predictable performance matters and stable ordering is
          useful. It also transfers well to linked lists and external sorting scenarios where data
          does not fit neatly into memory.
        </p>
      </article>
    ),
  },
  {
    slug: 'understanding-recursion',
    ...blogMetadataBySlug['understanding-recursion'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Recursion is a process where a function calls itself to solve smaller instances of the same problem.
          It's the heart of many complex algorithms and is essential for understanding more advanced topics.
        </p>
        <h2>The Base Case: Why It's Critical</h2>
        <p>
          Every recursive function needs a base case—a simple condition that stops the recursion.
          Without it, the function would keep calling itself forever, leading to a stack overflow error.
        </p>
        <h2>The Recursive Step</h2>
        <p>
          This is where the function calls itself with a slightly modified argument, moving the problem
          closer to the base case each time. Understanding how these calls stack up is key to visualization.
        </p>
        <h2>Visualizing the Call Stack</h2>
        <p>
          Imagine a stack of books. Each recursive call adds a new book to the top. Only when a base case is
          reached can you start removing books one by one, returning the result back down the line.
        </p>
      </article>
    ),
  },
  {
    slug: 'backtracking-guide',
    ...blogMetadataBySlug['backtracking-guide'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Backtracking is a refined form of brute force. It builds solutions incrementally and abandons
          paths ("backtracks") as soon as it determines they cannot lead to a valid solution.
        </p>
        <h2>State-Space Trees</h2>
        <p>
          Think of the decision process as a tree. Each node represents a state, and each edge is a choice.
          Backtracking explores this tree, using recursion to go deep into promising branches.
        </p>
        <h2>Pruning: The Secret Sauce</h2>
        <p>
          Pruning is what makes backtracking efficient. By checking constraints early, we can avoid
          exploring huge sections of the tree that would never work, saving massive amounts of computation.
        </p>
        <h2>Common Applications</h2>
        <p>
          From solving puzzles like Sudoku and N-Queens to finding paths in a maze, backtracking is the
          go-to strategy for problems involving a sequence of interdependent choices.
        </p>
      </article>
    ),
  },
  {
    slug: 'segment-trees-mastery',
    ...blogMetadataBySlug['segment-trees-mastery'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          A Segment Tree is a powerful data structure designed to handle range-based queries and updates
          efficiently. It's a staple in competitive programming for tasks involving intervals.
        </p>
        <h2>The Logarithmic Advantage</h2>
        <p>
          In a standard array, range sums might take O(N) and updates O(1). A segment tree balances this,
          making both operations O(log N). This is critical when dealing with thousands of queries.
        </p>
        <h2>Hierarchical Structure</h2>
        <p>
          Leaf nodes represent individual array elements, while internal nodes store pre-aggregated data
          (like sums or minimums) for their child segments. This hierarchy speeds up the lookup process.
        </p>
        <h2>Building and Querying</h2>
        <p>
          Building a segment tree takes O(N) time. Once built, you can query any sub-range by traversing
          the tree and combining the pre-calculated results of relevant segments.
        </p>
      </article>
    ),
  },
  {
    slug: 'bit-manipulation-hacks',
    ...blogMetadataBySlug['bit-manipulation-hacks'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Computers operate on bits. Bit manipulation involves using bitwise operators like AND, OR, XOR,
          and shifts to perform tasks at lightning speed, often in O(1).
        </p>
        <h2>The Power of XOR</h2>
        <p>
          XOR has the unique property that `X ^ X = 0` and `X ^ 0 = X`. This makes it incredibly useful
          for finding the unique element in an array where every other element appears twice.
        </p>
        <h2>Setting and Clearing Bits</h2>
        <p>
          Learn how to use masks to check if a specific bit is set, or to set/clear bits without affecting
          others. This is essential for memory-efficient state representation (bitmasks).
        </p>
        <h2>Shift Operators and Powers of Two</h2>
        <p>
          Left shifting by K is equivalent to multiplying by 2^K, and right shifting is like dividing.
          These operations are handled directly at the CPU level, making them faster than standard arithmetic.
        </p>
      </article>
    ),
  },
  {
    slug: 'dynamic-programming-optimization',
    ...blogMetadataBySlug['dynamic-programming-optimization'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Dynamic Programming (DP) is about solving complex problems by breaking them into overlapping
          subproblems and storing their results to avoid redundant calculations.
        </p>
        <h2>Overlapping Subproblems</h2>
        <p>
          If you solve the same sub-task multiple times (like in naive Fibonacci), you're wasting time.
          DP identifies these overlaps and ensures each is only computed once.
        </p>
        <h2>Memoization vs. Tabulation</h2>
        <p>
          Memoization is the top-down approach that caches results of recursive calls. Tabulation is the
          bottom-up approach that builds a table iteratively. Both lead to the same efficiency.
        </p>
        <h2>The Transition Function</h2>
        <p>
          The core of any DP problem is finding the recurrence relation (transition) that describes how
          the solution to a larger problem depends on the solutions to smaller ones.
        </p>
      </article>
    ),
  },
  {
    slug: 'graph-representation',
    ...blogMetadataBySlug['graph-representation'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Graphs are fundamental data structures that represent relationships between objects.
          Representing them efficiently is critical for algorithm performance.
        </p>
        <h2>Adjacency Matrices: O(1) Lookup</h2>
        <p>
          An adjacency matrix uses an N x N grid to show connections. It's fast for checking if two
          nodes are connected, but it consumes O(N^2) space even if the graph has very few edges.
        </p>
        <h2>Adjacency Lists: Space-Saving King</h2>
        <p>
          Adjacency lists only store the edges that actually exist, making them ideal for sparse graphs.
          They use O(V + E) space and are generally the preferred choice for most graph algorithms.
        </p>
        <h2>Choosing the Right Format</h2>
        <p>
          If your graph is dense (nearly every node connects to every other), use a matrix. For sparse
          graphs, an adjacency list is almost always better for speed and memory.
        </p>
      </article>
    ),
  },
  {
    slug: 'sorting-algorithms-comparison',
    ...blogMetadataBySlug['sorting-algorithms-comparison'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Not all sorting algorithms are created equal. Understanding the difference between O(N log N)
          and O(N^2) is just the beginning of choosing the right tool.
        </p>
        <h2>Comparison-Based vs. Distributed</h2>
        <p>
          Quicksort and mergesort compare values directly. Distributed sorts like Counting Sort don't—they
          count frequencies instead, allowing them to reach O(N) in specific cases with limited value ranges.
        </p>
        <h2>Stability and In-Place Sorting</h2>
        <p>
          A stable sort (like Merge Sort) preserves the relative order of equal elements. An in-place sort
          (like Quick Sort) uses no extra memory, which is critical when system resources are tight.
        </p>
        <h2>The Hybrid Approach</h2>
        <p>
          Modern languages often use hybrid sorts like Timsort (Python/Java), which combines Merge Sort
          and Insertion Sort to exploit patterns already existing in real-world data.
        </p>
      </article>
    ),
  },
  {
    slug: 'linked-lists-vs-arrays',
    ...blogMetadataBySlug['linked-lists-vs-arrays'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Arrays and linked lists are the building blocks of most other data structures. Both store
          linear sequences, but their performance profiles are worlds apart.
        </p>
        <h2>Arrays: Random Access Power</h2>
        <p>
          Arrays provide O(1) access to any element via its index because they are stored contiguously.
          However, inserting or deleting elements from the middle requires O(N) shifting.
        </p>
        <h2>Linked Lists: Fast Insertions</h2>
        <p>
          Linked lists excel at insertions and deletions because you only need to update a few pointers.
          The downside is that finding an element requires O(N) traversal.
        </p>
        <h2>Memory Layout and Caching</h2>
        <p>
          Arrays are much more cache-friendly because their elements are physically next to each other.
          Linked lists involve jumping around in memory, which can be significantly slower in practice.
        </p>
      </article>
    ),
  },
  {
    slug: 'hash-map-collisions',
    ...blogMetadataBySlug['hash-map-collisions'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          Hash maps provide O(1) magic, but that magic depends on a good hash function and a solid
          strategy for handling the inevitable collisions.
        </p>
        <h2>What is a Collision?</h2>
        <p>
          A collision happens when two different keys hash to the same index. Even the best hash functions
          cannot avoid this entirely due to the Pigeonhole Principle.
        </p>
        <h2>Chaining: Storing Lists at buckets</h2>
        <p>
          In separate chaining, every bucket in the table holds a linked list. When multiple keys collide,
          they are simply appended to the list at that index.
        </p>
        <h2>Open Addressing: Finding the Next Hole</h2>
        <p>
          Linear probing and quadratic probing look for the next empty spot in the table if a collision
          occurs. This keeps data in a single array, improving cache performance but increasing complexity.
        </p>
      </article>
    ),
  },
  {
    slug: 'balanced-bst-trees',
    ...blogMetadataBySlug['balanced-bst-trees'],
    content: (
      <article className="prose prose-slate max-w-none">
        <p>
          A standard Binary Search Tree (BST) can degrade into a linked list, making operations O(N).
          Balanced trees ensure that this never happens, keeping the tree height at log N.
        </p>
        <h2>AVL Trees: Strict Balance</h2>
        <p>
          AVL trees use rotations to ensure the height difference between child subtrees is never more
          than one. This makes them great for read-heavy workloads where fast lookups are crucial.
        </p>
        <h2>Red-Black Trees: Performance over Precision</h2>
        <p>
          Red-Black trees allow for slightly less perfect balance than AVL trees, but they require fewer
          rotations during insertions and deletions, making them faster for write-intensive tasks.
        </p>
        <h2>Self-Balancing Logic</h2>
        <p>
          The core concept is that every operation that modifies the tree also checks for balance. If
          the tree becomes lopsided, a sequence of re-coloring and rotations restores the logarithmic height.
        </p>
      </article>
    ),
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPostData>;
