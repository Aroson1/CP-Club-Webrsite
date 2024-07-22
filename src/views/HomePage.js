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

    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <section class="">
      <SideBar />
      <PageHeader />
      <div className="container">
        <AboutUs />
        <section className="ud-blog-grids ud-related-articles">
          <div className="container">
            <div className="row col-lg-12">
              <div className="ud-related-title">
                {/* <h2 className="ud-related-articles-title">Related Articles</h2> */}
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
                  <div className="ud-single-blog">
                    <div className="ud-blog-image">
                      <a href="/blog-details">
                        <img src={article.image} alt="blog" />
                      </a>
                    </div>
                    <div className="ud-blog-content">
                      <span className="ud-blog-date">{article.date}</span>
                      <h3 className="ud-blog-title">
                        <a href="/blog-details">{article.title}</a>
                      </h3>
                      <p className="ud-blog-desc">{article.description}</p>
                    </div>

                    <ul className="ud-blog-tags">
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
        <div class="ud-blog-quote">
          <i class="lni lni-quotation"></i>
          <p>
            “My CP skils are just like my GF. Imaginary” <br />
          </p>
          <h6>-Drunk Guy</h6>
        </div>
      </div>
      <Footer/>
    </section>
  );
}
