import React from "react";
import "./Error.css"
import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <center className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h2 className="text-center my-4 ">404 -: Page Not Found</h2>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>
                  <Link to="/" className="link_404 text-decoration-none border-none rounded-full">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Error;
