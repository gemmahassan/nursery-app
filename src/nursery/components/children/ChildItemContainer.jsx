import React from "react";
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import ChildItem from "./ChildItem";

// This component displays each individual child list item
// The child's name is accompanied by an avatar and clickable icons to either
// add a journal entry for that child, or edit the child's
// personal details
const ChildItemContainer = ({child, currentUser, editChild, addJournal, showJournal}) => {
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
    <ChildItem
      child={child}
      firstName={first_name}
      getActions={getActions}
      image={image}
      showJournal={showJournal}
      surname={surname}
    />
  );
}

export default ChildItemContainer;