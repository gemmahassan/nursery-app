import React from "react";
import {Avatar, List} from "antd";
import {EditOutlined, ReadOutlined} from '@ant-design/icons';

const CarerItem = ({carer, editCarer}) => {
  const {first_name, image, surname} = carer;

  return (
    <List.Item actions={[
      <EditOutlined key="edit"
                    onClick={() => {
                      editCarer(carer);
                    }}
      />
    ]}>
      <List.Item.Meta
        avatar={<Avatar src={image} />}
        title={`${first_name} ${surname}`}
        onClick={() => {
          // showJournal(child)
        }}
      />
    </List.Item>
  );
}

export default CarerItem;
