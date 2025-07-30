"use client";
import React, { useCallback, useMemo, useState, useEffect, use } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
  Background,
  Controls,
  Connection,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

import SearchNode from "@/components/blog-nodes/SearchNode";
import HeadNode from "@/components/blog-nodes/HeadNode";
import SortNode from "@/components/blog-nodes/SortNode";
import BlogNode from "@/components/blog-nodes/BlogNode";
import NullNode from "@/components/blog-nodes/NullNode";
import PrevNode from "@/components/blog-nodes/PrevNode";
import NextNode from "@/components/blog-nodes/NextNode";
import { sampleArticles, Article } from "@/app/_data/_sampleArticles";
import { blogPosts } from "@/app/_data/_blogs-details";
import { ScrambleText } from "@/components/shared/scramble-text";
import { set } from "date-fns";

const LinkedListFlow = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const ITEMS_PER_PAGE = 6;

  const filteredArticles = useMemo(() => {
    const articlesData = blogPosts.map(blog => ({
      id: blog.id,
      image: blog.image,
      date: blog.date,
      authorName: blog.author,
      title: blog.title,
      tags: blog.tags
    }));
    
    let filtered = articlesData;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = articlesData.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "date":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "title":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        filtered = [...filtered].sort((a, b) =>
          a.authorName.localeCompare(b.authorName)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, sortBy]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, sortBy]);

  // Get current page articles with U-pattern arrangement
  const currentPageArticles = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const articles = filteredArticles.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    // Arrange in U-pattern: 1 2 3, then 6 5 4
    const arranged = [];
    const firstRow = articles.slice(0, 3);
    const secondRow = articles.slice(3, 6).reverse();

    return [...firstRow, ...secondRow];
  }, [filteredArticles, currentPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
  );

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const initialNodes = useMemo(() => {
    const nodes: Node[] = [];

    nodes.push({
      id: "search",
      type: "searchNode",
      position: { x: 300, y: 80 },
      data: {
        searchTerm,
        onSearchChange: handleSearchChange,
      },
      draggable: false,
    });

    nodes.push({
      id: "head",
      type: "headNode",
      position: { x: 650, y: 80 },
      data: {
        totalNodes: filteredArticles.length,
      },
      draggable: false,
    });

    nodes.push({
      id: "sort",
      type: "sortNode",
      position: { x: 950, y: 80 },
      data: {
        sortBy,
        onSortChange: handleSortChange,
      },
      draggable: false,
    });

    // Blog nodes or null node
    if (currentPageArticles.length === 0) {
      nodes.push({
        id: "null-node",
        type: "nullNode",
        position: { x: 650, y: 250 },
        data: {},
        draggable: true,
      });
    } else {
      if (currentPage !== 0) {
        nodes.push({
          id: "prev-btn",
          type: "prevNode",
          position: { x: 50, y: 320 },
          data: {
            onPrevPage: handlePrevPage,
          },
          draggable: false,
        });
      }

      currentPageArticles.forEach((article, index) => {
        let x, y;

        if (index < 3) {
          // First row: 0, 1, 2
          x = 200 + index * 380;
          y = 250;
        } else {
          // Second row: 5, 4, 3 (reversed visually)
          const reverseIndex = index - 3;
          x = 200 + (2 - reverseIndex) * 380;
          y = 600;
        }

        nodes.push({
          id: `node-${index}`,
          type: "blogNode",
          position: { x, y },
          data: {
            article,
            nodeIndex: index,
            hasNext: index < currentPageArticles.length - 1,
            searchTerm,
          },
          draggable: true,
        });
      });

      if (currentPage < totalPages - 1) {
        nodes.push({
          id: "next-btn",
          type: "nextNode",
          position: { x: 50, y: 700 },
          data: {
            onNextPage: handleNextPage,
          },
          draggable: false,
        });
      }
      
      if (currentPage === totalPages - 1) {
        const lastNodeIndex = currentPageArticles.length - 1;
        let nullX, nullY;

        if (lastNodeIndex < 3) {
          nullX = 200 + (lastNodeIndex + 1) * 380;
          nullY = 250;
        } else {
          nullX = 200 + (2 - (lastNodeIndex - 3)) * 380 - 380;
          nullY = 600;
        }

        nodes.push({
          id: "end-null",
          type: "nullNode",
          position: { x: nullX, y: nullY },
          data: {},
          draggable: true,
        });
      }
    }

    return nodes;
  }, [
    currentPageArticles,
    searchTerm,
    sortBy,
    currentPage,
    totalPages,
    filteredArticles.length,
    handleSearchChange,
    handleSortChange,
    handlePrevPage,
    handleNextPage,
  ]);

  const initialEdges = useMemo(() => {
    const edges: Edge[] = [];

    if (!isInitialized) return edges;

    edges.push(
      {
        id: "search-to-head",
        source: "search",
        target: "head",
        type: "bezier",
        animated: true,
        style: { stroke: "#06b6d4", strokeWidth: 3, zIndex: 100 },
        // markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" },
      },
      {
        id: "sort-to-head",
        source: "sort",
        target: "head",
        targetHandle: "sort-target",
        type: "bezier",
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 3, zIndex: 100 },
        // markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
      }
    );

    if (currentPageArticles.length === 0) {
      // Head to null node
      edges.push({
        id: "head-to-null",
        source: "head",
        target: "null-node",
        type: "bezier",
        animated: true,
        style: { stroke: "#ef4444", strokeWidth: 3, zIndex: 100 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
      });
    } else {
      // Previous button to first node (using left handle of blog node)
      edges.push({
        id: "prev-to-first",
        source: "prev-btn",
        target: "node-0",
        targetHandle: "forward-blog-target",
        type: "bezier",
        animated: currentPage > 0,
        style: {
          stroke: currentPage > 0 ? "#3b82f6" : "#64748b",
          strokeWidth: 3,
          opacity: currentPage > 0 ? 1 : 0.5,
          zIndex: 100,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: currentPage > 0 ? "#3b82f6" : "#64748b",
        },
      });

      // Head to first node
      edges.push({
        id: "head-to-first",
        source: "head",
        target: "node-0",
        type: "bezier",
        animated: true,
        style: { stroke: "#a855f7", strokeWidth: 3, zIndex: 100 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" },
      });

      // Blog node connections following U-pattern
      for (let i = 0; i < currentPageArticles.length - 1; i++) {
        let isLastNode = i == 2;
        let isSecondRow = i >= 3;

        {
          edges.push({
            id: `edge-${i}`,
            source: `node-${i}`,
            sourceHandle: isSecondRow
              ? "reverse-blog-source"
              : "forward-blog-source",
            target: `node-${i + 1}`,
            targetHandle: isSecondRow
              ? "reverse-blog-target"
              : !isLastNode
              ? "forward-blog-target"
              : "reverse-blog-target",
            type: isLastNode ? "smoothstep" : "smoothstep",
            animated: true,
            style: { stroke: "#00d4ff", strokeWidth: 3, zIndex: 100 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" },
          });
        }
      }

      // Last node to next button
      edges.push({
        id: "last-to-next",
        source: `node-5`,
        sourceHandle: "reverse-blog-source",
        target: "next-btn",
        targetHandle: "next-target",
        type: "bezier",
        animated: currentPage < totalPages - 1,
        style: {
          stroke: currentPage < totalPages - 1 ? "#3b82f6" : "#64748b",
          strokeWidth: 3,
          opacity: currentPage < totalPages - 1 ? 1 : 0.5,
          zIndex: 100,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: currentPage < totalPages - 1 ? "#3b82f6" : "#64748b",
        },
      });

      // Last node to end null (if last page)
      if (currentPage === totalPages - 1) {
        edges.push({
          id: "last-to-end-null",
          source: `node-${currentPageArticles.length - 1}`,
          sourceHandle:
            currentPageArticles.length <= 3
              ? "forward-blog-source"
              : "reverse-blog-source",
          target: "end-null",
          type: "smoothstep",
          animated: true,
          style: { stroke: "#ef4444", strokeWidth: 3, zIndex: 100 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
        });
      }
    }

    return edges;
  }, [currentPageArticles, currentPage, totalPages, isInitialized]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    if (isInitialized) {
      // Small delay to ensure nodes are positioned before creating edges
      const timer = setTimeout(() => {
        setEdges(initialEdges);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [initialEdges, isInitialized, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      blogNode: BlogNode,
      headNode: HeadNode,
      searchNode: SearchNode,
      sortNode: SortNode,
      nullNode: NullNode,
      prevNode: PrevNode,
      nextNode: NextNode,
    }),
    []
  );

  const sections = ["", "Blogs"];
  const [currentSection, setCurrentSection] = useState(0);
  useEffect(() => {
    setCurrentSection(1);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-950">
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

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        connectionLineType={ConnectionLineType.Bezier}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        className="bg-transparent"
        minZoom={0.3}
        maxZoom={1.2}
        panOnDrag={true}
        panOnScroll={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={25}
          size={1.5}
          color="#06b6d4"
          className="opacity-20"
        />

        <Panel
          position="bottom-right"
          className="bg-slate-800/90 border border-cyan-400/30 backdrop-blur-sm rounded-lg p-3"
        >
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <span className="text-slate-500">•</span>
            <span>{filteredArticles.length} blogs</span>
          </div>
          <div className="text-[10px] text-slate-300 flex items-center justify-center gap-2 mt-2">
            {`ps: try draging :)`}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default LinkedListFlow;
