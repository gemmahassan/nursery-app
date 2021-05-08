import React from "react";
import {EditOutlined} from '@ant-design/icons';
import CarerItem from "./CarerItem";

const CarerItemContainer = ({carer, currentUser, editCarer}) => {
  const {first_name, image, surname} = carer;

  const getActions = () => {
    if (currentUser.role === 'admin') {
      return [
        <EditOutlined key="edit"
                      onClick={() => {
                        editCarer(carer);
                      }}
        />
      ];
    } else {
      return [];
    }
  };

  return (
    <CarerItem
      firstName={first_name}
      getActions={getActions}
      image={image}
      surname={surname}
    />
  );
}

export default CarerItemContainer;
