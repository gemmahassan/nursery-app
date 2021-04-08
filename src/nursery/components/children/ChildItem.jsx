import React from "react";
import {Avatar, List} from "antd";
import {EditOutlined, PlusOutlined} from '@ant-design/icons';

// This component displays each individual child list item
// The child's name is accompanied by an avatar and clickable icons to either
// add a journal entry for that child, or edit the child's
// personal details
const ChildItem = ({child, currentUser, editChild, addJournal, showJournal}) => {
  const {first_name, image, surname} = child;

  const getActions = () => {
    const actions = [
      <PlusOutlined key="journal"
                    title="Add Journal Entry"
                    onClick={() => {
                      addJournal(child);
                    }}
      />
    ];

    if (currentUser.role === 'admin') {
      actions.push(
        <EditOutlined key="edit"
                      onClick={() => {
                        editChild(child);
                      }}
        />
      );
    }

    return actions;
  };

  return (
    <List.Item actions={getActions()}>
      <List.Item.Meta
        avatar={<Avatar src={image}/>}
        title={`${first_name} ${surname}`}
        onClick={() => {
          showJournal(child)
        }}
      />
    </List.Item>
  );
}

export default ChildItem;