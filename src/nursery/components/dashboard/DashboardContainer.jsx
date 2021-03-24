import React, {useEffect, useState} from "react";
import AuthService from "../../../services/auth";
import NurseryDashboard from "./NurseryDashboard";
import CarerDashboard from "./CarerDashboard";
import NurseryDataService from "../../../services/nursery";
import AdminDashboard from "../../../admin/AdminDashboard";

const DashboardContainer = () => {
  const currentUser = AuthService.getCurrentUser();
  const [nursery, setNursery] = useState({});

  useEffect(() => {
    console.log("useEffect user: ", currentUser);
    if (currentUser.role !== 'superadmin') {
      NurseryDataService.get(currentUser.nurseryId)
        .then(response => {
          setNursery(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [])

  const getLayout = () => {
    console.log("getLayout", currentUser.role);
    switch (currentUser.role) {
      case 'superadmin':
        return (
          <AdminDashboard/>
        )
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
