import React from 'react';
import { motion } from 'framer-motion';

interface DataStructureVisualizationProps {
  type: 'stack' | 'queue' | 'tree' | 'graph';
  className?: string;
}

export const DataStructureVisualization: React.FC<DataStructureVisualizationProps> = ({ 
  type, 
  className = "" 
}) => {
  const getVisualization = () => {
    switch (type) {
      case 'stack':
        return (
          <div className={`flex flex-col-reverse items-center gap-1 ${className}`}>
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="w-16 h-8 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-500/50 rounded flex items-center justify-center text-cyan-400 text-sm font-mono"
              >
                {item}
              </motion.div>
            ))}
            <div className="text-xs text-gray-400 mt-2">STACK (LIFO)</div>
          </div>
        );

      case 'queue':
        return (
          <div className={`flex items-center gap-1 ${className}`}>
            <div className="text-xs text-gray-400 mr-2">IN</div>
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-12 h-8 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 rounded flex items-center justify-center text-purple-400 text-sm font-mono"
              >
                {item}
              </motion.div>
            ))}
            <div className="text-xs text-gray-400 ml-2">OUT</div>
            <div className="text-xs text-gray-400 ml-4">QUEUE (FIFO)</div>
          </div>
        );

      case 'tree':
        return (
          <div className={`flex flex-col items-center ${className}`}>
            {/* Root */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-8 h-8 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-500/50 rounded-full flex items-center justify-center text-green-400 text-sm font-mono mb-2"
            >
              1
            </motion.div>
            
            {/* Connections */}
            <div className="flex items-center gap-8 relative">
              <div className="absolute top-0 left-1/2 w-px h-4 bg-green-500/30 transform -translate-x-1/2 -translate-y-4"></div>
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-green-500/30 -translate-y-4"></div>
              
              {/* Children */}
              {[2, 3].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index + 1) * 0.2 }}
                  className="w-8 h-8 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-500/50 rounded-full flex items-center justify-center text-green-400 text-sm font-mono"
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">BINARY TREE</div>
          </div>
        );

      case 'graph':
        return (
          <div className={`relative ${className}`}>
            {/* Nodes */}
            {[
              { id: 'A', x: 20, y: 20 },
              { id: 'B', x: 80, y: 20 },
              { id: 'C', x: 50, y: 60 },
              { id: 'D', x: 20, y: 100 }
            ].map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute w-8 h-8 bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-500/50 rounded-full flex items-center justify-center text-orange-400 text-sm font-mono"
                style={{ left: node.x, top: node.y }}
              >
                {node.id}
              </motion.div>
            ))}
            
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                x1="44" y1="36" x2="64" y2="44"
                stroke="rgb(249 115 22 / 0.3)"
                strokeWidth="2"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                x1="44" y1="36" x2="44" y2="100"
                stroke="rgb(249 115 22 / 0.3)"
                strokeWidth="2"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                x1="64" y1="44" x2="44" y2="116"
                stroke="rgb(249 115 22 / 0.3)"
                strokeWidth="2"
              />
            </svg>
            
            <div className="text-xs text-gray-400 mt-32 text-center">GRAPH</div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="p-4">{getVisualization()}</div>;
};
