"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { ThemedPageHeader } from "@/components/shared/themed-page-header";
import { ResourceDetail } from "@/components/resources/resource-detail";

const resourcesData = {
  general: {
    title: "General Programming",
    description:
      "Master the fundamental concepts that form the backbone of all programming languages and paradigms. From understanding how computers work to writing clean, maintainable code, these resources will build your foundation as a developer.",
    fullDescription: `
      General programming encompasses the core principles and practices that every developer should master, regardless of their chosen language or specialization. This comprehensive collection covers everything from basic programming concepts to advanced software engineering practices.

      Whether you're just starting your coding journey or looking to solidify your understanding of fundamental concepts, these resources will provide you with the knowledge and skills needed to write better code, think algorithmically, and approach problems with confidence.

      The materials here focus on language-agnostic concepts that apply universally across different programming paradigms and technologies.
    `,
    backgroundImage:
      "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    blogs: [
      {
        id: "1",
        title: "Understanding Big O Notation",
        description:
          "A comprehensive guide to analyzing algorithm complexity and performance.",
        url: "/blogs/big-o-notation",
        difficulty: "Beginner",
        readTime: "15 min",
        tags: ["Algorithms", "Performance"],
      },
      {
        id: "2",
        title: "Clean Code Principles",
        description:
          "Best practices for writing readable, maintainable, and scalable code.",
        url: "/blogs/clean-code-principles",
        difficulty: "Intermediate",
        readTime: "20 min",
        tags: ["Best Practices", "Code Quality"],
      },
      {
        id: "3",
        title: "Design Patterns Every Developer Should Know",
        description:
          "Essential design patterns and when to use them in your projects.",
        url: "/blogs/design-patterns",
        difficulty: "Advanced",
        readTime: "25 min",
        tags: ["Design Patterns", "Architecture"],
      },
      {
        id: "4",
        title: "Version Control with Git",
        description:
          "Master Git workflows and collaboration techniques for team development.",
        url: "/blogs/git-workflow",
        difficulty: "Beginner",
        readTime: "18 min",
        tags: ["Git", "Collaboration"],
      },
    ],
    files: [
      {
        id: "1",
        name: "programming-fundamentals-cheatsheet.pdf",
        description:
          "Quick reference for core programming concepts and syntax patterns.",
        type: "PDF",
        size: "2.3 MB",
        downloadUrl: "/resources/files/programming-fundamentals-cheatsheet.pdf",
      },
      {
        id: "2",
        name: "code-review-checklist.md",
        description:
          "Comprehensive checklist for conducting effective code reviews.",
        type: "Markdown",
        size: "15 KB",
        downloadUrl: "/resources/files/code-review-checklist.md",
      },
      {
        id: "3",
        name: "naming-conventions-guide.txt",
        description:
          "Best practices for naming variables, functions, and classes across different languages.",
        type: "Text",
        size: "8 KB",
        downloadUrl: "/resources/files/naming-conventions-guide.txt",
      },
    ],
  },
  "dynamic-programming": {
    title: "Dynamic Programming",
    description:
      "Unlock the power of dynamic programming to solve complex optimization problems efficiently. Learn to identify patterns, build solutions incrementally, and master both top-down and bottom-up approaches.",
    fullDescription: `
      Dynamic Programming is a powerful algorithmic technique for solving complex problems by breaking them down into simpler subproblems. It's particularly effective for optimization problems where the same subproblems are solved multiple times.

      This technique combines the correctness of complete search with the efficiency of greedy algorithms. By storing the results of subproblems (memoization) or building solutions incrementally (tabulation), dynamic programming can dramatically reduce time complexity.

      Common applications include finding shortest paths, optimizing resource allocation, sequence alignment in bioinformatics, and many competitive programming challenges. Mastering DP patterns will significantly enhance your problem-solving toolkit.
    `,
    backgroundImage:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    blogs: [
      {
        id: "5",
        title: "Introduction to Dynamic Programming",
        description:
          "Learn the fundamentals of DP with classic examples like Fibonacci and climbing stairs.",
        url: "/blogs/intro-to-dp",
        difficulty: "Beginner",
        readTime: "22 min",
        tags: ["DP Basics", "Memoization"],
      },
      {
        id: "6",
        title: "Knapsack Problem Variations",
        description:
          "Master the 0/1 knapsack, unbounded knapsack, and fractional knapsack problems.",
        url: "/blogs/knapsack-problems",
        difficulty: "Intermediate",
        readTime: "30 min",
        tags: ["Optimization", "Knapsack"],
      },
      {
        id: "7",
        title: "Longest Common Subsequence (LCS)",
        description:
          "Understand string DP problems and their applications in bioinformatics.",
        url: "/blogs/lcs-problems",
        difficulty: "Intermediate",
        readTime: "25 min",
        tags: ["String DP", "Sequences"],
      },
      {
        id: "8",
        title: "Advanced DP: Digit DP and Bitmask DP",
        description:
          "Explore advanced DP techniques for complex state representations.",
        url: "/blogs/advanced-dp-techniques",
        difficulty: "Advanced",
        readTime: "35 min",
        tags: ["Advanced DP", "State Space"],
      },
    ],
    files: [
      {
        id: "4",
        name: "dp-patterns-reference.pdf",
        description:
          "Visual guide to common DP patterns and their implementations.",
        type: "PDF",
        size: "4.1 MB",
        downloadUrl: "/resources/files/dp-patterns-reference.pdf",
      },
      {
        id: "5",
        name: "dp-practice-problems.json",
        description:
          "Collection of 100+ DP problems categorized by difficulty and pattern.",
        type: "JSON",
        size: "125 KB",
        downloadUrl: "/resources/files/dp-practice-problems.json",
      },
      {
        id: "6",
        name: "memoization-templates.cpp",
        description:
          "C++ templates for top-down DP solutions with memoization.",
        type: "C++",
        size: "12 KB",
        downloadUrl: "/resources/files/memoization-templates.cpp",
      },
    ],
  },
  "data-structures": {
    title: "Data Structures",
    description:
      "Explore fundamental and advanced data structures that form the building blocks of efficient algorithms and software systems.",
    fullDescription: `
      Data structures are specialized formats for organizing, processing, retrieving, and storing data. They serve as the foundation for efficient algorithms and are crucial for writing performant software applications.

      Understanding data structures is essential for any programmer because they directly impact the efficiency of your code. The choice of data structure can mean the difference between an algorithm that runs in milliseconds versus one that takes hours.

      This collection covers everything from basic structures like arrays and linked lists to complex ones like B-trees, tries, and disjoint set unions. You'll learn not just how to implement these structures, but when and why to use each one.
    `,
    backgroundImage:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    blogs: [
      {
        id: "9",
        title: "Arrays vs Linked Lists: When to Use What",
        description:
          "Comprehensive comparison of linear data structures and their trade-offs.",
        url: "/blogs/arrays-vs-linked-lists",
        difficulty: "Beginner",
        readTime: "12 min",
        tags: ["Arrays", "Linked Lists", "Memory"],
      },
      {
        id: "10",
        title: "Mastering Hash Tables and Hash Functions",
        description:
          "Deep dive into hash tables, collision resolution, and designing good hash functions.",
        url: "/blogs/hash-tables-guide",
        difficulty: "Intermediate",
        readTime: "28 min",
        tags: ["Hash Tables", "Hashing", "Performance"],
      },
      {
        id: "11",
        title: "Trees: From Binary to B-Trees",
        description:
          "Complete guide to tree data structures and their real-world applications.",
        url: "/blogs/comprehensive-trees-guide",
        difficulty: "Intermediate",
        readTime: "35 min",
        tags: ["Trees", "Binary Trees", "B-Trees"],
      },
      {
        id: "12",
        title: "Graph Representations and Traversals",
        description:
          "Learn different ways to represent graphs and efficient traversal algorithms.",
        url: "/blogs/graph-data-structures",
        difficulty: "Advanced",
        readTime: "30 min",
        tags: ["Graphs", "DFS", "BFS"],
      },
    ],
    files: [
      {
        id: "7",
        name: "data-structures-visualization.html",
        description:
          "Interactive visualizations of common data structures and operations.",
        type: "HTML",
        size: "890 KB",
        downloadUrl: "/resources/files/data-structures-visualization.html",
      },
      {
        id: "8",
        name: "implementation-templates.zip",
        description:
          "Complete implementations of data structures in multiple languages.",
        type: "ZIP",
        size: "256 KB",
        downloadUrl: "/resources/files/implementation-templates.zip",
      },
      {
        id: "9",
        name: "complexity-analysis-sheet.pdf",
        description:
          "Time and space complexity reference for all major data structures.",
        type: "PDF",
        size: "1.8 MB",
        downloadUrl: "/resources/files/complexity-analysis-sheet.pdf",
      },
    ],
  },
  algorithms: {
    title: "Algorithms",
    description:
      "Master algorithmic thinking and learn to design efficient solutions for complex computational problems.",
    fullDescription: `
      Algorithms are step-by-step procedures for solving computational problems. They are the heart of computer science and software engineering, providing systematic approaches to processing data and solving complex challenges.

      This comprehensive collection covers fundamental algorithmic paradigms including divide and conquer, greedy algorithms, dynamic programming, and graph algorithms. You'll learn to analyze algorithmic complexity, choose appropriate algorithms for specific problems, and design your own efficient solutions.

      From basic sorting and searching to advanced topics like network flows and string algorithms, these resources will build your algorithmic intuition and problem-solving skills that are essential for technical interviews and real-world software development.
    `,
    backgroundImage:
      "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    blogs: [
      {
        id: "13",
        title: "Sorting Algorithms: From Bubble to Quick",
        description:
          "Complete guide to sorting algorithms with complexity analysis and implementations.",
        url: "/blogs/sorting-algorithms-guide",
        difficulty: "Beginner",
        readTime: "25 min",
        tags: ["Sorting", "Complexity", "Performance"],
      },
      {
        id: "14",
        title: "Graph Algorithms: Shortest Paths and Beyond",
        description:
          "Master Dijkstra's, Bellman-Ford, and Floyd-Warshall algorithms.",
        url: "/blogs/graph-algorithms",
        difficulty: "Advanced",
        readTime: "40 min",
        tags: ["Graphs", "Shortest Path", "Algorithms"],
      },
      {
        id: "15",
        title: "Divide and Conquer: Breaking Down Complex Problems",
        description:
          "Learn the divide and conquer paradigm with merge sort, quick sort, and more.",
        url: "/blogs/divide-and-conquer",
        difficulty: "Intermediate",
        readTime: "22 min",
        tags: ["Divide & Conquer", "Recursion", "Problem Solving"],
      },
      {
        id: "16",
        title: "String Algorithms: Pattern Matching and More",
        description:
          "Explore KMP, Rabin-Karp, and advanced string processing algorithms.",
        url: "/blogs/string-algorithms",
        difficulty: "Advanced",
        readTime: "32 min",
        tags: ["Strings", "Pattern Matching", "Text Processing"],
      },
    ],
    files: [
      {
        id: "10",
        name: "algorithm-complexity-calculator.py",
        description:
          "Python tool for analyzing and comparing algorithm complexities.",
        type: "Python",
        size: "45 KB",
        downloadUrl: "/resources/files/algorithm-complexity-calculator.py",
      },
      {
        id: "11",
        name: "competitive-programming-toolkit.cpp",
        description:
          "C++ template library with common algorithms for competitive programming.",
        type: "C++",
        size: "78 KB",
        downloadUrl: "/resources/files/competitive-programming-toolkit.cpp",
      },
      {
        id: "12",
        name: "algorithms-study-guide.md",
        description:
          "Structured study plan for mastering algorithms with resources and timeline.",
        type: "Markdown",
        size: "23 KB",
        downloadUrl: "/resources/files/algorithms-study-guide.md",
      },
    ],
  },
};

interface ResourcePageProps {
  params: {
    type: string;
  };
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const { type } = params;
  const resource = resourcesData[type as keyof typeof resourcesData];

  if (!resource) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ThemedPageHeader
        title={resource.title}
        subtitle={resource.description}
        backgroundImage={resource.backgroundImage}
        terminalComment=""
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <ResourceDetail resource={resource} />
      </motion.div>
    </div>
  );
}
