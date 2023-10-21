import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import globalEnv from "../../api/globalenv.js";
import { Col } from "react-bootstrap";
import "./BlogSidebar.css";
import {  ShimmerText,
  ShimmerCategoryItem,
  ShimmerButton } from "react-shimmer-effects";
const truncate = require("truncate");

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const filterUniqueTags = (articles) => {
  const uniqueTags = new Set();
  const objectsWithUniqueTags = [];

  for (const obj of articles) {
    if (!uniqueTags.has(obj.attributes.Tag)) {
      uniqueTags.add(obj.attributes.Tag);
      objectsWithUniqueTags.push(obj);
    }
  }

  return objectsWithUniqueTags;
};



const BlogSidebar = (props) => {
  const [latest, setLatest] = useState([]);
  const [article, setArticle] = useState([]);
  const [category, setCategory] = useState([]);
   const [loading,setLoading]=useState(true)
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?pagination[page]=1&pagination[pageSize]=6&sort[0]=createdAt:desc&filters[Archived][$eq]=false&populate=*`
        );
        const data = await response.json();
        setLatest(data.data);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/categories?populate=*`
        );
        const data = await response.json();
        setCategory(data.data);
        setLoading(false)      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllArticleData = async () => {
      try {
        const response = await fetch(
          `${globalEnv.api}/api/articles?filters[Archived][$eq]=false&populate=*`
        );
        const data = await response.json();
        setArticle(data.data);
        setLoading(false) 
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticleData();
    fetchCategoryData();
    fetchAllArticleData();
  }, []);

  const objectsWithUniqueTags = filterUniqueTags(article);

  const uniqueCats = new Set();
  const objectsWithUniqueCats = [];


  for (const obj of category) {


    if (!uniqueCats.has(obj?.attributes?.Title)) {
      uniqueCats.add(obj?.attributes?.Title);
      objectsWithUniqueCats.push(obj);
    }
  }


  return (
    <Col lg={4} xs={12} className={`col col-lg-4 col-12 ${props.blLeft}`}>
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
            ) :objectsWithUniqueCats.map((blog) => (
              <li key={blog.id}>
                <Link
                  onClick={ClickHandler}
                  to={`/blog/category/${blog?.attributes?.Slug}`}
             >
                  {blog.attributes.Title}
                  <span  style={{fontSize:"20px"}} >({blog?.attributes?.Articles?.data?.length})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="widget recent-post-widget">
          <h3 style={{ fontWeight: "400", color: "#070707" }}>Latest Posts</h3>
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
                    key={blog.id}
                    style={{ width: "70px", height: "70px" }}
                  />
                </div>
                <div className="details">
                  <i
                    className="fi flaticon-calendar"
                    style={{ fontSize: "13px", marginRight: "3px" }}
                  ></i>
                  <span className="date">
                    {new Date(blog?.attributes?.createdAt).toLocaleDateString(
                      "en-GB"
                    )}{" "}
                  </span>
                  <h4>
                    <Link
                      onClick={ClickHandler}
                      to={`/highlight-single/${blog?.attributes?.Slug}`}
                    >
                      {truncate(blog?.attributes?.Title, 40)}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="widget tag-widget">
          <h3 style={{ fontWeight: "700", color: "#070707" }}>Tags</h3>
          <ul className="highlightedTag">
            {loading ?<div><div style={{display:"flex", justifyContent:"space-around"}}> <ShimmerButton size="sm"/><ShimmerButton size="sm"/></div> <div style={{display:"flex", justifyContent:"space-around"}}> <ShimmerButton size="sm"/><ShimmerButton size="sm"/></div> </div>:objectsWithUniqueTags.map((blog) => (
              <li key={blog.id}>
                <Link
                  onClick={ClickHandler}
                  to={`/blog/tag/${blog?.attributes?.Tag}`}
                >
                  {blog.attributes.Tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default BlogSidebar;
