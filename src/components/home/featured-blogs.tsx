"use client";

import { useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  MarkerType,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
} from "reactflow";
import BlogNode from "../blog-nodes/BlogNode";
import "reactflow/dist/style.css";
import { getRecentBlogs } from "@/app/_data/_blogs-details";

const featuredBlogs = getRecentBlogs(3); // Get the 3 most recent blogs

export function FeaturedBlogs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const blogArticles = featuredBlogs.map((blog) => ({
    id: blog.id.toString(),
    image: blog.image,
    date: blog.date,
    authorName: blog.author,
    title: blog.title,
    tags: blog.tags.slice(0, 2), // Take first 2 tags
  }));

  const initialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [];

    blogArticles.slice(0, 3).forEach((article, index) => {
      nodes.push({
        id: `blog-${index}`,
        type: "blogNode",
        position: { x: index * 320, y: 100 },
        draggable: false,
        data: {
          article,
          nodeIndex: index,
          hasNext: index < 2,
        },
      });
    });

    return nodes;
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];

    for (let i = 0; i < 2; i++) {
      edges.push({
        id: `edge-${i}`,
        source: `blog-${i}`,
        sourceHandle: "forward-blog-source",
        target: `blog-${i + 1}`,
        targetHandle: "forward-blog-target",
        type: "smoothstep",
        animated: true,
        style: { stroke: "#00d4ff", strokeWidth: 3, zIndex: 100 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" },
      });
    }

    return edges;
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      blogNode: BlogNode,
    }),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  return (
    <div className="h-screen py-8 px-6 relative overflow-hidden">
      {/* Terminal-style background patterns */}
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

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto relative z-10 h-full flex flex-col"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-nevera">
            Blog LinkedList
            <span className="text-cyan-400 font-mono text-lg ml-4">
              // traverse(&amp;knowledge)
            </span>
          </h2>

          
        </motion.div>

        {/* ReactFlow Container for Blog Nodes */}
        <motion.div
          variants={itemVariants}
          className="flex-1 overflow-hidden border border-cyan-400/20 rounded-lg"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            // fitViewOptions={{ padding: 0.3 }}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            panOnDrag={false}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
            className="z-400"
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={25}
              size={1.5}
              color="#8e919530"
              className="opacity-30"
            />
          </ReactFlow>
        </motion.div>

        {/* View All Button */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <Button
            asChild
            className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 font-mono"
          >
            <Link href="/blogs" className="flex items-center gap-2">
              <span>blogList.explore()</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
