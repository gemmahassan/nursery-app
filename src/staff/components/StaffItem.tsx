import React from "react";

interface StaffItemProps {
  id: string;
  imageUrl: string;
  name: string;
  email: string;
  nurseryId: string;
  phone: number;
}

const StaffItem: React.FC<StaffItemProps> = ({ imageUrl, name, email }) => {
  return (
    <li>
      <h2>{name}</h2>
      <h3>{email}</h3>
    </li>
  );
};

export default StaffItem;
