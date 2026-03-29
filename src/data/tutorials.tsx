import React from 'react';
import * as ReactKatex from 'react-katex';
import { Gauge, Repeat, Network, Brain, Search, Layers, ListOrdered, ArrowRightLeft, Maximize, Zap, Hash, Link2, Box, Trees, BarChart3 } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import { LazyComplexityCalculator } from '../components/LazyComplexityCalculator';
import { Tutorial } from '../types';
import { tutorialMetadataById } from './contentMetadata';

// Reusable Code Block Component
export const CodeBlock = ({ code, language = 'python' }: { code: string, language?: string }) => {
  if (typeof window === 'undefined') {
    return (
      <div className="bg-[#1d1f21] rounded-xl overflow-hidden my-6 border-2 border-on-background/20 shadow-lg">
        <div className="flex items-center px-4 py-2 bg-on-background/50 border-b border-on-background/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-tertiary"></div>
            <div className="w-3 h-3 rounded-full bg-primary-fixed-dim"></div>
          </div>
          <span className="ml-4 text-inverse-on-surface font-label text-xs uppercase tracking-widest font-bold">Example Code</span>
        </div>
        <pre className="overflow-auto p-4 text-sm text-white">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
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
          highlight={(value) => Prism.highlight(value, Prism.languages[language] || Prism.languages.javascript, language)}
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
};



export const tutorialsData: Tutorial[] = [
  {
    id: 'binary-search',
    ...tutorialMetadataById['binary-search'],
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
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(\log_2 N)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(1) \text{ (Iterative)}" />
        </div>
        <p className="mb-4">
          Because the search space is halved with each step, the maximum number of steps required is the logarithm (base 2) of the array size <ReactKatex.InlineMath math="N" />.
        </p>

        <LazyComplexityCalculator complexityClass="O(log N)" />

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
    ...tutorialMetadataById['merge-sort'],
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
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(N \log N)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(N)" />
        </div>
        <p className="mb-4">
          The dividing step takes <ReactKatex.InlineMath math="\mathcal{O}(\log N)" /> time, and the merging step takes <ReactKatex.InlineMath math="\mathcal{O}(N)" /> time at each level of the recursion tree. Thus, the total time complexity is <ReactKatex.InlineMath math="\mathcal{O}(N \log N)" />.
        </p>

        <LazyComplexityCalculator complexityClass="O(N log N)" />

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
    ...tutorialMetadataById.dijkstra,
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
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}((V + E) \log V)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(V)" />
        </div>
        <p className="mb-4">
          Where <ReactKatex.InlineMath math="V" /> is the number of vertices and <ReactKatex.InlineMath math="E" /> is the number of edges. The use of a Priority Queue (Min-Heap) allows us to efficiently extract the node with the minimum distance.
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
    ...tutorialMetadataById['dynamic-programming'],
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
          A naive solution is to consider all subsets of items and calculate the total weight and value of all subsets. This takes <ReactKatex.InlineMath math="\mathcal{O}(2^N)" /> time. Dynamic Programming solves this by breaking it down into overlapping subproblems and storing the results in a table.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="DP[i][w] = \max(DP[i-1][w], DP[i-1][w-wt[i]] + val[i])" />
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(N \times W)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(N \times W)" />
        </div>
        <p className="mb-4">
          Where <ReactKatex.InlineMath math="N" /> is the number of items and <ReactKatex.InlineMath math="W" /> is the capacity of the knapsack.
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
    ...tutorialMetadataById['quick-sort'],
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
          Quicksort partitions an array and then calls itself recursively twice to sort the two resulting subarrays. This algorithm is quite efficient for large-sized data sets as its average and best-case complexity are <ReactKatex.InlineMath math="\mathcal{O}(N \log N)" />.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Best/Average Time: } \mathcal{O}(N \log N)" />
          <ReactKatex.BlockMath math="\text{Worst Time: } \mathcal{O}(N^2)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(\log N)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N log N)" />

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
    ...tutorialMetadataById.bfs,
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
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(V + E)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(V)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N)" />

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
    ...tutorialMetadataById.dfs,
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
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(V + E)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(V)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N)" />

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
    ...tutorialMetadataById['two-pointers'],
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
          This technique is particularly useful for problems involving sorted arrays (like finding pairs that sum to a target) or linked lists (like finding the middle or detecting cycles). It often reduces time complexity from <ReactKatex.InlineMath math="\mathcal{O}(N^2)" /> to <ReactKatex.InlineMath math="\mathcal{O}(N)" />.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(1)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N)" />

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
    ...tutorialMetadataById['sliding-window'],
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
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(1)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N)" />

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
  },
  {
    id: 'bubble-sort',
    ...tutorialMetadataById['bubble-sort'],
    icon: Zap,
    colorClass: 'text-error',
    bgClass: 'bg-error-container',
    content: (
      <>
        <p className="mb-4">
          Bubble Sort is the simplest sorting algorithm. It repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          The algorithm is named for the way smaller elements "bubble" to the top of the list. It's not efficient for large datasets but is great for learning and understanding sorting concepts.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Best Time: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Average/Worst Time: } \mathcal{O}(N^2)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(1)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N²)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def bubble_sort(arr):
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
    
    return arr`} />
      </>
    )
  },
  {
    id: 'insertion-sort',
    ...tutorialMetadataById['insertion-sort'],
    icon: Repeat,
    colorClass: 'text-primary',
    bgClass: 'bg-primary-container',
    content: (
      <>
        <p className="mb-4">
          Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort, but provides several advantages such as simplicity and online sorting.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          Imagine sorting playing cards in your hands. You start with an empty left hand and the cards in your right hand. Then you remove one card at a time from your right hand and insert it into the correct position in your left hand. To find the correct position for a card, you compare it with each of the cards already in your hand, from right to left, until you find the right place.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Best Time: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Average/Worst Time: } \mathcal{O}(N^2)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(1)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N²)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def insertion_sort(arr):
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
    
    return arr`} />
      </>
    )
  },
  {
    id: 'linear-search',
    ...tutorialMetadataById['linear-search'],
    icon: Search,
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary-container',
    content: (
      <>
        <p className="mb-4">
          Linear Search is the simplest search algorithm. It checks every element in the list sequentially until it finds the desired element or reaches the end of the list. Unlike binary search, it doesn't require the list to be sorted.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          Linear search is useful when working with unsorted data or small datasets. It's straightforward to implement but scales poorly as the dataset grows. Each comparison has an equal probability of being the right one, so the average case is <ReactKatex.InlineMath math="\mathcal{O}(N/2)" /> which simplifies to <ReactKatex.InlineMath math="\mathcal{O}(N)" />.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Best Time: } \mathcal{O}(1)" />
          <ReactKatex.BlockMath math="\text{Average Time: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Worst Time: } \mathcal{O}(N)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`def linear_search(arr, target):
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
print(f"Element found at index: {result}")`} />
      </>
    )
  },
  {
    id: 'hash-table',
    ...tutorialMetadataById['hash-table'],
    icon: Hash,
    colorClass: 'text-tertiary',
    bgClass: 'bg-tertiary-container',
    content: (
      <>
        <p className="mb-4">
          A Hash Table (also called Hash Map) is a data structure that implements an associative array—a structure that maps keys to values. It uses a hash function to compute an index (hash code) into an array of buckets or slots from which the desired value can be found.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          The ideal hash function distributes keys uniformly across the hash table. When two keys hash to the same index, a <strong>collision</strong> occurs. Common collision resolution techniques include chaining (using linked lists) and open addressing (finding another empty slot).
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Average Search: } \mathcal{O}(1)" />
          <ReactKatex.BlockMath math="\text{Worst Search: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(N)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(1)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python - Dictionary/HashMap)</h3>
        <CodeBlock code={`class HashTable:
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
        
        return None`} />
      </>
    )
  },
  {
    id: 'linked-list',
    ...tutorialMetadataById['linked-list'],
    icon: Link2,
    colorClass: 'text-error',
    bgClass: 'bg-error-container',
    content: (
      <>
        <p className="mb-4">
          A Linked List is a linear data structure where elements (nodes) are stored in objects called nodes. Each node contains data and a reference (link) to the next node in the sequence. Unlike arrays, linked lists allow efficient insertion and deletion at any position.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          Singly linked lists have one pointer per node (to the next node), while doubly linked lists have two pointers (to next and previous). This dynamic memory allocation comes with the cost of extra memory for pointers and slower random access compared to arrays.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Access: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Insertion/Deletion (if position known): } \mathcal{O}(1)" />
          <ReactKatex.BlockMath math="\text{Search: } \mathcal{O}(N)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`class Node:
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
            current = current.next`} />
      </>
    )
  },
  {
    id: 'stack-queue',
    ...tutorialMetadataById['stack-queue'],
    icon: Box,
    colorClass: 'text-primary',
    bgClass: 'bg-primary-container',
    content: (
      <>
        <p className="mb-4">
          Stacks and Queues are fundamental abstract data types used in computer science. A Stack follows the Last-In-First-Out (LIFO) principle, while a Queue follows the First-In-First-Out (FIFO) principle. Both can be implemented using arrays or linked lists.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          <strong>Stack (LIFO):</strong> The most recently added element is removed first. Think of a stack of plates—you add and remove from the top. <br/>
          <strong>Queue (FIFO):</strong> The first element added is the first one to be removed. Like a line at a grocery store.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Stack/Queue Push/Pop: } \mathcal{O}(1)" />
          <ReactKatex.BlockMath math="\text{Stack/Queue Peek: } \mathcal{O}(1)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(N)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(1)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`from collections import deque

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
queue2.pop(0)      # Remove from front`} />
      </>
    )
  },
  {
    id: 'tree-traversal',
    ...tutorialMetadataById['tree-traversal'],
    icon: Trees,
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary-container',
    content: (
      <>
        <p className="mb-4">
          Tree Traversal is the process of visiting all the nodes in a tree data structure. There are three main depth-first traversal methods: Inorder, Preorder, and Postorder. Each visits nodes in a different sequence, useful for different applications.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          <strong>Inorder (Left-Root-Right):</strong> Produces sorted output for BSTs. <br/>
          <strong>Preorder (Root-Left-Right):</strong> Useful for copying the tree. <br/>
          <strong>Postorder (Left-Right-Root):</strong> Useful for deletion and evaluation of expressions.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Time Complexity: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(H)" />
        </div>
        <p className="text-sm text-on-surface-variant mb-4">Where H is the height of the tree (O(N) worst case for skewed trees)</p>
        
        <LazyComplexityCalculator complexityClass="O(N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`class TreeNode:
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
    return result`} />
      </>
    )
  },
  {
    id: 'binary-tree-search',
    ...tutorialMetadataById['binary-tree-search'],
    icon: BarChart3,
    colorClass: 'text-error',
    bgClass: 'bg-error-container',
    content: (
      <>
        <p className="mb-4">
          A Binary Search Tree (BST) is a binary tree data structure where each node has at most two children (left and right). The key property is that for each node, all values in its left subtree are smaller, and all values in its right subtree are larger.
        </p>
        <h3 className="text-xl font-bold mt-8 mb-4">The Theory</h3>
        <p className="mb-4">
          This ordering property allows for efficient searching, insertion, and deletion. In a balanced BST, operations run in <ReactKatex.InlineMath math="\mathcal{O}(\log N)" /> time. However, if the tree becomes skewed (like a linked list), performance degrades to <ReactKatex.InlineMath math="\mathcal{O}(N)" />.
        </p>
        <div className="my-6">
          <ReactKatex.BlockMath math="\text{Balanced BST Search: } \mathcal{O}(\log N)" />
          <ReactKatex.BlockMath math="\text{Unbalanced BST Search: } \mathcal{O}(N)" />
          <ReactKatex.BlockMath math="\text{Space Complexity: } \mathcal{O}(H)" />
        </div>
        
        <LazyComplexityCalculator complexityClass="O(log N)" />

        <h3 className="text-xl font-bold mt-8 mb-4">The Code (Python)</h3>
        <CodeBlock code={`class TreeNode:
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
                node.right = TreeNode(val)`} />
      </>
    )
  }
];

export const tutorialsById = Object.fromEntries(
  tutorialsData.map((tutorial) => [tutorial.id, tutorial]),
) as Record<string, Tutorial>;
