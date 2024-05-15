import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductCard.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { MdCurrencyRupee } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loader from "../../Container/Loading/Loader";
import Pagination from "react-bootstrap/Pagination";
import { CardImg, CardBody } from "react-bootstrap";

function Product_card({ SetMainCart, inputValue }) {
  const [data, setdata] = useState(null);
  const [Cart, setCart] = useState(0);
  const [cate, setcate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Fix the useState call
  const [totalPages, setTotalPages] = useState(1);

  console.log("totalPages", totalPages);
  console.log("currentPage", currentPage);
  const notify = (val) => {
    toast("Product Added Successfully...!", { icon: "👏" });
    setCart(Cart + 1);
    SetMainCart(Cart);
    AddItemToCart(val);
  };

  useEffect(() => {
    Category();
    Product();
    FindProductByProductName(inputValue);
    Product1();
  }, [inputValue]);

  const AddItemToCart = (val) => {
    axios
      .post("http://localhost:8000/addItemToCart", {
        productId: val._id,
        quantity: 1,
        product_name: val.product_name,
        product_price: val.product_price,
        product_img: val.product_img[0],
      })
      .then((res) => {
        console.log(res);
      });
  };

  const FindProductByProductName = (inputValue) => {
    console.log(inputValue);
    if (inputValue) {
      axios
        .get(`http://localhost:8000/Product_show/ProductName/${inputValue}`)
        .then(function (response) {
          setdata(response.data.products);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  };

  const handleHighToLow = () => {
    axios
      .get(`http://localhost:8000/Product_show/Product_Price/high_to_low`)
      .then(function (response) {
        console.log(response.data.products);
        setdata(response.data.products);
        setSortingOption("high_to_low");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleLowToHigh = () => {
    axios
      .get(`http://localhost:8000/Product_show/Product_Price/low_to_high`)
      .then(function (response) {
        console.log(response.data.products);
        setdata(response.data.products);
        setSortingOption("low_to_high");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const Category = () => {
    axios
      .get("http://localhost:8000/categories")
      .then(function (response) {
        setcate(response.data.categories);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const Product = () => {
    axios
      .get(`http://localhost:8000/Product_Show`)
      .then(function (response) {
        setdata(response.data.product_show);
        setTotalPages(response.data.page);
        // setdata(product_price_filter);
        // console.log(response.data.product_show);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const Product1 = (item) => {
    if (item) {
      axios
        .get(`http://localhost:8000/Product_show/category/${item}`)
        .then(function (response) {
          setdata(response.data.One_product_show);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    axios
      .get(`http://localhost:8000/Product_show?page_no=${pageNumber}`)
      .then(function (response) {
        setdata(response.data.product_show);
        console.log(response.data.product_show);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (loading === true) {
    return <Loader />;
  }

  return (
    <>
      <div className="py-5">
        <Container>
          <div>
            <div className="Title py-4">
              <h4>
                <center className="fw-bold pt-4">New Arrivals</center>{" "}
              </h4>
              <h6>
                <center>New Top Trendy Fashion Winter Clothes</center>{" "}
              </h6>
            </div>
            <div className="Btn py-3">
              <input
                type="button"
                value={"All"}
                className="my-md-2 my-sm-2 my-2"
                onClick={() => Product()} // Pass item name to Product1 function
              />
              {cate != null &&
                cate.map((item) => {
                  return (
                    <input
                      type="button"
                      value={item.name}
                      className="my-md-2 my-sm-2 my-2"
                      onClick={() => Product1(item.name)} // Pass item name to Product1 function
                    />
                  );
                })}
            </div>
            <hr />
            <div className="d-flex">
              <div className="">
                <h4 className="mt-2 me-3 ">Filter</h4>
              </div>
              <div>
                {/* Sorting radio buttons */}
                <input
                  type="radio"
                  name="sortingOption"
                  onChange={handleHighToLow}
                  checked={sortingOption === "high_to_low"} // Check if High to Low is selected
                />
                <span className="ps-2">High to Low</span>
                <br />
                <input
                  type="radio"
                  name="sortingOption"
                  onChange={handleLowToHigh}
                  checked={sortingOption === "low_to_high"} // Check if Low to High is selected
                />
                <span className="ps-2">Low to High</span>
                <br />
              </div>
              <div className="ms-auto">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>{" "}
              </div>
            </div>

            <hr />
          </div>
          <div className="">
            <Row>
              {data != null &&
                data.map((val) => {
                  return (
                    <Col
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={6}
                      sm={12}
                      className="mb-4 mb-lg-0"
                    >
                      <Card className="my-2">
                        <div className="d-flex justify-content-between p-3">
                          <p className="lead mb-0">Today's Combo Offer</p>
                          <div
                            className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                            style={{ width: "35px", height: "35px" }}
                          >
                            <p className="text-white mb-0 small">x4</p>
                          </div>
                        </div>
                        <Link
                          to={`/product/${val._id}`}
                          className="text-decoration-none"
                        >
                          <CardImg
                            src={`http://localhost:8000/images/${val.product_img[0]}`}
                            alt="Laptop"
                            height={"300px"}
                            className="object-fit-cover"
                          />
                        </Link>
                        <CardBody>
                          <div className="d-flex justify-content-between">
                            <p className="small">
                              <a href="#!" className="text-muted">
                                {val.category ? val.category.name : ""}
                              </a>
                            </p>
                            <p className="small text-danger">
                              <s>
                                {val.Product_dis_rate == null
                                  ? "999"
                                  : val.product_price *val.Product_dis_rate / 100}
                                <MdCurrencyRupee className="m-0 p-0" />
                              </s>
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mb-3">
                            <h5 className="mb-0">{val.product_name}</h5>
                            <h5 className="text-dark mb-0">
                              {val.product_price}
                              <MdCurrencyRupee className="m-0 p-0" />
                            </h5>
                          </div>

                          <div className="d-flex justify-content-between mb-2">
                            <p className="text-muted mb-0">
                              Available:{" "}
                              <span className="fw-bold">
                                {val.Product_stock != null
                                  ? val.Product_stock
                                  : "999"}
                              </span>
                            </p>
                            <div className="ms-auto text-warning">
                              {[...Array(5)].map((_, index) => (
                                <IoStar
                                  key={index}
                                  className={`text-warning fs-5 ${
                                    index < val.Product_rating ? "filled" : ""
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="">
                            <Toaster position="top-left" reverseOrder={false} />
                            <button
                              className="btn btn-outline-danger  col-12  "
                              onClick={() => {
                                notify(val);
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Product_card;
