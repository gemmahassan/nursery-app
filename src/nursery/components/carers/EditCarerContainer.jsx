import React, {useEffect, useState} from "react";
import UserDataService from '../../../services/user';
import NurseryDataService from "../../../services/nursery";
import CarerDataService from "../../../services/carer";
import EditCarer from "./EditCarer";

const EditCarerContainer = ({carer, hideEditCarerModal, nurseryId, refreshCarer, showEditCarerModal}) => {
  const [currentCarer, setCurrentCarer] = useState(carer);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [children, setChildren] = useState([]);

  const handleUpdateCarer = ({
                               first_name,
                               surname,
                               child,
                             }) => {
    const selectedChildren = child;

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('surname', surname);

    UserDataService.update(carer.id, formData)
      .then(() => {
        selectedChildren.forEach(child => {
          CarerDataService.addCarer(carer.id, child)
            .then(() => setEditSuccess(true))
            .catch(e => console.log(e))
        })
        setEditSuccess(true);
      })
      .catch(e => console.log(e));
  };

  const handleDelete = () => {
    UserDataService.delete(carer.id)
      .then(() => {
        setDeleteSuccess(true);
        hideEditCarerModal();
      })
      .catch(e => console.log(e));
  };

  const getChildren = () => {
    NurseryDataService.getChildren(nurseryId)
      .then(response => setChildren(response.data))
      .catch(e => console.log(e));
  };

  const getOptions = () => {
    const options = children.map(child => {
      return {
        label: `${child.first_name} ${child.surname}`,
        value: child.id,
      }
    });
    return options;
  };

  useEffect(() => {
    setCurrentCarer(carer);
  }, [carer]);

  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      refreshCarer();
    }
  }, [editSuccess, deleteSuccess]);

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
