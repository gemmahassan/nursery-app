import React from "react";

const NurseryItem = ({ name, address, town }) => {
  return (
    <li>
      <h2>{name}</h2>
      <h3>{address}</h3>
      <h3>{town}</h3>
    </li>
  );
};

export default NurseryItem;
