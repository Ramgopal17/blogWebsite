import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogSidebar from "../BlogSidebar/BlogSidebar.js";
import { AiOutlinePlus } from "react-icons/ai";
import "./BlogList.css";
import globalEnv from "../../api/globalenv.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Skeleton from "react-loading-skeleton";
import { ShimmerThumbnail } from "react-shimmer-effects";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

function countWords(str) {
  return str?.trim().split(/\s+/).length;
}

const BlogList = ({ slug }, props) => {
  const [category, setCategory] = useState([]);

  const [visibleItems, setVisibleItems] = useState(2);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/categories?filters[Slug][$eq]=${slug}&populate[Articles][populate]=*`
        );
        const data = await response.json();
        setLoading(false);
        setCategory(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  const totalItems = category.flatMap(
    (blog) => blog?.attributes?.Articles?.data
  );
  const loadMoreItems = () => {
    if (visibleItems + 2 >= totalItems.length) {
      setVisibleItems(totalItems.length);
      setLoadMoreVisible(false);
      setHasMoreContent(false);
    } else {
      setVisibleItems(visibleItems + 2);
      setHasMoreContent(true);
    }
  };

  const currentArticles = category
    .flatMap((blog) => blog?.attributes?.Articles?.data)
    .slice(0, visibleItems);

  const propsToPass = {
    prop1: slug,
  };

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              {loading ? (
                <div>
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="col-lg-12 rounded-8">
                      <div style={{ marginBottom: "50px" }}>
                        <ShimmerThumbnail height={300} rounded />
                        <Skeleton count={7} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                currentArticles.map((blog) => (
                  <div className="post" key={blog.id}>
                    <div
                      className="entry-media video-holder"
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "50vh",
                        overflow: "hidden",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={`${globalEnv.api}${blog.attributes.Image.data[0].attributes.url}`}
                        alt=""
                        key={blog.id}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "10px",
                          maxHeight: "50vh !important",
                        }}
                      />
                    </div>
                    <div className="entry-meta">
                      <ul>
                        {blog?.attributes?.Author?.data[0]?.attributes
                          ?.fullname && (
                          <li>
                            <i className="fi flaticon-user"> </i> By{" "}
                            {
                              blog?.attributes?.Author?.data[0]?.attributes
                                ?.fullname
                            }
                          </li>
                        )}
                        <li className="custom-list">
                          <i className="fi flaticon-calendar"></i>{" "}
                          {new Date(
                            blog?.attributes?.createdAt
                          ).toLocaleDateString("en-GB")}
                        </li>
                        <li>
                          <i className="fa-regular fa-clock"></i>&nbsp;
                          {Math.ceil(
                            countWords(blog?.attributes?.Description) / 200
                          )}{" "}
                          min read
                        </li>
                      </ul>
                    </div>
                    <div className="entry-details">
                      <Link
                        onClick={ClickHandler}
                        to={`/blog-single/${blog?.attributes?.Slug}`}
                      >
                        <div className="wpo-blog-content">
                          {" "}
                          <h2>{blog?.attributes?.Title}</h2>
                        </div>
                      </Link>
                      <div className="listing" id="cutoffText1">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.attributes?.Description.replace(
                                /src="(\/[^"]+)"/g,
                                (match, src) =>
                                  src.startsWith("http")
                                    ? match
                                    : `src="${globalEnv.api}${src}"`
                              ) || "" + "...",
                          }}
                        ></div>
                      </div>
                      <Link
                        onClick={ClickHandler}
                        to={`/blog-single/${blog?.attributes?.Slug}`}
                        className="read-more"
                        state={propsToPass}
                      >
                        READ MORE...
                      </Link>
                    </div>
                  </div>
                ))
              )}
              <div className="pagination-wrapper">
                {loadMoreVisible &&
                  hasMoreContent &&
                  totalItems.length > visibleItems && (
                    <div className="loadMoreDiv pt-istop-btn-wrapper text-center mt-10">
                      <button
                        className="tp-common-btn text-center"
                        onClick={loadMoreItems}
                      >
                        <span className="text-center button-space">
                          <span>Load More</span>
                          <span>
                            <AiOutlinePlus />
                          </span>
                        </span>
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <BlogSidebar blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogList;
