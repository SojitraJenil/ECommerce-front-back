import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RenderHost } from "../../API/Api";
import moment from "moment"; // Import moment
import Header from "../../Component/Navbar/Header";
import TopNavbar from "../../Component/TopNavbar/TopNavbar";

export default function ProfilePage() {
  const Navigation = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUserDetails();
    fetchOrderHistory();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${RenderHost}/findUser/${userId}`);
      if (response.data.status === "User found") {
        setUserDetails(response.data.data); // Set user details from the response
      }
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${RenderHost}/user-orders/${userId}`);
      setOrders(response.data.orders); // Assuming the response contains the orders
    } catch (error) {
      console.log('Error fetching order history:', error);
    }
  };

  const LogoutHandler = () => {
    alert(`${userDetails.fname} You have logged out`);
    localStorage.clear("name");
    Navigation("/login");
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <TopNavbar />
      <Header />
      <MDBContainer className="py-2">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="#">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                {/* Use dynamic data for name */}
                <p className="text-muted mb-1">{userDetails ? `${userDetails.fname} ${userDetails.lname}` : 'Loading...'}</p>
                <p className="text-muted mb-4">{userDetails ? userDetails.email : 'Loading...'}</p>
                <div className="d-flex justify-content-center mb-2"></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>UserID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails ? userDetails.userId : 'Loading...'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails ? `${userDetails.fname} ${userDetails.lname}` : 'Loading...'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails ? userDetails.email : 'Loading...'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails ? userDetails.password : 'Loading...'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails ? userDetails.mobileno : 'Loading...'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            {/* Order History Table */}
            <MDBCard className="mb-4">
              <MDBCardBody>
                <h5 className="text-center">Order History</h5>
                <MDBTable>
                  <MDBTableBody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <MDBTable bordered>
                              <MDBTableHead>
                                <tr>
                                  <th>Product Name</th>
                                  <th>Date</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Description</th>
                                  <th>Status</th>
                                </tr>
                              </MDBTableHead>
                              <MDBTableBody>
                                {order.cartItems.map((item) => (
                                  <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>{item.productPrice}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.productDescription}</td>
                                    <td>Pending...</td>
                                  </tr>
                                ))}
                              </MDBTableBody>
                            </MDBTable>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No orders found</td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
