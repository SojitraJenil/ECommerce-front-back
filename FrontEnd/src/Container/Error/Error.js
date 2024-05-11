import React from "react";
import "./Error.css" 
import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <center  class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h2 class="text-center my-4 ">404 -: Page Not Found</h2>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Look like you're lost</h3>

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
