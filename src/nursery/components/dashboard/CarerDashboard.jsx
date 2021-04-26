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
import UserDataService from "../../../services/user";
import Logout from "../../../common/Logout";
import JournalContainer from "../journal/JournalContainer";

const CarerDashboard = ({currentUser, nursery}) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = () => {
    UserDataService.getChildrenOfCarer(currentUser.userId)
      .then(response => {
        setChildren(response.data);
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
            <IonTitle>{nursery.name} Carer Menu</IonTitle>
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
            <IonButtons slot="primary">
              <Logout />
            </IonButtons>
            <IonTitle>{nursery.name} Carer Dashboard</IonTitle>
            <IonChip slot="secondary">
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
              </IonAvatar>
              <IonLabel>{currentUser.firstName} {currentUser.surname}</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <JournalContainer
            children={children}
            role={currentUser.role}/>
        </IonContent>
      </div>
    </div>
  );
};

export default CarerDashboard;
