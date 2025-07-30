"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "@/components/shared/scramble-text";
import GridBackground from "@/components/grid-background";
import { hallOfFameData } from "../_data/_hallOfFameData";
import { Award, ExternalLink, Quote, Trophy, Star, Crown } from "lucide-react";

export default function HallOfFamePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    setCurrentSection(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = ["", "Hall of Fame"];

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

      {/* Main content */}
      <div className="ml-20 min-h-screen">
        {/* Header Section */}
        <div className="pt-20 pb-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-6"
          >
            {/* Crown Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <Crown className="w-16 h-16 text-yellow-400 drop-shadow-lg" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-6 drop-shadow-lg">
              <span className="text-gray-500">global</span> legends = <span className="text-gray-500">[</span>
            </h1>
            
            <div className="text-lg font-mono text-gray-400 mb-8">
              <span className="text-cyan-400">// </span>Our most distinguished alumni and members who've conquered the world
            </div>

            {/* <div className="text-sm font-mono text-gray-500 border-l-2 border-yellow-400/30 pl-4 max-w-3xl mx-auto text-left">
              <div>{'{'}</div>
              <div className="ml-4 text-gray-400">
                <span className="text-yellow-400">totalImpact</span>: <span className="text-green-400">"$10B+ market value created"</span>, <br/>
                <span className="text-yellow-400">companiesLed</span>: <span className="text-green-400">["Google", "Meta", "Tesla", "OpenAI"]</span>, <br/>
                <span className="text-yellow-400">achievements</span>: <span className="text-green-400">"World-changing innovations"</span>
              </div>
              <div>{'}'}</div>
            </div> */}
          </motion.div>
        </div>

        {/* Legends Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hallOfFameData.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6 transition-all duration-300 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/10 hover:scale-105">
                  {/* Badge/Crown indicator */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2">
                    <Trophy className="w-4 h-4 text-black" />
                  </div>

                  {/* Profile Image */}
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-yellow-400/50 group-hover:border-yellow-400 transition-colors duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {/* Golden glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-mono">
                      {member.title}
                    </p>
                    <p className="text-xs text-cyan-400 font-mono">
                      {member.company}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      Class of {member.batch}
                    </div>
                  </div>

                  {/* Preview of achievements */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs text-gray-400 text-center">
                      <Award className="w-4 h-4 inline mr-1 text-yellow-400" />
                      {member.achievements.length} Major Achievements
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing bracket for the array */}
        <div className="text-center pb-20">
          <div className="text-4xl font-mono font-bold text-gray-500">
            <span>];</span>
          </div>
          <div className="text-sm font-mono text-gray-400 mt-4">
            <span className="text-cyan-400">// </span>And the legend continues...
          </div>
        </div>
      </div>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 h-full"
            style={{ 
              top: scrollY, 
              left: 0, 
              right: 0, 
              bottom: 'auto', 
              minHeight: '100vh',
              height: '100vh'
            }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-400/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedMember.name}</h2>
                  <p className="text-lg text-yellow-400 font-mono">{selectedMember.title}</p>
                  <p className="text-cyan-400 font-mono">{selectedMember.company}</p>
                  <p className="text-gray-400 text-sm mt-2">Class of {selectedMember.batch}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Legendary Achievements
                </h3>
                <ul className="space-y-2">
                  {selectedMember.achievements.map((achievement: string, index: number) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-cyan-400" />
                  Words of Wisdom
                </h3>
                <blockquote className="text-gray-300 italic border-l-4 border-cyan-400/50 pl-4">
                  "{selectedMember.quote}"
                </blockquote>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Current Impact</h3>
                <p className="text-gray-300">{selectedMember.currentRole}</p>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-mono font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
