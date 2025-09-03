"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "@/components/shared/scramble-text";
import GridBackground from "@/components/grid-background";
import leaderboardData, { getLeaderboardByCategory, getRecentContests, getAverageRating } from "../_data/_leaderboardData";
import { 
  Trophy, 
  Medal, 
  Award, 
  Code, 
  Target, 
  TrendingUp, 
  Users,
  Calendar,
  Cpu,
  Brain,
  MapPin,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LeaderboardPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("contest");
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    setCurrentSection(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = ["", "Leaderboard"];
  const recentContests = getRecentContests();
  const averageRating = getAverageRating();

  const categoryData = {
    contest: getLeaderboardByCategory('contest'),
    codeforces: getLeaderboardByCategory('codeforces')
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <div className="w-6 h-6 flex items-center justify-center text-cyan-400 font-bold text-sm">#{rank}</div>;
    }
  };

  const getContestTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'codeforces': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'atcoder': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'codechef': return 'bg-brown-500/20 text-amber-400 border-amber-500/30';
      case 'leetcode': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'google': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#10002b] relative overflow-hidden">
      <GridBackground />
      
      {/* Matrix-like background pattern */}
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

      {/* Floating code symbols */}
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

      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <h1 className="text-3xl md:text-5xl font-nevera font-bold text-white">
                Max_Heap &lt;Leaderboard&gt; cp_rankings = [
                <span className="text-cyan-400 font-mono text-lg ml-4">
                  // priority_queue&lt;Coder&gt;
                </span>
              </h1>
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-mono">
              <span className="text-cyan-400">$</span> cp_rankings.size() = {leaderboardData.length} | 
              avg_rating = <span className="text-green-400">{averageRating}</span> | 
              top_performer = <span className="text-yellow-400">"{leaderboardData[0]?.name}"</span>
            </p>
          </motion.div>

          {/* Stats Overview - Only Average Rating and Total Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-400 text-sm font-medium">Total Members</p>
                    <p className="text-2xl font-bold text-white">{leaderboardData.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 text-sm font-medium">Average Rating</p>
                    <p className="text-2xl font-bold text-white">{averageRating}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs - Only Contest Ranking and Codeforces Ranking */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <TabsList className="bg-slate-800/50 border border-slate-700/50">
              <TabsTrigger value="contest" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                Contest Ranking
              </TabsTrigger>
              <TabsTrigger value="codeforces" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                Codeforces Ranking
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Leaderboard */}
              <div className="lg:col-span-2">
                <TabsContent value={selectedCategory} className="space-y-4 mt-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCategory}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {categoryData[selectedCategory as keyof typeof categoryData]?.map((member: any, index: number) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card 
                            className={`
                              bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/30 transition-all duration-300
                              ${member.rank <= 3 ? 'ring-2 ring-cyan-500/30' : ''}
                            `}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                {/* Rank */}
                                <div className="flex-shrink-0">
                                  {getRankIcon(member.rank)}
                                </div>

                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-12 h-12 rounded object-cover border-2 border-cyan-500/30"
                                  />
                                </div>

                                {/* Member Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-white truncate">{member.name}</h3>
                                    <span className="text-sm text-gray-400">@{member.username}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-300">
                                    <span className="flex items-center gap-1">
                                      <Code className="w-3 h-3" />
                                      {member.solvedProblems}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Target className="w-3 h-3" />
                                      {member.contestsParticipated}
                                    </span>
                                  </div>
                                </div>

                                {/* Rating */}
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-cyan-400">
                                    {selectedCategory === 'contest' ? member.contestRating : member.codeforcesRating}
                                  </div>
                                  <div className="text-xs text-gray-400">rating</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </TabsContent>
              </div>

              {/* Sidebar Info - Recent Contests */}
              <div className="space-y-6">
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardContent className="p-6">
                    <h3 className="flex items-center gap-2 text-white text-lg font-semibold mb-4">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                      Recent Contests
                    </h3>
                    <div className="space-y-4">
                      {recentContests.map((contest: any, index: number) => (
                        <motion.div
                          key={contest.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-medium text-sm line-clamp-2">
                              {contest.name}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getContestTypeColor(contest.type)}`}>
                              {contest.type}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {contest.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {contest.participants}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-xs">
                              <span className="text-gray-400">Top performer:</span>
                              <span className="text-cyan-400 ml-1 font-medium">
                                {contest.topPerformer}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-green-400">
                              #{contest.topPerformerRank}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
