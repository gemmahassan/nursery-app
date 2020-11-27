import React from "react";

import StaffItem from "./StaffItem";

interface StaffListProps {
  staff: Staff[];
}

interface Staff {
  id: string;
  imageUrl: string;
  name: string;
  email: string;
  nurseryId: string;
  phone: number;
}

const StaffList: React.FC<StaffListProps> = ({ staff }) => {
  if (staff.length === 0) {
    return <h2>No staff found</h2>;
  }

  console.log("List: ", staff);
  console.log(staff[0].id);
  return (
    <ul>
      {staff.map((staff) => (
        <StaffItem
          key={staff.id}
          id={staff.id}
          imageUrl={staff.imageUrl}
          name={staff.name}
          email={staff.email}
          phone={staff.phone}
          nurseryId={staff.nurseryId}
        />
      ))}
    </ul>
  );
};

export default StaffList;
