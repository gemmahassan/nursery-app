import React, { useEffect, useState } from "react";
import ChildDataService from "../../../services/child";
import AddChild from "./AddChild";

const AddChildContainer = ({
  hideAddChildModal,
  nurseryId,
  showAddChildModal,
  refreshChildren,
}) => {
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);
  const [photoPermission, setPhotoPermission] = useState(0);

  // store form inputs in formData
  // pass formData to API call to add a new child
  const handleAddChild = ({ first_name, surname }) => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("surname", surname);
    formData.append("permission", photoPermission);
    if (image) {
      formData.append("image", image, image.name);
    }
    formData.append("nursery_id", nurseryId);

    ChildDataService.create(formData, nurseryId)
      .then(() => setAddSuccess(true))
      .catch((e) => console.log(e));
  };

  // if a new child has been added, refresh the child list
  useEffect(() => {
    if (addSuccess) {
      refreshChildren();
    }
  }, [addSuccess]);

  return (
    <AddChild
      addSuccess={addSuccess}
      handleAddChild={handleAddChild}
      hideAddChildModal={hideAddChildModal}
      photoPermission={photoPermission}
      setImage={setImage}
      setPhotoPermission={setPhotoPermission}
      showAddChildModal={showAddChildModal}
    />
  );
};

export default AddChildContainer;
