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

  // call API to get pending nurseries only
  // store response in nurseries array
  const getPendingNurseries = () => {
    NurseryDataService.getAllPending()
      .then((response) => setNurseries(response.data))
      .catch((e) => console.log(e));
  };

  // call API to create a new user using nursery admin contact details
  // if successful, set the nursery to confirmed
  // send an email to the user to complete registration of their user account
  const confirmApprove = () => {
    UserDataService.create({
      firstName: currentNursery.contact_first_name,
      surname: currentNursery.contact_surname,
      email: currentNursery.email,
      nurseryId: currentNursery.id,
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
                                  http://localhost:8081/register?token=${token}`;
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
        // catch 400 error generated when username already exists
        if (e.response.status === 400) {
          setDuplicateUsername(true);
        }
      });
  };

  // decline an application
  const confirmDecline = () => {
    const firstName = currentNursery.contact_first_name;
    const surname = currentNursery.contact_surname;
    const email = currentNursery.email;
    const subject = "Nursery Journal - registration declined";
    const message = `Hi ${firstName}, your application for registration of ${currentNursery.name} can not be completed at this time.`;

    // call the API to set the deleted timestamp for the nursery
    // send an email informing the nursery admin their application was declined
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

  // function to handle click of the approve or decline buttons
  const handleClick = (nursery, action) => {
    setCurrentNursery(nursery);
    setAction(action);
    setShowConfirm(true);
  };

  // calls the appropriate function based on whether the user selected approve or decline
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

  // get pending nurseries every time the nursery array changes
  useEffect(() => {
    getPendingNurseries();
  }, [nurseries.length]);

  // get pending nurseries every time a change is made
  // e.g. when a nursery is approved, refresh the pending nurseries list
  useEffect(() => {
    if (changeSuccess) {
      getPendingNurseries();
    }
  }, [changeSuccess]);

  // render the applications UI
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
