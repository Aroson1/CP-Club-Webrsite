"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";
import { Search } from "lucide-react";

interface SearchNodeData {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchNode = ({ data }: { data: SearchNodeData }) => {
  const { searchTerm, onSearchChange } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group"
    >
      <div
        className="bg-gradient-to-r from-cyan-900 to-cyan-800 
             border border-cyan-400/50 rounded-lg p-2 w-64 h-12
             shadow-lg shadow-cyan-500/20 backdrop-blur-sm
             flex items-center gap-2"
      >
        <Search className="h-4 w-4 text-cyan-300 ml-1 flex-shrink-0" />
        <input
          type="text"
          defaultValue={searchTerm}
          placeholder="Search articles..."
          className="flex-1 px-2 py-1 text-sm bg-transparent border-none
           text-white placeholder-cyan-300/70 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchChange(e.currentTarget.value);
            }
          }}
          onFocus={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-cyan-400 border-2 border-slate-800"
        />
      </div>
    </motion.div>
  );
};

export default SearchNode;
