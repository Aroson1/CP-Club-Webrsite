"use client";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { FeaturedBlogs } from "@/components/home/featured-blogs";
import { QuotesSection } from "@/components/home/quotes-section";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Toast } from "reactstrap";
import BlogCard from "@/components/blogs/BlogCard";
import { useGSAP } from "@/components/providers/GSAPProvider";

import dots from "@/assets/img/dots.png";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useRef<any>(null);
  const { smoother, refreshSmoother } = useGSAP();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // const res = await fetch(
      //   `${process.env.BACKEND_URL}/api/blogs?page=1&limit=3`
      // );
      // const data = await res.json();
      // setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("index-page");
    fetchBlogs();

    // Initialize parallax effects after GSAP smoother is ready
    const initParallaxEffects = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const ScrollTrigger = (await import("gsap/ScrollTrigger"))
          .ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Wait for smoother to be ready
        if (smoother) {
          // Hero parallax effect
          gsap.to(".hero-parallax", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: ".content-overlay",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              refreshPriority: -1,
            },
          });

          // Content overlay fade-in
          gsap.fromTo(
            ".content-overlay",
            { opacity: 0.8 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: ".content-overlay",
                start: "top bottom",
                end: "top center",
                scrub: true,
              },
            }
          );

          // Blog cards stagger animation
          gsap.fromTo(
            ".blog-card",
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              scrollTrigger: {
                trigger: ".cpc-blog-grids",
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Quote animation
          gsap.fromTo(
            ".cpc-blog-quote",
            { y: 100, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              scrollTrigger: {
                trigger: ".cpc-blog-quote",
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Refresh ScrollTrigger after setup
          ScrollTrigger.refresh();
        }
      } catch (error) {
        console.error("Failed to initialize parallax effects:", error);
      }
    };

    // Wait for smoother to be initialized
    const checkSmoother = () => {
      if (smoother) {
        initParallaxEffects();
      } else {
        setTimeout(checkSmoother, 100);
      }
    };

    checkSmoother();

    return () => {
      document.body.classList.toggle("index-page");
    };
  }, [smoother]);

  useEffect(() => {
    if (error && toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  }, [error]);

  // Refresh smoother when content changes
  useEffect(() => {
    if (!loading && refreshSmoother) {
      setTimeout(refreshSmoother, 100);
    }
  }, [loading, refreshSmoother]);

  return (
    <div className="parallax-container">

      {/* Fixed Hero Section with Parallax */}
      <div className="hero-parallax will-change-transform" data-speed="0.5">
        <HeroSection />
      </div>

      {/* Scrollable Content */}
      <div className="content-overlay will-change-transform" data-speed="1">
        <section className="cpc-blog-grids cpc-related-articles">
          <div className="container">
            <div className="row col-lg-12">
              <div className="cpc-related-title">
                <Container>
                  <Col md="5">
                    <h1 className="profile-title text-left">OUR</h1>
                    <h5 className="text-on-back">Blogs</h5>
                  </Col>
                </Container>
              </div>
            </div>
            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center w-100">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="d-flex justify-content-center align-items-center w-100">
                  <p>{error}</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center w-100">
                  <p>No blogs available.</p>
                </div>
              ) : (
                blogs.map((article, index) => (
                  <div key={index} className="blog-card">
                    <BlogCard article={article} searchTerm={""} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <div className="container">
          <div
            className="cpc-blog-quote will-change-transform"
            data-speed="0.8"
          >
            <i className="lni lni-quotation"></i>
            <p>
              "My CP skills are just like my GF. Imaginary" <br />
            </p>
            <h6>- Vipin Karthic</h6>
          </div>
        </div>
      </div>

      <style jsx>{`
        .parallax-container {
          position: relative;
          min-height: 200vh;
        }

        .hero-parallax {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
        }

        .content-overlay {
          position: relative;
          z-index: 2;
          margin-top: 100vh;
          background: var(--bs-body-bg, #fff);
          min-height: 100vh;
          padding-top: 2rem;
        }

        .content-overlay::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1),
            transparent
          );
          z-index: -1;
        }

        .blog-card {
          opacity: 0;
          transform: translateY(100px);
        }

        .cpc-blog-quote {
          opacity: 0;
          transform: translateY(100px) scale(0.8);
        }
      `}</style>
    </div>
  );
}
