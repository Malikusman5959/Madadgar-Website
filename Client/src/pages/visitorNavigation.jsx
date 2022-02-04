/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function VisitorNavigation(props) {
  return (
    <nav className="col-lg-8 col-md-8 col-12 top-bar__row-col__nav">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="">Get Services</a>
        </li>
        <li>
          <a href="">Provide Service</a>
        </li>
        <li>
          <a href="">Reviews</a>
        </li>
        <li>
          <a href="">FAQ Portal</a>
        </li>
        <li>
          <a href="#who-we-are">About us</a>
        </li>
        <li>
          <a href="#contact-us">Contact us</a>
        </li>
      </ul>
    </nav>
  );
}

export default VisitorNavigation;
