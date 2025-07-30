"use client";

import { useRef, useEffect } from "react";
import { Users, Trophy, BookOpen, Rocket, Skull } from "lucide-react";
import { homePageData } from "@/app/_data/_homeData";

const iconMap: Record<string, any> = {
  Users,
  Trophy,
  BookOpen,
  Rocket,
  Skull
};

const stats = homePageData.stats.map(stat => ({
  ...stat,
  icon: iconMap[stat.iconName]
}));

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimations();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimations = () => {
    // Title animation
    if (titleRef.current) {
      titleRef.current.style.animation =
        "slideUpFade 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards";
    }

    // Subtitle animation with delay
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.animation =
          "slideUpFade 1s cubic-bezier(0.23, 1, 0.32, 1) forwards";
      }
    }, 200);

    // Description animation with delay
    setTimeout(() => {
      if (descriptionRef.current) {
        descriptionRef.current.style.animation =
          "slideUpFade 1s cubic-bezier(0.23, 1, 0.32, 1) forwards";
      }
    }, 400);

    // Stats animation with stagger
    setTimeout(() => {
      const statCards = statsRef.current?.children;
      if (statCards) {
        Array.from(statCards).forEach((card, index) => {
          setTimeout(() => {
            (card as HTMLElement).style.animation =
              "scaleUpFade 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
          }, index * 100);
        });
      }
    }, 600);
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleUpFade {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .stat-card {
          opacity: 0;
          transform: scale(0.8) translateY(40px);
        }

        .content-item {
          opacity: 0;
          transform: translateY(60px);
        }

        .floating-bg {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(103, 126, 234, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(103, 126, 234, 0.15);
        }

        .glow-effect {
          position: relative;
          overflow: hidden;
        }

        .glow-effect::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(103, 126, 234, 0.1) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .glow-effect:hover::before {
          opacity: 1;
        }
      `}</style>

      <div
        ref={containerRef}
        className="h-screen pb-8 px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                   linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                 `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col justify-center">
          {/* Main Content */}
          <div className="text-center mb-20">
            <h1
              ref={titleRef}
              className="content-item text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-nevera"
            >
              <span className="gradient-text">Competative Coding Club</span> 
              <span className="text-cyan-400 font-mono text-lg ml-4">// {`typeOf<IIIT-K>`}</span>
            </h1>

            <p
              ref={subtitleRef}
              className="content-item text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-mono mb-6"
            >
              <span className="text-cyan-400">$</span> cat community_stats.json | grep -E "(innovation|collaboration)"
            </p>

            <p
              ref={descriptionRef}
              className="content-item text-base text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              A community taking <span className="text-green-400 font-mono">beginners.push()</span> to{" "}
              <span className="text-purple-400 font-mono">experts.pop()</span>—a perfect runtime environment to{" "}
              <span className="text-white font-medium font-mono">compile(success)</span> together.
            </p>
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="stat-card bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 
                           border-2 border-cyan-400/20 rounded-xl overflow-hidden
                           shadow-2xl shadow-cyan-500/10 backdrop-blur-sm
                           transition-all duration-300 p-6 text-center group cursor-pointer
                           hover:border-cyan-400/40 hover:shadow-cyan-500/20"
                >
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="bg-slate-700/50 -mx-6 -mt-6 px-4 py-2 mb-4 border-b border-cyan-400/10">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-cyan-400">
                          STAT_{index.toString().padStart(2, "0")}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          0x{Math.random().toString(16).slice(2, 6).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-all duration-300" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono group-hover:text-cyan-300 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 text-xs font-mono uppercase tracking-wide group-hover:text-slate-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
