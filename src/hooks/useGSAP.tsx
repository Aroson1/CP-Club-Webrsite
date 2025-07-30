import { useEffect, useRef } from 'react';

export const useGSAPSmoothScroll = (options = {}) => {
  const smoothScrollerRef = useRef<any>(null);

  useEffect(() => {
    let gsap: any, ScrollTrigger: any, ScrollSmoother: any;
    
    const initGSAP = async () => {
      try {
        gsap = (await import('gsap')).default;
        ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
        ScrollSmoother = (await import('gsap/ScrollSmoother')).ScrollSmoother;
        
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        
        const defaultOptions = {
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
          ...options
        };
        
        smoothScrollerRef.current = ScrollSmoother.create(defaultOptions);
        
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    if (typeof window !== 'undefined') {
      initGSAP();
    }
    
    return () => {
      if (smoothScrollerRef.current) {
        smoothScrollerRef.current.kill();
      }
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  return smoothScrollerRef.current;
};

export const createParallaxEffect = async (selector: string, speed = 0.5) => {
  try {
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);
    
    return gsap.to(selector, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  } catch (error) {
    console.error('Failed to create parallax effect:', error);
  }
};

export const GSAPSmoothScrollWrapper = ({ 
  children, 
  className = "",
  ...options 
}: { 
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  useGSAPSmoothScroll(options);
  
  return (
    <div id="smooth-wrapper" className={className}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};