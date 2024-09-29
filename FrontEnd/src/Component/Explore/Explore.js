import React from "react";
import "./Explore.css";

function Explore() {
  return (
    <div>
      <section class="section" id="explore">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="left-content">
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
                <div class="main-border-button">
                  <a href="/">Discover More</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-content">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="first-image">
                      <img
                        height={"256px"}
                        src={require("./Image/explore-image-01.jpg")}
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="second-image">
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
