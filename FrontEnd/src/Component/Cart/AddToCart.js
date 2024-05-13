import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { ImBin2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { abcd, totalProduct } from "../../Atom/Atom";

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCartedProduct, setTotalCartedProduct] = useAtom(totalProduct);
  const [CGST, setCGST] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [payable, setpayable] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const AddItemToCart = (productId) => {
    axios
      .post("http://localhost:8000/addItemToCart", {
        productId: productId,
        quantity: 1,
      })
      .then((res) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };
  const removeOneItemToCart = (productId) => {
    axios
      .post("http://localhost:8000/addItemToCart", {
        productId: productId,
        quantity: -1,
      })
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:8000/getAllCart")
      .then((res) => {
        const cartData = res.data.show_cart[0];
        const products = cartData.products;
        const totalProducts = products.length;

        const total = products.reduce((acc, product) => {
          return acc + parseInt(product.product_price) * product.quantity;
        }, 0);

        setCartItems(products);
        setTotalPrice(total);
        setCGST(Math.abs((total * 4.5) / 100));
        setSGST(Math.abs((total * 4.5) / 100));
        setpayable(Math.ceil(total - CGST - SGST));
        setTotalCartedProduct(totalProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeleteCartItem = (ProductId) => {
    alert(ProductId);
    axios
      .post(
        `http://localhost:8000/removeCartProduct/663f151bdde3f55dae966d3b/${ProductId}`
      )
      .then(function (res) {
        console.log(res);
        alert("Product deleted successfully");
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
        alert("Error deleting product");
      });
  };

  return (
    <>
      <Container className="my-4">
        <Row className="justify-content-center align-items-center ">
          <Col>
            <Card className="shopping-cart">
              <Card.Body className="text-black">
                <Row>
                  <Col
                    lg="7"
                    className="px-5 py-4"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    <h4 className="mb-5  text-center fw-bold text-uppercase">
                      Your products Total -: {totalCartedProduct}
                    </h4>
                    <hr />

                    {cartItems.map((product) => (
                      <div
                        key={product._id}
                        className="d-flex align-items-center mb-5"
                      >
                        <div className="flex-shrink-0">
                          <Card.Img
                            src={`http://localhost:8000/images/${product.product_img}`}
                            style={{ width: "150px" }}
                            alt="Product"
                          />
                        </div>

                        <div className="flex-grow-1 ms-3">
                          <div className="d-flex align-items-center py-2">
                            <p className="fw-bold mb-0 me-5 pe-3">
                              Name -:{product.product_name}
                            </p>
                          </div>

                          <div className="d-flex align-items-center py-2">
                            <p className="fw-bold mb-0 me-5 pe-3">
                              Price -:{product.product_price}
                            </p>
                          </div>

                          <div className="d-flex align-items-center py-2">
                            <p className="fw-bold mb-0 me-5 pe-3">
                              Quantity -:{product.quantity}
                            </p>
                          </div>

                          <div className="d-flex align-items-center py-2">
                            <p className="fw-bold mb-0 me-5 pe-3">
                              <button
                                onClick={() =>
                                  removeOneItemToCart(product.productId)
                                }
                              >
                                -
                              </button>

                              <input
                                type="number"
                                step="1"
                                max="10"
                                defaultValue="1"
                                value={product.quantity}
                                className="quantity-field border-0 text-center w-25"
                              />
                              <button
                                onClick={() => AddItemToCart(product.productId)}
                              >
                                +
                              </button>
                            </p>

                            <div
                              className="btn  "
                              onClick={() => {
                                DeleteCartItem(product.productId);
                              }}
                            >
                              <ImBin2 className="ms-5 fs-5" />
                            </div>
                          </div>

                          <hr />
                        </div>
                      </div>
                    ))}
                  </Col>

                  <Col lg="5" className="px-5 py-4">
                    <h4 className="mb-5  text-center fw-bold text-uppercase">
                      Total Bill
                    </h4>
                    <hr className="mb-4" />
                    <div className="d-flex justify-content-between px-x border-bottom">
                      <p className="fw-bold">Total Price:</p>
                      <p className="fw-bold">{totalPrice}.00</p>
                    </div>
                    <div className="d-flex justify-content-between px-x border-bottom">
                      <p className="fw-bold">CGST(4.5%)</p>
                      <p className="fw-bold">-{CGST}</p>
                    </div>
                    <div className="d-flex justify-content-between px-x border-bottom">
                      <p className="fw-bold">SGST(4.5%)</p>
                      <p className="fw-bold">-{SGST}</p>
                    </div>
                    <div
                      className="d-flex justify-content-between p-2 mb-2"
                      style={{ backgroundColor: "#e1f5fe" }}
                    >
                      <h5 className="fw-bold mb-0">Total payable:</h5>
                      <h5 className="fw-bold mb-0">={payable}</h5>
                    </div>
                    <hr />

                    <h5 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      <Link to="/">
                        <button className="btn border border-black px-5 mx-2">
                          Continue Shopping
                        </button>
                      </Link>
                      <Link to="/Payment">
                        <button className="btn border border-black px-5 mx-2 ">
                          PayNow
                        </button>
                      </Link>
                    </h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
