import React from "react";
import {Avatar, List} from "antd";
import {EditOutlined, ReadOutlined} from '@ant-design/icons';

const CarerItem = ({carer, currentUser, editCarer}) => {
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
    <List.Item actions={getActions()}>
      <List.Item.Meta
        avatar={<Avatar src={image}/>}
        title={`${first_name} ${surname}`}
      />
    </List.Item>
  );
}

export default CarerItem;
