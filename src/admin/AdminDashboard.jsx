import React, {useState} from "react";
import AuthService from '../services/auth';
import {Button, message, Popconfirm, Tabs} from "antd";
import Applications from "./Applications";
import Nurseries from "./Nurseries";
import {
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
import Logout from "../common/Logout";

const {TabPane} = Tabs;

const AdminDashboard = ({
                          handlePurge,
                          noRecords,
                          setShowPopover,
                          showPopover,
                          purged
                        }) => {
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
              <IonLabel>{currentUser.username}</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Popconfirm
            title="This action will permanently delete all archived data over 90 days old"
            visible={showPopover}
            onConfirm={handlePurge}
            onCancel={() => {
              message.error('Action cancelled');
              setShowPopover(false);
            }}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button
              onClick={() => setShowPopover(true)}
            >
              Purge deactivated accounts and archived data?
            </Button>
          </Popconfirm>

          {!purged && (
            <Tabs type="card">
              <TabPane tab="Applications" key="1">
                <Applications/>
              </TabPane>
              <TabPane tab="Confirmed Nurseries" key="2">
                <Nurseries/>
              </TabPane>
            </Tabs>)}
        </IonContent>
      </div>
    </>
  );
};

export default AdminDashboard;
