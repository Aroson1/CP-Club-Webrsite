"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";
import { Zap } from "lucide-react";

const NullNode = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 bg-red-400 border-2 border-slate-800"
      />

      <div
        className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 
                     border-2 border-red-400/50 rounded-2xl p-8 w-72 h-64
                     shadow-2xl shadow-red-500/20 backdrop-blur-sm
                     flex items-center justify-center"
      >
        <div className="text-center">
          <Zap className="h-16 w-16 text-red-300 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-red-200 mb-2">NULL NODE</h3>
          <div className="text-sm text-red-300/70">No more blogs found</div>
          <div className="text-xs font-mono text-red-400 mt-2">0x00000000</div>
        </div>
      </div>
    </motion.div>
  );
};

export default NullNode;
