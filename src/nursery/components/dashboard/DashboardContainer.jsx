import React, {useEffect, useState} from "react";


import AuthService from "../../../services/auth";
import NurseryDashboard from "./NurseryDashboard";
import CarerDashboard from "./CarerDashboard";
import NurseryDataService from "../../../services/nursery";

const DashboardContainer = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log("current user: ", currentUser);
  const [nursery, setNursery] = useState({});

  useEffect(() => {
    NurseryDataService.get(currentUser.nurseryId)
      .then(response => {
        console.log("container response: ", response.data);
        setNursery(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [])

  console.log("nursery container: ", nursery);
  const getLayout = () => {
    switch (currentUser.role) {
      case 'admin':
      case 'staff':
        return (
          <NurseryDashboard
            nursery={nursery}
            currentUser={currentUser}
          />)
      case 'carer':
        return (
          <CarerDashboard
            nursery={nursery}
            currentUser={currentUser}
          />)
    }
  }

  return (
    <>
      {getLayout()}
    </>
  );
};

export default DashboardContainer;
