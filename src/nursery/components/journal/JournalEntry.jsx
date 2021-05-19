import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Image } from "antd";
import EditEntryContainer from "./EditEntryContainer";

const JournalEntry = ({
  child,
  firstName,
  id,
  image,
  showEditModal,
  setShowEditModal,
  role,
  surname,
  text,
  time,
  timestamp,
  type,
  typeId,
  userId,
}) => {
  return (
    <>
      <h2>
        {time} - {type}
        {/*only show edit option for admin users*/}
        {role === "admin" && (
          <EditOutlined onClick={() => setShowEditModal(!showEditModal)} />
        )}
      </h2>

      {/*if an image is uploaded AND there is permission granted to share photos, render the image*/}
      {image && child.photo_permission === 1 && <Image src={image} />}
      <p>{text}</p>
      <p>
        Added by {firstName} {surname}
      </p>

      {/*if edit button is clicked, show the edit modal*/}
      {showEditModal && (
        <EditEntryContainer
          showEditModal={showEditModal}
          hideEditModal={() => setShowEditModal(false)}
          child={child}
          journalId={id}
          image={image}
          userId={userId}
          text={text}
          timestamp={timestamp}
          type={type}
          typeId={typeId}
        />
      )}
    </>
  );
};

export default JournalEntry;
