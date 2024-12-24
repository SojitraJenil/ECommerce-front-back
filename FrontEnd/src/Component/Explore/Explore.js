import React from "react";
import "./Explore.css";

function Explore() {
  return (
    <div>
      <section className="section" id="explore">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-content">
                <h2>Explore Our Products</h2>
                <span>
                  You are allowed to use this HexaShop HTML CSS template. You
                  can feel free to modify or edit this layout.
                </span>
                <p>
                  If this template is beneficial for your website or business,
                  please kindly{" "}
                  <a
                    rel="nofollow"
                    href="https://paypal.me/templatemo"
                    target="_blank"
                  >
                    support us
                  </a>{" "}
                  a little via PayPal. Please also tell your friends about our
                  great website. Thank you.
                </p>
                <div className="main-border-button">
                  <a href="/">Discover More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="first-image">
                      <img
                        height={"256px"}
                        src={require("./Image/explore-image-01.jpg")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="second-image">
                      <img
                        height={"256px"}
                        src={require("./Image/explore-image-02.jpg")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Explore;
