import React, { useState, useEffect, useRef } from "react";
import SideBar from "components/Navbars/SideBar.js";
import { Container, Row } from "reactstrap";
import { Toast } from "primereact/toast";
import apiService from "../apiService";
import "../assets/css/sidebar.css";
import "../assets/css/resources.css";
import "../assets/css/lineicons.css";

/**
 * ResourcesPage component that fetches and displays a list of resources.
 *
 * @component
 * @example
 * return (
 *   <ResourcesPage />
 * );
 *
 * @returns {JSX.Element} The rendered ResourcesPage component.
 *
 * @state {Array} resourcesList - The list of resources fetched from the API.
 * @state {boolean} loading - Indicates whether the resources are currently being loaded.
 * @state {string|null} error - Holds any error message encountered during the fetch operation.
 *
 * @ref {Object} toast - Reference to the Toast component for displaying error messages.
 *
 * @function fetchResources - Asynchronously fetches resources from the API and updates the state.
 *   - Sets loading to true before fetching.
 *   - Updates resourcesList with the fetched data or sets an error message if the fetch fails.
 *   - Sets loading to false after the fetch operation is complete.
 *
 * @effect {void} useEffect - Toggles body classes and fetches resources on component mount.
 *   - Cleans up by toggling the body class on unmount.
 *
 * @effect {void} useEffect - Displays an error toast if an error occurs.
 *   - Triggers when the error state changes.
 */
export default function ResourcesPage() {
  const [resourcesList, setResourcesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/resources");
      setResourcesList(response || []);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");
    fetchResources();

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
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />
      <Toast ref={toast} />

      <section id="resources" className="cpc-resources">
        <Container>
          <Row>
            <div className="col-lg-12">
              <div className="cpc-section-title text-center mx-auto">
                <h2>Resources</h2>
                <p>
                  We have prepared a list of resources to help you get started.
                </p>
              </div>
            </div>
          </Row>

          <Row>
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
            ) : resourcesList.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <p>No resources found.</p>
              </div>
            ) : (
              <>
                <div className="col-lg-6">
                  {resourcesList
                    .slice(0, Math.ceil(resourcesList.length / 2))
                    .map((resource, index) => (
                      <div
                        className="cpc-single-resources wow fadeInUp"
                        data-wow-delay=".1s"
                        key={index}
                      >
                        <div className="accordion">
                          <button
                            className="cpc-resources-btn collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                          >
                            <span className="icon flex-shrink-0">
                              <i className="lni lni-chevron-down"></i>
                            </span>
                            <span>{resource.resourceTitle}</span>
                          </button>
                          <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                          >
                            <div className="cpc-resources-body">
                              <ul>
                                {resource.listOfResources.map(
                                  (subResource, subIndex) => (
                                    <li key={subIndex}>
                                      <a href={subResource.link}>
                                        {subResource.title}
                                      </a>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="col-lg-6">
                  {resourcesList
                    .slice(Math.ceil(resourcesList.length / 2))
                    .map((resource, index) => (
                      <div
                        className="cpc-single-resources wow fadeInUp"
                        data-wow-delay=".1s"
                        key={index + Math.ceil(resourcesList.length / 2)}
                      >
                        <div className="accordion">
                          <button
                            className="cpc-resources-btn collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${
                              index + Math.ceil(resourcesList.length / 2)
                            }`}
                          >
                            <span className="icon flex-shrink-0">
                              <i className="lni lni-chevron-down"></i>
                            </span>
                            <span>{resource.resourceTitle}</span>
                          </button>
                          <div
                            id={`collapse${
                              index + Math.ceil(resourcesList.length / 2)
                            }`}
                            className="accordion-collapse collapse"
                          >
                            <div className="cpc-resources-body">
                              <ul>
                                {resource.listOfResources.map(
                                  (subResource, subIndex) => (
                                    <li key={subIndex}>
                                      <a href={subResource.link}>
                                        {subResource.title}
                                      </a>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </Row>
        </Container>
      </section>
    </section>
  );
}
