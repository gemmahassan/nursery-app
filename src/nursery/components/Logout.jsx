import React from "react";
import AuthService from "../../services/auth";
import {IonButton} from "@ionic/react";

const Logout = (props) => {

  const handleLogout = ({username, password}) => {
    AuthService.logout(username, password).then(
      () => {
        props.history.push("/login");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };


  return (
        <IonButton color="tertiary">
          Logout
        </IonButton>

  );
};

export default Logout;