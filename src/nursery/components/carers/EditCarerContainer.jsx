import React, { useEffect, useState } from "react";
import UserDataService from "../../../services/user";
import NurseryDataService from "../../../services/nursery";
import CarerDataService from "../../../services/carer";
import EditCarer from "./EditCarer";

const EditCarerContainer = ({
  carer,
  hideEditCarerModal,
  nurseryId,
  refreshCarer,
  showEditCarerModal,
}) => {
  const [currentCarer, setCurrentCarer] = useState(carer);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [children, setChildren] = useState([]);

  // call API to update carer user info
  // then for each child selected, call API to add carer relationship
  const handleUpdateCarer = ({ first_name, surname, child }) => {
    const selectedChildren = child;

    UserDataService.update(carer.id, first_name, surname)
      .then(() => {
        selectedChildren.forEach((child) => {
          CarerDataService.addCarer(carer.id, child, nurseryId)
            .then(() => setEditSuccess(true))
            .catch((e) => console.log(e));
        });
        setEditSuccess(true);
      })
      .catch((e) => console.log(e));
  };

  // call API to set delete timestamp for carer user
  const handleDelete = () => {
    UserDataService.delete(carer.id)
      .then(() => {
        setDeleteSuccess(true);
        hideEditCarerModal();
      })
      .catch((e) => console.log(e));
  };

  // call API to get children for the current nursery
  const getChildren = () => {
    NurseryDataService.getChildren(nurseryId)
      .then((response) => setChildren(response.data))
      .catch((e) => console.log(e));
  };

  // get options for checkboxes
  // each checkbox is the child's name linked to their ID
  const getOptions = () => {
    const options = children.map((child) => {
      return {
        label: `${child.first_name} ${child.surname}`,
        value: child.id,
      };
    });
    return options;
  };

  // store the selected carer in state every time the selected carer changes
  useEffect(() => {
    setCurrentCarer(carer);
  }, [carer]);

  // when a carer is edited or deleted, refresh the carer list
  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      refreshCarer();
    }
  }, [editSuccess, deleteSuccess]);

  // get a list of children on render
  useEffect(() => {
    getChildren();
  }, []);

  return (
    <EditCarer
      currentCarer={currentCarer}
      deleteSuccess={deleteSuccess}
      editSuccess={editSuccess}
      getOptions={getOptions}
      handleDelete={handleDelete}
      handleUpdateCarer={handleUpdateCarer}
      hideEditCarerModal={hideEditCarerModal}
      showEditCarerModal={showEditCarerModal}
    />
  );
};

export default EditCarerContainer;
