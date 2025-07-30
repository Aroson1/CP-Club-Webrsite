"use client";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import toast, { Toaster } from "react-hot-toast";
import "highlight.js/styles/github-dark.css";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Eye,
  MessageSquare,
  Share2,
  User,
  Clock,
  BookOpen,
  Terminal,
  Code2,
  Hash,
  GitBranch,
  Cpu,
  Database,
  Monitor,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "@/app/_data/_blogs-details";
import { ScrambleText } from "../shared/scramble-text";

interface BlogDetailProps {
  blogId: string;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Find blog post by ID
  const blog = blogPosts.find((post) => post.id === blogId);

  // Fetch markdown content
  useEffect(() => {
    if (!blog) return;

    const fetchMarkdownContent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(blog.contentLink);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch markdown content: ${response.status}`
          );
        }

        const content = await response.text();
        setMarkdownContent(content);
      } catch (err) {
        console.error("Error fetching markdown content:", err);
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdownContent();
  }, [blog]);

  // Check which heading is currently in view
  useEffect(() => {
    const checkVisibleHeadings = () => {
      if (!contentRef.current) return;

      const headingElements =
        contentRef.current.querySelectorAll("[data-heading-id]");

      for (const heading of Array.from(headingElements)) {
        const rect = heading.getBoundingClientRect();
        const id = heading.getAttribute("data-heading-id");

        if (rect.top <= 200 && rect.bottom >= 200 && id) {
          setActiveHeading(id);
          break;
        }
      }
    };

    const handleScroll = () => checkVisibleHeadings();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parse headings for TOC using the fetched markdown content
  const headings: { id: string; text: string; level: number }[] = [];
  const content = markdownContent.replace(
    /^(#{1,6})\s+(.+)$/gm,
    (match, hashes, title) => {
      const level = hashes.length;
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      headings.push({ id, text: title, level });
      return `${"#".repeat(level)} ${title}`;
    }
  );

  // Scroll to heading when TOC item is clicked
  const scrollToHeading = (id: string) => {
    // Add delay to ensure DOM is updated
    setTimeout(() => {
      const element = document.querySelector(`[data-heading-id="${id}"]`);
      if (element) {
        const headerOffset = 120; // Account for sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveHeading(id);
      }
    }, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareArticle = async () => {
    const url = window.location.href;
    const title = blog?.title || "";
    const text = blog?.excerpt || "";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        // User cancelled or error occurred, fallback to clipboard
        try {
          await navigator.clipboard.writeText(url);
          toast.success("Link copied to clipboard!", {
            style: {
              background: "#0f172a",
              color: "#64ffda",
              border: "1px solid #22d3ee",
            },
          });
        } catch (clipboardError) {
          toast.error("Failed to copy link", {
            style: {
              background: "#0f172a",
              color: "#ef4444",
              border: "1px solid #ef4444",
            },
          });
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!", {
          style: {
            background: "#0f172a",
            color: "#64ffda",
            border: "1px solid #22d3ee",
          },
        });
      } catch (error) {
        // Fallback for older browsers
        try {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          toast.success("Link copied to clipboard!", {
            style: {
              background: "#0f172a",
              color: "#64ffda",
              border: "1px solid #22d3ee",
            },
          });
        } catch (fallbackError) {
          toast.error("Failed to copy link", {
            style: {
              background: "#0f172a",
              color: "#ef4444",
              border: "1px solid #ef4444",
            },
          });
        }
      }
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div
            className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 
                          border-2 border-red-400/30 rounded-2xl p-8 shadow-2xl shadow-red-500/10"
          >
            <Terminal className="h-16 w-16 text-red-400/80 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-red-400/80 font-mono">
              ERROR: Blog Not Found
            </h2>
            <p className="text-slate-500 font-mono mb-6">
              0x404 - The requested blog post does not exist in the database
            </p>
            <Link href="/blogs">
              <Button
                className="bg-red-500/10 border border-red-400/30 text-red-400/80 
                               hover:bg-red-500/20 font-mono"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Blog List
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div
            className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 
                          border-2 border-cyan-400/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-2 border-cyan-400/30 border-t-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-cyan-400/80 font-mono">
              Loading Article...
            </h2>
            <p className="text-slate-500 font-mono mb-6">
              Fetching markdown content from {blog.contentLink}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div
            className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 
                          border-2 border-red-400/30 rounded-2xl p-8 shadow-2xl shadow-red-500/10"
          >
            <Terminal className="h-16 w-16 text-red-400/80 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-red-400/80 font-mono">
              ERROR: Failed to Load Content
            </h2>
            <p className="text-slate-500 font-mono mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-400/80 
                               hover:bg-cyan-500/20 font-mono"
              >
                Retry
              </Button>
              <Link href="/blogs">
                <Button
                  className="bg-red-500/10 border border-red-400/30 text-red-400/80 
                                 hover:bg-red-500/20 font-mono"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "hidden" : "visible"}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Darker Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-black to-slate-950/80" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

      {/* Floating grid pattern - darker */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
               `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating dots pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
            backgroundSize: "25px 25px",
            backgroundPosition: "12.5px 12.5px",
          }}
        />
      </div>

      {/* Sticky Terminal Header Bar */}
      <motion.div
        variants={itemVariants}
        className="sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-cyan-400/20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div
            className="bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 
                          border border-cyan-400/20 rounded-lg p-3 flex items-center justify-between
                          backdrop-blur-sm shadow-2xl shadow-cyan-500/10"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-white text-xl font-nevera font-bold tracking-wider">
                <ScrambleText
                  text="Blog Details"
                  speed={50}
                  className="text-cyan-300 font-nevera"
                />
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-slate-500">
                PID: {Math.floor(Math.random() * 10000)}
              </span>
              <Link href="/blogs">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/5 
                             font-mono border border-cyan-400/20 hover:border-cyan-400/40
                             bg-slate-900/50"
                >
                  <ArrowLeft className="mr-2 h-3 w-3" />
                  cd ../blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Process Container */}
          <div className="lg:col-span-9 order-1 lg:order-1">
            <motion.article variants={itemVariants}>
              {/* Main Blog Node Container */}
              <div
                className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 
                              border-2 border-cyan-400/20 rounded-2xl overflow-hidden
                              shadow-2xl shadow-cyan-500/10 backdrop-blur-sm mb-8"
              >
                {/* Node Header */}
                <div className="bg-slate-900/60 px-6 py-4 border-b border-cyan-400/10">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-6 w-6 text-cyan-400/80" />
                      <span className="text-lg font-mono text-cyan-400/80">
                        BLOG_NODE
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-mono text-slate-500">
                      <span>ID: {blog.id}</span>
                      <span>
                        0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Featured Image with Overlay */}
                <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover opacity-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Stats Chips - Top of Image */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md 
                                    border border-slate-700/50 rounded-full text-slate-300 text-sm font-mono"
                      >
                        <Eye className="h-3 w-3 text-cyan-400/70" />
                        <span>{blog.views.toLocaleString()}</span>
                      </div>
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md 
                                    border border-slate-700/50 rounded-full text-slate-300 text-sm font-mono"
                      >
                        <MessageSquare className="h-3 w-3 text-cyan-400/70" />
                        <span>{blog.comments}</span>
                      </div>
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md 
                                    border border-slate-700/50 rounded-full text-slate-300 text-sm font-mono"
                      >
                        <Clock className="h-3 w-3 text-cyan-400/70" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category and Tags - Bottom of Image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1 bg-cyan-400/10 text-cyan-400/90 rounded-md 
                                     border border-cyan-400/20 font-mono text-sm backdrop-blur-md
                                     bg-black/40"
                      >
                        {blog.category}
                      </span>
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-800/40 text-slate-300/90 rounded-md 
                                   border border-slate-600/30 font-mono text-sm backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Darker scan lines effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="h-full w-full opacity-5"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                             0deg,
                             transparent,
                             transparent 2px,
                             rgba(6, 182, 212, 0.2) 2px,
                             rgba(6, 182, 212, 0.2) 4px
                           )`,
                      }}
                    />
                  </div>
                </div>

                {/* Article Header */}
                <div className="p-6 border-b border-slate-800/50">
                  <h1
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight 
                                text-slate-100 group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    {blog.title}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-14 h-14 border-2 border-cyan-400/30">
                          <AvatarImage
                            src={blog.authorImage}
                            alt={blog.author}
                          />
                          <AvatarFallback className="bg-slate-900 text-cyan-400/80 font-mono">
                            {blog.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div>
                        <div className="font-semibold text-lg text-slate-200 flex items-center gap-2">
                          <User className="h-4 w-4 text-cyan-400/70" />
                          {blog.author}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                          <Calendar className="h-4 w-4" />
                          {formatDate(blog.date)}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={shareArticle}
                      className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-400/80 
                               hover:bg-cyan-500/20 hover:border-cyan-400/50 font-mono
                               transition-all duration-300 bg-black/20"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      ./share
                    </Button>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/50 rounded-lg p-4">
                    <p className="text-lg text-slate-400 leading-relaxed font-mono">
                      <span className="text-cyan-400/80">$</span> echo "
                      {blog.excerpt}"
                    </p>
                  </div>
                </div>

                {/* Article Content */}
                <div
                  ref={contentRef}
                  className="p-6 prose prose-lg dark:prose-invert max-w-none 
                           prose-headings:scroll-mt-24 prose-headings:text-cyan-400/80 
                           prose-headings:font-mono prose-headings:border-b 
                           prose-headings:border-cyan-400/20 prose-headings:pb-2
                           prose-a:text-cyan-400/80 prose-a:no-underline hover:prose-a:underline 
                           prose-code:bg-slate-950/60 prose-code:text-cyan-400/80 
                           prose-code:px-2 prose-code:py-1 prose-code:rounded 
                           prose-code:border prose-code:border-slate-800/50
                           prose-pre:bg-black/60 prose-pre:border prose-pre:border-slate-800/50
                           prose-pre:shadow-lg prose-pre:shadow-cyan-500/5
                           prose-blockquote:border-l-cyan-400/60 prose-blockquote:bg-slate-950/20 
                           prose-blockquote:px-6 prose-blockquote:py-4 
                           prose-blockquote:rounded-r prose-blockquote:border-r 
                           prose-blockquote:border-slate-800/30
                           prose-strong:text-cyan-400/80 prose-em:text-purple-400/80
                           prose-li:text-slate-400 prose-p:text-slate-400"
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none [&>*:last-child]:mb-0">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      components={{
                        // Custom styling for code blocks
                        code: ({ className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className || "");
                          const isInline = !match;

                          if (isInline) {
                            return (
                              <code
                                className="text-sm bg-slate-900/80 px-2 py-1 rounded font-mono text-cyan-400/90 
                                         border border-slate-700/50"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }

                          return (
                            <code
                              className={`${className} text-sm font-mono block`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        // Custom styling for pre blocks
                        pre: ({ children, ...props }) => (
                          <pre
                            className="bg-slate-950/90 p-4 rounded-lg overflow-x-auto border border-slate-800/50 
                                     shadow-lg shadow-cyan-500/5 my-4"
                            {...props}
                          >
                            {children}
                          </pre>
                        ),
                        // Custom styling for tables
                        table: ({ children, ...props }) => (
                          <div className="overflow-x-auto my-4">
                            <table
                              className="min-w-full border border-border rounded-md"
                              {...props}
                            >
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children, ...props }) => (
                          <th
                            className="border border-border bg-muted px-3 py-2 text-left font-medium text-sm"
                            {...props}
                          >
                            {children}
                          </th>
                        ),
                        td: ({ children, ...props }) => (
                          <td
                            className="border border-border px-3 py-2 text-sm"
                            {...props}
                          >
                            {children}
                          </td>
                        ),
                        // Custom styling for blockquotes
                        blockquote: ({ children, ...props }) => (
                          <blockquote
                            className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r"
                            {...props}
                          >
                            {children}
                          </blockquote>
                        ),
                        // Custom styling for headings
                        h1: ({ children, ...props }) => {
                          const text =
                            typeof children === "string"
                              ? children
                              : children?.toString() || "";
                          const id = text
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-")
                            .replace(/-+/g, "-")
                            .trim();
                          return (
                            <h1
                              className="text-xl font-bold mt-6 text-foreground"
                              data-heading-id={id}
                              {...props}
                            >
                              {children}
                            </h1>
                          );
                        },
                        h2: ({ children, ...props }) => {
                          const text =
                            typeof children === "string"
                              ? children
                              : children?.toString() || "";
                          const id = text
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-")
                            .replace(/-+/g, "-")
                            .trim();
                          return (
                            <h2
                              className="text-lg font-semibold mt-5 mb-3 text-foreground"
                              data-heading-id={id}
                              {...props}
                            >
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children, ...props }) => {
                          const text =
                            typeof children === "string"
                              ? children
                              : children?.toString() || "";
                          const id = text
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-")
                            .replace(/-+/g, "-")
                            .trim();
                          return (
                            <h3
                              className="text-base font-semibold mt-4 mb-2 text-foreground"
                              data-heading-id={id}
                              {...props}
                            >
                              {children}
                            </h3>
                          );
                        },
                        // Custom styling for paragraphs
                        p: ({ children, ...props }) => (
                          <p
                            className=" text-foreground leading-relaxed"
                            {...props}
                          >
                            {children}
                          </p>
                        ),
                        // Custom styling for lists
                        ul: ({ children, ...props }) => (
                          <ul className="list-disc pl-6  space-y-1" {...props}>
                            {children}
                          </ul>
                        ),
                        ol: ({ children, ...props }) => (
                          <ol
                            className="list-decimal pl-6  space-y-1"
                            {...props}
                          >
                            {children}
                          </ol>
                        ),
                        li: ({ children, ...props }) => (
                          <li className="text-foreground" {...props}>
                            {children}
                          </li>
                        ),
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-black/60 px-6 py-4 border-t border-slate-800/50">
                  <div className="flex items-center justify-between text-sm font-mono text-slate-500">
                    <div className="flex items-center gap-4">
                      <span>Process completed successfully</span>
                      <div className="w-2 h-2 bg-green-400/70 rounded-full animate-pulse" />
                    </div>
                    <div>Exit code: 0</div>
                  </div>
                </div>
              </div>

              {/* Comments Section Placeholder */}
              <div
                className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 
                              border-2 border-purple-400/20 rounded-2xl overflow-hidden
                              shadow-2xl shadow-purple-500/10 backdrop-blur-sm"
              >
                <div className="bg-slate-900/60 px-6 py-4 border-b border-purple-400/10">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-purple-400/70" />
                    <span className="text-lg font-mono text-purple-400/70">
                      COMMENTS_THREAD
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-400/30 to-transparent ml-4" />
                    <span className="text-sm font-mono text-slate-500">
                      Coming Soon
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-slate-500 font-mono">
                    <Code2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    {/* TODO @Alex: Implement comments system */}
                    <p>// TODO: Implement comments system</p>
                    <p className="text-sm mt-2">
                      This feature is currently under development
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
          {/* Memory Map Sidebar (Table of Contents) */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            <motion.div variants={itemVariants}>
              <div
                className="sticky top-24 bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 
                              border-2 border-orange-400/20 rounded-2xl overflow-hidden
                              shadow-2xl shadow-orange-500/10 backdrop-blur-sm"
              >
                {/* Header */}
                <div className="bg-slate-900/60 px-4 py-3 border-b border-orange-400/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-orange-400/70" />
                      <span className="text-sm font-mono text-orange-400/70">
                        MEMORY_MAP
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="p-4">
                  <div className="space-y-1">
                    {headings.map((heading, index) => (
                      <button
                        key={heading.id}
                        className={`block w-full text-left text-sm transition-all duration-300 py-2 px-3 rounded-md
                                   font-mono group relative overflow-hidden ${
                                     activeHeading === heading.id
                                       ? "text-orange-400/80 bg-orange-400/5 border border-orange-400/20"
                                       : "text-slate-500 hover:text-orange-400/70 hover:bg-orange-400/5"
                                   }`}
                        style={{
                          paddingLeft: `${0.75 + (heading.level - 1) * 0.5}rem`,
                        }}
                        onClick={() => scrollToHeading(heading.id)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs opacity-60">
                            0x
                            {(index * 100)
                              .toString(16)
                              .padStart(3, "0")
                              .toUpperCase()}
                          </span>
                          <Hash className="h-3 w-3" />
                          <span className="truncate">{heading.text}</span>
                        </div>
                        {activeHeading === heading.id && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <div className="w-2 h-2 bg-orange-400/70 rounded-full animate-pulse" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-black/60 px-4 py-2 border-t border-slate-800/50">
                  <div className="text-xs font-mono text-slate-500 flex items-center justify-between">
                    <span>Sections: {headings.length}</span>
                    <span>Status: READY</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </motion.section>
  );
}
