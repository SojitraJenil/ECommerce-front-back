import React, { useEffect, useState } from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import Header from "../Navbar/Header";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { RenderHost } from "../../API/Api";

const Kidssection = () => {
  useEffect(() => {
    Product1();
    Product2();
  }, []);

  const [data1, setdata1] = useState(null);
  const [data2, setdata2] = useState(null);

  const notify = () => {};

  const Product1 = (item) => {
    axios
      .get(`${RenderHost}/Product_show/category/children`)
      .then(function (response) {
        setdata1(response.data.One_product_show);
      })
      .catch(function (error) {
        if (item != null) {
          console.error("error========?>", error);
        }
      });
  };
  const Product2 = (item) => {
    axios
      .get(`${RenderHost}/Product_show/category/kids-dresses`)
      .then(function (response) {
        setdata2(response.data.One_product_show);
      })
      .catch(function (error) {
        if (item != null) {
          console.error("error========?>", error);
        }
      });
  };
  return (
    <>
      <TopNavbar />
      <Header />

      <Container>
        <Row style={{ width: "100%" }}>
          {data1 != null &&
            data1.map((val, ind) => {
              return (
                <Col xxl={3} xl={4} lg={4} md={6} sm={12}>
                  <Card style={{ width: "18rem" }} className="my-xl-2 mx-auto">
                    <Link
                      to={`/product/${val._id}`}
                      className="text-decoration-none"
                    >
                      <Card.Img
                        variant="top"
                        height={"300px"}
                        className="object-fit-cover"
                        src={`
                          ${val.product_img}`}
                      />
                    </Link>
                    <Card.Body className="text-center">
                      <h5>Name -: {val.product_name}</h5>
                      <h6
                        className="fs-5"
                        style={{
                          color: "#60BABE",
                          fontFamily: "Bebas Neue, cursive",
                        }}
                      >
                        Product Price -:&nbsp;{val.product_price}$
                      </h6>
                      <div className="">
                        <Link
                          to={`/Payment/${val._id}`}
                          className="text-decoration-none"
                        >
                          <button className="btn btn-outline-success">
                            Buy Now
                          </button>
                        </Link>
                        <button
                          className="btn btn-outline-danger ms-2"
                          onClick={() =>
                            notify(val._id, val.product_name, val.product_price)
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          {data2 != null &&
            data2.map((val, ind) => {
              return (
                <Col xxl={3} xl={4} lg={4} md={6} sm={12}>
                  <Card style={{ width: "18rem" }} className="my-xl-2 mx-auto">
                    <Link
                      to={`/product/${val._id}`}
                      className="text-decoration-none"
                    >
                      <Card.Img
                        variant="top"
                        height={"300px"}
                        className="object-fit-cover"
                        src={`${RenderHost}/images/${val.product_img}`}
                      />
                    </Link>
                    <Card.Body className="text-center">
                      <h5>Name -: {val.product_name}</h5>
                      <h6
                        className="fs-5"
                        style={{
                          color: "#60BABE",
                          fontFamily: "Bebas Neue, cursive",
                        }}
                      >
                        Product Price -:&nbsp;{val.product_price}$
                      </h6>
                      <div className="">
                        <Link
                          to={`/Payment/${val._id}`}
                          className="text-decoration-none"
                        >
                          <button className="btn btn-outline-success">
                            Buy Now
                          </button>
                        </Link>
                        <button
                          className="btn btn-outline-danger ms-2"
                          onClick={() =>
                            notify(val._id, val.product_name, val.product_price)
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default Kidssection;
