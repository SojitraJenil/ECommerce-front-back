import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Table from "react-bootstrap/Table";
import { RenderHost } from "../../API/Api";

export default function Bill() {
  const [PrintBill, setPrintBill] = useState(null);
  const [OrderDetails, SetOrderDetails] = useState({});
  const userId = localStorage.getItem("userId");
  const [InvoiceID, SetInvoiceID] = useState(null);
  const [CreateDate, SetCreateDate] = useState(null);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [CGST, setCGST] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [payable, setPayable] = useState(0);

  useEffect(() => {
    ShowAllOrderDetails();
  }, []);

  const ShowAllOrderDetails = async () => {
    try {
      const response = await axios.get(`${RenderHost}/user-orders/${userId}`);
      const order = response.data.orders[0]; // Assuming only one order
      const cartItems = order.cartItems;

      // Setting order and customer details
      SetInvoiceID(userId);
      SetCreateDate(userId); // Assuming _id is being used as the creation date. You might want to adjust this.
      SetOrderDetails(order); // Update state with the full order details

      // Calculate the total price, CGST, SGST, and payable amount
      const total = cartItems.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
      );
      setTotalPrice(total);
      setCGST(Math.abs((total * 4.5) / 100));
      setSGST(Math.abs((total * 4.5) / 100));
      setPayable(Math.ceil(total - CGST - SGST));

      // Set the product details for printing
      setPrintBill(cartItems);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const onButtonClick = () => {
    window.print();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="mb-2 mt-3">
            <div className="d-flex align-items-baseline">
              <div className="col-xl-9">
                <img
                  src={"https://www.cartify.org/logo/logo_full.png"}
                  alt=""
                  style={{ height: "20%", width: "20%" }}
                />
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  Invoice &gt; &gt; <strong>{InvoiceID}</strong>
                </p>
              </div>
              <div className="col-xl-3 float-end">
                <button
                  className="btn btn-light text-capitalize border-0 ms-2"
                  onClick={onButtonClick}
                >
                  <i className="far fa-file-pdf me-1 text-danger"></i> Print
                </button>
                <hr />
              </div>
            </div>
          </div>
          <div className="text-center">
            <i
              className="fab fa-mdb fa-4x ms-0"
              style={{ color: "#5d9fc5" }}
            ></i>
            <h4 className="pt-0">Invoice</h4>
          </div>
          <div className="row">
            <div className="col-xl-8">
              {OrderDetails && OrderDetails.fname && (
                <ul className="list-unstyled">
                  <li className="text-muted">
                    To: <span style={{ color: "#5d9fc5" }}>{OrderDetails.fname} {OrderDetails.lname}</span>
                  </li>
                  <li className="text-muted">{OrderDetails.address}</li>
                  <li className="text-muted">{OrderDetails.country}</li>
                  <li className="text-muted"><i className="fas fa-phone-alt"></i> {OrderDetails.phone}</li>
                  <li className="text-muted"><i className="fas fa-envelope"></i> {OrderDetails.email}</li>
                  <li className="text-muted"><span className="fw-bold">Company:</span> {OrderDetails.company}</li>
                  <li className="text-muted"><span className="fw-bold">Pin Code:</span> {OrderDetails.pinCode}</li>
                </ul>
              )}
            </div>
            <div className="col-xl-4">
              <p className="text-muted">Invoice</p>
              <ul className="list-unstyled">
                <li className="text-muted">
                  <i className="fas fa-circle me-1" style={{ color: "#84B0CA" }}></i>
                  <span className="fw-bold">ID:</span> {InvoiceID}
                </li>
                <li className="text-muted">
                  <i className="fas fa-circle me-1" style={{ color: "#84B0CA" }}></i>
                  <span className="fw-bold">Creation Date: </span> {CreateDate}
                </li>
                <li className="text-muted">
                  <i className="fas fa-circle me-1" style={{ color: "#84B0CA" }}></i>
                  <span className="fw-bold">Status:</span>
                  <span className="badge bg-success text-white fw-bold ms-1">
                    success
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-2 mx-1 justify-content-center">
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {PrintBill != null &&
                  PrintBill.map((item, index) => (
                    <tr key={index} className="text-center">
                      <th>
                        <img
                          src={item.productImg}
                          alt="Img"
                          className="object-fit-cover border"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </th>
                      <td>{item.productName}</td>
                      <td>{item.productPrice}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {parseInt(item.quantity) * item.productPrice}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className="row">
            <div className="col-xl-8">
              <p className="ms-3">Add additional notes and payment information</p>
            </div>
            <div className="col-xl-3 fw-bold">
              <ul className="list-unstyled">
                <li className="text-muted ms-3">
                  <span className="me-4">Total</span>
                  {TotalPrice}.00
                  <LiaRupeeSignSolid />
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="me-4">CGST</span>-{CGST}
                  <LiaRupeeSignSolid />
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span className="me-4">SGST</span>-{SGST}
                  <LiaRupeeSignSolid />
                </li>
                <hr />
                <li className="text-muted ms-3 mt-2">
                  <span className="me-4">Payable</span>
                  <span className="fs-5">
                    {payable} <LiaRupeeSignSolid className="fs-4 m-0 p-0" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-xl-10">
              <p>Thank you for your purchase</p>
            </div>
            <div className="col-xl-2">
              <a href="#" className="text-dark text-decoration-none">Need Help...?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
