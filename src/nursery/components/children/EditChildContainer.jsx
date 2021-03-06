import React, { useEffect, useState } from "react";
import ChildDataService from "../../../services/child";
import EditChild from "./EditChild";

const EditChildContainer = ({
  child,
  hideEditModal,
  refreshChildren,
  showEditModal,
}) => {
  const [currentChild, setCurrentChild] = useState(child);
  const [image, setImage] = useState();
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [photoPermission, setPhotoPermission] = useState(
    currentChild.photo_permission
  );

  // call API with first name and surname captured from form, update child
  const handleUpdateChild = ({ first_name, surname }) => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("surname", surname);
    formData.append("permission", photoPermission);
    if (image) {
      formData.append("image", image, image.name);
    }

    ChildDataService.update(child.id, formData)
      .then(() => setEditSuccess(true))
      .catch((e) => console.log(e));
  };

  // call API to set deleted timestamp for selected child
  const handleDelete = () => {
    ChildDataService.delete(child.id)
      .then(() => setDeleteSuccess(true))
      .catch((e) => console.log(e));
  };

  // store selected child in state every time selected child changes
  useEffect(() => {
    setCurrentChild(child);
  }, [child]);

  // if a child has been edited or deleted, refresh the list of children
  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      refreshChildren();
    }
  }, [editSuccess, deleteSuccess]);

  return (
    <EditChild
      currentChild={currentChild}
      deleteSuccess={deleteSuccess}
      editSuccess={editSuccess}
      handleDelete={handleDelete}
      handleUpdateChild={handleUpdateChild}
      hideEditModal={hideEditModal}
      photoPermission={photoPermission}
      setImage={setImage}
      setPhotoPermission={setPhotoPermission}
      showEditModal={showEditModal}
    />
  );
};

export default EditChildContainer;
