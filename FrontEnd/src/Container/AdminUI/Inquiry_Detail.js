import AdminUI from "./AdminUI";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import All_Admin_Details from "./All_Admin_Details";
import Swal from "sweetalert2";
import { RenderHost } from "../../API/Api";
function Inquiry_Detail() {
  const [Inquiry, setInquiry] = useState();

  useEffect(() => {
    ShowAllInquiry();
  }, []);

  const ShowAllInquiry = () => {
    axios.get(`${RenderHost}/Inquiry_show`).then(function (response) {
      console.log(response.data.inquiry_show);
      setInquiry(response.data.inquiry_show);
      console.log(response.data.inquiry_show.length);
    });
  };

  function delete_Inquiry(id) {
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
          .delete(`${RenderHost}/Inquiry_delete/${id}`)
          .then(function (response) {
            console.log(response);
            ShowAllInquiry();
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  const Inquiry_Search = async (key) => {
    console.log(key);
    try {
      const result = await axios.get(`${RenderHost}/Inquiry_Search/${key}`);
      if (result.data.Result && result.data.Result.length > 0) {
        setInquiry(result.data.Result);
      } else {
        ShowAllInquiry();
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

      <div className="container-fluid">
        <div className="">
          <All_Admin_Details />
          <div className="d-flex py-2">
            <div className="">
              <span>Search Product -: </span>
              <span>
                <input
                  type="text"
                  onChange={(e) => {
                    Inquiry_Search(e.target.value);
                  }}
                />
              </span>
            </div>
          </div>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <Table striped bordered hover>
              <thead style={{ position: "sticky", top: "0" }}>
                <tr>
                  <th>*</th>
                  <th>Index</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>mobile</th>
                  <th>subject</th>
                  <th>message</th>
                  <th>delete</th>
                </tr>
              </thead>

              <tbody>
                {Inquiry != null &&
                  Inquiry.map((items, index) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <input type="checkbox" name="" id="" />
                          </td>
                          <td>{index + 1}</td>
                          <td>{items._id}</td>
                          <td>{items.name}</td>
                          <td>{items.email}</td>
                          <td>{items.mobile}</td>
                          <td>{items.subject}</td>
                          <td>{items.message}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                delete_Inquiry(items._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry_Detail;
