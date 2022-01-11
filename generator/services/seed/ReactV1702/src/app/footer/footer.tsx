import React from "react";
import "./footer.scss";
const Footer = () => {
  var currentTime = new Date();
var year = currentTime.getFullYear()
console.log("year: ", year)
  return (
    <div className="container-fluid footer-wrapper">
      <div className="row footer-container">
        <div className="col-xl-3  col-6 ">
          <div className="row logo-width cursor-pointer">
            <img src="https://cdn.grapedrop.com/u5129d9550ab64e5a8a9dd4793644e5e7/714a528bf62f4d1aa0eb507da72fe9ee_electricglide.png"></img>
          </div>
          <div className="row cursor-pointer">Compare hundreds of electric bikes</div>
          <div className="row cursor-pointer">at one website.</div>
        </div>
        <div className="col-xl-3  col-6">
          <div className="row cursor-pointer">About</div>
          <div className="row cursor-pointer">Dealers</div>
          <div className="row cursor-pointer">Ads</div>
        </div>
        <div className="col-xl-3  col-6">
          <div className="row cursor-pointer">Catalog</div>
          <div className="row cursor-pointer">Comparison</div>
        </div>
        <div className="col-xl-3  col-6">
          <div className="row cursor-pointer">Not Sure Which Electric</div>
          <div className="row cursor-pointer">Bike To Choose?</div>
          <div className="row cursor-pointer take-quiz-btn">Take a Quiz?</div>
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <span className="margin-bootom-copyright">ALL RIGHTS RESERVED. COPYRIGHT {year}. ELECTRICBIKE24</span>
      </div>
    </div>
  );
};

export default Footer;
