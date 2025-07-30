"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code, Cpu, Database } from "lucide-react";
import { resourcesData } from "@/app/_data/_resourcesData";

const iconMap: Record<string, any> = {
  BookOpen,
  Code,
  Cpu,
  Database
};

const resourceTypes = resourcesData.resourceTypes.map(type => ({
  ...type,
  icon: iconMap[type.iconName]
}));

export function ResourceCards() {
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >

        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-nevera">
          Learning Paths
          <span className="text-cyan-400 font-mono text-lg ml-4">
            // choose your adventure
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our curated collection of resources organized by topics to
          accelerate your learning journey.
        </p>
      </motion.div>

      {/* Resource Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {resourceTypes.map((resource) => {
          const IconComponent = resource.icon;

          return (
            <motion.div key={resource.id} variants={cardVariants}>
              <Card
                className={`group bg-gray-900/50 border ${resource.borderColor} ${resource.hoverColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${resource.color} flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl font-nevera">
                          {resource.title}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400 mt-3">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Topics Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-2 font-mono">
                      Key Topics:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {resource.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    asChild
                    className="w-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 font-mono group-hover:border-cyan-300 transition-colors"
                  >
                    <Link
                      href={`/resources/${resource.id}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>./explore {resource.id}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-8"
      >
        <div className="inline-block bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 font-mono text-sm text-gray-400">
          <span className="text-green-400">$</span> find /resources -type
          learning -exec explore {} \;
        </div>
      </motion.div>
    </div>
  );
}
