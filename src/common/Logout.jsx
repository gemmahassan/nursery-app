import React from "react";
import { IonButton } from "@ionic/react";

// renders a logout button
const Logout = ({ handleLogout }) => {
  return (
    <IonButton color="primary" onClick={handleLogout}>
      Logout
    </IonButton>
  );
};

export default Logout;
