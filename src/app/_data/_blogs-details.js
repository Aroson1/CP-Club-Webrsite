export const blogPosts = [
  {
    id: "1",
    title: "Getting Started with WebAssembly",
    contentLink: '/blogs/getting-started-with-webassembly.md',
    excerpt: "Learn how to use WebAssembly to boost your web applications' performance with near-native speed.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Alex Morgan",
    authorImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-07-28",
    category: "Web Development",
    views: 1243,
    comments: 24,
    readTime: "8 min read",
    tags: ["WebAssembly", "JavaScript", "Performance", "Web Development"],
    difficulty: "Intermediate",
    featured: true
  },
  {
    id: "2",
    title: "Building Microservices with Kubernetes",
    contentLink: '/blogs/building-microservices-kubernetes.md',
    excerpt: "A deep dive into architecting scalable applications using Kubernetes and containerization.",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Samantha Lee",
    authorImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-07-25",
    category: "DevOps",
    views: 892,
    comments: 18,
    readTime: "12 min read",
    tags: ["Kubernetes", "DevOps", "Microservices", "Docker"],
    difficulty: "Advanced",
    featured: true
  },
  {
    id: "3",
    title: "Rust for Systems Programming",
    contentLink: '/blogs/rust-systems-programming.md',
    excerpt: "Exploring how Rust provides memory safety without sacrificing performance for low-level programming.",
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "James Wilson",
    authorImage: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-07-22",
    category: "Programming Languages",
    views: 1156,
    comments: 31,
    readTime: "10 min read",
    tags: ["Rust", "Systems Programming", "Memory Safety", "Performance"],
    difficulty: "Advanced",
    featured: true
  },
  {
    id: "4",
    title: "Advanced React Patterns",
    contentLink: '/blogs/advanced-react-patterns.md',
    excerpt: "Master complex React patterns including render props, higher-order components, and custom hooks.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Sarah Johnson",
    authorImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-07-20",
    category: "Frontend",
    views: 743,
    comments: 15,
    readTime: "9 min read",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    difficulty: "Intermediate",
    featured: false
  },
  {
    id: "5",
    title: "Building Scalable APIs with Node.js",
    contentLink: '/blogs/scalable-apis-nodejs.md',
    excerpt: "Learn best practices for building high-performance, scalable REST APIs using Node.js and Express.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Michael Chen",
    authorImage: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-07-18",
    category: "Backend",
    views: 654,
    comments: 12,
    readTime: "11 min read",
    tags: ["Node.js", "API", "Backend", "Express", "Scalability"],
    difficulty: "Intermediate",
    featured: false
  },
  {
    id: "6",
    title: "Understanding Data Structures: A Deep Dive into Linked Lists",
    contentLink: '/blogs/data-structures-linked-lists.md',
    excerpt: "Comprehensive guide to linked lists, their implementations, and when to use them effectively.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1260&h=750&fit=crop",
    author: "Alice Johnson",
    authorImage: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-07-15",
    category: "Data Structures",
    views: 987,
    comments: 22,
    readTime: "7 min read",
    tags: ["Data Structures", "Programming", "Algorithms", "Computer Science"],
    difficulty: "Beginner",
    featured: false
  },
  {
    id: "7",
    title: "Machine Learning Fundamentals: Neural Network Basics",
    contentLink: '/blogs/ml-neural-networks.md',
    excerpt: "Introduction to neural networks, how they work, and implementing your first network from scratch.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1260&h=750&fit=crop",
    author: "Carol Williams",
    authorImage: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-07-10",
    category: "Machine Learning",
    views: 1432,
    comments: 28,
    readTime: "15 min read",
    tags: ["Machine Learning", "AI", "Neural Networks", "Python"],
    difficulty: "Intermediate",
    featured: false
  }
];

// Helper functions for getting specific blog data
export const getFeaturedBlogs = () => blogPosts.filter(blog => blog.featured);

export const getRecentBlogs = (count = 3) => 
  blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);

export const getBlogById = (id) => blogPosts.find(blog => blog.id === id);

export const getBlogsByCategory = (category) => 
  blogPosts.filter(blog => blog.category === category);

export const getBlogsByTag = (tag) => 
  blogPosts.filter(blog => blog.tags.includes(tag));