import React from "react";

import StaffList from "../components/StaffList";

const DUMMY_STAFF = [
  {
    id: "s1",
    name: "Sooty Hassan",
    phone: 999,
    email: "sooty@cats.com",
    password: "tooterrr",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    nurseryId: "n1",
  },
  {
    id: "s2",
    name: "Sweep Hassan",
    phone: 911,
    email: "sweep@cats.com",
    password: "beeperrr",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    nurseryId: "n1",
  },
];

const NurseryStaff = () => {
  return <StaffList staff={DUMMY_STAFF} />;
};

export default NurseryStaff;
