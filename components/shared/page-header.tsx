"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  backgroundImage = "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
}: PageHeaderProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={ref} className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ 
          scale,
          opacity
        }}
        className="absolute inset-0 bg-cover bg-center"
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
          }} 
        />
        <div className="absolute inset-0 bg-background/75 backdrop-blur-sm" />
      </motion.div>

      <motion.div 
        className="relative text-center px-6 z-10"
        style={{ y: textY }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-foreground/90"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
}