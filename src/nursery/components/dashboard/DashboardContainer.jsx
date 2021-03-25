import React, {useEffect, useState} from "react";
import AuthService from "../../../services/auth";
import NurseryDashboard from "./NurseryDashboard";
import CarerDashboard from "./CarerDashboard";
import NurseryDataService from "../../../services/nursery";
import AdminDashboard from "../../../admin/AdminDashboard";
import Warning from "../../../common/Warning";

const DashboardContainer = () => {
  const currentUser = AuthService.getCurrentUser();
  const [nursery, setNursery] = useState({});
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setAuthorised(true);
    }

    if (currentUser && currentUser.role !== 'superadmin') {
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
    if (!authorised) {
      return (
        <Warning />
      )
    }

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
