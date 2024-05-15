import AdminUI from "./AdminUI";
import React, { useEffect, useState } from "react";
import { Container, Pagination, Table } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../Container/Loading/Loader";
import All_Admin_Details from "./All_Admin_Details";
import Swal from "sweetalert2";

// import { useNavigate } from "react-router-dom";

function Product_Detail() {
  const [categorys, setcategorys] = useState("");
  const [product_name, Setproduct_name] = useState("");
  const [product_price, Setproduct_price] = useState("");
  const [Product_stock, SetProduct_stock] = useState("");
  const [Product_dis_rate, SetProduct_dis_rate] = useState("");
  const [Product_rating, SetProduct_rating] = useState("");
  const [product_description, Setproduct_description] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    category();
    Getdata();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files; // Get the array of selected files
    setFiles(selectedFiles); // Store the array of selected files in state
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

      // Append each file in the array of files
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      formData.append("category", categorys);
      formData.append("product_name", product_name);
      formData.append("product_price", product_price);
      formData.append("product_description", product_description);
      formData.append("Product_stock", Product_stock);
      formData.append("Product_dis_rate", Product_dis_rate);
      formData.append("Product_rating", Product_rating);

      const uploadResponse = await axios.post(
        `http://localhost:8000/Product_add`,
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
      console.error("Error adding product with images:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    axios
      .get(`http://localhost:8000/Product_show?page_no=${pageNumber}`)
      .then(function (response) {
        setData(response.data.product_show);
        console.log(response.data.product_show);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const category = () => {
    axios.get(`http://localhost:8000/categories`).then(function (response) {
      setCategory(response.data.categories);
      console.log(response.data.categories);
    });
  };

  const Getdata = () => {
    // Assuming skip and limit are defined elsewhere in your code
    const skip = 0; // adjust according to your pagination requirements
    const limit = 25; // adjust according to your pagination requirements

    axios
      .get(`http://localhost:8000/Product_Show`)
      .then(function (response) {
        console.log("data", response.data.product_show);
        setData(response.data.product_show);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  };

  const delete_product = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`http://localhost:8000/product_delete/${id}`)
        .then(function (response) {
          console.log(response);
          Getdata();
          // navigation("/");
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  };
  const Product_Search = async (key) => {
    // change val to key for consistency
    console.log(key);
    try {
      const result = await axios.get(
        `http://localhost:8000/product_Search/${key}`
      );
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
            <div className="ms-4">
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>{" "}
            </div>
            <hr />
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
                    <th>stock</th>
                    <th>dis_rate</th>
                    <th>rating</th>
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
                          <td>{item.Product_stock}</td>
                          <td>{item.Product_dis_rate}</td>
                          <td>{item.Product_rating}</td>
                          <td>
                            {item.product_img && (
                              <img
                                src={`http://localhost:8000/images/${item.product_img[0]}`}
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
              <Modal.Title> Add Product Form</Modal.Title>
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
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      Setproduct_description(e.target.value);
                    }}
                    placeholder="enter Description"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>stock</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      SetProduct_stock(e.target.value);
                    }}
                    placeholder="enter price"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    min="1" // Set minimum value
                    max="25" // Set maximum value
                    onChange={(e) => {
                      const discount = parseFloat(e.target.value); // Parse the input value to a float
                      if (!isNaN(discount) && discount >= 1 && discount <= 25) {
                        SetProduct_dis_rate(discount); // Update state only if the value is valid
                      }
                    }}
                    placeholder="Enter discount (1-25)"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    min="1" // Set minimum value
                    max="5" // Set maximum value
                    onChange={(e) => {
                      const rating = parseInt(e.target.value);
                      if (!isNaN(rating) && rating >= 0 && rating <= 5) {
                        SetProduct_rating(rating);
                      }
                    }}
                    placeholder="Enter rating (1-5)"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Product Images</Form.Label>
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                  />
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
