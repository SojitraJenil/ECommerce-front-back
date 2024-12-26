import React, { useEffect, useState } from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Container, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./TopNavbar.css";

function TopNavbar() {
  const [data, setData] = useState();
  const [name, setname] = useState(true);
  var Navigation = useNavigate();
  useEffect(() => {
    setname(false);
    setData(JSON.parse(localStorage.getItem("name")));
  }, []);

  const jwt = localStorage.getItem("token");

  const LogoutHandler = () => {
    setData(localStorage.clear("name"));
    alert(data + " Is Logout");
    Navigation("/login");
  };
  return (
    <>
      <div className="bg-body-tertiary">
        <Container>
          <Row className="py-2">
            <div className="col-sm-auto text-sm-start text-center my-auto mx-auto mx-xl-0">
              <span>
                <CampaignIcon className="me-1" />
              </span>
              <span> Welcome back {name ? "UserName" : data}</span>
            </div>
            <div
              className="col-md-auto col-md-center col-12 ms-md-auto me-lg-auto me-md-auto me-xl-0 text-center ms-auto"
              style={{ zIndex: "12" }}
            >
              <Link to="/help-desk">
                <span className="btn border-end border-start border-0">
                  HelpDesk -chat
                </span>
              </Link>
              {/* <span className="btn border-end border-start border-0">
                <NavDropdown title="Language" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    English
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Gujarati
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Hindi</NavDropdown.Item>
                </NavDropdown>
              </span>
              <span className="btn border-end border-start border-0">
                <NavDropdown title="Currency" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">USD,$</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">EUR,!</NavDropdown.Item>
                </NavDropdown>
              </span> */}
              <Link to="/account">
                <span className="btn border-end border-start border-0">
                  My account
                </span>
              </Link>
              {jwt ? (
                <span className="btn border-end border-start border-0">
                  <button
                    onClick={LogoutHandler}
                    className="btn-bg-transparent btn m-0 p-0 border-0"
                  >
                    Logout
                  </button>{" "}
                </span>
              ) : (
                <Link to="/register">
                  <span className="btn border-end border-start border-0">
                    {" "}
                    Register or Sign in
                  </span>
                </Link>
              )}
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default TopNavbar;
