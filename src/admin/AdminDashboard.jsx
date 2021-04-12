import React, {useState} from "react";
import AuthService from '../services/auth';
import {Button, Tabs} from "antd";
import Applications from "./Applications";
import Nurseries from "./Nurseries";
import {
  IonAlert,
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
import Logout from "../common/Logout";

const {TabPane} = Tabs;

const AdminDashboard = ({handlePurge, noRecords, purged}) => {
  const currentUser = AuthService.getCurrentUser();
const [showConfirmModal, setShowConfirmModal] = useState(false);

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
          <Button
            onClick={() => setShowConfirmModal(true)}
          >
            Purge deactivated accounts?
          </Button>

          {showConfirmModal &&
          <IonAlert
            isOpen={showConfirmModal}
            onDidDismiss={() => setShowConfirmModal(false)}
            header={`Confirm purge`}
            message={`This action will permanently delete all archived data over 90 days old`}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
              },
              {
                text: 'OK',
                handler: () => {
                  handlePurge();
                }
              }
            ]}
          />
          }
          {noRecords && (
            <h1>No records to purge</h1>
          )}
          {!purged && (
            <Tabs type="card">
              <TabPane tab="Applications" key="1">
                <Applications/>
              </TabPane>
              <TabPane tab="Confirmed Nurseries" key="2">
                <Nurseries/>
              </TabPane>
            </Tabs>)}
          {purged && (
            <h1>all data over 90 days old has been purged</h1>
          )}
        </IonContent>
      </div>
    </>
  );
};

export default AdminDashboard;
