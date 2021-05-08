import React, {useEffect, useState} from 'react';
import JournalDataService from "../../../services/journal";
import {useParams} from "react-router-dom";
import AddEntry from "./AddEntry";

const AddEntryContainer = props => {
  const {child, showAddModal, hideAddModal, userId} = props;
  const {nurseryId} = useParams();

  const [journalTypes, setJournalTypes] = useState([]);
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

  const getJournalTypes = () => {
    JournalDataService.getTypes()
      .then(response => {
        setJournalTypes(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJournalTypes();
  }, []);

  const handleAddEntry = ({
                            entryType,
                            text
                          }) => {
    const formData = new FormData();
    formData.append('type_id', entryType);
    formData.append('child_id', child.id);
    formData.append('text', text);
    formData.append('user_id', userId);
    formData.append('nursery_id', child.nursery_id);
    if (image) {
      formData.append('image', image, image.name);
    }

    JournalDataService.create(formData, nurseryId)
      .then(response => {
        setAddSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

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