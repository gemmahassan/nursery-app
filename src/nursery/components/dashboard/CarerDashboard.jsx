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
import JournalContainer from "../journal/JournalContainer";
import LogoutContainer from "../../../common/LogoutContainer";
import NurseryCalendarContainer from "../calendar/NurseryCalendarContainer";

const CarerDashboard = ({currentUser, nursery}) => {
  const [children, setChildren] = useState([]);
  const [activeItem, setActiveItem] = useState('journal');

  useEffect(() => {
    getChildren();
  }, []);

  const getChildren = () => {
    UserDataService.getChildrenOfCarer(currentUser.userId)
      .then(response => setChildren(response.data))
      .catch(e => console.log(e));
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
            <IonItem
              onClick={() => setActiveItem('journal')}>
              Journal
            </IonItem>
            <IonItem
              onClick={() => setActiveItem('calendar')}>
              Calendar
            </IonItem>
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
              <LogoutContainer />
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
          {activeItem === 'journal' &&
          <JournalContainer
            children={children}
            role={currentUser.role}
          />
          }

          {activeItem === 'calendar' &&
          <NurseryCalendarContainer
            nurseryName={nursery.name}
            nurseryId={nursery.id}
          />
          }
        </IonContent>
      </div>
    </div>
  );
};

export default CarerDashboard;
