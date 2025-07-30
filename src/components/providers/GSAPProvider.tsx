"use client";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";

interface GSAPContextType {
  smoother: any;
  refreshSmoother: () => void;
  scrollTo: (target: string | number, options?: any) => void;
}

const GSAPContext = createContext<GSAPContextType | null>(null);

export const useGSAP = () => {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error("useGSAP must be used within a GSAPProvider");
  }
  return context;
};

interface GSAPProviderProps {
  children: ReactNode;
  smoothConfig?: {
    smooth?: number;
    effects?: boolean;
    normalizeScroll?: boolean;
    ignoreMobileResize?: boolean;
  };
}

export const GSAPProvider = ({
  children,
  smoothConfig = {
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true,
  },
}: GSAPProviderProps) => {
  const smootherRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  const initGSAP = async () => {
    if (isInitializedRef.current || typeof window === "undefined") return;

    try {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      const ScrollSmoother = (await import("gsap/ScrollSmoother"))
        .ScrollSmoother;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // Kill existing smoother if it exists
      if (smootherRef.current) {
        smootherRef.current.kill();
      }

      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        ...smoothConfig,
      });

      isInitializedRef.current = true;
    } catch (error) {
      console.error("Failed to initialize GSAP:", error);
    }
  };

  const refreshSmoother = () => {
    if (smootherRef.current) {
      smootherRef.current.refresh();
    }
  };

  const scrollTo = (target: string | number, options: any = {}) => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(target, options);
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(initGSAP, 100);

    return () => {
      clearTimeout(timer);
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      isInitializedRef.current = false;
    };
  }, []);

  // Re-initialize on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        if (smootherRef.current) {
          smootherRef.current.refresh();
        }
      }, 100);
    };

    // Listen for Next.js route changes
    if (typeof window !== "undefined") {
      window.addEventListener("popstate", handleRouteChange);

      // Listen for programmatic navigation
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        handleRouteChange();
      };

      history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        handleRouteChange();
      };

      return () => {
        window.removeEventListener("popstate", handleRouteChange);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    }
  }, []);

  const contextValue: GSAPContextType = {
    smoother: smootherRef.current,
    refreshSmoother,
    scrollTo,
  };

  return (
    <GSAPContext.Provider value={contextValue}>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </GSAPContext.Provider>
  );
};
