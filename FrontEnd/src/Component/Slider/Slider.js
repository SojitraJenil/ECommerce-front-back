import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Slider.css";
import "animate.css";

const data = [
  {
    Name: "Slider 2",
    Path: "https://dronevionics.com/wp-content/uploads/2023/01/Experimental_Solutions.png",
    content1: "Welcome to Our E-commerce Store",
    content2: "Discover the latest trends in fashion and accessories.",
  },
  {
    Name: "Slider 3",
    Path: "https://i.blogs.es/614765/okkkkkporrtadacaptura-de-pantalla-2018-09-10-a-las-11.28.01/1366_2000.jpg",
    content1: "Shop Now and Save Big ",
    content2: "Explore our exclusive deals and Continue",
  },
  {
    Name: "Slider 4",
    Path: "https://content.assets.pressassociation.io/2018/01/07143254/adbbd7be-613d-4f13-91e5-1e0ba8dacc34-1366x676.jpg",
    content1: "Welcome to Our E-commerce Store",
    content2: "Discover the latest trends in fashion and accessories.",
  },
  {
    Name: "Slider 5",
    Path: "https://www.gorangergroup.com/wp-content/uploads/2017/02/jobs-1366.jpg",
    content1: "Shop Now and Save Big ",
    content2: "Explore our exclusive deals and Continue",
  },
];

const options = {
  responsiveClass: true,
  loop: true,
  nav: true,
  dots: true,
  autoplay: true,
  alignItems: "center",
  autoplayTimeout: 2000,
  smartSpeed: 2000,
  animateIn: "animate__fadeIn",
  animateOut: "animate__fadeOut",
  responsive: {
    200: {
      items: 1,
      nav: false,
      dots: false,
    },
    400: {
      items: 1,
      nav: false,
      dots: false,
    },
    600: {
      items: 1,
      nav: false,
      dots: false,
    },
    700: {
      items: 1,
      nav: false,
      dots: false,
    },
    1000: {
      items: 1,
      nav: false,
      dots: false,
    },
    1300: {
      items: 1,
      nav: true,
      dots: true,
    },
  },
};
function Slider() {
  return (
    <div>
      <OwlCarousel className="owl-theme" loop nav {...options}>
        {data.map((img) => {
          return (
            <>
              <div className="item" style={{ objectFit: "cover" }}>
                <img
                  src={img.Path}                  
                  alt="Carousel"
                />
              </div>
            </>
          );
        })}
      </OwlCarousel>
    </div>
  );
}

export default Slider;
