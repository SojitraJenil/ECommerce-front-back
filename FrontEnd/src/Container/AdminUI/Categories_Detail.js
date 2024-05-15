import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import Loader from "../../Container/Loading/Loader";
import AdminUI from "./AdminUI";
import All_Admin_Details from "./All_Admin_Details";
import Swal from "sweetalert2";

function Product_Detail() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios.get(`http://localhost:8000/categories`)
      .then(response => {
        setData(response.data.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const addCategory = () => {
    axios.post(`http://localhost:8000/addCategory`, { name })
      .then(() => {
        fetchData();
        setName("");
      })
      .catch(error => {
        console.error("Error adding category:", error);
      });
  };

  const deleteCategory = (id) => {
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
        axios.delete(`http://localhost:8000/CateDelete/${id}`)
        .then(() => {
          fetchData();
        })
        .catch(error => {
          console.error("Error deleting category:", error);
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  };

  const updateCategory = () => {
    alert(updateCategoryName)
    axios.post(`http://localhost:8000/CateUpdate/${updateCategoryName}`, { name })
      .then(() => {
        fetchData();
        setName("");
        setUpdateCategoryName("");
      })
      .catch(error => {
        console.error("Error updating category:", error);
      });
  };

  const handleUpdate = (item) => {
    setName(item.name);
    setUpdateCategoryName(item._id);
  };

  return (
    <div className="d-flex">
      <div className="">
        <AdminUI />
      </div>
      <div className="container-fluid">
        <div>
          {loading && <Loader />}
          <All_Admin_Details />
          <div className="d-flex justify-content-between">
            <div className="">
              <span>Search Product -: </span>
              <input
                type="text"
                onChange={(e) => fetchData(e.target.value)}
              />
            </div>
            <div className="">
              <span>{updateCategoryName ? "Update Category" : "Add Category"} -: </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                autoFocus
                className="py-1 border-1 border-dotted"
              />
              <button
                className="btn btn-outline-danger ms-3"
                onClick={updateCategoryName ? updateCategory : addCategory}>
                {updateCategoryName ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
          <Container className="py-2">
            <div style={{ maxHeight: "480px", overflowY: "auto" }}>
              <Table striped bordered hover className="my-2">
                <thead style={{ position: "sticky", top: "0" }}>
                  <tr>
                    <th>*</th>
                    <th>Index</th>
                    <th>Id</th>
                    <th>Category</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td>{index + 1}</td>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td><button className="btn btn-outline-danger" onClick={() => deleteCategory(item._id)}>Delete</button></td>
                      <td><button className="btn btn-outline-danger" onClick={() => handleUpdate(item)}>Update</button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Product_Detail;
