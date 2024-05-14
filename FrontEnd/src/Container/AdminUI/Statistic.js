import AdminUI from "./AdminUI";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Loader from "../../Container/Loading/Loader";
import All_Admin_Details from "./All_Admin_Details";

function Product_Detail() {
  const [loading, setloading] = useState(false);
  const data = [
    { name: "User", uv: 450, pv: 1247, amt: 2400 },
    { name: "Product", uv: 200, pv: 1245, amt: 2400 },
    { name: "Order", uv: 100, pv: 2541, amt: 2400 },
    { name: "Inquery", uv: 400, pv: 5812, amt: 2400 },
    { name: "cart Detail", uv: 1465, pv: 4120, amt: 2400 },
    { name: "category", uv: 400, pv: 4120, amt: 2400 },
  ];

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
          <h3 className="text-center text-uppercase">statistical analysis</h3>
          <div className="d-flex">
            <div className="my-3 mx-auto ">
              <LineChart
                width={1000}
                height={300}
                data={data}
                className=" text-dark fw-bold"
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product_Detail;
