import React, { useEffect, useState } from "react";
import JournalDataService from "../../../services/journal";
import AddEntry from "./AddEntry";

const AddEntryContainer = ({ child, hideAddModal, showAddModal, userId }) => {
  const [journalTypes, setJournalTypes] = useState([]);
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

  // call API to get a list of all journal types - used to populate the dropdown in the Add Journal modal
  const getJournalTypes = () => {
    JournalDataService.getTypes()
      .then((response) => setJournalTypes(response.data))
      .catch((e) => console.log(e));
  };

  // call API with formData captured in modal
  const handleAddEntry = ({ entryType, text }) => {
    const formData = new FormData();
    formData.append("type_id", entryType);
    formData.append("child_id", child.id);
    if (text) {
      formData.append("text", text);
    }
    formData.append("user_id", userId);
    formData.append("nursery_id", child.nursery_id);
    if (image) {
      formData.append("image", image, image.name);
    }

    JournalDataService.create(formData, child.nursery_id)
      .then(() => setAddSuccess(true))
      .catch((e) => console.log(e));
  };

  // get journal types on page render
  useEffect(() => {
    getJournalTypes();
  }, []);

  return (
    <AddEntry
      addSuccess={addSuccess}
      child={child}
      handleAddEntry={handleAddEntry}
      hideAddModal={hideAddModal}
      journalTypes={journalTypes}
      setImage={setImage}
      showAddModal={showAddModal}
    />
  );
};

export default AddEntryContainer;
