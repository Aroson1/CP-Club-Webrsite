"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, Eye, MessageSquare, Share2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

interface BlogDetailProps {
  blogId: string;
}

// Sample blog data
const blogPosts = [
  {
    id: "1",
    title: "Getting Started with WebAssembly",
    content: `
# Getting Started with WebAssembly

WebAssembly (Wasm) is a binary instruction format for a stack-based virtual machine. It's designed to be a portable target for the compilation of high-level languages like C, C++, and Rust, enabling deployment on the web for client and server applications.

## Why WebAssembly?

WebAssembly aims to execute at native speed by taking advantage of common hardware capabilities. It's designed to run alongside JavaScript, allowing both to work together.

Key advantages include:

1. **Performance**: Near-native execution speed
2. **Language Support**: Compile from C, C++, Rust, and more
3. **Security**: Runs in a sandboxed execution environment
4. **Open Standard**: Developed as a web standard via the W3C

## Basic Concepts

WebAssembly code is distributed in a binary format called a module. This module contains:

- Function definitions
- Import/export declarations
- Global variables
- Memory and table definitions
- Startup function (optional)

## Your First WebAssembly Module

Let's create a simple module that adds two numbers:

\`\`\`rust
// In Rust
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}
\`\`\`

After compiling this to WebAssembly, you can use it in JavaScript:

\`\`\`javascript
// In JavaScript
WebAssembly.instantiateStreaming(fetch('add.wasm'))
  .then(obj => {
    const add = obj.instance.exports.add;
    console.log(add(40, 2)); // Prints 42
  });
\`\`\`

## Tools for Development

Several tools can help you work with WebAssembly:

- **Emscripten**: Compiles C and C++ to WebAssembly
- **wasm-pack**: Builds Rust projects for WebAssembly
- **Binaryen**: Optimizer and toolchain for WebAssembly
- **WebAssembly Binary Toolkit (WABT)**: Suite of tools for WebAssembly

## WebAssembly Use Cases

WebAssembly excels in compute-intensive scenarios like:

- 3D games and graphics
- Video editing
- Image recognition
- Scientific simulations
- Cryptography
- Music streaming and processing

## Conclusion

WebAssembly represents a significant evolution in web development, bringing near-native performance to the browser. As more languages and tools adopt WebAssembly, we'll continue to see increasingly powerful applications on the web.

Ready to start experimenting? Check out the [official WebAssembly documentation](https://webassembly.org/) to learn more.
    `,
    excerpt: "Learn how to use WebAssembly to boost your web applications' performance with near-native speed.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Alex Morgan",
    authorImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2025-03-15",
    category: "Web Development",
    views: 1243,
    comments: 24
  }
];

export function BlogDetail({ blogId }: BlogDetailProps) {
  const [activeHeading, setActiveHeading] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Find blog post by ID
  const blog = blogPosts.find(post => post.id === blogId);

  if (!blog) {
    return <div className="text-center py-16">Blog post not found</div>;
  }

  // Parse headings for TOC
  const headings: { id: string; text: string; level: number }[] = [];
  const content = blog.content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    const level = hashes.length;
    const id = title.toLowerCase().replace(/[^\w]+/g, '-');
    headings.push({ id, text: title, level });
    return `${'#'.repeat(level)} ${title} {#${id}}`;
  });

  // Scroll to heading when TOC item is clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHeading(id);
    }
  };

  // Check which heading is currently in view
  const checkVisibleHeadings = () => {
    if (!contentRef.current) return;

    const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    for (const heading of Array.from(headingElements)) {
      const rect = heading.getBoundingClientRect();
      const id = heading.id;

      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveHeading(id);
        break;
      }
    }
  };

  // Set up scroll listener for TOC highlighting
  if (typeof window !== 'undefined') {
    contentRef.current?.addEventListener('scroll', checkVisibleHeadings);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/blogs">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blogs
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <motion.div variants={itemVariants}>
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden mb-6">
                <Image 
                  src={blog.image} 
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 right-4 flex flex-col sm:flex-row gap-2">
                  <Badge className="bg-card/80 backdrop-blur-sm hover:bg-card text-card-foreground flex items-center gap-1">
                    <Eye className="h-3 w-3 mr-1" />
                    {blog.views} views
                  </Badge>
                  <Badge className="bg-card/80 backdrop-blur-sm hover:bg-card text-card-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(blog.date)}
                  </Badge>
                  <Badge className="bg-card/80 backdrop-blur-sm hover:bg-card text-card-foreground flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {blog.comments} comments
                  </Badge>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
              
              <div className="flex items-center gap-3 mb-8">
                <Avatar>
                  <AvatarImage src={blog.authorImage} alt={blog.author} />
                  <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {blog.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {blog.category}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              <Separator className="mb-8" />
              
              <div ref={contentRef} className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>
                  {blog.content}
                </ReactMarkdown>
              </div>
              
              <Separator className="my-8" />

              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <h3 className="text-xl font-semibold mb-4">Comments (24)</h3>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Login to join the discussion
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Sign In to Comment
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-3 lg:order-2 order-1">
            <motion.div variants={itemVariants}>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50 lg:sticky lg:top-24">
                <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li 
                      key={heading.id}
                      className={`text-sm cursor-pointer transition-colors ${
                        activeHeading === heading.id 
                          ? 'text-primary font-medium' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      style={{ 
                        paddingLeft: `${(heading.level - 1) * 0.75}rem` 
                      }}
                      onClick={() => scrollToHeading(heading.id)}
                    >
                      {heading.text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}