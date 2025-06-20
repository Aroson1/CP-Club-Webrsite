// components/HeroIframe.js
import { useEffect, useRef, useState } from "react";

export function HeroIframe() {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState("600px"); // initial guess

  // Optionally auto-resize the iframe height to match its content.
  useEffect(() => {
    function adjustHeight() {
      if (!iframeRef.current) return;
      try {
        const doc = iframeRef.current.contentDocument;
        if (doc && doc.body) {
          // measure the full height of <body> inside the iframe
          const newHeight = doc.body.scrollHeight + "px";
          setHeight(newHeight);
        }
      } catch (e) {
        // cross‐origin restrictions? Unlikely if hero.html is on same domain.
      }
    }

    const frame = iframeRef.current;
    if (frame) {
      frame.addEventListener("load", adjustHeight);
    }
    // Clean up listener on unmount
    return () => {
      if (frame) frame.removeEventListener("load", adjustHeight);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="/hero.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "0",
        overflow: "hidden",
      }}
      scrolling="no"
      title="Hero Slider"
    />
  );
}

export function HeroSection() {
  return (
    <section className="hero-section">
      <HeroIframe />
    </section>
  );
}
