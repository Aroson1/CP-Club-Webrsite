import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

/**
 * Footer component that displays the footer section of the application.
 * It adjusts its layout based on the screen size to provide a mobile-friendly view.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * );
 *
 * @returns {JSX.Element} The rendered footer component.
 *
 * @hooks
 * useState - Manages the mobile view state.
 * useEffect - Sets up an event listener for window resize events to update the mobile view state.
 */
export default function Footer() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className="footer" style={{ textAlign: "center" }}>
      <Container>
        <Row className="justify-content-between">
          <Col
            md="4"
            className="align-items-center justify-content-center d-flex"
          >
            <h1 className="title">CP CLUB • IIITK</h1>
          </Col>
          <Col md="3">
            <Nav style={{ paddingTop: isMobileView ? 0 : "" }}>
              <NavItem className="align-items-center  d-flex">
                <NavLink
                  to="https://github.com/Aroson1"
                  tag={Link}
                  style={{ "text-transform": "inherit", cursor: "pointer" }}
                >
                  Developed between snack breaks and existential crises by{" "}
                  <a href="https://github.com/Aroson1">Alex Gijo</a>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>

          <Col
            md="3"
            className="align-items-center justify-content-center d-flex"
          >
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://instagram.com/"
                id="tooltip318450378"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
