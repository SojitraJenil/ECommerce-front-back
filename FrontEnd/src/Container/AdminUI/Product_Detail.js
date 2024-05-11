import AdminUI from "./AdminUI";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../Container/Loading/Loader";
import All_Admin_Details from "./All_Admin_Details";
// import { useNavigate } from "react-router-dom";

function Product_Detail() {
  const [categorys, setcategorys] = useState("");
  const [product_name, Setproduct_name] = useState("");
  const [product_price, Setproduct_price] = useState("");

  // const [Category, setCategory] = useState("");

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [Category, setCategory] = useState(null);
  // const [categoryShow, setCategoryShow] = useState(false);

  // const navigation = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = () => setShow(true);

  // const handleHideCategory = () => setCategoryShow(false);
  // const handleCategory = () => setCategoryShow(true);
  // const handleShowCategory = () => setCategoryShow(true);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    category();
    Getdata();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // setInterval(() => {
  //   loading(true)
  //   handleSubmit();
  // }, 25000);

  // const myTimeout = setTimeout(handleSubmit,2000);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true before making the request
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", categorys);
      formData.append("product_name", product_name);
      formData.append("product_price", product_price);
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/Product_add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false); // Set loading to false after the request is complete
      // alert("Product added successfully.");
      setShow(false);
      Getdata();
      console.log(uploadResponse.data);
    } catch (error) {
      console.error("Error adding product with image:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const category = () => {
    axios.get(`http://localhost:8000/categories`).then(function (response) {
      setCategory(response.data.categories);
      console.log(response.data.categories);
    });
  };

  const Getdata = () => {
    axios.get(`http://localhost:8000/Product_Show`).then(function (response) {
      console.log("data", response.data.product_show);
      setData(response.data.product_show);
    });
  };

  const delete_product = (id) => {
    axios
      .delete(`http://localhost:8000/product_delete/${id}`)
      .then(function (response) {
        console.log(response);
        Getdata();
        // navigation("/");
      });
  };
  const Product_Search = async (key) => { // change val to key for consistency
    console.log(key);
    try {
      const result = await axios.get(`http://localhost:8000/product_Search/${key}`);
      if (result.data.Result && result.data.Result.length > 0) {
        setData(result.data.Result);
      } else {
        Getdata();
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };
  
  
  const Update_product = async (ID) => {
    alert(ID);
  };

  return (
    <div className="d-flex">
      <div className="">
        <AdminUI />
      </div>
      <div className="container-fluid">
        <div>
          {loading && <Loader />}
          {/* <Admin_Navbar /> */}
          <All_Admin_Details />
          <div className="d-flex">
            <div className="">
              <span>Search Product -: </span>
              <span>
                <input
                  type="text"
                  onChange={(e) => {
                    Product_Search(e.target.value);
                  }}
                />
              </span>
            </div>
            <div className="ms-2">
              <button className="btn btn-outline-primary" onClick={handleShow}>
                Add Product
              </button>
            </div>
            {/* <div className="ms-2">
              <button className="btn btn-outline-primary" onClick={handleCategory}>
                Add Category
              </button>
            </div> */}
          </div>
          <Container className="py-2">
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              <Table striped bordered hover className="my-2">
                <thead style={{ position: "sticky", top: "0" }}>
                  <tr>
                    <th>Index</th>
                    <th>Id</th>
                    <th>category</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Product Image path</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {data != null &&
                    data.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item._id}</td>
                          <td>
                            {" "}
                            {Category && item.category && (
                              <>
                                {
                                  Category.find(
                                    (cat) => cat._id === item.category._id
                                  )?.name
                                }
                              </>
                            )}
                          </td>
                          <td>{item.product_name}</td>
                          <td>{item.product_price}</td>
                          <td>
                            {item.product_img &&(
                              <img
                                src={`http://localhost:8000/images/${item.product_img}`}
                                style={{ objectFit: "cover" }}
                                width="100"
                                height="100"
                                alt="Product"
                              />
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                delete_product(item._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => {
                                Update_product(item._id);
                              }}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Container>

          <Modal show={show} onHide={handleClose} onShow={handleUpdate}>
            <Modal.Header closeButton>
              <Modal.Title> Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setcategorys(e.target.value);
                    }}
                  >
                    <option value={null}>---Enter Category ---</option>

                    {Category != null &&
                      Category.map((item) => {
                        return (
                          <>
                            <option value={item._id}>
                              {item._id + "------" + item.name}
                            </option>
                          </>
                        );
                      })}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> Product Name</Form.Label>
                  <Form.Control
                    type="text "
                    onChange={(e) => {
                      Setproduct_name(e.target.value);
                    }}
                    placeholder="enter name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      Setproduct_price(e.target.value);
                    }}
                    placeholder="enter price"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Product Image </Form.Label>
                  <input type="file" onChange={handleFileChange} />
                  {/* <button onClick={handleUpload}>Upload</button>*/}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Add Product
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Product_Detail;
