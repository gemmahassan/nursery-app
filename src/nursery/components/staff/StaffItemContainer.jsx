import React from "react";
import { EditOutlined } from "@ant-design/icons";
import StaffItem from "./StaffItem";

const StaffItemContainer = ({ currentUser, editStaff, staff }) => {
  const { first_name, image, surname } = staff;

  // set up edit action for staff items
  // only admin users can see edit option
  const getActions = () => {
    if (currentUser.role === "admin") {
      return [
        <EditOutlined
          key="edit"
          onClick={() => {
            editStaff(staff);
          }}
        />,
      ];
    } else {
      return [];
    }
  };

  return (
    <StaffItem
      firstName={first_name}
      getActions={getActions}
      image={image}
      surname={surname}
    />
  );
};

export default StaffItemContainer;
