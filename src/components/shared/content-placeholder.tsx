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
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            We're actively working on this page to bring you valuable content.
            Check back soon for updates!
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card/60 border border-border/50 backdrop-blur-sm">
            <Compass className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-montserrat font-semibold text-lg mb-2">
              Exploring New Features
            </h3>
            <p className="text-muted-foreground">
              We're researching and developing new features for this page.
            </p>
          </Card>

          <Card className="p-6 bg-card/60 border border-border/50 backdrop-blur-sm">
            <Construction className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-montserrat font-semibold text-lg mb-2">
              Building Out Content
            </h3>
            <p className="text-muted-foreground">
              Our team is creating high-quality content for this section.
            </p>
          </Card>

          <Card className="p-6 bg-card/60 border border-border/50 backdrop-blur-sm">
            <Lightbulb className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-montserrat font-semibold text-lg mb-2">
              Gathering Feedback
            </h3>
            <p className="text-muted-foreground">
              We value your input on what you'd like to see here.
            </p>
          </Card>
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