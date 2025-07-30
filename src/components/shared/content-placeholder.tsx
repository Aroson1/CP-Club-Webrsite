"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Compass, Construction, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ContentPlaceholderProps {
  title: string;
}

export function ContentPlaceholder({ title }: ContentPlaceholderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center relative">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <Construction className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {title} Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8">
            We're actively working on this page to bring you this content. Check
            back soon for updates!
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
