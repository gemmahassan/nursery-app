import React from "react";
import {IonButton} from "@ionic/react";

const Logout = ({handleLogout}) => {
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