import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Database, Cpu } from 'lucide-react';

interface ComplexityBadgeProps {
  timeComplexity: string;
  spaceComplexity: string;
  className?: string;
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ 
  timeComplexity, 
  spaceComplexity, 
  className = "" 
}) => {
  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('O(1)') || complexity.includes('O(log')) {
      return 'text-green-400 border-green-500/30 bg-green-500/10';
    } else if (complexity.includes('O(n)') && !complexity.includes('O(n²)')) {
      return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    } else if (complexity.includes('O(n²)') || complexity.includes('O(n³)')) {
      return 'text-red-400 border-red-500/30 bg-red-500/10';
    } else {
      return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-mono ${getComplexityColor(timeComplexity)}`}
      >
        <Clock className="w-3 h-3" />
        {timeComplexity}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-mono ${getComplexityColor(spaceComplexity)}`}
      >
        <Database className="w-3 h-3" />
        {spaceComplexity}
      </motion.div>
    </div>
  );
};

interface AlgorithmStatsProps {
  algorithm: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solvedBy: number;
  averageTime: string;
  className?: string;
}

export const AlgorithmStats: React.FC<AlgorithmStatsProps> = ({
  algorithm,
  difficulty,
  solvedBy,
  averageTime,
  className = ""
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'hard': return 'text-red-400 bg-red-500/10';
      default: return 'text-cyan-400 bg-cyan-500/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white text-sm">{algorithm}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-300">
          <TrendingUp className="w-3 h-3 text-cyan-400" />
          <span>{solvedBy} solved</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Cpu className="w-3 h-3 text-purple-400" />
          <span>{averageTime} avg</span>
        </div>
      </div>
    </motion.div>
  );
};
