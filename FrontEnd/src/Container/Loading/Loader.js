import React from 'react'
import { ThreeCircles} from "react-loader-spinner";
    
const Loader = () => {
  return (
    <div>
         <div
            className="spinner"
            style={{  position: "absolute",  left: "50%",  top: "50%",  transform: "translate(-50%, -50%)"}} >
            <ThreeCircles visible={true} height="100" width="100" color="#4fa94d" ariaLabel="three-circles-loading"/>
          </div>
    </div>
  )
}

export default Loader

