import React, {useEffect, useState} from "react";

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

const CarerDashboard = ({currentUser}) => {
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
              <IonTitle>Carer Dashboard</IonTitle>
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
                  <IonButton
                    class="ion-float-right ion-padding"
                    size="large"
                    color="medium">
                    {/*onClick={() => history.push(`/nurseries/${nurseryId}/children`)}>*/}
                    View someone's journal
                  </IonButton>
                  <IonButton
                    class="ion-float-right ion-padding"
                    size="large"
                    color="medium">
                    {/*onClick={() => history.push(`/nurseries/${nurseryId}/journal/add`)}>*/}
                    Contact Nursery
                  </IonButton>
                </ion-col>
              </ion-row>
            </ion-grid>
          </IonContent>
        </div>

      </div>
  );
};

export default CarerDashboard;
