import React from "react";
import { List } from "antd";

// render a list of staff
const StaffItem = ({ firstName, getActions, surname }) => {
  return (
    <List.Item actions={getActions()}>
      <List.Item.Meta title={`${firstName} ${surname}`} />
    </List.Item>
  );
};

export default StaffItem;
