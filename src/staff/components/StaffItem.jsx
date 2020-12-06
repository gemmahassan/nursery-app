import React from "react";

const StaffItem = ({ name, email }) => {
  return (
    <li>
      <h2>{name}</h2>
      <h3>{email}</h3>
    </li>
  );
};

export default StaffItem;
