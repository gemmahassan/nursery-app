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

        {role === "admin" && (
          <EditOutlined onClick={() => setShowEditModal(!showEditModal)} />
        )}
      </h2>


      {(image && child.photo_permission === 1) && <Image src={image} />}
      {console.log(text)}
      <p>{text}</p>
      <p>
        Added by {firstName} {surname}
      </p>

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
