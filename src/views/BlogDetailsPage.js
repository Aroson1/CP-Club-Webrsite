import React from "react";
import SideBar from "components/Navbars/SideBar.js";

import "../assets/css/sidebar.css";
import "../assets/css/blog.css";
import "../assets/css/lineicons.css";

// Blog detail object
const blogDetail = {
  title: "Facing a challenge is kind of a turn-on for an easy rider",
  image: "https://placehold.co/600x400@2x.png",
  authorImage: "https://placehold.co/600x400@2x.png",
  authorName: "ME",
  date: "25 Jul 2024",
  comments: 50,
  views: 35,
  content: (
    <div className="cpc-blog-details-content">
      <h2 className="cpc-blog-details-title">
        Blog Title Goes here my good sir...
      </h2>
      <p className="cpc-blog-details-para">
        There's a time and place for everything… including asking for reviews.
        For instance: you should not asking for a review on your checkout page.
        The sole purpose of this page is to guide your customer to complete
        their purchase, and this means that the page should be as minimalist and
        pared-down possible. You don't want to have any unnecessary elements or
        Call To Actions.
      </p>
      <p className="cpc-blog-details-para">
        There's a time and place for everything… including asking for reviews.
        For instance: you should not asking for a review on your checkout page.
        The sole purpose of this page is to guide your customer to complete
        their purchase, and this means that the page should be as minimalist and
        pared-down possible. You don't want to have any unnecessary elements or
        Call To Actions.
      </p>
      <h3 className="cpc-blog-details-subtitle">Sea no quidam vulputate</h3>
      <p className="cpc-blog-details-para">
        At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus
        deleniti ut nec. Ut enim eripuit eligendi est, in iracundia
        signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can
        eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris
        impedit ne. Erant appareat corrumpit ei vel.
      </p>

      <h3 className="cpc-blog-details-subtitle">What is it with your ideas?</h3>
      <p className="cpc-blog-details-para">
        At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus
        deleniti ut nec. Ut enim eripuit eligendi est, in iracundia
        signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can
        eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris
        impedit ne. Erant appareat corrumpit ei vel.
      </p>
      <p className="cpc-blog-details-para">
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

// Popular Articles
const popularArticles = [
  {
    id: 1,
    title: "The 8 best landing page builders, reviewed",
    author: "Pevan",
    image: "https://placehold.co/600x400@2x.png",
  },
  {
    id: 2,
    title: "Create engaging online courses your student…",
    author: "Shxun",
    image: "https://placehold.co/600x400@2x.png",
  },
  {
    id: 3,
    title: "The ultimate formula for launching online course",
    author: "Panheer",
    image: "https://placehold.co/600x400@2x.png",
  },
  {
    id: 4,
    title: "50 Best web design tips & tricks that will help you",
    author: "VPN",
    image: "https://placehold.co/600x400@2x.png",
  },
];

// Related Articles
const relatedArticles = [
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

export default function BlogDetailsPage() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  return (
    <section className="">
      <SideBar />
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />
      <section className="cpc-blog-details" style={{ marginLeft: window.innerWidth > 500 ? "78px" : "0" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cpc-blog-details-image">
                <img src={blogDetail.image} alt="blog details" />
                <div className="cpc-blog-overlay">
                  <div className="cpc-blog-overlay-content">
                    <div className="cpc-blog-author">
                      <img src={blogDetail.authorImage} alt="author" />
                      <span>
                        By <a href="#">{blogDetail.authorName}</a>
                      </span>
                    </div>
                    <div className="cpc-blog-meta">
                      <p className="date">
                        <i className="lni lni-calendar"></i>{" "}
                        <span>{blogDetail.date}</span>
                      </p>
                      <p className="comment">
                        <i className="lni lni-comments"></i>{" "}
                        <span>{blogDetail.comments}</span>
                      </p>
                      <p className="view">
                        <i className="lni lni-eye"></i>{" "}
                        <span>{blogDetail.views}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              {blogDetail.content}
              <div className="cpc-blog-details-action">
                <ul className="cpc-blog-tags">
                  {blogDetail.tags.map((tag, index) => (
                    <li key={index}>
                      <a href="#">{tag}</a>
                    </li>
                  ))}
                </ul>
                <div className="cpc-blog-share">
                  <h6>Share This Post</h6>
                  <ul className="cpc-blog-share-links">
                    <li>
                      <a href="#" className="facebook">
                        <i className="lni lni-instagram-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="linkedin">
                        <i className="lni lni-linkedin-original"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cpc-blog-sidebar">
                <div className="cpc-articles-box">
                  <h3 className="cpc-articles-box-title">Popular Articles</h3>
                  <ul className="cpc-articles-list">
                    {popularArticles.map((article) => (
                      <li key={article.id}>
                        <div className="cpc-article-image">
                          <img src={article.image} alt="author" />
                        </div>
                        <div className="cpc-article-content">
                          <h5 className="cpc-article-title">
                            <a href="#">{article.title}</a>
                          </h5>
                          <p className="cpc-article-author">{article.author}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cpc-blog-grids cpc-related-articles">
        <div className="container">
          <div className="row col-lg-12">
            <div className="cpc-related-title">
              <h2 className="cpc-related-articles-title">Related Articles</h2>
            </div>
          </div>
          <div className="row">
            {relatedArticles.map((article) => (
              <div key={article.id} className="col-lg-4 col-md-6">
                <div className="cpc-single-blog">
                  <div className="cpc-blog-image">
                    <a href="blog-details.html">
                      <img src={article.image} alt="blog" />
                    </a>
                  </div>
                  <div className="cpc-blog-content">
                    <span className="cpc-blog-date">{article.date}</span>
                    <h3 className="cpc-blog-title">
                      <a href="blog-details.html">{article.title}</a>
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
    </section>
  );
}
