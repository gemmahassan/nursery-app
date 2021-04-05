import React from "react";
import {EditOutlined, ReadOutlined} from "@ant-design/icons";
import {Avatar, List} from "antd";

const StaffItem = ({currentUser, editStaff, staff}) => {
  const {first_name, image, surname} = staff;

  const getActions = () => {
    if (currentUser.role === 'admin') {
      return [<EditOutlined key="edit"
                            onClick={() => {
                              editStaff(staff);
                            }}
      />]
    } else {
      return []
    }
  };

  return (
    <List.Item actions={getActions()}>
      <List.Item.Meta
        avatar={<Avatar src={image}/>}
        title={`${first_name} ${surname}`}
      />
    </List.Item>
  );
};

export default StaffItem;
