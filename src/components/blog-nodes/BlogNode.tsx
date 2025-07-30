"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";
import { Calendar, User, Tag } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  image: string;
  date: string;
  authorName: string;
  title: string;
  tags: string[];
}

interface BlogNodeData {
  article: Article;
  nodeIndex: number;
  hasNext: boolean;
  searchTerm?: string;
}

const BlogNode = ({
  data,
  selected,
}: {
  data: BlogNodeData;
  selected?: boolean;
}) => {
  const { article, nodeIndex, searchTerm = "" } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text;

    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i} className="bg-cyan-400/30 text-cyan-300 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1, rotateX: 0 }}
      animate={{
        opacity: 1,
        scale: [1, 0.95, 1],
        rotateX: 0,
        transition: {
          duration: 0.6,
          delay: nodeIndex * 0.05,
          ease: "easeOut",
        },
      }}
      className="relative group perspective-1000"
      style={{ zIndex: 10 }}
    >
      {/* Top handle for head connection */}
      <Handle
        type="target"
        id="blog-head-target"
        position={Position.Top}
        className="w-4 h-4 bg-orange-400 border-2 border-slate-800"
        style={{ zIndex: 20 }}
      />

      {/* Left top handle */}
      <Handle
        id="forward-blog-target"
        type="target"
        position={Position.Left}
        style={{ top: "20%", zIndex: 20 }}
        className="w-4 h-4 bg-blue-400 border-2 border-slate-800"
      />
      {/* Left lower handle */}
      <Handle
        id="reverse-blog-source"
        type="source"
        position={Position.Left}
        style={{ top: "77%", zIndex: 20 }}
        className="w-4 h-4 bg-blue-400 border-2 border-slate-800"
      />

      {/* Right top handle */}
      <Handle
        id="reverse-blog-target"
        type="target"
        position={Position.Right}
        style={{ top: "20%", zIndex: 20 }}
        className="w-4 h-4 bg-blue-400 border-2 border-slate-800"
      />

      {/* Right lower handle */}
      <Handle
        id="forward-blog-source"
        type="source"
        position={Position.Right}
        style={{ top: "77%", zIndex: 20 }}
        className="w-4 h-4 bg-cyan-400 border-2 border-slate-800"
      />

      <div
        className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
             border-2 rounded-2xl overflow-hidden
             shadow-2xl shadow-cyan-500/20 backdrop-blur-sm
             transition-all duration-500 w-72 h-64 flex flex-col
             ${
               selected
                 ? "border-cyan-400 shadow-cyan-500/40"
                 : "border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-cyan-500/30"
             }`}
        style={{ zIndex: 10 }}
      >
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 
               opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        {/* Header */}
        <div className="bg-slate-700/50 px-4 py-2 border-b border-cyan-400/20 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-cyan-400">
              Node #{nodeIndex.toString().padStart(3, "0")}
            </span>
            <span className="text-xs font-mono text-slate-400">
              0x
              {(Math.random() * 0xfffff * 1000000)
                .toString(16)
                .slice(0, 6)
                .toUpperCase()}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="p-4 flex-grow flex flex-col border-b border-slate-600/50 overflow-auto">
          <Link href={`/blogs/${article.id}`}>
            <div className="relative w-full h-14 rounded-lg overflow-hidden mb-3 border border-slate-600 flex-shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <h3
              className="text-sm font-bold text-white mb-2 line-clamp-2 leading-tight
            group-hover:text-cyan-300 transition-colors duration-300 truncate"
            >
              {highlightSearchTerm(article.title, searchTerm)}
            </h3>
          </Link>

          <div className="flex flex-wrap gap-2 text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{article.authorName.split(" ")[0]}</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 bg-slate-600/50 text-slate-300 rounded-md
               border border-slate-500/30 hover:border-cyan-400/50 
               transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
              {article.tags.length > 2 && (
                <span className="text-xs px-2 py-1 bg-slate-600/30 text-slate-400 rounded-md">
                  +{article.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-10 bg-slate-800/80 px-4 flex items-center justify-between flex-shrink-0 border-t border-slate-600/50">
          <div className="flex items-center gap-2">
            <Tag className="h-3 w-3 text-slate-400" />
            <span className="text-xs font-mono text-slate-400">next:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400">
              {data.hasNext
                ? `0x${((nodeIndex + 1) * 1000 + Math.random() * 999)
                    .toString(16)
                    .slice(0, 6)
                    .toUpperCase()}`
                : "NULL"}
            </span>
            {data.hasNext && (
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogNode;
