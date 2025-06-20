"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "The most powerful tool we have as developers is automation.",
    author: "Jeff Atwood",
    role: "Co-founder of Stack Overflow"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
    role: "Author"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    role: "React Consultant & Trainer"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    role: "Software Engineer"
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    role: "Software Developer & Author"
  }
];

export function QuotesSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Generate random index on initial client render
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setActiveQuote(randomIndex);
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-4xl mx-auto text-center container-padding">
        <div className="relative flex flex-col items-center">
          <Quote className="text-primary/40 h-16 w-16 mb-8" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuote}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <p className="text-xl md:text-2xl lg:text-3xl italic mb-6 font-ibm-plex-mono">
                "{quotes[activeQuote].text}"
              </p>
              <div>
                <p className="text-lg md:text-xl font-montserrat font-semibold text-primary">
                  {quotes[activeQuote].author}
                </p>
                <p className="text-muted-foreground">
                  {quotes[activeQuote].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}