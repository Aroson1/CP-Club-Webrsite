import React from "react";

import PageHeader from "components/PageHeader/PageHeader.js";
import AboutUs from "components/AboutUs.js";
import SideBar from "components/Navbars/SideBar.js";

import { Container, Col } from "reactstrap";

import "../assets/css/splash.css";
import "../assets/css/sidebar.css";
import Footer from "components/Footer/Footer";
const blogs = [
  {
    id: 1,
    title: "Meet AutoManage, the best AI management tools",
    date: "Dec 22, 2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://placehold.co/600x400@2x.png",
    tags: ["Design", "Development", "Info"],
  },
  {
    id: 2,
    title: "How to earn more money as a wellness coach",
    date: "Dec 22, 2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://placehold.co/600x400@2x.png",
    tags: ["Design", "Development", "Info"],
  },
  {
    id: 3,
    title: "The no-fuss guide to upselling and cross selling",
    date: "Dec 22, 2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://placehold.co/600x400@2x.png",
    tags: ["Design", "Development", "Info"],
  },
];
export default function HomePage() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <section class="">
      <SideBar />
      <PageHeader />

      <AboutUs />
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
            {blogs.map((article) => (
              <div key={article.id} className="col-lg-4 col-md-6">
                <div className="cpc-single-blog">
                  <div className="cpc-blog-image">
                    <a href="/blog-details">
                      <img src={article.image} alt="blog" />
                    </a>
                  </div>
                  <div className="cpc-blog-content">
                    <span className="cpc-blog-date">{article.date}</span>
                    <h3 className="cpc-blog-title">
                      <a href="/blog-details">{article.title}</a>
                    </h3>
                    <p className="cpc-blog-desc">{article.description}</p>
                  </div>

                  <ul className="cpc-blog-tags">
                    {article.tags.map((tag, index) => (
                      <li key={index}>
                        <a href="#">{tag}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
        <div class="cpc-blog-quote">
          <i class="lni lni-quotation"></i>
          <p>
            “My CP skils are just like my GF. Imaginary” <br />
          </p>
          <h6>- Vipin Karthic</h6>
        </div>
      </div>
      <Footer />
    </section>
  );
}
