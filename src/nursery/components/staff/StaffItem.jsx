import React from "react";
import {EditOutlined, ReadOutlined} from "@ant-design/icons";
import {Avatar, List} from "antd";

const StaffItem = ({editStaff, staff}) => {
  const {first_name, image, surname} = staff;

  return (
    <List.Item actions={[
      <EditOutlined key="edit"
                    onClick={() => {
                      console.log("edit clicked");
                      editStaff(staff);
                    }}
      />
    ]}>
      <List.Item.Meta
        avatar={<Avatar src={image}/>}
        title={`${first_name} ${surname}`}
        onClick={() => {
          // showJournal(staff)
        }}
      />
    </List.Item>
  );
};

export default StaffItem;
