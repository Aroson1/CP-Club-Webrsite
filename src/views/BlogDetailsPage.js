import React, { useEffect, useState, useRef } from "react";
import { Container, Row } from "reactstrap";
import BlogCard from "components/BlogCard";
import SideBar from "components/Navbars/SideBar.js";
import { Toast } from "primereact/toast";
import apiService from "../apiService";
import "../assets/css/sidebar.css";
import "../assets/css/blog.css";
import "../assets/css/lineicons.css";
import "../assets/css/github-markdown.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "tocbot/dist/tocbot.css";
import tocbot from "tocbot";

export default function BlogDetailsPage() {
  const [blogDetail, setBlogDetail] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const pageId = urlParams.get("id");

  const fetchBlogDetail = async (id) => {
    if (!id) {
      setError("No blog ID provided");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.get(`/v1/blogs/${id}`);
      setBlogDetail(response);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching the blog details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const response = await apiService.get("/v1/blogs", {
        page: 1,
        limit: 3,
      });
      setRelatedArticles(response.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("index-page");
    fetchBlogDetail(pageId);
    fetchRelatedArticles();
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, [pageId]);

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

  useEffect(() => {
    if (blogDetail?.content) {
      setTimeout(() => {
        tocbot.init({
          tocSelector: ".toc",
          contentSelector: ".markdown-body",
          headingSelector: "h1, h2, h3, h4, h5, h6",
          scrollSmooth: true,
          headingsOffset: 40,
          scrollSmoothOffset: -40,
          fixedSidebarOffset: 500,
          positionFixedClass: "is-position-fixed",
          positionFixedSelector: ".cpc-blog-sidebar",
        });
      }, 100);

      return () => tocbot.destroy();
    }
  }, [blogDetail]);

  return (
    <section className="">
      <SideBar />
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />
      <Toast ref={toast} />

      <section className="cpc-blog-details cpc-related-articles">
        <Container>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center w-100">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !blogDetail || error ? (
            <div className="d-flex justify-content-center align-items-center w-100">
              <p>{error || "No blog details available."}</p>
            </div>
          ) : (
            <Row>
              <div className="col-lg-12">
                <div className="cpc-blog-details-image">
                  <img src={blogDetail.image} alt="blog details" />
                  <div className="cpc-blog-overlay">
                    <div className="cpc-blog-overlay-content">
                      <div className="cpc-blog-author">
                        <img src={blogDetail.authorImage} alt="author" />
                        <span>
                          By <a href="#">{blogDetail.authorName}</a>
                        </span>
                      </div>
                      <div className="cpc-blog-meta">
                        <p className="date">
                          <i className="lni lni-calendar"></i>{" "}
                          <span>{blogDetail.date}</span>
                        </p>
                        <p className="comment">
                          <i className="lni lni-comments"></i>{" "}
                          <span>{blogDetail.comments}</span>
                        </p>
                        <p className="view">
                          <i className="lni lni-eye"></i>{" "}
                          <span>{blogDetail.views}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="cpc-blog-details-content">
                  <h2 className="cpc-blog-details-title">{blogDetail.title}</h2>
                  <div className="markdown-body">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[
                        rehypeSlug,
                        rehypeRaw,
                        rehypeAutolinkHeadings,
                        rehypeHighlight,
                      ]}
                    >
                      {blogDetail.content}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="cpc-blog-details-action">
                  <ul className="cpc-blog-tags">
                    {blogDetail.tags.map((tag, index) => {
                      if (tag.trim() === "") return null;
                      return (
                        <li key={index}>
                          <a href="#">{tag}</a>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="cpc-blog-share">
                    <h6>Share This Post</h6>
                    <ul className="cpc-blog-share-links">
                      <li>
                        <a href="#" className="facebook">
                          <i className="lni lni-instagram-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="linkedin">
                          <i className="lni lni-linkedin-original"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="cpc-blog-sidebar">
                  <div className="cpc-articles-box">
                    <h3 className="cpc-articles-box-title">Table Of Content</h3>
                    <div className="toc"></div>
                  </div>
                </div>
              </div>
            </Row>
          )}
        </Container>
      </section>

      <section className="cpc-blog-grids cpc-related-articles">
        <Container>
          <Row className="col-lg-12">
            <div className="cpc-related-title">
              <h2 className="cpc-related-articles-title">Other Articles</h2>
            </div>
          </Row>
          <Row>
            {relatedArticles.length > 0 ? (
              relatedArticles.map((article, index) => (
                <BlogCard key={index} article={article} searchTerm={""} />
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No related articles to display</p>
              </div>
            )}
          </Row>
        </Container>
      </section>
    </section>
  );
}
