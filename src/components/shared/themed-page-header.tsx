"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ThemedPageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  terminalComment?: string;
}

export function ThemedPageHeader({ 
  title, 
  subtitle, 
  backgroundImage = "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  terminalComment = "// explore the knowledge base"
}: ThemedPageHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div ref={ref} className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-950">
      <div className="absolute inset-0">
        {/* Background image with overlay */}
        <motion.div
          style={{ 
            scale,
            opacity: useTransform(opacity, [0.3, 1], [0.1, 0.3])
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center', 
            }} 
          />
          <div className="absolute inset-0 bg-gray-950/85" />
        </motion.div>

        {/* Terminal grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated scan lines */}
        <div className="absolute inset-0 opacity-[0.02]">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, transparent 25%, transparent 75%, rgba(6, 182, 212, 0.1) 100%)
              `,
              backgroundSize: "200px 200px",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative text-center px-6 z-10 max-w-4xl"
        style={{ y: textY }}
      >
        {/* Terminal prompt */}
        <motion.div 
          variants={itemVariants}
          className="inline-block bg-gray-900/50 border border-cyan-400/30 rounded-lg px-4 py-2 mb-6 font-mono text-sm text-gray-400"
        >
          <span className="text-green-400">$</span> cd /resources/{title.toLowerCase().replace(/\s+/g, '-')} && cat README.md
        </motion.div>

        {/* Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight font-nevera"
        >
          {title}
          <span className="text-cyan-400 font-mono text-lg md:text-xl ml-4 block md:inline">
            {terminalComment}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Decorative elements */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-24"></div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              />
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-24"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}
