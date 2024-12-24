import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllRoute from "./Route/Allroute";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Loader from "./Container/Loading/Loader";
import Login from "./Container/Login/Login";

function App() {
  const [loader, setLoader] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {/* <Maintenance />*/}
      {
        (userId && token) ? <AllRoute /> : <Login />
      }
    </>
  );
}

export default App;
