import React, { useState, useEffect } from "react";
import AdminUI from "./AdminUI";
import axios from "axios";
import Table from "react-bootstrap/Table";
import All_Admin_Details from "./All_Admin_Details";
import Swal from "sweetalert2";
import { RenderHost } from "../../API/Api";

function User_Detail() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Getdata();
  }, []);

  const Getdata = () => {
    axios
      .get(`${RenderHost}/show_all_user`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data1);
        setData(response.data.data1);
      })
      .catch(function (error) {
        console.log("Front Error => " + error);
      });
  };

  const DeleteHandler = async (id) => {
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
          .delete(`${RenderHost}/delete_user/${id}`)
          .then((response) => {
            console.log("Resource deleted successfully:", response.data);
            Getdata();
          })
          .catch((error) => {
            console.error("Error deleting resource:", error);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const HandlerSearch = async (id) => {
    try {
      if (id) {
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}/Search/${id}`
        );
        if (result.data.Result.length > 0) {
          setData(result.data.Result);
        } else {
          Getdata();
        }
      } else {
        Getdata();
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="d-flex ">
      <div className="">
        <AdminUI />
      </div>
      <div className="container-fluid">
        <All_Admin_Details />
        <div className="py-2">
          <span>Search User -: </span>
          <input
            type="text"
            className="border w-25 py-1 ps-1 border-black"
            onChange={(e) => {
              HandlerSearch(e.target.value);
            }}
            placeholder="Enter User Name...."
            id=""
          />
        </div>
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <Table striped bordered hover className="my-2">
            <thead
              style={{
                position: "sticky",
                top: "0",
              }}
            >
              <tr>
                <th>*</th>
                <th>Index</th>
                <th>Id</th>
                <th>FName</th>
                <th>LName</th>
                <th>email</th>
                <th>password</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data != null &&
                data.map((item, ind) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>{ind + 1}</td>
                      <td>{item._id}</td>
                      <td>{item.fname}</td>
                      <td>{item.lname}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            DeleteHandler(item._id);
                          }}
                        >
                          Delete{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default User_Detail;
