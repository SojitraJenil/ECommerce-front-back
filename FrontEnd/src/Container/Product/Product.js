import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../Component/Navbar/Header";
import { RenderHost } from "../../API/Api";

const Product = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [image, setImage] = useState();
  const getdata = async () => {
    try {
      const response = await axios.get(
        `${RenderHost}/Product_Show/ProductId/${id}`
      );
      setData(response.data.product);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="d-flex">
          <div className="">
            {data.product_img &&
              data.product_img.map((imageUrl, index) => (
                <Col key={index} className="mb-3 p-3">
                  <img
                    src={`${imageUrl}`}
                    style={{ height: "80px", width: "80px" }}
                    className="border border-black my-2"
                    alt={`Product Image ${index + 1}`}
                    onClick={() => setImage(imageUrl)}
                  />
                </Col>
              ))}
          </div>
          <div className="d-flex">
            <div className="p-3 pt-4">
              <img
                src={`${
                  data.product_img && data.product_img[0] // Check if image state is defined, if not, use the first image
                }`}
                style={{ height: "400px", width: "500px" }}
                className="object-fit-cover border border-black"
                alt="Main Product Image"
              />
              <div className="d-flex justify-content-between"></div>
            </div>

            <div className="">
              <p className="fs-5 fw-b">
                {data.product_name}
                <span>({data.category ? data.category.name : ""})</span>
              </p>
              <h6>{data.description}</h6>
              <h3>${data.product_price}</h3>
              <p>
                <b>Available Product_cards -:</b>
              </p>
              {/* Additional Product_card details */}
              <div>{/* Additional Product_card details */}</div>
              <table border={1} width={"500px"}>
                {/* Additional Product_card details */}
              </table>
              <p className="py-2">
                3 Years Manufacturer Warranty <a href="#">Know More</a>{" "}
              </p>
              <div className="">
                <button className="btn btn-outline-danger w-25 mx-1 border-3">
                  Add to cart
                </button>
                <button className="btn btn-outline-success w-25 mx-1 border-3">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;
