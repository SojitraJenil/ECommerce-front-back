import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { RenderHost } from "../../API/Api";
import { QRCodeCanvas } from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./payment.css"; // Custom styles

export default function Payment() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("userEmail");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userId: userId,
    country: "United States",
    voucher: "Dummy",
    fname: "",
    lname: "",
    company: "Dummy",
    address: "",
    email: email,
    pinCode: "",
    phone: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [cgst, setCGST] = useState(0);
  const [sgst, setSGST] = useState(0);
  const [payable, setPayable] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${RenderHost}/getCart/${userId}`);
      const cartData = response.data.cart;
      const products = cartData.products;
      setCartItems(products);

      const total = products.reduce(
        (acc, product) => acc + product.productId.product_price * product.quantity,
        0
      );
      const calculatedCGST = (total * 4.5) / 100;
      const calculatedSGST = (total * 4.5) / 100;
      setTotalPrice(total);
      setCGST(calculatedCGST);
      setSGST(calculatedSGST);
      setPayable(total + calculatedCGST + calculatedSGST);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.lname || !formData.address || !formData.phone || !formData.pinCode) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    Swal.fire({
      title: "Address Submitted",
      icon: "success",
    });
    setStep(2); // Proceed to payment step
  };

  const handlePaymentSuccess = () => {
    setStep(3); // Show success message
    setTimeout(() => {
      nav("/Payment/Bill"); // Navigate to bill screen after 3 seconds
    }, 3000);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Payment</h2>
        <h5 className="text-center mb-4">{step === 1 && "1. Add Address Details"}</h5>
        <h5 className="text-center mb-4">{step === 2 && "2. Add Payment"}</h5>

        {step === 1 && (
          <form onSubmit={handleSubmitAddress}>
            {error && <div className="alert alert-danger">{error}</div>}
            <h4>Billing Details</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="fname"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="lname"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <textarea
              name="address"
              className="form-control mb-3"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="pinCode"
                  className="form-control"
                  placeholder="Pin Code"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit Address
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <h4>Order Summary</h4>
            <table className="table table-bordered mb-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price (per unit)</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productId.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.productId.product_price}</td>
                    <td>${item.productId.product_price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total: ${totalPrice}</p>
            <p>CGST: +${cgst}</p>
            <p>SGST: +${sgst}</p>
            <p>
              <strong>Payable: ${payable}</strong>
            </p>
            <QRCodeCanvas value={`Total: $${payable}`} size={256} className="my-4" />
            <p>Scan the QR code to make payment</p>
            <button className="btn btn-success w-100" onClick={handlePaymentSuccess}>
              Press After complete Payment
            </button>
          </div>
        )}


        {step === 3 && (
          <div className="text-center">
            <div className="alert alert-success">
              <strong>Payment Successful! Redirecting to bill...</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
