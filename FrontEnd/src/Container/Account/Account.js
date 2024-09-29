// function Account() {
//   return (
//     <>
//
//           <img
//             alt="preview image"
//             src={image || require("../../Component/img/service-1.jpg")}
//             style={{ height: "100px", width: "100px" }}
//             className="object-fit-cover rounded-circle "
//           />
//         </div>

//         <p className="text-center">
//           <input type="file" onChange={onImageChange} className="filetype" />
//         </p>
//         <hr />
//         <h5 className="text-center">User name -: {name}</h5>
//         <h5 className="text-center">User Email -: {Email}</h5>
//         <h5 className="text-center">User Pass -: {pass}</h5>

//         <div className=" text-center">
//           <input
//             type="button"
//             value={"Logout"}
//             className="btn btn-danger "
//             onClick={LogoutHandler}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Account;

import React from "react";
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
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Component/Navbar/Header";
import TopNavbar from "../../Component/TopNavbar/TopNavbar";

export default function ProfilePage() {
  var Navigation = useNavigate();
  const [data, setData] = useState();
  const [name, setname] = useState();
  const [Email, setEmail] = useState();
  const [pass, setpass] = useState();

  useEffect(() => {
    setname(JSON.parse(localStorage.getItem("name")));
    setEmail(localStorage.getItem("userEmail"));
    setpass(localStorage.getItem("userPassword"));
  }, []);

  const LogoutHandler = () => {
    alert(name + " You have logged out");
    setData(localStorage.clear("name"));
    Navigation("/login");
  };

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
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
                <p className="text-muted mb-1">{name} Patel </p>
                <p className="text-muted mb-4">{Email}</p>
                <div className="d-flex justify-content-center mb-2"></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{pass}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      85967 48154
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
