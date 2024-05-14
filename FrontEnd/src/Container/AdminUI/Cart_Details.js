import AdminUI from "./AdminUI";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import All_Admin_Details from "./All_Admin_Details";

function Cart_Details() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ShowAllCartProduct();
  }, []);

  const ShowAllCartProduct = () => {
    axios.get(`http://localhost:8000/getAllCart`).then(function (response) {
      console.log(response.data.show_cart);
      setCart(response.data.show_cart);
    });
  };

  return (
    <div className="d-flex">
      <div className="">
        <AdminUI />
      </div>

      <div className="container-fluid">
        <div className="">
          <All_Admin_Details />
          <div className="d-flex py-2">
            <div className="">
              <span>Search Product -: </span>
              <span>
                <input type="text" />
              </span>
            </div>
          </div>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <Table striped bordered hover>
              <thead style={{ position: "sticky", top: "0" }}>
                <tr>
                  <th>Index</th>
                  <th>User ID</th>
                  <th>Cart ID</th>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((cartItem, index) =>
                  cartItem.products.map((product, productIndex) => (
                    <tr key={productIndex}>
                      <td>{productIndex + 1}</td>
                      <td>{cartItem._id}</td>
                      <td>{cartItem.userId}</td>
                      <td>{product.product_name}</td>
                      <td>
                        <img
                          src={`http://localhost:8000/images/${product.product_img}`}
                          alt="Product"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{product.quantity}</td>
                      <td>{product.product_price}</td>
                      <td>{product.quantity * product.product_price}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart_Details;
