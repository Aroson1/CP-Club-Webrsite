"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";

interface PrevNodeData {
  onPrevPage: () => void;
  disabled: boolean;
}

const PrevNode = ({ data }: { data: PrevNodeData }) => {
  const { onPrevPage, disabled } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group"
    >
      <div
        className={`bg-gradient-to-r from-blue-900 to-blue-800 
                     border border-blue-400/50 rounded-md p-4 w-24 h-16
                     shadow-lg shadow-blue-500/20 backdrop-blur-sm
                     flex items-center justify-center cursor-pointer
                     transition-all duration-300
                     ${
                       disabled
                         ? "opacity-50 cursor-not-allowed"
                         : "hover:scale-105 hover:shadow-blue-500/40"
                     }`}
        onClick={disabled ? undefined : onPrevPage}
      >
        <span className="text-sm font-bold text-blue-200">PREV</span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ top: "50%" }}
        className="w-3 h-3 bg-blue-400 border-2 border-slate-800"
      />
    </motion.div>
  );
};

export default PrevNode;
