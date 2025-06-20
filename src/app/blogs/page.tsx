"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import BlogCard from "@/components/blogs/BlogCard";
import "@/assets/css/sidebar.css";
import "@/assets/css/blog.css";
import "@/assets/css/lineicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import dots from "@/assets/img/dots.png";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);
  const [totalRecords, setTotalRecords] = useState(0);
  const toast = useRef(null);

  const fetchBlogs = async (page, limit) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs?page=${page}&limit=${limit}`
      );
      const data = (await res.json()).body;
      setBlogs(data.blogs || []);
      setTotalRecords(data.count || 0);
    } catch (err) {
      console.error(err);
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "An error occurred. Please report to dev.",
          life: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");
    fetchBlogs(1, rows);
    return () => {
      document.body.classList.toggle("index-page");
    };
  }, [rows]);

  const onPageChange = (event) => {
    const page = event.page + 1;
    setFirst(event.first);
    setRows(event.rows);
    fetchBlogs(page, event.rows);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <img alt="Decorative dots" className="dots" src={dots.src} />
      <Toast ref={toast} />

      <section className="cpc-blog-grids cpc-related-articles">
        <Container>
          <Row className="col-lg-12">
            <div className="cpc-related-title">
              <h2 className="cpc-related-articles-title">Our Blogs</h2>
            </div>
          </Row>
          <Row className="mb-3">
            <div className="col-lg-4 ml-auto">
              <span className="p-input-icon-left w-100">
                <i
                  className="pi pi-search"
                  style={{ left: "0.75rem", top: "50%", marginTop: "-0.5rem" }}
                />
                <InputText
                  placeholder="Search blog on this page"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-100 pl-5"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </span>
            </div>
          </Row>
          <Row>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((article, index) => (
                <BlogCard key={index} article={article} searchTerm={searchTerm} />
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No blogs to display</p>
              </div>
            )}
          </Row>
          <Row className="mt-3">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecords}
              onPageChange={onPageChange}
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            />
          </Row>
        </Container>
      </section>
    </section>
  );
}
