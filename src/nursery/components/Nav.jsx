import {IonAvatar, IonButton, IonButtons, IonChip, IonIcon, IonLabel, IonTitle, IonToolbar} from "@ionic/react";
import {ellipsisHorizontal, ellipsisVertical} from "ionicons/icons";
import React from "react";

const Nav = () => {
  return (
    <ion-header>
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton color="secondary">
            <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}/>
          </IonButton>
        </IonButtons>
        <IonTitle>NURSERY NAME</IonTitle>

      </IonToolbar>

    </ion-header>
  );
};

export default Nav;
