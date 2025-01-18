import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link, useNavigate } from "react-router-dom";
import { RenderHost } from "../../API/Api";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigate();

  const getData = async (e) => {
    e.preventDefault();
    if ((!fname || !lname || !email || !password, !mobileNo)) {
      setError("All fields are required....!");
      return;
    }
    try {
      console.log({ fname, lname, email, password, mobileNo });
      const data = await axios.post(`${RenderHost}/register`, {
        fname: fname,
        lname: lname,
        email: email,
        mobileno: mobileNo,
        password: password,
      });
      console.log(data.success);
      localStorage.setItem("RegisterEmail", email);
      localStorage.setItem("mobileno", mobileNo);
      localStorage.setItem("RegisterPassword", password);
      navigation("/Login");
    } catch (error) {
      console.log("ERROR => ", error);
    }
  };

  return (
    <Container>
      <form
        style={{ maxWidth: "400px" }}
        className="w-auto mx-auto border p-3 mt-5 rounded-2"
        onSubmit={getData}
      >
        <h3>Register</h3>
        <div className="mb-3">
          <label className="mb-1">First Name:</label>
          <input
            type="text"
            className="form-control"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Enter The First Name"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1">Last Name:</label>
          <input
            type="text"
            className="form-control"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Enter The Last Name"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter The Email Address"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1">Mobile No:</label>
          <input
            type="string"
            className="form-control"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Enter The Mobile No"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter The Password"
          />
          <input
            id="check"
            type="checkbox"
            className="me-2"
            value={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="check" className="pt-2">
            Show Password
          </label>
        </div>

        <Link to="/login">
          <p className="forgot-password text-right">
            Already registered <span>Log In</span>
          </p>
        </Link>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <div className="d-grid my-3">
          <button type="" className="btn bg-bg-transparent border">
            <GoogleIcon className="me-2" />
            Continue With Google
          </button>
        </div>
        <div className="d-grid my-2">
          <button type="" className="btn bg-bg-transparent border">
            <FacebookIcon className="me-2" />
            Continue With Facebook
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Register;
