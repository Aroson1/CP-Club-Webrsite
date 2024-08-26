import React, { useState, useEffect, useRef } from "react";
import { Container, Row } from "reactstrap";
import SideBar from "components/Navbars/SideBar.js";
import { Toast } from "primereact/toast";
import apiService from "../apiService";
import "../assets/css/sidebar.css";
import "../assets/css/events.css";
import "../assets/css/blog.css";
import "../assets/css/animate.css";
import "../assets/css/lineicons.css";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/events");
      setEvents(response || []);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");
    fetchEvents();

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

      <section id="team" className="cpc-team">
        <Container>
          <Row>
            <div className="col-lg-12">
              <div className="cpc-section-title mx-auto text-center">
                <h2>Events</h2>
                <p>View Upcoming and Past Events</p>
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
            ) : events.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <p>No events found.</p>
              </div>
            ) : (
              <ul className="stack-cards js-stack-cards">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="stack-cards__item stack-ic-bg stack-ic-radius-lg stack-ic-shadow-md stack-ic-overflow-hidden js-stack-cards__item"
                    onClick={() => {
                      window.location.href = `/blog-details?id=${event.blogId}`;
                    }}
                  >
                    <img src={event.imageUrl} alt="Event" />
                    <div className="title-overlay">
                      <h3>{event.title}</h3>
                    </div>
                    <div
                      className="cpc-blog-overlay"
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div className="cpc-blog-overlay-content">
                        <div className="cpc-blog-meta">
                          <p
                            className="date"
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              borderRadius: "15px",
                              padding: "5px 10px",
                            }}
                          >
                            <i className="lni lni-calendar"></i>{" "}
                            <span>{event.date}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Row>
        </Container>
      </section>
    </section>
  );
}
