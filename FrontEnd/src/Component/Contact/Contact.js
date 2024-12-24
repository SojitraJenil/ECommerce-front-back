import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import TopNavbar from "../../../src/Component/TopNavbar/TopNavbar";
import Header from "../Navbar/Header";
import { RenderHost } from "../../API/Api";
import { useLocation } from "react-router-dom";

function Contact() {
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    error: "",
  };

  const [formData, setFormData] = useState(initialState);
  const location = useLocation(); // Get current route
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, mobile, subject, message } = formData;

    if (!name || !email || !mobile || !subject || !message) {
      setFormData((prevData) => ({
        ...prevData,
        error: "All fields are required",
      }));
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Mobile number must be 10 digits",
      }));
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Invalid email address",
      }));
      return false;
    }

    setFormData((prevData) => ({
      ...prevData,
      error: "",
    }));
    return true;
  };

  const getInquiry = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { name, email, mobile, subject, message } = formData;
        console.log({ name, email, mobile, subject, message });
        const response = await axios.post(`${RenderHost}/Inquiry_add`, {
          name,
          email,
          mobile,
          subject,
          message,
        });
        console.log("Inquiry Successfully");
        console.log(response);
        setFormData(initialState);
        Swal.fire({
          title: "your message has been receive...!",
          // text: "You clicked the button!",
          icon: "success",
        });
      } catch (error) {
        console.log("ERROR => ", error);
      }
    }
  };

  return (
    <>
      {location.pathname === "/contact" && (
        <>
          <TopNavbar />
          <Header />
        </>
      )}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="text-primary text-uppercase">|| Contact Us ||</h6>
            <h1 className="mb-5">Contact For Any Query</h1>
          </div>
          <div className="row g-4">
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d59507.233368723566!2d72.8498176!3d21.2238336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1703589444996!5m2!1sen!2sin"
                width="600"
                height="450"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                frameBorder="0"
                Style={{ minHeight: "350px", border: "0" }}
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
            <div className="col-md-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <p className="mb-4">
                  The contact form is currently inactive. Get a functional and
                  working contact form with Ajax & PHP in a few minutes. Just
                  copy and paste the files, add a little code and you're done.
                </p>
                <form onSubmit={getInquiry}>
                  {formData.error && (
                    <div className="alert alert-danger">{formData.error}</div>
                  )}
                  <div className="row g-3">
                    {[
                      { type: "text", label: "Your Name", name: "name" },
                      { type: "email", label: "Your Email", name: "email" },
                      {
                        type: "number",
                        label: "Mobile Number",
                        name: "mobile",
                      },
                      { type: "text", label: "Subject", name: "subject" },
                    ].map((input) => (
                      <div className="col-12" key={input.name}>
                        <div className="form-floating">
                          <input
                            type={input.type}
                            className="form-control"
                            id={input.name}
                            value={formData[input.name]}
                            onChange={handleChange}
                            placeholder={input.label}
                            name={input.name}
                          />
                          <label htmlFor={input.name}>{input.label}</label>
                        </div>
                      </div>
                    ))}
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          onChange={handleChange}
                          value={formData.message}
                          id="message"
                          style={{ height: "100px" }}
                          name="message"
                        />
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
