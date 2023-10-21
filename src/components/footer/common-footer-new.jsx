import React from "react";
import { Link } from "react-router-dom";
import MainSiteUrl from "../../api/MainSiteUrl";


// footer_links data
const footer_links = [
  {
    id: "company",
    title: "Quick Links",
    col: "col-xl-3",
    links: [
      { title: "About us", link: `${MainSiteUrl.url}/aboutus` },
      { title: "Our Team", link: `${MainSiteUrl.url}/aboutus/company` },
      { title: "Services", link: `${MainSiteUrl.url}/services` },
      {
        title: "Membership",
        link: `${MainSiteUrl.url}/aboutus/company#membership`,
      },
      { title: "Solutions", link: `${MainSiteUrl.url}/solutions` },
      {
        title: "Affiliation",
        link: `${MainSiteUrl.url}/aboutus/company#affiliation`,
      },
      { title: "News", link: "https://blog.metapercept.com/" },
      { title: "Get In Touch", link: `${MainSiteUrl.url}/contact` },
      { title: "Event", link: "https://blog.metapercept.com/" },
      { title: "Blog", link: "https://blog.metapercept.com/" },
    ],
  },
];

const CommonFooter = () => {
  const generateLink = (link) => {
    if (link.link.startsWith("https")) {
      return (
        <a href={link.link} target="_blank" rel="noopener noreferrer">
          {link.title}
        </a>
      );
    } else {
      return <Link href={link.link}>{link.title}</Link>;
    }
  };

  return (
    <>
      <style>
        {`
      .tp-footer__widget ul#company li {
        width: 48%;
        list-style-type:none;
    }
      `}
      </style>
      {footer_links.map((item, i) => (
        <div key={i} className={`${item.col} col-md-6`}>
          <div className="tp-footer__widget mb-40">
            <h3 className="tp-footer__widget-title mb-35">{item.title}</h3>
            <ul id={item.id} style={{listStyleType:"none !important"}}>
              {item.links?.map((link, id) => (
                <li key={id} style={{listStyleType:"none !important"}}>{generateLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommonFooter;

// copy right text
const footer_content = {
  copy_right_info: (
    <>
      Copyright © {new Date().getFullYear()}
      <Link to="https://techpubconnect.org/" target="_blank">
        {" "}
        Metapercept Technology Services LLP
      </Link>{" "}
      All Rights Reserved
    </>
  ),
};

const { copy_right_info } = footer_content;

export const FooterCopyRight = ({ style_3, style_7, style_9 }) => {
  return (
    <>
      <style jsx="true">
        {`
          .tp-footer-menu li a {
            color: var(--tp-common-black) !important;
          }
          .tp-footer-menu li a:hover {
            color: #324da0 !important;
          }
        `}
      </style>
      <div
        style={{ "--tp-theme-redical": "#324da0" }}
        className={`tp-footer__bottom pt-25 pb-25 ${
          style_3 ? "da-ft-copyright-bg" : ""
        } ${style_7 ? "law-footer__bottom red-bg" : ""} ${
          style_9 ? "ha-footer-copyright" : ""
        }`}
      >
        <div className="row align-items-center">
          <div className="col-md-8 col-12">
            {/* <div className="col-md-8 col-12 mb-20"> */}
            <div
              className={`tp-copyrigh-text ${
                style_3 ? "" : "text-center text-md-start"
              }`}
            >
              <span>{copy_right_info}</span>
            </div>
          </div>
          {/* <div className="col-md-4 d-none d-md-block"> */}
          <div className="col-md-4 d-md-block pt-4 pt-sm-0">
            {/* <div className="tp-footer-menu text-end"> */}
            <div className="tp-footer-menu text-center">
              {/* <ul> */}
              <ul className="d-flex justify-content-center" >
                <li>
                  <Link to="https://techpubconnect.org/privacy-policy/" target="_blank">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="https://techpubconnect.org/sitemap" target="_blank">View Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
