import { useEffect, useRef, useState } from "react";

export function HeroIframe() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState("100vh");
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload the iframe content
  useEffect(() => {
    const preloadFrame = document.createElement("iframe");
    preloadFrame.style.display = "none";
    preloadFrame.src = "/hero.html";
    preloadFrame.onload = () => {
      setIsLoaded(true);
      document.body.removeChild(preloadFrame);
    };
    document.body.appendChild(preloadFrame);

    return () => {
      if (document.body.contains(preloadFrame)) {
        document.body.removeChild(preloadFrame);
      }
    };
  }, []);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    const adjustHeight = () => {
      try {
        const doc = frame.contentDocument;
        if (doc?.body) {
          setHeight(doc.body.scrollHeight + "px");
        }
      } catch (error) {
        console.error("Error accessing iframe content:", frame.src);
        setHeight("100vh");
      }
    };

    frame.addEventListener("load", adjustHeight);
    return () => frame.removeEventListener("load", adjustHeight);
  }, []);

  return (
    <div className="relative w-full h-[100vh]">
      <iframe
        ref={iframeRef}
        src="/hero.html"
        className="w-full h-full border-0"
        scrolling="no"
        title="Hero Slider"
      />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="hero-section bg-[#10002b]"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <iframe
          src="/hero.html"
          style={{
            width: "100%",
            height: "100vh",
            border: "0",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
          }}
          scrolling="no"
          title="Hero Slider"
        />
      </div>
    </section>
  );
}
