import React from "react";

import {
  IonAvatar, IonButton,
  IonButtons, IonChip,
  IonContent,
  IonHeader,
  IonItem, IonLabel,
  IonList,
  IonMenu, IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import Logout from "../Logout";
import ChildList from "../children/ChildList";
import history from "../../../history";

const NurseryDashboard = ({currentUser, nursery}) => {
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
            <IonButtons slot="primary">
              <Logout/>
            </IonButtons>
            <IonTitle>{`${nursery.name} Staff Dashboard`}</IonTitle>
            <IonChip slot="secondary">
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
              </IonAvatar>
              <IonLabel>{currentUser.username}</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ChildList
                  nurseryId={nursery.id}
                />
              </ion-col>
            </ion-row>
          </ion-grid>
        </IonContent>
      </div>

    </div>
  );
};

export default NurseryDashboard;
