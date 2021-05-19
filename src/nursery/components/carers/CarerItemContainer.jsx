import React from "react";
import { EditOutlined } from "@ant-design/icons";
import CarerItem from "./CarerItem";

const CarerItemContainer = ({ carer, currentUser, editCarer }) => {
  const { first_name, surname } = carer;

  // set up edit action - only available for admin users
  const getActions = () => {
    if (currentUser.role === "admin") {
      return [
        <EditOutlined
          key="edit"
          onClick={() => {
            editCarer(carer);
          }}
        />,
      ];
    } else {
      return [];
    }
  };

  // render carer item component
  return (
    <CarerItem
      firstName={first_name}
      getActions={getActions}
      surname={surname}
    />
  );
};

export default CarerItemContainer;
