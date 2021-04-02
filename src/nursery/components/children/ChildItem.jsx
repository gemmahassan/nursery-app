import React from "react";
import {Card, List} from "antd";
import {EditOutlined, ReadOutlined} from '@ant-design/icons';

const ChildItem = ({child, editChild, showJournal}) => {
  const {first_name, image, surname} = child;

  return (
    <List.Item>
      <Card
        // style={{width: 300, borderRadius: '25px'}}
        cover={
          <img
            src={image}
            alt="child"
          />
        }
        actions={[
          <ReadOutlined key="journal"
            onClick={() => {
              showJournal(child);
            }}
          />,
          <EditOutlined key="edit"
            onClick={() => {
             editChild(child);
            }}
          />
        ]}
        title={`${first_name} ${surname}`}
      >
      </Card>
    </List.Item>
  );
}

export default ChildItem;