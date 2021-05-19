import React, { useState } from "react";
import UserDataService from "../../../services/user";
import http from "../../../shared/http-common";
import AddStaff from "./AddStaff";

const AddStaffContainer = ({
  hideAddStaffModal,
  nurseryId,
  showAddStaffModal,
}) => {
  const [addSuccess, setAddSuccess] = useState(false);

  // call API to create new staff user using data captured from form
  // if successful, call API to send an email asking usee to complete registration
  const handleAddStaff = ({ first_name, surname, email }) => {
    const userRole = "staff";

    UserDataService.create(first_name, surname, email, nurseryId, userRole)
      .then((response) => {
        const token = response.data.token;
        const subject =
          "Nursery Journal - You have been added as a staff member!";
        const message = `Hi ${first_name}, you have been added as a staff member.
                                  Please click on the link below to create a password and complete your registration
                                  http://localhost:8081/register?token=${token}`;
        http
          .post("/send", {
            first_name,
            email,
            subject,
            message,
          })
          .then(() => setAddSuccess(true))
          .catch((err) => console.log(err));
      })
      .catch((e) => console.log(e));
  };

  return (
    <AddStaff
      addSuccess={addSuccess}
      handleAddStaff={handleAddStaff}
      hideAddStaffModal={hideAddStaffModal}
      showAddStaffModal={showAddStaffModal}
    />
  );
};

export default AddStaffContainer;
