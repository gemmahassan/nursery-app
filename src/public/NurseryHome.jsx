import React, {useEffect, useState} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonMenuButton, IonAvatar, IonLabel, IonChip
} from "@ionic/react";
import history from "../history";
import {useParams} from "react-router-dom";
import AuthService from "../services/auth";
import DashboardContainer from "../nursery/components/dashboard/DashboardContainer";
import Login from "../common/Login";

const NurseryHome = () => {
  const {nurseryId} = useParams();
  const currentUser = AuthService.getCurrentUser();

  return (
    <IonContent>
      {currentUser && (
        <DashboardContainer
          currentUser={currentUser}/>
      )}
      {!currentUser && (
        <Login />
      )}
    </IonContent>
  );
};

export default NurseryHome;