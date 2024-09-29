import React, { useEffect, useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useAtom } from "jotai";
import { totalProduct } from "../../Atom/Atom";

var LogoImage = "https://www.cartify.org/logo/logo_full.png";

function Header({ onInputChange }) {
  const [inputValue, setInputValue] = useState(null);
  const [totalCartedProduct] = useAtom(totalProduct);
  // const [Totalcart, setTotalcart] = useState(totalCartedProduct);

  // useEffect(() => {
  //   setTotalcart(Totalcart);
  // }, [Totalcart]);

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
            <div class="row">
              <div class="col-12">
                <div class="input-group">
                  <input
                    class="form-control border-none outline-none"
                    placeholder="Search Product..."
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            {/* <span>
              <SearchIcon className=" option fs-2" />
            </span> */}

            <Link to="/AddToCart">
              <span class=" border-none position-relative mx-2">
                <ShoppingBasketIcon className="option ms-3 fs-2 " />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalCartedProduct}
                </span>
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
