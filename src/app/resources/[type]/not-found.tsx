"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6 max-w-md"
      >
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-red-400" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 font-nevera">
          Resource Not Found
        </h1>
        
        <p className="text-gray-400 mb-8">
          The resource type you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Button
            asChild
            className="w-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 font-mono"
          >
            <Link href="/resources" className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Resources</span>
            </Link>
          </Button>
          
          <div className="text-center">
            <div className="inline-block bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 font-mono text-sm text-gray-400">
              <span className="text-red-400">404:</span> Resource not found
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
