import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { RenderHost } from "../../API/Api";
import Header from "../../Component/Navbar/Header";
import TopNavbar from "../../Component/TopNavbar/TopNavbar";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [image, setImage] = useState("");

  // Fetching product data
  const getdata = async () => {
    try {
      const response = await axios.get(
        `${RenderHost}/Product_Show/ProductId/${id}`
      );
      setData(response.data.product);
      setImage(response.data.product?.product_img?.[0]); // Set default image
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <TopNavbar />
      <Header />
      <Container className="product-container">
        <section id="product-info" className="mt-4">
          <Row>
            {/* Left Section: Thumbnails */}
            <Col md={2} className="thumbnail-column">
              {data.product_img &&
                data.product_img.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="thumb-box my-2"
                    onClick={() => setImage(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Product Image ${index + 1}`}
                      className="thumb-img"
                    />
                  </div>
                ))}
            </Col>

            {/* Middle Section: Main Image */}
            <Col md={6} className="main-image-column">
              <img
                src={image || (data.product_img && data.product_img[0])} // Show selected or first image
                alt="Main Product"
                className="main-product-img border border-black"
              />
            </Col>

            {/* Right Section: Product Details */}
            <Col md={4} className="product-details">
              <h2 className="product-title">
                {data.product_name} <span>{data.category?.name}</span>
              </h2>

              {/* Ratings and Reviews */}
              <div className="ratings mb-2">
                <span className="stars">★★★★☆</span>
                <span className="review-count">(120 reviews)</span>
              </div>

              {/* Product Price */}
              <h3 className="product-price">${data.product_price}</h3>

              {/* Dummy Product Details */}
              <p>
                <b>Color:</b> Black
              </p>

              <p>
                <b>Size:</b>
              </p>
              <select className="size-select">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>

              {/* Description */}
              <h6>Description:</h6>
              <p>
                {data.description || "This is a sample product description."}
              </p>

              {/* Warranty and Shipping */}
              <p className="mt-2">
                <b>Warranty:</b> 3 Years Manufacturer Warranty{" "}
                <a href="#">Know More</a>
              </p>
              <p>
                <b>Delivery:</b> Free delivery within 5-7 business days
              </p>

              {/* Action Buttons */}
              <div className="action-buttons mt-3">
                <Link to="/Payment">
                  <button className="btn btn-primary w-100 mb-2">
                    Buy Now
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
}

export default Product;
