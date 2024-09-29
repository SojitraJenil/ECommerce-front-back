import React from "react";
import "./Slider.css";

function Slider() {
  return (
    <div>
      <div class="main-banner" id="top">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <div class="left-content">
                <div class="thumb">
                  <div class="inner-content">
                    <h4>Welcome to The Cartify Shop</h4>
                    <span>Indian e-commerce company</span>
                    <div class="main-border-button">
                      <a href="#">Purchase Now!</a>
                    </div>
                  </div>
                  <img src={require("./image/left-banner-image.jpg")} alt="" />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-content">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="right-first-image">
                      <div class="thumb">
                        <div class="inner-content">
                          <h4>Women</h4>
                          <span>Best Clothes For Women</span>
                        </div>
                        <div class="hover-content">
                          <div class="inner">
                            <h4>Women</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div class="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img
                          src={require("./image/baner-right-image-01.jpg")}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="right-first-image">
                      <div class="thumb">
                        <div class="inner-content">
                          <h4>Men</h4>
                          <span>Best Clothes For Men</span>
                        </div>
                        <div class="hover-content">
                          <div class="inner">
                            <h4>Men</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div class="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img
                          src={require("./image/baner-right-image-02.jpg")}
                          alt=""
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="right-first-image">
                      <div class="thumb">
                        <div class="inner-content">
                          <h4>Kids</h4>
                          <span>Best Clothes For Kids</span>
                        </div>
                        <div class="hover-content">
                          <div class="inner">
                            <h4>Kids</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div class="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img
                          src={require("./image/baner-right-image-03.jpg")}
                          alt=""
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="right-first-image">
                      <div class="thumb">
                        <div class="inner-content">
                          <h4>Accessories</h4>
                          <span>Best Trend Accessories</span>
                        </div>
                        <div class="hover-content">
                          <div class="inner">
                            <h4>Accessories</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div class="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img
                          src={require("./image/baner-right-image-04.jpg")}
                          alt=""
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
