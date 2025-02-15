---
title: "Sorting Algorithm Time Scaling"
date: 2025-02-12T11:53:00+07:00
description: "Comparing the time complexity of different sorting algorithms"
tags: ["notebook", "software engineering"]
draft: false
---

Sorting is one of those basic algorithms that new programmer and CS students learn.

Maybe you already see the [big-O comparison in Wikipedia](https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_of_algorithms), or few sites that visualize how the element in sorting move around like [this](https://sortvisualizer.com/quicksort/)

In this notebook, we will compare the actual time comparison of different sorting algorithms.

{{< ipynb "notebook.ipynb" >}}

## Conclusion

Based on the performance comparison graph above, we can draw several key insights:

1. Algorithm Performance Tiers:
   - Bubble and Shell sort show significantly worse performance, especially for larger arrays
   - Quick, Merge, Heap and Insert sort perform notably better, clustering together at the bottom of the graph

2. Scaling Behavior:
   - All algorithms show non-linear growth as array size increases
   - Bubble sort scales the worst, with exponential growth
   - The more efficient algorithms (Quick, Merge, Heap, Insert) scale much more gracefully

3. Practical Implications:
   - For small arrays (< 20,000 elements), the difference between algorithms is less pronounced
   - For large arrays (> 60,000 elements), choosing an efficient algorithm becomes critical
   - Quick, Merge and Heap sort maintain consistent performance even at larger scales

4. Time Scale:
   - The y-axis logarithmic scale shows differences spanning several orders of magnitude
   - Bubble sort takes ~1000 seconds for large arrays
   - Efficient algorithms stay under 1 second even for the largest arrays tested

This experiment clearly demonstrates why certain sorting algorithms are preferred in practice, particularly for large datasets where performance differences become extremely significant.