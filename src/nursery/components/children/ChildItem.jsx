import React from "react";
import { Avatar, List } from "antd";

// This component displays each individual child list item
// The child's name is accompanied by an avatar and clickable icons to either
// add a journal entry for that child, or edit the child's
// personal details
const ChildItem = ({
  child,
  firstName,
  getActions,
  image,
  photoPermission,
  showJournal,
  surname,
}) => {
  return (
    <List.Item actions={getActions()}>
      <List.Item.Meta
        avatar={<Avatar src={photoPermission === 1 && image} />}
        title={`${firstName} ${surname}`}
        onClick={() => {
          showJournal(child);
        }}
      />
    </List.Item>
  );
};

export default ChildItem;
