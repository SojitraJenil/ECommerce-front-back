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
import { Link, useParams } from "react-router-dom";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/getAllCart")
      .then((res) => {
        const cartData = res.data.show_cart[0];
        const products = cartData.products;
        const totalProducts = products.length;
        const total = products.reduce((acc, product) => {
          return acc + parseInt(product.product_price) * product.quantity;
        }, 0);

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

  // const getData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/Product_Show`
  //     );
  //     setData(response.data.One_product_show);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

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
    try {
      const response = await axios.post(
        "http://localhost:8000/Order_Register",
        formData
      );
      console.log("Product_add successful:", response.data);
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

            <MDBAccordion className="card mb-4 my-5">
              <MDBAccordionItem
                collapseId={1}
                className="border-0"
                headerTitle="Promo/Student Code or Vouchers"
              >
                <span>Enter Code</span>
                <MDBInput
                  label=""
                  type="text"
                  name="voucher"
                  onChange={handleChange}
                />
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
                  <div className="text-center py-3">
                    <button className="btn btn-primary button-order col-md-10">
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
                              src={`http://localhost:8000/images/${data.product_img}`}
                              className="object-fit-cover border"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </MDBCol>

                          <MDBCol>
                            <span className="mb-0 text-price">
                              <b>Name -: {data.product_name} </b>
                            </span>
                            <p className="mb-0 text-descriptions">
                              <b>Price -:{data.product_price}$</b>
                            </p>
                            <span className="text-descriptions fw-bold">
                              Quantity -{data.quantity}
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
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                      <button className="btn btn-primary button-order mx-auto px-5">
                        Pay Now
                      </button>
                    </MDBListGroupItem>
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
