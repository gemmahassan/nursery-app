import React from "react";
import {Link} from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/react';

const Nav = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <h4 class={"title"}>
          <Link to="/">Nursery Journal</Link>
        </h4>
        <IonButtons slot="primary">
          <IonButton>
            <Link to="/nurseries">Nurseries</Link>
          </IonButton>
          <IonButton>
            <Link to="/contact">Contact Us</Link>
          </IonButton>
          <IonButton>
            <Link to="/login">Login</Link>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Nav;
