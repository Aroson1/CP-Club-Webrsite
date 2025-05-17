"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "Getting Started with WebAssembly",
    excerpt: "Learn how to use WebAssembly to boost your web applications' performance with near-native speed.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Alex Morgan",
    date: "2025-03-15",
    category: "Web Development",
    views: 1243
  },
  {
    id: 2,
    title: "Building Microservices with Kubernetes",
    excerpt: "A deep dive into architecting scalable applications using Kubernetes and containerization.",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Samantha Lee",
    date: "2025-03-05",
    category: "DevOps",
    views: 982
  },
  {
    id: 3,
    title: "Rust for Systems Programming",
    excerpt: "Exploring how Rust provides memory safety without sacrificing performance for low-level programming.",
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "James Wilson",
    date: "2025-02-28",
    category: "Languages",
    views: 765
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    excerpt: "An introduction to key ML concepts and how to implement your first neural network.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Priya Patel",
    date: "2025-02-20",
    category: "AI & ML",
    views: 1856
  },
  {
    id: 5,
    title: "Building Real-time Apps with WebSockets",
    excerpt: "How to leverage WebSocket technology for interactive, real-time web applications.",
    image: "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Michael Chen",
    date: "2025-02-15",
    category: "Web Development",
    views: 954
  },
  {
    id: 6,
    title: "Modern CSS Techniques",
    excerpt: "Exploring advanced CSS features like Grid, Custom Properties, and Container Queries.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Emma Johnson",
    date: "2025-02-10",
    category: "Web Development",
    views: 732
  },
  {
    id: 7,
    title: "Introduction to Blockchain Development",
    excerpt: "Understanding the fundamentals of blockchain technology and smart contract development.",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "David Park",
    date: "2025-02-05",
    category: "Blockchain",
    views: 1124
  },
  {
    id: 8,
    title: "Optimizing React Applications",
    excerpt: "Performance tuning techniques for React apps with practical examples and benchmarks.",
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Sophia Williams",
    date: "2025-01-25",
    category: "Web Development",
    views: 1450
  }
];

export function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search blogs..."
              className="pl-10 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <motion.div key={blog.id} variants={itemVariants}>
              <Link href={`/blogs/${blog.id}`}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={blog.image} 
                      alt={blog.title} 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground text-xs">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{blog.excerpt}</p>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground border-t border-border/50 pt-3 flex justify-between">
                    <span>{blog.author}</span>
                    <div className="flex items-center gap-3">
                      <span>{blog.views} views</span>
                      <span>{formatDate(blog.date)}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <motion.div 
            variants={itemVariants}
            className="text-center py-16"
          >
            <p className="text-lg text-muted-foreground">
              No blogs found matching your search. Try a different query.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}