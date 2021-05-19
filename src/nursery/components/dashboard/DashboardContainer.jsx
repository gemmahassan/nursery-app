import React, { useEffect, useState } from "react";
import AuthService from "../../../services/auth";
import NurseryDashboard from "./NurseryDashboard";
import CarerDashboard from "./CarerDashboard";
import NurseryDataService from "../../../services/nursery";
import AdminDashboard from "../../../admin/AdminDashboard";
import Unauthorised from "../../../common/Unauthorised";
import { message } from "antd";
import {useHistory} from "react-router";

const DashboardContainer = () => {
  let history = useHistory();
  // get current user details from JWT
  const currentUser = AuthService.getCurrentUser();

  const [nursery, setNursery] = useState({});
  const [authorised, setAuthorised] = useState(false);
  const [purged, setPurged] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  // call API to purge deleted data over 90 days
  // catch response error code - if 404, there was no data to purge
  const handlePurge = () => {
    NurseryDataService.purge()
      .then(() => {
        setPurged(true);
        message.success("All data has been purged!");
        setShowPopover(false);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          message.error("No data to purge");
          setShowPopover(false);
        }
      });
  };

  // call API to deactivate current nursery
  const handleDeactivate = () => {
    NurseryDataService.deactivate(nursery.id)
      .then(() => history.push('/'))
      .catch((e) => console.log(e));
  };

  // return the layout depending on user type
  const getLayout = () => {
    if (!authorised) {
      return <Unauthorised />;
    }

    switch (currentUser.role) {
      case "superadmin":
        return (
          <AdminDashboard
            handlePurge={handlePurge}
            setShowPopover={setShowPopover}
            showPopover={showPopover}
            purged={purged}
          />
        );
      case "admin":
      case "staff":
        return (
          <NurseryDashboard
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            currentUser={currentUser}
            handleDeactivate={handleDeactivate}
            nursery={nursery}
          />
        );
      case "carer":
        return <CarerDashboard nursery={nursery} currentUser={currentUser} />;
    }
  };

  // on page render:
  // if user is logged in, they are authorised to view the dashboard as the correct layout will be displayed for them
  // if they are not logged in and navigate to the /dashboard route, they will see the Unauthorised component
  // if the user is not superadmin, get the details for their associated nursery
  // set the data-theme for all body elements to the colour picked by the nursery admin when registering the account
  useEffect(() => {
    if (currentUser) {
      setAuthorised(true);
    }

    if (currentUser && currentUser.role !== "superadmin") {
      NurseryDataService.get(currentUser.nurseryId)
        .then((response) => {
          setNursery(response.data);
          const body = document.getElementById("body");
          body.setAttribute("data-theme", response.data.color);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  return <>{getLayout()}</>;
};

export default DashboardContainer;
