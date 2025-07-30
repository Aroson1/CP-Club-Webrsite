"use client";

import { useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number; 
}

export function ScrambleText({ text, className = "", speed = 15 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const scrambleText = (newText: string) => {
    if (newText === displayText) return;
    
    setIsScrambling(true);
    let iterations = 0;
    const maxIterations = Math.max(displayText.length, newText.length);

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return newText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return newText[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      iterations += 1 / 3;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(newText);
        setIsScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    scrambleText(text);
  }, [text]);

  return (
    <span className={`font-nevera ${className}`}>
      {displayText}
    </span>
  );
}
