import React from "react";

const BlogCard = ({ article, searchTerm }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="cpc-single-blog">
        <div className="cpc-blog-image">
          <a href={`/blog-details?id=${article.id}`}>
            <img src={article.image} alt="blog" />
          </a>
        </div>
        <div className="cpc-blog-content">
          <div className="cpc-blog-overlay-content justify-content-between mb-2">
            <span className="cpc-blog-date">{article.date}</span>
            <div className="cpc-blog-author align-item-start">
              <span>
                Author: <a href="#">{article.authorName.split(" ")[0]}</a>
              </span>
            </div>
          </div>

          <h3 className="cpc-blog-title">
            <a href={`/blog-details?id=${article.id}`}>
              {searchTerm.trim() !== ""
                ? article.title
                    .split(new RegExp(`(${searchTerm})`, "gi"))
                    .map((part, i) =>
                      part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <mark key={i}>{part}</mark>
                      ) : (
                        part
                      )
                    )
                : article.title}
            </a>
          </h3>
        </div>
        <ul className="cpc-blog-tags">
          {article.tags.map((tag, tagIndex) =>
            tag !== "" && tag != null ? (
              <li key={tagIndex}>
                <a href="#">{tag}</a>
              </li>
            ) : (
              <></>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogCard;
