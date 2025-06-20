'use client';
import "@/assets/css/sidebar.css";
import "@/assets/css/events.css";
import "@/assets/css/blog.css";
import "@/assets/css/animate.css";
import "@/assets/css/lineicons.css";
import dots from "@/assets/img/dots.png";

import { Container, Row } from "reactstrap";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  blogId: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // Fetch events when component mounts
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/events`, {
          cache: "no-store",
        });
        const data = await res.json();
        setEvents(Array.isArray(data.body) ? data.body : []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <section>
      <img alt="Decorative dots" className="dots" src={dots.src} />

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
            {events.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <p>No events found.</p>
              </div>
            ) : (
              <ul className="stack-cards js-stack-cards">
                {events.map((event: any) => (
                  <li
                    key={event.id}
                    className="stack-cards__item stack-ic-bg stack-ic-radius-lg stack-ic-shadow-md stack-ic-overflow-hidden js-stack-cards__item"
                    onClick={() =>
                      (window.location.href = `/blogs/${event.blogId}`)
                    }
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
