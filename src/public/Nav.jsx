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
          <IonButton onClick={() => history.push('/contact')}>Contact Us</IonButton>
        </IonButtons>
        <IonButtons slot="secondary">
          <IonButton onClick={() => history.push('/login')}>Login</IonButton>
        </IonButtons>
        <IonTitle onClick={() => history.push('/')}>The Nursery Journal</IonTitle>
      </IonToolbar>
    </ion-header>
  );
};

export default Nav;
