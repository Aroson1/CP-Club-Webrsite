"use client";

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax effect for different elements
  const parallaxValue = scrollY * 0.5;
  const opacityValue = 1 - Math.min(scrollY / 700, 1);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center"
        style={{ transform: `translateY(${parallaxValue * 0.3}px)`, opacity: opacityValue }}
      >
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
      </div>
      
      {/* Content */}
      <div className="relative flex flex-col h-full items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
          style={{ transform: `translateY(${-parallaxValue * 0.2}px)` }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            TechBytes Coding Club
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/90 max-w-2xl mx-auto">
            Learn. Code. Innovate. Join our community of passionate developers and build the future together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Now
            </Button>
            <Button size="lg" variant="outline" className="border-primary hover:bg-primary/10">
              Learn More
            </Button>
          </div>
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: opacityValue }}
          transition={{ delay: 1 }}
          style={{ transform: `translateY(${-parallaxValue * 0.1}px)` }}
        >
          <Button variant="ghost" size="icon" className="animate-bounce" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}