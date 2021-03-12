import React from "react";
import {useHistory} from "react-router-dom";
import AuthService from "../../services/auth";
import {IonButton} from "@ionic/react";

const Logout = () => {
  let history = useHistory();

  const handleLogout = ({username, password}) => {
    AuthService.logout(username, password);
    history.push("/");
  };

  return (
    <IonButton
      color="tertiary"
      onClick={handleLogout}
    >
      Logout
    </IonButton>

  );
};

export default Logout;