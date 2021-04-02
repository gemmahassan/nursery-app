import React from "react";
import {Avatar, List} from "antd";
import {EditOutlined, ReadOutlined} from '@ant-design/icons';

const ChildItem = ({child, editChild, addJournal, showJournal}) => {
  const {first_name, image, surname} = child;

  console.log(child);g
  return (
    <List.Item actions={[
      <ReadOutlined key="journal"
                    onClick={() => {
                      addJournal(child);
                    }}
      />,
      <EditOutlined key="edit"
                    onClick={() => {
                      editChild(child);
                    }}
      />
    ]}>
      <List.Item.Meta
        avatar={<Avatar src={image} />}
        title={`${first_name} ${surname}`}
        onClick={() => {
          showJournal(child)
        }}
      />
    </List.Item>
  );
}

export default ChildItem;