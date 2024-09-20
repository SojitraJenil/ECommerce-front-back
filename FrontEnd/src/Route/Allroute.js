/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Component/Home/Home";
import Mensection from "../Component/Mensection/Mensection";
import Womensection from "../Component/Womensection/Womensection";
import Login from "../Container/Login/Login";
import Account from "../Container/Account/Account";
import Register from "../Container/Register/Register";
import Product from "../Container/Product/Product";
import AddToCart from "../Component/Cart/AddToCart";
import Payment from "../Component/Payment/Payment";
import EmailUpdate from "../Component/EmailUpdate/EmailUpdate";
import Error from "../Container/Error/Error";
import Kidssection from "../Component/Kidssection/Kidssection";
import Blog from "../Component/Blog";
import Contact from "../Component/Contact/Contact";
import Bill from "../Component/Payment/Bill";

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
        <Route path="/Payment/Bill" element={<Bill />} />

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
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Allroute;
