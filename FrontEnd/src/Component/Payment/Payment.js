import React, { useEffect, useState } from "react";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { AllCartData } from "../../Atom/Atom";
import Swal from "sweetalert2";
import { RenderHost } from "../../API/Api";

export default function Payment() {
  const { id } = useParams();

  // const [data, setData] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCartedProduct, setTotalCartedProduct] = useState(0);
  const [CGST, setCGST] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [payable, setpayable] = useState(0);
  const [getEmail, setEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [error, Seterror] = useState(false);
  const [IsPayNow, SetIsPayNow] = useState(false);
  const [CartData, SetAllCartData] = useAtom(AllCartData);
  const nav = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${RenderHost}/getAllCart`)
      .then((res) => {
        SetAllCartData(res.data.show_cart);
        const cartData = res.data.show_cart[0];
        const products = cartData.products;
        const totalProducts = products.length;
        const total = products.reduce((acc, product) => {
          return acc + parseInt(product.product_price) * product.quantity;
        }, 0);
        console.log("res.data.show_cart.products", res.data.show_cart);
        setCartItems(products);
        setTotalPrice(total);
        setCGST(Math.abs((total * 4.5) / 100));
        setSGST(Math.abs((total * 4.5) / 100));
        setpayable(Math.ceil(total - CGST - SGST));
        setEmail(localStorage.getItem("userEmail"));
        setTotalCartedProduct(totalProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [formData, setFormData] = useState({
    country: "",
    voucher: "",
    fname: "",
    lname: "",
    company: "",
    address: "",
    email: "",
    pinCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.country ||
      !formData.fname ||
      !formData.lname ||
      !formData.address ||
      !formData.pinCode ||
      !formData.phone
    ) {
      Seterror(true);
      return;
    }
    try {
      const response = await axios.post(
        `${RenderHost}/Order_Register`,
        formData
      );
      console.log("Product Order successful:", response.data);
      Swal.fire({
        title: "Order Address Added..!",
        text: "You clicked the button!",
        icon: "success",
      });
      // Log the formData state after setting it to null
      console.log("FormData after reset:", formData);
      SetIsPayNow(true);
      setFormData({
        country: "",
        voucher: "",
        fname: "",
        lname: "",
        company: "",
        address: "",
        // email: "", // Add this line to clear the email field
        pinCode: "",
        phone: "",
      });

      // Log a message to verify that the form data is reset
      console.log("Form data reset successfully");
      Seterror(false);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <MDBContainer className="my-4" style={{ maxWidth: "1100px" }}>
      <section>
        <MDBRow>
          <MDBCol md="8">
            <MDBCard className="mb-4 my-4">
              <MDBCardBody>
                <p className="text-uppercase h4 text-font">Delivery Country:</p>
                <MDBRow>
                  <MDBCol md="8">
                    <select
                      className="custom-select"
                      name="country"
                      onChange={handleChange}
                    >
                      <option value="United">United States</option>
                      <option value="Spain">Spain</option>
                      <option value="India">India</option>
                      <option value="Poland">Poland</option>
                      <option value="Italy">Italy</option>
                      <option value="Greece">Greece</option>
                      <option value="Germany">Germany</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Sweden">Sweden</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBAccordion className="card mb-4 my-5" initialActive={1}>
              <MDBAccordionItem
                collapseId={1}
                className="border-0"
                headerTitle="Promo/Student Code or Vouchers"
              >
                <div className="accordion-collapse collapse show">
                  {" "}
                  {/* Add 'show' class here */}
                  <span>Enter Code</span>
                  <MDBInput
                    label=""
                    type="number"
                    min={10}
                    name="voucher"
                    onChange={handleChange}
                  />
                </div>
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBCard className="mb-4 my-5">
              <MDBCardBody>
                <p className="text-uppercase fw-bold mb-3 text-font">
                  Email address
                </p>
                <MDBRow>
                  <MDBCol md="4">
                    <p>{getEmail}</p>
                  </MDBCol>
                  <MDBCol md="7">
                    <Link to="/EmailUpdate">
                      <button className="btn btn-success">
                        Change Email Address
                      </button>
                    </Link>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography
                  tag="h5"
                  className="mb-0 text-font text-uppercase"
                >
                  Delivery address
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <span>First name</span>
                      <MDBInput
                        type="text"
                        name="fname"
                        onChange={handleChange}
                      />
                    </MDBCol>
                    <MDBCol>
                      <span>Last name</span>
                      <MDBInput
                        type="text"
                        name="lname"
                        onChange={handleChange}
                      />
                    </MDBCol>
                  </MDBRow>

                  <span>Company name</span>
                  <MDBInput
                    type="text"
                    name="company"
                    className="mb-4"
                    onChange={handleChange}
                  />
                  <span>Address</span>
                  <MDBTextArea
                    rows={4}
                    name="address"
                    className="mb-4"
                    onChange={handleChange}
                  />
                  <span>PinCode</span>
                  <MDBInput
                    type="text"
                    name="pinCode"
                    className="mb-4"
                    onChange={handleChange}
                  />
                  <span>Email</span>
                  <MDBInput
                    type="email"
                    name="email"
                    className="mb-4"
                    onChange={handleChange}
                  />
                  <span>Phone</span>
                  <MDBInput
                    type="text"
                    name="phone"
                    className="mb-4"
                    onChange={handleChange}
                  />

                  <div className="d-flex justify-content-center">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckChecked"
                      label="Create an account?"
                      defaultChecked
                    />
                  </div>
                  <div className="d-flex mt-2 justify-content-center">
                    {error && (
                      <p className="text-danger">
                        Please fill in all required fields...
                      </p>
                    )}
                  </div>
                  <div className="text-center py-3">
                    <button
                      disabled={IsPayNow == true}
                      className="btn btn-primary button-order col-md-10"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <>
            <MDBCol md="4" className="mb-4 position-statics">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0 text-font">
                    Total Buy Item -: {totalCartedProduct}
                  </MDBTypography>
                </MDBCardHeader>

                <MDBCardBody className="">
                  <MDBRow style={{ maxHeight: "340px", overflowY: "auto" }}>
                    {cartItems.map((data) => {
                      return (
                        <>
                          <MDBCol md="6" className="ms-3">
                            <MDBCardImage
                              src={`${data.product_img}`}
                              className="object-fit-cover border"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </MDBCol>

                          <MDBCol>
                            <span className="mb-0 text-price">
                              <b>
                                <h5>{data.product_name}</h5>{" "}
                              </b>
                            </span>
                            <p className="mb-0 text-descriptions">
                              <b>
                                {data.product_price} * {data.quantity}
                              </b>
                            </p>
                            <span className="text-descriptions fw-bold">
                              ={data.product_price * data.quantity}
                            </span>
                          </MDBCol>
                          <hr />
                        </>
                      );
                    })}
                  </MDBRow>
                </MDBCardBody>
                <MDBCardFooter className="mt-4">
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center fw-bold border-0 px-0 pb-0 text-muted">
                      total Price
                      <span>{totalPrice}.00</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                      CGST
                      <span>-{CGST}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                      SGST
                      <span>-{SGST}</span>
                    </MDBListGroupItem>
                    <hr />
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                      Total payable amount
                      <span>{payable}.00</span>
                    </MDBListGroupItem>
                    {/* <Link to={"/Payment/Bill"}> */}
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                      <button
                        disabled={IsPayNow === false}
                        onClick={() => {
                          Swal.fire({
                            title: "payment is received..!",
                            text: "Now Your Bill is,Here!",
                            icon: "success",
                          });
                          nav("/Payment/Bill");
                        }}
                        className="btn btn-primary button-order mx-auto px-5"
                      >
                        Pay Now
                      </button>
                    </MDBListGroupItem>
                    {/* </Link> */}
                  </MDBListGroup>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}
