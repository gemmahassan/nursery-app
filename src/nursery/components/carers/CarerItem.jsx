import React from "react";
import { Avatar, List } from "antd";

const CarerItem = ({ getActions, image, firstName, surname }) => {
  return (
    <List.Item actions={getActions()}>
      <List.Item.Meta
        avatar={<Avatar src={image} />}
        title={`${firstName} ${surname}`}
      />
    </List.Item>
  );
};

export default CarerItem;
