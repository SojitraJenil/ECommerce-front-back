import React, { useEffect, useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { RenderHost } from "../../API/Api";

var LogoImage = "https://www.cartify.org/logo/logo_full.png";

function Header({ onInputChange }) {
  const [inputValue, setInputValue] = useState(null);
  const [TotalCart, setTotalCart] = useState("");
  // useEffect(() => {
  //   setTotalcart(Totalcart);
  // }, [Totalcart]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${RenderHost}/getAllCart`)
        .then((res) => {
          const cartData = res.data.show_cart[0];
          const products = cartData.products;
          const totalProducts = products.length;
          setTotalCart(totalProducts); // Update total cart count
        })
        .catch((err) => {
          console.error(err); // Log errors
        });
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary border-top border-bottom sticky-top"
      style={{ zIndex: "10" }}
    >
      <Container className="py-2">
        {/* <Navbar.Brand> */}
        <img
          src={LogoImage}
          alt="logo"
          onClick={() => window.location.reload()}
          style={{
            cursor: "pointer",
            width: "10%",
          }}
        />
        {/* </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto mx-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              className="option text-dark px-3 text-decoration-none text-center"
              to="/"
            >
              Home
            </Link>
            <Link
              className="option text-dark px-3 text-decoration-none text-center"
              to="/menSection"
            >
              Men
            </Link>
            <Link
              className="option text-dark px-3 text-decoration-none text-center"
              to="/womenSection"
            >
              Women
            </Link>
            <Link
              className="option text-dark px-3 text-decoration-none text-center"
              to="/KidsSection"
            >
              Kids
            </Link>
            <Link
              className="option text-dark px-3 text-decoration-none text-center"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="option text-dark px-3 text-decoration-none text-center"
              to="/contact"
            >
              Contact
            </Link>
          </Nav>
          <Form
            className="d-flex justify-content-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="row">
              <div className="col-12">
                <div className="input-group">
                  <input
                    className="form-control border-none outline-none"
                    placeholder="Search Product..."
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <Link to="/AddToCart">
              <span className=" border-none position-relative mx-2">
                <ShoppingBasketIcon className="option ms-3 fs-2 " />
                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {TotalCart}
                </span> */}
              </span>
            </Link>
            <Link to="/account" className="text-text-decoration-none text-dark">
              <span>
                <AccountCircleIcon className="option ms-3 fs-2" />
              </span>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
