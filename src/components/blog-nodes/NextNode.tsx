"use client";
import React from "react";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";

interface NextNodeData {
  onNextPage: () => void;
  disabled: boolean;
}

const NextNode = ({ data }: { data: NextNodeData }) => {
  const { onNextPage, disabled } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: [1, 0.95, 1] }}
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
        onClick={disabled ? undefined : onNextPage}
      >
        <span className="text-sm font-bold text-blue-200">NEXT</span>
      </div>
      <Handle
        type="target"
        id="next-target"
        position={Position.Right}
        style={{ top: "50%" }}
        className="w-3 h-3 bg-blue-400 border-2 border-slate-800"
      />
    </motion.div>
  );
};

export default NextNode;
