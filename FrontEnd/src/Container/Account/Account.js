import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  var Navigation = useNavigate();

  const [data, setData] = useState();
  const [name, setname] = useState();
  const [Email, setEmail] = useState();
  const [pass, setpass] = useState();

  useEffect(() => {
    setname(JSON.parse(localStorage.getItem("name")));
    setEmail(localStorage.getItem("userEmail"));
    setpass(localStorage.getItem("userPassword"));
  }, []);

  const LogoutHandler = () => {
    alert(name + " You have logged out");
    setData(localStorage.clear("name"));
    Navigation("/login");
  };

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <div className="mx-auto border w-50 px-2 py-3">
        <h1 className="text-center">Profile</h1>
<hr />
        <div className="text-center">
          <img
            alt="preview image"
            src={image || require("../../Component/img/service-1.jpg") }
            style={{ height: "100px", width: "100px"  }}
            className="object-fit-cover rounded-circle "
          />
        </div>

        <p className="text-center">
          <input type="file" onChange={onImageChange} className="filetype" />
        </p>
        <hr />
        <h5 className="text-center">User name -: {name}</h5>
        <h5 className="text-center">User Email -: {Email}</h5>
        <h5 className="text-center">User Pass -: {pass}</h5>

        <div className=" text-center">
          <input
            type="button"
            value={"Logout"}
            className="btn btn-danger "
            onClick={LogoutHandler}
          />
        </div>
      </div>
    </>
  );
}

export default Account;
