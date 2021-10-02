import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.scss";
const NotFound = () => {
  return (
    <section className="page_404">
      <div className="four_zero_four_bg">
        <h1>404</h1>
      </div>
      <div className="contant_box_404">
        <h3 className="h3">Look like you're lost</h3>
        <p className="p">the page you are looking for not avaible!</p>
        <NavLink to="/" className="link_404">
          Go to Home
        </NavLink>
      </div>
    </section>
  );
};

export default NotFound;
