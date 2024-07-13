import React, { useEffect, useState } from "react";
import axios from "axios";
import { RenderHost } from "../../API/Api";

function All_Admin_Details() {
  const [Total_User, setTotal_User] = useState("");
  const [Total_Inquiry, setTotal_Inquiry] = useState("");
  const [Total_Product, setTotal_Product] = useState("");
  const [Total_Order, setTotal_Order] = useState("");
  const [Cart, setCart] = useState([]);
  const [Cate, setCate] = useState("");

  useEffect(() => {
    axios.get(`${RenderHost}/Inquiry_show`).then(function (response) {
      setTotal_Inquiry(response.data.inquiry_show.length);
    });

    axios.get(`${RenderHost}/Product_Show`).then(function (response) {
      setTotal_Product(response.data.product_show.length);
    });

    axios.get(`${RenderHost}/show_all_user`).then(function (response) {
      setTotal_User(response.data.data1.length);
    });
    axios.get(`${RenderHost}/Order_details`).then(function (response) {
      setTotal_Order(response.data.show_details.length);
    });
    axios.get(`${RenderHost}/categories`).then(function (response) {
      setCate(response.data.categories.length);
    });
    axios.get(`${RenderHost}/getAllCart`).then(function (response) {
      if (response.data.show_cart && response.data.show_cart.length > 0) {
        // Assuming each item in the cart has a 'products' array
        let totalProducts = response.data.show_cart.reduce(
          (acc, cartItem) => acc + cartItem.products.length,
          0
        );
        setCart(totalProducts);
      } else {
        setCart(0); // Set to 0 if there are no cart items
      }
    });
  }, []);
  return (
    <div>
      {/* <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="text-dark"><button className="btn btn-danger">Logout</button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
      <div className="my-3">
        <div className="row w-100">
          <div className="col-12 col-md-4 shadow-3">
            <div className="card border-2">
              <div className="card-body py-4 ">
                <h5 className="mb-2 fw-bold text-center">Total User</h5>
                <h4 className="mb-2 fw-bold text-center">{Total_User}</h4>
                <div className="mb-0 text-center">
                  <span className="badge bg-success me-2">+9.0%</span>
                  <span className="fw-bold">Since Last Month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 shadow-3">
            <div className="card border-3 text-center">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total Inquiry</h5>
                <h4 className="mb-2 fw-bold">{Total_Inquiry}</h4>
                <div className="mb-0">
                  <span className="badge bg-success me-2">+9.0%</span>
                  <span className="fw-bold">Since Last Month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 shadow-3">
            <div className="card border-2 text-center">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total Product</h5>
                <h4 className="mb-2 fw-bold">{Total_Product}</h4>
                <div className="mb-0">
                  <span className="badge bg-success me-2">+9.0%</span>
                  <span className="fw-bold">Since Last Month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 shadow-3">
            <div className="card border-2 text-center">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total Order</h5>
                <h4 className="mb-2 fw-bold">{Total_Order}</h4>
                <div className="mb-0">
                  <span className="badge bg-success me-2">+9.0%</span>
                  <span className="fw-bold">Since Last Month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 shadow-3">
            <div className="card border-2 text-center">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total Category</h5>
                <h4 className="mb-2 fw-bold">{Cate}</h4>
                <div className="mb-0">
                  <span className="badge bg-success me-2">+9.0%</span>
                  <span className="fw-bold">Since Last Month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 shadow-3">
            <div className="card border-2 text-center">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total Cart</h5>
                <h4 className="mb-2 fw-bold">{Cart}</h4>
                <div className="mb-0">
                  <span className="badge bg-success me-2">+9.0%</span>
                  <span className="fw-bold">Since Last Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default All_Admin_Details;
