import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Table from "react-bootstrap/Table";
import { RenderHost } from "../../API/Api";

export default function Bill() {
  const [PrintBill, setPrintBill] = useState(null);
  const [OrderDetails, SetOrderDetails] = useState([]);
  const [InvoiceID, SetInvoiceID] = useState([]);
  const [CreateDate, SetCreateDate] = useState([]);
  const [TotalPrice, setTotalPrice] = useState([]);
  const [CGST, setCGST] = useState([]);
  const [SGST, setSGST] = useState([]);
  const [payable, setpayable] = useState([]);

  useEffect(() => {
    fetch();
    ShowAllOrderDetails();
  }, []);

  const fetch = () => {
    axios.get(`${RenderHost}/getAllCart`).then((res) => {
      const cartData = res.data.show_cart[0];
      const products = cartData.products;
      setPrintBill(products);
      SetInvoiceID(cartData._id);
      SetCreateDate(cartData.createdAt);
      const total = products.reduce((acc, product) => {
        return acc + parseInt(product.product_price) * product.quantity;
      }, 0);
      setTotalPrice(total);
      setCGST(Math.abs((total * 4.5) / 100));
      setSGST(Math.abs((total * 4.5) / 100));
      setpayable(Math.ceil(total - CGST - SGST));
    });
  };

  const ShowAllOrderDetails = () => {
    axios.get(`${RenderHost}/Order_details`).then(function (response) {
      console.log(response.data.show_details);
      SetOrderDetails(response.data.show_details);
    });
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
              {OrderDetails && OrderDetails.length > 0 && (
                <>
                  <ul className="list-unstyled">
                    {/* Assuming there's only one order details item */}
                    <li className="text-muted">
                      To:{" "}
                      <span style={{ color: "#5d9fc5" }}>
                        {OrderDetails[0].fname} {OrderDetails[0].lname}
                      </span>
                    </li>
                    <li className="text-muted">{OrderDetails[0].address}</li>
                    <li className="text-muted">{OrderDetails[0].country}</li>
                    <li className="text-muted">
                      <i className="fas fa-phone-alt"></i>{" "}
                      {OrderDetails[0].phone}
                    </li>
                    <li className="text-muted">
                      <i className="fas fa-envelope"></i>{" "}
                      {OrderDetails[0].email}
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div className="col-xl-4">
              <p className="text-muted">Invoice</p>
              <ul className="list-unstyled">
                <li className="text-muted">
                  <i
                    className="fas fa-circle me-1"
                    style={{ color: "#84B0CA" }}
                  ></i>
                  <span className="fw-bold">ID:</span>
                  {InvoiceID}
                </li>
                <li className="text-muted">
                  <i
                    className="fas fa-circle me-1"
                    style={{ color: "#84B0CA" }}
                  ></i>
                  <span className="fw-bold">Creation Date: </span>
                  {CreateDate}
                </li>
                <li className="text-muted">
                  <i
                    className="fas fa-circle me-1"
                    style={{ color: "#84B0CA" }}
                  ></i>
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
                          src={`${item.product_img}`}
                          alt="Img"
                          className="object-fit-cover border"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </th>
                      <td>{item.product_name}</td>
                      <td>{item.product_price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {parseInt(item.product_price) * item.quantity}
                      </td>{" "}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className="row">
            <div className="col-xl-8">
              <p className="ms-3">
                Add additional notes and payment information
              </p>
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
                  <span className="me-4">Total</span>
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
              <a href="#" className="text-dark text-decoration-none">
                Need Help...?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
