import React, {useEffect, useState} from "react";

import UserService from "../../../services/user";
import AuthService from "../../../services/auth";
import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import CarerDashboard from "./CarerDashboard";


const DashboardContainer = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCarer, setIsCarer] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    UserService.getAdminDashboard().then(
      response => {
        console.log(response.data);
        setIsAdmin(true);
      },
      error => {
        console.log(error);
        setIsAdmin(false);
      }
    );

    UserService.getStaffDashboard().then(
      response => {
        console.log(response.data);
        setIsStaff(true);
      },
      error => {
        console.log(error);
        setIsStaff(false);
      }
    );

    UserService.getCarerHomepage().then(
      response => {
        console.log(response.data);
        setIsCarer(true);
      },
      error => {
        console.log(error);
        setIsCarer(false);
      }
    );
  });

  const currentUser = AuthService.getCurrentUser();
  console.log("currentUser container: ", currentUser);
  return (
    <>
      {isAdmin &&
      <AdminDashboard
        currentUser={currentUser}
      />}
      {isStaff &&
      <StaffDashboard
        currentUser={currentUser}
      />
      }
      {isCarer &&
      <CarerDashboard
        currentUser={currentUser}
      />
      }
    </>
  );
};

export default DashboardContainer;
