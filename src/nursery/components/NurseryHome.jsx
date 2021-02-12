import React, {useEffect, useState} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonMenuToggle,
  IonMenuButton, IonAvatar, IonLabel, IonChip
} from "@ionic/react";

import history from "../../history";
import {useParams} from "react-router-dom";

const NurseryHome = () => {
  const { nurseryId } = useParams();

  return (
    <div>
      <IonMenu side="start" menuId="first" contentId="my-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Nursery Admin Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Rooms</IonItem>
            <IonItem>Staff</IonItem>
            <IonItem>Kids</IonItem>
            <IonItem>Info</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="my-content"></IonRouterOutlet>
      <div className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
            <IonTitle>Nursery Home</IonTitle>
            <IonChip slot="secondary">
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
              </IonAvatar>
              <IonLabel>Chip Avatar</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <ion-grid>
            <ion-row>
              <ion-col>
                <IonButton
                  class="ion-float-right ion-padding"
                  size="large"
                  color="medium"
                  onClick={() => history.push(`/nurseries/${nurseryId}/children`)}>
                  3 Kids Checked In
                </IonButton>
                <IonButton
                  class="ion-float-right ion-padding"
                  size="large"
                  color="medium"
                  onClick={() => history.push(`/nurseries/${nurseryId}/journal/add`)}>
                  Update Journal
                </IonButton>
              </ion-col>
              <ion-col>
                <IonButton class="ion-padding" size="large" color="medium">6 Staff Members Checked In</IonButton>
              </ion-col>
            </ion-row>
          </ion-grid>
        </IonContent>
      </div>


    </div>
  );
};

export default NurseryHome;