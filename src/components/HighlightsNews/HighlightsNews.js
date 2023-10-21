import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../HighlightsNews/HighlightsNews.css"; // Import the CSS file for styling
import globalEnv from "../../api/globalenv.js";
import "./HighlightsNews.css";
import { AiOutlinePlus } from "react-icons/ai";
import "react-loading-skeleton/dist/skeleton.css";
import { ShimmerThumbnail,  ShimmerText,
  ShimmerCategoryItem,
  ShimmerButton } from "react-shimmer-effects";
 

const truncate = require("truncate");

const HighlightsNews = (props) => {
  const [articles, setArticles] = useState([]);
  const [latest, setLatest] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage] = useState(1);


  const [visibleItems, setVisibleItems] = useState(6);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
   const [loading,setLoading] = useState(true);
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/articles?filters[Archived][$eq]=false&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.data);
        setLoading(false)
     
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch(`${globalEnv.api}/api/categories?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.data);
        setLoading(false)
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(
      `${globalEnv.api}/api/articles?filters[Archived][$eq]=false&pagination[page]=1&pagination[pageSize]=6&sort[0]=createdAt:desc&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setLatest(data.data);
        setLoading(false)
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  const totalItems = articles?.length;

  const uniqueTags = new Set();
  const objectsWithUniqueTags = [];

  for (const obj of articles) {
    if (!uniqueTags.has(obj?.attributes?.Tag)) {
      uniqueTags.add(obj?.attributes?.Tag);
      objectsWithUniqueTags.push(obj);
    }
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const loadMoreItems = () => {
    if (visibleItems + 6 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 6);
    }
  };
  const uniqueCats = new Set();
  const objectsWithUniqueCats = [];

  for (const obj of category) {
    if (!uniqueCats.has(obj?.attributes?.Title)) {
      uniqueCats.add(obj?.attributes?.Title);
      objectsWithUniqueCats.push(obj);
    }
  }

  const filteredItems = articles.slice(0, visibleItems);

  return (
    <>
      <style>{`
        .it-blog-wrapper .ca-service__item-title a {
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
       
      `}</style>

      <section className="wpo-blog-highlights-section">
        <div className="container">
          <div className="wpo-section-title">
            <h2>Posts</h2>
          </div>
          <div className="row">
            <div className={`col-12 col-lg-8 ${props.colClass}`}>
              <div className="wpo-blog-highlights-wrap">
                <div className="wpo-blog-items">
                  <div className="row">
                  {loading ? (
           
                
                    [...Array(6)].map((_, index) => (
                      <div className="col-lg-6 p-3 rounded-8" key={index}>
                      <ShimmerThumbnail height={350} rounded />
                      </div>
                    ))
                    
                     
                 
                    ) : (
                      filteredItems.map((item, i) => (
                        <div key={i} className="col-lg-6 p-3">
                          <div
                            className="it-blog tp-lasted-blog mb-30 aos-init aos-animate it-blog-wrapper"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          >
                            <div className="it-blog__thumb w-img">
                              <div className="fix">
                                <img
                                  src={`${globalEnv?.api}${item?.attributes?.Image?.data[0]?.attributes?.formats?.thumbnail?.url}`}
                                  alt="them-pure"
                                  effect="blur"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    aspectRatio: "1.5 / 1",
                                  }}
                                />
                              </div>

                              <div className="it-blog-date">
                                <span className="date">
                                  <b>
                                    {new Date(
                                      item?.attributes?.createdAt
                                    ).getDate()}
                                  </b>
                                  {
                                    months[
                                      new Date(
                                        item?.attributes?.createdAt
                                      ).getMonth()
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                            <div className="it-blog-info white-bg  ">
                              <div>
                                <button
                                  style={{
                                    border: `1px solid ${
                                      item?.attributes?.Category?.data
                                        ?.attributes?.Title
                                        ? "#3756f7"
                                        : "#fff"
                                    }`,
                                    padding: "2px 5px",
                                    borderRadius: "25px",
                                    marginBottom: "15px",
                                    color: "black",
                                    fontSize: "13px",
                                    cursor: "default",
                                  }}
                                >
                                  {
                                    item?.attributes?.Category?.data?.attributes
                                      ?.Title
                                  }
                                </button>
                              </div>
                              <div>
                                <div
                                  className="p-abosolute pt-3"
                                  style={{
                                    bottom: "10px",
                                    maxHeight: "120px",
                                    minHeight: "120px",
                                  }}
                                >
                                  <h3
                                    className="ca-service__item-title1 mb-30"
                                    style={{
                                      maxHeight: "3em",
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    <Link
                                      to={`/highlight-single/${item?.attributes?.Slug}`}
                                      style={{ color: "#032B5F" }}
                                    >
                                      {item?.attributes?.Title.trim()}
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                              <div
                                className="tp-seo-full-btn"
                                style={{
                                  "--tp-theme-redical": "#3756f7",
                                  position: "relative",
                                }}
                              >
                                <Link
                                  to={`/highlight-single/${item?.attributes?.Slug}`}
                                  className="it-portfolio-item__btn"
                                >
                                  Read More
                                  <span className="mt-1">
                                    <i className="fal fa-long-arrow-right"></i>
                                    <i className="fal fa-long-arrow-right"></i>
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                      )}
                  </div>
                </div>
              </div>
              {loadMoreVisible && totalItems > visibleItems && (
                <div className="loadMoreDiv pt-istop-btn-wrapper  text-center mt-20 ">
                  <button
                    className="tp-common-btn text-center "
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
            <div className={`col-12 col-lg-4 ${props.hideClass}`}>
              <div className="blog-sidebar">
                <div className="widget category-widget">
                  <h3 style={{ fontWeight: "400", color: "#070707" }}>
                    Post Categories
                  </h3>
                  <ul>
                    {loading ? (
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <ShimmerText
                            key={index}
                            className={`line${index + 1}`}
                            line={1}
                            gap={10}
                          />
                        ))}
                      </div>
                    ) : (objectsWithUniqueCats.map((blog) => (
                      <li key={blog?.id}>
                        <Link
                          onClick={ClickHandler}
                          to={`/blog/category/${blog?.attributes?.Slug}`}
                        >
                          {truncate(blog.attributes.Title, 40)}
                          <span style={{ fontSize: "20px", }}>
                            ({blog?.attributes?.Articles?.data?.length})
                          </span>
                        </Link>
                      </li>
                    )))}
                  </ul>
                </div>
                <div className="widget recent-post-widget">
                  <h3 style={{ fontWeight: "400", color: "#070707" }}>
                    Latest Post
                  </h3>
                  {loading
                    ? [...Array(5)].map((_, index) => (
                        <ShimmerCategoryItem
                          hasImage
                          imageType="thumbnail"
                          imageWidth={80}
                          imageHeight={80}
                          title
                          key={index}
                        />
                      ))
                    : latest.slice(0, 5).map((blog, bitem) => (
                    <div className="posts" key={bitem}>
                      <div className="post">
                        <div className="img-holder">
                          <img
                            src={`${globalEnv.api}${blog?.attributes?.Image?.data[0]?.attributes?.formats?.thumbnail?.url}`}
                            alt=""
                          />
                        </div>
                        <div className="details">
                          <i
                            className="fi flaticon-calendar"
                            style={{ fontSize: "13px", marginRight: "3px" }}
                          ></i>
                          <span className="date">
                            {new Date(
                              blog?.attributes?.createdAt
                            ).toLocaleDateString("en-GB")}{" "}
                          </span>
                          <h4>
                            <Link
                              onClick={ClickHandler}
                              to={`/highlight-single/${blog?.attributes?.Slug}`}
                            >
                              <span className="cutofftext">
                                {" "}
                                {blog.attributes.Title}
                              </span>
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="widget tag-widget">
                  <h3 style={{ fontWeight: "400", color: "#070707" }}>Tags</h3>
                  <ul className="highlightedTag">
                    {loading ?<div><div style={{display:"flex", justifyContent:"space-around"}}> <ShimmerButton size="sm"/><ShimmerButton size="sm"/></div> <div style={{display:"flex", justifyContent:"space-around"}}> <ShimmerButton size="sm"/><ShimmerButton size="sm"/></div> </div>: (objectsWithUniqueTags.map((blog) => (
                      <li key={blog.id}>
                        <Link
                          onClick={ClickHandler}
                          to={`/blog/tag/${blog?.attributes?.Tag}`}
                        >
                          {blog.attributes.Tag}
                        </Link>
                      </li>
                    )))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HighlightsNews;