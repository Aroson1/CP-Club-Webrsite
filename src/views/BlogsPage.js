import React from "react";
import SideBar from "components/Navbars/SideBar.js";
import { Button, Col, Container, Row, UncontrolledCarousel } from "reactstrap";

import "../assets/css/sidebar.css";
import "../assets/css/blog.css";
import "../assets/css/lineicons.css";

// Blog detail object
const blogDetail = {
  title: "Facing a challenge is kind of a turn-on for an easy rider",
  image: "https://placehold.co/600x400@2x.png",
  authorImage: "https://placehold.co/600x400@2x.png",
  authorName: "Samuyl Joshi",
  date: "25 Jul 2024",
  comments: 50,
  views: 35,
  content: (
    <div className="ud-blog-details-content">
      <h2 className="ud-blog-details-title">
        Blog Title Goes here my good sir...
      </h2>
      <p className="ud-blog-details-para">
        There's a time and place for everything… including asking for reviews.
        For instance: you should not asking for a review on your checkout page.
        The sole purpose of this page is to guide your customer to complete
        their purchase, and this means that the page should be as minimalist and
        pared-down possible. You don't want to have any unnecessary elements or
        Call To Actions.
      </p>
      <p className="ud-blog-details-para">
        There's a time and place for everything… including asking for reviews.
        For instance: you should not asking for a review on your checkout page.
        The sole purpose of this page is to guide your customer to complete
        their purchase, and this means that the page should be as minimalist and
        pared-down possible. You don't want to have any unnecessary elements or
        Call To Actions.
      </p>
      <h3 className="ud-blog-details-subtitle">Sea no quidam vulputate</h3>
      <p className="ud-blog-details-para">
        At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus
        deleniti ut nec. Ut enim eripuit eligendi est, in iracundia
        signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can
        eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris
        impedit ne. Erant appareat corrumpit ei vel.
      </p>

      <h3 className="ud-blog-details-subtitle">What is it with your ideas?</h3>
      <p className="ud-blog-details-para">
        At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus
        deleniti ut nec. Ut enim eripuit eligendi est, in iracundia
        signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can
        eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris
        impedit ne. Erant appareat corrumpit ei vel.
      </p>
      <p className="ud-blog-details-para">
        At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus
        deleniti ut nec. Ut enim eripuit eligendi est, in iracundia
        signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can
        eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris
        impedit ne. Erant appareat corrumpit ei vel.
      </p>
    </div>
  ),
  tags: ["Design", "Development", "Info"],
};

// Related Articles
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
  {
    id: 4,
    title: "The no-fuss guide to upselling and cross selling",
    date: "Dec 22, 2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://placehold.co/600x400@2x.png",
    tags: ["Design", "Development", "Info"],
  },
];

const carouselItems = [
  {
    src: "https://placehold.co/600x400@2x.png",
    altText: "Slide 1",
    caption: "Pic One",
  },
  {
    src: "https://placehold.co/600x400@2x.png",
    altText: "Slide 2",
    caption: "Pic Two",
  },
  {
    src: "https://placehold.co/600x400@2x.png",
    altText: "Slide 3",
    caption: "Pic Three",
  },
];

export default function BlogsPage() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    document.body.classList.toggle("profile-page");

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  return (
    <section className="">
      <SideBar />
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />

      <section className="ud-blog-grids ud-related-articles">
        <div className="container">
          <div className="row col-lg-12">
            <div className="ud-related-title">
              <h2 className="ud-related-articles-title">Our Blogs</h2>
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
    </section>
  );
}
