"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutSection from "@/components/home/about-section";
import { FeaturedBlogs } from "@/components/home/featured-blogs";
import RecentEventsSection from "@/components/home/recent-events-section";
import { HeroSection } from "@/components/home/hero-section";
import { Footer } from "@/components/layout/footer";
import { ScrambleText } from "@/components/shared/scramble-text";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { getRecentBlogs } from "@/app/_data/_blogs-details";

interface Blog {
  id: string;
  title: string;
  image: string;
  date: string;
  authorName: string;
  tags: string[];
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      title: "About Us",
      icon: <Users className="w-8 h-8" />,
      content: <AboutSection />,
    },
    {
      title: "Recent Events",
      icon: <Calendar className="w-8 h-8" />,
      content: <RecentEventsSection />,
    },
    {
      title: "Featured Blogs",
      icon: <BookOpen className="w-8 h-8" />,
      content: <FeaturedBlogs />,
    },
  ];

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      throw new Error("Failed to fetch");
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching blogs.");
      const recentBlogs = getRecentBlogs(3).map(blog => ({
        id: blog.id,
        title: blog.title,
        image: blog.image,
        date: blog.date,
        authorName: blog.author,
        // Use only first 3 tags for now
        tags: blog.tags.slice(0, 3) 
      }));
      setBlogs(recentBlogs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("home-page");

    return () => {
      document.documentElement.classList.remove("home-page");
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Main content animation - pin it after hero scroll
      ScrollTrigger.create({
        trigger: mainContentRef.current,
        start: "top top",
        end: `+=${sections.length * 500}vh`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const sectionIndex = Math.floor(self.progress * sections.length);
          const newCurrentSection = Math.min(sectionIndex, sections.length - 1);
          setCurrentSection(newCurrentSection);
          console.log(
            `debug info sectionIndex: ${sectionIndex}, newCurrentSection: ${newCurrentSection}`
          );
        },
      });

      sections.forEach((_, index) => {
        const startProgress = index / sections.length;
        const endProgress = (index + 1) / sections.length;

        ScrollTrigger.create({
          trigger: mainContentRef.current,
          start: "top top",
          end: `+=${sections.length * 500}vh`,
          scrub: 1,
          onUpdate: (self) => {
            const sectionProgress =
              (self.progress - startProgress) / (endProgress - startProgress);
            const clampedProgress = Math.max(0, Math.min(1, sectionProgress));

            const isActiveSection =
              self.progress >= startProgress && self.progress <= endProgress;

            if (isActiveSection) {
              const opacity =
                clampedProgress < 0.2
                  ? clampedProgress * 5
                  : clampedProgress > 0.8
                  ? (1 - clampedProgress) * 5
                  : 1;

              gsap.set(`.section-content-${index}`, {
                opacity: opacity,
                y: (1 - clampedProgress) * 50,
                zIndex: 10,
                pointerEvents: opacity > 0.5 ? "auto" : "none", // Enable interactions only when mostly visible
              });
            } else {
              gsap.set(`.section-content-${index}`, {
                opacity: 0,
                y: 50,
                zIndex: 1,
                pointerEvents: "none", // Disable interactions when hidden
              });
            }
          },
        });
      });
    }, [heroRef, mainContentRef]);

    return () => ctx.revert();
  }, [sections.length]);

  useEffect(() => {
    sections.forEach((_, index) => {
      const element = document.querySelector(
        `.section-content-${index}`
      ) as HTMLElement;
      if (element) {
        if (index === currentSection) {
          element.style.pointerEvents = "auto";
          element.style.zIndex = "10";
        } else {
          element.style.pointerEvents = "none";
          element.style.zIndex = "1";
        }
      }
    });
  }, [currentSection, sections.length]);

  return (
    <div className="relative min-h-screen bg-[#10002b]">
      {/* Animated dots background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* Main Content - Fixed Section */}
      <div ref={mainContentRef} className="relative min-h-screen bg-[#10002b]">
        {/* Vertical Section Title */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30">
          <div className="bg-white-9/40 backdrop-blur-sm border-r border-slate-700/50 p-4 h-screen flex items-center justify-center w-16">
            <div
              ref={sectionTitleRef}
              className="text-white text-3xl font-nevera font-bold tracking-wider transform -rotate-90 origin-center whitespace-nowrap"
            >
              <ScrambleText
                text={sections[currentSection]?.title || ""}
                className="text-white font-nevera"
              />
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="relative z-10 h-full ml-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`section-content-${index} absolute inset-0 opacity-0`}
              style={{
                pointerEvents: index === currentSection ? "auto" : "none",
                zIndex: index === currentSection ? 10 : 1,
              }}
            >
              <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
