import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Allroute from "./Route/Allroute";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Loader from "./Container/Loading/Loader";

function App() {
  const [loader, setLoader] = useState(true);

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
      <Allroute />
    </>
  );
}

export default App;
