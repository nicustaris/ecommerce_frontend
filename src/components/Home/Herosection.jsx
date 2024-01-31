import React from "react";

import "./Herosection.css";
import { Link } from "react-router-dom";

const Herosection = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero_section">
      <div className="align_center content_align">
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>
        <Link to={link} className="hero_link">
          Shop Now
        </Link>
      </div>
      <div className="align_center">
        <img src={image} className="hero_image" alt="" />
      </div>
    </section>
  );
};

export default Herosection;
