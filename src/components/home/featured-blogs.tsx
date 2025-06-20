"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Masonry from "react-masonry-css";

// Sample blog data
const featuredBlogs = [
  {
    id: 1,
    title: "Getting Started with WebAssembly",
    excerpt: "Learn how to use WebAssembly to boost your web applications' performance with near-native speed.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Alex Morgan",
    date: "2025-03-15",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Building Microservices with Kubernetes",
    excerpt: "A deep dive into architecting scalable applications using Kubernetes and containerization.",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Samantha Lee",
    date: "2025-03-05",
    category: "DevOps"
  },
  {
    id: 3,
    title: "Rust for Systems Programming",
    excerpt: "Exploring how Rust provides memory safety without sacrificing performance for low-level programming.",
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "James Wilson",
    date: "2025-02-28",
    category: "Languages"
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    excerpt: "An introduction to key ML concepts and how to implement your first neural network.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Priya Patel",
    date: "2025-02-20",
    category: "AI & ML"
  },
  {
    id: 5,
    title: "Building Real-time Apps with WebSockets",
    excerpt: "How to leverage WebSocket technology for interactive, real-time web applications.",
    image: "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Michael Chen",
    date: "2025-02-15",
    category: "Web Development"
  }
];

export function FeaturedBlogs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
  };

  return (
    <section className="section-padding bg-background" id="featured-blogs">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Blogs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive into technical articles written by our members covering everything 
              from web development to machine learning and system design.
            </p>
          </motion.div>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {featuredBlogs.map((blog) => (
              <motion.div key={blog.id} variants={itemVariants}>
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </Masonry>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/blogs">
                View All Blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BlogCard({ blog }: { blog: typeof featuredBlogs[0] }) {
  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
        <div className="relative h-48 w-full">
          <Image 
            src={blog.image} 
            alt={blog.title} 
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs font-medium py-1 px-2 rounded">
            {blog.category}
          </div>
        </div>
        <CardContent className="pt-4">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground border-t border-border/50 pt-3 flex justify-between">
          <span>{blog.author}</span>
          <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}