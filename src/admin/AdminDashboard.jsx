import React, {useEffect, useState} from "react";
import AuthService from '../services/auth';
import NurseryDataService from '../services/nursery';
import {Button, Card, List,  Tabs} from "antd";
import {CheckOutlined, CloseOutlined, SettingOutlined} from "@ant-design/icons";
import http from '../shared/http-common';
import Applications from "./Applications";
import Nurseries from "./Nurseries";
import {
  IonAvatar,
  IonButtons, IonChip,
  IonContent,
  IonHeader, IonImg,
  IonItem, IonLabel,
  IonList,
  IonMenu, IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import Logout from "../common/Logout";
const { TabPane } = Tabs;

const AdminDashboard = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
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
            <IonTitle>Admin Dashboard</IonTitle>
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
            <TabPane tab="Applications" key="1">
              <Applications />
            </TabPane>
            <TabPane tab="Confirmed Nurseries" key="2">
              <Nurseries />
            </TabPane>
          </Tabs>
        </IonContent>
      </div>
    </>
  );
};

export default AdminDashboard;
