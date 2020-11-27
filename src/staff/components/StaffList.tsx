import React, { useEffect, useState } from "react";

import StaffItem from "./StaffItem";

const StaffList = () => {
  const [loadedStaff, setLoadedStaff] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/staff");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedStaff(responseData.staff);
      } catch (err) {}
    };
    sendRequest();
  }, []);

  if (loadedStaff.length === 0) {
    return <h2>No staff found</h2>;
  }

  return (
    <ul>
      {loadedStaff.map((staff: any) => (
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
