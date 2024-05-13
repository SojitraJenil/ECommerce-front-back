import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Component/Home/Home";
import Mensection from "../Component/Mensection/Mensection";
import Womensection from "../Component/Womensection/Womensection";
import Login from "../Container/Login/Login";
import Account from "../Container/Account/Account";
// import Admin from "../Container/Admin/Admin";
// import UserUpdate from "../Container/Admin/UserUpdate";
import Register from "../Container/Register/Register";
// import Product_manage from "../Container/Admin/Product_manage";
// import User_Manage from "../Container/Admin/User_Manage";
// import InquiryManage from "../Container/Admin/InquiryManage";
import Inquiry_Detail from "../Container/AdminUI/Inquiry_Detail";
import Product_Detail from "../Container/AdminUI/Product_Detail";
import Categories_Detail from "../Container/AdminUI/Categories_Detail";
import User_Detail from "../Container/AdminUI/User_Detail";
import Product from "../Container/Product/Product";
import Order_Manage from "../Container/AdminUI/Order_Manage";
import AddToCart from "../Component/Cart/AddToCart";
import Payment from "../Component/Payment/Payment";
import EmailUpdate from "../Component/EmailUpdate/EmailUpdate";
import Error from "../Container/Error/Error";
import KidsSection from "../Component/Kidssection/Kidssection";
import Kidssection from "../Component/Kidssection/Kidssection";
import Blog from "../Component/Blog";
import Contact from "../Component/Contact/Contact";
import Cart_Details from "../Container/AdminUI/Cart_Details";

const Allroute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin" element={<AdminUI />} /> */}
        {/* <Route path="/Update_User/:id" element={<UserUpdate />} /> */}

        {/* <Route path="/admin/User_Manage" element={<User_Manage />} /> */}
        {/* <Route path="/admin/Product_manage" element={<Product_manage />} /> */}
        {/* <Route path="/admin/InquiryManage" element={<InquiryManage />} /> */}

        <Route path="/Payment" element={<Payment />} />

        <Route path="/EmailUpdate" element={<EmailUpdate />} />

        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/About" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/menSection" element={<Mensection />} />
        <Route path="/womenSection" element={<Womensection />} />
        <Route path="/KidsSection" element={<Kidssection />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/AddToCart" element={<AddToCart />} />

        <Route path="/Admin" element={<Product_Detail />} />
        <Route path="/Admin/User_Detail" element={<User_Detail />} />
        <Route path="/Admin/Product_Detail" element={<Product_Detail />} />
        <Route path="/Admin/Inquiry_Detail" element={<Inquiry_Detail />} />
        <Route path="/Admin/Order_Manage" element={<Order_Manage />} />
        <Route
          path="/Admin/Categories_Detail"
          element={<Categories_Detail />}
        />
        <Route path="/Admin/Cart_Details" element={<Cart_Details />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Allroute;
