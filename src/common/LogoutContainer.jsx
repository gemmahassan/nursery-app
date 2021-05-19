import React from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth";
import Logout from "./Logout";

const LogoutContainer = () => {
  // reference to browser/router history
  let history = useHistory();

  const handleLogout = ({ username, password }) => {
    // call logout service
    AuthService.logout(username, password);
    // redirect browser to specified path
    history.push("/");
  };

  // render Logout component
  return <Logout handleLogout={handleLogout} />;
};

export default LogoutContainer;
