import React from "react";

function Maintenance() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        src={require("../../Assets/scheduled-maintenance-message-examples-and-inspiration0a@3x.png")}
        alt="Maintenance"
        className="object-cover sm:h-[200px] sm:w-[20px]"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            We are under Maintenance
          </p>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
