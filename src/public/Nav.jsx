import React from "react";
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
          <IonButton onClick={() => history.push('/nurseries')}>Our Nurseries</IonButton>
        </IonButtons>
        <IonButtons slot="secondary">
          <IonButton onClick={() => history.push('/signup')}>Sign Up</IonButton>
        </IonButtons>
        <IonTitle>NURSERY JOURNAL</IonTitle>
      </IonToolbar>
    </ion-header>
  );
};

export default Nav;
