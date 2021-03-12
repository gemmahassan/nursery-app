import React, {useEffect, useState} from "react";
import AuthService from "../../../services/auth";
import NurseryDashboard from "./NurseryDashboard";
import CarerDashboard from "./CarerDashboard";
import NurseryDataService from "../../../services/nursery";
import Home from "../../../public/Home";

const DashboardContainer = () => {
  const currentUser = AuthService.getCurrentUser();
  const [nursery, setNursery] = useState({});

  useEffect(() => {
    NurseryDataService.get(currentUser.nurseryId)
      .then(response => {
        setNursery(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [])

  const getLayout = () => {
    // if (!currentUser) {
    //   return (
    //     <Home />
    //   );
    // }

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
