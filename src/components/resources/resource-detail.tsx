"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Clock, 
  Signal,
  FileText,
  Archive
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  description: string;
  url: string;
  difficulty: string;
  readTime: string;
  tags: string[];
}

interface File {
  id: string;
  name: string;
  description: string;
  type: string;
  size: string;
  downloadUrl: string;
}

interface Resource {
  title: string;
  description: string;
  fullDescription: string;
  backgroundImage: string;
  blogs: Blog[];
  files: File[];
}

interface ResourceDetailProps {
  resource: Resource;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'bg-green-500/20 text-green-400 border-green-400/30';
    case 'intermediate':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    case 'advanced':
      return 'bg-red-500/20 text-red-400 border-red-400/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return FileText;
    case 'json':
    case 'cpp':
    case 'c++':
    case 'markdown':
    case 'text':
      return FileText;
    default:
      return Archive;
  }
};

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const [blogsExpanded, setBlogsExpanded] = useState(true);
  const [filesExpanded, setFilesExpanded] = useState(true);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Detailed Description */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white font-nevera flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              About This Topic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              {resource.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Blogs Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <Button
              variant="ghost"
              onClick={() => setBlogsExpanded(!blogsExpanded)}
              className="w-full justify-between p-0 h-auto hover:bg-transparent"
            >
              <CardTitle className="text-2xl text-white font-nevera flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                Related Blogs ({resource.blogs.length})
              </CardTitle>
              {blogsExpanded ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </Button>
          </CardHeader>
          
          <AnimatePresence>
            {blogsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {resource.blogs.map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gray-800/50 border-gray-600 hover:border-cyan-400/50 transition-colors group">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                  {blog.title}
                                </h3>
                                <p className="text-gray-400 mb-3">
                                  {blog.description}
                                </p>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Signal className="w-4 h-4" />
                                    <Badge className={`text-xs ${getDifficultyColor(blog.difficulty)}`}>
                                      {blog.difficulty}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{blog.readTime}</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {blog.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="text-xs bg-gray-700/50 text-gray-300 border-gray-600"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <Button
                                asChild
                                size="sm"
                                className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20"
                              >
                                <Link href={blog.url} className="flex items-center gap-2">
                                  <span>Read</span>
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Files Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <Button
              variant="ghost"
              onClick={() => setFilesExpanded(!filesExpanded)}
              className="w-full justify-between p-0 h-auto hover:bg-transparent"
            >
              <CardTitle className="text-2xl text-white font-nevera flex items-center gap-3">
                <Download className="w-6 h-6 text-cyan-400" />
                Resource Files ({resource.files.length})
              </CardTitle>
              {filesExpanded ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </Button>
          </CardHeader>
          
          <AnimatePresence>
            {filesExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {resource.files.map((file, index) => {
                      const FileIcon = getFileIcon(file.type);
                      
                      return (
                        <motion.div
                          key={file.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="bg-gray-800/50 border-gray-600 hover:border-cyan-400/50 transition-colors group">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                    <FileIcon className="w-6 h-6 text-cyan-400" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                      {file.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-2">
                                      {file.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                      <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                                        {file.type}
                                      </Badge>
                                      <span>{file.size}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <Button
                                  asChild
                                  size="sm"
                                  className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20"
                                >
                                  <a href={file.downloadUrl} download className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    <span>Download</span>
                                  </a>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Navigation hint */}
      <motion.div
        variants={itemVariants}
        className="text-center pt-8"
      >
        <div className="inline-block bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 font-mono text-sm text-gray-400">
          <span className="text-green-400">$</span> cd /resources && ls -la
        </div>
      </motion.div>
    </motion.div>
  );
}
