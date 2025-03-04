import React from "react";

import { Container } from "reactstrap";
export default function PageHeader() {
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo" style={{ fontSize: 60 }}>
            CODERS' CLUB • IIITK
          </h1>
          <h3
            className="d-none d-sm-block"
            style={{ fontWeight: 250, fontSize: 30 }}
          >
            Celebrating Algorithms.
          </h3>
        </div>
      </Container>
    </div>
  );
}
