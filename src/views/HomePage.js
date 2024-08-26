import React, { useState, useEffect, useRef } from "react";
import PageHeader from "components/PageHeader/PageHeader.js";
import AboutUs from "components/AboutUs.js";
import SideBar from "components/Navbars/SideBar.js";
import { Container, Col } from "reactstrap";
import BlogCard from "components/BlogCard";
import { Toast } from "primereact/toast";
import apiService from "../apiService";
import "../assets/css/splash.css";
import "../assets/css/sidebar.css";
import Footer from "components/Footer/Footer";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/blogs", {
        page: 1,
        limit: 3,
      });
      setBlogs(response.blogs || []);
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

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

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

  return (
    <section className="">
      <SideBar />
      <PageHeader />
      <AboutUs />
      <Toast ref={toast} />

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
                <BlogCard key={index} article={article} searchTerm={""} />
              ))
            )}
          </div>
        </div>
      </section>
      <div className="container">
        <div className="cpc-blog-quote">
          <i className="lni lni-quotation"></i>
          <p>
            “My CP skills are just like my GF. Imaginary” <br />
          </p>
          <h6>- Vipin Karthic</h6>
        </div>
      </div>
      <Footer />
    </section>
  );
}
