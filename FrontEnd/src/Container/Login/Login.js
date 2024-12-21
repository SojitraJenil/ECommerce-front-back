import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaEyeSlash } from "react-icons/fa";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { RenderHost } from "../../API/Api";

const Login = () => {
  const [email, setEmail] = useState("tejasdhandhukiya@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("RegisterEmail"));
    setPassword(localStorage.getItem("RegisterPassword"));
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${RenderHost}/login`, {
        email,
        password,
      });
      if (response.data.status === "User logged in successfully") {
        console.log("Success");
        console.log(response.data.user.fname);
        console.log(response.data.token);

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("name", JSON.stringify(response.data.user.fname));
        localStorage.setItem("token", response.data.token);

        navigate("/");
      } else if (response.data.status === "Incorrect password") {
        alert("Incorrect password");
        console.log("Unsuccessful login");
        navigate("/login");
      } else if (
        response.data.status ===
        "User not found. Please check your email and password"
      ) {
        alert("User not found. Please check your email and password");
        console.log("Unsuccessful login");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const token = localStorage.getItem("token");

  axios
    .get(`${RenderHost}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });

  return (
    <div className="bg-red-400">
      <Container>
        <form
          style={{ maxWidth: "400px" }}
          className="w-auto mx-auto border p-3 mt-5 rounded-2"
          onSubmit={handleLogin}
        >
          <h3>Login Page</h3>
          <div className="mb-3">
            <label className="mb-1">Email -:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter The Email Address....."
            />
          </div>
          <div className="mb-3">
            <label className="mb-1">Password -:</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter The Password....."
            />
            <span>click to {showPassword ? "Hide" : "Show"} Password -: </span>
            <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="fs-4"
            />
          </div>
          <Link to="/register" className="text-dark ">
            <p className="forgot-password text-right">
              Not registered...?<span>please First Register</span>
            </p>
          </Link>
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
              Continue With FaceBook
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
