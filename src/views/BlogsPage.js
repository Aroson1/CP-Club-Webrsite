import React, { useState, useEffect } from "react";
import SideBar from "components/Navbars/SideBar.js";
import { Container, Row } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import apiService from "../apiService";
import BlogCard from "components/BlogCard";
import "assets/css/sidebar.css";
import "assets/css/blog.css";
import "assets/css/lineicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

/**
 * BlogsPage component that displays a list of blogs with pagination and search functionality.
 *
 * @component
 * @example
 * return (
 *   <BlogsPage />
 * );
 *
 * @returns {JSX.Element} The rendered BlogsPage component.
 *
 * @state {Array} blogs - The list of blogs fetched from the API.
 * @state {boolean} loading - Indicates whether the blogs are currently being loaded.
 * @state {string} searchTerm - The term used to filter the displayed blogs.
 * @state {number} first - The index of the first blog displayed on the current page.
 * @state {number} rows - The number of blogs displayed per page.
 * @state {number} totalRecords - The total number of blogs available.
 *
 * @function fetchBlogs - Fetches blogs from the API based on the current page and limit.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of blogs to fetch per page.
 *
 * @function onPageChange - Handles pagination changes and updates the displayed blogs.
 * @param {Object} event - The event object containing pagination information.
 * @param {number} event.first - The index of the first blog on the new page.
 * @param {number} event.rows - The number of blogs to display on the new page.
 *
 * @function filteredBlogs - Filters the blogs based on the search term.
 * @returns {Array} The filtered list of blogs that match the search term.
 */
export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);
  const [totalRecords, setTotalRecords] = useState(0);
  const toast = React.useRef(null);

  const fetchBlogs = async (page, limit) => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/blogs", {
        page,
        limit,
      });
      setBlogs(response.blogs);
      setTotalRecords(response.count);
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred. Please report to dev.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");

    fetchBlogs(1, rows);

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, [rows]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    fetchBlogs(event.page + 1, event.rows);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="">
      <SideBar />
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />
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
                <BlogCard
                  key={index}
                  article={article}
                  searchTerm={searchTerm}
                />
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
