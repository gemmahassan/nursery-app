import React, { useState } from "react";
import UserDataService from "../../../services/user";
import http from "../../../shared/http-common";
import AddStaff from "./AddStaff";

const AddStaffContainer = ({
  hideAddStaffModal,
  nurseryId,
  showAddStaffModal,
}) => {
  const [image, setImage] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

  const handleAddStaff = ({ first_name, surname, email }) => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("surname", surname);
    formData.append("email", email);
    if (image) {
      formData.append("image", image, image.name);
    }
    formData.append("nursery_id", nurseryId);
    formData.append("role", "staff");

    UserDataService.create(formData)
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
      setImage={setImage}
      showAddStaffModal={showAddStaffModal}
    />
  );
};

export default AddStaffContainer;
