import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { RenderHost } from '../../API/Api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  var Navigation = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem('RegisterEmail') || '');
    setPassword(localStorage.getItem('RegisterPassword') || '');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post(`${RenderHost}/login`, {
        email,
        password,
      });

      if (response.data.status === 'User logged in successfully') {
        localStorage.setItem('userId', response.data.user.userId);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('name', JSON.stringify(response.data.user.fname));
        localStorage.setItem('token', response.data.token);
        // Redirect to home page or dashboard
        window.location.href = '/';
      } else {
        setError(response.data.status);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const HandleClick = () => {
    Navigation('/register')
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row w-75">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ marginTop: '12px' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  Forgot Password?
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Sign In"}
                  </button>
                </div>
              </form>
              <div className="text-center my-4">
                <p className="text-muted">or login with</p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-danger">
                    <FaGoogle className="me-2" /> Google
                  </button>
                  <button className="btn btn-outline-primary">
                    <FaFacebook className="me-2" /> Facebook
                  </button>
                </div>
              </div>
              <p className="text-center mt-3">
                Not registered?{" "}
                <button onClick={HandleClick}>
                  {/* <Link to="/register" className="text-decoration-none"> */}
                  Register here
                  {/* </Link> */}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;
