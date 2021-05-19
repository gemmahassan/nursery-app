import React from "react";
import { HeartFilled } from "@ant-design/icons";

// render heart-shaped location pin with nursery name as text
const LocationPin = ({ text }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      width: "180px",
      color: "purple",
    }}
  >
    <HeartFilled style={{ fontSize: "1rem" }} />
    <p style={{ fontSize: "1.3em" }}>{text}</p>
  </div>
);

export default LocationPin;
