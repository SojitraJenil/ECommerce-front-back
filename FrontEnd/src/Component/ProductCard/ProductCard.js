import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductCard.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../../Container/Loading/Loader";

function Product_card({ SetMainCart, inputValue }) {
  const [data, setdata] = useState(null);
  const [Cart, setCart] = useState(0);
  const [cate, setcate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState(null);

  const notify = () => {
    toast("Product Added Successfully...!", { icon: "👏" });
    setCart(Cart + 1);
    SetMainCart(Cart);
  };

  useEffect(() => {
    Category();
    Product();
    FindProductByProductName(inputValue);
    Product1();
  }, [inputValue]);


  const FindProductByProductName = (inputValue) => {
    console.log(inputValue);
    axios
      .get(`http://localhost:8000/Product_show/ProductName/${inputValue}`)
      .then(function (response) {
        setdata(response.data.products);
      })
      .catch(function (error) {
        console.log("error", error);
      });
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
        // console.log(response.data.product_show);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const Product1 = (item) => {
    axios
      .get(`http://localhost:8000/Product_show/category/${item}`)
      .then(function (response) {
          setdata(response.data.One_product_show);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if(loading === true){
    return(
      <Loader/>
      )
  }

  return (
    <>
    
      <div className="py-5">
        <Container>   
          <div>
            <div className="Title">
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
              { cate != null &&
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

          </div>
          <div className="">
            <Row style={{ width: "100%" }}>
              {data != null &&
                data.map((val) => {
                  return (
                    <Col xxl={3} xl={4} lg={4} md={6} sm={12}>
                      <Card
                        style={{ width: "18rem" }}
                        className="my-xl-2 mx-auto"
                      >
                        <Link
                          to={`/product/${val._id}`}
                          className="text-decoration-none"
                        >
                          <Card.Img
                            variant="top"
                            height={"300px"}
                            className="object-fit-cover"
                            src={`http://localhost:8000/images/${val.product_img}`}
                          />
                        </Link>
                        <Card.Body className="text-center">
                          <h5>{val.product_name}</h5>
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
                            <Toaster position="top-left" reverseOrder={false} />
                            <button
                              className="btn btn-outline-danger ms-2"
                              onClick={notify}
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
          </div>
        </Container>
      </div>
    </>
  );
}

export default Product_card;
