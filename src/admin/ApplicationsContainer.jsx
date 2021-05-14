import React, { useEffect, useState } from "react";
import NurseryDataService from "../services/nursery";
import UserDataService from "../services/user";
import http from "../shared/http-common";
import Applications from "./Applications";

const ApplicationsContainer = () => {
  const [nurseries, setNurseries] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentNursery, setCurrentNursery] = useState({});
  const [action, setAction] = useState("");
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [duplicateUsername, setDuplicateUsername] = useState(false);

  const getPendingNurseries = () => {
    NurseryDataService.getAllPending()
      .then((response) => setNurseries(response.data))
      .catch((e) => console.log(e));
  };

  const confirmApprove = () => {
    UserDataService.create({
      first_name: currentNursery.contact_first_name,
      surname: currentNursery.contact_surname,
      email: currentNursery.email,
      nursery_id: currentNursery.id,
      role: "admin",
    })
      .then((response) => {
        const nurseryName = currentNursery.name;
        const firstName = currentNursery.contact_first_name;
        const surname = currentNursery.contact_surname;
        const email = currentNursery.email;
        const token = response.data.token;
        const subject = "Nursery Journal - Registration complete!";
        const message = `Hi ${firstName}, your registration for ${nurseryName} is nearly complete!
                                  Please click on the link below to create a password and complete your registration
                                  http://localhost:8001/register?token=${token}`;
        NurseryDataService.approve(currentNursery.id)
          .then(() => {
            http
              .post("/send", {
                firstName,
                surname,
                email,
                subject,
                message,
              })
              .then(() => setChangeSuccess(true))
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setDuplicateUsername(true);
        }
      });
  };

  const confirmDecline = () => {
    const firstName = currentNursery.contact_first_name;
    const surname = currentNursery.contact_surname;
    const email = currentNursery.email;
    const subject = "Nursery Journal - registration declined";
    const message = `Hi ${firstName}, your application for registration of ${currentNursery.name} can not be completed at this time.`;

    NurseryDataService.delete(currentNursery.id)
      .then(() => {
        http
          .post("/send", {
            firstName,
            surname,
            email,
            subject,
            message,
          })
          .then(() => {
            setChangeSuccess(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => console.log(e));
  };

  const handleClick = (nursery, action) => {
    setCurrentNursery(nursery);
    setAction(action);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    switch (action) {
      case "approve":
        confirmApprove();
        return;
      case "decline":
        confirmDecline();
        return;
    }
  };

  useEffect(() => {
    getPendingNurseries();
  }, [nurseries.length]);

  useEffect(() => {
    if (changeSuccess) {
      getPendingNurseries();
    }
  }, [changeSuccess]);

  return (
    <Applications
      action={action}
      duplicateUsername={duplicateUsername}
      handleClick={handleClick}
      handleConfirm={handleConfirm}
      nurseries={nurseries}
      setShowConfirm={setShowConfirm}
      showConfirm={showConfirm}
    />
  );
};

export default ApplicationsContainer;
