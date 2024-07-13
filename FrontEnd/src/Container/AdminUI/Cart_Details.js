import AdminUI from "./AdminUI";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import All_Admin_Details from "./All_Admin_Details";
import Swal from "sweetalert2";
import { RenderHost } from "../../API/Api";

function Cart_Details() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ShowAllCartProduct();
  }, []);

  const ShowAllCartProduct = () => {
    axios.get(`${RenderHost}/getAllCart`).then(function (response) {
      console.log(response.data.show_cart);
      setCart(response.data.show_cart);
    });
  };
  const DeleteCartItem = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${RenderHost}/removeCartProduct/66444b466f3d22168fc6238a/${productId}`
          )
          .then(function (res) {
            console.log(res);
            ShowAllCartProduct();
          })
          .catch(function (error) {
            console.log(error);
            alert("Error deleting product");
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
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
                  <th>Deelte</th>
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
                        {product.product_img && (
                          <img
                            src={`${RenderHost}/images/${product.product_img}`}
                            style={{ objectFit: "cover" }}
                            width="100"
                            height="100"
                            alt="Product"
                          />
                        )}
                      </td>
                      <td>{product.quantity}</td>
                      <td>{product.product_price}</td>
                      <td>{product.quantity * product.product_price}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            DeleteCartItem(product.productId);
                          }}
                        >
                          Delete
                        </button>
                      </td>
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
