"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";
import { SortAsc } from "lucide-react";

interface SortNodeData {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortNode = ({ data }: { data: SortNodeData }) => {
  const { sortBy, onSortChange } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group"
    >
      <Handle
        type="source"
        position={Position.Left}
        className="w-3 h-3 bg-green-400 border-2 border-slate-800"
      />

      <div
        className="bg-gradient-to-r from-green-900 to-green-800 
                     border border-green-400/50 rounded-lg p-2 w-56 h-12
                     shadow-lg shadow-green-500/20 backdrop-blur-sm
                     flex items-center gap-2"
      >
        <SortAsc className="h-4 w-4 text-green-300 flex-shrink-0" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="flex-1 px-2 py-1 text-sm bg-slate-700/50 border border-green-400/30 
                   rounded text-white focus:outline-none focus:border-green-400"
          onFocus={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <option value="default">Default Order</option>
          <option value="date">By Date</option>
          <option value="title">By Title</option>
          <option value="author">By Author</option>
        </select>
      </div>
    </motion.div>
  );
};

export default SortNode;
