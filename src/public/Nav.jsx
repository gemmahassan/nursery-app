import React from "react";
import {Link} from "react-router-dom";

import history from "../history";
import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/react';

const Nav = () => {
  return (
    <ion-header>
      <IonToolbar>
        <IonButtons slot="secondary">
          <IonButton>
            <Link to="/nurseries">Nurseries</Link>
          </IonButton>
        </IonButtons>
        <IonButtons slot="secondary">
          <IonButton>
            <Link to="/contact">Contact Us</Link>
          </IonButton>
        </IonButtons>
        <IonButtons slot="secondary">
          <IonButton>
            <Link to="/login">Login</Link>
          </IonButton>
        </IonButtons>
        <IonTitle>
          <Link to="/">Nursery Journal</Link>
        </IonTitle>
      </IonToolbar>
    </ion-header>
  );
};

export default Nav;
