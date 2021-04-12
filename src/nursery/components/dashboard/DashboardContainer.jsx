import React, {useEffect, useState} from "react";
import AuthService from "../../../services/auth";
import NurseryDashboard from "./NurseryDashboard";
import CarerDashboard from "./CarerDashboard";
import NurseryDataService from "../../../services/nursery";
import AdminDashboard from "../../../admin/AdminDashboard";
import Unauthorised from "../../../common/Unauthorised";

const DashboardContainer = () => {
  const currentUser = AuthService.getCurrentUser();

  const [nursery, setNursery] = useState({});
  const [authorised, setAuthorised] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [purged, setPurged] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [noRecords, setNoRecords] = useState(false);

  const handlePurge = () => {
    NurseryDataService.purge()
      .then(() => setPurged(true))
      .catch(e => {
        if (e.response.status === 404) {
          setNoRecords(true);
        }
      });
  };

  const handleDeactivate = () => {
    NurseryDataService.deactivate(nursery.id)
      .then(() => setDeactivated(true))
      .catch(e => console.log(e));
  };

  const getLayout = () => {
    if (!authorised) {
      return (
        <Unauthorised/>
      )
    }

    switch (currentUser.role) {
      case 'superadmin':
        return (
          <AdminDashboard
            handlePurge={handlePurge}
            noRecords={noRecords}
            purged={purged}/>
        )
      case 'admin':
      case 'staff':
        return (
          <NurseryDashboard
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            currentUser={currentUser}
            deactivated={deactivated}
            handleDeactivate={handleDeactivate}
            nursery={nursery}
          />)
      case 'carer':
        return (
          <CarerDashboard
            nursery={nursery}
            currentUser={currentUser}
          />)
    }
  }

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
  }, []);

  return (
    <>
      {getLayout()}
    </>
  );
};

export default DashboardContainer;
