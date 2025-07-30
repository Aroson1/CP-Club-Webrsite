"use client";
import React, { useState, useEffect } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import GridBackground from "@/components/grid-background";
import { ScrambleText } from "@/components/shared/scramble-text";

export default function EventsPage() {
  const items = [
    {
      title: "Summer Music Festival",
      date: "July 15, 2024",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Tech Innovation Summit",
      date: "August 20, 2024",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Art and Culture Expo",
      date: "September 10, 2024",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Digital Art Workshop",
      date: "October 5, 2024",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Community Hackathon",
      date: "November 12, 2024",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const generatePositions = (numCards: number) => {
    const positions = [];
    const centerX = 50; 
    const centerY = 50; 

    // Base radius for spreading from center
    const baseRadius = 15; // Percentage units
    const overlapFactor = 0.7;

    for (let i = 0; i < numCards; i++) {
      if (i === 0) {
        // First card at center
        positions.push({
          x: centerX,
          y: centerY,
          rotation: 0,
        });
      } else {
        // Spiral pattern with controlled overlap
        const angle = i * 137.5 * (Math.PI / 180); // ITS ZA GOLDEN ANGLE
        const radius = baseRadius * Math.sqrt(i) * overlapFactor;

        // Random offset to add some variation
        const randomOffset = (Math.random() - 0.5) * 8;
        const randomRotation = (Math.random() - 0.5) * 20; // -10 to +10 degrees

        const x = centerX + radius * Math.cos(angle) + randomOffset;
        const y = centerY + radius * Math.sin(angle) + randomOffset;

        positions.push({
          x: Math.max(10, Math.min(85, x)), // Keep within bounds (10% to 85%)
          y: Math.max(15, Math.min(80, y)), // Keep within bounds (15% to 80%)
          rotation: randomRotation,
        });
      }
    }

    return positions;
  };

  const [positions, setPositions] = useState<
    Array<{ x: number; y: number; rotation: number }>
  >([]);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setPositions(generatePositions(items.length));
    setCurrentSection(1);
  }, [items.length]);

  const sections = ["", "Events"];

  return (
    <div className="min-h-screen bg-[#10002b] relative overflow-hidden">
      {/* Title Sidebar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30">
        <div className="bg-gray-900/50 backdrop-blur-sm border-r border-cyan-400/20 p-4 h-screen flex items-center justify-center w-20">
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

      <GridBackground />

      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip ml-20">
        <>
          <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-slate-500 md:text-4xl font-mono">
            No more events.
          </p>
          {items.map((item, index) => {
            const position = positions[index];
            if (!position) return null;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
                }}
              >
                <DraggableCardBody className="polaroid-card">
                  <div
                    className="relative bg-white dark:bg-neutral-50 p-4 pb-20 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                    style={{
                      background:
                        "linear-gradient(145deg, #fefefe 0%, #f8f8f8 100%)",
                      boxShadow:
                        "0 12px 24px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Polaroid photo area */}
                    <div
                      className="relative mb-4 bg-gray-50 border-2 border-gray-100"
                      style={{ aspectRatio: "1/1" }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="pointer-events-none w-full h-full object-cover"
                        style={{
                          filter:
                            "contrast(1.08) saturate(0.92) brightness(0.96) sepia(0.05)",
                        }}
                      />

                      {/* Film grain texture */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-25"
                        style={{
                          backgroundImage: `
                    radial-gradient(circle at 25% 25%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%),
                    radial-gradient(circle at 75% 75%, transparent 20%, rgba(0,0,0,0.1) 21%, rgba(0,0,0,0.1) 25%, transparent 26%),
                    linear-gradient(0deg, rgba(255,255,255,0.05) 50%, transparent 50%)
                  `,
                          backgroundSize: "4px 4px, 3px 3px, 1px 1px",
                        }}
                      />

                      {/* Glossy photo reflection */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40"
                        style={{
                          background:
                            "linear-gradient(125deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)",
                        }}
                      />

                      {/* Vignette effect */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          background:
                            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.15) 100%)",
                        }}
                      />
                    </div>

                    {/* Handwritten caption area */}
                    <div className="space-y-3 px-2">
                      <h3
                        className="text-lg font-medium text-neutral-700 dark:text-neutral-600 text-center leading-relaxed"
                        style={{
                          fontFamily:
                            '"Kalam", "Comic Sans MS", cursive, sans-serif',
                          transform: `rotate(${
                            (index % 2 === 0 ? 1 : -1) * 0.8
                          }deg)`,
                          textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm text-neutral-500 dark:text-neutral-400 text-center"
                        style={{
                          fontFamily:
                            '"Kalam", "Comic Sans MS", cursive, sans-serif',
                          transform: `rotate(${
                            (index % 2 === 0 ? -1 : 1) * 0.5
                          }deg)`,
                        }}
                      >
                        {item.date}
                      </p>

                      {/* Blog Link Button */}
                      <div className="flex justify-center mt-3">
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                           border border-cyan-400/30 rounded-lg text-sm font-mono text-cyan-400
                           hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50
                           transition-all duration-300 transform hover:scale-105"
                          style={{
                            boxShadow: "0 2px 8px rgba(6, 182, 212, 0.15)",
                            backdropFilter: "blur(10px)",
                          }}
                          onClick={() => {
                            //TODO @Alex: Navigate to correct blog page
                            window.location.href = "/blogs";
                          }}
                        >
                          Read Blog →
                        </button>
                      </div>
                    </div>

                    {/* Tape pieces */}
                    <div
                      className="absolute -top-3 -left-3 w-14 h-7 opacity-75"
                      style={{
                        background:
                          "linear-gradient(45deg, #f5f5dc 0%, #ebe6c8 30%, #e0dbb0 70%, #d4d4aa 100%)",
                        transform: "rotate(45deg)",
                        boxShadow:
                          "0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "1px",
                      }}
                    />
                    <div
                      className="absolute -top-3 -right-3 w-14 h-7 opacity-75"
                      style={{
                        background:
                          "linear-gradient(-45deg, #f5f5dc 0%, #ebe6c8 30%, #e0dbb0 70%, #d4d4aa 100%)",
                        transform: "rotate(-45deg)",
                        boxShadow:
                          "0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "1px",
                      }}
                    />

                    {/* Random aging effects - coffee stains, water marks, and fingerprints */}
                    {(() => {
                      const agingEffects = [];
                      const seed = index * 123; // Consistent randomness based on index

                      // Generate 2-4 random aging effects per card
                      const numEffects = 2 + (seed % 3);

                      for (let i = 0; i < numEffects; i++) {
                        const effectSeed = seed + i * 456;
                        const effectType = effectSeed % 5;
                        const x = 10 + (effectSeed % 70); // 10-80% from left
                        const y = 10 + ((effectSeed * 7) % 70); // 10-80% from top
                        const size = 8 + (effectSeed % 15); // 8-22px size
                        const opacity = 0.04 + (effectSeed % 10) / 100; // 0.04-0.13 opacity
                        const rotation = effectSeed % 360;

                        if (effectType === 0) {
                          // Coffee stain
                          agingEffects.push(
                            <div
                              key={`coffee-${i}`}
                              className="absolute rounded-full"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: `${size}px`,
                                height: `${size * 0.8}px`,
                                background: `radial-gradient(ellipse, #8B4513 0%, #A0522D 30%, transparent 70%)`,
                                opacity: opacity * 2,
                                filter: "blur(0.8px)",
                                transform: `rotate(${rotation}deg)`,
                              }}
                            />
                          );
                        } else if (effectType === 1) {
                          // Water stain ring
                          agingEffects.push(
                            <div
                              key={`water-${i}`}
                              className="absolute rounded-full border"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: `${size + 5}px`,
                                height: `${size + 5}px`,
                                borderColor: `rgba(139, 69, 19, ${
                                  opacity * 1.5
                                })`,
                                borderWidth: "0.5px",
                                filter: "blur(0.3px)",
                              }}
                            />
                          );
                        } else if (effectType === 2) {
                          // Fingerprint smudge
                          agingEffects.push(
                            <div
                              key={`finger-${i}`}
                              className="absolute"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: `${size}px`,
                                height: `${size * 1.5}px`,
                                background: `radial-gradient(ellipse, rgba(105, 105, 105, ${
                                  opacity * 3
                                }) 0%, transparent 60%)`,
                                filter: "blur(1px)",
                                transform: `rotate(${rotation}deg)`,
                              }}
                            />
                          );
                        } else if (effectType === 3) {
                          // Small dirt spot
                          agingEffects.push(
                            <div
                              key={`dirt-${i}`}
                              className="absolute"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: `${Math.max(3, size * 0.6)}px`,
                                height: `${Math.max(3, size * 0.6)}px`,
                                background: `rgba(101, 67, 33, ${
                                  opacity * 2.5
                                })`,
                                borderRadius: `${
                                  effectSeed % 3 === 0 ? "50%" : "2px"
                                }`,
                                filter: "blur(0.2px)",
                              }}
                            />
                          );
                        } else {
                          // Faded yellow aging spot
                          agingEffects.push(
                            <div
                              key={`yellow-${i}`}
                              className="absolute"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: `${size + 8}px`,
                                height: `${size + 6}px`,
                                background: `radial-gradient(ellipse, rgba(218, 165, 32, ${opacity}) 0%, transparent 80%)`,
                                filter: "blur(1.5px)",
                                transform: `rotate(${rotation}deg)`,
                              }}
                            />
                          );
                        }
                      }

                      return agingEffects;
                    })()}

                    {/* Random corner wear effects */}
                    {(() => {
                      const cornerEffects = [];
                      const seed = index * 789;

                      // Randomly determine which corners have wear (1-3 corners)
                      const corners = ["tl", "tr", "bl", "br"];
                      const numCorners = 1 + (seed % 3);

                      for (let i = 0; i < numCorners; i++) {
                        const cornerSeed = seed + i * 234;
                        const corner = corners[cornerSeed % 4];
                        const size = 4 + (cornerSeed % 8); // 4-12px
                        const opacity = 0.08 + (cornerSeed % 8) / 100; // 0.08-0.15 opacity
                        const wearIntensity = 0.1 + (cornerSeed % 15) / 100; // 0.1-0.25

                        let cornerStyle = {};
                        let cornerClass = "absolute";

                        switch (corner) {
                          case "tl":
                            cornerStyle = {
                              top: 0,
                              left: 0,
                              width: `${size}px`,
                              height: `${size}px`,
                              background: `linear-gradient(45deg, rgba(139,69,19,${wearIntensity}) 0%, transparent 70%)`,
                              borderRadius: "4px 0 0 0",
                              opacity: opacity,
                            };
                            break;
                          case "tr":
                            cornerStyle = {
                              top: 0,
                              right: 0,
                              width: `${size}px`,
                              height: `${size}px`,
                              background: `linear-gradient(-45deg, rgba(139,69,19,${wearIntensity}) 0%, transparent 70%)`,
                              borderRadius: "0 4px 0 0",
                              opacity: opacity,
                            };
                            break;
                          case "bl":
                            cornerStyle = {
                              bottom: 0,
                              left: 0,
                              width: `${size}px`,
                              height: `${size}px`,
                              background: `linear-gradient(135deg, rgba(139,69,19,${wearIntensity}) 0%, transparent 70%)`,
                              borderRadius: "0 0 0 4px",
                              opacity: opacity,
                            };
                            break;
                          case "br":
                            cornerStyle = {
                              bottom: 0,
                              right: 0,
                              width: `${size}px`,
                              height: `${size}px`,
                              background: `linear-gradient(-135deg, rgba(139,69,19,${wearIntensity}) 0%, transparent 70%)`,
                              borderRadius: "0 0 4px 0",
                              opacity: opacity,
                            };
                            break;
                        }

                        cornerEffects.push(
                          <div
                            key={`corner-${corner}-${i}`}
                            className={cornerClass}
                            style={cornerStyle}
                          />
                        );
                      }

                      return cornerEffects;
                    })()}

                    {/* Paper texture overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-15"
                      style={{
                        backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px),
                  repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)
                `,
                        backgroundSize: "2px 2px",
                      }}
                    />
                  </div>
                </DraggableCardBody>
              </div>
            );
          })}
        </>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap");

          .polaroid-card {
            filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.15))
              drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .polaroid-card:hover {
            filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.2))
              drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15));
          }

          .polaroid-card:active {
            filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.2));
            transform: scale(0.98) !important;
          }
        `}</style>
      </DraggableCardContainer>
    </div>
  );
}
