import React, { useEffect, useState } from "react";
import UserDataService from "../../../services/user";
import AuthService from "../../../services/auth";
import StaffList from "./StaffList";

const StaffListContainer = ({ nurseryId }) => {
  const [staff, setStaff] = useState([]);
  const [staffData, setStaffData] = useState(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);

  // get current user details from JWT
  const currentUser = AuthService.getCurrentUser();

  // call API to get staff for current nursery
  const getStaff = () => {
    UserDataService.getStaff(nurseryId)
      .then((response) => setStaff(response.data))
      .catch((e) => console.log(e));
  };

  // get staff on page render
  useEffect(() => {
    getStaff();
  }, []);

  return (
    <StaffList
      currentUser={currentUser}
      getStaff={getStaff}
      nurseryId={nurseryId}
      showAddStaffModal={showAddStaffModal}
      showEditStaffModal={showEditStaffModal}
      setShowAddStaffModal={setShowAddStaffModal}
      setShowEditStaffModal={setShowEditStaffModal}
      setStaffData={setStaffData}
      staff={staff}
      staffData={staffData}
    />
  );
};

export default StaffListContainer;
