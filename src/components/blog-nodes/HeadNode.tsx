"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";
import { Database } from "lucide-react";

const HeadNode = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group"
    >
      <Handle
        type="target"
        id="search-target"
        position={Position.Left}
        className="w-3 h-3 bg-purple-400 border-2 border-slate-800"
      />

      <div
        className="bg-gradient-to-r from-purple-900 to-purple-800 
                     border border-purple-400 rounded-lg p-2 w-48 h-12
                     shadow-lg shadow-purple-500/20 backdrop-blur-sm
                     flex items-center justify-center"
      >
        <div className="text-center flex items-center gap-2">
          <Database className="h-4 w-4 text-purple-300" />
          <span className="text-sm font-bold text-white">HEAD</span>
        </div>
        
      </div>
     

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-400 border-2 border-slate-800"
      />
      <Handle
        type="target"
        id="sort-target"
        position={Position.Right}
        className="w-3 h-3 bg-purple-400 border-2 border-slate-800"
      />
    </motion.div>
  );
};

export default HeadNode;
