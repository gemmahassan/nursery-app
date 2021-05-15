import React, {useEffect, useState} from "react";
import UserDataService from "../../../services/user";
import CarerDataService from "../../../services/carer";
import NurseryDataService from "../../../services/nursery";
import http from "../../../shared/http-common";
import AddCarer from "./AddCarer";

const AddCarerContainer = ({
                             hideAddCarerModal,
                             nurseryId,
                             showAddCarerModal,
                             refreshCarers,
                           }) => {
  const [addSuccess, setAddSuccess] = useState(false);
  const [children, setChildren] = useState([]);

  const getChildren = () => {
    NurseryDataService.getChildren(nurseryId)
      .then((response) => setChildren(response.data))
      .catch((e) => console.log(e));
  };

  const getOptions = () => {
    const options = children.map((child) => {
      return {
        label: `${child.first_name} ${child.surname}`,
        value: child.id,
      };
    });
    return options;
  };

  const handleAddCarer = ({first_name, surname, child, email}) => {
    const selectedChildren = child;
    const userRole = "carer";

    UserDataService.create(first_name, surname, child, email, nurseryId, userRole).then((response) => {
      const userId = response.data.id;
      const carerFirstName = response.data.first_name;
      const carerSurname = response.data.surname;
      const token = response.data.token;
      const email = response.data.username;
      const subject = "Nursery Journal - You have been added as a carer!";
      const message = `Hi ${carerFirstName}, you have been added as a carer.
                                  Please click on the link below to create a password and complete your registration
                                  http://localhost:8081/register?token=${token}`;

      http
        .post("/send", {
          carerFirstName,
          carerSurname,
          email,
          subject,
          message,
        })
        .then(() => {
          selectedChildren
            .forEach((child) => {
              CarerDataService.addCarer(userId, child, nurseryId)
                .then(() => setAddSuccess(true))
                .catch((e) => console.log(e));
            }).catch((e) => console.log(e));
        }).catch((e) => console.log(e));
    });
  };

  useEffect(() => {
    if (addSuccess) {
      refreshCarers();
    }
  }, [addSuccess]);

  useEffect(() => {
    getChildren();
  }, []);

  return (
    <AddCarer
      addSuccess={addSuccess}
      getOptions={getOptions}
      handleAddCarer={handleAddCarer}
      hideAddCarerModal={hideAddCarerModal}
      showAddCarerModal={showAddCarerModal}
    />
  );
};
export default AddCarerContainer;
