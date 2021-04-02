import React from "react";

import {
  IonAvatar, IonButton,
  IonButtons, IonChip,
  IonContent,
  IonHeader,
  IonImg,
  IonItem, IonLabel,
  IonList,
  IonMenu, IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import Logout from "../../../common/Logout";
import ChildList from "../children/ChildList";
import history from "../../../history";
import {Tabs} from "antd";
import StaffList from "../staff/StaffList";
import NurseryCalendarContainer from "../calendar/NurseryCalendarContainer";
const { TabPane } = Tabs;

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
            <IonItem>Staff</IonItem>
            <IonItem>Kids</IonItem>
            <IonItem
            onClick={() => history.push(`/nursery/${nursery.id}/calendar`)}>
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
              <Logout/>
            </IonButtons>
            <IonImg src={nursery.image} />
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
          <Tabs type="card">
            <TabPane tab="Children" key="1">
              <ChildList
                userId={currentUser.userId}
                nurseryId={nursery.id}
              />
            </TabPane>
            <TabPane tab="Staff" key="2">
              <StaffList
              nurseryId={nursery.id}/>
            </TabPane>
            <TabPane tab="Calendar" key="3">
              <NurseryCalendarContainer
                nurseryId={nursery.id}
              />
            </TabPane>
          </Tabs>
        </IonContent>
      </div>
    </div>
  );
};

export default NurseryDashboard;
