import React from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import ChildItem from "./ChildItem";

const ChildItemContainer = ({
  child,
  currentUser,
  editChild,
  addJournal,
  showJournal,
}) => {
  const { first_name, image, surname, photo_permission } = child;

  // sets up add and edit actions for each child item
  // edit is only available to admin users
  const getActions = () => {
    const actions = [
      <PlusOutlined
        key="journal"
        title="Add Journal Entry"
        onClick={() => {
          addJournal(child);
        }}
      />,
    ];

    if (currentUser.role === "admin") {
      actions.push(
        <EditOutlined
          key="edit"
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
      photoPermission={photo_permission}
      showJournal={showJournal}
      surname={surname}
    />
  );
};

export default ChildItemContainer;
