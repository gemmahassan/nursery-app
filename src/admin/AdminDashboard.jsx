import React from "react";
import AuthService from "../services/auth";
import { Button, message, Popconfirm, Tabs } from "antd";
import {
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LogoutContainer from "../common/LogoutContainer";
import NurseriesContainer from "./NurseriesContainer";
import ApplicationsContainer from "./ApplicationsContainer";

const { TabPane } = Tabs;

// displays a dashboard for superadmin user
const AdminDashboard = ({
  handlePurge,
  setShowPopover,
  showPopover,
  purged,
}) => {
  // get the current user's details from JWT
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      {/*navbar*/}
      <IonRouterOutlet id="my-content"></IonRouterOutlet>
      <div className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar color={"tertiary"}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonButtons slot="primary">
              <LogoutContainer />
            </IonButtons>
            <IonTitle>Admin Dashboard</IonTitle>
            <IonChip slot="secondary">
              <IonLabel>{currentUser.username}</IonLabel>
            </IonChip>
          </IonToolbar>
        </IonHeader>

        {/*display button to purge data
        uses popconfirm component to ask for confirmation*/}
        <IonContent>
          <Popconfirm
            title="This action will permanently delete all archived data over 90 days old"
            visible={showPopover}
            onConfirm={handlePurge}
            onCancel={() => {
              message.error("Action cancelled");
              setShowPopover(false);
            }}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button
              style={{ margin: "20px" }}
              danger
              onClick={() => setShowPopover(true)}
            >
              Purge expired data
            </Button>
          </Popconfirm>

          {/*display tabs for pending and confirmed nurseries*/}
          {!purged && (
            <Tabs type="card">
              <TabPane tab="Applications" key="1">
                <ApplicationsContainer />
              </TabPane>
              <TabPane tab="Confirmed Nurseries" key="2">
                <NurseriesContainer />
              </TabPane>
            </Tabs>
          )}
        </IonContent>
      </div>
    </>
  );
};

export default AdminDashboard;
