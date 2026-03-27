import React, { useState, useMemo } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Gauge, Repeat, Network, Brain, Search, Layers, ListOrdered, ArrowRightLeft, Maximize } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import { ComplexityCalculator } from '../components/ComplexityCalculator';
import { Tutorial } from '../types';

// Reusable Code Block Component
export const CodeBlock = ({ code, language = 'python' }: { code: string, language?: string }) => (
  <div className="bg-[#1d1f21] rounded-xl overflow-hidden my-6 border-2 border-on-background/20 shadow-lg">
    <div className="flex items-center px-4 py-2 bg-on-background/50 border-b border-on-background/30">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-error"></div>
        <div className="w-3 h-3 rounded-full bg-tertiary"></div>
        <div className="w-3 h-3 rounded-full bg-primary-fixed-dim"></div>
      </div>
      <span className="ml-4 text-inverse-on-surface font-label text-xs uppercase tracking-widest font-bold">Example Code</span>
    </div>
    <div className="p-4 overflow-auto text-sm font-mono text-white">
      <Editor
        value={code}
        onValueChange={() => {}}
        highlight={code => Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language)}
        padding={10}
        style={{
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: 14,
          backgroundColor: 'transparent',
        }}
        disabled
      />
    </div>
  </div>
);



export const tutorialsData: Tutorial[] = [
  {
    id: 'binary-search',
    title: 'Binary Search: The Art of Halving',
    category: 'Searching',
    readTime: '8 min read',
    description: 'Learn how to find an element in a sorted array in O(log N) time by repeatedly dividing the search interval in half.',
    icon: Search,
    colorClass: 'text-primary',
    bgClass: 'bg-primary-container',
    content: (
      <>
        <p className="mb-4">
          Binary Search is a classic algorithm that finds the position of a target value within a <strong>sorted array</strong>. It compares the target value to the middle element of the array.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          Imagine looking for a word in a dictionary. You don't read page by page. You open it to the middle, check if your word comes before or after, and then repeat the process on the remaining half. That's Binary Search.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Time Complexity: } \mathcal{O}(\log_2 N)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(1) \text{ (Iterative)}" />
        </div>
        <p className="mb-4">
          Because the search space is halved with each step, the maximum number of steps required is the logarithm (base 2) of the array size <InlineMath math="N" />.
        </p>

        <ComplexityCalculator complexityClass="O(log N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`} />
      </>
    )
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort: Divide and Conquer',
    category: 'Sorting',
    readTime: '12 min read',
    description: 'A highly efficient, stable sorting algorithm that uses the divide and conquer paradigm to sort arrays in O(N log N) time.',
    icon: Layers,
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary-container',
    content: (
      <>
        <p className="mb-4">
          Merge Sort is a sorting algorithm that follows the <strong>Divide and Conquer</strong> paradigm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          The algorithm continuously divides the array in half until it cannot be further divided (i.e., the array has only one element). Then, it repeatedly merges the sublists to produce new sorted sublists until there is only one sorted list remaining.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Time Complexity: } \mathcal{O}(N \log N)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(N)" />
        </div>
        <p className="mb-4">
          The dividing step takes <InlineMath math="\mathcal{O}(\log N)" /> time, and the merging step takes <InlineMath math="\mathcal{O}(N)" /> time at each level of the recursion tree. Thus, the total time complexity is <InlineMath math="\mathcal{O}(N \log N)" />.
        </p>

        <ComplexityCalculator complexityClass="O(N log N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def merge_sort(arr):
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
            k += 1`} />
      </>
    )
  },
  {
    id: 'dijkstra',
    title: "Dijkstra's Shortest Path",
    category: 'Graphs',
    readTime: '15 min read',
    description: 'Find the shortest paths between nodes in a graph. Essential for routing, navigation, and network analysis.',
    icon: Network,
    colorClass: 'text-tertiary',
    bgClass: 'bg-tertiary-container',
    content: (
      <>
        <p className="mb-4">
          Dijkstra's algorithm allows us to find the shortest path between any two vertices of a graph. It differs from the minimum spanning tree because the shortest distance between two vertices might not include all the vertices of the graph.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          The algorithm maintains a set of unvisited nodes and calculates a tentative distance from the source node to every other node. It greedily selects the unvisited node with the smallest tentative distance, visits it, and updates the distances of its neighbors.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Time Complexity: } \mathcal{O}((V + E) \log V)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(V)" />
        </div>
        <p className="mb-4">
          Where <InlineMath math="V" /> is the number of vertices and <InlineMath math="E" /> is the number of edges. The use of a Priority Queue (Min-Heap) allows us to efficiently extract the node with the minimum distance.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`import heapq

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
                
    return distances`} />
      </>
    )
  },
  {
    id: 'dynamic-programming',
    title: '0/1 Knapsack (Dynamic Programming)',
    category: 'Advanced',
    readTime: '20 min read',
    description: 'Master Dynamic Programming by solving the classic 0/1 Knapsack problem. Learn to build the DP table.',
    icon: Brain,
    colorClass: 'text-error',
    bgClass: 'bg-error-container',
    content: (
      <>
        <p className="mb-4">
          Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          A naive solution is to consider all subsets of items and calculate the total weight and value of all subsets. This takes <InlineMath math="\mathcal{O}(2^N)" /> time. Dynamic Programming solves this by breaking it down into overlapping subproblems and storing the results in a table.
        </p>
        <div className="my-6">
          <BlockMath math="DP[i][w] = \max(DP[i-1][w], DP[i-1][w-wt[i]] + val[i])" />
          <BlockMath math="\text{Time Complexity: } \mathcal{O}(N \times W)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(N \times W)" />
        </div>
        <p className="mb-4">
          Where <InlineMath math="N" /> is the number of items and <InlineMath math="W" /> is the capacity of the knapsack.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def knapsack(W, wt, val, n):
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
 
    return K[n][W]`} />
      </>
    )
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort: The Pivot Master',
    category: 'Sorting',
    readTime: '10 min read',
    description: 'An efficient, in-place sorting algorithm that partitions an array around a pivot element.',
    icon: ListOrdered,
    colorClass: 'text-primary',
    bgClass: 'bg-primary-container',
    content: (
      <>
        <p className="mb-4">
          Quick Sort is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. A large array is partitioned into two arrays one of which holds values smaller than the specified value, say pivot, based on which the partition is made and another array holds values greater than the pivot value.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          Quicksort partitions an array and then calls itself recursively twice to sort the two resulting subarrays. This algorithm is quite efficient for large-sized data sets as its average and best-case complexity are <InlineMath math="\mathcal{O}(N \log N)" />.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Best/Average Time: } \mathcal{O}(N \log N)" />
          <BlockMath math="\text{Worst Time: } \mathcal{O}(N^2)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(\log N)" />
        </div>
        
        <ComplexityCalculator complexityClass="O(N log N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def partition(arr, low, high):
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
        quick_sort(arr, pi+1, high)`} />
      </>
    )
  },
  {
    id: 'bfs',
    title: 'Breadth-First Search (BFS)',
    category: 'Graphs',
    readTime: '10 min read',
    description: 'Explore a graph level by level. Perfect for finding the shortest path in unweighted graphs.',
    icon: Network,
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary-container',
    content: (
      <>
        <p className="mb-4">
          Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          BFS uses a <strong>Queue</strong> data structure to keep track of the nodes to visit next. It guarantees that the shortest path (in terms of number of edges) is found first in unweighted graphs.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Time Complexity: } \mathcal{O}(V + E)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(V)" />
        </div>
        
        <ComplexityCalculator complexityClass="O(N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`from collections import deque

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
                queue.append(neighbor)`} />
      </>
    )
  },
  {
    id: 'dfs',
    title: 'Depth-First Search (DFS)',
    category: 'Graphs',
    readTime: '10 min read',
    description: 'Dive deep into a graph before backtracking. Useful for topological sorting and finding connected components.',
    icon: Network,
    colorClass: 'text-tertiary',
    bgClass: 'bg-tertiary-container',
    content: (
      <>
        <p className="mb-4">
          Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          DFS uses a <strong>Stack</strong> (often implicitly via recursion) to remember where it should go back to when it reaches a dead end.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Time Complexity: } \mathcal{O}(V + E)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(V)" />
        </div>
        
        <ComplexityCalculator complexityClass="O(N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=" ")

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
            
    return visited`} />
      </>
    )
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers Technique',
    category: 'Arrays',
    readTime: '8 min read',
    description: 'Optimize array and string problems by using two references to iterate from different ends or at different speeds.',
    icon: ArrowRightLeft,
    colorClass: 'text-primary',
    bgClass: 'bg-primary-container',
    content: (
      <>
        <p className="mb-4">
          The Two Pointers technique is a simple yet powerful strategy used to solve array and string problems. It involves using two pointers (indices) to iterate through the data structure, often from opposite ends or moving at different speeds.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          This technique is particularly useful for problems involving sorted arrays (like finding pairs that sum to a target) or linked lists (like finding the middle or detecting cycles). It often reduces time complexity from <InlineMath math="\mathcal{O}(N^2)" /> to <InlineMath math="\mathcal{O}(N)" />.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Time Complexity: } \mathcal{O}(N)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(1)" />
        </div>
        
        <ComplexityCalculator complexityClass="O(N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python - Two Sum Sorted)</h3>
        <CodeBlock code={`def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return []`} />
      </>
    )
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    category: 'Arrays',
    readTime: '12 min read',
    description: 'Efficiently solve problems involving contiguous subarrays or substrings by maintaining a "window" of elements.',
    icon: Maximize,
    colorClass: 'text-error',
    bgClass: 'bg-error-container',
    content: (
      <>
        <p className="mb-4">
          The Sliding Window technique is used to perform operations on a specific window size of a given array or string. The window "slides" over the data, allowing you to compute results efficiently without redundant calculations.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          Instead of recalculating the sum (or other property) of a subarray from scratch, you subtract the element leaving the window and add the element entering the window. This reduces nested loops to a single loop.
        </p>
        <div className="my-6">
          <BlockMath math="\text{Time Complexity: } \mathcal{O}(N)" />
          <BlockMath math="\text{Space Complexity: } \mathcal{O}(1)" />
        </div>
        
        <ComplexityCalculator complexityClass="O(N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python - Max Sum Subarray of Size K)</h3>
        <CodeBlock code={`def max_sum_subarray(arr, k):
    if not arr or k <= 0 or k > len(arr):
        return 0
        
    max_sum = current_sum = sum(arr[:k])
    
    for i in range(k, len(arr)):
        current_sum = current_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, current_sum)
        
    return max_sum`} />
      </>
    )
  }
];
