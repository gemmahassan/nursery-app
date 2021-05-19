import React, { useEffect, useState } from "react";
import UserDataService from "../../../services/user";
import EditStaff from "./EditStaff";

const EditStaffContainer = ({
  staff,
  hideEditStaffModal,
  refreshStaff,
  showEditStaffModal,
}) => {
  const [currentStaff, setCurrentStaff] = useState(staff);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // call API to update staff user using data captured from form
  const handleUpdateStaff = ({ first_name, surname }) => {
    UserDataService.update(staff.id, first_name, surname)
      .then(() => setEditSuccess(true))
      .catch((e) => console.log(e));
  };

  // call API to set deleted timestamp of selected user
  const handleDelete = () => {
    UserDataService.delete(staff.id)
      .then(() => {
        setDeleteSuccess(true);
        hideEditStaffModal();
      })
      .catch((e) => console.log(e));
  };

  // store selected staff in state each time user selects a staff member
  useEffect(() => {
    setCurrentStaff(staff);
  }, [staff]);

  // if a staff member if edited or deleted, refresh the list of staff
  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      refreshStaff();
    }
  }, [editSuccess, deleteSuccess]);

  return (
    <EditStaff
      currentStaff={currentStaff}
      deleteSuccess={deleteSuccess}
      editSuccess={editSuccess}
      handleDelete={handleDelete}
      handleUpdateStaff={handleUpdateStaff}
      hideEditStaffModal={hideEditStaffModal}
      showEditStaffModal={showEditStaffModal}
    />
  );
};

export default EditStaffContainer;
