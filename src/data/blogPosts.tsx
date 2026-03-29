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
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPostData>;
