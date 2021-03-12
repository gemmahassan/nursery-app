import React, {useEffect, useState} from "react";

import {
  IonAvatar,
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
import ChildDataService from "../../../services/child";
import Journal from "../journal/Journal";
import useInterval from "../../../hooks/useInterval"

const CarerDashboard = ({currentUser, nursery}) => {
  console.log("dashboard nursery: ", nursery);
  const [children, setChildren] = useState([]);


  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = () => {
    ChildDataService.getByCarerId(currentUser.userId)
      .then(response => {
        setChildren(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <IonMenu side="start" menuId="first" contentId="my-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>`${nursery.name} Carer Menu`</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Messages</IonItem>
            <IonItem>Info</IonItem>
            <IonItem>Children</IonItem>
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
            <IonTitle>{nursery.name} Carer Dashboard</IonTitle>
            <IonChip slot="secondary">
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
              </IonAvatar>
              <IonLabel>{currentUser.username}</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Journal
            children={children}
            role={currentUser.role}/>
        </IonContent>
      </div>
    </div>
  );
};

export default CarerDashboard;
