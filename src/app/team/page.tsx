"use client";
import { PageHeader } from "@/components/shared/page-header";
import { TeamListView } from "@/components/team/team-list";
import { ScrambleText } from "@/components/shared/scramble-text";
import GridBackground from "@/components/grid-background";
import { useState, useEffect } from "react";

export default function TeamPage() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setCurrentSection(1);
  }, []);

  const sections = ["", "Team Array"];

  return (
    <div className="min-h-screen bg-[#10002b] relative overflow-hidden">
      <GridBackground />

      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full ml-20"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
               `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full ml-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
            backgroundSize: "25px 25px",
            backgroundPosition: "12.5px 12.5px",
          }}
        />
      </div>

      {/* Fixed vertical title sidebar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30 h-full">
        <div className="bg-gray-900/50 backdrop-blur-sm border-r border-cyan-400/20 p-4 h-full flex items-center justify-center w-20">
          <div className="text-white text-3xl font-nevera font-bold tracking-wider transform -rotate-90 origin-center whitespace-nowrap">
            <ScrambleText
              text={sections[currentSection]}
              speed={50}
              className="text-cyan-400 font-nevera drop-shadow-lg"
            />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="flex flex-col gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex flex-col gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2 + 1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with left margin to avoid overlap */}
      <div className="flex-1 ml-20">
        {/* Header Section */}
        <div className="pt-10 pb-2 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-4 drop-shadow-lg">
              <span className="text-gray-500">class</span> TeamArray{" "}
              <span className="text-gray-500">{"{"}</span>
            </h1>
            <div className="text-lg font-mono text-gray-400 mb-6">
              <span className="text-cyan-400">// </span>Meet our data structures
              in human form
            </div>
          </div>
        </div>

        <TeamListView />
        
      </div>
    </div>
  );
}
