import AdminUI from "./AdminUI";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import All_Admin_Details from "./All_Admin_Details";

function Order_Manage() {
  const [Order, SetOrder] = useState();

  useEffect(() => {
    ShowAllOrder();
  }, []);

  const ShowAllOrder = () => {
    axios.get(`http://localhost:8000/Order_details`).then(function (response) {
      console.log(response.data.show_details);
      SetOrder(response.data.show_details);
    });
  };

  function delete_order(id) {
    axios
      .delete(`http://localhost:8000/Order_delete/${id}`)
      .then(function (response) {
        console.log(response);
        ShowAllOrder();
      });
  }

  const Order_search = async (key) => {
    console.log(key);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/Order_Search/${key}`
      );
      if (result.data.Result.length > 0) {
        SetOrder(result.data.Result); // Fix this line
      } else if (result.data.Result === null) {
        ShowAllOrder();
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  return (
    <div className="d-flex">
      <div className="">
        <AdminUI />
      </div>
      <div className="container-fluid" >
        <All_Admin_Details />
        <div className="d-flex w-50 py-2">
            <div className="">
              <span>Search Product -: </span>
              <span>
                <input
                  type="text"
                  onChange={(e) => {
                    Order_search(e.target.value);
                  }}
                />
              </span>
            </div>
          </div>
        <Container >
          <div style={{ maxHeight: "500px", overflowY: "auto" , fontSize:"13px"}}>
            <Table striped bordered hover>
              <thead style={{ position: "sticky", top: "0" }}>
                <tr>
                  <th>Index</th>
                  <th>Id</th>
                  <th>country</th>
                  <th>voucher</th>
                  <th>fname</th>
                  <th>lname</th>
                  <th>company</th>
                  <th>address</th>
                  <th>pinCode</th>
                  <th>email</th>
                  <th>phone</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {Order != null &&
                  Order.map((items, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{items._id}</td>
                          <td>{items.country}</td>
                          <td>{items.voucher}</td>
                          <td>{items.fname}</td>
                          <td>{items.lname}</td>
                          <td>{items.company}</td>
                          <td>{items.address}</td>
                          <td>{items.pinCode}</td>
                          <td>{items.email}</td>
                          <td>{items.phone}</td>
                          <td>
                            <button
                              className="btn text-dark btn-outline-danger"
                              onClick={() => {
                                delete_order(items._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              // onClick={() => {
                              //   delete_Inquiry(items._id);
                              // }}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Order_Manage;
