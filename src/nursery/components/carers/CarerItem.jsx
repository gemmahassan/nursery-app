import React from "react";
import { List } from "antd";

// renders list of carers
const CarerItem = ({ getActions, firstName, surname }) => {
  return (
    <List.Item actions={getActions()}>
      <List.Item.Meta title={`${firstName} ${surname}`} />
    </List.Item>
  );
};

export default CarerItem;
