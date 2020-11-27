import React from "react";

interface NurseryItemProps {
  id: string;
  imageUrl: string;
  name: string;
  address: string;
  town: string;
  staff: string;
}

const NurseryItem: React.FC<NurseryItemProps> = ({ name, address, town }) => {
  return (
    <li>
      <h2>{name}</h2>
      <h3>{address}</h3>
      <h3>{town}</h3>
    </li>
  );
};

export default NurseryItem;
