"use client";
import { PageHeader } from "@/components/shared/page-header";
import { ContentPlaceholder } from "@/components/shared/content-placeholder";
import { useEffect, useState } from "react";
import { ScrambleText } from "@/components/shared/scramble-text";
import GridBackground from "@/components/grid-background";

export default function LeaderboardPage() {
  const sections = ["", "Leaderboard"];
  const [currentSection, setCurrentSection] = useState(0);
  useEffect(() => {
    setCurrentSection(1);
  }, []);

  return (
    <div className="min-h-screen">
      <GridBackground />
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30">
        <div className="bg-white-9/40 backdrop-blur-sm border-r border-slate-700/50 p-4 h-screen flex items-center justify-center w-16">
          <div className="text-white text-3xl font-nevera font-bold tracking-wider transform -rotate-90 origin-center whitespace-nowrap">
            <ScrambleText
              text={sections[currentSection] || ""}
              className="text-white font-nevera"
            />
          </div>
        </div>
      </div>
      <ContentPlaceholder title="Member Rankings" />
    </div>
  );
}
