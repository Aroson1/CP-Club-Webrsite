"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import "./sidebar.css";
import { navigationData } from "@/app/_data/_navigationData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

  gsap.defaults({
    ease: "main",
    duration: 0.7,
  });
}

const navItems = navigationData.sidebarNavItems;

const Sidebar: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navWrapRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const transitionScreens = [
    {
      backgroundColor: "bg-[#10002b]", // Main dark purple background
      delay: 0,
      duration: 0.7,
      zIndex: 402,
    },
    {
      backgroundColor: "bg-blue-600", // Blue accent
      delay: 0.1,
      duration: 0.3,
      zIndex: 401,
    },
    {
      backgroundColor: "bg-white", // White accent
      delay: 0.2,
      duration: 0.3,
      zIndex: 400,
    },
  ];

  useEffect(() => {
    tlRef.current = gsap.timeline();

    if (navWrapRef.current) {
      gsap.set(navWrapRef.current, { display: "none" });
    }
  }, []);

  const handleNavigate = async (href: string) => {
    if (pathname === href) return;

    // Close the menu if it's open
    if (navWrapRef.current?.getAttribute("data-nav") === "open") {
      await closeNav();
    }

    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push(href);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setIsTransitioning(false);
  };

  const openNav = () => {
    if (!navWrapRef.current || !menuButtonRef.current || !tlRef.current) return;

    const menu = navWrapRef.current.querySelector(".menu");
    const menuButtonTexts = menuButtonRef.current.querySelectorAll("p");
    const menuButtonIcon =
      menuButtonRef.current.querySelector(".menu-button-icon");
    const overlay = navWrapRef.current.querySelector(".overlay");
    const bgPanels = navWrapRef.current.querySelectorAll(".bg-panel");
    const menuLinks = navWrapRef.current.querySelectorAll(".menu-link");
    const fadeTargets = navWrapRef.current.querySelectorAll("[data-menu-fade]");

    navWrapRef.current.setAttribute("data-nav", "open");

    return tlRef.current
      .clear()
      .set(navWrapRef.current, { display: "block" })
      .set(menu, { xPercent: 0 }, "<")
      .fromTo(
        menuButtonTexts,
        { yPercent: 0 },
        { yPercent: -100, stagger: 0.2 }
      )
      .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
      .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
      .fromTo(
        bgPanels,
        { xPercent: 101 },
        { xPercent: 0, stagger: 0.12, duration: 0.575 },
        "<"
      )
      .fromTo(
        menuLinks,
        { yPercent: 170, rotate: 10 },
        { yPercent: 0, rotate: 0, stagger: 0.05 },
        "<+=0.35"
      )
      .fromTo(
        fadeTargets,
        { autoAlpha: 0, yPercent: 50 },
        { autoAlpha: 1, yPercent: 0, stagger: 0.04 },
        "<+=0.2"
      );
  };

  const closeNav = () => {
    if (!navWrapRef.current || !menuButtonRef.current || !tlRef.current) return;

    const menu = navWrapRef.current.querySelector(".menu");
    const menuButtonTexts = menuButtonRef.current.querySelectorAll("p");
    const menuButtonIcon =
      menuButtonRef.current.querySelector(".menu-button-icon");
    const overlay = navWrapRef.current.querySelector(".overlay");

    navWrapRef.current.setAttribute("data-nav", "closed");

    return new Promise<void>((resolve) => {
      tlRef
        .current!.clear()
        .to(overlay, { autoAlpha: 0 })
        .to(menu, { xPercent: 120 }, "<")
        .to(menuButtonTexts, { yPercent: 0 }, "<")
        .to(menuButtonIcon, { rotate: 0 }, "<")
        .set(navWrapRef.current, { display: "none", onComplete: resolve });
    });
  };

  const handleMenuToggle = () => {
    if (!navWrapRef.current) return;
    const state = navWrapRef.current.getAttribute("data-nav");
    if (state === "open") {
      closeNav();
    } else {
      openNav();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" &&
        navWrapRef.current?.getAttribute("data-nav") === "open"
      ) {
        closeNav();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Navbar Header */}
      <div className="osmo-ui">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row ">
              {/* <div className="menu-button-text">
                CODERS' CLUB COTTAYAM
              </div> */}
              <div className="nav-row__right">
                <button
                  ref={menuButtonRef}
                  role="button"
                  data-menu-toggle=""
                  className="menu-button"
                  onClick={handleMenuToggle}
                >
                  <div className="menu-button-text">
                    <p className="p-large">Menu</p>
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                      color="white"
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Sidebar */}
      <section className="cloneable" style={{ position: "absolute" }}>
        <div
          ref={navWrapRef}
          data-nav="closed"
          className="nav"
          style={{ display: "none" }}
        >
          <div
            data-menu-toggle=""
            className="overlay"
            onClick={handleMenuToggle}
          ></div>
          <nav className="menu">
            <div className="menu-bg">
              <div className="bg-panel first"></div>
              <div className="bg-panel second"></div>
              <div className="bg-panel border border-white"></div>
            </div>
            <div className="menu-inner">
              <ul className="menu-list">
                {navItems.map((item, index) => (
                  <li key={index} className="menu-list-item">
                    <button
                      className="menu-link w-inline-block"
                      onClick={() => handleNavigate(item.href)}
                    >
                      <p className="menu-link-heading">{item.name}</p>
                      <p className="eyebrow">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="menu-link-bg"></div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      <AnimatePresence>
        {isTransitioning && (
          <>
            {transitionScreens.map((screen, index) => (
              <motion.div
                key={index}
                initial={{ y: "0%", x: "100%" }}
                animate={{ y: 0, x: 0 }}
                exit={{ y: "0%", x: "-100%" }}
                transition={{
                  duration: screen.duration,
                  delay: screen.delay,
                  ease: "easeInOut",
                }}
                className={`fixed inset-0 ${screen.backgroundColor} rounded-lg`}
                style={{ zIndex: screen.zIndex }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
