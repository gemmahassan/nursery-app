import React, { useEffect, useState } from "react";

import StaffList from "../components/StaffList";

// const DUMMY_STAFF = [
//   {
//     id: "s1",
//     name: "Sooty Hassan",
//     phone: 999,
//     email: "sooty@cats.com",
//     password: "tooterrr",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
//     nurseryId: "n1",
//   },
//   {
//     id: "s2",
//     name: "Sweep Hassan",
//     phone: 911,
//     email: "sweep@cats.com",
//     password: "beeperrr",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
//     nurseryId: "n1",
//   },
// ];

const NurseryStaff = () => {
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

  return <StaffList staff={loadedStaff} />;
};

export default NurseryStaff;
