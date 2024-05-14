import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCartArrowDown,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import { RiProductHuntFill } from "react-icons/ri";
import { IoStatsChartSharp } from "react-icons/io5";
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/Admin/Statistics   ",
      name: "statistics ",
      icon: <IoStatsChartSharp />,
    },
    {
      path: "/Admin/User_Detail",
      name: "User_Detail",
      icon: <FaTh />,
    },
    {
      path: "/Admin/Inquiry_Detail ",
      name: "Inquiry_Details",
      icon: <FaUserAlt />,
    },
    {
      path: "/Admin/Product_Detail",
      name: "Product_Detail",
      icon: <RiProductHuntFill />,
    },
    {
      path: "/Admin/Order_Manage",
      name: "Order_Detail",
      icon: <FaRegChartBar />,
    },
    {
      path: "/Admin/Categories_Detail  ",
      name: "Categories_Detail",
      icon: <TbCategoryFilled />,
    },
    {
      path: "/Admin/Cart_Details  ",
      name: "Cart_Details",
      icon: <FaCartArrowDown />,
    },
  ];
  return (
    <div className="">
      <div
        style={{
          width: isOpen ? "200px" : "50px",
          height: "100vh",
          maxWidth: "250px",
        }}
        className="text-dark border-2 border-black border "
      >
        <div
          className="d-flex align-content-center"
          style={{ padding: "20px 15px" }}
        >
          <h1 style={{ display: isOpen ? "block" : "none" }} className="fs-5">
            Logo
          </h1>
          <div
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
            className="fs-4 d-flex"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="d-flex text-dark text-decoration-none border-bottom  border-black border-0 "
            style={{ padding: "10px 15px", gap: "15px" }}
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
