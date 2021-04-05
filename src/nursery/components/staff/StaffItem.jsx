import React from "react";
import {EditOutlined} from "@ant-design/icons";
import {Avatar, List} from "antd";

const StaffItem = ({editStaff, staff}) => {
  const {first_name, image, surname} = staff;

  return (
    <List.Item actions={[
      <EditOutlined key="edit"
                    onClick={() => {
                      editStaff(staff);
                    }}
      />
    ]}>
      <List.Item.Meta
        avatar={<Avatar src={image}/>}
        title={`${first_name} ${surname}`}
      />
    </List.Item>
  );
};

export default StaffItem;
