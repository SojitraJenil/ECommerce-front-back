import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Allroute from "./Route/Allroute";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Loader from "./Container/Loading/Loader";
import Maintenance from "./Container/Maintenance/Maintenance";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [loader, setloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 1000);
  }, []);
  if (loader) {
    return <Loader />;
  }

  return (
    <>
    {/* maintance */}
      {/* <Maintenance /> */}
      <Allroute />
    </>
  );
}

export default App;
