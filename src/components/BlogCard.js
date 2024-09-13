import React from "react";

/**
 * BlogCard component displays a single blog article with its details.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.article - The article object containing details of the blog.
 * @param {string} props.article.id - The unique identifier for the article.
 * @param {string} props.article.image - The URL of the article's image.
 * @param {string} props.article.date - The publication date of the article.
 * @param {string} props.article.authorName - The name of the article's author.
 * @param {string} props.article.title - The title of the article.
 * @param {Array<string>} props.article.tags - An array of tags associated with the article.
 * @param {string} props.searchTerm - The term used for highlighting in the article title.
 *
 * @returns {JSX.Element} The rendered BlogCard component.
 */
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
