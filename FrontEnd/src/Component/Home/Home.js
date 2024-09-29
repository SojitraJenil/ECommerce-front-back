import React, { useState } from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import Contact from "../Contact/Contact";
import Service from "../Service/Service";
import Header from "../Navbar/Header";
import ProductCard from "../../Component/ProductCard/ProductCard";
import Slider from "../Slider/Slider";
import Explore from "../Explore/Explore";

const Home = () => {
  const [data, setData] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };
  return (
    <div>
      <TopNavbar />
      <Header dataof={data} onInputChange={handleInputChange} />
      <Slider />
      {/* <Hero />  */}
      <ProductCard SetMainCart={setData} inputValue={inputValue} />
      <Service />
      <Explore />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
