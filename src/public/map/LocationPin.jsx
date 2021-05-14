import React from "react";
import { HeartFilled } from "@ant-design/icons";

const LocationPin = ({ text }) => (
  <div>
    <HeartFilled style={{ fontSize: "4 rem" }}>{text}</HeartFilled>
  </div>
);

export default LocationPin;
