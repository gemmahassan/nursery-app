import React from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth";
import Logout from "./Logout";

const LogoutContainer = () => {
  let history = useHistory();

  const handleLogout = ({ username, password }) => {
    AuthService.logout(username, password);
    history.push("/");
  };

  return <Logout handleLogout={handleLogout} />;
};

export default LogoutContainer;
