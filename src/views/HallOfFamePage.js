import React, { useState, useEffect, useRef } from "react";
import SideBar from "components/Navbars/SideBar.js";
import { Container, Row } from "reactstrap";
import { Toast } from "primereact/toast";
import apiService from "../apiService";
import "../assets/css/sidebar.css";
import "../assets/css/hall-of-fame.css";
import "../assets/css/lineicons.css";

export default function HallOfFamePage() {
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/hallOfFame");
      setPeopleList(response || []);
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
    fetchPeople();

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
                <h2>Hall of Fame</h2>
                <p>The OP CP Peeps!</p>
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
            ) : peopleList.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <p>No peeps found.</p>
              </div>
            ) : (
              <div className="container mt-5">
                <div className="row">
                  {peopleList.map((person) => (
                    //  <div className="masonry-item" key={person.id}>
                    //  <div className="card" style={{marginBottom: "20px"}}>
                    // <div className="card-body">
                    // <p className="card-text">{person.description}</p>
                    // <div className="d-flex align-items-center mt-3">
                    // <img
                    // src={person.image}
                    // width="50"
                    // className="me-3"
                    // alt={person.name}
                    // />
                    // <div>
                    // <h5 className="card-title mb-0">{person.name}</h5>
                    // <p className="card-subtitle text-muted">
                    // {person.title}
                    // </p>
                    // </div>
                    // </div>
                    // </div>
                    // </div>
                    // </div>
                    <div
                      className="col-12 col-md-6 col-lg-4 mb-4"
                      key={person.id}
                    >
                      <div className="card" style={{ marginBottom: "10px" }}>
                        <div className="card-body">
                          <p className="card-text">{person.description}</p>
                          <div className="d-flex align-items-center mt-3">
                            <img
                              src={person.image}
                              width="50"
                              className="me-3"
                              alt={person.name}
                            />
                            <div>
                              <h5 className="card-title mb-0">{person.name}</h5>
                              <p className="card-subtitle text-muted">
                                {person.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Row>
        </Container>
      </section>
    </section>
  );
}
