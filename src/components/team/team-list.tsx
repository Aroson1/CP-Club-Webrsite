"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Award,
  Code,
  Github,
  Globe,
  Link as LinkIcon,
  Linkedin,
  User,
  X,
  Briefcase,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { membersList } from "../../app/_data/_ourTeamPage";

const members = membersList.map((member, index) => ({
  id: index + 1,
  name: member.name,
  image: member.image,
  category: member.batch,
  title: member.role,
  bio: member.bio,
  accomplishments: member.achievements || [],
  skills: member.skills || [],
  links: [
    { type: "linkedin", url: member.linkedin || "#" },
    { type: "github", url: member.github || "#" },
  ],
}));

export function TeamListView() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<(typeof members)[0] | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const filteredMembers =
    activeTab === "all"
      ? members
      : members.filter((member) => member.category === activeTab);

  const handleCardClick = (item: (typeof members)[0]) => {
    // setSelectedItem(item);
    // setIsDialogOpen(true);
    if (item.links.length > 0) {
      const linkedinLink = item.links.find((link) => link.type === "linkedin");
      if (linkedinLink) {
        window.open(linkedinLink.url, "_blank");
      }
    }
  };

  function getLinkIcon(type: string) {
    switch (type) {
      case "github":
        return <Github className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "website":
        return <Globe className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  }

  return (
    <section className="py-1">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        <motion.div variants={itemVariants} className="mb-10">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-900/50 border border-cyan-400/20">
                <TabsTrigger
                  value="all"
                  className="font-mono data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400"
                >
                  all[]
                </TabsTrigger>
                <TabsTrigger
                  value="2024"
                  className="font-mono data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400"
                >
                  batch_2024
                </TabsTrigger>
                <TabsTrigger
                  value="2023"
                  className="font-mono data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400"
                >
                  batch_2023
                </TabsTrigger>
                <TabsTrigger
                  value="2022"
                  className="font-mono data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400"
                >
                  batch_2022
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMembers.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/10 hover:scale-105 hover:-translate-y-2">
                  {/* Code-style header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-xs font-mono text-gray-500">
                      <span className="text-cyan-400">class</span> Developer{" "}
                      {"{"}
                    </div>
                    <div className="text-xs font-mono text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">
                      {item.category}
                    </div>
                  </div>

                  {/* Profile Image with terminal border */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="w-full h-full rounded-lg overflow-hidden border-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {/* Terminal glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </div>

                  {/* Member Info */}
                  <div className="space-y-2 text-center">
                    <div className="font-mono text-sm text-gray-400">
                      <span className="text-cyan-400">name</span>:{" "}
                      <span className="text-green-400">"{item.name}"</span>
                    </div>
                    <div className="font-mono text-xs text-gray-400">
                      <span className="text-cyan-400">role</span>:{" "}
                      <span className="text-yellow-400">"{item.title}"</span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-mono text-gray-500 text-center">
                    {"}"}
                  </div>

                  {/* Social links */}
                  <div className="flex justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.links.map((link, idx) => (
                      <button
                        key={idx}
                        className="w-8 h-8 bg-gray-800/50 hover:bg-cyan-400/20 border border-gray-700/50 hover:border-cyan-400/50 rounded flex items-center justify-center transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (link.url !== "#") window.open(link.url, "_blank");
                        }}
                      >
                        {getLinkIcon(link.type)}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="pt-10 pb-2 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-4 drop-shadow-lg font-nevera">
              <span className="text-gray-500">{"}"}</span>
            </h1>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
