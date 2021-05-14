import React, { useEffect, useState } from "react";
import JournalDataService from "../../../services/journal";
import EditEntry from "./EditEntry";

const EditEntryContainer = ({
  child,
  hideEditModal,
  journalId,
  showEditModal,
  userId,
  text,
  timestamp,
  typeId,
}) => {
  const initialEntry = {
    id: journalId,
    child_id: child.id,
    type_id: typeId,
    image: "",
    text: text,
    user_id: userId,
    timestamp: timestamp,
  };

  const [journalTypes, setJournalTypes] = useState([]);
  const [image, setImage] = useState();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const currentEntry = initialEntry;
  const photoPermission = child.photo_permission;

  const getJournalTypes = () => {
    JournalDataService.getTypes()
      .then((response) => setJournalTypes(response.data))
      .catch((e) => console.log(e));
  };

  const handleDelete = () => {
    JournalDataService.delete(journalId)
      .then(() => setDeleteSuccess(true))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getJournalTypes();
  }, []);

  const handleEditEntry = ({ type_id, text }) => {
    const formData = new FormData();
    formData.append("type_id", type_id);
    formData.append("text", text);
    formData.append("child_id", child.id);
    formData.append("user_id", userId);
    if (image) {
      formData.append("image", image, image.name);
    }

    JournalDataService.edit(formData, journalId)
      .then(() => setUpdateSuccess(true))
      .catch((e) => console.log(e));
  };

  return (
    <EditEntry
      currentEntry={currentEntry}
      deleteSuccess={deleteSuccess}
      handleDelete={handleDelete}
      handleEditEntry={handleEditEntry}
      hideEditModal={hideEditModal}
      journalTypes={journalTypes}
      photoPermission={photoPermission}
      setImage={setImage}
      showEditModal={showEditModal}
      updateSuccess={updateSuccess}
    />
  );
};

export default EditEntryContainer;
