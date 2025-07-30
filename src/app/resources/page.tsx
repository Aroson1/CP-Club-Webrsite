"use client";

import { motion } from "framer-motion";
import { ThemedPageHeader } from "@/components/shared/themed-page-header";
import { ResourceCards } from "@/components/resources/resource-cards";
import GridBackground from "@/components/grid-background";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <ThemedPageHeader 
        title="Resources" 
        subtitle="Tutorials, guides, and tools to help you on your coding journey."
        backgroundImage="https://images.pexels.com/photos/1102797/pexels-photo-1102797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        terminalComment="// knowledge is power"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <ResourceCards />
      </motion.div>
    </div>
  );
}