import React, { useEffect, useState } from "react";
import moment from "moment";
import ChildDataService from "../../../services/child";
import JournalEntry from "./JournalEntry";

const JournalEntryContainer = ({ entry, role }) => {
  const {
    child_id,
    first_name,
    id,
    image,
    surname,
    text,
    timestamp,
    type,
    type_id,
    user_id,
  } = entry;
  // extract the time from the timestamp
  const time = moment(timestamp).format("h:mma");

  const [showEditModal, setShowEditModal] = useState(false);
  const [child, setChild] = useState({});

  // call API to get specific child's details
  const getChild = () => {
    ChildDataService.getById(child_id)
      .then((response) => setChild(response.data))
      .catch((e) => console.log(e));
  };

  // get child details on render
  useEffect(() => {
    getChild();
  }, []);

  return (
    <JournalEntry
      child={child}
      firstName={first_name}
      id={id}
      image={image}
      showEditModal={showEditModal}
      setShowEditModal={setShowEditModal}
      role={role}
      surname={surname}
      text={text}
      time={time}
      timestamp={timestamp}
      type={type}
      typeId={type_id}
      userId={user_id}
    />
  );
};

export default JournalEntryContainer;
